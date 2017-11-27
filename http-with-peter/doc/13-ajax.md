# AJAX

新手学习网页开发之后，很快就会听到一个奇怪的术语 AJAX ，然后大家都会说这个东西很有用，必须学，
但是其实如果没有老手在旁边给演示一下，单凭去网上搜一下 AJAX 的概念性的资料，还是真的很难理解这个词。
所以这里 Peter 就给各位演示一下哈。


### 先说基本概念

AJAX 是”异步 javascript 和 XML “ 的简称（ Asynchronous JavaScript and XML ）。它的主要特点就是允许浏览器发送请求和处理响应的时候

>不用刷新整个页面

举个例子，如果你访问一个网站，服务器会给你一个响应生成你看到的主页。 正常情况下，每当用户点一个连接，或者提交一个表单，页面都会整个去刷新，这样有两个明显的弊端：

- 用户体验不好，因为页面会闪烁
- 新页面很多时候跟老页面相似度很高，整个页面刷新其实很多工作量是没必要的

当使用 AJAX 的时候，页面就不会刷新。为啥捏？ Ajax 请求本质上也就是一个普通的请求，服务器也会给出响应。跟普通的请求的区别也就是页面不会刷新了。但是页面要是不刷新，那么响应数据如何加载呢？

这些请求的响应会通过一些**回调函数**来处理。你可以这样理解回调函数，就是你把一些逻辑存放在这个函数里，当某个条件被触发之后再回来执行你前面存放的逻辑。我们的例子中，当响应返回的时候，回调就会被触发。回调函数里面写一些可以用来更新页面的 JS 语法，配合上刚刚返回的服务器端的数据，就可以实现替换页面局部的效果了。


### 来动手操作一下呗


来实现一个简单的发评论的效果：

public/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ajax</title>
</head>
<body>

  <button onclick="getInfo()">getInfo</button>
  <p>
    My Name is <span id='name'></span>
  </p>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
    let getInfo = function(){
      axios.get('/info').then(function(response){
        console.log(response.data.name);
        document.getElementById('name').innerHTML = response.data.name;
      })
    }
  </script>
</body>
</html>
```

server.js 代码：

```js
const express = require('express');
const app = express();


app.get('/', function(req, res){
  res.sendFile('index.html', {root: 'public'});
})

app.get('/info', function(req, res){
  res.json({name: 'happypeter'});
})


app.listen(3000, function(){
  console.log('listen on port 3000...');
})
```


### AJAX 词汇略显过时

为啥过时，因为当代 Web 应用，无刷新几乎已经成为标配。尤其是单页面概念盛行之后，这个趋势就更明显了。另外，传递
数据的格式原来用 XML ，现在大家也都用 JSON 了。

要记住的是，AJAX 请求就像是普通请求：发送到服务器的请求依然跟普通请求一样有着一个 HTTP 请求该有的所有组成部分，并且服务器处理 AJAX 请求的方法跟处理普通请求也是一样的。唯一不同就是，不是通过浏览器刷新来处理响应，而通常由客户端的一些 javascript 代码来处理。所以如果当然的一些所谓的发 AJAX 请求的知名工具，类似 Axios 或者 fetch 这些，官网的描述都不是

> 一个 AJAX 客户端

而是

>一个 HTTP 请求客户端

最近，Peter 自己讲课的时候也比较少用 ajax 这个词了。
