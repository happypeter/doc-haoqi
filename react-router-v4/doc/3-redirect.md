# Redirect 重定向

还是那句话，V4 这里，一切都更像组件了。今天我们就看看 `<Redirect />` 这个组件的用法。官方文档在[这里](https://reacttraining.com/react-router/web/api/Redirect)。根据官方文档上的说明：

> <Redirect /> 的作用和服务器端返回 HTTP 3XX 代码的重定向效果类似


### 拆分讲解

这集的任务就是把官方给的这段代码仔细拆分讲解一下：

```js
import { Route, Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```

### 下一节讲

https://reacttraining.com/react-router/web/example/auth-workflow

上面案例达成的效果是：用户登录后，自动跳转到登录前不允许访问的那个页面（ e.g 收费视频播放页面 )
