# <a name="td5pzw"></a>Express 搭建 API

第一个小节，先把 api 搭建起来。代码的运行环境是 [Node.js](https://nodejs.org/en/) (>=10.0.0) 。安装 Node.js 的步骤可以参考好奇猫上的另外一门课程 《Nodejs 乐高》课程。另外，本课程中对一些基础步骤的讲解也可能不如《 Express 实作 API 》课程那么详细，所以想更详细的了解原理，那门课程也是可以推荐的。

### <a name="tcs8ah"></a>创建应用

```
mkdir api
npm init -y
```

创建后端项目，生成应用需要的 `package.json` 文件 。

```
npm i express
```

[Express](https://expressjs.com/) 适合用来写 API 的 Node.js 应用开发框架 。

api/index.js

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello Client')
})

app.listen(3009, () => console.log('running on port 3009...'))
```

新建文件 `index.js` ，让服务器运行在 3000 端口。添加了一个路径为 `/` 的 API ，可以响应一个字符串给客户端。

```
npm i -g nodemon
```

全局安装 nodemon 。

api/package.json

```
    "start": "nodemon index.js"
```

添加启动脚本。

```
npm start
```

这样就可以运行命令来启动 API 服务器了。

Postman 中，请求 `GET http://localhost:3009/` 可以看到返回的信息了。

## <a name="38zqxo"></a>Mongo

数据库 mongodb 的一些基础知识，以及图形化操作界面 mongo-express 的搭建方式，可以参考《
Express 实作 API 》。

```
cd api
mkdir data
```

api 之内新建 data 文件夹，把这个文件夹添加到 .gitignore 文件中，然后启动 mongodb 。

```
npm i concurrently
```

安装 concurrently 以便同时运行多个命令。同时保证系统上已经安装好了 Mongodb 数据库。

package.json

```
  "scripts": {
    "start":
      "concurrently --kill-others \"nodemon index.js\" \"mongod --dbpath=./data\""
  },
```

package.json 文件中修改原有 `start` 脚本内容，使用 `concurrently` 同时启动服务器和 mongodb 。 `--kill-others` 保证了，这两个命令中有一个死掉，另外一个也自动被杀死。

```
npm i mongoose
```

安装 mongoose 以便在 express 中操作 mongodb 。

api/index.js

```js
// mongoose START
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/img-upload')
const db = mongoose.connection
db.on('error', () => console.error('Mongo Failed to Connect!!!!'))
db.on('connected', () => console.log('Mongo Connected'))
// mongoose END
```

导入 mongoose 功能模块，然后通过 Mongoose 提供的 `connect()` 方法连接到名为 `img-upload` 的数据库。下面设置一下连接失败和成功的提示信息。

后端命令行中，可以看到 `Mongo Connected` ，表示 express 已经成功连接了数据库。

### <a name="dwpsyu"></a>操作文章（post）数据

```
npm i body-parser
```

安装 body-parser 。

index.js

```js
const bodyParser = require('body-parser')
app.use(bodyParser.json())
```

加载从 `req.body` 中拿到请求中发送过来的 json 数据的能力。

index.js

```js
app.post('/post', (req, res) => {
  console.log(req.body)
})
```

把咱们唯一的那个 API 改成接收 POST 方法 http 请求，请求路径也改成 `/post` ，未来会用这个 API 来创建内容，里面打印一下，看 `req.body` 中是否真的接收到了数据。

Postman 中发出 `POST /post` 请求。负载数据选 raw 。数据格式选择 application/json 。

```
{
  "title" : "标题好",
  "desc" : "描述内容"
}
```

添加 title 和 body 两项数据，点 send 发出请求。

这样到服务器的命令行中，可以看到打印出了 `req.body` 中接收到的信息了。

### <a name="mh4bec"></a>重构

index.js

```js
const routes = require('./routes')
routes(app)
```

index.js 中，把 API 删除掉，然后导入路由文件。

api/routes.js

```js
const Post = require('./controllers/post')

module.exports = app => {
  app.post('/post', Post.new)
}
```

路由文件中导入 post controller 。当请求，`Post /post` 时，具体执行的代码在 post controller 中的 new 字段下定义。

api/controllers/post.js

```js
exports.new = (req, res) => {
  console.log(req.body)
}
```

controller 文件中才是真正的 API 代码，这里也还是先打印接收到的内容。

Postman 中再次发起请求，发现一样可以打印出数据的。

### <a name="3tkust"></a>保存数据到 mongodb

接下来把数据保存到 mongodb 中。

models/post.js

```js
const mongoose = require('mongoose')

const Schema = mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('post', Schema)
```

mongoose 下操作数据库的一般思路是先创建数据库的 model 文件。规定了一条 post 记录中都应该包含哪些字段，这里给出的是 `title` 和 `desc` 这两个字段，`required` 设置为 true ，保证了如果保存时这两项数据有缺失就会触发错误。 `timestamps` 一项会给每一条记录添加时间戳。

controllers/post.js

```js
const Post = require('../models/post.js')

exports.new = async (req, res) => {
  try {
    const p = new Post(req.body)
    await p.save()
    res.json({
      _id: p._id,
      title: p.title,
      desc: p.desc
    })
  } catch (err) {
    console.log(err)
    return res.status(406).json({ msg: '保存失败' })
  }
}
```

API 代码中，导入数据模型，把 `new` 函数改成 `async` 函数，用 `req.body` 中的数据初始化一个数据模型。由于 `save` 是异步的，所以这里要 `await` 一下，没有这一句，`catch` 中就不会捕捉到错误。

`res.json` 中，有选择的返回了需要的字段给客户端。

catch 这里，如果保存失败就会触发里面的语句执行，打印错误，并且返回给客户端一个错误状态码和错误信息。

Postman 中，依然按照前面的方式，发送 `title` 和 `desc` 两项给服务器，这样可以看到服务器成功返回的信息。如果删除 `desc` ，再发送，会看到报错信息。
