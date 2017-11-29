# 使用 Cookie 来保持状态

HTTP 的一个最大的特点就是它是**无状态**协议，但是有时候为了实现类似购物车这样的应用，我们
必须要求我们的应用保持一种状态，所以 cookie 就被发明出来了。


### 通常的一个页面请求过程

比如我们现在访问 haoqicat.com ，在 chrome devtools 的 Network 标签下可以看到，仅仅是打开首页，
就发出了很多个请求。其实具体的过程是这样，浏览器首先发出的是一个请求，也就是请求 haoqicat.com 的首页，
但是问题的是首页的 html 中有指向图片，css ，js 的一些链接，这样，浏览器就会自动发出后续的请求，以保证
最终页面是显示完整的。


上面所说的这些请求，都是 stateless 无状态的，也就是服务器收到后续请求后，根本不记得之前也收到过相关的请求。
也就是服务器根本不记得我的浏览器。 无状态就是**随时忘记**，也就是服务器没有办法去始终跟踪同一个浏览器。但是这样
比如说我们想用浏览器添加多个商品进购物车，那么服务器是没有办法记录，后添加的商品是不是跟前面添加的商品是同一个
浏览器请求的。

### Cookie 的诞生


其实当前也就真是为了解决购物车的这种需求，为了达成浏览器跟服务器之间的一种**持续连接状态**，让服务器知道到底用户是谁，
在1993年的时候，网景公司发明了 cookie 这个技术。

Cookie 就是咱们所说的曲奇饼干，浏览器的 Cookie 可以翻译成**浏览器的一个小文件**。文件中的信息，会被设置成 http 请求
的一个 header ，header 的名字就叫 **Cookie** ，让浏览器对这个 header 做特殊对待，每次发出请求的时候都会携带着 cookie
信息给服务器。


### 服务器端返回 cookie

那么浏览器的 cookie 小文件的信息是从哪里来的呢？Cookie 一般都是在服务器端设置的，通过 http 响应的头部返回给浏览器，浏览器拿到这些信息就可以保存到自己的 cookie 文件中。

例如，服务器代码写成

```
response.setHeader('Set-Cookie', 'id=123')
```

上面，浏览器中请求服务器的这段代码，在 chrome 开发者工具的 Application -> Storage -> Cookies -> localhost:3000 之下， 可以看到 `id=123`这些信息已经被保存为了浏览器的 cookie 。也就是说，浏览器一旦看到服务器响应的头部信息中包含

```
'Set-Cookie', 'id=123'
```

这样的信息，就会把数据拿出来，保存到自己的一个特殊的小文件，也就是 cookie 中，便于后续每次请求服务器的时候使用这些信息。后续的默认行为就是，每次浏览器再去访问同一个域名，都会在请求的头部中携带 cookie 信息的。

可以请求一下试试，在浏览器的 Network 标签下，看每次的请求 Headers ，都会看到 cookie 数据的。


### Cookie 的作用

一旦客户端有了服务器发来的特殊信息，例如上面的 `id=123` ，那么就等于服务器已经认识这个客户端了。客户端每次发请求都带着这些信息，
就可以到服务器上认领属于本浏览器的各种资源了。这样客户端和服务器端就建立起了一种连接状态，HTTP 的无状态的问题就被解决了。

### 参考

- [eventedmind 的 HTTP 课程](https://www.eventedmind.com/classes/how-the-web-works-7f40254c/maintaining-state-with-cookies-0d753134)


server.js 代码：

```js
var http = require('http');

http.createServer(function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Set-Cookie', 'id=234');
  res.end('hello world!\n');
}).listen(3000);

console.log('running on port 3000...');
```
