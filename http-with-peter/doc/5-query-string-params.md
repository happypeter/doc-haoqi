# 通过查询字符串传参数

虽然一般我们发送一个 GET 请求，就直接请求网站链接就可以了，例如访问 http://haoqicat.com 或者 http://haoqicat.com/http-with-peter 。但是有的时候，我们也希望 GET 请求能够携带一些更为详细的数据
到服务器端，以便服务器更为精确的为我们提供相应内容。

GET 请求中携带一些数据到服务器端的方法并不唯一，但是一种非常简单也非常常用的方式就是，使用**查询字符串** 来
传递数据，或者叫传递参数。


### 具体形式

如果打开 chrome 浏览器，打开 chrome 开发者工具的 Network 标签。然后浏览器中访问

```
http://haoqicat.com/?name=happypeter
```

上面的 `?name=happypeter` 就是所谓的**查询字符串**，这里面传递了一个参数，也就是 `name` ，参数值是 `happypeter` 。

此时，Network 标签下会看到，页面发出了多个请求，点第一个，也就是

```
?name=happypeter
```

这个请求，在 chrome 开发者工具的右下角，可以看到：

```
Query String Parameters
name: happypeter
```

意思就是：

```
查询字符串参数
name: happypeter
```

这些数据会作为请求的一部分，发送给服务器的。服务器端的框架，例如 express 有自己的办法去得到这些参数值，
至于服务器端代码如何使用这些参数，那就是自由的了。


### 传递多个参数


也可以传递多组参数的，每组之间以 `&` 隔开

```
http://haoqicat.com/?name=happypeter&email=peter@peter.com
```

Chrome 开发者工具右下角，此时就会看到两个参数了。

甚至可以写成这样

```
?order=desc&shoe[color]=blue&shoe[type]=converse
```

服务器端如果是 express ，就可以很方便的用 [req.query](http://expressjs.com/en/api.html#req.query) 来
难道传递过来的参数。


如果我想添加一个备用邮箱，可以使用`+`来进行连接

```
?name=peter&email=happypeter1983@gmail.com+b@b.com
```

注意现在 Chrome 右下角的参数，`email` 这一项就是两个值了。


### 一个实例

```
http://stackoverflow.com/search?q=http
```

这样，可以打开的页面是 stackoverflow 搜索 `http` 这个关键词之后的搜索结构页面。

### 参考

[teamtreehouse 的课程](https://teamtreehouse.com/library/http-basics/introduction-to-http/sending-data-with-a-get-request)
