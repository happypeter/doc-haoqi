### 请求 API 实现登录注册

欢迎进入新的小节 《请求 API 实现登录注册》。用代码，而不是 postman 来请求 API 。

### Action 中使用 axios

进入《 Action 中使用 axios》这部分。先来请求注册接口。

安装 axios 。

```
npm i axios
```

这样代码中就能用了。

请求之前，先把 API 链接添加到常量文件中。

```diff
diff --git a/client/src/constants/ApiConstants.js b/client/src/constants/ApiConstants.js
new file mode 100644
index 0000000..e517f7c
--- /dev/null
+++ b/client/src/constants/ApiConstants.js
@@ -0,0 +1,3 @@
+const API_HOSTNAME = '//localhost:3008'
+
+export const SIGNUP_URL = `${API_HOSTNAME}/user/signup`
```

写到一个地方，随时复用，方便多多。

创建一个 Action 文件 authActions.js ，里面添加注册对应的 action 。

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
new file mode 100644
index 0000000..98b51a1
--- /dev/null
+++ b/client/src/actions/authActions.js
@@ -0,0 +1,10 @@
+import axios from 'axios'
+import { SIGNUP_URL } from '../constants/ApiContants'
+
+export const signup = data => dispatch => {
+  axios.post(SIGNUP_URL, data).then(res => {
+    console.log('res', res.data)
+  }).catch(err => {
+    if(err.response) {
+      const { msg } = err.response.data
+      console.log(msg)
+    }
+  })
+}
```

打印服务器返回的成功或者报错信息。

来使用 signup 这个函数，先到容器组件中导入

```diff
diff --git a/client/src/containers/SignupContainer.js b/client/src/containers/SignupContainer.js
index c7403d0..24d4395 100644
--- a/client/src/containers/SignupContainer.js
+++ b/client/src/containers/SignupContainer.js
@@ -2,9 +2,11 @@ import React from 'react'
 import Signup from '../components/Signup'
 import { setTitle } from '../actions/commonActions'
 import { connect } from 'react-redux'
+import { signup } from '../actions/authActions'
 
 const SignupContainer = props => <Signup {...props} />
 
 export default connect(null, {
-  setTitle
+  setTitle,
+  signup
 })(SignupContainer)
```

传递给展示组件。

展示组件中继续传递。

```diff
diff --git a/client/src/components/Signup.js b/client/src/components/Signup.js
index 3a028f1..7c1fd17 100644
--- a/client/src/components/Signup.js
+++ b/client/src/components/Signup.js
@@ -9,7 +9,10 @@ class Signup extends Component {
 
   render () {
     return (
-      <Form config={signupConfig} />
+      <Form
+        config={signupConfig}
+        onFormSubmit={this.props.signup}
+      />
     )
   }
 }
```

交给 Form 组件去处理。

Form 组件中。

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index 76cfa04..c4b7b63 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -23,7 +23,7 @@ class Form extends Component {
       obj[t.name] = this.state[t.name]
       return obj
     }, {})
-    console.log('data', data)
+    this.props.onFormSubmit(data)
   }
 
   render() {
```

用户点注册按钮的时候，执行这个函数。

来看看本部分的劳动成果。到注册页面，填写用户名密码，注册成功然后重复注册，终端会显示出成和失败信息。

至此，《 Action 中使用 axios》这部分就胜利完成了。

### 调通登录功能

进入下一部分《调通登录功能》。思路跟前一部分完全一样。

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index 58434ee..b737787 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -1,4 +1,4 @@
-import { SIGNUP_URL } from '../constants'
+import { SIGNUP_URL, LOGIN_URL } from '../constants/ApiConstants'
 import axios from 'axios'
 
 export const signup = data => dispatch => {
@@ -11,3 +11,18 @@ export const signup = data => dispatch => {
     }
   })
 }
+
+export const login = data => {
+  return dispatch => {
+    axios.post(LOGIN_URL, data).then(res => {
+      console.log('res', res.data)
+    }).catch(
+      err => {
+        if(err.response){
+          const { msg } = err.response.data
+          console.log(msg)
+        }
+      }
+    )
+  }
+}
diff --git a/client/src/components/Login.js b/client/src/components/Login.js
index ff79b4c..fd0de94 100644
--- a/client/src/components/Login.js
+++ b/client/src/components/Login.js
@@ -6,10 +6,13 @@ class Login extends Component {
   componentDidMount () {
     this.props.setTitle('登录')
   }
-  
+
   render () {
     return (
-      <Form config={loginConfig} />
+      <Form
+        config={loginConfig}
+        onFormSubmit={this.props.login}
+      />
     )
   }
 }
diff --git a/client/src/constants/ApiConstants.js b/client/src/constants/ApiConstants.js
index e517f7c..eddf76e 100644
--- a/client/src/constants/ApiConstants.js
+++ b/client/src/constants/ApiConstants.js
@@ -1,3 +1,4 @@
 const API_HOSTNAME = '//localhost:3008'
 
 export const SIGNUP_URL = `${API_HOSTNAME}/user/signup`
+export const LOGIN_URL = `${API_HOSTNAME}/user/login`
diff --git a/client/src/containers/LoginContainer.js b/client/src/containers/LoginContainer.js
index 6d8b399..0205759 100644
--- a/client/src/containers/LoginContainer.js
+++ b/client/src/containers/LoginContainer.js
@@ -2,9 +2,11 @@ import React from 'react'
 import Login from '../components/Login'
 import { setTitle } from '../actions/commonActions'
 import { connect } from 'react-redux'
+import { login } from '../actions/authActions'
 
 const LoginContainer = props => <Login {...props} />
 
 export default connect(null, {
-  setTitle
+  setTitle,
+  login
 })(LoginContainer)
```

这回界面中就能请求登录接口了。

开一下这部分的劳动成果。登录页面上分别输入正确的用户名密码，然后改用错用户名，再改用错密码。可以看到这三种情况都有各自的返回信息。

至此，《调通登录功能》这部分就胜利完成了。


### 实现页面跳转

进入下一部分《实现页面跳转》。注册和登录成功后，需要自动跳转到操作盘页面，主要一个技巧就是在 Action 文件中获得 history 对象。

要在 Action 创建器中使用 history 对象，需要把 React-router 的代码稍微改一下，因为 React-router 默认使用自己内置的 history ，而 action 文件不在  react-router 的包裹范围内，所以用不了这个 history 。所以需要来定义一个全局的 history 文件。

```diff
diff --git a/client/src/utils/routerUtils.js b/client/src/utils/routerUtils.js
new file mode 100644
index 0000000..96dc48a
--- /dev/null
+++ b/client/src/utils/routerUtils.js
@@ -0,0 +1,3 @@
+import createBrowserHistory from 'history/createBrowserHistory'
+
+export const history = createBrowserHistory()
```

然后在各个地方都使用这个 history ，就能实现导航了。

接下来， Router 中使用这个专门创建的 history 。


```diff
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index 9cbb500..6c36bde 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -2,8 +2,9 @@ import React, { Component } from 'react'
 import '../assets/global.css'
 import HomeContainer from './HomeContainer'
 import LayoutContainer from './LayoutContainer'
+import { Router } from 'react-router'
+import { history } from '../utils/routerUtils'
 import {
-  BrowserRouter as Router,
   Switch,
   Route
 } from 'react-router-dom'
@@ -11,7 +12,7 @@ import {
 class App extends Component {
   render () {
     return (
-      <Router>
+      <Router history={history} >
         <Switch>
           <Route exact path='/' component={HomeContainer} />
           <Route component={LayoutContainer} />
```

如果仅仅到这里，那么 React-router 的工作效果跟之前没有区别。

关键的区别在于，现在我就可以在任意的位置去引用这个 history 改变浏览器中的页面路径了。


```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index 05229d5..562b529 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -1,9 +1,11 @@
 import axios from 'axios'
 import { LOGIN_URL, SIGNUP_URL } from '../constants/ApiContants'
+import { history } from '../utils/routerUtils'
 
 export const signup = data => dispatch => {
   axios.post(SIGNUP_URL, data).then(res => {
     console.log('res', res.data)
+    history.push('/dashboard')
   }).catch(err => {
     if(err.response) {
       const { msg } = err.response.data
@@ -17,6 +19,7 @@ export const login = data => {
   return dispatch => {
     axios.post(LOGIN_URL, data).then(res => {
       console.log('res', res.data)
+      history.push('/dashboard')
     }).catch(
       err => {
         if(err.response){
```

这样页面跳转也就可以实现了。

来看看本部分的劳动成果。页面中分别尝试登录和注册。可以看到成功后页面都会跳转到 /dashboard 操作盘页面。

至此，《实现页面跳转》这部分就胜利完成了。

### 结语

进入最后一部分《结语》。

先来复盘一下本节的思路。首先引入了 axios 来取代 postman 发送 API 请求，让我们可以从页面中直接实现登录和注册，然后介绍了如何自定义 history 对象，来实现从 Action 中进行页面跳转的功能。

至此，《请求 API 实现登录注册》这一小节就胜利完成了。