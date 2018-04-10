# 控制登录态

欢迎来到新的一节《控制登录态》，任务是如何在 redux 数据层面维护用户登录状态，以及如何在界面上体现用户登录状态。

### 维护登录态

登录态可以通过 redux 中保存的 isAuthenticated 状态值来维护。用户登录或者注册成功后，设置 isAuthenticated 为 true 。

src/constants/ActionTypes.js

```js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
```

老规矩，先来定义两个 Action 类型。顾名思义，用户登录或者注册成功之后他们两位会被触发。

src/actions/authActions.js

```js
import * as types from '../constants/ActionTypes'

export const signup = data => dispatch => {
  axios.post(SIGNUP_URL, data).then(res => {
    dispatch({ type: types.SIGNUP_SUCCESS, user: res.data.user })
    history.push('/dashboard')
  })
}

export const login = data => {
  return dispatch => {
    axios.post(LOGIN_URL, data).then(res => {
      dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
      history.push('/dashboard')
    })
  }
}
```

这样，导入一下 action type，注册成功后发出 `SIGNUP_SUCCESS`，登录成功后也发出 `LOGIN_SUCCESS`。

src/reducers/auth.js

```js
import * as types from '../constants/ActionTypes'
import { combineReducers } from 'redux'

const isAuthenticated = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return true
    default:
      return state
  }
}

export default combineReducers({
  isAuthenticated
})
```

auth reducer 中每次收到 LOGIN_SUCCESS 或者 SIGNUP_SUCCESS 之后，把 isAuthenticated 设置为 true 。

```js
import { combineReducers } from 'redux'
import common from './common'
import auth from './auth'

export default combineReducers({
  common,
  auth
})
```

rootReducer 中需要导入这个 auth reducer 。

浏览器中，用户注册成功后，redux-logger 的打印输出中， auth.isAuthenticated 会设置为 true 。这样就有了维持登录状态的底层数据基础了。登录成功了，也会达成同样的效果。

### 订阅登录态

下面让 store 中 isAuthenticated 状态值作用于 UI ，这样用户就能感受到登录态了。

src/selectors/authSelectors.js

```js
export const getIsAuthenticated = state => state.auth.isAuthenticated
```

创建 authSelectors.js 读取 `isAuthenticated` 值。

src/containers/SidebarContainer.js

```js
import { getIsAuthenticated } from '../selectors/authSelectors'
import { connect } from 'react-redux'

const SidebarContainer = props => <Sidebar {...props} />

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state)
})

export default connect(mapStateToProps)(SidebarContainer)
```

首先导入 selector 和 connect ，然后 `mapStateToProps` 中使用 selector 获取 `isAuthenticated` 的值。

src/components/Sidebar.js

```js
 render() {
    const { isAuthenticated } = this.props
    return (
          <UserInfo isAuthenticated={isAuthenticated} />
```

Sidebar.js 中拿到 isAuthenticated ，然后传递给 UserInfo 组件使用。

src/components/SidebarUserInfo.js

```js
const UserInfo = ({ isAuthenticated }) => (
  <Wrap>
    <CenteredAvatar avatar={avatar} size="100" />
    {isAuthenticated && (
      <Text>
        <Name to="/profile">用户名</Name>
        <Link to="">退出</Link>
      </Text>
    )}
  </Wrap>
)
```

到 SidebarUserInfo 组件之中，解构赋值一下拿到 isAuthenticated ，下面通过判断它是否为 true 来决定要不要显示用户名和退出链接。

浏览器中，登录或者注册成功后，侧边栏中才能看到用户名和退出字样。这样用户从 ui 层面，就能感受到登录态了。

### 退出登录

那如何退出登录呢？

src/constants/ActionTypes.js

```js
export const LOGOUT = 'LOGOUT'
```

添加 action 类型，LOGOUT ，登出。

src/actions/authActions.js

```js
export const logout = () => {
  history.push('/')
  return dispatch => dispatch({ type: types.LOGOUT })
}
```

发出 action ，同时页面跳转到首页。

src/reducers/auth.js

```js
const isAuthenticated = (state = false, action) => {
  switch (action.type) {
    case types.LOGOUT:
      return false
  }
}
```

reducer 中接收到 `LOGOUT` action ，把 `isAuthenticated` 设置为 false 这样，登录态就被销毁了。

下面的步骤就是如何来触发这个 action 了。

src/containers/SidebarContainer.js

```js
import { logout } from '../actions/authActions'

export default connect(mapStateToProps, {
  logout
})(SidebarContainer)
```

容器组件中拿到这个 Action ，传递给展示组件。

src/components/Sidebar.js

```js
<UserInfo {...this.props} />
```

删除原有的解构赋值获得 `isAuthenticated` 的这一行。因为这次直接用 ES6 展开运算符把所有的属性都传递给 UserInfo ，其中包含 isAuthenticated 和 logout 。

src/components/SidebarUserInfo.js

```js
const UserInfo = ({ isAuthenticated, logout }) => (

    <Link to='' onClick={logout}>退出</Link>
```

首先参数中结构赋值拿到 `logout` ，然后点退出按钮的时候执行它。注意，页面跳转工作之所以不用这里的 `Link` 完成，是因为写到 action 中可以应对退出失败等情况，比较灵活。

浏览器中，用户点退出登录按钮，界面上侧边栏中的登录状态被取消，redux 数据底层维护登录态的 isAuthenticated 状态值也会设置为 false 了。
