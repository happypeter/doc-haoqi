# 评论 API

来实现发评论的 API 。主要就是接收客户端的文本，然后保存到数据库中。

### 接收文本

客户端通常会用 POST 方法，然后在 HTTP Body 中，携带 JSON 数据的形式来发送评论内容。对 HTTP 基础知识感兴趣的？可以参考《跟 Peter 学 HTTP 》课程。

```
npm i body-parser
```

要从请求 Body 中取出信息，需要安装 body-parser 。

api/index.js

```js
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/comment', (req, res) => {
  console.log(req.body)
})
```

服务器文件中，导入 body-parser ，应用 bodyparser 中间件，添加接收 json 数据的功能。这样，API 中，打印 `req.body` 才会有真正的内容，而不是 undefined 。

依然是到 POSTMAN 中，发出 `POST localhost:3000/comment` 请求，请求的 `body` 中选 `raw` ，数据格式选 `application/json` ，然后添加 json 数据。

```json
{
  "text": "happy comment"
}
```

然后点 `send` 把这个请求发送到服务器。

到启动 `nodemon` 的命令行终端中，也就是服务器的终端中，可以看到接收到了这些 json 信息。这个表示 jsonParser 工作了。

### 保存到数据库

数据拿到了，下一步看如何保存到 Mongodb 中。

```
npm i mongoose
```

先要安装 mongoose ，它负责连接 express 和 mongodb 。

api/index.js

```js
// mongoose START
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/react-ajax')
var db = mongoose.connection
db.on('error', () => console.error('Mongo Failed to Connect!!!!'))
db.on('connected', () => console.log('Mongo Connected'))
// mongoose END

const Comment = require('./models/comment.js')

app.post('/comment', (req, res) => {
  const comment = new Comment(req.body)
  comment.save()
})
```

index.js 中连接一下数据库。导入 `mongoose` ，保证 mongodb 处于启动状态，因为这里要连接了，连接到的数据库名一般就是项目名，`react-ajax` 是我们的项目名。数据库无需事先创建，首次保存数据的时候会自动创建。下面拿到连接，赋值给变量 db 。下面分别通过 `error` 和 `connected` 两个事件，设置了连接成功和报错后的终端输出信息。

接下来，导入数据模型文件 comment.js 。通过 `new` 一个数据模型，然后传入一个 js 对象作为初始化数据，就可以创建一条数据记录了，也就是这里的小写的 `comment` 。执行 `comment.save` 就可以把这条记录保存到数据库中。

api/models/comment.js

```js
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema)
```

再来创建数据模型文件 comment.js 。这里实质上就是规定一下保存评论的这张表的结构。`Schema` 是概要的意思，`model` 是模型的意思。

这里指定了一个字段，字段名叫 `text` 。数据类型是 `String` ，必填，没有就会导致保存失败。下面 `timestamps` 时间戳这一项加上，在保存每一条评论记录的时候，都会附带保存，创建和更新时间。

最后这条导出语句中，规定了这张表的名字叫 `Comment` 。

到 POSTMAN 中，再次发出请求。

```
> show dbs
admin       0.000GB
local       0.000GB
react-ajax  0.000GB
> use react-ajax
switched to db react-ajax
> show collections
comments
> db.comments.find()
{ "_id" : ObjectId("5adc0519a8160c6691b116a8"), "text" : "happy comment", "createdAt" : ISODate("2018-04-22T03:44:25.248Z"), "updatedAt" : ISODate("2018-04-22T03:44:25.248Z"), "__v" : 0 }
>
```

然后进入数据库，`show dbs` 命令可以看到多了一个数据库叫做 `react-ajax` ，进入数据库。用 `show collections` 看看都有几张表，文档型数据库中，把一张表就叫做一个 collection 。最后用 `find` 接口，查询一下，发现数据果然成功保存了。

```
> use react-ajax
switched to db react-ajax
> db.dropDatabase()
```

如果想要删除一个数据库，可以先 `use` 进入，然后 db.dropDatabase() 。

### 返回正确或者报错信息

数据保存成功或者失败后，应该通过 HTTP 响应，反馈给客户端以对应的信息。

api/index.js

```js
app.post('/comment', async (req, res) => {
  try {
    const comment = new Comment(req.body)
    const cmt = await comment.save()
    res.json({
      comment: cmt
    })
  } catch (err) {
    res.status(406).json({ msg: '提交失败' })
  }
})
```

把 API 的回调函数前添加 `async` 。用 `try...catch` 处理报错。评论保存的语句前添加 `await`，这样 `cmt` 中就能拿到 `save` 之后的返回值，也就是当前的评论对象了。用 `res.json` 发送 json 格式的信息给客户端。

如果用户提交信息为空，就会报错，这时，返回给客户端一个状态 406 ，然后返回的 json 中给出报错信息。

PostMan 中测试一下，提交的 JSON 中有 `text` 的时候，返回信息中会看到评论对象 。把 `text` 一项删除，返回信息中会看到报错。

### 读出所有评论

```js
app.get('/comments', async (req, res) => {
  const comments = await Comment.find()
  res.json({
    comments
  })
})
```

再来添加一个 API ，读取所有评论。

Postman 中测试一下，读取成功。

至此，API 需要的功能，我们就做完了。
