# 实现登出功能

欢迎来到新的一关《实现登出功能》。通过执行 logout 这个 action 创建器来完成。

### 添加 action 创建器

进入《添加 action 创建器》这个任务。

添加创建器，实现退出登录功能

logout-action---

其中实现了页面跳转和展示登出成功信息的动能。

看看达成的效果。点退出按钮，可以回到首页。

### redux 中保存登录态

进入《redux 中保存登录态》这个任务。让 redux 中的 isAuthenticated 来体现用户是否处于登录状态。

添加 redux 代码。

isAuthenticated---

用户登录后，isAuthenticated 会被设置为 true 。

看看达成的效果。页面中登录，从 chrome 终端中打印出的 redux-logger 信息中，可以看到 common.isAuthenticated 变成了 true 。

### 受保护页面

进入《受保护页面》这个任务。有了表征登录态的状态值，现在就可以把 /dashboard 变成一个受保护的页面了。

主要就是使用一下条件判断

private-route----

routerUtils 新添加的 PrivateRoute 逻辑就是，如果用户已经登录，就直接显示 /dashboard ，如果未登录就重定向到首页。

看看达成的效果。用户在未登录的情况下，直接敲链接访问 /dashboard ，会被重定向到首页的。

至此，《实现登出功能》这一关就通过了。
