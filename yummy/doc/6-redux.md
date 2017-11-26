# 通过 Redux 设置 header 文本

欢迎来到《通过 Redux 设置 header 文本》这一节。通过解决不同页面上 Layout 中的 header 显示不同的文本这个问题，把 redux 的整个基础设施就都搭建起来了。下面的内容安排，按照这个数据流动的时间先后顺序来安排。

### 页面中发起数据修改请求

进入第一部分《页面中发起数据修改请求》。Header 中的文本要存储到 store 中，打开一个页面，例如登录页面的时候，我需要先把登录两个字写入 store 中。

添加 componentDidMount 函数。

```diff
diff --git a/client/src/components/Login.js b/client/src/components/Login.js
index 2dc197e..ff79b4c 100644
--- a/client/src/components/Login.js
+++ b/client/src/components/Login.js
@@ -3,6 +3,10 @@ import { loginConfig } from '../constants/FormConfig'
 import Form from './Form'
 
 class Login extends Component {
+  componentDidMount () {
+    this.props.setTitle('登录')
+  }
+  
   render () {
     return (
       <Form config={loginConfig} />
diff --git a/client/src/containers/LoginContainer.js b/client/src/containers/LoginContainer.js
index 6d77fa3..646b28e 100644
--- a/client/src/containers/LoginContainer.js
+++ b/client/src/containers/LoginContainer.js
@@ -1,6 +1,9 @@
 import React from 'react'
 import Login from '../components/Login'
+import { setTitle } from '../actions/commonActions'
 
 const LoginContainer = props => <Login {...props} />
 
-export default LoginContainer
+export default connect(null, {
+  setTitle
+})(LoginContainer)
diff --git a/client/src/actions/commonActions.js b/client/src/actions/commonActions.js
new file mode 100644
index 0000000..6b37763
--- /dev/null
+++ b/client/src/actions/commonActions.js
@@ -0,0 +1,3 @@
+export const setTitle = title => dispatch => {
+  dispatch({ type: types.SET_TITLE, title })
+}
```

这样页面加载时会执行 `setTitle` 这个 Action 创建函数，也就是 Action Creator 。本项目中的思路是，凡是跟写数据相关的操作都放到 Action 创建器中，下一步会看到，凡是跟读取数据相关的操作都放到数据选择函数，也就是 Selector 中。容器组件中尽量不做任何处理。


前面一步的代码是不可能执行成功的，因为缺少对 redux 相关的基础包的安装和配置。马上来装包。

```
npm i redux redux-thunk react-redux redux-logger
```

redux-thunk 让我们可以在 Action 创建器中使用函数，react-redux 提供 connect 接口，redux-logger 可以把发出的 Action 打印到终端中。

接下来写配置代码。


```diff
diff --git a/client/src/containers/LoginContainer.js b/client/src/containers/LoginContainer.js
index 646b28e..485f0ee 100644
--- a/client/src/containers/LoginContainer.js
+++ b/client/src/containers/LoginContainer.js
@@ -1,6 +1,7 @@
 import React from 'react'
 import Login from '../components/Login'
 import { setTitle } from '../actions/commonActions'
+import { connect } from 'react-redux'
 
 const LoginContainer = props => <Login {...props} />
 
diff --git a/client/src/index.js b/client/src/index.js
index fb3be93..7c93a99 100644
--- a/client/src/index.js
+++ b/client/src/index.js
@@ -1,5 +1,13 @@
 import React from 'react'
 import ReactDOM from 'react-dom'
 import App from './containers/App.js'
+import { Provider } from 'react-redux'
+import store from './store'
 
-ReactDOM.render(<App />, document.getElementById('root'))
+let Kid = (
+  <Provider store={store}>
+    <App />
+  </Provider>
+)
+
+ReactDOM.render(Kid, document.getElementById('root'))
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
new file mode 100644
index 0000000..9a7e4be
--- /dev/null
+++ b/client/src/redux/reducers/index.js
@@ -0,0 +1,3 @@
+const rootReducer = () => null
+
+export default rootReducer
diff --git a/client/src/redux/store.js b/client/src/redux/store.js
new file mode 100644
index 0000000..e6010d3
--- /dev/null
+++ b/client/src/store/index.js
@@ -0,0 +1,8 @@
+import { createStore, applyMiddleware } from 'redux'
+import rootReducer from './reducers'
+import thunk from 'redux-thunk'
+import logger from 'redux-logger'
+
+const store = createStore(rootReducer, applyMiddleware(thunk, logger))
+
+export default store
```

代码中添加了 `store` ，并且用 `Provider` 的形式让各个组件都可以拿到 `store` 中的数据。

看看我们这部分的劳动成果。浏览器中访问 /login 页面。可以看到终端中确实打印出了页面发起的 Action 了。

至此，《页面中发起数据修改请求》这部分就胜利完成了。

### 修改 store 中的数据

进入下一部分，《修改 store 中的数据》。通过 Action 触发 reducer 就可以进行修改了。

Action 类型的最佳实践是不要使用字符串，而要使用常量。

```diff
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
new file mode 100644
index 0000000..a74b47b
--- /dev/null
+++ b/client/src/constants/ActionTypes.js
@@ -0,0 +1 @@
+export const SET_TITLE = 'SET_TITLE'
diff --git a/client/src/actions/commonActions.js b/client/src/actions/commonActions.js
index 21cb794..a8516c5 100644
--- a/client/src/actions/commonActions.js
+++ b/client/src/actions/commonActions.js
@@ -1,4 +1,5 @@
+import * as types from '../constants/ActionTypes'
+
 export const setTitle = title => dispatch => {
-  console.log('setTitle action')
-  dispatch({ type: 'SET_TITLE', title })
+  dispatch({ type: types.SET_TITLE, title })
 }
```

这样的好处是如果拼写错了，就能及时看到报错。

接下来写 reducer 。


```diff
diff --git a/client/src/reducers/common.js b/client/src/reducers/common.js
new file mode 100644
index 0000000..8601bad
--- /dev/null
+++ b/client/src/reducers/common.js
@@ -0,0 +1,15 @@
+import * as types from '../constants/ActionTypes'
+import { combineReducers } from 'redux'
+
+const title = (state='', action) => {
+  switch (action.type) {
+    case types.SET_TITLE:
+      return action.title
+    default:
+      return state
+  }
+}
+
+export default combineReducers({
+  title
+})
diff --git a/client/src/reducers/index.js b/client/src/reducers/index.js
index 9a7e4be..1a9dc40 100644
--- a/client/src/reducers/index.js
+++ b/client/src/reducers/index.js
@@ -1,3 +1,9 @@
-const rootReducer = () => null
+import { combineReducers } from 'redux'
+import common from './common'
+
+const rootReducer = combineReducers({
+  common
+})
+
 
 export default rootReducer
```


看一下本部分的最终劳动成果。浏览器中刷新 /login 页面。终端中会看到 Action 发出之后，新的状态树中已经包含 `common: { title: '登录'}` 数据了。

至此，《修改 store 中的数据》这部分就胜利完成了。


### 订阅 store 中的数据

进入新的部分，《订阅 store 中的数据》。Layout 组件中把数据读出来，放到 Header 中显示。


添加 selecor 文件。

```diff
diff --git a/client/src/selectors/commonSelectors.js b/client/src/selectors/commonSelectors.js
new file mode 100644
index 0000000..001f20b
--- /dev/null
+++ b/client/src/selectors/commonSelectors.js
@@ -0,0 +1 @@
+export const getTitle = state => state.common.title
```

store 中固有的字段，使用 selector 选择函数有点无意义，但是其实项目中很多时候都要使用到状态树中的数据的派生数据，这时候选择函数的优势就发挥出来了。

拿到数据并显示。

```diff
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index bd96eea..38615a7 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -7,10 +7,10 @@ import {
 } from 'react-router-dom'
 import styled from 'styled-components'
 
-const Layout = () => (
+const Layout = ({ title }) => (
   <Wrap>
     <Header>
-      页面标题
+      { title }
     </Header>
     <Main>
       <MainInner>
diff --git a/client/src/containers/LayoutContainer.js b/client/src/containers/LayoutContainer.js
index 92e8188..7926117 100644
--- a/client/src/containers/LayoutContainer.js
+++ b/client/src/containers/LayoutContainer.js
@@ -1,6 +1,12 @@
 import React from 'react'
 import Layout from '../components/Layout'
+import { getTitle } from '../selectors/commonSelectors'
+import { connect } from 'react-redux'
 
 const LayoutContainer = props => <Layout {...props} />
 
-export default LayoutContainer
+const mapStateToProps = state => ({
+  title: getTitle(state)
+})
+
+export default connect(mapStateToProps)(LayoutContainer)
```

`mapStateToProps` 中使用了刚刚定义的选择函数，拿到的数据存到 `title` 中传递给展示组件去显示。


注册页面中发送修改数据请求


```diff
diff --git a/client/src/components/Signup.js b/client/src/components/Signup.js
index afc62ea..523f67f 100644
--- a/client/src/components/Signup.js
+++ b/client/src/components/Signup.js
@@ -3,6 +3,9 @@ import { signupConfig } from '../constants/FormConfig'
 import Form from './Form'
 
 class Signup extends Component {
+  componentDidMount () {
+    this.props.setTitle('注册')
+  }
   render () {
     return (
       <Form config={signupConfig} />
diff --git a/client/src/containers/SignupContainer.js b/client/src/containers/SignupContainer.js
index 95a8b44..7ef1a47 100644
--- a/client/src/containers/SignupContainer.js
+++ b/client/src/containers/SignupContainer.js
@@ -1,6 +1,11 @@
 import React from 'react'
 import Signup from '../components/Signup'
+import { setTitle } from '../actions/commonActions'
+import { connect } from 'react-redux'
+
 
 const SignupContainer = props => <Signup {...props} />
 
-export default SignupContainer
+export default connect(null, {
+  setTitle
+})(SignupContainer)
```

整个思路和 Login 组件中完全一致。

看一下本部分的劳动成果。浏览器中访问 /login 和 /signup 。可以看到 header 部分果然可以显示不同的文本。

至此，《订阅 store 数据》这部分就胜利完成了。

### 总结

进入最后一部分《总结》。

先来复盘一下本节思路。引入了 redux 的全套基础设施。坚持瘦容器组件的思路，只是融汇和传递信息，不对数据进行运算。如果需要修改数据，就通过 Action 创建函数来完成，如果需要读取数据，就通过函数选择器来完成。未来代码复杂了，会看到 Action 创建器和函数选择器发挥出强大的威力。这个其实跟 MVC 架构下的，瘦 controller 胖 model 的思想一致。因为容器组件中各类信息交叉，所以很容易写乱，所以尽量保持瘦瘦的。而每个具体的函数选择器或者 Action 创建器其实功能都很单一，所以可以写的负责些。

再来看看本小节我们的劳动成果。页面 Header 中的文本，会随着页面的不同而变化。这个当然是很小的一个功能，但是底层跑通了整个 redux 流程，为后续负责功能开发奠定了基础。

至此，《通过 Redux 设置 header 文本》这一小节就胜利完成了。