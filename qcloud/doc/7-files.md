# 显示各自文件

点一下每一个菜单项，让右侧只显示这个文件夹里面的文件。

### 设置当前文件夹

首先要到 redux 的状态树中添加一个字段 currentDir ，也就是当前文件夹。currentDir 会在程序中发挥非常核心的作用。点菜单项，这一项就变成活跃项，对应的文件夹就是当前文件夹。

先到 reducers/index.js 中添加 currentDir

```diff
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index 92c37ba..13520e0 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -1,5 +1,6 @@
 const initState = {
-  allFiles: []
+  allFiles: [],
+  currentDir: ''
 }
 
 const rootReducer = (state = initState, action) => {
@@ -9,6 +10,11 @@ const rootReducer = (state = initState, action) => {
         ...state,
         allFiles: action.allFiles
       }
+    case 'SET_CURRENT_DIR':
+      return {
+        ...state,
+        currentDir: action.dir
+      }
     default:
       return state
   }
@@ -30,4 +36,6 @@ export const getDirNames = state => {
   return dirNames
 }
 
+export const getCurrentDir = state => state.currentDir
+
 export default rootReducer
```

`initState` 添加了 `currentDir` 字段， 初始值是空字符串。同时添加对 `SET_CURRENT_DIR` 这个 action 的响应，插一句哈，这就相当于对外提供了 **写** currentDir 的接口，而定义 `getCurrentDir` 则是提供了外界 **读** 这个字段的接口。

下面去组件中触发 action 。

先到 DirMenuContainer.js 

```diff
diff --git a/client/src/containers/DirMenuContainer.js b/client/src/containers/DirMenuContainer.js
index 2215124..25abc03 100644
--- a/client/src/containers/DirMenuContainer.js
+++ b/client/src/containers/DirMenuContainer.js
@@ -2,10 +2,11 @@ import React, { Component } from 'react'
 import DirMenu from '../components/DirMenu'
 import { getDirNames } from '../redux/reducers'
 import { connect } from 'react-redux'
+import { setCurrentDir } from '../redux/actions'
 
 class DirMenuContainer extends Component {
   handleClick = e => {
-    console.log(e.key)
+    this.props.dispatch(setCurrentDir(e.key))
   }
   render () {
     const { dirNames } = this.props
```

再到 redux/actions/index.js 添加 setCurrentDir 这个 action 创建器

```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index 1cf285e..c1a0e27 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -11,3 +11,8 @@ export const loadAllFiles = () => {
     )
   }
 }
+
+export const setCurrentDir = (dir) => ({
+  type: 'SET_CURRENT_DIR',
+  dir
+})
```

虽然使用了 redux-thunk ，但是有些 action 创建器我们还是按照老样子用，因为根本就没有异步操作么。
  
界面中去点击菜单项，上面的 action 一旦被发出，reducer 就被触发了。

通过 redux-logger 在 console 中的输出

```js
 next state {allFiles: Array(4), currentDir: "bb"}
```

可以看到 store 中的 `currentDir` 已经修改成功了。

这样《设置当前文件夹》这部分就胜利完成。

### 显示各自文件

每次点击一个菜单项，右侧只显示这个文件夹中的文件。

首先要到 reducer 中添加一个从所有文件中筛选出当前文件夹中文件的的函数。

打开 redux/reducers/index.js 定义 getCurrentDirFiles 函数完成这个任务

```js
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index 13520e0..c7be222 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -38,4 +38,11 @@ export const getDirNames = state => {
 
 export const getCurrentDir = state => state.currentDir
 
+export const getCurrentDirFiles = state => {
+  return getOnlyFiles(state).filter(
+    t => {
+      return t.Key.split('/')[0] === getCurrentDir(state)
+    }
+  )
+}
 export default rootReducer
```

到 FileTableContainer.js 中，使用 `getCurrentDirFiles` 

```diff
diff --git a/client/src/containers/FileTableContainer.js b/client/src/containers/FileTableContainer.js
index 17fa27d..adb8b46 100644
--- a/client/src/containers/FileTableContainer.js
+++ b/client/src/containers/FileTableContainer.js
@@ -1,20 +1,19 @@
 import React, { Component } from 'react'
 import { connect } from 'react-redux'
-import { getOnlyFiles } from '../redux/reducers'
+import { getCurrentDirFiles } from '../redux/reducers'
 import FileTable from '../components/FileTable'
 
 class FileTableContainer extends Component {
   render () {
-    console.log('FileTableContainer', this.props.onlyFiles)
     return (
       <div>
-        <FileTable onlyFiles={this.props.onlyFiles} />
+        <FileTable currentDirFiles={this.props.currentDirFiles} />
       </div>
     )
   }
 }
 
 const mapStateToProps = state => ({
-  onlyFiles: getOnlyFiles(state)
+  currentDirFiles: getCurrentDirFiles(state)
 })
 export default connect(mapStateToProps)(FileTableContainer)
```

然后到 src/components/FileTable.js 中，改一下相关代码

```diff
diff --git a/client/src/components/FileTable.js b/client/src/components/FileTable.js
index 4ddd262..1969f5e 100644
--- a/client/src/components/FileTable.js
+++ b/client/src/components/FileTable.js
@@ -7,7 +7,7 @@ const tableColumns = [
     title: '文件名',
     dataIndex: 'Key',
     render: (text) => {
-      return <span>{text}</span>
+      return <span>{text.split('/')[1]}</span>
     }
   },
   {
@@ -19,10 +19,10 @@ const tableColumns = [
   }
 ]
 
-export default ({ onlyFiles }) => (
+export default ({ currentDirFiles }) => (
   <div>
     <Table columns={tableColumns}
-      dataSource={onlyFiles}
+      dataSource={currentDirFiles}
       rowKey={item => item.ETag}
       pagination={false}
       />
```

`<span>{text.split('/')[1]}</span>` 的作用是从文件名中去掉文件夹。

刷新页面，看到默认情况下，右侧显示无数据，这个下一部分咱们再修复。现在起码达成了，点菜单项，右侧确实看到文件名已经按照文件夹分别显示了。

至此，《显示各自文件》这部分就胜利完成。

### 设置默认的 currentDir

通过给 currentDir 设置默认值，解决上一步遗留的各种问题。

上一步做完，页面刷新之后，有明显的两个问题，第一个是右侧默认不会显示文件，第二个是默认没有任何菜单项被选中。

先来解决第一个问题。右侧显示为空，是因为页面刷新后 currentDir 依然是空字符串。解决方案就是，在刷新页面的一刹那，去触发一个 action ，从而设置一下 currentDir 。

打开 redux/actions/index.js ，添加发出 action 的代码

```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index c1a0e27..c338985 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -1,5 +1,7 @@
 import axios from 'axios'
 
+const getFirstDir = allFiles => allFiles[0].Key.split('/')[0]
+
 export const loadAllFiles = () => {
   return dispatch => {
     axios.get('http://localhost:3008/bucket').then(
@@ -7,6 +9,7 @@ export const loadAllFiles = () => {
         console.log(res.data)
         const allFiles = res.data.Contents
         dispatch({ type: 'LOAD_ALL_FILES', allFiles })
+        dispatch(setCurrentDir(getFirstDir(allFiles)))
       }
     )
   }

```

页面刷新时，会执行到 `loadAllFiles` 所以我们就在异步请求完成，拿到 allFiles 数据之后，顺势，来设置 currentDir ，设置的值就是文件列表中第一个文件夹。

这样，再去刷新页面，右侧就会只显示第一个文件夹中的文件了。

但是，左侧菜单项没有选中，这个也是挺别扭的，这个就是前面所说的第二个问题了，马上来修改。

打开 DirMenuContainer.js ，导入 currentDir 

```diff
diff --git a/client/src/containers/DirMenuContainer.js b/client/src/containers/DirMenuContainer.js
index 25abc03..f73df30 100644
--- a/client/src/containers/DirMenuContainer.js
+++ b/client/src/containers/DirMenuContainer.js
@@ -3,17 +3,19 @@ import DirMenu from '../components/DirMenu'
 import { getDirNames } from '../redux/reducers'
 import { connect } from 'react-redux'
 import { setCurrentDir } from '../redux/actions'
+import { getCurrentDir } from '../redux/reducers'
 
 class DirMenuContainer extends Component {
   handleClick = e => {
     this.props.dispatch(setCurrentDir(e.key))
   }
   render () {
-    const { dirNames } = this.props
+    const { dirNames, currentDir } = this.props
     return (
       <div>
         <DirMenu
           dirNames={dirNames}
+          currentDir={currentDir}
           onClick={this.handleClick}
         />
       </div>
@@ -22,7 +24,8 @@ class DirMenuContainer extends Component {
 }
 
 const mapStateToProps = state => ({
-  dirNames: getDirNames(state)
+  dirNames: getDirNames(state),
+  currentDir: getCurrentDir(state)
 })
 
 export default connect(mapStateToProps)(DirMenuContainer)
```

拿到 redux 中的当前文件夹数据，并传递给展示组件使用。

再到展示组件 DirMenu.js 中，使用当前文件夹

```diff
diff --git a/client/src/components/DirMenu.js b/client/src/components/DirMenu.js
index a1b908a..b62a956 100644
--- a/client/src/components/DirMenu.js
+++ b/client/src/components/DirMenu.js
@@ -1,10 +1,11 @@
 import React from 'react'
 import { Menu, Icon } from 'antd'
 
-export default ({ onClick, dirNames }) => (
+export default ({ onClick, dirNames, currentDir }) => (
   <Menu
     mode="inline"
     onClick={onClick}
+    selectedKeys={[currentDir]}
   >
     {
       dirNames.map(
```

通过设置 `selectedKeys` 为 `[currentDir]`，这样就可以保证刷新的时候，当前文件夹对应的菜单项处于活跃状态。注意蚂蚁设计文档上有说明 `selectedKeys` 的参数类型是数组。

浏览器刷新一下，可以看到默认第一个菜单项就被选中了。

至此，《设置默认的 currentDir》这部分就胜利完成了。

### 总结

到这里，《显示各自文件》这一小节就完成了。每次点菜单项，右侧的就只显示对应文件夹中的文件。

本小节也是第一章《读 Bucket 中的文件》的最后一个小节。我们也来顺便回顾一下本章都做了些什么？

本章实现了用蚂蚁设计的组件来展示从腾讯云的 bucket 读出来的文件列表。通过菜单导航栏的使用，用户可以以文件夹为单位来查看文件内容。后端代码实现了自己的 express 服务器，搭建了 API ，前端写了不少 redux 相关的代码。好，这一章就到这里。下一章见！
