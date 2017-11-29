# 显示在线人数和页面转圈加载效果

本节课程给聊天室添加显示在线人数的功能，并实现页面转圈加载效果。

### 显示在线人数

首先，到 `Chat.jsx` 文件之中，添加 UserList 组件，在 `render` 方法中添加一行代码：

```
<UserList users={this.props.onlineUsers}/>
```

如何获取 UserList 组件的 `users` 属性值，我们稍后再说，先定义 UserList 这个组件，组件存放在 `imports/ui/user` 目录中的 `UserList.jsx` 文件中。依然没有什么难点，都是之前用过的知识点了。使用了 Lodash.js 库提供的 map 接口，把每个在线人员的信息制作成一个显示头像和用户名的小组件，并返回所有的在线人数列表。

另外，还使用了 Lodash.js 提供的 size 接口，统计在线人员的数目。

现在，关键要知道到底有哪些用户在线，Meteor 有专门的一个包叫 [mizzao:user-status](https://atmospherejs.com/mizzao/user-status) 用来跟踪在线人数，安装一下：

```
meteor add mizzao:user-status
```

安装好之后，到底怎么用呢？看一下这个包的 [基本使用文档](https://github.com/mizzao/meteor-user-status#basic-usage---online-state)。它的工作原理是，自动在 Meter.users 集合的记录中添加一个新的 `status` 字段，这个字段又包含其它几个字段，如我们要用到的 `online` 字段。当前在线人员，就是在 Meteor.users 集合中满足 `status.online` 字段值为真这个条件的所有记录。不过，这些数据需要通过发布和订阅机制，才能在客户端显示出来，所以在 `imports/api/users.js` 文件中添加代码：

```
if (Meteor.isServer) {
  Meteor.publish("userStatus", function() {
    return Meteor.users.find({ "status.online": true });
  });
}
```

找到所有的在线人员的记录并发布出来。发布的数据集合叫做 `userStatus`。

相应的客户端要进行订阅，才能获取所有在线人员的信息。在 `Chat.jsx` 文件中的 `createContainer` 容器内订阅服务器端发布的数据集 `userStatus`：

```
export default createContainer(() => {
  Meteor.subscribe("userStatus");
  return {
    onlineUsers: Meteor.users.find().fetch()
  };
}, Radium(Chat))
```

然后通过 `Meteor.users.find().fetch()` 得到一个数组类型的数据集合。这样，UserList 组件的 `onlineUsers` 属性值就获取到了。

查看更改：[显示在线人数](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/d8d34efb63eb5f84c2edb9f7280e594a3a2a2486)

### 页面转圈加载效果

借助 Material-UI [CircularProgress](http://www.material-ui.com/#/components/circular-progress) 组件，并且使用了 Meteor 默认安装的 jQuery 提供的功能让 CircularProgress 组件经过800毫秒消失后，所有的聊天信息再慢慢显示出来。

另外当聊天信息很多，聊天列表右侧会出现滚动条的情况下，此时若刷新页面或者再发送新消息，我们希望聊天列表右侧的滚动条始终处于最下方，能把最新发送的消息都显示出来，所以在 MessageList 组件的 `componentDidMount` 和 `componentDidUpdate` 生命周期函数中都添加了下面几行代码：

```
let msgList = document.getElementById('message-list');
if(msgList !== null) {
  msgList.scrollTop = msgList.scrollHeight;
}
```

查看代码：[页面转圈加载效果](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/776d772f4588588a93927635da54c2d47670e261)
