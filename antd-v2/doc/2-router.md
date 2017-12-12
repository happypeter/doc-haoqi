# 提交表单

这集来《提交表单》。看看表单中如何拿到数据，如何触发 action ，同时如何在 action 中实现页面跳转。

### 呼叫提交函数

先看看怎么《呼叫提交函数》。也就是用户点提交按钮后，然后又怎么样了呢？需要参考的文档是[官方的 Button 文档](https://ant.design/components/button/)。

来添加 handleSubmit 函数。

```diff
diff --git a/admin/src/components/Home.js b/admin/src/components/Home.js
index 2750476..0c4fb15 100644
--- a/admin/src/components/Home.js
+++ b/admin/src/components/Home.js
@@ -4,10 +4,14 @@ import { Button, Input, Icon, Form } from 'antd'
 const FormItem = Form.Item
 class Home extends Component {
+  handleSubmit = () => {
+    console.log('handleSubmit')
+  }
+
   render () {
     return (
       <Wrap>
-        <Form>
+        <Form onSubmit={this.handleSubmit}>
           <FormItem>
             <Input
               placeholder='username'
@@ -22,7 +26,9 @@ class Home extends Component {
             />
           </FormItem>
           <FormItem>
-            <StyledButton type='primary' >登录</StyledButton>
+            <StyledButton type='primary' htmlType='submit' >
+              登录
+            </StyledButton>
           </FormItem>
         </Form>
       </Wrap>
```

Home.js 又改了一下。跟原生 form 一样，添加 onSubmit 事件即可。但是如果按钮，不指定 Type=submit 那么点按钮就不会有任何反应，但是蚂蚁设计的按钮的 type 属性用来干别的了，为了区分，所以这里需要些 htmlType=submit 。

这样，页面中点提交按钮，就可以看到 handleSubmit 函数中的打印语句已经生效了。

### 获取用户输入

进入《获取用户输入》这个任务。咱们不用 react 的那种受控组件的形式来拿数据，而主要来使用蚂蚁设计提供的 Form 接口，看一下[参考文档](https://ant.design/components/form-cn/)。


```diff
diff --git a/admin/src/components/Home.js b/admin/src/components/Home.js
index 0c4fb15..d23dde2 100644
--- a/admin/src/components/Home.js
+++ b/admin/src/components/Home.js
@@ -4,26 +4,37 @@ import { Button, Input, Icon, Form } from 'antd'
 const FormItem = Form.Item
 class Home extends Component {
-  handleSubmit = () => {
-    console.log('handleSubmit')
+  handleSubmit = e => {
+    e.preventDefault()
+    console.log('handleSubmit', this.props.form.getFieldsValue())
   }
   render () {
+    const { getFieldDecorator } = this.props.form
     return (
       <Wrap>
         <Form onSubmit={this.handleSubmit}>
           <FormItem>
-            <Input
-              placeholder='username'
-              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
-            />
+            {
+              getFieldDecorator('username')(
+                <Input
+                  placeholder='username'
+                  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
+                />
+              )
+            }
+
           </FormItem>
           <FormItem>
-            <Input
-              placeholder='password'
-              type='password'
-              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
-            />
+            {
+              getFieldDecorator('password')(
+                <Input
+                  placeholder='password'
+                  type='password'
+                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
+                />
+              )
+            }
           </FormItem>
           <FormItem>
             <StyledButton type='primary' htmlType='submit' >
@@ -36,7 +47,7 @@ class Home extends Component {
   }
 }
-export default Home
+export default Form.create()(Home)
 const Wrap = styled.div`
   border: 1px solid #ddd;
```

用 Form.create()() 包裹一下当前组件，蚂蚁设计就会往当前组件注入一个新的属性 form ，这个也就是后续操作的枢纽了。handleSubmit 中可以用 this.props.form.getFieldsValue() 来取用户输入，但是默认是拿不到任何值的。需要把每一个 Input 用 ，getFieldDecorator 包裹一下才行。

看看达成的效果。输入内容，然后点提交按钮，终端中可以看到打印的内容了。

### 触发 action 创建器

下面来《触发 action 创建器》。把拿到的数据交给 action 创建器去处理。

```diff
diff --git a/admin/src/actions/authActions.js b/admin/src/actions/authActions.js
new file mode 100644
index 0000000..fc7da8d
--- /dev/null
+++ b/admin/src/actions/authActions.js
@@ -0,0 +1,3 @@
+export const login = data => dispatch => {
+  console.log('action', data)
+}
diff --git a/admin/src/components/Home.js b/admin/src/components/Home.js
index d23dde2..69cc333 100644
--- a/admin/src/components/Home.js
+++ b/admin/src/components/Home.js
@@ -6,7 +6,7 @@ const FormItem = Form.Item
 class Home extends Component {
   handleSubmit = e => {
     e.preventDefault()
-    console.log('handleSubmit', this.props.form.getFieldsValue())
+    this.props.login(this.props.form.getFieldsValue())
   }
   render () {
diff --git a/admin/src/containers/HomeContainer.js b/admin/src/containers/HomeContainer.js
index 2310816..13ab15b 100644
--- a/admin/src/containers/HomeContainer.js
+++ b/admin/src/containers/HomeContainer.js
@@ -1,9 +1,12 @@
 import React from 'react'
 import Home from '../components/Home'
 import { connect } from 'react-redux'
+import { login } from '../actions/authActions'
 const HomeContainer = props => <Home {...props} />
 const mapStateToProps = state => ({ })
-export default connect(mapStateToProps)(HomeContainer)
+export default connect(mapStateToProps, {
+  login
+})(HomeContainer)
```

一共修改了三个文件，到 authActions 文件中，定义并导出创建器，容器组件 HomeContainer 中拿到，展示组件中去调用，把数据传递给 Action 创建器。

看看达成的效果。输入内容，点提交，login 函数中打印出了用户输入。

### 页面跳转

进入《页面跳转》这个任务。真实的登录过程还要复杂的多，但是咱们这里就简化了，登录后主要用 react-router 做一下页面跳转。

先装包

```
npm i react-router
```

包装好了。

添代码进来。

```diff
diff --git a/admin/src/actions/authActions.js b/admin/src/actions/authActions.js
index fc7da8d..0e3c3d9 100644
--- a/admin/src/actions/authActions.js
+++ b/admin/src/actions/authActions.js
@@ -1,3 +1,6 @@
+import { history } from '../utils/routerUtils'
+
 export const login = data => dispatch => {
   console.log('action', data)
+  history.push('/dashboard')
 }
diff --git a/admin/src/components/Dashboard.js b/admin/src/components/Dashboard.js
new file mode 100644
index 0000000..6e456ae
--- /dev/null
+++ b/admin/src/components/Dashboard.js
@@ -0,0 +1,16 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+class Dashboard extends Component {
+  render () {
+    return (
+      <Wrap>
+        Dashboard
+      </Wrap>
+    )
+  }
+}
+
+export default Dashboard
+
+const Wrap = styled.div``
diff --git a/admin/src/containers/App.js b/admin/src/containers/App.js
index 30fb3d0..fb1d430 100644
--- a/admin/src/containers/App.js
+++ b/admin/src/containers/App.js
@@ -1,13 +1,23 @@
 import React, { Component } from 'react'
 import '../assets/global.css'
 import HomeContainer from './HomeContainer'
+import DashboardContainer from './DashboardContainer'
+import { history } from '../utils/routerUtils'
+import {
+  Router,
+  Switch,
+  Route
+} from 'react-router'
 class App extends Component {
   render () {
     return (
-      <div>
-        <HomeContainer />
-      </div>
+      <Router history={history} >
+        <Switch>
+          <Route exact path='/' component={HomeContainer} />
+          <Route path='/dashboard' component={DashboardContainer} />
+        </Switch>
+      </Router>
     )
   }
 }
diff --git a/admin/src/containers/DashboardContainer.js b/admin/src/containers/DashboardContainer.js
new file mode 100644
index 0000000..b9a9b0a
--- /dev/null
+++ b/admin/src/containers/DashboardContainer.js
@@ -0,0 +1,9 @@
+import React from 'react'
+import Dashboard from '../components/Dashboard'
+import { connect } from 'react-redux'
+
+const DashboardContainer = props => <Dashboard {...props} />
+
+const mapStateToProps = state => ({ })
+
+export default connect(mapStateToProps)(DashboardContainer)
diff --git a/admin/src/utils/routerUtils.js b/admin/src/utils/routerUtils.js
new file mode 100644
index 0000000..96dc48a
--- /dev/null
+++ b/admin/src/utils/routerUtils.js
@@ -0,0 +1,3 @@
+import createBrowserHistory from 'history/createBrowserHistory'
+
+export const history = createBrowserHistory()
```

App.js 中添加两条路由规则，其中一个指向 dashboard ，这里没有使用 react-router 自带的 history 而是到 routerUtils 文件中自己初始化一个 history 对象，目的就是方便在 react-router 够不着的位置，例如 action 文件中使用 history 。添加 dashboard 的容器和展示组件就不用说了。

看看达成的效果。点登录，可以跳转到 dashboard 页面。

### 密码校验

进入《密码校验》这个任务。


```diff
diff --git a/admin/src/actions/authActions.js b/admin/src/actions/authActions.js
index 0e3c3d9..d029a2e 100644
--- a/admin/src/actions/authActions.js
+++ b/admin/src/actions/authActions.js
@@ -1,6 +1,11 @@
 import { history } from '../utils/routerUtils'
 export const login = data => dispatch => {
-  console.log('action', data)
-  history.push('/dashboard')
+  const { username, password } = data
+  if (username === 'admin' && password === 'secret') {
+    history.push('/dashboard')
+    return Promise.resolve('登录成功！')
+  } else {
+    return Promise.reject('用户名密码错误！')
+  }
 }
diff --git a/admin/src/components/Home.js b/admin/src/components/Home.js
index 69cc333..ce72c4f 100644
--- a/admin/src/components/Home.js
+++ b/admin/src/components/Home.js
@@ -1,12 +1,22 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
-import { Button, Input, Icon, Form } from 'antd'
+import { Button, Input, Icon, Form, message } from 'antd'
 const FormItem = Form.Item
 class Home extends Component {
   handleSubmit = e => {
     e.preventDefault()
     this.props.login(this.props.form.getFieldsValue())
+      .then(
+        data => {
+          message.success(data)
+        }
+      )
+      .catch(
+        err => {
+          message.error(err)
+        }
+      )
   }
   render () {
```

使用了 Promise 的形式，这样我就可以把全局提示写到展示组件中了，而不用到 action 创建函数中去直接呼叫。

看看达成的效果。输入正确的用户名密码，可以跳转到 dashboard 页面，提示信息为登录成功，否则不跳转，显示登录失败。

至此，《提交表单》这一关就通过了。
