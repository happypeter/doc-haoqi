#  HTTP 协议浅尝

HTTP 就是 Hypertext Transfer Protocol 的简写，意思是超文本传输协议。它是一个无状态的，应用层的协议，是我们每天上网肯定会用到的协议，不然为啥网址前面都带 http 字样呢。作为 JS 摩登开发者，TCP/IP 可以稍微懂点就行，HTTP 就需要掌握的比较扎实了。HTTP 是 Web 的基础。

当然，我们还是带上我们作为 Js 开发者的眼镜，有重点的来聊聊。先来聊聊基础知识，然后再聊一些重要的功能点。更多 HTTP 学习内容，请阅读 [《跟 Peter 学 HTTP 》](http://haoqicat.com/http-with-peter) 。

### 为何要学 HTTP 协议

不管用户使用的客户端是手机原生 App ，还是 Web App ，一旦涉及到跟服务器的通讯，通常都会走 HTTP 协议。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic6-1-http.png)

了解 HTTP 协议的工作方式，会使用特定的工具的调试一下 HTTP 中常见的错误，是 JS 开发者的必备手艺。

### 基础工作方式

官方的材料在[这里](https://www.w3.org/Protocols/rfc2616/rfc2616) ，我们不会都介绍。

HTTP 可以让服务器和客户机进行通信，工作方式是可以配置的。HTTP 是个无状态（ state-less ）协议，运行在 TCP/IP 协议之上，默认端口号是 80 ，但是也可以配置使用其他的端口号。

客户机和服务器的每次通信都是通过一个 __request/response__ ，也就是 __请求/响应__ 过程来完成的。每次通信的起点是，客户机创建一个 HTTP 请求，然后，服务器接收到请求会给客户机发送 HTTP 响应。

当前广泛使用的 HTTP 版本是 v1.1 。

### URL

要发送 Http 请求，就要用到 URL （ Uniform Resource Locators ），也就是咱们理解的网站链接。例如

>http://haoduoshipin.com

其中 `http` 是协议名称，有的网站用 `https` 也就是加密的 http 。URL 的最后可以跟一个”端口号“（ port ），用冒号和主要部分隔开，例如：

>http://haoduoshipin.com:80

因为默认访问的就是80端口，所以上面的 `:80` 可以省略，但是也可以指定其他端口。

URL 中还可以包含资源路径，例如：

>http://haoduoshipin.com/about.html

### HTTP 动词（ verb )

我们日常用浏览器上网，感觉就是敲网址或者点击链接，直接访问 URL 就可以了。但是实际在技术底层，还有一个神奇的东西叫 __HTTP 动词__ ，每次请求其实都会涉及到，简单说，

>一次请求=动词+URL。

主要的动词有：

- GET 就是用来读取信息的，通常我们用的最多的就是这个。例如，点一个普通链接，或者浏览器中输入网址 
- POST 创建一个新资源，用来向服务器上写数据。例如，点一个 form 的提交按钮，很多时候都触发这个动词
- PUT 更新一个已有的资源，也是写操作。这个实际中用得少，很多时候用 POST 来代替它
- DELETE 删除一个已有资源

上面的四个动作是比较常见的，也是大部分浏览器都支持的，其中 GET 和 POST 是所有浏览器都支持的，这个是 JS 开发者要知道的一个小点。其他动词还有，例如 HEAD 。

### 状态码

好，现在客户机可以向服务器发请求（ request ）了，服务器收到了会如何回应（ response ）呢？会返回的是一个状态码和一些其他信息。我们这里先来聊状态码。状态码告诉客户端如何来解析服务器的返回信息。不同的状态码代表非常不同的意思：

- 1xx 1xx 的意思就是100多，这一系列的状态码都不常用，不用记了。
- 2xx 表示某种成功状态
- 200 最常见的就是 200 ，意思是一切 OK 
- 202 被接受（ Accepted ）
- 204 无内容（ No Content ），返回信息主体内容为空
- 3xx 重定向（ Redirection )，浏览器收到这个状态之后一般会自动跳向另一个 URL ，这个是常用的
- 301 永久性被移动（ Moved Permanently ）资源已经在一个新的 URL 位置了
- 304 未修改（ Not Modified ）。服务器认定资源没变，客户端缓存依然可以用。
- 4xx: 客户端错误。为何叫客户端错误呢？比如如果出现 404 ，一般就是认为客户端发出的 URL 不对
- 404 没找到页面或者资源，这个应该是所有状态中最知名的一个了 
- 400 Bad Request ，请求的格式不对
- 401 未授权（ Unauthorized )。 
- 其他还有 403 Forbidden 405 Method Not Allowed 409 Conflict
- 5xx Server Error 服务器端错误，基本意味着请求合法，但是服务器在处理请求的过程中自己崩溃了
- 500 是这个系列中最著名的，服务器内部错误。这个是必须记住的，我们开发调代码的时候，如何看到这个错误，就知道是服务器端的代码有 bug 了。
- 其他还有 501 Not Implemented 503 Service Unavailable

### 要学会用 Chrome 开发者工具

很多工具都可以用来查看 HTTP 请求/响应 过程。例如命令行工具 Curl ，另外很常用的就是 Chrome 浏览器自带的开发者工具。

### Websocket

HTTP 是无状态的（ state-less ）的，关于无状态这一点，大家可以再查查资料多学习一下，因为很重要。简单来说，HTTP 协议进行的连接，就是客户端发请求给服务器，服务器马上给出一个应答，然后这个连接就结束了，可以说是瞬时连接，然后你我谁也不记得谁了。Websocket 就是 HTTP 的这个弱点的补足，让客户机可以跟服务器进行长连接，以便进行实时的，双向的通讯。Websocket 目前在大一点的网站中基本上已经是标配了，所以这个一定要学的。

### 参考

- <http://www.frontendhandbook.com/learning/http-networks.html>
- <http://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177>