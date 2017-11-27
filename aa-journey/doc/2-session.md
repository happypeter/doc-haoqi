# session

HTTP 本身就是个无状态协议，也就是你在一个 API 中设置一个变量，后一次请求再去访问这个 API 也拿不到这个变量了，服务器很健忘，马上就忘了客户端了。

这样你想想，怎么去实现一个购物车呀？session ”会话“（或者也叫对话， session 的本意是“一段时间”）机制可以解决这个问题。

实际上 IT 界，每次引入一个新技术，都是为了解决一个实际问题的。例如，人们发明 cookie 就是为了解决，服务器和客户端互不相认的问题。但是 cookie 有了，新问题来了，那就 cookie 的存储能力有限，如果一个用户买了很多件商品，那么这些商品信息要存在哪里呢？

### Session 基本原理

当前最流行的做法就是，在每次有一个新的浏览器用户登录进来，服务器端都会为这个浏览器开辟一个小的内存区域（注意，这个区域可以认为是一个文件，但是这个文件是存在服务器端的），通常的术语就叫”又创建了一个新的 session“，那么在这个 session 之中，服务器就可以为这位特定用户（其实就是为特定的那个浏览器）保存任意信息到 session 之中了（例如，用户名，购物车中的商品）。但是同一时刻，连接到服务器的浏览器可能成千上万，那么服务器是如何区分不同用户的浏览器的呢？简单的答案就是，使用 cookie 。

具体来说，每个服务器端的 session 被创建的时候，都会有一个类似于文件名的东西，叫做 sessionId 。每个 session 在服务端被创建的时候，sessionId 都会自动的被发送到浏览器的 cookie 中，这样，每个浏览器就跟自己在服务器上的 session 有了绑定关系了。


### 代码演示

自己手动基于 cookie 机制，去服务器上开辟 session 比较麻烦。所以各大语言框架都有自己的 session 管理接口，例如，express 的接口就是 [express-session](https://github.com/expressjs/session) 。


所以此时，peter 到服务器端，添加如下 API


```js
const session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.post('/login', function(req, res){
  let username =  req.body.username;
  req.session.username = username ;
  res.send(req.session.username);
})
```

这样，就可以达成如下效果：

- 浏览器从客户端发起请求，请求格式为

```
POST /login Content-Type: application/json {"username": "peter"}
```

- 这样，服务器端用

```
req.body.username
```

这一个变量，就可以接收到 `peter` 这个字符串了。


- 然后把 ”peter“ 这个字符串保持到 session 中，具体语句就是

```
req.session.username = username
```

- 之后，服务器会自动的把 sessionId 返回给浏览器，存储到 cookie 之中
  - 注意：req.session 接口，内置 cookie 功能

- 这样，浏览器每次就可以认领自己的 session 来拿到自己的用户名了。


补充：Session 就是一段时间，从用户登录网站开始，到用户退出网站结束的这个时间区间，就叫一次会话。上面的 req.session 是一个临时的存储区域，这个存储区域的生命周期是一次会话。


### 使用 curl 测试

命令如下：

```
$ curl -v -X POST -H "Content-Type: application/json" -d '{"username": "peter"}' http://tiger.haoduoshipin.com/login
> POST /login HTTP/1.1
> Host: localhost:3005
> Content-Type: application/json

...

< HTTP/1.1 200 OK
< set-cookie: connect.sid=s%3A37nZnzBeXX3E-vO9gmSatGf8wDfWcH_K.tKDCw3NGRdfwjPCetq%2BYEQXwiXlFcjHPCkug1zAmOFg; Path=/; HttpOnly
...
peter%
```

上面信息重要是分两部分：请求和响应，具体来说：

- 请求部分可以看到发出的请求是 `POST /login Content-Type: application/json {"username": "peter"}` 这个是符合 API 规范的，所以应该能够得到正确的返回
- 响应的第一行 `< HTTP/1.1 200 OK` ，200 表示一切正常
- set-cookie 是我们要查看的重点，我们可以看到 req.session 接口可以正确的返回 sessionId 给浏览器



### 总结

下一节我们来用 req.session 接口做出一个 login/logout 登录/退出 的实际例子。
