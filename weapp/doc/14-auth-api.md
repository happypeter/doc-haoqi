# 发送登录凭证 code 到服务器端

用户在小程序客户端完成登录之后，需要维护用户登录态。根据微信 [wx.login](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject) 接口文档中的【登录态时序图】可知，我们调用 `wx.login` 接口获取用户登录凭证（code）之后，应该把登录凭证传递给小程序后端服务器。本节就是要把用户登录凭证（code）从小程序客户端传送到我们自己搭建的服务器端。

### 安装 body-parser

Express 中间件 [body-parser](https://www.npmjs.com/package/body-parser) 的功能是解析 HTTP 请求中的正文信息，并存储到 `req.body` 对象，安装命令：

```
npm install --save body-parser
```

然后，在我们创建的 Express 实例 `app` 中使用 `body-parser` 中间件，修改 `index.js` 文件，代码如下：

```
let bodyParser = require('body-parser');
app.use(bodyParser.json());
```

因为从小程序客户端发送给服务器的是 JSON 数据，所以使用 [bodyParser.json()](https://github.com/expressjs/body-parser#bodyparserjsonoptions) 的 JSON 数据解析器

### 安装 morgan

为了方便调试，再安装一个 npm 包 [morgan](https://www.npmjs.com/package/morgan)，其功能是每次客户端请求服务器端 API 的时候，能够在服务器终端中输出该请求的日志信息，安装命令：

```
npm install --save morgan
```

然后，修改 `index.js` 文件，使用 `morgan`：

```
let morgan = require('morgan');
app.use(morgan('dev'));
```

`morgan` 支持多种日志输出格式，上述代码中使用了 [dev](https://www.npmjs.com/package/morgan#dev) 输出格式。

### 编写用户登录 API

在服务器端编写一个用户登录接口，支持 POST 请求的 `/login`，格式如下：

```
POST http://localhost:3000/login
```

修改 `index.js` 文件，添加 `/login` 接口的代码：

```
app.post('/login', (req, res) => {
  console.log(req.body);
  res.json({
    message: 'success!'
  })
});
```

### 客户端向服务器端发送登录凭证

服务器端的准备工作完成之后，转向小程序客户端，当用户登录成功获取到用户信息之后，调用 [wx.request](https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html#wxrequestobject) 接口，请求服务器端的 `/login` 接口，修改 `app.json` 代码如下：

```
wx.login({
  success: res => {
    let code = res.code
    if(code) {
      wx.getUserInfo({
        success: res => {
          wx.setStorageSync('user', res.userInfo)
          wx.request({
            url: 'http://localhost:3000/login',
            method: 'POST',
            data: {
              code: code
            },
            success: res => {
              console.log(res.data)
            }
          })
        }
      })
    } else {
      console.log('获取用户登录态失败！' + res.errMsg)
    }
  }
});
```

通过 `wx.request` 接口接受一个对象参数，其 `method` 属性指定 HTTP 请求的方法，`data` 属性则代表传递给服务器端的数据，包含用户登录凭证，`url` 指定请求的接口，因为在开发环境下，所以对接口的格式没有限制，接口中可以带有端口号，不支持 HTTPS 协议。不过，需要在小程序项目介绍页面，也就是点击左侧工具栏中的 `项目` 标签页，打开的页面中的勾选上【开发环境不校验请求的域名以及 TLS 版本】之后，才对 `wx.request` 请求的接口不做检查。

保存上述代码，小程序则会向服务器发送请求，若请求成功，在控制台会打印出日志信息 `success!`。在服务器终端中，会打印出客户端发送给服务器端的数据，如下：

```
{ code: '051bIzT629FmMN0zraV62WLnT62bIzTA'
}
```

本节操作完成之后，我们自建的小程序后端服务器和小程序客户端之间就能互通信息了。
