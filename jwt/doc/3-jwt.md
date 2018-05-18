# 生成 JWT 令牌

来看看在服务器端如何生成 JWT token 和进行 token 验证。

### 生成 token

```
npm i jsonwebtoken
```

安装 JWT 所需要的工具所在的 npm 包。

```js
//utils/jwt.js
const jwt = require('jsonwebtoken')
const { CERT } = require('../config')

const generateToken = user => {
  // sign 是同步的
  return jwt.sign(user, CERT, {
    expiresIn: 600 // 单位是秒
  })
}

module.exports = {
  generateToken
}
```

jwt.js 文件中添加生成 token 的函数。导入 config 文件中的证书。`generateToken` 中调用 `jwt.sign` 接口，对 `user` 对象进行签名，签名过程中需要证书和填写过期时间，这里我们写 `600` ，单位是秒。`sign` 函数是同步的，所以这里可以直接 return 加密后的字符串，也就是 JWT 令牌，令牌的英文叫 token 。后续咱们就都叫 jwt token 了。

```js
// config.js
module.exports = {
  PORT: 3009,
  DB_NAME: 'jwt',
  CERT: 'mySecret'
}
```

config.js 中添加证书秘钥。

```js
// contorllers/user.js
const { generateToken } = require('../utils/jwt')

exports.login = async (req, res) => {
  res.json({
    token: generateToken({ username: u.username })
  })
}
```

login 的 API 代码中，不要返回用户名了，这次返回 token 。

Postman 中请求一下 login 接口，把返回的 token 拷贝出来，粘贴到 https://jwt.io/ ，可以看到 token 是可以在客户端解码的，因为 token 中的数据只是被编码了，并没有被加密。所以可以很容易在浏览器端进行解码来获取各项信息。token 中还包含签名，签名的验证是必须在服务器上，通过证书才能进行的。

```js
{
"username": "peter",
"iat": 1526282923,
"exp": 1526283523
}
```

JWT 的 token 解码后有三项信息，`username` 是我们生成 token 的时候明文传入的。`iat` 是 `issue at` 也就是令牌发出时间，鼠标滑过网页上的这个时间，可以看到跟我们当前的时间相符。`exp` 是 `expire at` 也就是过期时间，鼠标滑过会发现，这个就是当前时间往后推 `600` 秒。

### 验证 token

```js
// utils/jwt.js

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, CERT, function(err, decoded) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ msg: '认证码失效，请重新登录!' })
        } else {
          return res.status(401).json({ msg: '认证失败！' })
        }
      } else {
        next()
      }
    })
  } else {
    return res.status(403).json({
      msg: '请提供认证码！'
    })
  }
}

module.exports = { requireAuth, generateToken }
```

添加一个中间件 `requireAuth` 来确认用户是否有权限执行某个 API 。从请求报头的 `authorization` 字段获得用户发送过来的 token ，传递给 `verify` 接口去进行验证。注意，这里的 `authorization` 首字母必须小写。Postman 中即使是用大写的首字母来发送，接收的时候也必须首字母小写。

验证的关键是看是 token 中是否包含 `CERT` 也就是证书信息。如果报错是 `TokenExpiredError` 证明证书过期了，返回 `证书失效` 的信息。其他错误都直接返回 `认证失败` 。如果没有错误，就进行 API 代码的执行。

如果请求报头中没有携带 token ，就返回 `请提供认证码` 这个信息。

```js
// routes.js
const Post = require('./controllers/post')
const { requireAuth } = require('./utils/jwt')

module.exports = app => {
  app.post('/post', requireAuth, Post.new)
}
```

创建新文章的接口上，使用 `requireAuth` 。

```js
// controllers/post.js
exports.new = (req, res) => {
  res.json({
    msg: '认证通过啦'
  })
}
```

创建新文章的 API 中，直接返回一个成功信息。

Postman 中，首先发出一个成功的 login 请求，拷贝返回的 token 。然后请求 `POST /post` 接口：

* 如果不添加请求报头，可以看到返回信息为 `请提供认证码`
* 添加 `authorization` 报头，把 token 传递过去，可以看到认证通过信息
* 把 `generateToken` 中的过期时间改为十秒，再次重复上面的过程，可以看到 `证书失效，请重新登录` 。
