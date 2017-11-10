本节就是真的来写页面了，引入[蚂蚁设计](https://ant.design/) 使用 Table 组件来美观的展示文件列表。

### 文件改名

真正使用 Table 之前要处理一个小问题，也就是要把 TableContainer 改一下名字，因为按照常规 TableContainer 对应的展示组件就应该叫 Table 了，跟 antd 的这个我们要使用的组件重名。

所以我们先把 TableContainer.js 改一下名字为 FileTableContainer.js ，里面的内容也调整一下：

```diff
diff --git a/client/src/containers/FileTableContainer.js b/client/src/containers/FileTableContainer.js
index 79e6a5b..31ed512 100644
--- a/client/src/containers/FileTableContainer.js
+++ b/client/src/containers/FileTableContainer.js
@@ -2,12 +2,12 @@ import React, { Component } from 'react'
 import { connect } from 'react-redux'
 import { getAllFiles } from '../redux/reducers'
 
-class TableContainer extends Component {
+class FileTableContainer extends Component {
   render () {
-    console.log('TableContainer', this.props.allFiles)
+    console.log('FileTableContainer', this.props.allFiles)
     return (
       <div>
-        TableContainer
+        FileTableContainer
       </div>
     )
   }
@@ -16,4 +16,4 @@ class TableContainer extends Component {
 const mapStateToProps = state => ({
   allFiles: getAllFiles(state)
 })
-export default connect(mapStateToProps)(TableContainer)
+export default connect(mapStateToProps)(FileTableContainer)
```

同时到 Main.js 也要改一下名字：

```diff
diff --git a/client/src/components/Main.js b/client/src/components/Main.js
index 068a271..3dc0b50 100644
--- a/client/src/components/Main.js
+++ b/client/src/components/Main.js
@@ -1,6 +1,6 @@
 import React from 'react'
 import './main.css'
-import TableContainer from '../containers/TableContainer'
+import FileTableContainer from '../containers/FileTableContainer'
 import styled from 'styled-components'
 
 const MainWrap = styled.div`
@@ -9,6 +9,6 @@ const MainWrap = styled.div`
 `
 export default () => (
   <MainWrap>
-    <TableContainer />
+    <FileTableContainer />
   </MainWrap>
 )
```

到这里，改名完成，到浏览器查看，程序能够正常运行即可。

### antd 大块布局

先使用 [Layout](https://ant.design/components/layout-cn/) 来把页面大布局做好。

安装 antd （也就是蚂蚁设计的 npm 包），然后使用一下其中的 Layout 组件。

```
npm i antd
```

这样，强大的蚂蚁设计组件库就免费到手。

到 Main.js 做一下修改，最终改成这样：

```diff
diff --git a/client/src/components/Main.js b/client/src/components/Main.js
index 3dc0b50..24874ff 100644
--- a/client/src/components/Main.js
+++ b/client/src/components/Main.js
@@ -2,13 +2,33 @@ import React from 'react'
 import './main.css'
 import FileTableContainer from '../containers/FileTableContainer'
 import styled from 'styled-components'
+import { Layout } from 'antd'
+const { Header, Sider, Content } = Layout
 
-const MainWrap = styled.div`
-  min-height: 100vh;
-  background: #00bcd4;
+const headerHeight = 70
+
+const LogoWrap = styled.div`
+  height: ${headerHeight}px;
+  background-color: #ececec;
 `
+
 export default () => (
-  <MainWrap>
-    <FileTableContainer />
-  </MainWrap>
+  <Layout
+    style={{ height: '100vh' }}
+  >
+    <Sider
+      style={{
+        background: '#fff'
+      }}
+    >
+      <LogoWrap />
+    </Sider>
+    <Layout>
+      <Header style={{ height: `${headerHeight}px` }}>
+      </Header>
+      <Content>
+        <FileTableContainer />
+      </Content>
+    </Layout>
+  </Layout>
 )
diff --git a/client/src/components/main.css b/client/src/components/main.css
index f2f7776..f8b8e40 100644
--- a/client/src/components/main.css
+++ b/client/src/components/main.css
@@ -1,3 +1,5 @@
+@import '~antd/dist/antd.css';
+
 body {
   margin: 0;
 }
```

没有实质性的功能，就是用 `Layout` 组件实现了一个带侧边栏（ `Sider` ）的布局。同时侧边栏中未来放菜单，如果顶头不好看，所以加一个 `<LogoWrap />` 占据顶部。页面中看一下效果吧。

然后，到我们存放全局 css 的文件 main.css 中添加

```css
@import '~antd/dist/antd.css';
```

注意末尾的 `;` 不能删。

这样，浏览器中可以看到一个灰黑白三色的布局了。

### 使用 antd 的 Table 组件

接下来添加 FileTableContainer.js 对应的展示组件。

先来修改一下 FileTableContainer.js ，添加对展示组件的导入和使用


```diff
diff --git a/client/src/containers/FileTableContainer.js b/client/src/containers/FileTableContainer.js
index 31ed512..d25d4ce 100644
--- a/client/src/containers/FileTableContainer.js
+++ b/client/src/containers/FileTableContainer.js
@@ -1,19 +1,20 @@
 import React, { Component } from 'react'
 import { connect } from 'react-redux'
-import { getAllFiles } from '../redux/reducers'
+import { getOnlyFiles } from '../redux/reducers'
+import FileTable from '../components/FileTable'
 
 class FileTableContainer extends Component {
   render () {
-    console.log('FileTableContainer', this.props.allFiles)
+    console.log('FileTableContainer', this.props.onlyFiles)
     return (
       <div>
-        FileTableContainer
+        <FileTable onlyFiles={this.props.onlyFiles} />
       </div>
     )
   }
 }
 
 const mapStateToProps = state => ({
-  allFiles: getAllFiles(state)
+  onlyFiles: getOnlyFiles(state)
 })
 export default connect(mapStateToProps)(FileTableContainer)
```

除了导入使用展示组件。这里还做了另外一个修改，就是把 `getAllFiles` 改成了 `getOnlyFiles` ，这是因为 store 中的本来数据是

```js
[
  {
    Key: 'cc/'
  },
  {
    Key: 'cc/cc.txt'
  },
  {
    Key: 'dd/'
  },
  {
    Key: 'dd/dd.txt'
  }
]
```

我现在需要把空文件夹从数组中除去。到 redux/reducers/index.js 中，添加 `getOnlyFiles` 的定义：

```diff
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index b2adef9..fdd9417 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -15,4 +15,10 @@ const rootReducer = (state = initState, action) => {
 }
 export const getAllFiles = state => state.allFiles
 
+export const getOnlyFiles = state => {
+  return state.allFiles.filter(
+    t => t.Key.split('/')[1]
+  )
+}
+
 export default rootReducer
```

这样，getOnlyFiles(state) 最终得到的数据中就不会有那些空文件夹了，也就是最终得到的数据就变为：


```js
[
  {
    Key: 'cc/cc.txt'
  },
  {
    Key: 'dd/dd.txt'
  }
]
```

这样就符合我们在组件中使用的要求了。

接下来添加展示组件 src/components/FileTable.js 

先来粘贴这些内容进来：

```js
import React from 'react'
import { Table } from 'antd'

export default ({ onlyFiles }) => (
  <div>
    <Table columns={tableColumns}
      dataSource={onlyFiles}
      rowKey={item => item.ETag}
      pagination={false}
      />
  </div>
)
```

代码是对蚂蚁设计的 Table 组件的使用。

首先第一个属性

```
columns={tableColumns}
```

column 是列的意思，所以这一行定义了这个表单要有多少列，每一列都显示个啥。这个咱们稍后再细说。

再来看第二个属性

```js
dataSource={onlyFiles}
```

把父组件传递过来的 onlyFiles 属性，传给了 dataSource （中文意思是数据源）

第三个

```js
rowKey={item => item.ETag}
```

 `rowKey` 来保证 Table 每一行都有一个独立的 key ，这是使用 Table 组件的要求。我们的数据中虽然没有 id ，但是有每个文件都有自己的 `ETag` 数据，都是独一无二的，恰好可以用在这里。

最后一个，也就是第四个属性

```js
pagination={false}
```

这个简单，就是不要分页。

说到最后了，到底图表显示成什么样，还是不知道，所以关键内容都在 tableColumns 变量的定义里了。代码里添加


```diff
diff --git a/client/src/components/FileTable.js b/client/src/components/FileTable.js
index 12ce681..4ddd262 100644
--- a/client/src/components/FileTable.js
+++ b/client/src/components/FileTable.js
@@ -1,6 +1,23 @@
 import React from 'react'
 import { Table } from 'antd'
+import moment from 'moment'
 
+const tableColumns = [
+  {
+    title: '文件名',
+    dataIndex: 'Key',
+    render: (text) => {
+      return <span>{text}</span>
+    }
+  },
+  {
+    title: '上传时间',
+    dataIndex: 'LastModified',
+    render: (text) => {
+      return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
+    }
+  }
+]
 
 export default ({ onlyFiles }) => (
   <div>
```

详细说说数据显示逻辑。前面我通过 `dataSource={onlyFiles}` 传递给 Table 组件的是一个对象数组。那么 render 函数的参数，也就是 `text` ，默认可以拿到数组中的一个对象。但是有 `dataIndex` 的设置，`text` 就变成对象里的某个属性的具体值了，例如 `dataIndex` 设置为 `Key` ，`text` 就会被赋值成对象的 `Key` 属性的值，下面 `LastModified` 情况一样。

`render` 函数中可以使用各种技巧对数据显示格式进行处理，例如，我们采用了大名鼎鼎的 [momentjs](https://momentjs.com/) 对时间显示格式做了调整。

想让代码不报错，需要安装 momentjs

```
npm i moment
```

包装好了。

至此，页面上就显示出文件列表了，这一节我们想做的主体功能也就完成了。

### 完善一下样式

到 src/components/Main.js 中添加下面的代码

```diff
diff --git a/client/src/components/Main.js b/client/src/components/Main.js
index 24874ff..70da34e 100644
--- a/client/src/components/Main.js
+++ b/client/src/components/Main.js
@@ -6,6 +6,12 @@ import { Layout } from 'antd'
 const { Header, Sider, Content } = Layout
 
 const headerHeight = 70
+const Wrap = styled.div`
+  background-color: #fff;
+  width: 95%;
+  margin: 20px auto;
+  padding: 20px;
+`
 
 const LogoWrap = styled.div`
   height: ${headerHeight}px;
@@ -27,7 +33,9 @@ export default () => (
       <Header style={{ height: `${headerHeight}px` }}>
       </Header>
       <Content>
-        <FileTableContainer />
+        <Wrap>
+          <FileTableContainer />          
+        </Wrap>
       </Content>
     </Layout>
   </Layout>
```

就是给 `FileTableContainer` 包裹了一层，`<Wrap>` 。

这样到页面中，Table i就美观的显示在一个白色背景上了。

### 总结

本节我们使用了蚂蚁设计的 Table 组件，美观的展示了文件列表。