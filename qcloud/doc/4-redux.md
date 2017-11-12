# 文件列表存入 Redux

上一节把 API 写好了，现在到客户端项目中请求 API 。你可能意味咱们这节是要写界面了，NO, NO, NO。我要做的只是所谓的**前端数据库准备**，具体来讲就是，把拿到的数据存入 redux 中，然后把 Redux 和 React 组件连接起来。

### 搭建 redux 的 store

先来把 redux 的 store 搭建起来。

先来安装 redux 相关的包

```
cd client/
npm i redux react-redux redux-thunk
```

其中 redux 是 redux 核心包，react-redux 负责连接 react 组件和 redux 系统，redux-thunk 让我们可以在 Action 创建器中去发异步请求。本课程重点不在 redux ，所以如果你对 redux 不熟悉，欢迎先去看看好奇猫上的其他 redux 基础课程，然后回来继续看本课程。

接下来，创建 client/src/redux 文件夹，以后 redux 相关的文件都放到这里面。先来创建 src/redux/store.js

```js
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

export default store
```

上面，导入 `createStore` 接口，创建了一个 store 对象并导出。`createStore` 唯一一个必填参数就是 reducer ，上面我导入了 `rootReducer`，它的定义在 redux/reducers/index.js

```js
const initState = {
  allFiles: [
    {
      fileName: 'xxx'
    }
  ]
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'XXX':
      return state
    default:
      return state
  }
}

export default rootReducer
```

`initState` 中有一个 `allFiles` 变量，未来会用来存储 bucket 中文件列表，暂时先添加一点点假数据，便于测试。下面 rootReducer 函数只是有一个 reducer 的基本骨架，里面的语句没有实际作用，都是直接返回老状态树。

有了上面的两个文件，store 就建立起来了，现在到 App.js 中来读取一下 store 中存放的数据。

App.js 中添加如下内容：

```diff
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index b61afeb..d192918 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -1,8 +1,10 @@
 import React, { Component } from 'react'
 import Main from '../components/Main'
+import store from '../redux/store'
 
 class App extends Component {
   render () {
+    console.log('store', store.getState())
     return (
       <div>
         <Main />

```

首先导入了 store ，然后通过 `store.getState()` 去读 store 中存放的数据，如果 chrome 的 console 中可以打印出 allFiles 的具体值，表示 store 已经正常工作了。

### 动态连接 react 和 redux

这个主要是前面安装的 react-redux 这个包的作用了，通过添加 Provider/connect 这些接口，保证 redux 数据一旦有了变化，react 组件可以自动更新。

首先要修改 src/index.js ，最终内容如下：

```diff
diff --git a/client/src/index.js b/client/src/index.js
index c01fef1..4ad6fb2 100644
--- a/client/src/index.js
+++ b/client/src/index.js
@@ -1,5 +1,11 @@
 import React from 'react'
 import ReactDOM from 'react-dom'
 import App from './containers/App'
+import store from './redux/store'
+import { Provider } from 'react-redux'
 
-ReactDOM.render(<App />, document.getElementById('root'))
+ReactDOM.render(
+  <Provider store={store}>
+    <App />
+  </Provider>
+  , document.getElementById('root'))
```

Provider 包裹了项目的顶级组件 App 。也就让本项目的所有组件都有可能去订阅 store 。一个组件想要 store 中的数据，就 `connect` 一下即可。

创建 src/containers/TableContainer.js 来跟 store 做动态连接

```js
import React, { Component } from 'react'

class TableContainer extends Component {
  render () {
    return (
      <div>
        TableContainer
      </div>
    )
  }
}

export default TableContainer
```

一个基本组件，要跟 Redux 动态连接起来，要有几个步骤：

```diff
diff --git a/client/src/containers/TableContainer.js b/client/src/containers/TableContainer.js
index 71ff50e..79e6a5b 100644
--- a/client/src/containers/TableContainer.js
+++ b/client/src/containers/TableContainer.js
@@ -1,7 +1,10 @@
 import React, { Component } from 'react'
+import { connect } from 'react-redux'
+import { getAllFiles } from '../redux/reducers'
 
 class TableContainer extends Component {
   render () {
+    console.log('TableContainer', this.props.allFiles)
     return (
       <div>
         TableContainer
@@ -10,4 +13,7 @@ class TableContainer extends Component {
   }
 }
 
-export default TableContainer
+const mapStateToProps = state => ({
+  allFiles: getAllFiles(state)
+})
+export default connect(mapStateToProps)(TableContainer)
```

- 第一步，通过 connect 方法，把 store 和当前组件连接起来。也就是说在当前组件中就可以拿到 store 中的 state 了（注意，跟前面通过 store.getState() 来拿 state 不同，这次拿到的是动态的 state ，而不是静态的一次性读取的数值）
- 第二步，然后通过 `mapStateToProps` 来把整个状态树（也就是 mapStateToProps 的参数 state ）的一部分数据拿出来备用，使用的语句是 `allFiles: getAllFiles(state)`
- 第三步，到组件中去使用数据，我这里只是打印了一下。

`getAllFiles()` 函数是在 reducer 中定义的，所以到 src/redux/reducers/index.js 中，添加

```diff
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index 6d2e722..3808ec1 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -14,5 +14,6 @@ const rootReducer = (state = initState, action) => {
       return state
   }
 }
+export const getAllFiles = state => state.allFiles
 
 export default rootReducer
```

这样，getAllFiles 就定义好了。通过这个简单的 getAllFiles 看不出使用 **函数选择器** 的优势，但是后续当我们需要的数据不是状态树中直接提供的，而是状态数中已有数据进行演算得到的时候，优势就会比较明显了。

TableContainer 组件有了，但是跟项目的入口组件 App.js 没有关联，所以到 Main.js 中添加对这个组件的使用：

```diff
diff --git a/client/src/components/Main.js b/client/src/components/Main.js
index 93b8d98..068a271 100644
--- a/client/src/components/Main.js
+++ b/client/src/components/Main.js
@@ -1,5 +1,6 @@
 import React from 'react'
 import './main.css'
+import TableContainer from '../containers/TableContainer'
 import styled from 'styled-components'
 
 const MainWrap = styled.div`
@@ -7,5 +8,7 @@ const MainWrap = styled.div`
   background: #00bcd4;
 `
 export default () => (
-  <MainWrap>Main</MainWrap>
+  <MainWrap>
+    <TableContainer />
+  </MainWrap>
 )
```

这样，到浏览器中查看，就可以看到 console 中打印出的 store 中的 allFiles 数据了。动态连接 redux 和 react 的工作也就完成了。

### 读取 API 数据到 store 中

现在来读取服务器端的 API ，拿到真正的腾讯云上的文件列表，然后存入 store 中。

到 App.js 中添加调用 Action 创建器的代码

```diff
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index d192918..6307a5f 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -1,10 +1,13 @@
 import React, { Component } from 'react'
 import Main from '../components/Main'
-import store from '../redux/store'
+import { loadAllFiles } from '../redux/actions'
+import { connect } from 'react-redux'
 
 class App extends Component {
+  componentDidMount () {
+    this.props.loadAllFiles()
+  }
   render () {
-    console.log('store', store.getState())
     return (
       <div>
         <Main />
@@ -13,4 +16,4 @@ class App extends Component {
   }
 }
 
-export default App
+export default connect(null, { loadAllFiles })(App)
```


componentDidMount 中去执行一个 action 创建器叫做 `loadAllFiles` 。同时删除之前添加的 store 和 getState 的代码。

然后创建 src/redux/actions/index.js 去定义这个 action 创建器 ：

```js
import axios from 'axios'

export const loadAllFiles = () => {
  return dispatch => {
    axios.get('http://localhost:3008/bucket').then(
      res => {
        console.log(res.data)
      }
    )
  }
}
```

上面的代码就是 redux-thunk 使用了之后的 action 创建器的基本写法。实现的功能是，请求之前定义好的读 Bucket 的 API ，把得到的文件列表打印到 Chrome 终端中。

上面使用了 `axios` ，所以需要运行

```
npm i axios
```

进行装包。 另外， `return dispatch =>` 这样的写法，让我们可以在 action creator 中发异步请求，这个需要 redux-thunk 生效才行，前面我已经安装好了这个包。这还不够，需要到 redux/store.js 中添加

```diff
diff --git a/client/src/redux/store.js b/client/src/redux/store.js
index 6ce0a49..a78944e 100644
--- a/client/src/redux/store.js
+++ b/client/src/redux/store.js
@@ -1,6 +1,8 @@
-import { createStore } from 'redux'
+import { createStore, applyMiddleware } from 'redux'
 import rootReducer from './reducers'
+import thunk from 'redux-thunk'
 
-const store = createStore(rootReducer)
+const middleware = [thunk]
+const store = createStore(rootReducer, applyMiddleware(...middleware))
 
 export default store
```

这样，redux-thunk 就能工作了。


保证服务器端代码处于启动状态，到浏览器中刷新一下 http://localhost:3000 ，这样前端代码就会发起向我们自己的服务器端的请求，但是被服务器端拒绝了。Chrome console 中报错：

```
Failed to load http://localhost:3008/bucket: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access.
```

问题出在没有 API 访问权限，解决方法就是添加 **跨域资源共享** ( cors ) 这个包。

所以到服务器端代码中，先来装包

```
cd server/
npm i cors
```

上面的 cors （就是 Cross Origin Resource Sharing 跨域资源共享） 就是 express 框架下专门解决跨域问题的。


然后打开 server/index.js 文件，稍作修改

```diff
diff --git a/server/index.js b/server/index.js
index 79f9635..34fa3e3 100644
--- a/server/index.js
+++ b/server/index.js
@@ -1,6 +1,7 @@
 const express = require('express')
+const cors = require('cors')
 const app = express()
 const apiRouter = require('./routes')
 
-app.use('/', apiRouter)
+app.use('/', cors(), apiRouter)
 app.listen(3008, () => console.log('running on port 3008...'))
```

也就是加载了 cors 中间件。这样跨域问题就解决了。

到浏览器再次刷新。可以看到 Chrome console 中果然可以打印成腾讯云上的 bucket 信息了。具体的文件名列表在 res.data.Contents 中，数据形式是：


```js
0 : {Key: "aa/", LastModified: "2017-10-28T13:24:30.000Z", ETag: """", Size: "0", Owner: {…}, …}
1 : {Key: "aa/aa.png", LastModified: "2017-10-28T13:26:10.000Z", ETag: ""8f1d18a9212115af3fea9b4051f6b81dfd1bc9cf"", Size: "687700", Owner: {…}, …}
2 : {Key: "bb/", LastModified: "2017-10-28T13:27:49.000Z", ETag: """", Size: "0", Owner: {…}, …}
3 : {Key: "bb/bb.png", LastModified: "2017-10-28T13:27:59.000Z", ETag: ""38673b617752d500152e6e0f8a988d6c893cfa52"", Size: "11186", Owner: {…}, …}
```

我们就把上面的这些信息保存到 redux 中，所以修改 actions/index.js 文件中的 `loadAllFiles` 函数为下面的内容：


```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index 14838a6..07fc4ad 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -4,7 +4,8 @@ export const loadAllFiles = () => {
   return dispatch => {
     axios.get('http://localhost:3008/bucket').then(
       res => {
-        console.log(res.data)
+        const allFiles = res.data.Contents
+        dispatch({ type: 'LOAD_ALL_FILES', allFiles })
       }
     )
   }
```

这样，等数据从服务器端拿到后，就会保存到 allFiles 变量中，接下来通过 `{ type: 'LOAD_ALL_FILES', allFiles}` 这个 action 的形式，发送给 reducer 。下面就来定义接受这些数据的 reducer 函数。

到 redux/reducers/index.js 中，把 `initState` 和 `case 'XXX'` 部分改为

```diff
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index 3808ec1..b2adef9 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -1,15 +1,14 @@
 const initState = {
-  allFiles: [
-    {
-      fileName: 'xxx'
-    }
-  ]
+  allFiles: []
 }
 
 const rootReducer = (state = initState, action) => {
   switch (action.type) {
-    case 'XXX':
-      return state
+    case 'LOAD_ALL_FILES':
+      return {
+        ...state,
+        allFiles: action.allFiles
+      }
     default:
       return state
   }
```

这样，action 中携带过来的 allFiles 数据就能真正的保存到状态树的 allFiles 字段了（ state.allFiles ）。同时由于 TableContainer 中订阅了 allFiles 字段，所以在 TableContainer 中也就可以拿到这些数据了。因为 TableContainer 中有

```js
console.log('TableContainer', this.props.allFiles)
```

allFiles 的数据会被打印到浏览器终端中。

### 总结

至此，数据从腾讯云的接口，到达了我们的 React 组件中。
