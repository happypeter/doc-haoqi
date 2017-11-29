# Web API 的使用

当代 Web App 区别于老的 Web1.0 时代的一个显著特点是用户可以参与内容生成，但是另外一个显著特点是各个 Web App 之间如何互相连接。比如我们会见到一个网站会有 google/github 登录按钮，同时我们登录进这个网站之后，它会从我们的 google/github 账号上自动取出头像或者其他信息。这样的在我们自己的 Web App 中，去操作人家的 Web App 的工作就需要 Web API 来帮我们完成。会调用 Web API ，也是摩登 JS 开发者的一个基本手艺。

### API 和 Web API

先来说说 API 这个概念吧，太重要了。API 的英文全称是 Application Programming Interface ，中文直接翻译是“应用编程接口”，但是中国开发者口中，一本就叫“接口”，或者叫它“API"。例如：”Peter ，你这个接口用错了，参数不对“，或者” Peter ，你把 API 文档的链接给我发一下“，这些都是日常工作中的口头禅。

一个程序写好之后，会提供 GUI （用户图形界面），这个是给最终用户用的，但是一般程序还会提供出一部分功能出来，专门给自己公司或者是第三方的公司的程序员来使用。那么程序员使用这些功能的方式就是通过调用这个程序的 API 。一套编程语言（例如 JS ，Ruby ，Java）会有 API ，一套框架（例如 Jquery React )会有 API ，一个操作系统（例如 Linux Unix ）也会有自己的 API 。可以这样说

>API 提供供另外一个程序去使用的功能

好，那 Web API 是 API 的一类了。Web API 也叫 HTTP API ，因为这些 API 都是基于 HTTP 协议来工作的，换句话说就是要通过网络来进行调用的。

### Provider 和 Consumer

比如我的网站上集成了 Github 登录功能，那么你来到我的网站。登录之后，我就知道了你的 Github 用户名了。这样我可以拿这个用户名做参数，去请求 [Github API](https://api.github.com/) ，这样我就能得到你的用户头像了。

在这个过程中 API 的提供者是 Github.com ，而消费者是我的网站。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic16-1-api.png)

### JSON 格式

Web API 请求得到的数据一般都会是 JSON 格式的。例如我们可以用一个小工具叫 curl 来调用一下 Github 的 API ，命令行执行

```
curl https://api.github.com/users/happypeter
```

就可以得到如下的 JSON 数据：

```
{
  "login": "happypeter",
  "avatar_url": "https://avatars.githubusercontent.com/u/72467?v=3",
  "url": "https://api.github.com/users/happypeter",
  "name": "Peter Wang",
  "company": "web 开发视频死磕侠",
  "blog": "http://haoduoshipin.com",
  "location": "微信：happypeter1983",
  "email": "happypeter1983@gmail.com",
  "public_repos": 67,
  "public_gists": 19,
  "followers": 2082,
  "following": 21,
}
```

知道如何在自己的 JS 代码中发 Ajax 请求去得到这些 JSON 数据，并且在 JSON 数据返回到客户端中，如何如解析这些数据，是一个 JS 开发者的日常功课。

### 相关概念

Web API 使用会涉及到__同源策略__（ Same Origin Policy ），API key 和 token ，这些概念，主要是用来控制 API 的使用权限的，到时候随着实际例子学习就好。

### 参考

- [Working With APIs](https://launchschool.com/books/working_with_apis/)