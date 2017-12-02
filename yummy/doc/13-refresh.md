### 持久化登录态

欢迎进入新的小节《持久化登录态》。把用户登录信息保存到硬盘上，主要应对用户刷新网页或者关闭网页重新打开的场景。

### 保存用户机密信息到 localStorage

进入《保存用户机密信息到 localStorage》这个部分。不管是传统的 session 形式，还是比较摩登的 JWT ，持久化登录态的方式都是要把一串信息保存到系统硬盘上。

我们这里采用的形式是，保存用户 id 到 localStorage 中。

```diff

```

用户登录成功，需要保存，用户登录成功也需要保存一下。

看看本部分达成的效果。执行用户登录或者注册操作，成功后到 chrome 终端中运行

```
 localStorage.getItem('userId')
```

就能看到保存的一串数了。

至此，《保存用户机密信息到 localStorage》这部分就胜利完成了。

### 刷新时加载用户数据

进入《刷新时加载用户数据》这个部分。页面刷新时 redux 中的数据会全部丢失，所以需要用 localStorage 中存储的 userId 去 API 中再次获取当前用户数据。

需要请求一个新的 API ，所以先把链接写到常量文件中。

```
user-by-id-url
```

根据用户 id 获取这位用户的详情。

接下来定义 Action 类型。

```
receive_current_user
```

接受当前用户的详情。


接下来定义 action 创建器。

```
fetch-current-user
```

首先导入 API 链接，然后定义 fetchCurrentUser 这个 action ，其中首先要拿到本地存储的 id ，然后发送到服务器上获取当前用户的信息，然后发起 receive current user 这个 Action 。


reducer 中要做修改。

```diff
fetch current reducer
```

两个任务，第一个把表征登录状态的 isAuthenticated 设置为 true ，第二个保存当前用户的 id 。

最后要解决的是，页面刷新时，执行刚刚定义的 action 。

```diff
call-fetchcurrentuser
```

App 组件加载后执行。

看看本部分达成的效果。登录后刷新页面，可以看到侧边栏上用户依然处于登录状态。

至此，《刷新时加载用户数据》这部分就胜利完成了。

### 结语

进入最后一部分《结语》。

先来复盘一下本节的思路。为了持久化登录态，用户登录成功后，程序会自动把一串服务器发送过来的秘钥，本节采用的是 userId ，保存到硬盘上，这里我们采用的媒介是 localStorage 。页面刷新后，内存中的信息都丢失了，但是 userId 会被自动发送到服务器端，取回当前用户的信息，这样界面上用户依然保持了登录状态。

至此，《持久化登录态》这一小节就胜利完成了。