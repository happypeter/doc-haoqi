# 控制登录态

欢迎来到新的一节《控制登录态》，任务是如何在 redux 数据层面维护用户登录状态，以及如何在界面上体现用户登录状态。

### 维护登录态

进入《维护登录态》这个部分。简单来说登录态可以通过 redux 中保存的 isAuthenticated 状态值来维护。用户登录或者注册成功后，设置 isAuthenticated 为 true 。

老规矩，先来定义两个 Action 类型。

```diff
action-type
```

顾名思义，用户登录或者注册成功之后他们两位会被触发。

触发它们的位置在 authActions 中

```diff
dispatch-actions
```

这样，导入一下 action type，注册成功后发出一次，登录成功后也发出一次。

reducer 中接收信号。

```diff
auth-reducer
```

每次收到 LOGIN_SUCCESS 或者 SIGNUP_SUCCESS 之后，把 isAuthenticated 设置为 true 。


rootReducer 中需要导入

```diff
import-auth
```

新加的这个 auth reducer ，专门负责认证。

看看本部分达成的效果。redux-logger 的打印输出中看一下。每次用户注册登录成功后， auth.isAuthenticated 都会设置为 true 。

至此，《维护登录态》这部分就胜利完成了。

### 订阅登录态

进入《订阅登录态》这个部分。让 isAuthenticated 作用于 UI ，这样用户就能感受到登录态了。

老规矩，先写 selector 。

```diff
auth-selectors
```

读取 `isAuthenticated` 值。

容器组件中使用 selector 。


```diff
use selector
```

首先导入 selector 和 connect ，然后 mapStateToProps 中使用 selector 获取 isAuthenticated 的值。
展示组件中来使用拿到的数据。

接下来展示组件中使用 isAuthenticated 。

```diff
pass-t0-userinfo
```

首先结构赋值一下拿到 isAuthenticated ，然后传递给 UserInfo 组件使用。

在到 UserInfo 之中，通过使用 isAuthenticated 体现出登录状态。

```diff
change-ui
```

参数中结构赋值一下拿到 isAuthenticated ，下面通过 isAuthenticated 是否为 true 来决定要不要显示用户名和退出链接。

看看本部分达成的效果。登录注册成功后，侧边栏中才能看到用户名和退出字样。这样用户从 ui 层面，就能感受到登录态了。

至此，《订阅登录态》这部分就胜利完成了。






### 退出登录

进入《退出登录》这个部分。走一个老套的 redux 流程即可。

先加  Action 类型。

```diff
logout
```

LOGOUT ，登出。

添加 Action 。

```diff
logout-action
```

发出 action  同时页面跳转到首页。


容器组件中拿到这个 Action 


```diff
map-logout-to-a-prop
```

首先导入，然后把 logout 变成一个当前组件的属性传递给展示组件。

展示组件中再把 logout 传递给自己的子组件 。

```diff
pass-on
```

删除原有的解构赋值，因为这次直接用 ES6 展开运算符把所有的属性都传递给 UserInfo 其中当然同时包含 isAuthenticated 和 logout 。

真正使用 logout 。

```diff
use-logout
```

首先参数中结构赋值拿到 logou ，然后点退出按钮的时候执行它。注意，页面跳转工作之所以不用 Link 完成，是因为写到 action 中可以应对退出失败等情况，比较灵活。

最关键的一步，reducer 中修改 isAuthenticated 值

```diff
logout-reducer
```

返回 false 这样，登录态就从根本上被销毁了。

看看本部分达成的效果。用户点退出登录按钮，界面上侧边栏中的登录状态被取消，redux 数据底层维护登录态的 isAuthenticated 状态值也会设置为 false 了。

至此，《退出登录》这部分就胜利完成了。

### 结语

进入最后一部分《结语》。

先来复盘一下本节的思路。整个登录态的心脏就是 isAuthenticated 状态，代码第一步首先添加了它，并且通过 authActions 和 auth reudcer 在适当的时机是设置它。界面层面上，展示组件通过订阅 isAuthenticated ，可以让用户登录前后看到不同的界面内容，这样用户就会对登录态有所感知。最后实现了退出登录功能，实现了对登录态的销毁。

再来看看本节的最终劳动成果。用户登录注册成功，侧边栏显示用户名和退出按钮，点退出按钮，用户可以退出登录。

至此，《控制登录态》这一小节就胜利完成了。