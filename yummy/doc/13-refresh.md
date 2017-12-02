### 持久化登录态

欢迎进入新的小节《持久化登录态》。把用户登录信息保存到硬盘上，主要应对用户刷新网页或者关闭网页重新打开的场景。

### 保存用户机密信息到 localStorage

进入《保存用户机密信息到 localStorage》这个部分。不管是传统的 session 形式，还是比较摩登的 JWT ，持久化登录态的方式都是要把一串信息保存到系统硬盘上。

我们这里采用的形式是，保存用户 id 到 localStorage 中。

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index ca68251..58806ac 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -7,6 +7,7 @@ import { history } from '../utils/routerUtils'
 export const signup = data => dispatch => {
   axios.post(SIGNUP_URL, data).then(res => {
     dispatch({ type: types.SIGNUP_SUCCESS, user: res.data.user })
+    window.localStorage.setItem('userId', res.data.user._id)
     history.push('/dashboard')
   }).catch(err => {
     if(err.response) {
@@ -21,6 +22,7 @@ export const login = data => {
   return dispatch => {
     axios.post(LOGIN_URL, data).then(res => {
       dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
+      window.localStorage.setItem('userId', res.data.user._id)
       history.push('/dashboard')
     }).catch(
       err => {
diff --git a/client/src/constants/ApiConstants.js b/client/src/constants/ApiConstants.js
index 7b772c2..c8fd9a0 100644
--- a/client/src/constants/ApiConstants.js
+++ b/client/src/constants/ApiConstants.js
@@ -3,3 +3,4 @@ const API_HOSTNAME = '//localhost:3008'
 export const SIGNUP_URL = `${API_HOSTNAME}/user/signup`
 export const LOGIN_URL = `${API_HOSTNAME}/user/login`
 export const USERS_URL = `${API_HOSTNAME}/users`
+export const USER_BY_ID_URL = `${API_HOSTNAME}/user/:id`
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

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index ca68251..58806ac 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -7,6 +7,7 @@ import { history } from '../utils/routerUtils'
 export const signup = data => dispatch => {
   axios.post(SIGNUP_URL, data).then(res => {
     dispatch({ type: types.SIGNUP_SUCCESS, user: res.data.user })
+    window.localStorage.setItem('userId', res.data.user._id)
     history.push('/dashboard')
   }).catch(err => {
     if(err.response) {
@@ -21,6 +22,7 @@ export const login = data => {
   return dispatch => {
     axios.post(LOGIN_URL, data).then(res => {
       dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
+      window.localStorage.setItem('userId', res.data.user._id)
       history.push('/dashboard')
     }).catch(
       err => {
diff --git a/client/src/constants/ApiConstants.js b/client/src/constants/ApiConstants.js
index 7b772c2..c8fd9a0 100644
--- a/client/src/constants/ApiConstants.js
+++ b/client/src/constants/ApiConstants.js
@@ -3,3 +3,4 @@ const API_HOSTNAME = '//localhost:3008'
 export const SIGNUP_URL = `${API_HOSTNAME}/user/signup`
 export const LOGIN_URL = `${API_HOSTNAME}/user/login`
 export const USERS_URL = `${API_HOSTNAME}/users`
+export const USER_BY_ID_URL = `${API_HOSTNAME}/user/:id`
```

根据用户 id 获取这位用户的详情。

接下来定义 Action 类型。


```diff
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index ceade81..bb81170 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -5,3 +5,4 @@ export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
 export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
 export const LOGOUT = 'LOGOUT'
 export const RECEIVE_USERS = 'RECEIVE_USERS'
+export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
```

接受当前用户的详情。


接下来定义 action 创建器。

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index 58806ac..ab310f5 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -1,4 +1,8 @@
-import { SIGNUP_URL, LOGIN_URL } from '../constants/ApiConstants'
+import {
+  LOGIN_URL,
+  SIGNUP_URL,
+  USER_BY_ID_URL
+} from '../constants/ApiContants'
 import axios from 'axios'
 import { alert } from './commonActions'
 import * as types from '../constants/ActionTypes'
@@ -40,3 +44,19 @@ export const logout = () => {
   history.push('/')
   return dispatch => dispatch({ type: types.LOGOUT })
 }
+
+const receiveCurrentUser = user => ({
+  type: types.RECEIVE_CURRENT_USER,
+  user
+})
+
+export const fetchCurrentUser = () => dispatch => {
+  const id = window.localStorage.getItem('userId')
+  if (id) {
+    axios.get(USER_BY_ID_URL.replace(':id', id)).then(
+      res => {
+        dispatch(receiveCurrentUser(res.data.user))
+      }
+    )
+  }
+}
```

首先导入 API 链接，然后定义 fetchCurrentUser 这个 action ，其中首先要拿到本地存储的 id ，然后发送到服务器上获取当前用户的信息，然后发起 receive current user 这个 Action 。


reducer 中要做修改。

```diff
diff --git a/client/src/reducers/auth.js b/client/src/reducers/auth.js
index da48818..30d7afa 100644
--- a/client/src/reducers/auth.js
+++ b/client/src/reducers/auth.js
@@ -5,6 +5,7 @@ const isAuthenticated = (state = false, action) => {
   switch (action.type) {
     case types.LOGIN_SUCCESS:
     case types.SIGNUP_SUCCESS:
+    case types.RECEIVE_CURRENT_USER:
       return true
     case types.LOGOUT:
       return false
@@ -17,6 +18,7 @@ const currentUserId = (state = '', action) => {
   switch (action.type) {
     case types.LOGIN_SUCCESS:
     case types.SIGNUP_SUCCESS:
+    case types.RECEIVE_CURRENT_USER:
       return action.user._id
     default:
       return state
```

两个任务，第一个把表征登录状态的 isAuthenticated 设置为 true ，第二个保存当前用户的 id 。

最后要解决的是，页面刷新时，执行刚刚定义的 action 。







```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index ab310f5..629784b 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -2,7 +2,7 @@ import {
   LOGIN_URL,
   SIGNUP_URL,
   USER_BY_ID_URL
-} from '../constants/ApiContants'
+} from '../constants/ApiConstants'
 import axios from 'axios'
 import { alert } from './commonActions'
 import * as types from '../constants/ActionTypes'
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index ddd6a3e..14154d8 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -1,6 +1,7 @@
 import React, { Component } from 'react'
 import '../assets/global.css'
 import HomeContainer from './HomeContainer'
+import { fetchCurrentUser } from '../actions/authActions'
 import LayoutContainer from './LayoutContainer'
 import { fetchUsers } from '../actions/userActions'
 import { connect } from 'react-redux'
@@ -14,6 +15,7 @@ import {
 class App extends Component {
   componentDidMount () {
     this.props.fetchUsers()
+    this.props.fetchCurrentUser()
   }
   render () {
@@ -29,5 +31,6 @@ class App extends Component {
 }
 export default connect(null, {
-  fetchUsers
+  fetchUsers,
+  fetchCurrentUser
 })(App)
```

App 组件加载后执行。

看看本部分达成的效果。登录后刷新页面，可以看到侧边栏上用户依然处于登录状态。

至此，《刷新时加载用户数据》这部分就胜利完成了。

### 结语

进入最后一部分《结语》。

先来复盘一下本节的思路。为了持久化登录态，用户登录成功后，程序会自动把一串服务器发送过来的秘钥，本节采用的是 userId ，保存到硬盘上，这里我们采用的媒介是 localStorage 。页面刷新后，内存中的信息都丢失了，但是 userId 会被自动发送到服务器端，取回当前用户的信息，这样界面上用户依然保持了登录状态。

至此，《持久化登录态》这一小节就胜利完成了。qqqq