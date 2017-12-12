# 实现登录态控制

这集来《实现登录态控制》。会涉及到页面访问权限控制的技巧。

### 实现退出登录功能

先来《实现退出登录功能》。

```diff
diff --git a/admin/src/actions/authActions.js b/admin/src/actions/authActions.js
index d029a2e..3b14680 100644
--- a/admin/src/actions/authActions.js
+++ b/admin/src/actions/authActions.js
@@ -2,10 +2,15 @@ import { history } from '../utils/routerUtils'
 export const login = data => dispatch => {
   const { username, password } = data
-  if (username === 'admin' && password === 'secret') {
+  if (username === 'happypeter' && password === '111111') {
     history.push('/dashboard')
     return Promise.resolve('登录成功！')
   } else {
     return Promise.reject('用户名密码错误！')
   }
 }
+
+export const logout = () => dispatch => {
+  history.push('/')
+  return Promise.resolve('您已退出登录！')
+}
diff --git a/admin/src/components/Logout.js b/admin/src/components/Logout.js
index 93cd2f2..5174c32 100644
--- a/admin/src/components/Logout.js
+++ b/admin/src/components/Logout.js
@@ -1,11 +1,18 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
+import { message } from 'antd'
 class Logout extends Component {
+  handleClick = () => {
+    this.props.logout().then(
+      data => message.success(data)
+    )
+  }
+
   render () {
     return (
       <Wrap>
-        <LogoutText>
+        <LogoutText onClick={this.handleClick}>
           退出
         </LogoutText>
         <UserName>
@@ -30,6 +37,7 @@ const LogoutText = styled.div`
   flex-basis: 50px;
   background: #ff8a00;
   color: white;
+  cursor: pointer;
 `
 const UserName = styled.div`
diff --git a/admin/src/containers/LogoutContainer.js b/admin/src/containers/LogoutContainer.js
index 09f9fa9..7808b38 100644
--- a/admin/src/containers/LogoutContainer.js
+++ b/admin/src/containers/LogoutContainer.js
@@ -1,9 +1,12 @@
 import React from 'react'
 import Logout from '../components/Logout'
 import { connect } from 'react-redux'
+import { logout } from '../actions/authActions'
 const LogoutContainer = props => <Logout {...props} />
 const mapStateToProps = state => ({ })
-export default connect(mapStateToProps)(LogoutContainer)
+export default connect(mapStateToProps, {
+  logout
+})(LogoutContainer)
```

一共修改了三个文件。

首先看 action 创建器文件，也就是 authActions.js 中，先把默认的用户名和密码改了一下，因为这个是我浏览器的自动补齐的用户名密码，方便调试，另外添加了这部分的主角，logout 函数。其中干两个事情，第一是进行页面跳转，第二就是返回带有成功信息的 Promise 给函数调用者。

接下来按照我遵循的讨论，展示组件是不允许自己去导入 logout 函数的，必须通过容器组件导入然后传递给它，这个就是 LogoutContainer.js 中的修改内容。

最后到 Logout.js 中在 handleClick 函数中调用 logout，并用 .then 接口接收 logout 返回的成功信息，用全局提示组件显示出来，那 handleClick 何时被触发呢？当然是我点 Logout 按钮的时候了。

看看达成的效果。点退出按钮，可以回到首页。但是其实现在登录页面也就是个摆设，我直接敲 /dashboard 链接也可以进入操作盘界面呀，解决这个问题就需要应用要保存登录态数据，未登录状态下有些路由就禁止访问。

### 到 redux 中保存登录态

所以就来《到 redux 中保存登录态》。总体思路就是，让 redux 保存一个 isAuthenticated 状态值来体现用户是否处于登录状态。

```diff
diff --git a/admin/src/actions/authActions.js b/admin/src/actions/authActions.js
index 3b14680..fbf94c2 100644
--- a/admin/src/actions/authActions.js
+++ b/admin/src/actions/authActions.js
@@ -1,9 +1,11 @@
 import { history } from '../utils/routerUtils'
+import * as types from '../constants/ActionTypes'
 export const login = data => dispatch => {
   const { username, password } = data
   if (username === 'happypeter' && password === '111111') {
     history.push('/dashboard')
+    dispatch({ type: types.LOGIN_SUCCESS })
     return Promise.resolve('登录成功！')
   } else {
     return Promise.reject('用户名密码错误！')
diff --git a/admin/src/constants/ActionTypes.js b/admin/src/constants/ActionTypes.js
index 21f56de..11f7d02 100644
--- a/admin/src/constants/ActionTypes.js
+++ b/admin/src/constants/ActionTypes.js
@@ -1 +1 @@
-export const STH = 'STH'
+export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
diff --git a/admin/src/reducers/common.js b/admin/src/reducers/common.js
index eaececa..30c038f 100644
--- a/admin/src/reducers/common.js
+++ b/admin/src/reducers/common.js
@@ -1,15 +1,15 @@
 import * as types from '../constants/ActionTypes'
 import { combineReducers } from 'redux'
-const sth = (state = {}, action) => {
+const isAuthenticated = (state = false, action) => {
   switch (action.type) {
-    case types.STH:
-      return action.sth
+    case types.LOGIN_SUCCESS:
+      return true
     default:
       return state
   }
 }
 export default combineReducers({
-  sth
+  isAuthenticated
 })
```

一共改了三个文件。

先到 ActionTypes 文件中定义一个 action 类型叫 LOGIN_SUCCESS 。

接下来，到 authActions.js 中，如果用户登录成功，就发出这个 action 。

common.js 中写 reducer 代码，接收到这个 action ，就把 isAuthenticated 设置为 true 。

看看达成的效果。页面中登录，从 chrome 终端中打印出的 redux-logger 信息中，可以看到 common.isAuthenticated 变成了 true 。手里有了这个状态不是目的，目的还是要把一些页面保护起来。

### 写受保护页面

于是就可以来《写受保护页面》了。把 /dashboard 变成一个受保护的页面。

```diff
diff --git a/admin/src/containers/App.js b/admin/src/containers/App.js
index fb1d430..78fc310 100644
--- a/admin/src/containers/App.js
+++ b/admin/src/containers/App.js
@@ -2,7 +2,8 @@ import React, { Component } from 'react'
 import '../assets/global.css'
 import HomeContainer from './HomeContainer'
-import { history } from '../utils/routerUtils'
+import { connect } from 'react-redux'
+import { history, PrivateRoute } from '../utils/routerUtils'
 import {
   Router,
   Switch,
@@ -11,15 +12,20 @@ import {
 class App extends Component {
   render () {
+    const { isAuthenticated } = this.props
     return (
       <Router history={history} >
         <Switch>
           <Route exact path='/' component={HomeContainer} />
-          <Route path='/dashboard' component={DashboardContainer} />
+          <PrivateRoute isAuthenticated={isAuthenticated} path='/dashboard' component={DashboardContainer} />
         </Switch>
       </Router>
     )
   }
 }
-export default App
+const mapStateToProps = state => ({
+  isAuthenticated: state.common.isAuthenticated
+})
+
+export default connect(mapStateToProps)(App)
diff --git a/admin/src/utils/routerUtils.js b/admin/src/utils/routerUtils.js
index 96dc48a..4fdf654 100644
--- a/admin/src/utils/routerUtils.js
+++ b/admin/src/utils/routerUtils.js
@@ -1,3 +1,15 @@
 import createBrowserHistory from 'history/createBrowserHistory'
+import React from 'react'
+import DashboardContainer from './DashboardContainer'
+import { Route, Redirect } from 'react-router-dom'
 export const history = createBrowserHistory()
+
+export const PrivateRoute = ({ isAuthenticated }) => {
+  if (isAuthenticated) {
+    return <Route path='/dashboard' component={DashboardContainer} />
+  } else {
+    return <Redirect to='/' />
+  }
+}
```

这次的修改涉及两个文件。

App.js 中，先导入 connect 和一个叫做 PrivteRoute 方法。导入 connect 是因为要连接 store，从而使用 mapStateToProps 选择器函数，把 isAuthenticated 从整个 redux 状态树中选出来。组件中拿到 isAuthenticated 要把它传递给 PrivateRoute 使用。

routerUtils 新添加的 PrivateRoute 逻辑就是，如果 isAuthenticated 为 true，就直接显示 /dashboard ，如果未登录就重定向到首页。

看看达成的效果。用户在未登录的情况下，直接敲链接访问 /dashboard ，会被重定向到首页，如果登录成功，就可以访问 dashboard 了。
