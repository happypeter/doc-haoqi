# 生成 JWT 认证码传递给小程序

本节使用 [JSON Web Token](https://tools.ietf.org/html/rfc7519)（简称 JWT）规范来完成我们自己搭建的小程序后端服务器和小程序客户端直接的登录态校验，与官方文档推荐的方式不一样，但是普遍认为 JWT 是比 Session 更为优秀的解决方案。

### 安装 jsonwebtoken 包

在服务器端安装 [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) 包，这个包是 [JSON Web Token](https://tools.ietf.org/html/rfc7519) 规范的一个具体实现，可以生成 JWT 认证码。

```
npm install --save jsonwebtoken
```

### 构建生成 JWT 的函数

修改服务器端的 `index.js` 文件，首先导入 `jsonwebtoken` 模块：

```
let jwt = require('jsonwebtoken');
```

然后，在 `/login` 接口之前，定义一个生成 JWT 认证码的函数 `generateToken`：

```
function generateToken(user) {
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: 7200
  });
}
```

调用 [jwt.sign](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) 接口生成一个 JWT 认证码，其中 `user` 是要加密的数据；`config.jwtSecret` 是加密密钥，这个密钥不应该泄露，所以把它保存到 `config.js` 文件中了；`expiresIn` 代表过期时间，单位是秒。上节课程中我们自己搭建的小程序服务器向微信服务器请求用户态信息（openid 和 session_key）的时候，微信服务器返回的参数不止 openid 和 session_key，还有一项参数是 `expires_in`。你可以重新启动小程序，自己搭建的服务器的终端中会打印出微信服务器返回的数据，如下所示：

```
{ session_key: 'xxx',
  expires_in: 7200,
  openid: 'xxx' }
```

微信开发团队已经更新了 `expires_in` 这个参数值，在上节课程还是 `2592000`，现在已经变成了 `7200`，所以我们设置的 JWT 认证码的过期时间和微信服务器规定的小程序用户登录会话过期时间保持一致。

### 生成 JWT 认证码

修改服务器 `index.js` 文件中的 `/login` 接口代码生成 JWT 认证码返回给小程序客户端，代码如下：

```
axios.get(wxAPI)
  .then(response => {
    console.log(response.data)
    return res.json({
      token: generateToken({openid: response.data.openid})
    })
  })
```

上述代码中把用户的唯一标识 openid 加密生成 JWT 传递给小程序客户端，在客户端调试控制台中可以看到返回的 JWT 认证码。

### 小程序客户端存储 JWT 认证码

在小程序开发者工具中，修改 `app.js` 文件，把获取到 JWT 认证码保存到本地缓存中，代码如下：

```
wx.request({
  ...
  success: res => {
    wx.setStorageSync('token', res.data.token)
  }
})
```

之后小程序客户端请求自搭建的服务器上的受保护资源的时候，都需要从本地缓存中读取 JWT 认证码，并把它发送给自己搭建的服务器，经过服务器校验之后，才会返回给小程序受保护的数据。
