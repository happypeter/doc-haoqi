# 创建文件夹

创建新文件夹。


### 调通接口

仔细阅读[js-SDK的文档](https://cloud.tencent.com/document/product/436/11459#put-object)，会注意到**Put Object**小节里，有这么一句：

> 注意，Key(文件名) 不能以 / 结尾，否则会被识别为文件夹

那么，反其道而行之，我们就有了指定文件夹的方法。

注：这里有一个比较隐晦的问题需要注意，就是如果我们直接上传 `aa/aa.txt` 那么 aa/ 文件夹的确会被自动创建，但是这样有一个问题，就是在腾讯云后端只存在一个 `aa/aa.txt` 对象，没有单独的 `aa/` 文件夹对象。如果这样，类似我们在上一节删除文件的时候提过的，删除一个文件夹中的最后一个文件时，这个文件夹也会被删除，这个不是我们想要的结果。所以本节我们的做法是，先创建空文件夹 `aa/` 然后，在往里面上传文件，这样问题就可以避免了。


```diff
diff --git a/client/src/components/Main.js b/client/src/components/Main.js
index b8e2547..cd24309 100644
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
@@ -34,6 +35,7 @@ export default () => (
     >
       <LogoWrap />
       <DirMenuContainer />
+      <DirCreatorContainer />
     </Sider>
     <Layout>
       <Header style={{ height: `${headerHeight}px` }}>
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index a194d8f..27c35fd 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -98,3 +98,23 @@ export const removeFile = (record) => {
     )
   }
 }
+
+export const createDir = newDir => {
+  const params = {
+    Bucket : Settings.Bucket,
+    Region : Settings.Region,
+    Key : `${newDir}/`,
+    Body: 'empty',
+  }
+
+  return dispatch => {
+    cos.putObject(params, function(err, data) {
+      if(err) {
+        console.log(err);
+      } else {
+        console.log(data);
+        dispatch({ type: 'CREATE_DIR', newDir })
+      }
+    })
+  }
+}
```

这样，创建文件夹就成功了。

### 新文件夹显示到菜单栏

从腾讯云读下来的 Bucket 文件列表，是按照文件夹的字母顺序排列的。所以现在新建的文件夹也按照字母顺序传入 allFiles 数组内，同时把当前文件夹也设置为这个新文件夹，菜单栏上即可显示出来。


```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index 27c35fd..6a0f16e 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -99,11 +99,11 @@ export const removeFile = (record) => {
   }
 }

-export const createDir = newDir => {
+export const createDir = dir => {
   const params = {
     Bucket : Settings.Bucket,
     Region : Settings.Region,
-    Key : `${newDir}/`,
+    Key : `${dir}/`,
     Body: 'empty',
   }

@@ -113,7 +113,8 @@ export const createDir = newDir => {
         console.log(err);
       } else {
         console.log(data);
-        dispatch({ type: 'CREATE_DIR', newDir })
+        dispatch({ type: 'CREATE_DIR', dir })
+        dispatch(setCurrentDir(dir))
       }
     })
   }
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index 9d2674b..bc57d6e 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -18,6 +18,11 @@ const rootReducer = (state = initState, action) => {
         ...state,
         currentDir: action.dir
       }
+    case 'CREATE_DIR':
+      return {
+        ...state,
+        allFiles: insertNewDir(state.allFiles, action.dir)
+      }
     case 'ADD_FILE':
       return {
         ...state,
@@ -38,6 +43,13 @@ const rootReducer = (state = initState, action) => {
   }
 }

+const insertNewDir = (allFiles, dir) => {
+  return [
+    ...allFiles,
+    { Key: dir }
+  ]
+}
+
 export const getAllFiles = state => {
   return state.allFiles.filter(
     t => t.Key.split('/')[1]
```


### 展示组件和样式

把看见的部分都移动到展示组件中，并且写点 CSS 。


```diff
diff --git a/client/src/containers/DirCreatorContainer.js b/client/src/containers/DirCreatorContainer.js
index a50048a..e09e127 100644
--- a/client/src/containers/DirCreatorContainer.js
+++ b/client/src/containers/DirCreatorContainer.js
@@ -1,39 +1,23 @@
 import React, { Component } from 'react'
-import { Button } from 'antd'
 import { connect } from 'react-redux'
+import DirCreator from '../components/DirCreator'
 import {
   createDir
 } from '../redux/actions'

 class DirCreatorContainer extends Component {
-  state = {
-    newDir: ''
-  }

-  handleClick = e => {
-    e.preventDefault()
-    const { newDir } = this.state
-    this.props.createDir(newDir)
-    this.setState({
-      newDir: ''
-    })
-  }
-  handleChange = e => {
-    this.setState({
-      newDir: e.target.value
-    })
+  handleClick = (dir) => {
+    this.props.createDir(dir)
   }

   render () {
     return (
       <div>
-        <input value={this.state.newDir}
-          onChange={this.handleChange}
-        />
-        <Button onClick={this.handleClick} >添加</Button>
+        <DirCreator onClick={this.handleClick} />
       </div>
     )
   }
 }

-export default connect(null, { createDir})(DirCreatorContainer)
+export default connect(null, { createDir })(DirCreatorContainer)
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index 6a0f16e..7a19923 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -3,7 +3,6 @@ import Settings from '../../settings'
 import { ACTIVE, EXCEPTION, SUCCESS } from '../../constants/ProgressStatus'
 import cos from '../../lib/qcloud'

-
 const getFirstDir = allFiles => allFiles[0].Key.split('/')[0]

 export const loadAllFiles = () => {
```

新建展示组件：

```js
import React, { Component } from 'react'
import { Button, Input } from 'antd'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

const StyledButton = styled(Button)`
  margin-top: 10px;
`

class DirCreator extends Component {
  state = {
    newDir: ''
  }

  handleClick = e => {
    e.preventDefault()
    const { newDir } = this.state
    this.props.onClick(newDir)
    this.setState({
      newDir: ''
    })
  }

  handleChange = e => {
    this.setState({
      newDir: e.target.value
    })
  }

  render () {
    return (
      <Wrap>
        <Input value={this.state.newDir}
          onChange={this.handleChange}
        />
        <StyledButton
          type="primary"
          onClick={this.handleClick}
        >
          添加
        </StyledButton>
      </Wrap>
    )
  }
}

export default DirCreator
```


### 总结

创建文件夹，大功告成。
