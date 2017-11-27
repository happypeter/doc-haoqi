# 数据入 Store

现在只所以当我们在 SignIn 组件中进行完登录操作之后，在 Header 组件中无法得到用户名，就是因为用户名的信息目前还只是在 SignIn 组件内部存放的，现在我们来引入 Redux ，然后把组件数据（暂时先瞄准用户名）移动到 Store 中去存放。由于 Store 是一个全局的东西，这样我们的 Header 组件中想要拿到用户名就非常容易了。

### 安装包

我们把需要的包先都装上

```
npm i --save redux react-redux redux-thunk
```

本节还会涉及到 root reducer 和 createStore 等概念，这些知识我们就不再细讲了，参考 [《 Hello Redux 》课程](https://haoqicat.com/redux-hello)即可。

### 代码

和下一节的代码在一个 commit 中

### 本节实现的效果

用户进行登录操作后，Header 中可以看到 Store 中读取的 currentUser 的值，暂时是 null。
