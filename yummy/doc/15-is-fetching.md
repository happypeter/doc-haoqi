# 处理加载状态

欢迎进入新的一节《处理加载状态》。用户执行操作后往往需要去请求网络数据，这时候就有一个数据加载时间，需要显示一个旋转加载图标，这样用户体验才足够好。

下面来把代码回滚到上一节结束时的状态，分多个部分详细拆解一下如何达成最终效果。

### 设置加载状态字段

进入《设置加载状态字段》这部分。redux 中添加 auth.isFetching 来记录当前是否处于认证数据加载中的状态。

首先要到 api 项目中把登录注册接口的响应故意延时一下，设置为4秒后返回。

先添加 Action 类型定义

```diff
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index 109eddb..2da22a9 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -8,3 +8,8 @@ export const RECEIVE_USERS = 'RECEIVE_USERS'
 export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
 export const SET_REFERRER = 'SET_REFERRER'
 export const CLEAR_REFERRER = 'CLEAR_REFERRER'
+
+export const LOGIN_REQUEST  = 'LOGIN_REQUEST'
+export const LOGIN_FAILURE  = 'LOGIN_FAILURE'
+export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
+export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
```

LOGIN_REQUEST 和 SIGNUP_REQUEST 用来记录异步请求发起之前的那一瞬间，也就是加载过程的开始时间点，下划线 FAILURE 和之前我们定义过的下划线 SUCCESS 对应的这些 action 都是加载过程的结束时间点，各自表征因为请求成功而停止或者请求失败而停止。


再来添加 isFetching 对应的 reducer

```diff
diff --git a/client/src/reducers/auth.js b/client/src/reducers/auth.js
index 30d7afa..207bc5a 100644
--- a/client/src/reducers/auth.js
+++ b/client/src/reducers/auth.js
@@ -25,7 +25,24 @@ const currentUserId = (state = '', action) => {
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

其实这个思路在上一步就都梳理清楚了。


再来看这些类型的 action 都在何时发出。

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index 6981bb9..03fc260 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -10,12 +10,14 @@ import * as types from '../constants/ActionTypes'
 import { history } from '../utils/routerUtils'
 export const signup = data => dispatch => {
+  dispatch({ type: types.SIGNUP_REQUEST })
   axios.post(SIGNUP_URL, data).then(res => {
     dispatch({ type: types.SIGNUP_SUCCESS, user: res.data.user })
     window.localStorage.setItem('userId', res.data.user._id)
     history.push('/dashboard')
   }).catch(err => {
     if(err.response) {
+      dispatch({ type: types.SIGNUP_FAILURE })
       const { msg } = err.response.data
       console.log(msg)
       dispatch(alert(msg))
@@ -29,16 +31,18 @@ const clearReferrer = () => ({
 export const login = data => {
   return (dispatch, getState) => {
+    dispatch({ type: types.LOGIN_REQUEST })
     axios.post(LOGIN_URL, data).then(res => {
       dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
       window.localStorage.setItem('userId', res.data.user._id)
       const referrer = getReferrer(getState())
-      dispatch(clearReferrer())
+      referrer && dispatch(clearReferrer())
       const redirectTo = referrer || '/dashboard'
       history.push(redirectTo)
     }).catch(
       err => {
         if(err.response){
+          dispatch({ type: types.LOGIN_FAILURE })
           const { msg } = err.response.data
           console.log(msg)
           dispatch(alert(msg))
```

注册请求发起前，发出 LOGIN_REQUEST ，请求成功，发出 LOGIN_SUCCESS ，请求失败，发出 LOGIN_FAILURE 。

看看这部分达成的效果。登录或者注册过程开始，终端中可以看到 isFetching 会被设置为 true ，随后不管操作成功或者是失败 isFetching 都会变为 false 。这正是我们需要的效果。

至此，《设置加载状态字段》这部分就胜利完成。


### 添加 Spinner

进入《添加 Spinner》这个部分。只要处于加载状态，也就是 isFetching 为 true 的这段时间，我们就让页面上显示一个 Spinner ，也就是旋转加载图标 。

先来装包。

```
npm i react-spinner
```

react 的风火轮效果。


首先要加载 css 。

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
```

导入一些全局的内容进来，总觉得脏兮兮的。


要拿到 isFetching 数据，首先来定义 selector

```diff
diff --git a/client/src/selectors/authSelectors.js b/client/src/selectors/authSelectors.js
index 7b4b01a..4394afa 100644
--- a/client/src/selectors/authSelectors.js
+++ b/client/src/selectors/authSelectors.js
@@ -10,3 +10,4 @@ export const getCurrentUser = createSelector(
 )
 export const getIsAuthenticated = state => state.auth.isAuthenticated
+export const getIsAuthFetching = state => state.auth.isFetching
```

因为其他资源也有可能设置 isFetching 状态，所以这里名字叫  getAuthIsFetching  。


容器组件中读取 isFetching


```diff
diff --git a/client/src/containers/LoginContainer.js b/client/src/containers/LoginContainer.js
index 86eae9e..316bf92 100644
--- a/client/src/containers/LoginContainer.js
+++ b/client/src/containers/LoginContainer.js
@@ -1,12 +1,17 @@
 import React from 'react'
 import Login from '../components/Login'
 import { setTitle, setReferrerIfNeeded } from '../actions/commonActions'
+import { getIsAuthFetching } from '../selectors/authSelectors'
 import { connect } from 'react-redux'
 import { login } from '../actions/authActions'
 const LoginContainer = props => <Login {...props} />
-export default connect(null, {
+const mapStateToProps = state => ({
+  isFetching: getIsAuthFetching(state)
+})
+
+export default connect(mapStateToProps, {
   setTitle,
   login,
   setReferrerIfNeeded
```

传递给展示组件。

展示组件中去使用。

```diff
diff --git a/client/src/components/Login.js b/client/src/components/Login.js
index 8ae5157..3c6119c 100644
--- a/client/src/components/Login.js
+++ b/client/src/components/Login.js
@@ -1,6 +1,8 @@
 import React, { Component } from 'react'
 import { loginConfig } from '../constants/FormConfig'
 import Form from './Form'
+import Spinner from 'react-spinner'
+import styled from 'styled-components'
 class Login extends Component {
   componentDidMount () {
@@ -9,13 +11,23 @@ class Login extends Component {
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
 export default Login
+
+const Wrap = styled.div`
+  height: 100%;
+`
diff --git a/happy-api-starter-1.0.0/controllers/user.js b/happy-api-starter-1.0.0/controllers/user.js
index d40809f..9c796d7 100755
--- a/happy-api-starter-1.0.0/controllers/user.js
+++ b/happy-api-starter-1.0.0/controllers/user.js
@@ -47,7 +47,7 @@ exports.login = (req, res) => {
                 username: user.username
               },
               msg: '登录成功'
-            }), 400)
+            }), 4000)
           } else {
             res.status(401).json({msg: '密码错误，请核对后重试'})
           }
```

看看本部分达成的效果。登录的时候，不管输入信息是否正确，都能显示加载图标。

至此，《添加 Spinner》这部分就胜利完成了。


### 结语

进入最后一部分《结语》。

复盘一下本节思路。首先先从数据底层用 isFetching 来体现价值持续时间，界面层面上使用了一个加载风火轮来体现加载过程。

至此《处理加载状态》这个小节就胜利完成了。

同时咱们的这门课《React 社交化电商--架构篇》也结束了，基本的技术思路确定了，只为能撑住大量实用功能的开发，欢迎大家光临本课程的续集《 React 社交化电商--功能篇》。好的，我是 Peter ，下一门课程中，咱们再见！