# 创建 express 服务器

来搭建一个 express 服务器，这样上面就能跑 API 了。

### 安装 express

```
mkdir api
cd api
npm init -y
npm i express
```

创建项目，名字叫 api ，用来放 express 代码，创建一个 package.json 文件，再来安装 express 。

api/index.js

```js
const express = require('express')
const app = express()

app.listen(3000, () => console.log('running on port 3000...'))
```

上面的 `3000` 指的是 **3000 端口** ，端口的英文是 port ，一个服务器好比一座大厦，有很多个门，3000 是其中一个门的门牌号。

```
npm i -g nodemon
nodemon index.js
```

启动服务器。

```
$ nodemon index.js
running on port 3000...
```

这样，服务器进程就有了，始终在监听 3000 端口的请求。

### 添加 API

api/index.js

```js
app.get('/', () => {
  console.log('some request come in...')
})
```

一个 API 主要由下面的要素组成：

* get 是一个 http 请求的**方法** ，类似的还有 post/delete/put 。
* `/` 是一个**路径** ，这里也可以叫这个 API 的路径
* 方法加一个路径，这样就组成一个 **HTTP 请求**，注意这里的请求，不是**发出请求** ，而是**接收请求** 。
* 请求明确了，但是 API 真正的核心代码却是在回调函数中，回调函数中的语句明确了，再收到客户端请求之后，服务器端要做些什么

启动 Postman ，发出 `GET localhost:3000/` 这个请求。到服务器终端中，可以看到打印出了 `some request come in...`

### 给出响应

api/index.js

```js
app.get('/', (req, res) => {
  res.send('Hello Client')
})
```

`req` 是 request **请求** 的简写， `res` 是 response **响应**的简写 。`res.send('Hello Client');`
的作用是从后端向前端浏览器返回字符串 `Hello Client` 。

再用 Postman 测试，发出相同的请求，这样 Postman 所代表的前端，就可以收到后端发送过来的字符串了。
