# 创建 express 服务器

把 API 服务器启动起来。

### 启动 express

```
mkdir api
```

创建一个项目，叫 `api` ，因为 express 的作用就是用来给前端提供 api 的。

```
cd api
npm init -y
```

进入项目，创建一个 package.json 文件，便于后续装 npm 包。

```
npm i express
```

安装 express 。

api/index.js

```js
const express = require('express')
const app = express()

app.listen(3000, () => {
  console.log('running on port 3000...')
})
```

创建 index.js 文件，导入 express，实例化一个对象，赋值给 `app` 。使用 `listen` 接口，监听 `3000` 端口过来的请求。逗号后面的回调函数会在服务器启动的时候执行。

```
npm i -g nodemon
nodemon index.js
```

安装 `nodemon` ，启动服务器，命令行中看到打印出的信息了。

### 添加 API

api/index.js

```js
app.get('/', (req, res) => {
  res.send('I am the API server')
})
```

来添加一个 API ，一个最简单的 API 有这几个要素组成：

* 第一是 HTTP 请求方法，这里指定为 `get`
* 第二个是 HTTP 请求的路径，或者叫 API 路径，这里就是 `/`
* 第三个，就是这里的回调函数了，它负责服务器收到请求之后，应该做些什么

回调函数中，会接收 `req` 也就是请求对象和 `res` 也就是响应对象。这里我们仅仅调用 `res.send` 接口，向客户端发送响应，响应内容是 `I am the API sever` 这个字符串。

然后启动 POSTMAN ，来发送 GET 请求到本地服务器的 3000 端口的 `/` 位置。这样就可以接收到服务器返回的字符串了。这样，表示我们的 API ，运行正确。
