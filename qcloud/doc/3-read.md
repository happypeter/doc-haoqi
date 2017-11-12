# 列出 Bucket 中的所有文件

本节来动手写服务器端代码，用 express 框架搭建服务器，实现一个 API ， API 中去调用腾讯云的 [Nodejs SDK](https://cloud.tencent.com/document/product/436/8629) 的 **getBucket** 接口，列出一个 Bucket 中的所有文件。

### 搭建 Express.js 服务器

Nodejs 社区搭建 server API 最流行的（没有之一）的做法就是使用 [express](https://expressjs.com/) ，先来跑一个 Hello World API。

首先把前面创建好的包含 config.js 的 server/ 文件夹，初始化为一个 nodejs 项目

```
cd server/
npm init -y
```

这一步的作用就是在当前位置生成了一个 package.json 文件。这样就可以来装包了

```
npm i express
```

装包后会出现 `server/node_modules` 文件夹，到 qcloud-cos/.gitignore 中添加 `node_modules` ，防止 node_modules 被 git 跟踪。

话说 express 是用来写服务器的，我现在就来动手写一个。创建 server/index.js 文件：

```js
const express = require('express')
const app = express()
```

上面导入了 express ，并初始化了一个 app 对象，后续通过使用 app 就可以使用 express 各项功能了。

仅仅导入还不能形成一个 express 服务器，但是一旦添加了下面一句，就是了，一切就是这么简单：

```diff
diff --git a/server/index.js b/server/index.js
index bbdf591..278c849 100644
--- a/server/index.js
+++ b/server/index.js
@@ -1,2 +1,4 @@
 const express = require('express')
 const app = express()
+
+app.listen(3008, () => console.log('running on port 3008...'))
```

上面这句的作用是让服务器始终监听3008端口，前端 express 项目一般我习惯跑在3000端口，后端就用3008。

目前为止服务器始终在监听，但是不管听到什么请求，终究也是什么也做不了，因为没有响应机制。添加对请求的响应，就要添加 API 路由进来

```diff
diff --git a/server/index.js b/server/index.js
index 278c849..dd023c3 100644
--- a/server/index.js
+++ b/server/index.js
@@ -1,4 +1,7 @@
 const express = require('express')
 const app = express()
+const apiRouter = require('./routes')
+
+app.use('/', apiRouter)
 
 app.listen(3008, () => console.log('running on port 3008...'))
```

这些代码的作用就是导入和使用路由文件 routes.js 中的内容，接下来添加 routes.js ：

```js
const express = require('express')
const router = express.Router()

module.exports = router
```

几行就是导出了一个 `router` ，目前里面没有定义任何 API 。

添加一个 API 进来：

```diff
diff --git a/server/routes.js b/server/routes.js
index 5ea04fc..4678111 100644
--- a/server/routes.js
+++ b/server/routes.js
@@ -1,4 +1,8 @@
 const express = require('express')
 const router = express.Router()
 
+router.get('/', (req, res) => {
+  res.send('Hello World')
+})
+
 module.exports = router
```

这三行就是一个实实在在的 API 了。作用就是接收客户端发过来的 `get` 方法的请求路径为 `/` 的 HTTP 请求。然后执行主体代码，主体代码就是把 `Hello World` 字符串作为响应发送给客户端。

这样，一个 express 的 Hello World 代码就有了。

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

实现一个我自己的 API ，里面调用腾讯云的 getBucket API 。

参考 [Nodejs SDK 文档](https://cloud.tencent.com/document/product/436/8629)。先来装包

```
cd server/
npm i cos-nodejs-sdk-v5
```

注意，包要安装到 server/ 文件夹内。

API 的实现存放到 server/lib/qcloud.js ，内容如下：

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

上面内容的最关键是第四行的 `const cos = new COS(config)` 这一句，把 config.js 中的各项参数信息传递给 `COS()` 接口，其中就包括 SecretId/SecretKey 等这些鉴权信息。接下来有了 `cos` 对象，就可以呼叫 `cos.getBucket()` 接口真正的去列出 Bucket 文件了。由于 `config` 是一个对象，所以在向上面两个接口（ COS() 和 getBucket() ）中传递参数的时候，用不上的参数会被自动忽略，这是用一个对象的形式传递参数的好处，不用担心参数顺序和冗余。

然后到 router.js 使用上面的文件中导出的 `getBucket` 接口， routes.js 中修改如下

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

至此 API 代码一切就绪。可以用浏览器，来测试一下这个 API 。

浏览器指向 http://localhost:3008/bucket ，就可以看到腾讯云返回给我们的 json 信息了，内容就是 bucket 中的文件名和文件夹的列表，包含一些其他信息，像 lastModified 和 ETag 信息。

### 总结

这样 getBucket() 接口我们就调通了。总体思路就是我的 express 服务器把 config.js 中的那些信息：

- SecretKey/SecretId （用于鉴别请求者身份）
- Bucket/Region （用来明确请求的 Bucket 的位置）

发送给腾讯云，这样反过来，腾讯云就可以给我我想要的信息了。
