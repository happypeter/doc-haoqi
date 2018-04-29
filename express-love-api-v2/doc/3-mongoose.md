# Express 操作 MongoDB

如果想要用 JS 代码来操作 mongodb ，就要安装 mongoose 。

### 连接 MongoDB 数据库

```
npm i mongoose
```

先装包

api/index.js

```js
// mongoose START
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-love-api')
const db = mongoose.connection
db.on('error', () => console.error('Mongo Failed to Connect!!!!'))
db.on('connected', () => console.log('Mongo Connected'))
// mongoose END
```

导入 `mongoose` 功能模块，然后通过 Mongoose 提供的[connect()](http://mongoosejs.com/docs/api.html#index_Mongoose-connect) 方法连接到名为 `express-love-api` 数据库。下面设置一下链接失败和成功的提示信息。

`modemon` 命名所在的终端中，可以看到 `Mongo Connected` 信息。

### 构建 Post Model

api/models/post.js

```js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema(
  {
    category: { type: String },
    title: { type: String, required: true },
    body: { type: String }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Post', PostSchema)
```

导入 `mongoose` 功能模块以及调用它提供的 [Schema()](http://mongoosejs.com/docs/api.html#index_Mongoose-Schema) 接口创建一个新的 [schema](http://mongoosejs.com/docs/guide.html)，每个 schema 会映射为 MongoDB 数据库中的一个 collection（集合），同时还能定义所映射集合包含的字段，以及字段的类型等规范。下面代码就创建了一个名为 `PostSchema` 的 schema, 并规定所映射的集合将包含三个字段：category、title 和 body，并且每个字段只能存储字符串类型的数据，其中 `title` 字段中存储的数据不能为空。

选项 [timestamps](http://mongoosejs.com/docs/guide.html#timestamps) 的值设置为 `true`，则自动给所映射集合添加 `createdAt` 和 `updatedAt` 两个字段。

通过 Mongoose 的 [model()](http://mongoosejs.com/docs/api.html#index_Mongoose-model) 方法把一个 schema 编译成一个 model，一个 model 实例会对应映射集合中的一条记录，这个 `model()` 方法的第一个参数 `Post` 则是映射集合名字的单数形式，所以 `PostSchema` 映射集合的名字是 `posts`。上述代码还把构建成的 Post Model 导出供外部其它文件使用。

api/index.js

```js
const Post = require('./models/post')

app.post('/', () => {
  const post = new Post({ title: 'mongoose usage' })
  post.save()
})
```

首先导入 Post model，然后在创建新文章的 API 中，创建一个 model 实例 `post`，执行 `post.save()` 就可以把数据保存到数据库。

Postman 中，发出 `POST /post` 请求。

~/bin/mongo-ex.sh

```bash
mongo-express -u admin -p pass -d express-love-api -H localhost -P 27017
```

把启动 mongo-express 的命令稍微改一下，链接 `express-love-api` 数据库。

```
mongo-ex.sh
```

命令行中启动。 http://localhost:8081/db/express-love-api/posts 中可以看到保存的 post 记录了。
