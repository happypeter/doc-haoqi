# 控制登录态

欢迎来到新的一节《控制登录态》，任务是如何在 redux 数据层面维护用户登录状态，以及如何在界面上体现用户登录状态。

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

顾名思义，用户登录或者注册成功之后他们两位会被触发。

触发它们的位置在 authActions 中


```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index e399ed4..d15fd32 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -1,11 +1,12 @@
 import { SIGNUP_URL, LOGIN_URL } from '../constants/ApiConstants'
 import axios from 'axios'
 import { alert } from './commonActions'
+import * as types from '../constants/ActionTypes'
 import { history } from '../utils/routerUtils'
 export const signup = data => dispatch => {
   axios.post(SIGNUP_URL, data).then(res => {
-    console.log('res', res.data)
+    dispatch({ type: types.SIGNUP_SUCCESS, user: res.data.user })
     history.push('/dashboard')
   }).catch(err => {
     if(err.response) {
@@ -19,7 +20,7 @@ export const signup = data => dispatch => {
 export const login = data => {
   return dispatch => {
     axios.post(LOGIN_URL, data).then(res => {
-      console.log('res', res.data)
+      dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
       history.push('/dashboard')
     }).catch(
       err => {
```

这样，导入一下 action type，注册成功后发出一次，登录成功后也发出一次。

reducer 中接收信号。


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
```

每次收到 LOGIN_SUCCESS 或者 SIGNUP_SUCCESS 之后，把 isAuthenticated 设置为 true 。

rootReducer 中需要导入


```diff
diff --git a/client/src/reducers/index.js b/client/src/reducers/index.js
index 1a9dc40..4151e3e 100644
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
```

新加的这个 auth reducer ，专门负责认证。

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

容器组件中使用 selector 。


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

首先导入 selector 和 connect ，然后 mapStateToProps 中使用 selector 获取 isAuthenticated 的值。


接下来展示组件中使用 isAuthenticated 。

```diff
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index e558f0c..e63d018 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -19,13 +19,14 @@ class Sidebar extends Component {
   render () {
     const { isOpen } = this.state
+    const { isAuthenticated } = this.props
     return (
       <Wrap>
         <Menu
           customCrossIcon={ false }
           isOpen={isOpen}
         >
-            <UserInfo />
+            <UserInfo isAuthenticated={isAuthenticated} />
             <div className="bm-link-list">
               <Link onClick={this.closeMenu} to="/">首页</Link>
               <Link onClick={this.closeMenu} to="/profile">个人中心</Link>
```

首先结构赋值一下拿到 isAuthenticated ，然后传递给 UserInfo 组件使用。

在到 UserInfo 之中，通过使用 isAuthenticated 体现出登录状态。


```diff
diff --git a/client/src/components/SidebarUserInfo.js b/client/src/components/SidebarUserInfo.js
index dce1c49..eee834c 100644
--- a/client/src/components/SidebarUserInfo.js
+++ b/client/src/components/SidebarUserInfo.js
@@ -4,15 +4,18 @@ import Avatar from './Avatar'
 import avatar from '../assets/avatar.png'
 import { Link } from 'react-router-dom'
-const UserInfo = () => (
+const UserInfo = ({ isAuthenticated }) => (
   <Wrap>
     <CenteredAvatar avatar={avatar}  size='100' />
-    <Text>
-      <Name to="/profile" >
-        用户名
-      </Name>
-      <Link to="">退出</Link>
-    </Text>
+    {
+      isAuthenticated &&
+      <Text>
+        <Name to="/profile" >
+          用户名
+        </Name>
+        <Link to="">退出</Link>
+      </Text>
+    }
   </Wrap>
 )
```

参数中结构赋值一下拿到 isAuthenticated ，下面通过 isAuthenticated 是否为 true 来决定要不要显示用户名和退出链接。

看看本部分达成的效果。登录注册成功后，侧边栏中才能看到用户名和退出字样。这样用户从 ui 层面，就能感受到登录态了。

至此，《订阅登录态》这部分就胜利完成了。

### 退出登录

进入《退出登录》这个部分。走一个老套的 redux 流程即可。

先加  Action 类型。

```diff
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index 85df20d..f61314b 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -3,3 +3,4 @@ export const ALERT = 'ALERT'
 export const HIDE_ALERT = 'HIDE_ALERT'
 export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
 export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
++export const LOGOUT = 'LOGOUT'
```

LOGOUT ，登出。

添加 Action 。

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index d15fd32..ca68251 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -33,3 +33,8 @@ export const login = data => {
     )
   }
 }
+
+export const logout = () => {
+  history.push('/')
+  return dispatch => dispatch({ type: types.LOGOUT })
+}
```

发出 action  同时页面跳转到首页。

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

首先导入，然后把 logout 变成一个当前组件的属性传递给展示组件。

展示组件中再把 logout 传递给自己的子组件 。

```diff
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index e63d018..3d8d1be 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -19,14 +19,13 @@ class Sidebar extends Component {
   render () {
     const { isOpen } = this.state
-    const { isAuthenticated } = this.props
     return (
       <Wrap>
         <Menu
           customCrossIcon={ false }
           isOpen={isOpen}
         >
-            <UserInfo isAuthenticated={isAuthenticated} />
+            <UserInfo {...this.props} />
             <div className="bm-link-list">
               <Link onClick={this.closeMenu} to="/">首页</Link>
               <Link onClick={this.closeMenu} to="/profile">个人中心</Link>
```

删除原有的解构赋值，因为这次直接用 ES6 展开运算符把所有的属性都传递给 UserInfo 其中当然同时包含 isAuthenticated 和 logout 。

真正使用 logout 。

```diff
diff --git a/client/src/components/SidebarUserInfo.js b/client/src/components/SidebarUserInfo.js
index eee834c..f3e0545 100644
--- a/client/src/components/SidebarUserInfo.js
+++ b/client/src/components/SidebarUserInfo.js
@@ -4,7 +4,7 @@ import Avatar from './Avatar'
 import avatar from '../assets/avatar.png'
 import { Link } from 'react-router-dom'
-const UserInfo = ({ isAuthenticated }) => (
+const UserInfo = ({ isAuthenticated, logout }) => (
   <Wrap>
     <CenteredAvatar avatar={avatar}  size='100' />
     {
@@ -13,7 +13,7 @@ const UserInfo = ({ isAuthenticated }) => (
         <Name to="/profile" >
           用户名
         </Name>
-        <Link to="">退出</Link>
+        <Link to='#' onClick={logout}>退出</Link>
       </Text>
     }
   </Wrap>
```

首先参数中结构赋值拿到 logou ，然后点退出按钮的时候执行它。注意，页面跳转工作之所以不用 Link 完成，是因为写到 action 中可以应对退出失败等情况，比较灵活。

最关键的一步，reducer 中修改 isAuthenticated 值

```diff
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index f61314b..8d0b4f3 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -3,4 +3,4 @@ export const ALERT = 'ALERT'
 export const HIDE_ALERT = 'HIDE_ALERT'
 export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
 export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
-+export const LOGOUT = 'LOGOUT'
+export const LOGOUT = 'LOGOUT'
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

看看本部分达成的效果。用户点退出登录按钮，界面上侧边栏中的登录状态被取消，redux 数据底层维护登录态的 isAuthenticated 状态值也会设置为 false 了。

至此，《退出登录》这部分就胜利完成了。

### 结语

进入最后一部分《结语》。

先来复盘一下本节的思路。整个登录态的心脏就是 isAuthenticated 状态，代码第一步首先添加了它，并且通过 authActions 和 auth reudcer 在适当的时机是设置它。界面层面上，展示组件通过订阅 isAuthenticated ，可以让用户登录前后看到不同的界面内容，这样用户就会对登录态有所感知。最后实现了退出登录功能，实现了对登录态的销毁。

至此，《控制登录态》这一小节就胜利完成了。