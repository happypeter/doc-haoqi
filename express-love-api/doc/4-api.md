# 构建一套 RESTful API        

这节我们来实现一套 RESTful API ，实现文章（ post ）的增删盖查操作。


### 查，读取所有文章的 API

读操作，一般用 GET 方法，所有博客，英文叫 `posts` ，所以这个 API 的路由就要写成

```
app.get('/posts', function() {

  })
```

然后，API 的主体内容，就是要拿到数据库中的数据。


回调中，写 mongoose 语句

API 的实现如下：

```
app.get('/posts', (req, res) => {
  console.log('GET /posts........')
  Post.find().sort({'createdAt': -1}).exec(function(err, posts) {
    if (err) return res.status(500).json({error: err.message})
    res.json({ posts })
  })
})
```

上面的 API 会等待客户端的 GET /posts 请求，一旦收到请求，首先打印 `GET /posts...` ，然后去进行数据库的读取操作，读到所有的文章内容，存到  posts 变量中，然后，通过 res.json 语句，把数据以 JSON 的格式反馈给客户端，供前端开发者使用。


### 查，读取一篇文章详情

API 路由要写成

```
app.get('/post/:id', (req, res) => {
  Post.find({_id: req.params.id}).exec(function(err, post) {
    if (err) return res.status(500).json({error: err.message})
    res.json({ post })
  })
})
```


有了上面的代码，然后就可以从客户端发请求了。我们先用 curl 来模拟一下客户端代码：


```
curl 'http://localhost:5000/post/23423532532'
```


### 增，添加一篇博客

这个涉及到接受客户端传递的复杂 JSON 数据。

通常如果用 axios 发送 POST 请求，发送的数据格式为 JSON ，可以用下面的 curl 命令来模拟：

```
curl -H "Content-Type: application/json" -X POST -d '{"title":"happypeter"}' http://localhost:5000/post
```

上面:

  - `-H` 选项后面跟的是 HTTP 报头，设置数据格式为 json
  - `-d` 后面跟的是负载数据( payload )


服务器端如果要接受这些数据，需要再专门安装一个包：

```
npm i --save body-parser
```

然后添加如下代码：


```
var bodyParser = require('body-parser')
...
app.use(bodyParser.json())
```


这样，如果我的 API 写成这样


```
app.post('/post', (req, res) => {
  console.log(`POST /post`, req.body)
  var post = new Post(req.body);
  post.save(function(err){
    if(err) console.log(err)
  })
} )
```

就可以把客户端传递过来的数据，保存到数据库了。同时，后端开发者给前端开发者的 API 文档应该是这样：

```
POST  /post

{
  title: String,
  content: String,
  category: String
}
```

上面 `POST` 是请求方法，`/post` 是 API 路由，最后是负载数据结构。于是前端开发者要有能力写出对应的 axios 语句来。

### 改，更新文章内容

在 RESTful 规范下，更新一篇博客的内容要用

```
PUT /post/:id
```

具体 API 实现：

```

app.put('/post/:id', function(req, res) {
    if (req.body.title === '') return res.status(400).json({error: '文章标题不能为空！'})
    Post.findById({_id: req.params.id}, function(err, post) {
      if (err) return res.status(500).json({error:  err.message})
      for (prop in req.body) {
        post[prop] = req.body[prop]
      }
      post.save(function(err) {
        if (err) return res.status(500).json({error: err.message})
        res.json({
          message: '文章更新成功了！'
        })
      })
    })
  })
```

API 有了，一般先用 curl 测试一下


```
curl -X PUT -H 'Content-Type: application/json' -d '{"title": "newTitle"}' http://localhost:5000/post/593607542cf2f60539a17692
```

然后再动手写 axios 代码。


### 删，删除一条 post

根据 RESTful 规范，删除一条 post

```
DELETE /post/:id
```

API 代码写成：

```
app.delete('/post/:id', function(req, res) {
  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) return res.status(500).json({error: err.message})
    post.remove(function(err){
      if (err) return res.status(500).json({error: err.message})
      res.json({ message: '文章已经删除了！' })
    })
  })
})
```

测试需要的 curl 命令是：

```
curl -X DELETE http://localhost:3000/post/134214321432
```

### 总结

上面实现了对一个资源（这里就是 post ）的增删盖查的操作。
