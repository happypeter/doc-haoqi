# 实现无 Ajax 效果的评论功能 

前面我们已经搭建一个 express 应用的基本模型 myapp，现在我们要完成的任务是添加评论功能。

### 创建一个表单

打开 views/index.jade 文件，修改文件内容如下：

```
extends layout

block content
  img(src='/images/making-fd.png')

  form#commentForm(name="addcomment",method="post",action="/comments/add")
    input#comment(name="comment")
    button#send(type="submit") 提交
```

在页面中添加了一张图片，图片存放在 public/images/ 目录下。另外还有一个文本输入框和一个提交按钮。关于 jade 模板引擎的语法规则请参考[文档](http://jade-lang.com/)

为了美观，我们添加一些 CSS 样式进来，代码存在 public/stylesheets/style.css 文件中，内容如下：

```
img {
  display: block;
  margin: 50px auto;
}
ul {
  margin: 30px auto;
  width: 724px;
  font-size: 18px;
}
li {
  padding: 15px;
}
form {
  text-align: center;
}
input {
  width: 300px;
  padding: 20px;
  font-size: 18px;
}
button {
  display: inline-block;
  width: 100px;
  background-color: #ff4081;
  color: #fff;
  font-size: 18px;
  padding: 20px;
  cursor: pointer;
}
```

注意： 修改 view 层的代码是不需要重新启动应用，刷新页面就可以浏览效果。

虽然我们的应用首页已经编写好了，但是当我们提交表单的时候，会报告一个 404 错误。这是因为我们还没有定义 /comments/add 路由。

### 添加一个路由

打开 routes/index.js 文件，修改文件内容如下：

```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// new code
router.post('/comments/add', function(req, res) {
  console.log(req.body);
  res.redirect('/');
});
// end

module.exports = router;
```

我们添加了一个新的路由 /comments/add，实现的功能是在命令行中打印提交的信息，并重定向到首页。打印的信息是：

```
{ comment: 'ddd' }
```

所显示的信息中，`comment` 就是 input 输入框的 name 属性值。但我们实际想要的结果是把评论内容存入到 Mongodb 数据库中。

注意：修改运行在服务器端的 JS 代码的时候，需要重新启动服务器。

### 写入数据库

前面我们已经安装好了 Mongodb 数据库，现在我们要让 express 应用与 Mongodb 之间进行通信，我们先要安装一个 npm 包，名字是 [mongoskin](https://github.com/kissjs/node-mongoskin)

```
npm install --save mongoskin
```

mongoskin 实际上要依赖于另一个 npm 包 [mongodb](http://mongodb.github.io/node-mongodb-native/)，看一下 mongoskin 对自己的介绍吧，[参考文档](https://github.com/kissjs/node-mongoskin#origin-api-part)

注意：npm 3+ 需要单独安装 mongodb 包，`npm install --save mongodb`

### 创建数据库

打开项目根目录下的 app.js 文件，添加一些新代码：

```
var bodyParser = require('body-parser');

// new code
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/haoqicat", {native_parser:true});
// end
```

这样，我们就创建了一个名为 haoqicat 的数据库，再粘贴一些新代码，让我们可以在 router 文件中访问数据库

```
app.use(express.static(path.join(__dirname, 'public')));

// new code
// Make our db accessible to our router
app.use(function(req, res, next){
  req.db = db;
  next();
});
//end
```

[Express 4.x 接口文档](http://expressjs.com/en/api.html)

### 写入数据库

接下来，就是把评论的信息存入到我们新创建的 haoqicat 数据库中，打开 routes/index.js 文件，修改 comments/add 路由如下：

```
router.post('/comments/add', function(req, res) {
  var db = req.db;
  db.bind('comments');
  db.comments.insert({
    comment : req.body.comment
  }, function (err, doc) {
    if (err) {
      console.log("Adding the comment failed!");
    } else {
      res.redirect('/');
    }
  });
});
```

在 haoqicat 数据库，新建一个名为 comments 的 collection，然后给它添加新的 document。若添加失败，报告错误；若成功，则跳转到首页。

注意：这时候，应该启动 mongod 服务，

```
mkdir data
mongod --dbpath=./data --port 27017
```

才能新建 haoqicat 数据库，才能存入数据。

### 读取数据库

现在已经把评论添加到数据库中了，下一步工作就是读取数据库，把所有的评论都展示到首页。打开我们的 routes/index.js 文件，修改 root 路由

```
/* GET home page */
router.get('/', function(req, res) {
  var db = req.db;
  db.bind('comments');
  db.comments.find().toArray(function(err, items) {
    res.render('index', { comments: items });
  });
});
```

把从 comments 集合中找到所有条目赋值给一个对象的 comments 属性，然后把这个对象作为响应数据传送给 index.jade 视图文件，从而在首页中显示所有评论。修改 views/index.jade 文件，添加一些新代码：

```
img(src='../images/making-fd.png')

// new code
div#comments
  ul
    each comment, i in comments
      li= comment.comment
// end
```

### 从命令行中查看存储的数据

若直接查看存储的评论信息，可以新开一个终端窗口，执行命令 `mongo`，打开 mongodb 控制台，执行

```
show dbs
use haoqicat
db.comments.find()
```

到此为止，工作全部完成了！