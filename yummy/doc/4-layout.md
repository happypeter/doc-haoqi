# 添加 router 和布局文件

进入新的小节《添加 router 和布局文件》。把登录和注册页面的路由和布局都准备好，主要关注点是 react-router 条件下如何加入布局文件。

### 画组件嵌套图

进入下一部分《画组件嵌套图》，梳理一下组件嵌套关系。

先画基本要素。顶部有一个 Header ，下面是 Signup 组件或者 Login 组件。这个是页面上需要的。

为了实现更好的代码结构，需要重构一下嵌套图。Header 移动到一个布局组件 Layout 内，同时用这个 Layout 组件来包裹核心组件，

Signup 和 Login 组件内部的核心部分也能抽离复用组件。添加 Form 组件进来。复用的内容都封装在 Form 组件内。

看一下这部分的最终成果， Signup 和 Login 页面都共享相同的 Layout 和 Form 组件。本节的后续代码开发都是来实现嵌套图上的逻辑。

至此，《画组件嵌套图》这部分就胜利完成了。

### 添加 router 

进入下一部分，《添加 router 》。把 react-router 跑起来。

安装 react-router。执行命令。

```
npm i react-router-dom
```

这样包就装好了。

App.js 中添加顶层路由规则。先来导入必要内容。

```diff
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index 30fb3d0..38d902b 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -1,6 +1,12 @@
 import React, { Component } from 'react'
 import '../assets/global.css'
 import HomeContainer from './HomeContainer'
+import LayoutContainer from './LayoutContainer'
+import {
+  BrowserRouter as Router,
+  Switch,
+  Route
+} from 'react-router-dom'
 
 class App extends Component {
   render () {
```

首先导入了 LayoutContainer ，然后导入了 React Router 自己的各个组件。

接下书写路由规则。调整一下代码。

```diff
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index 38d902b..9cbb500 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -11,9 +11,12 @@ import {
 class App extends Component {
   render () {
     return (
-      <div>
-        <HomeContainer />
-      </div>
+      <Router>
+        <Switch>
+          <Route exact path='/' component={HomeContainer} />
+          <Route component={LayoutContainer} />
+        </Switch>
+      </Router>
     )
   }
 }
```

添加了两条规则，如果用户访问顶级位置，就执行 HomeContainer ，如果用户访问任意其他链接就执行 LayoutContainer 。


添加 LayoutContainer 。创建新文件，粘贴一下。

```diff
diff --git a/client/src/containers/LayoutContainer.js b/client/src/containers/LayoutContainer.js
new file mode 100644
index 0000000..d64a9c7
--- /dev/null
+++ b/client/src/containers/LayoutContainer.js
@@ -0,0 +1,5 @@
+import React from 'react'
+
+const LayoutContainer = props => <div>Layout</div>
+
+export default LayoutContainer
```

暂时没写展示组件。

看一下这部分最终成果。浏览器先访问 `/` ，然后访问其他任意路由。可以看到除了首页，其他路由的页面都能应用布局文件。

至此，《添加 router 》这部分就胜利完成了。

### 添加布局文件

进入下一部分，《添加布局文件》。把 Singup 和 Login 两个页面的路由，放到布局文件中。

首先来添加 Layout 组件。创建新文件，粘贴代码进来。

```diff
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
new file mode 100644
index 0000000..2a99a5c
--- /dev/null
+++ b/client/src/components/Layout.js
@@ -0,0 +1,8 @@
+import React from 'react'
+import LoginContainer from '../containers/LoginContainer'
+import SignupContainer from '../containers/SignupContainer'
+import {
+  Switch,
+  Route
+} from 'react-router-dom'
+import styled from 'styled-components'
```

导入了 LoginContainer 和 SignupContainer 为写路由做好了准备。

接下来添加主体内容。粘贴这些代码。

```diff
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index 2a99a5c..11c1d1a 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -6,3 +6,21 @@ import {
   Route
 } from 'react-router-dom'
 import styled from 'styled-components'
+
+const Layout = () => (
+  <Wrap>
+    <Header>
+      页面标题
+    </Header>
+    <Switch>
+      <Route path="/signup" component={SignupContainer} />
+      <Route path="/login" component={LoginContainer} />
+    </Switch>
+  </Wrap>
+)
+
+export default Layout
+
+const Wrap = styled.div``
+
+const Header = styled.div``
```

可以看到 Layout 中首先包裹了 Header 组件，然后是路由规则。

Layout 写完，要到容器组件导入一下。

```diff
diff --git a/client/src/containers/LayoutContainer.js b/client/src/containers/LayoutContainer.js
index d64a9c7..707b1fb 100644
--- a/client/src/containers/LayoutContainer.js
+++ b/client/src/containers/LayoutContainer.js
@@ -1,5 +1,6 @@
 import React from 'react'
+import Layout from '../components/Layout'
 
-const LayoutContainer = props => <div>Layout</div>
+const LayoutContainer = props => <Layout {...props} />
 
 export default LayoutContainer
```

这样才能在页面上显示出来。

再来添加 Login 组件进来，先添加容器。

```diff
diff --git a/client/src/containers/LoginContainer.js b/client/src/containers/LoginContainer.js
new file mode 100644
index 0000000..923790c
--- /dev/null
+++ b/client/src/containers/LoginContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import Login from '../components/Login'
+
+const LoginContainer = props => <Login {...props} />
+
+export default LoginContainer
```

依然是一个我所谓的空容器。

接下来添加展示。

```diff
diff --git a/client/src/components/Login.js b/client/src/components/Login.js
new file mode 100644
index 0000000..f12dd03
--- /dev/null
+++ b/client/src/components/Login.js
@@ -0,0 +1,11 @@
+import React, { Component } from 'react'
+
+class Login extends Component {
+  render () {
+    return (
+      <div>Form</div>
+    )
+  }
+}
+
+export default Login
```

只有 form 作为占位符。

也需要添加 Signup 组件，先添加容器。

```diff
diff --git a/client/src/containers/SignupContainer.js b/client/src/containers/SignupContainer.js
new file mode 100644
index 0000000..95a8b44
--- /dev/null
+++ b/client/src/containers/SignupContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import Signup from '../components/Signup'
+
+const SignupContainer = props => <Signup {...props} />
+
+export default SignupContainer
```

依然为空。

再添加展示。

```diff
diff --git a/client/src/components/Signup.js b/client/src/components/Signup.js
new file mode 100644
index 0000000..7cbd6f7
--- /dev/null
+++ b/client/src/components/Signup.js
@@ -0,0 +1,11 @@
+import React, { Component } from 'react'
+
+class Signup extends Component {
+  render () {
+    return (
+      <div>Form</div>
+    )
+  }
+}
+
+export default Signup
```

占位符也是 form 。

看一下本部分的最终成果。浏览器中分别打开 /signup 和 /login。可以看到两个组件中都复用了 Layout 。

至此，《添加 router 》这部分就胜利完成了。

### 添加 Form 组件

进入下一部分，《添加 Form 组件》。添加 Form 组件，并分别在登录和注册页面上使用。

把 Form 组件加上。

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
new file mode 100644
index 0000000..12bbcc4
--- /dev/null
+++ b/client/src/components/Form.js
@@ -0,0 +1,25 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+class Form extends Component {
+  render() {
+    const { options } = this.props.config
+    return(
+      <Wrap>
+        <Title>
+          {options.title}
+        </Title>
+        <Input />
+      </Wrap>
+    )
+  }
+}
+
+export default Form
```

会显示父组件传递过来的信息。

这些标签是哪里来的呢？

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index 7102ae5..b4511ee 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -16,3 +16,9 @@ class Form extends Component {
 }
 
 export default Form
+
+const Wrap =styled.div``
+
+const Title =styled.div``
+
+const Input =styled.input``
```

是通过 styled-components 我们自己定义的。


接下来 Login 组件中使用 Form 。

```diff
diff --git a/client/src/components/Login.js b/client/src/components/Login.js
index f12dd03..310cc2c 100644
--- a/client/src/components/Login.js
+++ b/client/src/components/Login.js
@@ -1,9 +1,10 @@
 import React, { Component } from 'react'
+import Form from './Form'
 
 class Login extends Component {
   render () {
     return (
-      <div>Form</div>
+      <Form />
     )
   }
 }
```

导入一下。

不要忘记 Form 期待父组件传参数的。

```diff
diff --git a/client/src/components/Login.js b/client/src/components/Login.js
index 310cc2c..e4d166c 100644
--- a/client/src/components/Login.js
+++ b/client/src/components/Login.js
@@ -1,10 +1,11 @@
 import React, { Component } from 'react'
+import { loginConfig } from '../constants/FormConfig'
 import Form from './Form'
 
 class Login extends Component {
   render () {
     return (
-      <Form />
+      <Form config={loginConfig} />
     )
   }
 }
```

要传递的是一些配置信息。

添加配置文件。

```diff
diff --git a/client/src/constants/FormConfig.js b/client/src/constants/FormConfig.js
new file mode 100644
index 0000000..a211e95
--- /dev/null
+++ b/client/src/constants/FormConfig.js
@@ -0,0 +1,11 @@
+export const signupConfig = {
+  options: {
+    title: '注册'
+  }
+}
+
+export const loginConfig = {
+  options: {
+    title: '登录'
+  }
+}
```


专门存放注册和登录表单的差异化数据。


对 Signup 组件的修改和 Login 完全一样，请直接看下面给出的 diff 内容。

```diff
diff --git a/client/src/components/Signup.js b/client/src/components/Signup.js
index 7cbd6f7..afc62ea 100644
--- a/client/src/components/Signup.js
+++ b/client/src/components/Signup.js
@@ -1,9 +1,11 @@
 import React, { Component } from 'react'
+import { signupConfig } from '../constants/FormConfig'
+import Form from './Form'
 
 class Signup extends Component {
   render () {
     return (
-      <div>Form</div>
+      <Form config={signupConfig} />
     )
   }
 }
```

这样就改好了。

Home 组件中添加 Link 。

```diff
diff --git a/client/src/assets/global.css b/client/src/assets/global.css
index f2f7776..97ce458 100644
--- a/client/src/assets/global.css
+++ b/client/src/assets/global.css
@@ -5,3 +5,7 @@ body {
 * {
   box-sizing: border-box;
 }
+
+a {
+  text-decoration: none;
+}
diff --git a/client/src/components/Home.js b/client/src/components/Home.js
index 276315a..f763022 100644
--- a/client/src/components/Home.js
+++ b/client/src/components/Home.js
@@ -1,6 +1,7 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
 import logo from '../assets/Logo.svg'
+import { Link } from 'react-router-dom'
 
 class Home extends Component {
   render () {
@@ -18,12 +19,12 @@ class Home extends Component {
           </Text>
         </Hero>
         <Action>
-          <a>
+          <Link to="/signup">
             注册
-          </a>
-          <a>
+          </Link>
+          <Link to="/login">
             登录
-          </a>
+          </Link>
         </Action>
       </Wrap>
     )
```

把路由链接加上了，同时去掉了链接样式的下划线。

浏览器中看一下。到首页，分别点两个链接。发现登录和注册页面都能顺利打开。

至此，《添加 Form 组件》这部分就胜利完成了。

### 总结

进入最后一部分，《总结》。

先来复盘一下咱们这节的思路。首先通过组件嵌套图，理清了代码的基本结构。然后以布局组件为核心，逐步添加各个组件代码进来，并且抽离了可以复用的 Form 组件。最终实现了注册和登录两个页面的基本结构。

再来看看本节的最终成果。浏览器中打开首页，分别点击登录和注册按钮。可以看到两个页面都可以顺利打开，并且都可以共享相同的布局文件和 Form 。

至此，《添加 router 和布局文件》这个小节就胜利完成了。