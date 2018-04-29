# 构建一套 RESTful API

这节我们来实现一套 RESTful API ，实现对文章（ post ）这个资源的增删改查操作。

### 查，读取所有文章的 API

api/index.js

```js
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.status(500).json({ msg: '读取失败', err })
  }
})
```

读操作，一般用 GET 方法，所有文章，英文叫 `posts` ，所以这个 API 的路由就要写成 `app.get` 然后第一个参数是 `posts` 。这样客户端如果发出 GET /posts 请求，回调函数中的语句就会被执行。

通过 res.json 语句，把数据以 JSON 的格式传递给客户端。

catch 语句可以把数据库查询中的错误捕捉到，然后通过 `res.json` 接口反馈给客户端。

Postman 中，发起 `GET /posts` 请求，可以看到返回的 `posts` 数组。

### 查，读取一篇文章详情

api/index.js

```js
app.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.json(post)
  } catch (err) {
    res.status(500).json({ msg: '读取失败', err })
  }
})
```

再来添加查询一篇文章的接口。

Postman 中，发出 `GET /post/5ae0747cde0f07377ddff18e` ，可以看到返回了一篇文章的信息。

### 增，添加一篇博客

这个涉及到接受客户端传递的复杂 JSON 数据。

```
curl -H "Content-Type: application/json" -X POST -d '{"title":"happypeter"}' http://localhost:3000/post
```

这个 curl 命令模拟出来的请求，跟项目中用 axios 发送 POST 方法，数据格式为 JSON 的请求是完全等效的。

* `-H` 选项后面跟的是 HTTP 报头，设置数据格式为 json
* `-d` 后面跟的是负载数据( payload )

当然，这个请求也可以用 Postman 来发送。发出 `POST /post` 请求，负载数据 body 选 raw ，格式选择 application/json ，然后填写 json 数据。

```json
{ "title": "happypeter" }
```

这样，效果跟 curl 相同。

```
npm i body-parser
```

服务器端要接收客户端从 HTTP 的请求 body 中携带的数据，需要安装 `body-parser` 。

api/index.js

```js
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.post('/post', async (req, res) => {
  const p = new Post(req.body)
  try {
    const post = await p.save()
    res.json(post)
  } catch (err) {
    res.status(500).json({ msg: '保存失败', err })
  }
})
```

导入 bodyParser ，以中间间的形式加载 bodyParser 解析 json 数据的功能。这样 API 中，就能通过 `req.body` 获取到客户端传递过来的数据了。然后用 try/catch 分别进行数据保存和返回错误信息的操作。

Postman 中，点 `send` 发出请求。title 数据不为空的时候，会成功返回新创建的 post 对象，删除 title 数据，返回报错信息。

### 改，更新文章内容

api/index.js

```js
app.put('/post/:id', async (req, res) => {
  try {
    const p = await Post.findById(req.params.id)
    for (prop in req.body) {
      p[prop] = req.body[prop]
    }
    const post = await p.save()
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
```

根据 Rest 的规范，更新用 `put` 方法。如果执行 `p.save()` 的时候，发现 `title` 为空，这样 model 文件中，咱们刚刚设置的规则就会被触犯，这样，catch 语句就会被执行。

```
curl -X PUT -H 'Content-Type: application/json' -d '{"title": "newTitle"}' http://localhost:5000/post/593607542cf2f60539a17692
```

测试可以用 curl 命令。也可以用等价的 Postman 操作。

可以看到 Postman 返回了更新后的 post 信息。

### 删，删除一条 post

api/index.js

```js
app.delete('/post/:id', async (req, res) => {
  try {
    const p = await Post.findById(req.params.id)
    const post = await p.remove()
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
```

Postman 中测试一下，首次删除返回被删除的对象，再次删除，因为已经不存在被删对象了，所以就会报错。

等价的 curl 命令如下：

```
curl -X DELETE http://localhost:3000/post/134214321432
```
