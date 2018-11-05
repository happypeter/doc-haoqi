# 更新图片

最后一节，先把上传后的图片在前端展示出来，然后完成更新图片的功能。

### 后端存储的图片供外部访问

api/index.js

```js
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
```

虽然图片已经上传成功了，也知道了图片存储位置，但是图片还不能在浏览器中通过 HTML `<img src='' />` 标签显示出来。我们还需要通过 express 提供的 static，让储存在 public 目录下的静态文件供外部使用。

浏览器中，访问 [http://localhost:3009/uploads/posts/4e4674f07a70fedda88bdda346aa88da](http://localhost:3009/uploads/posts/4e4674f07a70fedda88bdda346aa88da) 可以拿到图片了。

### 上传文件的时保存文件名

文件上传的时候，数据库中要保存一下上传后的文件名。

api/models/post.js

```js
poster: String
```

给 post 数据中添加一个 poster 字段，保存图片名。

api/controllers/post.js

```js
p.poster = req.file.filename
await p.save()
res.json({
  poster: p.poster
})
```

controller 中，可以从 `req.file.filename` 中拿到上传后的文件名，也就是一串长长的哈希。然后把这个名字发送给前端。

再次上传，到 mongo-express 中，可以看到 poster 数据保存好了。

### 前端展示图片

前端收到图片名之后，就可以显示到首页了。

[show img](https://github.com/haoqicat/img-upload/commit/cdcc687a171801f1871763d1c2568c9160a105a3)

浏览器中，看到提交文章后，首页可以显示出图片了。

### 添加编辑页面

[edit post page](https://github.com/haoqicat/img-upload/commit/4d1a679b44eb77ff01a9e2620450cb60be3b9d71)

详细的代码参看 commit 链接，主要添加了一个 postEdit 页面。没有实现实质性功能。

浏览器中，看到添加了一个编辑链接，点开，打开一个更新文章的表单。

编辑相关的功能就是 redux/express 相关基础知识的运用了，没有新的知识点。大家直接参考最终源码即可。

浏览器中，关键功能就是编辑一个课程，打开的 form 中可以看到老数据和老图片的。更新数据，也是可以提交成功的。

至此，咱们的案例就完成了。
