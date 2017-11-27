# 退一步，再看 HTTP

有了前面的初级知识，如果此时我们在升到高处，俯瞰 HTTP ，跟多的细节将会出现，
更完整的图景也就可以展示出来。

### Web 是如何工作的？

现在我们使用很多现成的框架去构建 Web 应用，但是如果我们能对 Web 的底层的一些基本原理了然于心，
那对于灵活使用这些框架显然是有巨大帮助的。其实这些 Web 的基础概念也不多，静下心，跟 Peter 聊
上一个小时，差不多也就搞明白了。

Web 的诞生，源于三大技术的诞生，它们都是当年 Web 之父 Tim Berners-Lee 自己
开发的，世界上第一个网站诞生的时间是 1991 年，三大技术的诞生也就是在此之前的不久：

- 第一个就是可以指向任何网页的 URL
- 第二个是 html
- 第三个就是 HTTP 协议

HTTP 是一个传输文件的协议，用来在客户端和服务器端传输数据。

### 写一个 Nodejs 的简单服务器

这次不用 express 了，使用 nodejs 自带的 http 模块，来写一个简单的服务器：

文件名 http.js


```js
var http = require('http');

http.createServer(function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world!\n');
}).listen(3000);

console.log('running on port 3000...');
```

执行

```
$ node http.js
```

然后用 telnet 来访问一下：

```
$ telnet localhost 3000
Trying ::1...
Connected to localhost.
Escape character is '^]'.
GET /

HTTP/1.1 200 OK
Content-Type: text/plain
Date: Thu, 15 Dec 2016 13:19:29 GMT
Connection: close

hello world!
Connection closed by foreign host.
```

telnet 有意思的地方就是我们可以手写请求，例如上面我们写

```
GET /
```

然后敲两次回车，就可以看到响应头部和响应数据了。

### 什么是一个“协议”？

HTTP 是一个 protocol ，一个协议。协议就是双方达成的一种规定，对于 HTTP 而言，就是客户端和服务器达成的一套规范。
有了这个规范，我们可以自己写客户端的代码，然后可以很放心的去连接任意的一台服务器。HTTP 是一个比较顶层的协议，
它有一个特别亲和的特点，就是通过它来回传输的数据，都是一些人类可读的字符，一些 header 信息，一些主体数据。

### 基础学会，才能学更多实用技术

为什么要先把 HTTP 学好呢，平常我们上网，或者写一些简单的代码似乎了解个大概就行了呀。因为作 Web 项目的时候，有时候
一旦用到一些稍微复杂的技术，如果不理解 HTTP 的基本原理，就会觉得很晕。例如学习 ajax ，web sockets ，cookies ，session 。
会了 HTTP 再去学 MVC RESTful 这些架构也都比较有底气了。


### 参考资料

- [eventedmind: How The Web Works](https://www.eventedmind.com/classes/how-the-web-works-7f40254c/introduction-how-the-web-works-fd9f78b1)
