# 认证

本节来实现一下登录退出这样用户认证相关的功能。

### login action

src/containers/HomeContainer.js

```js
import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions'
import Home from '../components/Home'

const HomeContainer = props => <Home {...props} />

export default connect(null, { login })(HomeContainer)
```

添加 Home 的容器组件进来。导入名为 `login` 的 action 创建函数。

static.config.js

```js
        component: 'src/containers/HomeContainer',
```

静态配置文件中对应的调整一下路径。

src/components/Home.js

```js
import { Button, Input, Icon, Form, message } from 'antd'

class Home extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const data = this.props.form.getFieldsValue()
    this.props
      .login(data)
      .then(data => {
        message.success(data)
      })
      .catch(err => {
        message.error(err.message)
      })
  }
```

Home 组件中导入蚂蚁设计的全局提示组件。然后到 `handleSubmit` 中把用户输入的数据 `data` 传递给 `login` ，然后用全局提示组件显示 `login` 返回的成功或者报错信息。

src/actions/index.js

```js
import { USERNAME, PASSWORD } from '../constants/Settings.js'

export const login = data => () => {
  const { username, password } = data
  if (username === USERNAME && password === PASSWORD) {
    return Promise.resolve('登录成功！')
  }
  return Promise.reject(new Error('用户名密码错误！'))
}
```

action 创建器文件中，导入用户名密码的常量，然后定义 `login` 函数。如果用户输入的用户名密码和 Settings 文件中保存的一致，返回成功信息，否则返回失败信息。

src/constants/Settings.js

```js
export const USERNAME = 'admin'
export const PASSWORD = 'admin'
```

常量文件 Settings 中，添加用户名密码。实际中应该填写到 .gitignore 文件中。

浏览器中，输入正确的用户名密码，可以看到成功信息，反之，看到失败信息。

### 在 action 创建函数中中进行页面跳转

src/utils/routerUtils.js

```js
import createHistory from 'history/createBrowserHistory'

export default createHistory()
```

要有一个自己定义的 history ，才能方便在各处引用实现页面跳转。

src/components/Main.js

```js
import history from '../utils/routerUtils'

class Main extends Component {
  render () {
    return (
      <Router history={history}>
        <Routes />
      </Router>
    )
```

Main 组件中，Router 中要使用这个 history ，这个自定义的 history 才能发挥作用。

src/actions/index.js

```js
import history from '../utils/routerUtils'

export const login = data => () => {
  ...
  if (username === USERNAME && password === PASSWORD) {
    history.push('/charts')
    return Promise.resolve('登录成功！')
  }
...
}

export const logout = () => () => {
  history.push('/')
  return Promise.resolve('您已退出登录！')
}
```

action 创建函数文件中，导入这个自定义的 history 。到 `login` 中，登录如果成功，就跳转到 `/charts` 页面。再定义一个 `logout` 函数，通过 `history.push('/')` 实现登出后退回首页的功能。

src/containers/LogoutContainer.js

```js
import { connect } from 'react-redux'
import { logout } from '../actions'

export default connect(null, {
  logout
})(LogoutContainer)
```

Logout 的容器组件中，导入 logout 创建函数。

src/components/Logout.js

```js
import { message } from 'antd'

class Logout extends Component {
  handleClick = () => {
    this.props.logout().then(data => message.success(data))
  }
  render () {
    return (
      <Wrap>
        <LogoutText onClick={this.handleClick}>退出</LogoutText>
      </Wrap>
    )
```

Logout 组件中，执行 `logout` 函数，实现退出和页面跳转。

浏览器中，尝试登录和退出，发现都是可以成功执行的。

### histroy.push 到首页的一个小问题

static.config.js

```js
     {
        is404: true,
        component: 'src/components/NotFound',
     },
```

配置文件中，添加 404 。

src/components/NotFound.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'

class NotFound extends Component {
  render() {
    return (
      <Wrap>
        <h1>404 啦</h1>
      </Wrap>
    )
  }
}

export default NotFound

const Wrap = styled.div`
  padding: 30px;
  h1 {
    text-align: center;
  }
`
```

404 页面组件中，显示 404 字样。

到这里，有个 bug 。那就是到 /charts 页面，专门的来刷新一下。再点 logout 按钮退出，链接会跳转，但是首页显示不出来了，显示 404。这个问题我用官方的 [firebase-auth](https://github.com/nozzle/react-static/tree/master/examples/) 案例试了试，也是同样的问题。

不过解决方法倒是也挺简单。

src/components/Nav.js

```js
import { Link } from 'react-static'

<Link to="/" />
```

到 Nav.js 中，导入 `Link` ，添加一个无名的链接，指向首页。

浏览器中，/charts 页面刷新后，首页会被预加载。点退出登录的按钮，可以成功跳转到首页了。

### 未登录禁止访问

现在其实不从首页登录，也能直接访问其他页面。

src/actions/index.js

```js
import * as types from '../constants/ActionTypes'

export const login = data => dispatch => {
  if (username === USERNAME && password === PASSWORD) {
    dispatch({ type: types.LOGIN_SUCCESS })
  }
}

export const logout = () => dispatch => {
  dispatch({ type: types.LOGOUT_SUCCESS })
}
```

action 文件中，如果登录成功发起 `LOGIN_SUCCESS` ，退出登录，发起 `LOGOUT_SUCCESS` 。

src/constants/ActionTypes.js

```js
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
```

常量文件中添加 action 类型的定义。

src/reducers/common.js

```js
 case types.LOGOUT_SUCCESS:
      return false
```

reducer 文件中，收到 `LOGIN_SUCCESS` 把 `isAuthticated` 设置为 true ，收到 `LOGOUT_SUCEESS` 设置为 false 。

src/containers/LogoutContainer.js

```js
const mapStateToProps = state => ({
  isAuthenticated: state.common.isAuthenticated
})

export default connect(mapStateToProps, {
  logout
})(LogoutContainer)
```

Logout 容器组件中，拿到 `isAuthenticated` 。

src/components/Logout.js

```js
import history from '../utils/routerUtils'

class Logout extends Component {
  componentDidMount () {
    const { isAuthenticated } = this.props
    if (!isAuthenticated) history.push('/')
  }
```

Logout 组件中，如果 `isAuthenticated` 不是 true ，就跳转到首页。

浏览器中，直接访问 /charts 页面会被拒绝，显示 404 。登录成功后，是可以访问的。

### 持久化登录状态

但是，登录后的用户有可能会刷新页面，这样登录状态就会丢失。怎么来解决一下呢。

src/constants/Settings.js

```js
export const AUTH_SECRET = 'xxaaxx'
```

实际项目中一般是从服务器端生成一段秘钥保存到客户端硬盘上来实现持久化 session 的效果。这里咱们没有服务器，所以自己在 Settings.js 中定义一串随机数。

src/actions/index.js

```js
import { USERNAME, PASSWORD, AUTH_SECRET } from '../constants/Settings.js'

window.localStorage.setItem('authSecret', AUTH_SECRET)

window.localStorage.removeItem('authSecret')
```

到登录的创建函数中，把这串数保存到硬盘上。到登出函数中，删除这串数。

src/reducers/common.js

```js
let initAuthState = !!window.localStorage.getItem('authSecret')

const isAuthenticated = (state = initAuthState, action) => {
```

到 reducer 文件中，把 `isAuthenticated` 的初始值设置为 `initAuthState` ，但是如果本地保存了秘钥，就设置为 true 。

浏览器中，登录进来，刷新一下，发现现在不会自动退出了。
