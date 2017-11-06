本节来动手写服务器端代码，实现一个 express API ，其中去调用腾讯云的 [Nodejs SDK](https://cloud.tencent.com/document/product/436/8629) 的 **getBucket** 接口，列出一个 Bucket 中的所有文件。

### 搭建 Express.js 基本环境

Nodejs 社区搭建 server API 最流行的（没有之一）的做法就是使用 [express](https://expressjs.com/) ，我们先跑一个 Hello World API。

首先把前面创建好的包含 config.js 的 server/ 文件夹，初始化为一个 nodejs 项目

```
cd server/
npm init -y
```

这一步的作用就是在当前位置生成了一个 package.json 文件。这样就可以来装包了

```
npm i express
```

装包后会出现 server/node_modules 文件夹，到 qcloud-cos/.gitignore 中添加 `node_modules` ，防止 node_modules 被 git 跟踪。

express 是用来写服务器的，现在就来动手写。创建 server/index.js 文件：

```js
const express = require('express')
const app = express()

const apiRouter = require('./routes')

app.use('/', apiRouter)

app.listen(3008, () => console.log('running on port 3008...'))
```

上面实现了一个简单的 express 服务器，服务器会跑在 3008 端口（我自己习惯用的后台端口），代码中最关键的一句是

```js
const apiRouter = require('./routes')
```

作用是导入 router ，也就是 API 路由的文件。接下来添加 routes.js 内容如下：

```js
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World')
})

module.exports = router
```

这样，一个 express 的 Hello world 代码就有了。

下面看如何启动项目。为了能自动加载每次修改的内容，我们安装 nodemon

```
npm i -g nodemon
```

然后在 server/package.json 中做一下修改


```diff
diff --git a/server/package.json b/server/package.json
index a39295d..e7d8110 100644
--- a/server/package.json
+++ b/server/package.json
@@ -4,7 +4,7 @@
   "description": "",
   "main": "config.example.js",
   "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "start": "nodemon index.js"
   },
   "keywords": [],
   "author": "",
```

添加一个 **npm 脚本** 名叫 `start` 。 于是，命令行中运行：

```
npm start
```

就相当于执行了脚本的语句 `nodemon index.js`，使用 nodemon 比直接用 `node index.js` 启动项目的好处是，每次代码有了修改 nodemon 会自动帮我们重启项目。此时，浏览器打开 http://localhost:3008/ 就可以看到页面中显示的 Hello World 字样了。

### 调用腾讯云 getBucket 接口

实现一个 API ，里面调用腾讯云的 API 。

参考 [Nodejs SDK](https://cloud.tencent.com/document/product/436/8629#get-bucket）。先来装包

```
cd server/
npm i cos-nodejs-sdk-v5
```

然后创建 server/lib/qcloud.js ，内容如下：

```js
const COS = require('cos-nodejs-sdk-v5')
const config = require('../config')

const cos = new COS(config)

exports.getBucket = (req, res) => {
  cos.getBucket(config, (err, data) => {
    if(err) {
      res.json(err)
    } else {
      res.status(200).json(data)
    }
  })
}
```

上面内容的关键是 `const cos = new COS(config)` 这一句，作用是把 config.js 中的各项参数信息传递给 `COS()` 接口，其中就包括 SecretId/SecretKey 等这些鉴权信息。接下来有了 `cos` 对象，就可以呼叫 `cos.getBucket()` 接口真正的去列出 Bucket 文件了。由于 `config` 是一个对象，所以在向上面两个接口（ COS() 和 getBucket() ）中传递参数的时候，用不上的参数会被自动忽略，这是用一个对象的形式传递参数的好处，不用担心参数顺序和冗余。

然后到 router.js 使用上面的 `getBucket` routes.js 中修改如下

```diff
diff --git a/server/routes.js b/server/routes.js
index 4678111..b5a5a6f 100644
--- a/server/routes.js
+++ b/server/routes.js
@@ -1,8 +1,11 @@
 const express = require('express')
 const router = express.Router()
+const qcloud = require('./lib/qcloud')

 router.get('/', (req, res) => {
   res.send('Hello World')
 })

+router.get('/bucket', qcloud.getBucket)
+
 module.exports = router
```

一切就绪。浏览器指向 http://localhost:3008/bucket ，就可以看到腾讯云返回给我们的 json 信息了，内容就是 catgo 这个 bucket 中的文件名和文件夹的列表，包含响应的 lastModified 和 Etag 信息。

### 总结

这样 getBucket() 接口我们就调通了。基本思路就是我们的的 express 服务器把 config.js 中的那些信息：

- SecretKey/SecretId （用于鉴别请求者身份）
- Bucket/Region （用来明确请求的 Bucket 的位置）

发送给腾讯云，这样就可以得到我们要的信息了。
