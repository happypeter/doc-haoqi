# 创建商品分类（后台 API）

前台我们使用 React 后台使用 Express ，我们来构建一个电商应用，然后看看实际应用中认证授权这些东西应该怎么做。这一节先来点简单的，创建商品分类。

### 后台 API 准备

我们创建一个项目

```
mkdir aa-journey-demo/
```

里面创建一个 client 文件夹，专门存放前端 React 代码，然后平级建一个 api 文件夹，存放后台 API 代码。

项目代码都会放到[这个仓库](https://github.com/happypeter/aa-journey-demo)。

后台我们先跑一个 express 应用起来，具体代码是这些：

[basic express sever with cors and body-parser](https://github.com/happypeter/aa-journey-demo/commit/b6324a6fa0fb82c)

下面真正来写 API 了，我们这次把代码都写到 controllers/cat.js 之中

```
// add new catetory
exports.add = function (req, res) {
  res.send('controllers/cat.js...');
}
```

然后到 routes.js 中这样写

```js
var Cat = require('./controllers/cat');
module.exports = function (app) {
  app.post('/cat',Cat.add)
}
```

最后，index.js 中，这样来使用一下 routes.js

```js
let routes = require('./routes');
routes(app);
```

这样，这个 API 我们来调用一下

```
curl -X POST localhost:3008/cat
```


这一步的最终代码是：

[add a null api](https://github.com/happypeter/aa-journey-demo/commit/789b1ee8b349d7926b1)


真正要实现 API ，主要就是要实现数据往 mongodb 数据库中保存的操作，所以，首先创建一个 models/cat.js 文件，内容如下：

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CatSchema = new Schema(
  {
    name: {type: String, unique: true}
  },
  {timestamps:true}
)
module.exports = mongoose.model('Cat',CatSchema);
```

然后，到 controllers/cat.js 中，把代码写成下面这样：

```js
let Cat = require('../models/cat');

// add new catetory
exports.add = function (req, res) {
  let _category = req.body;
  // name=?
  let category = new Cat(_category);
  category.save(function (err, category) {
    if (err) return res.status(403).json({err,msg:'添加失败请重试'});
    res.json({
      msg: '分类添加成功',
      category
    })
  })
}
```


接下来把 mongodb 启动起来

```
mongod --dbpath=./data/db
```

这样就可以动手来测试一下了


```
$ curl -X POST -H 'Content-Type: application/json' -d '{"name":"happypeter"}'  localhost:3008/cat
{"msg":"分类添加成功","category":{"__v":0,"updatedAt":"2017-03-21T13:14:53.282Z","createdAt":"2017-03-21T13:14:53.282Z","name":"happypeter","_id":"58d1274da61466ca4afb1f41"}}
```

上面的 `name` 就是根据 models/cat.js 中指定的字段名来取的。

[API: post /cat](https://github.com/happypeter/aa-journey-demo/commit/01a754ae0d0314ece34730dfe67b34405738dcb5)

### 结语

不过前端开发者可看不到咱们的后台代码，所以还是把 API 文档丰富到 README.md 文档中吧。
