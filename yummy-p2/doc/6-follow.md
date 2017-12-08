# 添加好友

欢迎来到新的一节《添加好友》，如果我 follow 一个人，那我就能在自己的个人中心看到这个人，同时她评论甜点的时候，我可以在操作盘页面看到更新。

### 添加用户展示页面

进入下一部分《添加用户展示页面》。如果我看到一个评论人的头像，点进入，看到的就是这个用户的展示也，上面会有一个 follow 按钮，跟 twitter 上一样，点一下我就是这个人的粉丝了。

先来添加页面

user-page

添加了路由，展示组件和容器组件，这样访问链接就可以打开用户展示页了。

下一步把页面样式做出来

user page styling----

添加了页面上的一些基本元素。

看看本部分达成的效果。打开页面看一下，页面样式都有了，最重要的是底部的 follow 按钮，但是没有添加功能。

至此，《添加用户展示页面》这部分就胜利完成了。

### 展示用户真实信息

进入下一部分《展示用户真实信息》。让用户展示页显示真正的用户数据。

主要是要用 selector 拿到数据

real-data---

然后到展示组件中显示出来即可。

看看本部分达成的效果。用户名和头像现在都是正确的了。
至此，《展示用户真实信息》这部分就胜利完成了。

### 前端确立 follow 逻辑

进入下一部分《前端确立 follow 逻辑》。基本逻辑就是 currentUser 有一个 followings 数据，是一个由我粉的这些人的 id 组成的数据，如果我正查看的这用户的 id 包含其中，那我就已经粉过他了。

来瞄准 follow 按钮做文章

follow---

首先按钮要显示 follow 发出 follow Action 还是显示 unfollow 发出 unfollow action 完全是由 isFriend 这个状态位决定的，而 isFriend 的判断条件则是当前用户的 followings 数组中是否包容正在查看的这个用户的 id ，container 中去拿到这些变量还有接口这个不用多说，再来看 user Actions 文件中对 follow 和 unfollow 的定义，其实也非常简单，就是把当前用户的 id 跟被查看用户的 id 都发给服务器，由服务器去更新数据库上的 .followings 数据，然后把更新后的结果返回给客户端，因为客户端需要这些数据来更新 redux 从而能更新页面显示。

看看本部分达成的效果。页面上看不出明显变化，点一下 follow 按钮可以看到发往服务器的请求并没有被接收，但是通过前端代码，其实 API 怎么写逻辑也已经搞清楚了。

至此，《前端确立 follow 逻辑》这部分就胜利完成了。

### 后端更新用户的 followings 数据

进入下一部分《后端更新用户的 followings 数据》。主要思路就是当前用户如果 unfollow 一个用户，那就在当前用户的 followings 字段中，剔除这个用户的 id ，反之则添加。

动手写代码。

follow-api---

定义了 addFollowing 和 removeFollowing 两个接口，分别用来从当前用户的 followings 数据中增删用户 id 。

看看本部分达成的效果。到用户展示界面，点 follow ，按钮会变为 unfollow ，表示 follow 成功，点 unfollow 按钮，就又回到可 follow 状态。
至此，《后端更新用户的 followings 数据》这部分就胜利完成了。

### 个人中心页面显示好友列表

进入下一部分《个人中心页面显示好友列表》。一旦我 follow 一个人，这个人就会出现在我的个人中心。

先到 /settings 页面来添加样式。

settingsList-style---

使用临时数据，把列表样式先做了出来。

然后去得到当前用户真正的好友列表。

getFriends---

通过定义 selector ，很容易把当前用户的 followings 数组里面的一个 id ，变成拥有 avatar _id 等信息的一个用户对象。

看看本部分达成的效果。当前用户 billie 首先前往 happypeter 用户的个人展示页，点 follow ，然后回到自己的 /settings 页面就可以看到 happypeter 出现在列表中了。如果 billie 想取消对 happypeter 的关注，只需要点 happypeter 的用户名，进入他的个人展示页，点 unfollow ，然后再次回到 /settings 页面，就可以看到 happypeter 已经不见了。

至此，《个人中心页面显示好友列表》这部分就胜利完成了。

### 修复私有路由 Bug

进入下一部分《修复私有路由 Bug》。现在有个问题，每次修改代码后页面就会刷新，而如果我们在 /settings 页面上时，即使处于登录状态也会被重定向到首页要求登录。

这个问题出在即使 localStorge 中保存 userId ，isAuthenticated 的初始值依然为 false

fix-bug

现在，如果 localStorge 中保存了 userId ，那么页面刷新的时候 isAuthenticated 默认值为 true 。代码中另外一处修改是因为 CurrentUser 初始值为空，那么 currentUser.following.include 就会执行报错，所以加了代码防范一下这种情况。


看看本部分达成的效果。这样再到 /settings 页面，刷新一下，问题就没有了。
至此，《修复私有路由 Bug》这部分就胜利完成了。


### 结语

进入最后一部分《结语》

复盘一下本节思路。

至此，《添加好友》就胜利完成了。
