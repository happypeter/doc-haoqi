# Express 搭建 API

后端代码的运行环境是 [Node.js](https://nodejs.org/en/) (>=10.0.0) 。安装 Node.js 的步骤可以参考好奇猫上的另外一门课程 《Nodejs 乐高》课程。另外，本课程中对一些基础步骤的讲解也可能不如《 Express 实作 API 》课程那么详细，所以想更详细的了解原理，那门课程也是可以推荐的。

### 创建应用

```
mkdir api
npm init -y
```

创建后端项目，生成应用需要的 `package.json` 文件 。express 写的服务器端代码就都放到 api 文件夹中。

```
npm i express
```

[Express](https://expressjs.com/) 适合用来写 API 的 Node.js 应用开发框架 。

```js
// index.js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello Client')
})

const { PORT } = require('./config')

app.listen(PORT, () => console.log(`running on port ${PORT}...`))
```

新建文件 `index.js` ，让服务器运行在 3000 端口。添加了一个路径为 `/` 的 API ，可以响应一个字符串给客户端。

```js
// config.js
module.exports = {
  PORT: 3009
}
```

添加配置文件。

```
npm i -g nodemon
```

全局安装 nodemon 。

```js
// package.json
  "scripts": {
    "start": "nodemon index.js"
  },
```

添加一个 npm 脚本，用来启动项目。

Postman 中，请求 `GET http://localhost:3009/` 可以看到返回的信息了。

## Mongo

数据库 mongodb 的一些基础知识，以及图形化操作界面 mongo-express 的搭建方式，可以参考《
Express 实作 API 》。

```
mkdir data
mongod --dbpath=./data/
```

系统上的任意位置，新建 data 文件夹，然后启动 mongodb 。

```
npm i mongoose
```

安装 mongoose 以便在 express 中操作 mongodb 。

```js
// config.js
module.exports = {
  PORT: 3009,
  DB_NAME: 'jwt'
}
```

配置文件中，把项目对应的数据库，命名为 `jwt` 。

```js
//index.js

const { PORT, DB_NAME } = require('./config')

// mongoose START
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`)
const db = mongoose.connection
db.on('error', () => console.error('Mongo Failed to Connect!!!!'))
db.on('connected', () => console.log('Mongo Connected'))
// mongoose END
```

导入 mongoose 功能模块，然后通过 Mongoose 提供的 `connect()` 方法连接到数据库。下面设置一下失败和成功的提示信息。

后端命令行中，可以看到 `Mongo Connected` ，表示 express 已经成功连接了数据库。

### 操作 User 数据

```js
//models/user.js
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    // 用户名，密码不能为空，在客户端判断，服务器就不给出相关报错处理了
    username: { type: String, unique: true },
    password: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
```

创建 user 的 model 文件，用户名和 password 两个主要字段，加上时间戳。

```
npm i body-parser
```

安装 body-parser 。

```js
//index.js
const bodyParser = require('body-parser')
app.use(bodyParser.json())
```

这样就可以用 `req.body` 拿到请求发送过来的 json 数据了。

```js
//index.js
const User = require('./models/user.js')

app.post('/user/signup', (req, res) => {
  const u = new User(req.body)
  u.save()
  res.json({
    msg: 'saved'
  })
})
```

添加 API ，拿到客户端发送过来的数据，保存到数据库中。

Postman 中发出 `POST /user/signup` 请求。负载数据选 raw 。

```
{
  "username" : "peter",
  "password" : "222222"
}
```

数据格式选择 application/json 。

mongo-express 中，可以看到，User 数据保存好了。

### 安装 morgan

```
npm i morgan
```

安装日志中间件 morgan ，方便日常调试。

```js
// index.js
const morgan = require('morgan')
app.use(morgan('tiny'))
```

加载一下。然后重启服务器。

再到 Postman 中发请求，后端服务器终端中就可以看到请求日志了。
