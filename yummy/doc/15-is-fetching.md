# 处理加载状态

欢迎进入新的一节《处理加载状态》。用户执行操作后往往需要去请求网络数据，这时候就有一个数据加载时间，需要显示一个旋转加载图标，这样用户体验才足够好。


首先要到 api 项目中把登录注册接口的响应故意延时一下，设置为4秒后返回。


### 设置加载状态字段

进入《设置加载状态字段》这部分。redux 中添加 auth.isFetching 来记录当前是否处于认证数据加载中的状态。

```
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index befffcd..a023c1e 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -10,12 +10,14 @@ import { getReferrer } from '../selectors/commonSelectors'
 import { history } from '../utils/routerUtils'
 
 export const signup = data => dispatch => {
+  dispatch({ type: types.SIGNUP_REQUEST })
   axios.post(SIGNUP_URL, data).then(res => {
     dispatch({ type: types.SIGNUP_SUCCESS, user: res.data.user })
     window.localStorage.setItem('userId', res.data.user._id)
     history.push('/dashboard')
   }).catch(err => {
     if (err.response) {
+      dispatch({ type: types.SIGNUP_FAILURE })
       const { msg } = err.response.data
       dispatch(alert(msg))
     }
@@ -28,6 +30,7 @@ const clearReferrer = () => ({
 
 export const login = data => {
   return (dispatch, getState) => {
+    dispatch({ type: types.LOGIN_REQUEST })
     axios.post(LOGIN_URL, data).then(res => {
       dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
       window.localStorage.setItem('userId', res.data.user._id)
@@ -39,6 +42,7 @@ export const login = data => {
       err => {
         if (err.response) {
           const { msg } = err.response.data
+          dispatch({ type: types.LOGIN_FAILURE })
           dispatch(alert(msg))
         }
       }
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index aa5b4f7..c8e79ef 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -10,6 +10,10 @@ export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
 export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
 export const LOGOUT = 'LOGOUT'
 export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
+export const LOGIN_REQUEST  = 'LOGIN_REQUEST'
+export const LOGIN_FAILURE  = 'LOGIN_FAILURE'
+export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
+export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
 
 // user
 export const RECEIVE_USERS = 'RECEIVE_USERS'
diff --git a/client/src/reducers/auth.js b/client/src/reducers/auth.js
index 20fdd73..4e6af40 100644
--- a/client/src/reducers/auth.js
+++ b/client/src/reducers/auth.js
@@ -25,7 +25,24 @@ const isAuthenticated = (state = false, action) => {
   }
 }
 
+const isFetching = (state = false, action) => {
+  switch (action.type) {
+    case types.LOGIN_REQUEST:
+    case types.SIGNUP_REQUEST:
+      return true
+    case types.LOGIN_SUCCESS:
+    case types.RECEIVE_CURRENT_USER:
+    case types.SIGNUP_SUCCESS:
+    case types.LOGIN_FAILURE:
+    case types.SIGNUP_FAILURE:
+      return false
+    default:
+      return state
+  }
+}
+
 export default combineReducers({
   isAuthenticated,
-  currentUserId
+  currentUserId,
+  isFetching
 })
```

看看这部分达成的效果。登录或者注册过程开始，终端中可以看到 isFetching 会被设置为 true ，随后不管操作成功或者是失败 isFetching 都会变为 false 。这正是我们需要的效果。

至此，《设置加载状态字段》这部分就胜利完成。


### 添加 Spinner

进入《添加 Spinner》这个部分。只要处于加载状态，也就是 isFetching 为 true 的这段时间，我们就让页面上显示一个 Spinner ，也就是旋转加载图标 。


```diff
diff --git a/client/src/assets/global.css b/client/src/assets/global.css
index 97ce458..9a81f06 100644
--- a/client/src/assets/global.css
+++ b/client/src/assets/global.css
@@ -1,3 +1,5 @@
+@import '~react-spinner/react-spinner.css';
+
 body {
   margin: 0;
 }
diff --git a/client/src/components/Login.js b/client/src/components/Login.js
index 8ae5157..14c5223 100644
--- a/client/src/components/Login.js
+++ b/client/src/components/Login.js
@@ -1,6 +1,13 @@
 import React, { Component } from 'react'
 import { loginConfig } from '../constants/FormConfig'
 import Form from './Form'
+import Spinner from 'react-spinner'
+import styled from 'styled-components'
+import PropTypes from 'prop-types'
+
+const propTypes = {
+  isFetching: PropTypes.bool
+}
 
 class Login extends Component {
   componentDidMount () {
@@ -9,13 +16,25 @@ class Login extends Component {
   }
 
   render () {
+    const { isFetching } = this.props
     return (
-      <Form
-        config={loginConfig}
-        onFormSubmit={this.props.login}
-      />
+      <Wrap>
+        {
+          isFetching ? <Spinner /> :
+          <Form
+            config={loginConfig}
+            onFormSubmit={this.props.login}
+          />
+        }
+      </Wrap>
     )
   }
 }
 
+Login.propTypes = propTypes
+
 export default Login
+
+const Wrap = styled.div`
+  height: 100%;
+`
diff --git a/client/src/containers/LoginContainer.js b/client/src/containers/LoginContainer.js
index 8fa7418..a0cdaf4 100644
--- a/client/src/containers/LoginContainer.js
+++ b/client/src/containers/LoginContainer.js
@@ -2,11 +2,15 @@ import React from 'react'
 import Login from '../components/Login'
 import { setTitle, setReferrerIfNeeded } from '../actions/commonActions'
 import { login } from '../actions/authActions'
+import { getIsAuthFetching } from '../selectors/authSelectors'
 import { connect } from 'react-redux'
 
 const LoginContainer = props => <Login {...props} />
 
-export default connect(null, {
+const mapStateToProps = state => ({
+  isFetching: getIsAuthFetching(state)
+})
+export default connect(mapStateToProps, {
   setTitle,
   login,
   setReferrerIfNeeded
diff --git a/client/src/selectors/authSelectors.js b/client/src/selectors/authSelectors.js
index 7b4b01a..4394afa 100644
--- a/client/src/selectors/authSelectors.js
+++ b/client/src/selectors/authSelectors.js
@@ -10,3 +10,4 @@ export const getCurrentUser = createSelector(
 )
 
 export const getIsAuthenticated = state => state.auth.isAuthenticated
+export const getIsAuthFetching = state => state.auth.isFetching
```

看看本部分达成的效果。登录的时候，不管输入信息是否正确，都能显示加载图标。

至此，《添加 Spinner》这部分就胜利完成了。