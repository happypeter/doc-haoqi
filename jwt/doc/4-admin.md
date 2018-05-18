# 验证管理员角色

给用户添加一个 admin 字段，值为 true 的就是管理员。

### 服务器端设置用户为管理员

```js
// models/user.js
    admin: { type: Boolean, default: false }
```

给 user 添加新字段 `admin` 默认为 `false` 。

Postman 中注册一个名为 'aa' 的用户，然后通过 `mongo-express` 把这个新注册用户设置为管理员。

```js
// controllers/user.js

res.json({
  token: generateToken({ username: u.username, admin: u.admin })
})
```

API 代码中，登录或者注册成功后，都返回 token ，其中也都包含 admin 信息。

Postman 中再次用 aa 这个用户登录。拷贝 token 到 https://jwt.io/ ，可以看到果然包含 `admin: true` 的信息了。这样的信息可以让客户端辨识 aa 的管理员身份。

### 客户端以 admin 身份发请求

现在想要达成这样的效果，客户端发出新建文章的请求，如果用户是 `admin` 那么请求成功，如果不是，就拒绝。

```js
// utils/jwt.js

if (decoded.admin === true) {
  next()
} else {
  res.status(401).json({ msg: '认证失败！' })
}
```

到 `requireAuth` 代码中，验证没有错误之后，由原来的直接`next` ，改为判断解码后的信息中 `admin` 是否为 `true` ，如果不是管理员，那么一样返回认证失败的信息。

来测试一下。

Postman 中，用 aa 登录，拿到 token ，请求写文章的 API ，可以看到认证通过。重新注册一个新用户 `bb` ，拷贝返回的 token 到 jwt.io ，可以看到 `admin` 一项为 false 。用 `bb` 的 token 去请求文章 API ，会看到 `认证失败` 字样。

### 跨域问题解决

```
npm i cors
```

装包，跨域资源共享。

```js
// index.js
const cors = require('cors')
app.use(cors())
```

导入 `cors` 中间件。这样未来客户端中发请求的时候就不会被拒绝了。

### 完善文章相关 API

```js
// models/post.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
```

创建 post 的数据模型，主要字段就是 `title` 和 `body` 。

```js
// controllers/post.js

const Post = require('../models/post.js')

exports.new = async (req, res) => {
  try {
    const p = new Post(req.body)
    await p.save()
    res.json({
      id: p._id,
      title: p.title,
      body: p.body
    })
  } catch (err) {
    res.status(500).json({ msg: '保存错误' })
  }
}

exports.all = async (req, res) => {
  try {
    const data = await Post.find()
    const posts = data.map(t => ({
      id: t._id,
      title: t.title,
      body: t.body
    }))
    res.json(posts)
  } catch (err) {
    res.status(500).json({ msg: '服务器出错啦' })
  }
}
```

controller 文件中，添加创建一篇文章，和读取所有文章的 API 。

```js
// routes.js

app.get('/posts', Post.all)
```

routes 文件中添加一下读取所有文章的路由。

Postman 中，发出 `POST /post` 请求：

* body 数据选 raw ，格式选 application/json
* header 中携带 `aa` 的未过期的 token
* json 数据有 title 和 body 两项

可以看到发布文章成功了。

然后，发出 `GET /posts` ，请求所有文章。也可以看到成功返回了文章数组。

至此，API 就做完了。
