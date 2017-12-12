# 创建登录页

这集咱们来《创建登录页》。按照[官网文档](https://ant.design/docs/react/use-with-create-react-app-cn) 的步骤来做就行。后台管理系统一般一进来就是个登录页，这集来把样式完成，先不做功能。

### 创建项目

先来《创建项目》。运行 create-react-app 把项目脚手架先运行起来。

```
create-react-app admin
```

创建一个新项目叫 admin ，以后管理员后台的代码就都往这个项目里面写了。创建好之后我需要稍微调整项目一下文件夹结构。

```
脚手架代码太多，这里就不粘贴了
```

删除整个 src ，然后自己添加 src/index.js 文件，没有特殊功能，就是把 App 组件 render 到 DOM 上，当然，还需要添加 App 组件了，里面没有啥功能就是显示占位符 “ App ” 。

这样，页面在3000端口运行起来了。

### 添加组件

现在来添加组件。每个人写法可能不太一样，我这里给出的是我比较喜欢的一个套路。

先把容器组件和展示组件都加上。

```diff
diff --git a/admin/src/components/Home.js b/admin/src/components/Home.js
new file mode 100644
index 0000000..91d200b
--- /dev/null
+++ b/admin/src/components/Home.js
@@ -0,0 +1,16 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+class Home extends Component {
+  render () {
+    return (
+      <Wrap>
+        Home
+      </Wrap>
+    )
+  }
+}
+
+export default Home
+
+const Wrap = styled.div``
diff --git a/admin/src/containers/App.js b/admin/src/containers/App.js
index 23be5d7..942b8fc 100644
--- a/admin/src/containers/App.js
+++ b/admin/src/containers/App.js
@@ -1,10 +1,11 @@
 import React, { Component } from 'react'
+import HomeContainer from './HomeContainer'
 class App extends Component {
   render () {
     return (
       <div>
-        App
+        <HomeContainer />
       </div>
     )
   }
diff --git a/admin/src/containers/HomeContainer.js b/admin/src/containers/HomeContainer.js
new file mode 100644
index 0000000..2310816
--- /dev/null
+++ b/admin/src/containers/HomeContainer.js
@@ -0,0 +1,9 @@
+import React from 'react'
+import Home from '../components/Home'
+import { connect } from 'react-redux'
+
+const HomeContainer = props => <Home {...props} />
+
+const mapStateToProps = state => ({ })
+
+export default connect(mapStateToProps)(HomeContainer)
```

一共改了三个文件。

首先添加 containers 文件夹下的 HomeContainer 文件，写容器组件，你可能注意到了，这里面有 redux 相关的代码。然后添加 components 文件夹下的 Home.js ，里面写展示组件，就显示 Home 这个字符串，不过这里也用到了 styled-components 来设置样式，最后到 App.js 文件内，先导入容器组件，然后在使用。这些写法都是就是我自己的一套模板，每次都这么写，所以都添加了编辑器的代码片段了，每次敲一敲快捷键就都出来了。

当然，这些代码要运行起来还是要依赖于 redux 的，所以先把 redux 相关的包装上。

```
npm i react-redux redux redux-thunk redux-logger styled-components
```

前面四个包是我自己的 redux 套装，最后一个是写样式用的 styled-components 。

跟这些包配套，就是要把 redux 的一些基础代码添加进来。

```diff
diff --git a/admin/src/constants/ActionTypes.js b/admin/src/constants/ActionTypes.js
new file mode 100644
index 0000000..21f56de
--- /dev/null
+++ b/admin/src/constants/ActionTypes.js
@@ -0,0 +1 @@
+export const STH = 'STH'
diff --git a/admin/src/index.js b/admin/src/index.js
index 7293dc0..00894d1 100644
--- a/admin/src/index.js
+++ b/admin/src/index.js
@@ -1,5 +1,13 @@
 import App from './containers/App'
 import React from 'react'
 import ReactDOM from 'react-dom'
+import { Provider } from 'react-redux'
+import store from './store'
-ReactDOM.render(<App />, document.getElementById('root'))
+const Kid = (
+  <Provider store={store}>
+    <App />
+  </Provider>
+)
+
+ReactDOM.render(Kid, document.getElementById('root'))
diff --git a/admin/src/reducers/common.js b/admin/src/reducers/common.js
new file mode 100644
index 0000000..579f28f
--- /dev/null
+++ b/admin/src/reducers/common.js
@@ -0,0 +1,16 @@
+import * as types from '../constants/ActionTypes'
+import { combineReducers } from 'redux'
+
+const sth = (state = {} , action) => {
+  switch (action.type) {
+    case types.STH:
+      return action.sth
+    default:
+      return state
+  }
+}
+
+
+export default combineReducers({
+  sth
+})
diff --git a/admin/src/reducers/index.js b/admin/src/reducers/index.js
new file mode 100644
index 0000000..15840c6
--- /dev/null
+++ b/admin/src/reducers/index.js
@@ -0,0 +1,8 @@
+import { combineReducers } from 'redux'
+import common from './common'
+
+const rootReducer = combineReducers({
+  common
+})
+
+export default rootReducer
diff --git a/admin/src/store/index.js b/admin/src/store/index.js
new file mode 100644
index 0000000..ad1b713
--- /dev/null
+++ b/admin/src/store/index.js
@@ -0,0 +1,8 @@
+import { createStore, applyMiddleware } from 'redux'
+import rootReducer from '../reducers'
+import thunk from 'redux-thunk'
+import logger from 'redux-logger'
+
+const store = createStore(rootReducer, applyMiddleware(thunk, logger))
+
+export default store
```

修改一共涉及五个文件。首先是创建 redux 的 store ，其中把 reducer/redux-thunk/redux-logger 就都加载进来了。接下来是 reducers 文件夹下的 index.js 文件，这里面导入各个子 reducer ，目前只添加了一个 common 。common.js 中其实也没实习啥功能，就是写了一个 reducer 的骨架，其中用到的 action 类型都定义成了常量。Action-Types.js 中就定义了所需的常量，写了个 STH ，显然就是个占位符。src 下的 index.js 也就是咱们项目的入口文件中，使用了 react-redux 这个包，把 redux 和咱们项目的各个组件连接起来，不然，各个组件中也就不能用 connect 了。

这样，页面上 Home 组件就成功运行起来了。

### 跑一跑按钮组件

现在来《跑一跑按钮组件》，添加到 Home 组件中。官方有专门的 [Button 按钮的文档](https://ant.design/components/button-cn/) 可以随时查阅。

先来装包

```
npm i antd
```

咱们这安装的新的，3.0版本的蚂蚁设计。

于是就可以到代码中添加 Button 组件。

```diff
diff --git a/admin/src/components/Home.js b/admin/src/components/Home.js
index 91d200b..28ca6f9 100644
--- a/admin/src/components/Home.js
+++ b/admin/src/components/Home.js
@@ -1,11 +1,12 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
+import Button from 'antd/lib/button';
 class Home extends Component {
   render () {
     return (
       <Wrap>
-        Home
+        <Button type="primary">Button</Button>
       </Wrap>
     )
   }
```

Home.js 导入并使用了 Button 组件。

但是光这么写不行，还需导入 css 才行。

```diff
diff --git a/admin/src/assets/global.css b/admin/src/assets/global.css
new file mode 100644
index 0000000..b562508
--- /dev/null
+++ b/admin/src/assets/global.css
@@ -0,0 +1 @@
+@import '~antd/dist/antd.css';
diff --git a/admin/src/containers/App.js b/admin/src/containers/App.js
index 942b8fc..30fb3d0 100644
--- a/admin/src/containers/App.js
+++ b/admin/src/containers/App.js
@@ -1,4 +1,5 @@
 import React, { Component } from 'react'
+import '../assets/global.css'
 import HomeContainer from './HomeContainer'
 class App extends Component {
```

改了两个文件。 assets/global.css 文件中。这里导入的这一行，意思是我们装了一个包叫 antd 里面有个 dist 文件夹，里面真的是有一个 antd.css 文件的。另外一个文件 App.js 中就是导入了 了一下 global.css 。

页面上，一个美观的按钮就运行起来了，点一下看看，有动效的。

### 用用 styled-components

现在来《用用 styled-components》。styled-components 最酷的地方是我们不需要重复写 div clasName=xxx 了，页面上减少了很多噪音，参考[官方文档上的说明](https://www.styled-components.com/docs/basics#styling-any-components) 。

改写一下已有样式。

```diff
diff --git a/admin/src/components/Home.js b/admin/src/components/Home.js
index 28ca6f9..4ef3c09 100644
--- a/admin/src/components/Home.js
+++ b/admin/src/components/Home.js
@@ -1,12 +1,12 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
-import Button from 'antd/lib/button';
+import Button from 'antd/lib/button'
 class Home extends Component {
   render () {
     return (
       <Wrap>
-        <Button type="primary">Button</Button>
+        <StyledButton type="primary" >登录</StyledButton>
       </Wrap>
     )
   }
@@ -14,4 +14,13 @@ class Home extends Component {
 export default Home
-const Wrap = styled.div``
+const Wrap = styled.div`
+  border: 1px solid #ddd;
+  width: 250px;
+  padding: 10px;
+  margin: 100px auto;
+`
+
+const StyledButton = styled(Button)`
+  width: 100%;
+`
```

修改了 Home.js 文件。首先，一个普通的 html 标签，例如 div ，可以用 styled.div 这种形式来添加样式。而对于已经写好的组件，例如这里的 Button ，也可以用 styled-components 来进一步添加样式，不过这次不是“ styled 点”了，而是 ”styled 括号“。

页面上看一下，效果都出来了。

### 添加表单

进入《添加表单》这个任务。参考 [表单官方文档](https://ant.design/components/form-cn/) ，会用到[表单域](https://ant.design/components/form-cn/#表单域) Form.Item 的概念。

首先添加一个 Input 进来。


```diff
diff --git a/admin/src/components/Home.js b/admin/src/components/Home.js
index 4ef3c09..66cf6a4 100644
--- a/admin/src/components/Home.js
+++ b/admin/src/components/Home.js
@@ -1,11 +1,15 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
-import Button from 'antd/lib/button'
+import { Button, Input, Icon } from 'antd'
 class Home extends Component {
   render () {
     return (
       <Wrap>
+        <Input
+          placeholder="username"
+          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
+        />
         <StyledButton type="primary" >登录</StyledButton>
       </Wrap>
     )
```

到 Home.js 中，导入 Input 和 Icon 进来，然后通过 prefix 等于 xxx Icon 的形式来添加前置图标，如果要添加后置图标这里就是 suffix 了，可以通过 Icon 的 type 属性来指定图标，我们这里写 user ，就会显示成一个用户图标，也可以用 style 属性来指定样式。

再来新的 Input 进来。

```diff
diff --git a/admin/src/components/Home.js b/admin/src/components/Home.js
index 66cf6a4..2750476 100644
--- a/admin/src/components/Home.js
+++ b/admin/src/components/Home.js
@@ -1,16 +1,30 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
-import { Button, Input, Icon } from 'antd'
+import { Button, Input, Icon, Form } from 'antd'
+const FormItem = Form.Item
 class Home extends Component {
   render () {
     return (
       <Wrap>
-        <Input
-          placeholder="username"
-          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
-        />
-        <StyledButton type="primary" >登录</StyledButton>
+        <Form>
+          <FormItem>
+            <Input
+              placeholder='username'
+              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
+            />
+          </FormItem>
+          <FormItem>
+            <Input
+              placeholder='password'
+              type='password'
+              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
+            />
+          </FormItem>
+          <FormItem>
+            <StyledButton type='primary' >登录</StyledButton>
+          </FormItem>
+        </Form>
       </Wrap>
     )
   }
```

这次，导入 Form 进来，Form.Item 也就是表单域，赋值到 FormItem 变量，往下，原有的输入用户名用的 Input 用 FormItem 包裹一下，下面又添加一个类型为 password 的 input 来输入密码，这样表单中一共就有三个元素了，分别用表单域包裹起来。

页面上看到了一个完整的登录表单。表单还有很多功能，后面我们会继续介绍。
