# 同源策略

同源策略（ Same-origin policy ）是一个重要的概念，它允许来自同一站点的资源进行互相访问而不受限制，但是会阻止其他不同站点对文档/资源的访问。


### 先看报错

server/index.js

```js
const express = require('express');
const app = express();


app.get('/info', function(req, res){
  res.json({ name: 'happypeter'});
})

app.listen(3000, function(){
  console.log('listen on port 3000...');
})
```

client/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ajax</title>
</head>
<body>

  <button onclick="getInfo()">getInfo</button>

  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script type="text/javascript">
    let getInfo = function(){
      axios.get('http://localhost:4000/info').then(function(response){
        console.log(response);
      })
    }
  </script>
</body>
</html>
```

启动客户端使用

```
npm install http-server -g
```

在开启一个命令行标签，然后

```
cd client
http-server .
```

就可以访问 localhost:8080 看到 index.html 页面了。

不幸的是，如果此时点击页面的按钮，执行 axios 请求，Chrome 终端（ console ）中就会报错：

```
XMLHttpRequest cannot load http://localhost:4000/info. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access.
```

### 错误分析

`XMLHttpRequest` 就是浏览器原生的发起 HTTP 请求的机制，报错说 `cannot load` 也就是说不能加载后台的 API
资源。然后，给出了原因

>No 'Access-Control-Allow-Origin' header is present on the requested resource.

翻译过来就是：被请求的资源的头部中没有 `Access-Control-Allow-Origin` (访问-控制-允许-源)这个头设置。

此时，如果我们用 curl 来请求一下：

```
$ curl -I localhost:3000/info
HTTP/1.1 404 Not Found
X-Powered-By: Express
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 18
Date: Sun, 25 Dec 2016 12:03:36 GMT
Connection: keep-alive
```

上面 `-I` 参数表示只显示请求资源头部。可以看到头部中果然是没有 `Access-Control-Allow-Origin` 这一项的。
但是为什么没有这一项的设置，请求就是报错呢？

这个就落脚到今天的主角了，就是同源策略。就是我 localhost:3000/info 提供的资源，只允许同域名下的各个页面去发起请求，而不同域名的页面中（或者像我们这样，域名相同，但是端口号不同）去请求 /info ，默认就直接拒绝。

那么如何去撤销同源策略（ Same-origin policy ）呢，对应的解决方案就是通过 CORS （ Cross Origin Resoure Sharing ）也就是”跨域资源共享“。而实现跨域资源共享的方式，就是通过添加头设置

```
Access-Control-Allow-Origin: *
```

一旦给资源添加了这个头设置（ header ），就意味着来自任何域名源头（ * 的作用）的访问都会被允许了。


### Express 下的具体实现方式

那么当前就以 express 代码为例，看看如何来添加需要的头设置。最简单的方式，就是在被请求的 API 中添加

```
res.header('Access-Control-Allow-Origin', '*');
```

或者，也可以使用 [cros](https://www.npmjs.com/package/cors) 这样包。

不管是上面那种方案，最终如果我们在发 curl 请求，都可以看到响应中已经有了需要的头设置，并且前台运行代码，
请求也可以胜利完成了。

### 结语

同源策略涉及的是访问文件内容，而不是链接，你可以随意链接到任何 URL。 同源策略是防范会话劫持的重要手段，是 web 应用安全的基石。
