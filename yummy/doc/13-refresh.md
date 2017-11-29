### 持久化登录态

欢迎进入新的小节《持久化登录态》。把用户登录信息保存到硬盘上，主要应对用户刷新网页或者关闭网页重新打开的场景。


### 保存用户机密信息到 localStorage

进入《保存用户机密信息到 localStorage》这个部分。不管是传统的 session 形式，还是比较摩登的 JWT ，持久化登录态的方式都是要把一串信息保存到系统硬盘上。

我们这里采用的形式是，保存用户 id 到 localStorage 中。

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index 59f082c..3504989 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -7,6 +7,7 @@ import { history } from '../utils/routerUtils'
 export const signup = data => dispatch => {
   axios.post(SIGNUP_URL, data).then(res => {
     dispatch({ type: types.SIGNUP_SUCCESS, user: res.data.user })
+    window.localStorage.setItem('userId', res.data.user._id)
     history.push('/dashboard')
   }).catch(err => {
     if (err.response) {
@@ -20,6 +21,7 @@ export const login = data => {
   return dispatch => {
     axios.post(LOGIN_URL, data).then(res => {
       dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
+      window.localStorage.setItem('userId', res.data.user._id)
       history.push('/dashboard')
     }).catch(
       err => {
```



看看本部分达成的效果。执行用户登录或者注册操作，成功后到 chrome 终端中运行

```
 localStorage.getItem('userId')
```

就能看到保存的一串数了。

至此，《保存用户机密信息到 localStorage》这部分就胜利完成了。



### 刷新时加载用户数据

进入《刷新时加载用户数据》这个部分。页面刷新时 redux 中的数据会全部丢失，所以需要用 localStorage 中存储的 userId 去 API 中取用户数据。

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index 3504989..3dfff3f 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -1,5 +1,9 @@
 import axios from 'axios'
-import { LOGIN_URL, SIGNUP_URL } from '../constants/ApiContants'
+import {
+  LOGIN_URL,
+  SIGNUP_URL,
+  USER_BY_ID_URL
+} from '../constants/ApiContants'
 import * as types from '../constants/ActionTypes'
 import { alert } from './commonActions'
 import { history } from '../utils/routerUtils'
@@ -38,3 +42,19 @@ export const logout = () => {
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
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index 7805e49..288b65b 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -7,6 +7,7 @@ export const HIDE_ALERT = 'HIDE_ALERT'
 export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
 export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
 export const LOGOUT = 'LOGOUT'
+export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
 
 // user
 export const RECEIVE_USERS = 'RECEIVE_USERS'
diff --git a/client/src/constants/ApiContants.js b/client/src/constants/ApiContants.js
index 7b772c2..c8fd9a0 100644
--- a/client/src/constants/ApiContants.js
+++ b/client/src/constants/ApiContants.js
@@ -3,3 +3,4 @@ const API_HOSTNAME = '//localhost:3008'
 export const SIGNUP_URL = `${API_HOSTNAME}/user/signup`
 export const LOGIN_URL = `${API_HOSTNAME}/user/login`
 export const USERS_URL = `${API_HOSTNAME}/users`
+export const USER_BY_ID_URL = `${API_HOSTNAME}/user/:id`
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index bdb5436..b52dbe1 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -3,6 +3,7 @@ import HomeContainer from './HomeContainer'
 import '../assets/global.css'
 import LayoutContainer from './LayoutContainer'
 import { fetchUsers } from '../actions/userActions'
+import { fetchCurrentUser } from '../actions/authActions'
 import { connect } from 'react-redux'
 import { Router } from 'react-router'
 import {
@@ -14,6 +15,7 @@ import { history } from '../utils/routerUtils'
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
diff --git a/client/src/reducers/auth.js b/client/src/reducers/auth.js
index 2814403..20fdd73 100644
--- a/client/src/reducers/auth.js
+++ b/client/src/reducers/auth.js
@@ -4,6 +4,7 @@ import { combineReducers } from 'redux'
 const currentUserId = (state = '', action) => {
   switch (action.type) {
     case types.LOGIN_SUCCESS:
+    case types.RECEIVE_CURRENT_USER:
     case types.SIGNUP_SUCCESS:
       return action.user._id
     default:
@@ -14,6 +15,7 @@ const currentUserId = (state = '', action) => {
 const isAuthenticated = (state = false, action) => {
   switch (action.type) {
     case types.LOGIN_SUCCESS:
+    case types.RECEIVE_CURRENT_USER:
     case types.SIGNUP_SUCCESS:
       return true
     case types.LOGOUT:
```


看看本部分达成的效果。登录后刷新页面，可以看到侧边栏上用户依然处于登录状态。

至此，《刷新时加载用户数据》这部分就胜利完成了。









