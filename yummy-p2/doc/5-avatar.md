# 上传头像

欢迎来到新的一节《上传头像》。允许用户可以在个人中心上传自己的头像。

### 添加个人中心页面

进入下一部分《添加个人中心页面》。对应的路由是 /settings 。

settings-route---

把页面路由和链接添加了进来。

下面来把上传 avatar 部分的界面添加进来

avatar-style----

仅仅是做了样式，真正的文件上传功能没有实现。

看看本部分达成的效果。点 /settings 页面上的头像，可以打开文件浏览器进行文件选择了。
至此，《添加个人中心页面》这部分就胜利完成了。

### 前端发送数据

进入下一部分《前端发送数据》。其中特别要注意的就是数据格式。


首先来在用户选中文件之后，触发一个 action 创建器


avatar-action----


用户选中文件后会触发 updateAvatar 这个 action 创建器，其中使用 e.target.files[0] 可以拿到文件对象。文件对象简单来说只是一个文件名，没有文件主体数据。所以需要使用 FileReader 来读取主体数据并且转换为可以在网上发送的 base64 格式。readAsDataURL 函数执行结束之后，reader.onload 回调函数会被触发。回调函数里面，我们就可以用 e.target.result 打印出文件主体数据了。

接下来把需要发送的数据整理成 formData ，也就是表单数据的格式。

send-formdata----

这里必须把数据组织成 formData 来发送，因为 axios 在发送 formData 的时候，默认的 ContentType 就是 multipart ，而这个格式也正是未来服务器上我要采用的 Multer 所期待的格式。

看一下本部分达成的效果。浏览器中选中一个文件，注意 chorome 开发者工具的 Network 标签下，有一个红色的，也就是发送失败的 avatar 请求，点开查看请求详情，在 request header 一项下面，可以看到 Content-Type 是 multipart/form-data ，这样的请求就满足服务器端要求了。

至此，《前端发送数据》这部分就胜利完成了。

### 补充一些前端功能

进入下一部分《补充一些前端功能》。一个就是就是发送数据时要把当前用户 id 也发送给服务器，另一个就是对文件是不是图片做一下类型检查。

首先拿到当前用户 id ，一个好消息是用来 redux-thunk 后，action 创建器中是可以拿到整个状态树的

userid----

通过 getState 参数拿到状态树，然后用 getCurrentUserId 选择器来把当前用户 id 拿到，附着在表单的 userId 字段上。

接下来检查文件类型

checkfile---

对文件是否为图片，是否小于1M，进行了检查，检查不通过，直接发出警告信息，不进行上传。

看看本部分达成的效果。
至此，《补充一些前端功能》这部分就胜利完成了。

### 上传到服务器

进入下一部分《上传到服务器》。使用 multer 来接受客户端传递过来的信息。

先装包

```
npm i multer
```

包装好了。


然后写代码。

multer---


require multer 进来，然后指定上传存储位置。接下来 uploadAvatar.single('avatar') 这句的作用是加载 multer 中间件，这样才能接口中打印出 req.body 的信息，再说 .single('avatar') ，意思是接受名为 avatar 的单独一个文件，有了它才能打印出 req.file 的信息，当然同时也才能实现文件上传。

看看本部分达成的效果。上传文件，服务器的终端，也就是命令行界面上会打印出 req.body 和 req.file 的具体值，分别包含 userId 信息，和图片信息。

```
req.body { userId: '5a2638f58b8b05037aed5007' }
req.file { fieldname: 'avatar',
  originalname: '屏幕快照 2017-12-06 下午11.19.24.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: './public/uploads/avatars',
  filename: '198f9b712f49f700156b0b9f925efd5b',
  path: 'public/uploads/avatars/198f9b712f49f700156b0b9f925efd5b',
  size: 20006 }
```

到 pubic/uploads/avatars 文件夹中，可以看到文件上传成功了。

至此，《上传到服务器》这部分就胜利完成了。


### 更新服务器字段

进入下一部分《更新服务器字段》。上传成功了，还有很多后续工作要做。例如，要把上传的头像信息保存到数据库中这个用户对应的条目，

update-db----

首先找到数据库中符合客户端发送过来的 userId 的那个用户，然后把上传后的 avatar 的文件名保存到数据库中这个用户的 avatar 字段，最后把包含新 avatar 的用户数据返回给客户端。

返回所有用户信息的接口中把 avatar 一项也加上

return-avatar---

这样，客户端才能拿到用户的 avatar 数据。

看看本部分达成的效果。命令行中用 mongo shell 查看一下数据库数据，

```
mongo
use sandbox
db.users.find({username : "happypeter"})
```

发现 avatar 一项果然加好了。并且浏览器终端中也可以打印出包含 avatar 信息的用户数据。页面刷新，是可以看到新 avatar 的。

至此，《更新服务器字段》这部分就胜利完成了。


### 更新客户端 redux 数据

进入下一部分《更新客户端 redux 数据》。拿到服务器端返回的包含新 avatar 的 user 数据，更新 redux ，这样新头像才能无需刷新直接显示到页面上。


redux----

当前用户更新后的数据从服务端拿到之后，发送到 reducer ，在所有用户信息中找到当前用户，并更新它的数据。


修改侧边栏中的头像链接。

sidebar-url----

统一改为 avatarUrl 。

看看本部分达成的效果。用户在个人中心修改头像之后，不仅是当前页面头像变化，而且 sidebar 页面的也变了。
至此，《更新客户端 redux 数据》这部分就胜利完成了。


### 修复路由 bug

进入下一部分《修复路由 bug》。之前有些代码不小心写错了，这里修改一下。

首先是 /settings 的路由，再就是退出登录功能

route-bug-fix

/settings 页面路由有重复，删除了，另外退出登录的时候应该把 localStorage 中保存的 userId 删除。

看看本部分达成的效果。未登录用户访问 /settings ，会被重定向到登录页，用户退出登录后，页面再刷新，不会看到用户自动登录进来的情况了。
至此，《修复路由 bug》这部分就胜利完成了。

### 结语

进入最后一部分《结语》

复盘一下本节思路。

至此，《上传头像》就胜利完成了。
