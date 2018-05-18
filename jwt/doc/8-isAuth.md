# 利用 jwt token 保持登录态

这集看看如何进行登录态的控制。

### store 中设置状态位

前面用户注册登录成功后，已经可以把用户数据发送给 reducer 了，下一步就是用这些数据来修改 store 中的状态，并且最终用这些状态来控制 UI 显示了。

src/reducers/common.js

```js
import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'

const isAuthenticated = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return true
    default:
      return state
  }
}

const currentUser = (state = '', action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return action.currentUser
    default:
      return state
  }
}

export default combineReducers({
  isAuthenticated,
  currentUser
})
```

common reducer 中，接收 action ，设置 `isAuthenticated` 也就是是否登录，以及 `currentUser` 也就是当前用户名，这两个状态值。

HeaderContainer.js

```js
currentUser: state.common.currentUser
```

Header 的容器组件中，跟 `isAuthenticated` 平行，添加 `currentUser` 。

src/components/Header.js

```js
const propTypes = {
  currentUser: PropTypes.string.isRequired
}

  const { isAuthenticated, goto, currentUser } = this.props
  <MenuItem>{currentUser}</MenuItem>
```

Header 组件中添加显示出当前用户名 currentUser。

浏览器中，登录成功后，可以看到 Header 右侧区域显示出了登录后才有的小图标，点一下，可以看显示出了当前用户名。

用户注册成功后，效果也是一样的。

### 退出

下面来做退出登录的功能。

src/components/Header.js

```js
const propTypes = {
  logout: PropTypes.func.isRequired
}

handleLogout = () => {
  this.props.logout()
  this.setState({
    anchorEl: null
  })
}


    <Menu anchorEl={anchorEl} open={open}>
      ...
      <MenuItem onClick={this.handleLogout}>退出</MenuItem>
    </Menu>
```

Header 组件中，导入 logout 函数，定义 `handleLogout` 方法，里面执行 logout 函数，并且隐藏弹出的菜单，当用户点菜单上的 `退出` 一项，就执行 `handleLogout` 。

src/containers/HeaderContainer.js

```js
import { logout } from '../actions/authActions'

const HeaderContainer = props => <Header {...props} />

const mapStateToProps = state => ({
  isAuthenticated: state.common.isAuthenticated,
  currentUser: state.common.currentUser
})

export default connect(mapStateToProps, { goto, logout })(HeaderContainer)
```

容器组件中导入 logout 这个 action 创建函数。

src/actions/authActions.js

```js
export const logout = () => dispatch => {
  window.localStorage.removeItem('jwtToken')
  dispatch(historyPush('/'))
  dispatch({ type: types.LOGOUT_SUCCESS })
}
```

定义 logout 函数，基本上就是 login 的逆操作，先删除硬盘上的 jwtToken ，然后退回首页。然后发出 `LOGOUT_SUCCESS` 这个 action ，去 reducer 中继续删除 login 留下的那些数据。

src/constants/ActionTypes.js

```js
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
```

添加 action 类型定义。

reducers/common.js

```js
const isAuthenticated = (state = false, action) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS:
      return false
    default:
      return state
  }
}

const currentUser = (state = '', action) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS:
      return ''
    default:
      return state
  }
}
```

reducer 中干两个事情，一个是把 `isAuthenticated` 还原为 false ，另一个是把 `currentUser` 还原成空字符串。

浏览器中，点退出，看到 logout 的内容都执行了。

### 页面刷新

但是现在还是有个问题件，`isAuthenticated` 状态是在 store 中保存的，也就是页面一旦刷新，里面保存的信息也就自动丢失了。

src/utils/jwtUtils.js

```js
export const getIsExpired = token => {
  const dateTime = Date.now()
  const currentTime = Math.floor(dateTime / 1000)
  const { exp } = decodeJwt(token)
  return currentTime > exp
}
```

jwtUtils 文件中添加一个函数，检查一下 token 是否过期。

src/actions/authActions.js

```js
import { decodeJwt, getIsExpired } from '../utils/jwtUtils'

export const loadCurrentUserIfNeeded = () => dispatch => {
  const token = window.localStorage.getItem('jwtToken')
  if (token) {
    if (getIsExpired(token)) {
      window.localStorage.removeItem('jwtToken')
      historyPush('/login')
      dispatch({ type: types.LOGOUT_SUCCESS })
      return console.log('认证码失效，请重新登录')
    }
    const { username, admin } = decodeJwt(token)
    dispatch({
      type: types.LOAD_CURRENT_USER,
      currentUser: username,
      isAdmin: admin
    })
  }
}
```

从 jwtUtils 中导入另外一个函数 `getIsExpired` 来检查 token 是否过期。定义 `loadCurrentUserIfNeeded` 函数，`isNeeded` 的意思就是如果 `localStorage` 中根本没有存储 token ，就没必要加载当前用户了。如果有 token ，就要来判断是否过期。如果过期了，就退出登录，并重定向到登录页，并且给出报错信息。

如果 token 依旧有效，那就从中取出用户信息，发送给 reducer 。

src/reducers/common.js

```js
const isAuthenticated = (state = false, action) => {

    case types.LOAD_CURRENT_USER:
      return true
    default:
      return state
  }
}

const currentUser = (state = '', action) => {

    case types.LOAD_CURRENT_USER:
      return action.currentUser
    default:
      return state
  }
}
```

reducer 中收到 `LOAD_CURRENT_USER` 后做的事情跟收到 `LOGIN_SUCCESS` 是完全一样的。

src/constants/ActionTypes.js

```js
export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER'
```

添加类型定义。

src/containers/App.js

```js
import { connect } from 'react-redux'
import { loadCurrentUserIfNeeded } from '../actions/authActions'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Main {...this.props} />
      </Router>
    )
  }
}

export default connect(null, { loadCurrentUserIfNeeded })(App)
```

App 组件中导入 `loadCurrentUserIfNeeded` 并传递给 Main 组件。

Main.js

```js
import PropTypes from 'prop-types'

const propTypes = {
  loadCurrentUserIfNeeded: PropTypes.func.isRequired
}

injectGlobal`
  body {
    margin: 0
  }

  * {
    box-sizing: border-box;
  }
`

class Main extends Component {
  componentDidMount() {
    this.props.loadCurrentUserIfNeeded()
  }

Main.propTypes = propTypes
```

Main 组件中，在页面刷新的时候触发执行它。

到服务器 api 中，把 token 过期时间改为十秒，然后重新登录，界面中刷新，可以看到，是不会自动退出登录的，但是十秒过后，就会在终端中显示 `认证码过期` 的报错，并且重定向到登录页面了。

### 美化报错信息

下面把报错信息美化一下。

src/actions/authActions.js

```js
import { historyPush, alert } from './index'

   } catch (err) {
     console.log(err)
     err.response && dispatch(alert(err.response.data.msg))
   }

    return dispatch(alert('认证码失效，请重新登录'))
```

从 actions/index 文件中导入 `alert` ，我这里的策略是，凡是只对开发者才有意义的报错，依然保留使用 `console.log` 输出。

src/actions/index.js

```js
export const alert = msg => ({
  type: types.ALERT,
  msg
})

export const hideAlert = () => dispatch => dispatch({ type: types.HIDE_ALERT })
```

index 文件中，导出 `alert` 用来触发信息，`hideAlert` 用来隐藏信息。

src/constants/ActionTypes.js

```js
export const ALERT = 'ALERT'
export const HIDE_ALERT = 'HIDE_ALERT'
```

添加需要的类型定义。

src/reducers/common.js

```js
const alert = (state = '', action) => {
  switch (action.type) {
    case types.ALERT:
      return action.msg
    case types.HIDE_ALERT:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  isAuthenticated,
  currentUser,
  alert
})
```

reducer 中，添加设置和删除 alert 信息的代码。

src/containers/AlertContainer.js

```js
import React from 'react'
import { connect } from 'react-redux'
import Alert from '../components/Alert'
import { hideAlert } from '../actions'

const AlertContainer = props => <Alert {...props} />

const mapStateToProps = state => ({
  alert: state.common.alert
})

export default connect(mapStateToProps, { hideAlert })(AlertContainer)
```

alert 容器组件中导入 `alert` ，也就是提示信息字符串，以及 `hideAlert` 函数。

src/components/Alert.js

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'

const propTypes = {
  alert: PropTypes.string.isRequired,
  hideAlert: PropTypes.func.isRequired
}

class Alert extends Component {
  handleClose = () => {
    this.props.hideAlert()
  }

  render() {
    const { alert } = this.props
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        onClose={this.handleClose}
        autoHideDuration={4000}
        open={Boolean(alert)}
        message={alert}
      />
    )
  }
}

Alert.propTypes = propTypes

export default Alert
```

alert 组件中，导入 `alert` 和 `hideAlert` ，当组件显示后四秒，自动触发隐藏提示框的 action 。下面 snackbar 是否可见是通过 `open` 属性控制的，这里，如果 `hideAlert` 函数执行，把 store 中的警告信息清空了，那么 snackbar 也就会隐藏了。

src/components/Main.js

```js
import Alert from '../containers/AlertContainer'
render() {
    return (
      <Wrap>
        <Header />
        <Alert />
```

Main 组件中导入显示 Alert 组件。

浏览器中，用错误的用户名登录，会显示报错提示。登录进去后，十秒后刷新，也会显示认证码失效的信息，四秒后消失。
