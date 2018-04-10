# 访问权限控制

欢迎来到新的一节《访问权限控制》。话题很大，这里只是实现一点：用户未登录，不能访问一些受保护页面。

### 定义 PrivateRoute

src/utils/routerUtils.js

```js
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthenticated) {
        return <Component />
      } else {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    }}
  />
)
```

定义 `PrivateRoute`，也就是受保护的页面。 拿到传入的 isAuthenticated ，看看如果用户已经登录呢，那就直接显示本路由对应的组件，也就是说对于已经登录的用户 PrivateRoute 跟 Route 没有区别。但是，如果用户未登录呢？就会执行重定向组件，把我们重定向到 /login 页面，但是别忘了登录后，胡汉三还得回来，所以把当前拒绝访问的这个页面链接保存为 state.from 传递给后续操作。

src/components/Layout.js

```js
import SettingsContainer from '../containers/SettingsContainer'
import { PrivateRoute } from '../utils/routerUtils'

   <PrivateRoute
      isAuthenticated={isAuthenticated}
      path="/settings"
      component={SettingsContainer}
    />
```

导入 `SettingsContainer` 导入 `PrivateRoute` ， 把 settings 页面作为受保护的页面。

src/containers/SettingsContainer.js

```js
import React from 'react'

const SettingsContainer = props => <h1>个人设置页面</h1>

export default SettingsContainer
```

添加 settings 组件。

src/containers/LayoutContainer.js

```js
import { getIsAuthenticated } from '../selectors/authSelectors'

...
const mapStateToProps = state => ({
  ...
  isAuthenticated: getIsAuthenticated(state)
})
```

还需要传入 isAuthenicated 。拿到之后传递到展示组件中提供给 Private Route 使用。

页面中，访问 /settings ，会被重定向到 /login 页面。

### 重定向回老页面

一个非常实用的情景是，用户登录成功后，还想自动回到之前被拒绝的那个页面。例如，用户未登录直接访问 /settings ，被重定向后到 login 页面登录，那么登录后如果能自动重定向会老页面，也就是 settings 页面，那么用户体验就比较棒了。

src/constants/ActionTypes.js

```js
export const SET_REFERRER = 'SET_REFERRER'
export const CLEAR_REFERRER = 'CLEAR_REFERRER'
```

先来添加 action 类型，这里的 `REFERRER` 指的就是被拒绝的那个老页面。一共两个相关的类型，一个用来设置老页面链接，一个用来清空老页面链接。

src/reducers/common.js

```js
const referrer = (state = '', action) => {
  switch (action.type) {
    case types.SET_REFERRER:
      return action.referrer
    case types.CLEAR_REFERRER:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  title,
  alert,
  referrer
})
```

common reducer 文件中，设置 `referrer` 这个 reducer 来专门负责存储和修改老页面的链接。当收到的 action 是 `SET_REFERRER` 的时候，也就是需要设置老页面链接，这时候就把 `action.referrer` 保存到 store 中，当收到 `CLEAR_REFERRER` 这个 action 的时候，再把 store 中存储的数据清空。

src/containers/LoginContainer.js

```js
import { setReferrerIfNeeded } from '../actions/'

const LoginContainer = props => <Login {...props} />

export default connect(null, {
  setTitle,
  login,
  setReferrerIfNeeded
})(LoginContainer)
```

那么何时来设置 referrer 的值呢？可以在重定向刚刚结束后，到 Login 组件中添加代码设置 `referrer` 也就是老页面链接。不是每次打开 login 都需要设置 referrer 的，所以函数名中有 ifneeded 字样。先到容器组件中导入。

src/components/Login.js

```js
  componentDidMount() {
    ...
    this.props.setReferrerIfNeeded(this.props.location)
  }
```

Login 组件中，执行。

src/actions/index.js

```js
export const setReferrerIfNeeded = location => dispatch => {
  const referrer = location.state && location.state.from.pathname
  referrer && dispatch({ type: types.SET_REFERRER, referrer })
}
```

actions 文件夹下的 index.js 中，来创建 `setReferrerIfNeeded` 。 如果上一个页面是受保护页面，那么当 login 页面打开的时候，location.state 中是保存着老页面的链接的，这个时候就发出 SET_REFERRER 这个 action ，否则就不发出。

selectors/index.js

```js
export const getReferrer = state => state.common.referrer
```

添加对应的选择函数 `getReferrer` 。

src/actions/authActions.js

```js
import { getReferrer } from '../selectors'

export const login = data => {
  return (dispatch, getState) => {
    axios.post(LOGIN_URL, data).then(res => {
      dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
      window.localStorage.setItem('userId', res.data.user._id)
      const referrer = getReferrer(getState())
      const redirectTo = referrer || '/dashboard'
      history.push(redirectTo)
    })
  }
}
```

最后一步，到 authActions 文件中，导入 `getReferrer` ，通过 `getState` 接口，拿到 store ，传递给 `getReferrer` 就可以获取到当前 store 中保存的 referrer 了。 如果 common.referrer 非空，那就重定向到老页面，否则就还是重定向到 /dashboard 。

现在功能实现了，但是遗留的一个问题是如果登录后 referrer 不清空，那么后续登录都会重定向那个老页面。

src/actions/authActions.js

```js
const clearReferrer = () => ({
  type: types.CLEAR_REFERRER
})


 export const login = data => {
   return (dispatch, getState) => {
     axios.post(LOGIN_URL, data).then(res => {
       dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
       window.localStorage.setItem('userId', res.data.user._id)
       const referrer = getReferrer(getState())
       dispatch(clearReferrer())
       const redirectTo = referrer || '/dashboard'
       history.push(redirectTo)
     })
```

定义创建函数 `clearReferrer` ，然后到 `login` 中，`getReferrer` 获取 referrer 成功后，`dispatch` 一下即可。

src/actions/index.js

```js
export const setReferrerIfNeeded = location => dispatch => {
  const referrer = location.state && location.state.from.pathname
  referrer &&
    dispatch({ type: types.SET_REFERRER, referrer }) &&
    dispatch(alert('请先登录'))
}
```

用户被重定向到登录页面之后，如果能看到一个请先登录的提示信息，那么用户体验肯定会好很多。发起设置 referrer 的 action 后， dispatch 一下 alert 即可。

看看本部分达成的效果。未登录条件下访问 `/settings` 这个受保护页面，会被重定向到登录页，登录成功后应用可以把用户带回先前被拒绝访问的 /settings 页面。退出登录，再次登录，就会被直接重定向到 `/dashboard` 页面。
