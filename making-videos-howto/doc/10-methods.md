# HTTP 方法

每次我们发请求的时候，处理请求的 url 之外，还必然有一个**请求方法**，这个就是今天我们
要聊的 **HTTP 方法** 。GET 和 POST 是最常见的两种，但是其他的还有哦。


### 到底有几种方法？

列表如下：

- GET ，最常用的一种，用于从服务器上“得到”某个资源
- POST，往服务器上写入数据，跟 GET 作用相反
- PUT，也是写入数据，通常的用法是 POST 创建新数据，PUT 用来更新已有数据
- DELETE，删除服务器上的数据
- HEAD，跟 GET 一样，也是请求服务器上的资源，但是只要响应的 Headers ，这个不太常用，不用管
- 其他的还有 TRACE，OPTIONS，PATCH 等，都不常用，知道有它们存在就可以了

最重要的就是两个 GET 和 POST 。你可能会问，嗯，发 GET 请求我可以直接用页面链接或者浏览器地址栏，
发 POST 请求我可以用 form 发，那么其他的方法我怎么发呢？答案是，可以选用 axios/fetch 这样的 HTTP
客户端来从 JS 代码中发出。

到 [axios 的 README 文档](https://github.com/mzabriskie/axios) 可以看到，有下面这些方法可以使用：

```
axios.request(config)

axios.get(url[, config])

axios.delete(url[, config])

axios.head(url[, config])

axios.post(url[, data[, config]])

axios.put(url[, data[, config]])

axios.patch(url[, data[, config]])
```

当然，用的最多可肯定还是 .get() 和 .post() 。

### RESTful 架构

上面的列出的各种 HTTP 方法的使用场合其实没有严格的规定的，如果我们作为开发者，非要用 GET 请求来写数据到
服务器，也不是不可以做到的。但是尊重 HTTP 方法（有时候也叫做 HTTP 动词）的本来用法，是个好的习惯。

Nodejs 开发领域非常常用的 RESTful 架构，就是尊重 HTTP 方法本意的一个典范：


```
GET /posts       # 读取所有文章
GET /posts/:id   # 读取一篇文章
POST /posts      # 发布一篇文章
PUT /posts/:id   # 更新一篇文章
DELTE /posts/:id # 删除一篇文章
...
```

在 RESTful 的思路里面，HTTP 的方法的本意和用它真正发出请求执行的行为是非常吻合的。
