# 通过 POST 请求发送数据（axios/fetch 篇）


本节接上节，继续用 POST 请求往服务器端发送数据，不过这次讨论的是最为灵活方便的方式，也就是用

```
Content-Type: application/json
```

发送自已任意的 JSON 数据到服务器。原理前面都已经介绍清楚了，本节给出的是我自己最常用的实际代码解决方案。
客户端使用 axios 发出 http 请求，服务器端用 express 接收。

### 代码

public/index.html 如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>post</title>
</head>
<body>
  <h1>POST JSON Data</h1>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
  var data = {
    "username": "Peter Wang"
  }
  axios.post('/login', data)
    .then(function (response) {
      console.log(response);
    });
  </script>
</body>
</html>
```

index.js 如下

```js
var express = require('express')
var app = express()



var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.post('/login', jsonParser, function (req, res) {
  console.log(req.body);
  res.send('welcome, ' + req.body.username)
})



app.get('/', function(req, res){
  res.sendFile('index.html', {root: 'public'});
})

app.listen(3000, function(){
  console.log('running on port 3000...');
});
```

package.json


```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.15.2"
  }
}
```
