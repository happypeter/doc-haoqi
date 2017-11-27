# 通过 POST 请求发送数据（Form 篇）

GET 请求是只读的，意思就是只能用来从服务器上获取信息。而相对的 POST 请求就是用来修改服务器的，例如修改数据库记录，上传一个文件等等。

GET 请求中，我们一般通过对 url 添加参数的形式传递额外的参数给服务器端，但是 POST 请求的情况下，通常我们都会把要传递的数据放到 request body 中。

使用 POST 请求通过 request body 携带数据到服务器端，有四种方式:

- 普通 html 表单 form 提交方式：application/x-www-form-urlencoded
- 上传文件惯用方式：multipart/form-data
- 通过 fetch/axios 等客户端提交 JSON 数据：application/json
- 还有一种方式是 text/xml ，不常用了

前三种都是比较重要的。我们本节来介绍第一种。


### application/x-www-form-urlencoded

这应该是最常见的 POST 提交数据的方式了。浏览器的原生 <form> 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。请求类似于下面这样（无关的请求头在本文中都省略掉了）：

```
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8
```



### 使用 express 程序演示一下

public/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>post</title>
</head>
<body>
  <form action="/login" method="post" >
    <label>username:</label>
    <input type="text" name="username">
    <input type="submit">
  </form>
</body>
</html>
```

index.js

```js
var express = require('express')
var app = express()


var bodyParser = require('body-parser')
// 创建 application/x-www-form-urlencoded 内容类型的解析器
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.post('/login', urlencodedParser, function (req, res) {
  console.log(req.body);
  console.log(req.rawHeaders);
  res.send('welcome, ' + req.body.username)
})


app.get('/', function(req, res){
  res.sendFile('index.html', {root: 'public'});
})

app.listen(3000, function(){
  console.log('running on port 3000...');
});
```



执行上面代码 req.body 打印出的 **请求 payload** 信息

```
{ username：Peter }
```

req.rawHeaders 打印出来的**请求头部**信息中，包含

```
'Content-Type', 'application/x-www-form-urlencoded',
```

这样的信息。

同样的上面的这两项信息，也可以在 Chrome 开发者工具->Network 标签下看到。


### 参考

- [四种常见的 POST 提交数据方式](https://imququ.com/post/four-ways-to-post-data-in-http.html)
