# 通过 Web Sockets 建立长连接  

如果到 [MDN 的 HTML5 介绍页面](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)就会发现，今天要聊的 Web Sockets 是 HTML5 的新增功能之一。换句话说，Web Sockets 是浏览器提供给我们的一种通讯机制。

Web Sockets 技术到底算不算 HTTP 协议的一部分呢？不算！可以认为他们就是两套协议。但是毕竟二者紧密相关，所以聊
HTTP 就不能不聊 Web Sockets 。可以把 WebSocket 看成浏览器为了弥补 HTTP 协议的不足而打的一个大补丁。

### Web Sockets 要解决什么问题？

相对于 HTTP 这种非持久的协议，Web Sockets 是一个持久化的协议。

HTTP 协议特点就是简单傻瓜，客户端发请求，服务器给一个响应，然后就各找各妈，谁也不认识谁了。这种关系不但健忘，而且是单向的，客户端必须主动发请求，服务器端不能给客户端主动推送信息的。

如果只是基于基本的 HTTP 协议，来做个聊天室是很难的。比如，我跟朋友在聊天，朋友那边发了新信息，我的浏览器怎么能知道呢？服务器不能给我主动推送信息的弊端就暴露出来了吧。Web Socket 出现之前，都是通过一些瘸腿的技术例如 **long poll** 和 **ajax 轮询** 来实现，每次查询都是开启一次连接，然后再断开，耗费资源，效果差。

Web Sockets 带来的是两个改进：

- 客户端只要先发起一次 HTTP 请求，那么客户端和服务器这对朋友就算交上了，也就是建立了持久连接
- 以前都只能是客户端主动问，服务器端只有回答的份儿，现在不是了，服务器如果想主动说话，没问题，客户端也听着呢


### 实际解决方案 Socket.io

Web Sockets 的确很棒，但是毕竟是新特性，浏览器兼容性不好（其实 http://caniuse.com/#search=websocket 上可以看到目前支持的已经非常棒了）。

所以实际项目中我们可以通过 socket.io 来帮助我们更好的使用 Web Socket 技术。我觉得前面我扯这么多，也不如实际
用 socket.io 搭建一个项目，演示一下效果来的更清楚。

如果你移步 [好多视频网的 socket.io 的案例](http://haoduoshipin.com/v/99.html) ，会看到这一集里面，Peter 演示了：

- 如果用在客户端和服务器端建立一个长连接（客户端加载一个 socket.io 的客户端文件）
- 客户端怎么给服务器端发请求
- 服务器端收到了其他客户端的新提交内容后，如何给我的客户端主动发出一个通知









### 参考

- [知乎#Websocket问答](https://www.zhihu.com/question/20215561)
