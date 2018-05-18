# bcrypt 加密认证

密码保存到数据库之前，一般都会进行 hash 运算再保存，这样万一数据库泄露，用户的密码依旧是安全的。

## 重构

随着 API 越写越多，都放到一个文件里面显然就很乱，所以先来重构一下代码。

```js
//index.js
const routes = require('./routes')
routes(app)
```

index.js 中，删除对 model 的导入以及两个 API ，然后导入路由文件。

```js
//routes.js

const User = require('./controllers/user')

module.exports = app => {
  app.post('/user/signup', User.signup)
}
```

路由文件中导入 user controller 。当请求，`/user/signup` 时，具体执行的代码在 user controller 中的 signup 字段下定义。

```js
//controllers/user.js

const User = require('../models/user.js')

exports.signup = async (req, res) => {
  try {
    const u = new User(req.body)
    await u.save()
    res.json({
      id: u._id,
      username: u.username
    })
  } catch (err) {
    res.status(406).json({ msg: '用户名重复' })
  }
}
```

api 核心代码都在 controllers 文件的`signup` 函数中，通过 try/catch 来捕获错误。
`u.save` 是异步函数，所以要使用 async/await 来配合。如果 u.save 之前没有 await ，那么 `u.save` 还没有执行完毕， `catch` 语句早就执行完了，所以也就不会捕捉到应有的错误了。

那么什么情况下 `u.save` 会触发错误呢？因为在 `user.js` model 文件中， 有对 `username` 的 `unique: true` 设置，所以如果用同样的用户名再次注册，就会触发错误，执行 `catch` 中的语句。

Postman 中用之前的信息重复注册，响应信息为“用户名重复”，改一个用户名，可以注册成功。

## bcrypt 加密

```
npm i bcryptjs
```

bcrypt 可以用来对字符串进行哈希运算，例如这里可用它来把咱们的密码，变得面目全非。

```js
// models/user.js
const bcrypt = require('bcryptjs')

...
UserSchema.pre('save', function(next) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})
```

user model 文件中，添加一个保存前自动执行的钩子，因为涉及到 this 的使用，所以这里不用 es6 箭头函数。先来生成 salt ，然后进行哈希运算，把得到的哈希保存到数据库的 `password` 字段中。

Postman 中再次注册，mongo-express 中可以看到密码确实是哈希了。

## 登录

数据库中不存密码，那怎么登录呢？

```js
//controllers/user.js

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const u = await User.findOne({ username })
    if (!u.comparePassword(password)) throw Error('密码错误')
    res.json({
      username: u.username
    })
  } catch (err) {
    res.status(406).json({ msg: '用户名密码错误' })
  }
}
```

login 的 API 中，先根据客户端发送过来的用户名找到该用户。如果找不到，直接就会触发 catch 了。try 中后续语句根本不会执行。如果找到了对应用户名的用户 `u` 就执行 `u.comparePassword` 进行密码校验，校验不匹配，就 `throw` error 触发 catch 中的语句。所以只有当用户名密码都匹配了， `res.json` 才会被执行，返回给客户端一些用户的信息，这里暂时只是返回用户名，回头会在这里返回 jwt 令牌。

catch 被触发的原因可能有两种，或者是 `findOne` 执行未找到用户，这样的错误信息应该是用户名错误，第二种原因就是密码不匹配。这里我们就不分的那么细了，反馈给客户端的信息统一为 `用户名密码错误` 。

```js
//models/user.js
UserSchema.methods = {
  comparePassword(password) {
    // NODE: 因为涉及到使用 this ，所以要慎重使用 es6
    return bcrypt.compareSync(password, this.password)
  }
}
```

进行密码校验的函数 `comparePassword` 定义在 user 模型中，虽然保存到数据库中的哈希值是不能反向运算的，也就是没有任何方法可以从哈希运算出原本的 password 。但是还是可以正向验证的，也就是通过 `bcrypt.compareSync` 接口，可以再次对用户提交的密码，也就是 `password` 再次进行哈希运算，那么只要用户提交的密码不变，这个运算结果也不变，所以就会跟数据库中保存的 `this.password` 中的哈希值匹配上。这样，就验证了用户输入的密码是正确的。

routes.js

```js
const User = require('./controllers/user')

module.exports = app => {
  app.post('/user/signup', User.signup)
  app.post('/user/login', User.login)
}
```

添加 login 对应路由。

到 Postman ，尝试登录，发现可以登录成功。输入错误的用户名密码，也会看到报错信息。
