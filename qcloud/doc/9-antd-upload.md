# 用蚂蚁设计提升 UE

来开始这节《用蚂蚁设计提升 UE》，使用 [蚂蚁设计的 Upload](https://ant.design/components/upload/) 组件，实现多文件的选择上传和拖拽上传，以及完成上传成功后自动弹出提示信息，并且列表上能立刻显示文件等这些细节。

### 使用 Upload 组件

使用 Upload 组件，帮助我们实现多文件同时上传，以及拖拽上传。

src/containers/UploadContainer.js 中添加展示组件的导入

```diff
diff --git a/client/src/containers/UploaderContainer.js b/client/src/containers/UploaderContainer.js
index 30f6a28..bcfe326 100644
--- a/client/src/containers/UploaderContainer.js
+++ b/client/src/containers/UploaderContainer.js
@@ -1,21 +1,21 @@
 import React, { Component } from 'react'
 import Settings from '../settings'
 import cos from '../lib/qcloud'
+import Uploader from '../components/Uploader'
 
 class UploaderContainer extends Component {
-  handleChange = (e) => {
-    const file = e.target.files[0]
+  handleChange = (info) => {
+    const file = info.file.originFileObj
     const params = {
       Bucket: Settings.Bucket,
       Region: Settings.Region,
-      Key: '/aa/peter.txt',
+      Key: `/aa/${file.name}`,
       Body: file
     }
-
     cos.sliceUploadFile(params, (err, data) => {
-      if(err) {
+      if (err) {
         console.log(err)
-      } else {
+      }else {
         console.log(data)
       }
     })
@@ -24,7 +24,7 @@ class UploaderContainer extends Component {
   render () {
     return (
       <div>
-        <input type="file" onChange={ this.handleChange } />
+        <Uploader onChange={this.handleChange} />
       </div>
     )
   }
```

Key 这次改成了 `aa/${file.name}` 可以在上传后保留原文件名。Body 要的 `File 对象` ， 在展示组件里的 Upload 组件也可以生成，通过 `info.file.originFileObj` 就可以拿到。Upload 比原来那个 input 强的地方是，第一支持拖拽，第二支持多文件同时上传。

创建展示组件 Uploader.js ，粘贴：

```js
import React, { Component } from 'react'
import { Upload, Icon } from 'antd'
const Dragger = Upload.Dragger

class Uploader extends Component {
  myCustormRequest = () => {
    console.log('avoid no action error')
  }

  handleChange = (info) => {
    this.props.onChange(info)
  }

  render () {
    const params = {
      multiple: true,
      showUploadList: false,
      onChange: this.handleChange,
      customRequest: this.myCustormRequest
    }
    return (
      <Dragger {...params}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
      </Dragger>
    )
  }
}

export default Uploader
```

使用了 Upload 组件的 Dragger 。各个参数的意义，在 [Upload 文档](https://ant.design/components/upload-cn/) 上都能找到，这里我补充解释一下：

- multiple 设置为 true ，因为我们需要能同时上传多个文件
- showUploadList 这个作用其实跟进度条类似，后面我们会给每个文件都加进度条，所以这个就多余了，设置为 false ，意思是不需要显示
- onChange 真正调用上传接口是在 `onChange` 的处理函数中。这个函数的特点是，如果我们同时选中多个文件上传，事件就会被触发多次。
- customRequest 蚂蚁设计的 Upload 组件，要求参数中的 `action` 一项必须填写，不然终端中就会报错。通过给参数中添加：customRequest 覆盖默认上传行为，可以把报错去掉。

好，Dragger 配置好了，浏览器中试一下，可以看到既可以点击上传，也可以拖拽上传。

至此，《使用 Upload 》组件这一部分就胜利完成了。

### 全局提示

用到蚂蚁的 message 组件，涉及到 Promise 的使用。

src/containers/UploaderContainer.js 中的加一下 Promise 。

```diff
diff --git a/client/src/containers/UploaderContainer.js b/client/src/containers/UploaderContainer.js
index bcfe326..624b923 100644
--- a/client/src/containers/UploaderContainer.js
+++ b/client/src/containers/UploaderContainer.js
@@ -9,16 +9,22 @@ class UploaderContainer extends Component {
       Body: file
     }
-    cos.sliceUploadFile(params, (err, data) => {
-      if (err) {
-        console.log(err)
-      }else {
-        console.log(data)
+    return new Promise (
+      (resolve, reject) => {
+        cos.sliceUploadFile(params, (err, data) => {
+          if (err) {
+            reject(file.name)
+            console.log(err)
+          }else {
+            resolve(file.name)
+            console.log(data)
+          }
+        })
       }
-    })
+    )
   }
 
   render () {
```

这里加  Promise 的目的就是不想在容器组件中直接使用 message 这样的展示性的组件。

到 Uploader.js 中就可以使用 Promise 了，把 handleChange 函数修改一下：

```diff
diff --git a/client/src/components/Uploader.js b/client/src/components/Uploader.js
index 2f9b4cf..31ff7db 100644
--- a/client/src/components/Uploader.js
+++ b/client/src/components/Uploader.js
@@ -1,5 +1,5 @@
 import React, { Component } from 'react'
-import { Upload, Icon } from 'antd'
+import { Upload, Icon, message } from 'antd'
 const Dragger = Upload.Dragger
 
 class Uploader extends Component {
@@ -8,7 +8,11 @@ class Uploader extends Component {
   }
 
   handleChange = (info) => {
-    this.props.onChange(info)
+    this.props.onChange(info).then(
+      fileName => message.success(`${fileName} 上传成功`)
+    ).catch(
+      fileName => message.error(`${fileName} 上传失败`)
+    )
   }
 
   render () {
```

这样，文件上传成功或者失败后，就会触发 message 组件。浏览器中试一下，就可以看到全局提示信息了。

至此，《全局提示》这一部分就胜利完成了。

### 上传到当前文件夹

来把文件上传到当前文件夹，

src/containers/UploaderContainer.js 需要拿到 currentDir

```diff
diff --git a/client/src/containers/UploaderContainer.js b/client/src/containers/UploaderContainer.js
index 624b923..8aeb11b 100644
--- a/client/src/containers/UploaderContainer.js
+++ b/client/src/containers/UploaderContainer.js
@@ -2,14 +2,17 @@ import React, { Component } from 'react'
 import Settings from '../settings'
 import cos from '../lib/qcloud'
 import Uploader from '../components/Uploader'
+import { getCurrentDir } from '../redux/reducers'
+import { connect } from 'react-redux'
 
 class UploaderContainer extends Component {
   handleChange = (info) => {
+    const { currentDir } = this.props
     const file = info.file.originFileObj
     const params = {
       Bucket: Settings.Bucket,
       Region: Settings.Region,
-      Key: `/aa/${file.name}`,
+      Key: `${currentDir}/${file.name}`,
       Body: file
     }
     return new Promise (
@@ -36,4 +39,8 @@ class UploaderContainer extends Component {
   }
 }
 
-export default UploaderContainer
+const mapStateToProps = state => ({
+  currentDir: getCurrentDir(state)
+})
+
+export default connect(mapStateToProps)(UploaderContainer)
```
关键改动就是 Key 的值中添加了 `currentDir` 。

浏览器中测试测试一下，导航菜单中选中一个文件夹，上传文件，文件会保存到该文件夹中。

至此，《上传到当前文件夹》这部分就胜利完成。

### 自动刷新文件列表

这一步要达成的效果：上传完毕，文件列表能自动刷新看到新文件。

src/containers/UploaderContainer.js 中添加触发 action 的语句

```diff
diff --git a/client/src/containers/UploaderContainer.js b/client/src/containers/UploaderContainer.js
index 8aeb11b..841fccb 100644
--- a/client/src/containers/UploaderContainer.js
+++ b/client/src/containers/UploaderContainer.js
@@ -4,15 +4,17 @@ import cos from '../lib/qcloud'
 import Uploader from '../components/Uploader'
 import { getCurrentDir } from '../redux/reducers'
 import { connect } from 'react-redux'
+import { addFile } from '../redux/actions'
 
 class UploaderContainer extends Component {
   handleChange = (info) => {
     const { currentDir } = this.props
     const file = info.file.originFileObj
+    const key = `${currentDir}/${file.name}`
     const params = {
       Bucket: Settings.Bucket,
       Region: Settings.Region,
-      Key: `${currentDir}/${file.name}`,
+      Key: key,
       Body: file
     }
     return new Promise (
@@ -23,6 +25,7 @@ class UploaderContainer extends Component {
             console.log(err)
           }else {
             resolve(file.name)
+            this.props.addFile(key)
             console.log(data)
           }
         })
@@ -43,4 +46,4 @@ const mapStateToProps = state => ({
   currentDir: getCurrentDir(state)
 })
-export default connect(mapStateToProps)(UploaderContainer)
+export default connect(mapStateToProps, { addFile })(UploaderContainer)
```

这样，每次上传成功，就会执行 addFile 这个 Action 创建器。

redux/actions/index.js 添加这个 Action 创建器。

```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index 4a744da..58ff483 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -19,3 +19,16 @@ export const setCurrentDir = dir => ({
   type: 'SET_CURRENT_DIR',
   dir
 })
+
+export const addFile = (filePath) => {
+  return dispatch => {
+    axios.get(Settings.bucketUrl).then(
+      res => {
+        const newFile = res.data.Contents.find(
+          t => t.Key === filePath
+        )
+        dispatch({ type: 'ADD_FILE', newFile })
+      }
+    )
+  }
+}
```

主要作用是发出 `ADD_FILE` 这个 Action 。既然，通过 `key` 变量，客户端直接就有文件路径，那么在 addFile 函数中为何还要在去服务器端请求一次数据呢？答案就是，在添加文件到 store 中的 `allFiles` 变量中时，我们不但需要文件路径，还需要其他各种信息，其中最关键的是 Etag 值，没有 Etag ，那么 FileTable 组件就不能正常运行。

redux/reducers/index.js 中的 rootReducer 内部添加对应的 reducer 代码

```diff
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index 55954dc..03ed890 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -15,6 +15,11 @@ const rootReducer = (state = initState, action) => {
         ...state,
         currentDir: action.dir
       }
+    case 'ADD_FILE':
+      return {
+        ...state,
+        allFiles: [...state.allFiles, action.newFile]
+      }
     default:
       return state
   }
```

这样，新文件就添加到状态树的 allFiles 数组中了。到页面上，可以看到文件列表也会在文件上传成功后，自动刷新。

至此，《自动刷新文件列表》这部分就胜利完成了。

### 总结

《用蚂蚁设计提升 UE》这一节就完工了。实际上传一个文件试一下，发现用户体验还是非常完美的，因为不管是全局提示还是文件列表自动刷新，都让用户行为得到了及时的反馈。