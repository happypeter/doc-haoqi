# 显示报错提示

欢迎进入新的小节《显示报错提示》。来把认证时候的报错通过一个提示框的形式展示出来，主要涉及到 redux 的操作技巧。

### sketch 中设计提示框

进入《sketch 中设计提示框》这个部分。设计画图的过程其实也是整理宏观思路的过程。

拷贝 Signup 命名为 SignupWithAlert 。添加一个黑底白字透明度为60%的小框框。这个是咱们的全局提示框，意思是任何页面中有错误都可以呼叫这个小框框来展示。


先添加容器组件。

```diff
diff --git a/client/src/containers/AlertBoxContainer.js b/client/src/containers/AlertBoxContainer.js
new file mode 100644
index 0000000..38f1876
--- /dev/null
+++ b/client/src/containers/AlertBoxContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import AlertBox from '../components/AlertBox'
+
+const AlertBoxContainer = props => <AlertBox {...props} />;
+
+export default AlertBoxContainer
````

一个连接各方代码的中间人。

再来添加展示组件。

```diff
diff --git a/client/src/components/AlertBox.js b/client/src/components/AlertBox.js
new file mode 100644
index 0000000..002aa9a
--- /dev/null
+++ b/client/src/components/AlertBox.js
@@ -0,0 +1,27 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+class AlertBox extends Component {
+  render() {
+    return(
+      <Wrap>
+        提示信息提示信息提示信息提示信息
+      </Wrap>
+    )
+  }
+}
+
+export default AlertBox
+
+const Wrap = styled.div`
+  position: fixed;
+  top: 50%;
+  left: 50%;
+  transform: translate(-50%, -50%);
+  z-index: 100;
+  width: auto;
+  padding: 20px;
+  color: #fff;
+  line-height: 1.8;
+  background-color: rgba(0,0,0,.8);
+`
```

就是一个小框框么，没有多复杂。


既然是全局提示，那么就把它添加在一个全局的位置。


```diff
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index d56950e..4368d12 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -1,6 +1,7 @@
 import React from 'react'
 import LoginContainer from '../containers/LoginContainer'
 import SignupContainer from '../containers/SignupContainer'
+import AlertBoxContainer from '../containers/AlertBoxContainer'
 import {
   Switch,
   Route
@@ -9,6 +10,7 @@ import styled from 'styled-components'
 
 const Layout = ({ title }) => (
   <Wrap>
+    <AlertBoxContainer />
     <Header>
       { title }
     </Header>
```

添加到了布局文件中。

来看看本部分的劳动成果。除了首页，其他页面上现在都默认显示一个提示框了。所谓全局的效果已经出来了。

至此，《sketch 中设计提示框》这部分就胜利完成了。

### redux 状态控制显示

进入下一部分《redux 状态控制显示》。默认提示框肯定是隐藏的，需要有一个专门的 redux 字段来控制它。

redux 中添加 alert 字段。

```diff
diff --git a/client/src/reducers/common.js b/client/src/reducers/common.js
index ac7ccaa..f566a4a 100644
--- a/client/src/reducers/common.js
+++ b/client/src/reducers/common.js
@@ -10,6 +10,15 @@ const title = (state = '', action) => {
   }
 }
 
+const initAlert = {
+  show: false
+}
+
+const alert = (state=initAlert, action) => {
+  return state
+}
+
 export default combineReducers({
-  title
+  title,
+  alert
 })
```

现在状态树中有了一个布尔值，`alert.show` 来决定警告框要不要显示了。

再来添加读取这个值的 selector 也就是选择函数。

```diff
diff --git a/client/src/selectors/commonSelectors.js b/client/src/selectors/commonSelectors.js
index 001f20b..a3e8d83 100644
--- a/client/src/selectors/commonSelectors.js
+++ b/client/src/selectors/commonSelectors.js
@@ -1 +1,2 @@
 export const getTitle = state => state.common.title
+export const getShowAlert = state => state.common.alert.show
```

状态树中的固有字段，直接拿。

容器组件中先来拿到这个值。

```diff
diff --git a/client/src/containers/LayoutContainer.js b/client/src/containers/LayoutContainer.js
index 7926117..c4010ee 100644
--- a/client/src/containers/LayoutContainer.js
+++ b/client/src/containers/LayoutContainer.js
@@ -1,12 +1,13 @@
 import React from 'react'
 import Layout from '../components/Layout'
-import { getTitle } from '../selectors/commonSelectors'
+import { getTitle, getShowAlert } from '../selectors/commonSelectors'
 import { connect } from 'react-redux'
 
 const LayoutContainer = props => <Layout {...props} />
 
 const mapStateToProps = state => ({
-  title: getTitle(state)
+  title: getTitle(state),
+  showAlert: getShowAlert(state)
 })
export default connect(mapStateToProps)(LayoutContainer)
```

这样展示组件 Layout 中就拿到了一个新属性 showAlert 。

展示组件里来使用这个属性。

```diff
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index 4368d12..52b6d4b 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -8,9 +8,9 @@ import {
 } from 'react-router-dom'
 import styled from 'styled-components'
 
-const Layout = ({ title }) => (
+const Layout = ({ title, showAlert }) => (
   <Wrap>
-    <AlertBoxContainer />
+    { showAlert && <AlertBoxContainer /> }
     <Header>
       { title }
     </Header>
 ```

就可以通过 `showAlert` 来决定要不要显示提示框了。

来看一下本部分的劳动成果。手动修改 redux 中的 alert.show 的默认值试一下。可以看到是否显示提示框完全在于这个状态值。

至此，《redux 状态控制显示》这部分就胜利完成了。

### 触发显示

进入《触发显示》这个部分。故事的中段是如何来修改这个状态值，来触发状态框的显示。

先定义对应的 Action 类型名。

```diff
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index a74b47b..e136088 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -1 +1,2 @@
 export const SET_TITLE = 'SET_TITLE'
+export const ALERT = 'ALERT'
```

名字虽短，却是下面几部分代码的枢纽。

定义 Action 。

```diff
diff --git a/client/src/actions/commonActions.js b/client/src/actions/commonActions.js
index ff04bc3..d8c55bf 100644
--- a/client/src/actions/commonActions.js
+++ b/client/src/actions/commonActions.js
@@ -3,3 +3,11 @@ import * as types from '../constants/ActionTypes'
 export const setTitle = title => dispatch => {
   dispatch({ type: types.SET_TITLE, title })
 }
+
+export const alert = () => ({
+   type: types.ALERT,
+})
+
```

作用很简单，就是向 reducer 发出修改信号。

定义对应的 reducer 。

```diff
diff --git a/client/src/reducers/common.js b/client/src/reducers/common.js
index b6fe3a7..9a55093 100644
--- a/client/src/reducers/common.js
+++ b/client/src/reducers/common.js
@@ -11,11 +11,16 @@ const title = (state='', action) => {
 }
 
 const alert = (state=initAlert, action) => {
-  return state
+  switch (action.type) {
+    case types.ALERT:
+      return { ...state, show: true }
+    default:
+      return state
+  }
 }
 
 export default combineReducers({
```

收到 `ALERT` 这个 action ，执行对 show 状态的修改。

那什么时候触发 acton 呢？可能性未来会有很多。当前就是，当登录或者注册失败的时候，触发 action 。

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index 562b529..348a9fe 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -1,5 +1,6 @@
 import axios from 'axios'
 import { LOGIN_URL, SIGNUP_URL } from '../constants/ApiContants'
+import { alert } from './commonActions'
 import { history } from '../utils/routerUtils'
 
 export const signup = data => dispatch => {
@@ -10,6 +11,7 @@ export const signup = data => dispatch => {
     if(err.response) {
       const { msg } = err.response.data
       console.log(msg)
+      dispatch(alert())
     }
   })
 }
@@ -25,6 +27,7 @@ export const login = data => {
         if(err.response){
           const { msg } = err.response.data
           console.log(msg)
+          dispatch(alert())
         }
       }
     )
```

这样就可以修改 state 值，从而显示出警告框了。

提示信息的文字需要添加上，先从源头上改

```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index fe19916..3e5a4a6 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -10,8 +10,7 @@ export const signup = data => dispatch => {
   }).catch(err => {
     if(err.response) {
       const { msg } = err.response.data
-      console.log(msg)
-      dispatch(alert())
+      dispatch(alert(msg))
     }
   })
 }
@@ -26,8 +25,7 @@ export const login = data => {
       err => {
         if(err.response){
           const { msg } = err.response.data
-          console.log(msg)
-          dispatch(alert())
+          dispatch(alert(msg))
         }
       }
     )
```

报错信息作为提示信息文本。

Action 创建器中拿到

```diff
diff --git a/client/src/actions/commonActions.js b/client/src/actions/commonActions.js
index 1b9136d..a00c6af 100644
--- a/client/src/actions/commonActions.js
+++ b/client/src/actions/commonActions.js
@@ -4,6 +4,6 @@ export const setTitle = title => dispatch => {
   dispatch({ type: types.SET_TITLE, title })
 }
 
-export const alert = () => ({
-   type: types.ALERT,
+export const alert = msg => ({
+   type: types.ALERT, msg
 })
```

这样报错信息就会发出。

到 reducer 中接收一下。

```diff
diff --git a/client/src/reducers/common.js b/client/src/reducers/common.js
index a698021..1232268 100644
--- a/client/src/reducers/common.js
+++ b/client/src/reducers/common.js
@@ -11,13 +11,14 @@ const title = (state = '', action) => {
 }
 
 const initAlert = {
-  show: false
+  show: false,
+  msg: ''
 }
 
 const alert = (state=initAlert, action) => {
   switch (action.type) {
     case types.ALERT:
-      return {  show: true }
+      return {  show: true, msg: action.msg }
     default:
       return state
   }
```

这样，msg 状态值就保存到状态树中了。

下面开始读取，先定义 selector

```diff
diff --git a/client/src/selectors/commonSelectors.js b/client/src/selectors/commonSelectors.js
index a3e8d83..b76e61e 100644
--- a/client/src/selectors/commonSelectors.js
+++ b/client/src/selectors/commonSelectors.js
@@ -1,2 +1,3 @@
 export const getTitle = state => state.common.title
 export const getShowAlert = state => state.common.alert.show
+export const getAlertMsg = state => state.common.alert.msg
```

拿到存储的 msg 。

下面去容器组件中去使用 selector




```diff
diff --git a/client/src/containers/AlertBoxContainer.js b/client/src/containers/AlertBoxContainer.js
index 38f1876..8acc110 100644
--- a/client/src/containers/AlertBoxContainer.js
+++ b/client/src/containers/AlertBoxContainer.js
@@ -1,6 +1,11 @@
 import React from 'react'
 import AlertBox from '../components/AlertBox'
+import { getAlertMsg } from '../selectors/commonSelectors'
+import { connect } from 'react-redux'
 
 const AlertBoxContainer = props => <AlertBox {...props} />;
 
-export default AlertBoxContainer
+const mapStateToProps = state => ({
+  alertMsg: getAlertMsg(state)
+})
+export default connect(mapStateToProps)(AlertBoxContainer)
```

传递给展示组件。

展示组件中来显示报错信息。

这样，整个流程就完成了。

来看看本部分达成的效果。登录注册界面触发各种报错。可以看到提示框中都能正常显示。

至此，《触发显示》这部分就胜利完成了。

### 延时隐藏

进入《延时隐藏》这个部分。故事的后段是如何来隐藏状态框，我们采取的策略是四秒后自动隐藏。


定义需要的 Action 类型

```diff
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index 70a1f16..e77ecab 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -1,2 +1,3 @@
 export const SET_TITLE = 'SET_TITLE'
 export const ALERT = 'ALERT'
+export const HIDE_ALERT = 'HIDE_ALERT'
```


添加 Action 创建器

```diff
diff --git a/client/src/actions/commonActions.js b/client/src/actions/commonActions.js
index a00c6af..0c145bf 100644
--- a/client/src/actions/commonActions.js
+++ b/client/src/actions/commonActions.js
@@ -7,3 +7,7 @@ export const setTitle = title => dispatch => {
 export const alert = msg => ({
    type: types.ALERT, msg
 })
+
+export const hideAlert = () => dispatch => {
+  dispatch({ type: types.HIDE_ALERT })
+}
```

给 reducer 发出隐藏提示框的信号。


通过容器组件把这个 hideAlert 传递给展示组件


```diff
diff --git a/client/src/containers/AlertBoxContainer.js b/client/src/containers/AlertBoxContainer.js
index 8acc110..d14f4be 100644
--- a/client/src/containers/AlertBoxContainer.js
+++ b/client/src/containers/AlertBoxContainer.js
@@ -1,6 +1,7 @@
 import React from 'react'
 import AlertBox from '../components/AlertBox'
 import { getAlertMsg } from '../selectors/commonSelectors'
+import { hideAlert } from '../actions/commonActions'
 import { connect } from 'react-redux'
 
 const AlertBoxContainer = props => <AlertBox {...props} />;
@@ -8,4 +9,7 @@ const AlertBoxContainer = props => <AlertBox {...props} />;
 const mapStateToProps = state => ({
   alertMsg: getAlertMsg(state)
 })
-export default connect(mapStateToProps)(AlertBoxContainer)
+
+export default connect(mapStateToProps, {
+  hideAlert
+})(AlertBoxContainer)
```

这样，展示组件就可以通过 this.props.hideAlert 来拿到了。

展示组件中来触发 hideAlert

```diff
diff --git a/client/src/components/AlertBox.js b/client/src/components/AlertBox.js
index 27a6928..09bba0d 100644
--- a/client/src/components/AlertBox.js
+++ b/client/src/components/AlertBox.js
@@ -2,6 +2,12 @@ import React, { Component } from 'react'
 import styled from 'styled-components'
 
 class AlertBox extends Component {
+  componentDidMount() {
+    window.setTimeout(
+      this.props.hideAlert, 4000
+    )
+  }
+  
   render() {
     return(
       <Wrap>
```

`componentDidMount` 正好是组件显示的时候触发，里面设置了4秒延时，然后就会执行 Action 创建器。


但是，真正修改 state 值还是要靠 reducer 

```diff
diff --git a/client/src/reducers/common.js b/client/src/reducers/common.js
index 1232268..490055b 100644
--- a/client/src/reducers/common.js
+++ b/client/src/reducers/common.js
@@ -19,6 +19,8 @@ const alert = (state=initAlert, action) => {
   switch (action.type) {
     case types.ALERT:
       return { show: true, msg: action.msg }
+    case types.HIDE_ALERT:
+       return { show: false, msg: '' }
     default:
       return state
   }
```

这样，一个流程就走通了。

来看一下本部分的劳动成果。到页面上触发提示框。可以看到四秒后它会自动隐藏。

至此，《延时隐藏》这部分就胜利完成了。

### 结语

来进入最后一个部分《结语》。

先来复盘一下本节的思路。最初，我们先作图后写 css 把提示框做了出来，然后就通过 alert.show 状态，来决定提示框是否显示，通过 alert.msg 来决定提示框要显示的内容。接下来的内容都是来修改这个状态值的，到登录注册报错的位置来触发 Action 创建器，把信息携带到 reducer 中修改状态值就可以触发提示框的显示了。显示之后，提示框组件自己会触发及时，四秒后会自动发出隐藏提示框的 Action 已经 reducer ，这样用户最终看到的就是一个用户体验非常好的提示框效果了。

来看看本节的劳动成果。用户输入有误，界面上就会显示提示框，内容就是误操作的报错信息。这样，整个全局提示框的功能也就完整了。

至此，《显示报错提示》这个小节就胜利完成了。