# 全栈随动

这一集完成代码的最后部分，添加评论列表。正好是一个展示 Meteor 的实时数据订阅和全栈随动特点的好例子。

### 订阅实时数据的几步走

第一步，装包


```
meteor add react-meteor-data
npm install --save react react-addons-pure-render-mixin
```

第二步，导入 createContainer

```
import { createContainer } from 'meteor/react-meteor-data';
```

第三步，特殊方式传人属性值

```
export default createContainer(() => {
  return {
    comments: Comments.find().fetch(),
  };
}, Post);
```

第四步，组件中使用 comments 这个随动属性值

```
let comments = this.props.comments;
```

大功告成。

### 效果：全栈随动

如果我自己提交评论，那么 comments 会自动变化，而 React 组件的特性是：如果 props 有变化，那么组件就会自动刷新，所以我自己就可以立即看到自己的评论了。同时，如果打开另外一个浏览器来模拟另外一个用户登录，那么他发一条评论，那么这条评论也就会出现在所有的客户端上了。所以，Meteor 制作的评论功能，天然的就是一个聊天室。

### 总结

Meteor 的全栈随动功能，让开发实时应用变得非常简单了。

### 最终课程代码

- 课程所有的最终代码在 [coding.net 的仓库中](https://coding.net/u/happypeter/p/meteor-express-ajax-demo/git)

---

### 附录

在开发过程中，经常会设计到去操作 Mongo ，例如，如插入或者删除一些测试数据。本节来总结一些实用命令。

### 安装和启动

Meteor 在产品环境下是需要专门安装 Mongodb 数据库的，而开发模式下 mongodb 是自带的，不用安装。而且启动方式也不是 `mongo` ，而是执行

```
meteor mongo
```

这个执行成功的前提是我的应用目前是处于运行状态，也就是其他终端中运行着 `meteor` 命令。

### 增删改查

执行上一步之后，我们就进入了 Mongo Shell ，可以来执行 Mongo 的命令了

查看所有数据库

```
meteor:PRIMARY> show dbs
admin   (empty)
local   0.063GB
meteor  0.031GB
meteor:PRIMARY>
```

进入 meteor 这个数据库

```
meteor:PRIMARY> use meteor
switched to db meteor
```

查看所有 collections 

```
meteor:PRIMARY> show collections
comments
system.indexes
meteor:PRIMARY>
```

查看我们到底提交了多少条评论

```
meteor:PRIMARY> db.comments.find()
{ "_id" : "kXEaTaQcQhkv4H4ie", "comment" : "fdf", "createdAt" : ISODate("2016-05-26T01:53:04.764Z") }
```

删除这些所有的评论

```
meteor:PRIMARY> db.comments.remove({})
WriteResult({ "nRemoved" : 1 })
```

这样就可以把所有的评论都清空了。