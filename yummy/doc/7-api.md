# 实现认证 API

欢迎进入新的小节《实现认证 API》。把注册登录后端的 API 先都调通，会用到 Postman 。

### 运行 happy-api-starter

首先进入《运行 happy-api-starter》这部分。通过一个 express 的项目脚手架代码，直接运行起一个后端 API 服务器。

首先保证系统已经安装了 mongodb 数据看。Mac 系统可以参考[官方文档](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)，使用  Homebrew 来安装。

下载一个 express 的脚手架 happy-api-starter。到[官网的发布页面](https://github.com/happypeter/happy-api-starter/releases) 下载 v1.0.0 版本的压缩包，然后解压。放到咱们的项目中和 client 平级即可，这样很多 express 搭建的基础步骤就都省了。

安装依赖。命令行中执行

```
npm i
```

安装的包里面包含跨域共享，body 解析，mongodb 控制等各种功能的包。

首先把 mongodb 启动起了。package.json 中有一个名为 `db` 的脚本，所以运行

```
npm run db
```

就可以把数据库启动起来了。

启动项目。执行

```
npm run dev
```

就可以把 Express 启动起来了。

看一下本部分的劳动成果。打开 starter 代码的 routes.js 文件。可以看到我们已经启动起了用户认证相关的所有 API，包括登录注册获取用户信息等等。

至此，《运行 happy-api-starter》这部分就胜利完成了。


### 使用 Postman 调通 API

进入下一部分《使用 Postman 调通 API 》。写前端代码之前，明智的做法是先确认 API 都已经正常运行了，[Postman](https://www.getpostman.com/) 是 API 开发的必备工具。

第一个是用户注册接口。发送请求

```
POST localhost:3008/user/signup
```

header 添加 `Content-Type: application/json` ，负载数据  Body 一项选 raw 然后添加 json 数据


```json
{
    "username": "happypeter",
    "password": "222222"
}
```

然后 Send 。可以接收到的返回信息是

```
{
    "user": {
        "_id": "5a1bb4aed88f77734409f956",
        "username": "happypeter123"
    },
    "msg": "注册成功"
}
```

证明注册接口工作良好。

第二个是用户注册报错接口。保持上一步所有请求信息不变，直接点 `Send` 。可以看到

```
{
    "msg": "用户名重复，请重新注册"
}
```

这样的信息。证明注册报错接口工作正常。

第三个是登录接口。发送请求

```
POST localhost:3008/user/login
```

负载数据 `Body` 这项选择 `raw` ，添加跟注册时候相同的 json 数据，点 `Send`.可以看到

```
{
    "user": {
        "_id": "5a1bb40ad88f77734409f955"
    },
    "msg": "登录成功"
}
```

证明登录接口工作正常。

第四个是登录用户名不存在报错接口。将上一步请求中的负载数据中的用户名做一下修改，点 `Send` 。可以看到

```
{
    "msg": "用户不存在"
}
```

证明登录用户名不存在报错接口正常运行。

第五个密码错误接口。用户名复原，密码改错，在点一下 `Send` 。可以看到

```
{
    "msg": "密码错误，请核对后重试"
}
```

证明密码错误接口运行正常。

看一下本部分最终成果。用 Postman 测试了大多数的认证接口，了解了各种情况下都应该发送什么信息，返回中都包含什么信息。后续真正做前端开发的时候就心里有数了。

至此《使用 Postman 调通 API 》这部分就胜利完成了。

### 总结

进入最后一部分《总结》。

先来复盘一下本节思路。核心任务就是搭建 API 服务器，但是其实使用 express 的时候总有一些重复性的任务，我们没有在这方面拖延，而是直接使用了一个脚手架程序 happy-api-starter ，直接获得了整套的认证 API ，最后，也是很重要的一个任务，通过使用 Postman 这个 API 调试功能，我们保证了 API 运行是正常的，也了解了 API 调用时候的输入和返回数据的详情。

至此，《实现认证 API》这个小节就胜利结束了。