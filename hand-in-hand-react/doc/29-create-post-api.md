# 服务器端实现添加新文章接口

### 构建 Post Model

新建文件 `server/models/post.js`, 添加代码：

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    name: { type: String },
    content: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
```

### 构建创建新文章的接口

打开 `server/routes.js` 文件，首先导入 Post Model 模块：

```
var Post = require('./models/post');
```

然后实现 `/posts` API：

```
module.exports = function(app) {
  ...
  app.post('/posts', function(req, res) {
    var post = new Post();
    post.name = req.body.name;
    post.content = req.body.content;
    post.save(function(err) {
      if (err) return console.log(err);
      res.json({
        message: '文章创建成功了！'
      });
    });
  })
}
```

### 测试接口

可以通过 API 测试工具调试一下，刚定义的创建新文章接口是否正常工作。

```
curl -H "Content-Type: application/json" -X POST -d '{"name":"前后端分离","content":"express+react+redux"}' http://localhost:3000/posts
```

返回结果：

```
{"message":"文章创建成功了！"}
```
