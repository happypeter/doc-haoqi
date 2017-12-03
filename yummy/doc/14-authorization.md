# 访问权限控制

欢迎来到新的一节《访问权限控制》。话题很大，这里只是实现一点，用户未登录，不能访问一些受保护页面的，会被直接重定向回到登录页，登录成功，能够自动跳转回被拒绝的那个页面。

### 定义 PrivateRoute

进入第一部分《定义 PrivateRoute》。这是本小节的心脏。

```diff
diff --git a/client/src/utils/routerUtils.js b/client/src/utils/routerUtils.js
index 96dc48a..782dab6 100644
--- a/client/src/utils/routerUtils.js
+++ b/client/src/utils/routerUtils.js
@@ -1,3 +1,16 @@
 import createBrowserHistory from 'history/createBrowserHistory'
 export const history = createBrowserHistory()
+
+export const PrivateRoute = ({component: Component, isAuthenticated, ...rest }) => (
+  <Route { ...rest } render={(props) => {
+    if (isAuthenticated) {
+      return <Component />
+    } else {
+      return <Redirect to={{
+          pathname: '/login',
+          state: { from: props.location }
+        }} />
+    }
+  }} />
+)
```

拿到传入的 isAuthenticated ，看看如果用户已经登录呢，那就直接显示本路由对应的组件，也就是说对于已经登录的用户 PrivateRoute 跟 Route 没有区别。但是，如果用户未登录呢？就会执行重定向组件，把我们重定向到 /login 页面，但是别忘了登录后，胡汉三还得回来，所以把当前拒绝访问的这个页面链接保存为 state.from 传递给后续操作。

来使用一下 Private Route 。


```diff
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index c9ef5c9..484520f 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -3,13 +3,15 @@ import LoginContainer from '../containers/LoginContainer'
 import SignupContainer from '../containers/SignupContainer'
 import AlertBoxContainer from '../containers/AlertBoxContainer'
 import SidebarContainer from '../containers/SidebarContainer'
+import SettingsContainer from '../containers/SettingsContainer'
+import { PrivateRoute } from '../utils/routerUtils'
 import {
   Switch,
   Route
 } from 'react-router-dom'
 import styled from 'styled-components'
-const Layout = ({ title, showAlert }) => (
+const Layout = ({ title, showAlert, isAuthenticated }) => (
   <Wrap>
    { showAlert &&  <AlertBoxContainer /> }
    <SidebarContainer />
@@ -21,6 +23,7 @@ const Layout = ({ title, showAlert }) => (
         <Switch>
           <Route path='/signup' component={SignupContainer} />
           <Route path='/login' component={LoginContainer} />
+          <PrivateRoute isAuthenticated={isAuthenticated} path='/settings' component={SettingsContainer} />
         </Switch>
       </MainInner>
     </Main>
```

把 settings 也就是设置页面作为受保护的页面。


添加 settings 组件。

```diff
diff --git a/client/src/containers/SettingsContainer.js b/client/src/containers/SettingsContainer.js
new file mode 100644
index 0000000..d4356cf
--- /dev/null
+++ b/client/src/containers/SettingsContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import Settings from '../components/Settings'
+
+const SettingsContainer = props => <h1>个人设置页面</h1>
+
+export default SettingsContainer
```

暂时只添加一个容器组件吧。

还需要传入 isAuthenicated

```diff
diff --git a/client/src/containers/LayoutContainer.js b/client/src/containers/LayoutContainer.js
index c4010ee..d1765b7 100644
--- a/client/src/containers/LayoutContainer.js
+++ b/client/src/containers/LayoutContainer.js
@@ -1,13 +1,15 @@
 import React from 'react'
 import Layout from '../components/Layout'
 import { getTitle, getShowAlert } from '../selectors/commonSelectors'
+import { getIsAuthenticated } from '../selectors/authSelectors'
 import { connect } from 'react-redux'
 const LayoutContainer = props => <Layout {...props} />
 const mapStateToProps = state => ({
   title: getTitle(state),
-  showAlert: getShowAlert(state)
+  showAlert: getShowAlert(state),
+  isAuthenticated: getIsAuthenticated(state)
 })
 export default connect(mapStateToProps)(LayoutContainer)
diff --git a/client/src/containers/SettingsContainer.js b/client/src/containers/SettingsContainer.js
index d4356cf..bb2351e 100644
--- a/client/src/containers/SettingsContainer.js
+++ b/client/src/containers/SettingsContainer.js
@@ -1,5 +1,4 @@
 import React from 'react'
-import Settings from '../components/Settings'
 const SettingsContainer = props => <h1>个人设置页面</h1>
diff --git a/client/src/utils/routerUtils.js b/client/src/utils/routerUtils.js
index 782dab6..145bba9 100644
--- a/client/src/utils/routerUtils.js
+++ b/client/src/utils/routerUtils.js
@@ -1,3 +1,6 @@
+import React from 'react'
+import { Route } from 'react-router-dom'
+import { Redirect } from 'react-router-dom'
 import createBrowserHistory from 'history/createBrowserHistory'
 export const history = createBrowserHistory()
```

拿到之后传递到展示组件中提供给 Private Route 使用。

来看看本部分达成的效果吧。页面中访问 /settings ，会被重定向到 /login 页面。

至此，《定义 Private Route 》这部分就胜利完成了。

### 重定向回老页面

进入下一部分《重定向回老页面》，让用户登录成功后还能回到之前被拒绝的页面，这部分的支点和核心我们建立在状态树中的 common.referrer 字段，如果其中保存着老页面的链接，就执行重定向，如果没有就不执行。


添加需要的 action type

```diff
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index bb81170..109eddb 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -6,3 +6,5 @@ export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
 export const LOGOUT = 'LOGOUT'
 export const RECEIVE_USERS = 'RECEIVE_USERS'
 export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
+export const SET_REFERRER = 'SET_REFERRER'
+export const CLEAR_REFERRER = 'CLEAR_REFERRER'
```

一共两个，一个用来设置，一个用来清空。

添加 reducer

```diff
diff --git a/client/src/reducers/common.js b/client/src/reducers/common.js
index 620f5e0..9f5214a 100644
--- a/client/src/reducers/common.js
+++ b/client/src/reducers/common.js
@@ -26,7 +26,19 @@ const alert = (state=initAlert, action) => {
   }
 }
+const referrer = (state='', action) => {
+  switch (action.type) {
+    case types.SET_REFERRER:
+      return action.referrer
+    case types.CLEAR_REFERRER:
+      return ''
+    default:
+      return state
+  }
+}
+
 export default combineReducers({
   title,
-  alert
+  alert,
+  referrer
 })
```

对应两个操作，一个设置，一个清空。

再来定义读取 referrer 的选择器

```diff
diff --git a/client/src/selectors/commonSelectors.js b/client/src/selectors/commonSelectors.js
index b76e61e..f7fac9f 100644
--- a/client/src/selectors/commonSelectors.js
+++ b/client/src/selectors/commonSelectors.js
@@ -1,3 +1,4 @@
 export const getTitle = state => state.common.title
 export const getShowAlert = state => state.common.alert.show
 export const getAlertMsg = state => state.common.alert.msg
+export const getReferrer = state => state.common.referrer
```

选择器名字 getReferrer 。


那么何时来设置 referrer 的值呢？可以选择在重定向发生前，也可以选择在重定向刚刚结束后，我们这里选择在结束后，所以到 Login 组件中添加代码。

```diff
diff --git a/client/src/components/Login.js b/client/src/components/Login.js
index fd0de94..a068072 100644
--- a/client/src/components/Login.js
+++ b/client/src/components/Login.js
@@ -1,10 +1,12 @@
 import React, { Component } from 'react'
 import { loginConfig } from '../constants/FormConfig'
+import { setReferrerIfNeeded } from '../actions/commonActions'
 import Form from './Form'
 class Login extends Component {
   componentDidMount () {
     this.props.setTitle('登录')
+    this.props.setReferrerIfNeeded(this.props.location)
   }
   render () {
```


不是每次打开 login 都需要设置 referrer 的，所以函数名中有 ifneeded 字样。

现在具体来实现一下这个 setReferrerIfNeeded 函数。


```diff
diff --git a/client/src/actions/commonActions.js b/client/src/actions/commonActions.js
index 04fa929..c60dd8d 100644
--- a/client/src/actions/commonActions.js
+++ b/client/src/actions/commonActions.js
@@ -12,3 +12,8 @@ export const alert = msg => ({
 export const hideAlert = () => dispatch => {
   dispatch({ type: types.HIDE_ALERT })
 }
+
+export const setReferrerIfNeeded = location => dispatch => {
+  const referrer =  location.state && location.state.from.pathname
+  referrer && dispatch({ type: types.SET_REFERRER, referrer })
+}
```

如果上一个页面是受保护页面，那么当 login 页面打开的时候，location.state 中是保存着老页面的链接的，这个时候就发出 SET_REFERRER 这个 action ，否则就不发出。


Login 组件中的 setReferrerIfNeeded 是需要容器组件传入的

```diff
diff --git a/client/src/components/Login.js b/client/src/components/Login.js
index a068072..8ae5157 100644
--- a/client/src/components/Login.js
+++ b/client/src/components/Login.js
@@ -1,6 +1,5 @@
 import React, { Component } from 'react'
 import { loginConfig } from '../constants/FormConfig'
-import { setReferrerIfNeeded } from '../actions/commonActions'
 import Form from './Form'
 class Login extends Component {
diff --git a/client/src/components/SidebarUserInfo.js b/client/src/components/SidebarUserInfo.js
index f6acfcd..ec8ee27 100644
--- a/client/src/components/SidebarUserInfo.js
+++ b/client/src/components/SidebarUserInfo.js
@@ -3,7 +3,6 @@ import styled from 'styled-components'
 import Avatar from './Avatar'
 import avatar from '../assets/avatar.png'
 import { Link } from 'react-router-dom'
-import PropTypes from 'prop-types'
 const UserInfo = ({ isAuthenticated, logout, currentUser }) => (
   <Wrap>
diff --git a/client/src/containers/LoginContainer.js b/client/src/containers/LoginContainer.js
index 0205759..86eae9e 100644
--- a/client/src/containers/LoginContainer.js
+++ b/client/src/containers/LoginContainer.js
@@ -1,6 +1,6 @@
 import React from 'react'
 import Login from '../components/Login'
-import { setTitle } from '../actions/commonActions'
+import { setTitle, setReferrerIfNeeded } from '../actions/commonActions'
 import { connect } from 'react-redux'
 import { login } from '../actions/authActions'
@@ -8,5 +8,6 @@ const LoginContainer = props => <Login {...props} />
 export default connect(null, {
   setTitle,
-  login
+  login,
+  setReferrerIfNeeded
 })(LoginContainer)
```

导入，并作为属性使用。

最后一步要到登录后判断一下如果 common.referrer 设置了值，那就重定向到老页面。


```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index 629784b..cf0d4f6 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -4,6 +4,7 @@ import {
   USER_BY_ID_URL
 } from '../constants/ApiConstants'
 import axios from 'axios'
+import { getReferrer } from '../selectors/commonSelectors'
 import { alert } from './commonActions'
 import * as types from '../constants/ActionTypes'
 import { history } from '../utils/routerUtils'
@@ -23,11 +24,13 @@ export const signup = data => dispatch => {
 }
 export const login = data => {
-  return dispatch => {
+  return (dispatch, getState) => {
     axios.post(LOGIN_URL, data).then(res => {
       dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
       window.localStorage.setItem('userId', res.data.user._id)
-      history.push('/dashboard')
+      const referrer = getReferrer(getState())
+      const redirectTo = referrer || '/dashboard'
+      history.push(redirectTo)
     }).catch(
       err => {
         if(err.response){
```

referrer 为空则继续重定向到 /dashboard ，否则重定向回之前受保护的页面。

现在的问题是 referrer 不清空，每次登录后都会重定向。


```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index cf0d4f6..6981bb9 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -23,12 +23,17 @@ export const signup = data => dispatch => {
   })
 }
+const clearReferrer = () => ({
+  type: 'CLEAR_REFERRER'
+})
+
 export const login = data => {
   return (dispatch, getState) => {
     axios.post(LOGIN_URL, data).then(res => {
       dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
       window.localStorage.setItem('userId', res.data.user._id)
       const referrer = getReferrer(getState())
+      dispatch(clearReferrer())
       const redirectTo = referrer || '/dashboard'
       history.push(redirectTo)
     }).catch(
```

清空一下即可。

用户被重定向到登录页面之后，如果能看到一个请先登录的提示信息，那么用户体验肯定会好很多。

```diff
diff --git a/client/src/actions/commonActions.js b/client/src/actions/commonActions.js
index c60dd8d..2a9de19 100644
--- a/client/src/actions/commonActions.js
+++ b/client/src/actions/commonActions.js
@@ -16,4 +16,5 @@ export const hideAlert = () => dispatch => {
 export const setReferrerIfNeeded = location => dispatch => {
   const referrer =  location.state && location.state.from.pathname
   referrer && dispatch({ type: types.SET_REFERRER, referrer })
+  && dispatch(alert('请先登录'))
 }
```
发起设置 referrer 的 action 后，发一下 alert 。

看看本部分达成的效果。未登录条件下访问 /settings 这个受保护页面，会被重定向到登录页，登录成功后应用可以把用户带回先前被拒绝访问的 /settings 页面。

### 总结

进入最后一部分《总结》。

来复盘一下本节思路。一个未登录的用户在访问到一个受保护页面的时候，例如个人设置， /settins 页面，会被 Private Route 中的语法自动重定向到首页，同时路由中会携带 location.state = '/settings' 这样的数据到首页。首页组件挂载后会判断 location.state 是否有数据，如果答案是肯定的，那就把 '/settings' 这个老页面的链接保存到 redux 的 common.referrer 字段。而这个字段也就是本节实现功能的中枢了。登录后页面往哪里跳转，完全由它决定。

至此《访问权限控制》这个小节就胜利完成了。