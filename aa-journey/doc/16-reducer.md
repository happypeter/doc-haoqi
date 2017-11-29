# 触发 Reducer

现在 Store 中存放的 currentUser 的值是 null ，所以我们现在想要做的事情是：

- 用户在 SignIn 组件中，点提交按钮，发起 action
- 对应的 reducer 得到执行，从而修改 currentUser 值为登录用户名
- 让 Header 组件动态读取 store 中的 currentUser 数据

### 代码

- [reducer](https://github.com/happypeter/aa-journey-demo/commit/91dcede0431bc085e3b8ec209de16eb5063a9f94)

### 本节实现的效果

用户进行登录操作后，Header 中可以看到 Store 中读取的 currentUser 的值。
