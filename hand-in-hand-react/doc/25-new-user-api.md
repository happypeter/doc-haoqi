# 后端编写用户注册接口

打开 `server/routes.js` 文件，服务器端定义一个响应 POST 请求的 `/auth/signup` API：

```
module.exports = function(app) {
  ...
  app.post('/auth/signup', function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function(err) {
      if(err) { return console.log(err); }
      return res.json({
        token: generateToken({name: user.username}),
        user: { name: user.username }
      })
    })
  })
}
```

### 后端测试用户注册接口

然后我们用 curl 这个命令行工具，来模拟客户端 JS 提交 JSON 数据的情形：

```
curl -H "Content-Type: application/json" -X POST -d '{"username":"doudou","password":"aaaaaa"}' http://localhost:3000/auth/signup
```

返回结果如下：

```
{
  "token": "xxx.xxx.xxx",
  "user": {
    "name": "doudou"
  }
}
```

说明，我们刚才定义的用户认证接口没有问题，工作正常

