# 创建文件夹

创建新文件夹。用一下[Javscript SDK](https://cloud.tencent.com/document/product/436/11459) 的 `cos.putObject` 接口，走一下 redux 整个流程，都是咱们轻车熟路的东西了。

### 添加样式

先把展示组件加上。

创建展示组件 DirCreator.js 

```diff
diff --git a/client/src/components/DirCreator.js b/client/src/components/DirCreator.js
new file mode 100644
index 0000000..c4ffd24
--- /dev/null
+++ b/client/src/components/DirCreator.js
@@ -0,0 +1,47 @@
+import React, { Component } from 'react'
+import { Button, Input } from 'antd'
+import styled from 'styled-components'
+
+const Wrap = styled.div`
+  display: flex;
+  flex-direction: column;
+  padding: 10px;
+`
+
+const StyledButton = styled(Button)`
+  margin-top: 10px;
+`
+
+class DirCreator extends Component {
+  state = {
+    newDir: ''
+  }
+
+  handleClick = e => {
+    e.preventDefault()
+  }
+
+  handleChange = e => {
+    this.setState({
+      newDir: e.target.value
+    })
+  }
+
+  render () {
+    return (
+      <Wrap>
+        <Input value={this.state.newDir}
+          onChange={this.handleChange}
+        />
+        <StyledButton
+          type="primary"
+          onClick={this.handleClick}
+        >
+          添加
+        </StyledButton>
+      </Wrap>
+    )
+  }
+}
+
+export default DirCreator
```

引入了蚂蚁设计的 `Input` 和 `Button` 进来，`Input` 采用了受控组件的形式来拿用户输入。代码虽然不少基本都是些样式，对照视频下方文字稿中代码一看便知。

创建一个空的容器组件

```diff
diff --git a/client/src/containers/DirCreatorContainer.js b/client/src/containers/DirCreatorContainer.js
new file mode 100644
index 0000000..d53a5a5
--- /dev/null
+++ b/client/src/containers/DirCreatorContainer.js
@@ -0,0 +1,15 @@
+import React, { Component } from 'react'
+import DirCreator from '../components/DirCreator'
+
+class DirCreatorContainer extends Component {
+
+  render () {
+    return (
+      <div>
+        <DirCreator />
+      </div>
+    )
+  }
+}
+
+export default DirCreatorContainer
```

别的什么都没干，就是导入了展示组件。

到 Main.js 中导入一下这个容器组件

```diff
diff --git a/client/src/components/Main.js b/client/src/components/Main.js
index 8013e43..721b53a 100644
--- a/client/src/components/Main.js
+++ b/client/src/components/Main.js
@@ -3,6 +3,7 @@ import './main.css'
 import FileTableContainer from '../containers/FileTableContainer'
 import DirMenuContainer from '../containers/DirMenuContainer'
 import UploaderContainer from '../containers/UploaderContainer'
+import DirCreatorContainer from '../containers/DirCreatorContainer'
 import styled from 'styled-components'
 import { Layout } from 'antd'
 const { Header, Sider, Content } = Layout
@@ -31,6 +32,7 @@ export default () => (
     >
       <LogoWrap />
       <DirMenuContainer />
+      <DirCreatorContainer />
     </Sider>
     <Layout>
       <Header style={{ height: `${headerHeight}px` }}>
```

放到了侧边栏之内。

到浏览器，可以看到 Input 和 Button 的已经显示了。

至此，《添加样式》部分就胜利完成了。

### 调通接口

仔细阅读[JS SDK的文档](https://cloud.tencent.com/document/product/436/11459#put-object)，会注意到**Put Object**小节里，有这么一句：

> 注意，Key(文件名) 不能以 / 结尾，否则会被识别为文件夹

那么，反其道而行之，就有了新建文件夹的方法。

这里有一个比较隐晦的问题需要注意，就是如果我们直接上传 `aa/aa.txt` 那么 aa 文件夹的确也会被自动创建。但是这样，在腾讯云只存在一个 `aa/aa.txt` 对象，没有单独的 `aa/` 文件夹对象。如果这样，删除一个文件夹中的最后一个文件时，这个文件夹也会被删除，这个不是我们想要的结果。所以本节我们的做法是，来专门创建空文件夹对象。

展示组件中，修改 handleClick

```diff
diff --git a/client/src/components/DirCreator.js b/client/src/components/DirCreator.js
index c4ffd24..d63c8b3 100644
--- a/client/src/components/DirCreator.js
+++ b/client/src/components/DirCreator.js
@@ -19,6 +19,11 @@ class DirCreator extends Component {
 
   handleClick = e => {
     e.preventDefault()
+    const { newDir } = this.state
+    this.props.onClick(newDir)
+    this.setState({
+      newDir: ''
+    })
   }
 
   handleChange = e => {
```

把用户输入传递给了容器组件。

容器组件中

```diff
diff --git a/client/src/containers/DirCreatorContainer.js b/client/src/containers/DirCreatorContainer.js
index d53a5a5..35f2a24 100644
--- a/client/src/containers/DirCreatorContainer.js
+++ b/client/src/containers/DirCreatorContainer.js
@@ -1,15 +1,22 @@
 import React, { Component } from 'react'
 import DirCreator from '../components/DirCreator'
+import {
+  createDir
+} from '../redux/actions'
+import { connect } from 'react-redux'
 
 class DirCreatorContainer extends Component {
+  handleClick = (dir) => {
+    this.props.createDir(dir)
+  }
 
   render () {
     return (
       <div>
-        <DirCreator />
+        <DirCreator onClick={this.handleClick} />
       </div>
     )
   }
 }
 
-export default DirCreatorContainer
+export default connect(null, { createDir })(DirCreatorContainer)
```

把文件夹传递给了 `createDir` 这个 Action 创建器。

actions/index.js 中来实现一下 `createDir`

```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index 5e79c63..41c8f7a 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -98,3 +98,22 @@ export const removeFile = (record) => {
     )
   }
 }
+
+export const createDir = dir => {
+  const params = {
+    Bucket : Settings.Bucket,
+    Region : Settings.Region,
+    Key : `${dir}/`,
+    Body: 'empty',
+  }
+
+  return dispatch => {
+    cos.putObject(params, function(err, data) {
+      if(err) {
+        console.log(err);
+      } else {
+        console.log(data);
+      }
+    })
+  }
+}
```

按照 `putObject` 文档，传递参数进来，其中 `Key` 也就是文件名这一项，最后以 `/` 结尾，意味着最后创建的会是一个文件夹。因为没有文件上传所以 `Body` 一项就不能传递文件对象了，但是也必须填一个无意义的字符串充数，不然会报错。

到浏览器，填写文件夹名，点按钮，终端中的输出可以看到创建文件夹就成功。但是界面上需要刷新一下，才能看到新文件夹。

至此，《调通接口》这部分就胜利完成了。

### 新文件夹显示到菜单栏

新建文件夹后，让菜单栏上直接显示出来，同时把新文件夹设置为当前文件夹。

到 actions/index.js 中，发起两个 action 

```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index 41c8f7a..33e1e2e 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -113,6 +113,8 @@ export const createDir = dir => {
         console.log(err);
       } else {
         console.log(data);
+        dispatch({ type: 'CREATE_DIR', dir })
+        dispatch(setCurrentDir(dir))
       }
     })
   }
```

一个是 `CREATE_DIR` 这个 action ，负责修改状态树，把新文件夹添加进来。另外一个是 `SET_CURRENT_DIR` 把当前文件夹切换为新文件夹。

reducer 中，只需要添加对 `CREATE_DIR` 的处理

```diff
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index dd4d614..74517ac 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -30,6 +30,14 @@ const rootReducer = (state = initState, action) => {
           t => t.Key !== action.key
         )
       }
+    case 'CREATE_DIR':
+      return {
+        ...state,
+        allFiles: [
+          ...state.allFiles,
+          { Key: action.dir }
+        ]
+      }
     default:
       return {
         ...state,
```

把 `{ Key: action.dir}` 添加到了 `allFiles` 数组中，跟数组中其他的元素比，少了不少信息，但是暂时也够用了。

浏览器中，新建一下，会发现表现完美。

至此，《新文件夹显示到菜单栏》就胜利完成。

### 总结

虽然又是走了一遍 redux 流程，但是整个过程还是让我感叹，有了 redux 的确代码能写得更加简单和有条理。

《创建文件夹》这一小节就胜利完成了。