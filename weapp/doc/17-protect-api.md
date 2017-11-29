# 访问小程序服务器上的受保护资源

本节课程将在自搭建的小程序服务器上创建一个只有小程序登录用户自己才能访问的接口，一个获取用户购买的课程的接口，当然现在我们还没有实现小程序的微信支付功能，所以用户购买的课程只是存放在 MongoDB 数据库中的测试数据。然后演示如何在小程序客户端发送请求到自搭建的服务器获取到购买的课程。下面我们就先在自搭建服务器的 MongoDB 数据库中存储小程序登录用户的信息。

### 创建一个 User 模型

在小程序服务器端，新建一个 `models/user.js` 文件，添加代码：

```
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    openId: String,
    courses: {type: Array, default: ['weapp']}
  },
  {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);
```

上述代码创建了一个 `User` 模型，将对应 MongoDB 数据库中的 `users` 集合，用来保存小程序登录用户的信息。`openId` 字段则保存小程序用户的唯一标识（openid），`courses` 字段保存用户购买的课程，默认用户购买了 `weapp` 课程。

### 数据库中保存用户 openid

当自搭建服务器端首次获取到用户的 openid 之后，数据库中将新添加一条用户信息，保存用户的 openid，修改 `index.js` 文件，代码如下：

```
let User = require('./models/user');

axios.get(wxAPI)
  .then(response => {
    User.findOne({openId: response.data.openid}, (err, user) => {
      if(user) {
        return res.json({
          token: generateToken({openid: response.data.openid})
        })
      } else {
        const user = new User();
        user.openId = response.data.openid;
        user.save();
        return res.json({
          token: generateToken({openid: response.data.openid})
        })
      }
    })
  })
```

首先检查一下 MongoDB 数据库中是否保存了小程序微信用户的 openid，若已经保存了，则直接返回 JWT 认证码；若没有保存，说明用户是首次登录小程序，所以新创建一个 `user` 对象，保存小程序用户的 openid，然后再返回 JWT 认证码。

### 创建受保护接口

继续修改 `index.js` 文件，在 `/login` 接口下面，新添加一个 `/user/courses` 接口：

```
app.get('/user/courses', requireAuth, (req, res) => {
  User.findOne({openId: req.openid}, (err, user) => {
    if(err) { return console.log(err); }
    return res.json({
      courses: user.courses
    })
  })
})
```

因为 `/user/courses` 接口是受保护的资源，只有小程序用户自己才能访问到，所以要通过自定义的 `requireAuth` 函数验证用户身份之后，才会返回用户购买的课程。

### 定义 requireAuth 函数

仍然是在 `index.js` 文件中定义 `requireAuth` 函数，代码如下：

```
function requireAuth(req, res, next) {
  let token = req.headers.authorization;
  if(token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if(err) {
        if(err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: '认证码失效，请重新登录!' });
        } else {
          return res.status(401).json({ error: '认证失败！'});
        }
      } else {
        if(decoded.openid) {
          req.openid = decoded.openid;
          next();
        } else {
          res.status(401).json({ error: '认证失败！'});
        }
      }
    });
  } else {
    return res.status(403).json({
      error: '请提供认证码！'
    });
  }
}
```

首先获取到小程序客户端发送过了 JWT 认证码，这个认证码通过 HTTP 请求的 header 属性 `authorization` 传递过来。然后判断认证码 `token` 是否存在，若认证码不存在，则返回错误信息；若认证码存在，则调用 [jwt.verify](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) 接口解密认证码。若认证码解码过程中出现错误，则判断错误的类型，若是 [TokenExpiredError](https://github.com/auth0/node-jsonwebtoken#tokenexpirederror) 错误，说明认证码已经过期了，小程序用户需要重新登录；若是其它错误，则提示认证失败。若认证码解码成功，返回的数据为 `decoded`，然后检测 `decoded` 中是否包含用户的 openid，若包含 openid，则把 openid 传递给 `/user/courses` 接口中的下一个中间件，否则提示认证失败。

### 小程序客户端请求服务器端受保护接口

至此，服务器端的准备工作已经完成了，该转战小程序客户端了，打开 `mine.js` 文件，添加代码：

```
onLoad: () => {
  ...
  const token = wx.getStorageSync('token')
  wx.request({
    url: 'http://localhost:3000/user/courses',
    header: {
      'Authorization': token
    },
    success: function (res) {
      console.log(res.data)
    }
  })
}
```

当用户个人主页加载的时候，先读取存储在本地缓存中的认证码，然后就调用 `wx.request` 接口请求自己搭建的服务器上的 `/user/courses` 接口，把 `token` 放到 header 中传递给服务器。若请求成功，则在控制台显示返回的数据。

至此，小程序微信用户登录功能就演示完毕了。
