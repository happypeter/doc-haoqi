# 控制登录态

欢迎来到新的一节《控制登录态》，注意任务是如何确认用户处于登录状态，如何保证页面刷新后用户依然保持登录状态，如何登出登录状态，如何在侧边栏用户区体现用户登录状态。

### 维护登录态

进入《维护登录态》这个部分。简单来说登录态可以通过 redux 中保存的 isAuthenticated 状态值来维护。用户登录或者注册成功后，设置 isAuthenticated 为 true 。


老规矩，先来定义两个 Action 类型。

```diff
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index e77ecab..85df20d 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -1,3 +1,5 @@
 export const SET_TITLE = 'SET_TITLE'
 export const ALERT = 'ALERT'
 export const HIDE_ALERT = 'HIDE_ALERT'
+export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
+export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
```

顾名思义，用户登录或者注册成功之后他俩会被触发。

触发它们的位置在 authActions 中

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index cd9aaa3..4769944 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -1,11 +1,12 @@
 import axios from 'axios'
 import { LOGIN_URL, SIGNUP_URL } from '../constants/ApiContants'
+import * as types from '../constants/ActionTypes'
 import { alert } from './commonActions'
 import { history } from '../utils/routerUtils'
 
 export const signup = data => dispatch => {
   axios.post(SIGNUP_URL, data).then(res => {
-    console.log('res', res.data)
+    dispatch({ type: types.SIGNUP_SUCCESS })
     history.push('/dashboard')
   }).catch(err => {
     if (err.response) {
@@ -18,7 +19,7 @@ export const signup = data => dispatch => {
 export const login = data => {
   return dispatch => {
     axios.post(LOGIN_URL, data).then(res => {
-      console.log('res', res.data)
+      dispatch({ type: types.LOGIN_SUCCESS })
       history.push('/dashboard')
     }).catch(
       err => {
```

这样，登录注册后，redux-logger 应该可以在终端中打印出这两个 Action 。

接收这两个信号。

```diff
diff --git a/client/src/reducers/auth.js b/client/src/reducers/auth.js
new file mode 100644
index 0000000..9436087
--- /dev/null
+++ b/client/src/reducers/auth.js
@@ -0,0 +1,16 @@
+import * as types from '../constants/ActionTypes'
+import { combineReducers } from 'redux'
+
+const isAuthenticated = (state = false, action) => {
+  switch (action.type) {
+    case types.LOGIN_SUCCESS:
+    case types.SIGNUP_SUCCESS:
+      return true
+    default:
+      return state
+  }
+}
+
+export default combineReducers({
+  isAuthenticated
+})
diff --git a/client/src/reducers/index.js b/client/src/reducers/index.js
index 15840c6..9696d61 100644
--- a/client/src/reducers/index.js
+++ b/client/src/reducers/index.js
@@ -1,8 +1,10 @@
 import { combineReducers } from 'redux'
 import common from './common'
+import auth from './auth'
 
 const rootReducer = combineReducers({
-  common
+  common,
+  auth
 })
 
 export default rootReducer
 ```

新加了一个 auth reducer ，专门负责认证。



看看本部分达成的效果。redux-logger 的打印输出中看一下。每次用户注册登录成功后， auth.isAuthenticated 都会设置为 true 。

至此，《维护登录态》这部分就胜利完成了。



### 订阅登录态

进入《订阅登录态》这个部分。让 isAuthenticated 作用于 UI ，这样用户就能感受到登录态了。

老规矩，先写 selector 。

```diff
diff --git a/client/src/selectors/authSelectors.js b/client/src/selectors/authSelectors.js
new file mode 100644
index 0000000..0ade86c
--- /dev/null
+++ b/client/src/selectors/authSelectors.js
@@ -0,0 +1 @@
+export const getIsAuthenticated = state => state.auth.isAuthenticated
```

读取 `isAuthenticated` 值。

容器组件中使用 selector 


```diff
diff --git a/client/src/containers/SidebarContainer.js b/client/src/containers/SidebarContainer.js
index c68b062..c997885 100644
--- a/client/src/containers/SidebarContainer.js
+++ b/client/src/containers/SidebarContainer.js
@@ -1,6 +1,12 @@
 import React from 'react'
 import Sidebar from '../components/Sidebar'
+import { getIsAuthenticated } from '../selectors/authSelectors'
+import { connect } from 'react-redux'
 
 const SidebarContainer = props => <Sidebar {...props} />
 
-export default SidebarContainer
+const mapStateToProps = state => ({
+  isAuthenticated: getIsAuthenticated(state)
+})
+
+export default connect(mapStateToProps)(SidebarContainer)
```

作用就是以属性值的形式把  `isAuthenticated` 提供给展示组件。

展示组件中来使用拿到的数据。

```diff
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index 7f75dd3..4665c8e 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -18,16 +18,18 @@ class Sidebar extends Component {
   }
 
   render () {
+    const { isAuthenticated } = this.props
     return (
       <Wrap>
         <Menu
           isOpen={this.state.isOpen}
           customCrossIcon={ false }
         >
-          <UserInfo />
+          <UserInfo isAuthenticated={isAuthenticated} />
           <div className="bm-link-list">
             <Link onClick={this.closeMenu} to="/">首页</Link>
-            <Link onClick={this.closeMenu} to="/profile">个人中心</Link>
+            <Link onClick={this.closeMenu} to="/login">登录</Link>
+            <Link onClick={this.closeMenu} to="/signup">注册</Link>
             <Link onClick={this.closeMenu} to="/dishes">猜你喜欢</Link>
           </div>
           <div className="bottom-button">
diff --git a/client/src/components/SidebarUserInfo.js b/client/src/components/SidebarUserInfo.js
index 8227aa0..e4c1715 100644
--- a/client/src/components/SidebarUserInfo.js
+++ b/client/src/components/SidebarUserInfo.js
@@ -8,15 +8,18 @@ const propTypes = {
 
 }
 
-const UserInfo = () => (
+const UserInfo = ({ isAuthenticated }) => (
   <Wrap>
-    <CenteredAvatar avatar={avatar}  size='100' />
-    <Text>
-      <Name to="/profile" >
-        用户名
-      </Name>
-      <Link to="">退出</Link>
-    </Text>
+    <CenteredAvatar avatar={avatar} size='100' />
+    {
+      isAuthenticated &&
+      <Text>
+        <Name to='/profile' >
+          用户名
+        </Name>
+        <Link to=''>退出</Link>
+      </Text>
+    }
   </Wrap>
 )
```

避免单个展示组件太大，看着眼晕，做了一下组件拆分。

看看本部分达成的效果。登录注册成功后，侧边栏中才能看到用户名和退出字样。用户角度的登录态就实现了。

至此，《订阅登录态》这部分就胜利完成了。

### 退出登录

进入《退出登录》这个部分。

先加  Action 类型。


```diff
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index 85df20d..4e6a16e 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -1,5 +1,9 @@
+// common
 export const SET_TITLE = 'SET_TITLE'
 export const ALERT = 'ALERT'
 export const HIDE_ALERT = 'HIDE_ALERT'
+
+// auth
 export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
 export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
+export const LOGOUT = 'LOGOUT'
```

添加 Action

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index 4769944..3ad409b 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
 }
+
+export const logout = () => {
+  history.push('/')
+  return dispatch => dispatch({ type: types.LOGOUT })
+}
```

发退出信号给 reducer 同时页面跳转到首页。


容器组件中拿到这个 Action 


```diff
diff --git a/client/src/containers/SidebarContainer.js b/client/src/containers/SidebarContainer.js
index c997885..183bf79 100644
--- a/client/src/containers/SidebarContainer.js
+++ b/client/src/containers/SidebarContainer.js
@@ -1,6 +1,7 @@
 import React from 'react'
 import Sidebar from '../components/Sidebar'
 import { getIsAuthenticated } from '../selectors/authSelectors'
+import { logout } from '../actions/authActions'
 import { connect } from 'react-redux'
 
 const SidebarContainer = props => <Sidebar {...props} />
@@ -9,4 +10,6 @@ const mapStateToProps = state => ({
   isAuthenticated: getIsAuthenticated(state)
 })
 
-export default connect(mapStateToProps)(SidebarContainer)
+export default connect(mapStateToProps, {
+  logout
+})(SidebarContainer)
```

传递给展示组件。

展示组件传递给自己的子组件

```diff
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index 4665c8e..ffbd753 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -18,14 +18,13 @@ class Sidebar extends Component {
   }
 
   render () {
-    const { isAuthenticated } = this.props
     return (
       <Wrap>
         <Menu
           isOpen={this.state.isOpen}
           customCrossIcon={ false }
         >
-          <UserInfo isAuthenticated={isAuthenticated} />
+          <UserInfo {...this.props} />
           <div className="bm-link-list">
             <Link onClick={this.closeMenu} to="/">首页</Link>
             <Link onClick={this.closeMenu} to="/login">登录</Link>
```

直接用 ES6 展开运算符的这种简写形式。


真正使用 logout 

```diff
diff --git a/client/src/components/SidebarUserInfo.js b/client/src/components/SidebarUserInfo.js
index e4c1715..d02f539 100644
--- a/client/src/components/SidebarUserInfo.js
+++ b/client/src/components/SidebarUserInfo.js
@@ -3,12 +3,14 @@ import styled from 'styled-components'
 import Avatar from './Avatar'
 import avatar from '../assets/avatar.png'
 import { Link } from 'react-router-dom'
+import PropTypes from 'prop-types'
 
 const propTypes = {
-
+  isAuthenticated: PropTypes.bool.isRequired,
+  logout: PropTypes.func.isRequired
 }
 
-const UserInfo = ({ isAuthenticated }) => (
+const UserInfo = ({ isAuthenticated, logout }) => (
   <Wrap>
     <CenteredAvatar avatar={avatar} size='100' />
     {
@@ -17,7 +19,7 @@ const UserInfo = ({ isAuthenticated }) => (
         <Name to='/profile' >
           用户名
         </Name>
-        <Link to=''>退出</Link>
+        <Link to='#' onClick={logout}>退出</Link>
       </Text>
     }
   </Wrap>
```

页面跳转工作不用 Link 完成，是因为写到 action 中可以应对退出失败等情况，比较灵活。


最关键的一步，reducer 中修改 isAuthenticated 值

```diff
diff --git a/client/src/reducers/auth.js b/client/src/reducers/auth.js
index 9436087..e7fa118 100644
--- a/client/src/reducers/auth.js
+++ b/client/src/reducers/auth.js
@@ -6,6 +6,8 @@ const isAuthenticated = (state = false, action) => {
     case types.LOGIN_SUCCESS:
     case types.SIGNUP_SUCCESS:
       return true
+    case types.LOGOUT:
+      return false
     default:
       return state
   }
```

返回 false 这样，登录态就从根本上被销毁了。

看看本部分达成的效果。用户点退出登录按钮，界面上侧边栏中的登录状态被取消，redux 数据底层维护登录态的 isAuthenticated 状态值也被 false 了。

至此，《退出登录》这部分就胜利完成了。

### 结语

进入最后一部分《结语》。

先来复盘一下本节的思路。整个登录态的心脏就是 isAuthenticated 状态，代码第一步首先添加了它，并且通过 authActions 和 auth reudcer 在适当的时机是设置它。界面层面上，展示组件通过订阅 isAuthenticated ，可以让用户登录前后看到不同的界面内容，这样用户就会对登录态有所感知。最后实现了退出登录功能，实现了对登录态的销毁。

再来看看本节的最终劳动成果。用户登录注册成功，侧边栏显示用户名和退出按钮，点退出按钮，用户可以退出登录。

至此，《控制登录态》这一小节就胜利完成了。