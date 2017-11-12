# 导航菜单中展示所有文件夹

后面的思路是把来自不同文件夹的文件进行分组，按照文件夹为单位进行导航。本节先完成一部分功能，使用 [导航菜单组件](https://ant.design/components/menu-cn/) 来显示出 store 中保存的所有文件夹。

### 安装 redux-logger

安装 redux-logger 把每次状态值的改变都打印到 Chrome console 里，从而大大方便调试。

到 client 文件夹内，先装包：

```
npm i redux-logger
```

这样 redux-logger 包装就好了。

然后到 store.js 之中使用这个包

```diff
diff --git a/client/src/redux/store.js b/client/src/redux/store.js
index a78944e..c0233ba 100644
--- a/client/src/redux/store.js
+++ b/client/src/redux/store.js
@@ -2,7 +2,12 @@ import { createStore, applyMiddleware } from 'redux'
 import rootReducer from './reducers'
 import thunk from 'redux-thunk'
 
-const middleware = [thunk]
-const store = createStore(rootReducer, applyMiddleware(...middleware))
+const middlewares = [thunk]
+
+if (process.env.NODE_ENV === `development`) {
+  middlewares.push(logger)
+}
+
+const store = createStore(rootReducer, applyMiddleware(...middlewares))
 
 export default store
```

`process.env.NODE_ENV === 'development'` 这个判断条件保正了只有在开发模式下，才会启用 logger 。

这样，刷新页面， console 中可以看到一些彩色的内容：

```js
{type: "LOAD_ALL_FILES", allFiles: Array(4)}

next state
{allFiles: Array(4)}
```

可以看到发出了哪些 action ，以及更新前后的状态树。

这样，安装 redux-logger 这一部分就结束了。

### 使用 Menu 组件

分别添加 DirMenuContainer 和 DirMenu 组件，先把蚂蚁设计的 Menu 组件跑起来。

先来添加容器组件 src/containers/DirMenuContainer.js

```js
import React, { Component } from 'react'
import DirMenu from '../components/DirMenu'

class DirMenuContainer extends Component {
  render () {
    return (
      <div>
        <DirMenu />
      </div>
    )
  }
}

export default DirMenuContainer
```

没有什么内容，只是引用了展示组件。下面就写对应的展示组件 DirMenu.js

```js
import React from 'react'
import { Menu } from 'antd'

export default () => (
  <Menu
    mode="inline"
  >
    <Menu.Item key="aa">aa</Menu.Item>
    <Menu.Item key="bb">bb</Menu.Item>
  </Menu>
)
```

按照 [Menu 文档](https://ant.design/components/menu-cn/) 的说明使用了一下导航菜单 Menu . `mode="inline"` 加上后，处于活跃状态的菜单项，右侧会有好看的蓝色边框。

最后，到 Main.js 中，添加对 DirMenuContainer 的使用：

```diff
diff --git a/client/src/components/Main.js b/client/src/components/Main.js
index 70da34e..026339e 100644
--- a/client/src/components/Main.js
+++ b/client/src/components/Main.js
@@ -1,6 +1,7 @@
 import React from 'react'
 import './main.css'
 import FileTableContainer from '../containers/FileTableContainer'
+import DirMenuContainer from '../containers/DirMenuContainer'
 import styled from 'styled-components'
 import { Layout } from 'antd'
 const { Header, Sider, Content } = Layout
@@ -28,13 +29,14 @@ export default () => (
       }}
     >
       <LogoWrap />
+      <DirMenuContainer />
     </Sider>
```

就是让菜单显示在 `LogoWrap` 组件的下面。

到页面中点击菜单项，效果美观，只是没有实际功能。

至此，使用 Menu 组件这一部分就胜利完成。

### 添加导航功能

点菜单项，来执行一个函数，在函数中完成导航功能。

到 src/containers/DirMenuContainer.js 中添加

```diff
diff --git a/client/src/containers/DirMenuContainer.js b/client/src/containers/DirMenuContainer.js
index 5e2035e..33a12b2 100644
--- a/client/src/containers/DirMenuContainer.js
+++ b/client/src/containers/DirMenuContainer.js
@@ -2,10 +2,13 @@ import React, { Component } from 'react'
 import DirMenu from '../components/DirMenu'
 
 class DirMenuContainer extends Component {
+  handleClick = e => {
+    console.log(e.key)
+  }
   render () {
     return (
       <div>
-        <DirMenu />
+        <DirMenu onClick={this.handleClick}/>
       </div>
     )
   }

```

上面的 handleClick 的参数 e 是从展示组件中传过来的。

到展示组件 DirMenu.js 中做如下修改

```diff
diff --git a/client/src/components/DirMenu.js b/client/src/components/DirMenu.js
index 4587e63..d16f313 100644
--- a/client/src/components/DirMenu.js
+++ b/client/src/components/DirMenu.js
@@ -1,9 +1,10 @@
 import React from 'react'
 import { Menu } from 'antd'
 
-export default () => (
+export default ({ onClick }) => (
   <Menu
     mode="inline"
+    onClick={onClick}
   >
     <Menu.Item key="aa">aa</Menu.Item>
     <Menu.Item key="bb">bb</Menu.Item>
```

每次点 `Menu.Item` 也就是菜单项，父组件传递过来 `onClick` 就会被触发。

到浏览器中试一下。可以看到，被点击的这一项对应的 `key` 值，就会显示到 console 中。

### 菜单中显示文件夹

到这里，来梳理一下思路。可以让一个菜单项对应一个我们的文件列表中的文件夹， `key` 和要显示的文字赋值为文件夹名。这样，后续每次点菜单项，就可以直接在 handleClick 中拿到文件夹。

首先要到 DirMenuContainer.js 中，添加

```diff
diff --git a/client/src/containers/DirMenuContainer.js b/client/src/containers/DirMenuContainer.js
index 33a12b2..378e5bd 100644
--- a/client/src/containers/DirMenuContainer.js
+++ b/client/src/containers/DirMenuContainer.js
@@ -1,17 +1,26 @@
 import React, { Component } from 'react'
 import DirMenu from '../components/DirMenu'
+import { getDirNames } from '../redux/reducers'
+import { connect } from 'react-redux'
 
 class DirMenuContainer extends Component {
   handleClick = e => {
     console.log(e.key)
   }
   render () {
+    const { dirNames } = this.props
     return (
       <div>
-        <DirMenu onClick={this.handleClick}/>
+        <DirMenu
+          dirNames={dirNames}
+          onClick={this.handleClick}
+        />
       </div>
     )
   }
 }
 
+const mapStateToProps = state => ({
+  dirNames: getDirNames(state)
+})
+
-export default DirMenuContainer
+export default connect(mapStateToProps)(DirMenuContainer)
```

`getDirNames` 函数拿到全部的文件夹名，交给展示组件去显示。

到 redux/reducers/index.js 添加 `getDirNames` 的定义：

```diff
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index fdd9417..92c37ba 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -21,4 +21,13 @@ export const getOnlyFiles = state => {
   )
 }
 
+export const getDirNames = state => {
+  const dirNames = getAllFiles(state).reduce((arr, t) => {
+    const dirName = t.Key.split('/')[0]
+    if (arr.indexOf(dirName) === -1) { arr.push(dirName)}
+    return arr
+  }, [])
+  return dirNames
+}
+
 export default rootReducer
```

代码用了 reduce 方法，作用其实很简单：从所有文件列表中，筛选出文件夹名，组成一个数组返回。

最后一步，到展示组件 DirMenu.js 中，显示这些文件夹

```diff
diff --git a/client/src/components/DirMenu.js b/client/src/components/DirMenu.js
index d16f313..a1b908a 100644
--- a/client/src/components/DirMenu.js
+++ b/client/src/components/DirMenu.js
@@ -1,12 +1,20 @@
 import React from 'react'
-import { Menu } from 'antd'
+import { Menu, Icon } from 'antd'
 
-export default ({ onClick }) => (
+export default ({ onClick, dirNames }) => (
   <Menu
     mode="inline"
     onClick={onClick}
   >
-    <Menu.Item key="aa">aa</Menu.Item>
-    <Menu.Item key="bb">bb</Menu.Item>
+    {
+      dirNames.map(
+        t => (
+          <Menu.Item key={t}>
+            <Icon type="folder" />
+            {t}
+          </Menu.Item>
+        )
+      )
+    }
   </Menu>
 )
```

map 了一下数组，还给每个菜单项添加了一个文件夹的图标。

到页面上查看，可以看到每个菜单项都是由文件夹图标后面跟一个文件夹组成。点一下导航项，就可以在执行的函数中打印出这个文件夹的名字。


### 总结

《导航菜单中展示所有文件夹》这一小节胜利完成。本节达成的效果是，导航菜单中显示了所有的文件夹。
