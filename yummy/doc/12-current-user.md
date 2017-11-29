# 管理当前用户信息


### redux 中存储当前用户

进入《redux 中存储当前用户》这个部分。用一个新的状态 auth.currentUserId 存储当前用户的 id 。

先来存储当前用户的 id 

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index 3ad409b..59f082c 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -6,7 +6,7 @@ import { history } from '../utils/routerUtils'
 
 export const signup = data => dispatch => {
   axios.post(SIGNUP_URL, data).then(res => {
-    dispatch({ type: types.SIGNUP_SUCCESS })
+    dispatch({ type: types.SIGNUP_SUCCESS, user: res.data.user })
     history.push('/dashboard')
   }).catch(err => {
     if (err.response) {
@@ -19,7 +19,7 @@ export const signup = data => dispatch => {
 export const login = data => {
   return dispatch => {
     axios.post(LOGIN_URL, data).then(res => {
-      dispatch({ type: types.LOGIN_SUCCESS })
+      dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
       history.push('/dashboard')
     }).catch(
       err => {
diff --git a/client/src/reducers/auth.js b/client/src/reducers/auth.js
index e7fa118..2814403 100644
--- a/client/src/reducers/auth.js
+++ b/client/src/reducers/auth.js
@@ -1,6 +1,16 @@
 import * as types from '../constants/ActionTypes'
 import { combineReducers } from 'redux'
 
+const currentUserId = (state = '', action) => {
+  switch (action.type) {
+    case types.LOGIN_SUCCESS:
+    case types.SIGNUP_SUCCESS:
+      return action.user._id
+    default:
+      return state
+  }
+}
+
 const isAuthenticated = (state = false, action) => {
   switch (action.type) {
     case types.LOGIN_SUCCESS:
@@ -14,5 +24,6 @@ const isAuthenticated = (state = false, action) => {
 }
 
 export default combineReducers({
-  isAuthenticated
+  isAuthenticated,
+  currentUserId
 })
```

登录和注册成功后服务器端都会返回当前用户信息的，直接存储到状态树中即可。

看看本部分达成的效果。登录或者注册成功后，redux-logger 就会打印出 Action 执行的信息。可以看到当前用户的 id 已经被保存到到了 auth.currentUserId 中了。

至此，《redux 中存储当前用户》这部分就胜利完成了。

### 保存所有用户信息

进入《保存所有用户信息》这个部分。前面已经存储了当前用户 id ，但是如果我想要当前用户的用户名或者其他信息呢，就要去所有用户信息中去找了。

到 Postman 中先调试一下 API 。发起请求

```
GET localhost:3008/users
```

服务器端会返回包含用户名和用户 id 的所有用户信息。

```diff
diff --git a/client/src/actions/userActions.js b/client/src/actions/userActions.js
new file mode 100644
index 0000000..764432a
--- /dev/null
+++ b/client/src/actions/userActions.js
@@ -0,0 +1,16 @@
+import * as types from '../constants/ActionTypes'
+import axios from 'axios'
+import { USERS_URL } from '../constants/ApiContants'
+
+export const receiveUsers = users => ({
+  type: types.RECEIVE_USERS,
+  users
+})
+
+export const fetchUsers = () => dispatch => {
+  axios.get(USERS_URL).then(
+    res => {
+      dispatch(receiveUsers(res.data.users))
+    }
+  )
+}
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index 4e6a16e..7805e49 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -7,3 +7,6 @@ export const HIDE_ALERT = 'HIDE_ALERT'
 export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
 export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
 export const LOGOUT = 'LOGOUT'
+
+// user
+export const RECEIVE_USERS = 'RECEIVE_USERS'
diff --git a/client/src/constants/ApiContants.js b/client/src/constants/ApiContants.js
index eddf76e..7b772c2 100644
--- a/client/src/constants/ApiContants.js
+++ b/client/src/constants/ApiContants.js
@@ -2,3 +2,4 @@ const API_HOSTNAME = '//localhost:3008'
 
 export const SIGNUP_URL = `${API_HOSTNAME}/user/signup`
 export const LOGIN_URL = `${API_HOSTNAME}/user/login`
+export const USERS_URL = `${API_HOSTNAME}/users`
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index bc421cc..bdb5436 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -2,6 +2,8 @@ import React, { Component } from 'react'
 import HomeContainer from './HomeContainer'
 import '../assets/global.css'
 import LayoutContainer from './LayoutContainer'
+import { fetchUsers } from '../actions/userActions'
+import { connect } from 'react-redux'
 import { Router } from 'react-router'
 import {
   Switch,
@@ -10,6 +12,10 @@ import {
 import { history } from '../utils/routerUtils'
 
 class App extends Component {
+  componentDidMount () {
+    this.props.fetchUsers()
+  }
+
   render () {
     return (
       <Router history={history}>
@@ -22,4 +28,6 @@ class App extends Component {
   }
 }
 
-export default App
+export default connect(null, {
+  fetchUsers
+})(App)
diff --git a/client/src/reducers/index.js b/client/src/reducers/index.js
index 9696d61..1aac7c8 100644
--- a/client/src/reducers/index.js
+++ b/client/src/reducers/index.js
@@ -1,10 +1,12 @@
 import { combineReducers } from 'redux'
 import common from './common'
 import auth from './auth'
+import user from './user'
 
 const rootReducer = combineReducers({
   common,
-  auth
+  auth,
+  user
 })
 
 export default rootReducer
diff --git a/client/src/reducers/user.js b/client/src/reducers/user.js
new file mode 100644
index 0000000..8318164
--- /dev/null
+++ b/client/src/reducers/user.js
@@ -0,0 +1,15 @@
+import * as types from '../constants/ActionTypes'
+import { combineReducers } from 'redux'
+
+const all = (state = [], action) => {
+  switch (action.type) {
+    case types.RECEIVE_USERS:
+      return action.users
+    default:
+      return state
+  }
+}
+
+export default combineReducers({
+  all
+})
```




看看本部分达成的效果。刷新页面，redux-logger 中的信息会打印出来。可以看到所有用户的信息已经保存到 user.all 状态中了。

至此，《保存所有用户信息》这部分就胜利完成了。

### Reselect 获取派生数据

进入《Reselect 获取派生数据》这个部分。保存数据的原则是要有 Single Source Of Truth ，唯一可信数据源。所以 redux 中不建议保存冗余信息，例如保存当前用户 id 和所有用户信息即可，那么当前用户信息，作为派生出来的数据，可以直接到 selector 中去运算获得，为了避免重复运算造成的资源浪费，所以才有 [reselect](https://github.com/reactjs/reselect) 来进行数据缓存。

首先来装包

```
npm i reselect
```

包就装好了。


```diff
diff --git a/client/src/components/SidebarUserInfo.js b/client/src/components/SidebarUserInfo.js
index d02f539..bfc8567 100644
--- a/client/src/components/SidebarUserInfo.js
+++ b/client/src/components/SidebarUserInfo.js
@@ -7,17 +7,18 @@ import PropTypes from 'prop-types'
 
 const propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
-  logout: PropTypes.func.isRequired
+  logout: PropTypes.func.isRequired,
+  currentUser: PropTypes.object.isRequired
 }
 
-const UserInfo = ({ isAuthenticated, logout }) => (
+const UserInfo = ({ isAuthenticated, logout, currentUser }) => (
   <Wrap>
     <CenteredAvatar avatar={avatar} size='100' />
     {
       isAuthenticated &&
       <Text>
         <Name to='/profile' >
-          用户名
+          { currentUser.username }
         </Name>
         <Link to='#' onClick={logout}>退出</Link>
       </Text>
diff --git a/client/src/containers/SidebarContainer.js b/client/src/containers/SidebarContainer.js
index 183bf79..b032567 100644
--- a/client/src/containers/SidebarContainer.js
+++ b/client/src/containers/SidebarContainer.js
@@ -1,13 +1,14 @@
 import React from 'react'
 import Sidebar from '../components/Sidebar'
-import { getIsAuthenticated } from '../selectors/authSelectors'
+import { getIsAuthenticated, getCurrentUser } from '../selectors/authSelectors'
 import { logout } from '../actions/authActions'
 import { connect } from 'react-redux'
 
 const SidebarContainer = props => <Sidebar {...props} />
 
 const mapStateToProps = state => ({
-  isAuthenticated: getIsAuthenticated(state)
+  isAuthenticated: getIsAuthenticated(state),
+  currentUser: getCurrentUser(state)
 })
 
 export default connect(mapStateToProps, {
diff --git a/client/src/selectors/authSelectors.js b/client/src/selectors/authSelectors.js
index 0ade86c..7b4b01a 100644
--- a/client/src/selectors/authSelectors.js
+++ b/client/src/selectors/authSelectors.js
@@ -1 +1,12 @@
+import { createSelector } from 'reselect'
+import { getUsersById } from './userSelectors'
+
+export const getCurrentUserId = state => state.auth.currentUserId
+
+export const getCurrentUser = createSelector(
+  getUsersById,
+  getCurrentUserId,
+  (users, currentUserId) => users[currentUserId] || {}
+)
+
 export const getIsAuthenticated = state => state.auth.isAuthenticated
diff --git a/client/src/selectors/userSelectors.js b/client/src/selectors/userSelectors.js
new file mode 100644
index 0000000..2be0665
--- /dev/null
+++ b/client/src/selectors/userSelectors.js
@@ -0,0 +1,11 @@
+import { createSelector } from 'reselect'
+
+export const getUsers = state => state.user.all
+
+export const getUsersById = createSelector(
+  getUsers,
+  users => users.reduce((obj, user) => {
+    obj[user._id] = user
+    return obj
+  }, {})
+)
```


看看本部分达成的效果。
至此，《Reselect 获取派生数据》这部分就胜利完成了。

### 应对页面刷新

进入《应对页面刷新》这个部分。
看看本部分达成的效果。
至此，《应对页面刷新》这部分就胜利完成了。