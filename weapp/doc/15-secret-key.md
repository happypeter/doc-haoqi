# 小程序服务器端获取用户登录态信息

上节课程我们已经把微信用户登录小程序的登录凭证（code）发送到自己搭建的小程序后端服务器了，本节课程我们将利用用户登录凭证，还有在微信公众平台注册小程序的时候生成的 AppID（小程序 ID）和 AppSecret（小程序密钥）请求微信服务器接口，获取用户的登录状态信息，包括小程序用户的唯一标识（openid）以及用户本次登录小程序与微信服务器之间生成的会话密钥（session_key）。

### 服务器端构建微信接口地址

微信服务器提供的可以获取用户登录态信息的接口地址是这样的：

```
https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
```

接口有四个参数，[wx.login](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject) 接口文档的【code 换取 session_key】部分讲述的很清楚了，这里再复述一下：

* appid 参数值为：小程序 ID
* secret 参数值为：小程序秘钥
* js_code 参数值为：用户登录凭证
* grant_type 参数值为：authorization_code

知道了上述微信接口地址中各个参数的含义，下面我们就在服务器端构建本案例需要的真实的接口地址，新建一个 `config.js` 配置文件，添加代码：

```
module.exports = {
  appId: 'xxx',
  appSecret: 'xxx'
}
```

上面代码中的 `appId` 代表小程序的 ID，`appSecret` 代表小程序的秘钥。因为这两项数据都比较重要，不应该公开，这个文件需要开发者自己设置。

然后修改 `index.js` 文件，首先导入 `config.js` 文件中的配置信息，如下：

```
let config = require('./config');
```

然后，在 `/login` 接口中，构建请求的微信接口地址：

```
app.post('/login', (req, res) => {
  const queryString = `appid=${config.appId}&secret=${config.appSecret}&js_code=${req.body.code}&grant_type=authorization_code`;
  const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`
});
```

因为整个接口地址比较长，为了代码看起来整洁一些，所以把接口先拆分再组合起来。

### 安装 axios 请求微信接口地址

在 Node.js 运行环境下发送 HTTP 请求，我们可以使用 [axios](https://github.com/mzabriskie/axios)。

```
npm install --save axios
```

`axios` 包安装完毕之后，就可以调用 `axios` 的接口向我们之前构建的 `wxAPI` 接口发送 GET 请求了。

```
app.post('/login', (req, res) => {
  ...
  axios.get(wxAPI)
    .then(response => {
      console.log(response.data);
      res.json({
        message: 'success!'
      })
    })
    .catch(error => {
      console.log(error);
    });
});
```

当接口请求成功之后，打印出返回的 JSON 数据 `response.data`，格式如下：

```
{ session_key: 'xxx',
  expires_in: 2592000,
  openid: 'xxx' }
```

其中，`session_key` 就是小程序用户登录之后，微信服务器为小程序用户本次登录生成的会话秘钥；`openid` 就是确认小程序用户身份的唯一标识；`expires_in` 是小程序用户本次登录会话过期时间。不过，官方文档中并没有介绍 `expires_in` 这个返回参数，但是却给出来一个检查用户登录态（会话）是否过期的接口 [wx.checkSession](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxchecksessionobject)，这个接口用在小程序客户端。

拿到了小程序登录用户的唯一标识和会话秘钥之后，接下来要做的事情就是在我们自己搭建的小程序服务器和小程序客户端之间进行用户登录态校验，只有这样，当小程序用户请求我们小程序服务器上的资源的时候，小程序服务器才能够识别当前用户身份，响应正确的数据。
