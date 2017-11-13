# 进度条

好的用户体验就是要对用户操作有及时反馈，这节来添加上传进度条。

### 通过接口读进度数据

参考 [Javscript SDK]( https://cloud.tencent.com/document/product/436/11459) 的 **分块上传任务操作** 。

在操作参数说明中，可以看到 onProgress 参数的说明：

>onProgress —— (Function) ： 上传文件的进度回调函数，回调参数为进度对象 progressData

到 src/containers/UploaderContainer.js 中，添加 onProgress

```diff
diff --git a/client/src/containers/UploaderContainer.js b/client/src/containers/UploaderContainer.js
index c955799..6ed71b0 100644
--- a/client/src/containers/UploaderContainer.js
+++ b/client/src/containers/UploaderContainer.js
@@ -17,7 +17,11 @@ class UploaderContainer extends Component {
       Bucket: Settings.Bucket,
       Region: Settings.Region,
       Key: key,
-      Body: file
+      Body: file,
+      onProgress: progressData => {
+        const percent = Math.round(progressData.percent*100)
+        console.log('onProgress', percent, file)
+      }
     }

     return new Promise (
```

`progressData` 返回的 percent 值是零点几几，根据后面组件中需要的，这里乘以一百。

这时，到页面上，同时选中两个或者多个文件上传，可以看到，新添加的打印语句可以不断的打印出上传百分比和它对应的文件。这里要注意的是 `progressData` 本身内部不包含文件名，所以后续操作进度条数据的时候，需要同时把 `precent` 和 `file` 值一块儿传递给处理函数。

这样，我们看到的是，展示进度条需要的必要数据就有了。后面的所有步骤都是为了展示这些数据了。

至此，《通过接口读进度数据》这部分就胜利完成。

### 新建进度条

来到 redux 中央状态树中定义一个状态叫 `progressBars` ，初始值给一个空数组，然后每次有文件上传，就往数组中添加一个进度条对象。

先到 UploaderContainer 组件中添加触发整个链条的函数，也就是 Action 创建器

```diff
diff --git a/client/src/containers/UploaderContainer.js b/client/src/containers/UploaderContainer.js
index 6ed71b0..ca381e6 100644
--- a/client/src/containers/UploaderContainer.js
+++ b/client/src/containers/UploaderContainer.js
@@ -2,7 +2,10 @@ import React, { Component } from 'react'
 import Settings from '../settings'
 import cos from '../lib/qcloud'
 import Uploader from '../components/Uploader'
-import { addFile } from '../redux/actions'
+import {
+  addFile,
+  addProgressBar
+} from '../redux/actions'
 import { getCurrentDir } from '../redux/reducers'
 import { connect } from 'react-redux'

@@ -12,6 +15,7 @@ class UploaderContainer extends Component {
   handleChange = info => {
     const { currentDir } = this.props
     const file = info.file.originFileObj
+    this.props.addProgressBar(file)
     const key = `${currentDir}/${file.name}`
     const params = {
       Bucket: Settings.Bucket,
@@ -52,4 +56,7 @@ const mapStateToProps = state => ({
   currentDir: getCurrentDir(state)
 })
 -export default connect(mapStateToProps, { addFile })(UploaderContainer)
+export default connect(mapStateToProps, {
+  addFile,
+  addProgressBar
+})(UploaderContainer)
```

创建器名称叫 `addProgressBar` 。

接下来到 actions/index.js 中，实现创建器代码

```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index c90a05d..99022da 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -32,3 +32,18 @@ export const addFile = (filePath) => {
     )
   }
 }
+
+export const addProgressBar = file => {
+  const progressBar = {
+    percent: 0,
+    name: file.name,
+    status: 'normal',
+    uid: file.uid,
+  }
+  return dispatch => {
+    dispatch({
+      type: 'ADD_PROGRESS_BAR',
+      progressBar
+    })
+  }
+}
```

给 progressBar 设置了四项初始值：

- percent 这个不用说，百分比数据，注意数据类型是 number 不是 string，未来要传递给[蚂蚁设计的 Progress 组件](https://ant.design/components/progress-cn/)
- name 就是文件名，这个要保存，不然不能确进度属于哪个文件
- status 状态，可选：success exception active ，参考 [Progress 组件](https://ant.design/components/progress-cn/) 文档
- uid 唯一 id ，后面筛选信息的时候用得着

上面这四项信息组成的对象，就代表一个进度条，会被添加到 progressBars 数组中。

下面就要写 reducer 了，由于 progressBars 相关的 reducers 代码不少，为了不让 rootReducer 看上去过于臃肿，所以单独新建一个文件 reducers/progressBars.js 来写 progressBars 相关代码

```js
const progressBars = (state, action) => {
  switch (action.type) {
    case 'ADD_PROGRESS_BAR':
      console.log('ADD_PROGRESS_BAR', state, action)
      return [...state, action.progressBar]
    default:
      return state
  }
}

export default progressBars
```

添加新文件的进度条进来。

reducers/index.js 中使用 progressBars.js 文件

```diff
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index 8df6f98..5c92876 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -1,6 +1,9 @@
+import progressBars from './progressBars'
+
 const initState = {
   allFiles: [],
-  currentDir: ''
+  currentDir: '',
+  progressBars: []
 }

 const rootReducer = (state = initState, action) => {
@@ -21,7 +24,10 @@ const rootReducer = (state = initState, action) => {
         allFiles: [...state.allFiles, action.newFile]
       }
     default:
-      return state
+      return {
+        ...state,
+        progressBars: progressBars(state.progressBars, action)
+      }
   }
 }
```

`rootReducer` 中默认没有 ProgressBar 相关语句，而是到 default 部分，把 action 和状态传递给 progressBars 文件去处理。

浏览器中，页面上我们选择一个或者多个文件进行上传，就可以看到终端中 redux-logger 打印出的信息

```js
action     {type: "ADD_FILE", newFile: {…}}
redux-logger.js:1  next state {allFiles: Array(20), currentDir: "aa", progressBars: Array(1)}
```

可以看到，新的 progressBar 数据已经成功添加到数组中了。

至此，《新建进度条》这部分就胜利完成。

### 更新上传进度

文件上传过程中，腾讯的 `cos.sliceUploadFile` 接口会多次触发 `onProgress` 事件，源源不断的把最新的 percent 值传递过来，这部分要做的就是更新 percent 值到 redux 状态树中的 progressBars 字段。

UploaderContainer 组件中要执行一个 action 创建器，叫做 setProgressPercent 

```diff
diff --git a/client/src/containers/UploaderContainer.js b/client/src/containers/UploaderContainer.js
index ca381e6..7da402d 100644
--- a/client/src/containers/UploaderContainer.js
+++ b/client/src/containers/UploaderContainer.js
@@ -4,7 +4,8 @@ import cos from '../lib/qcloud'
 import Uploader from '../components/Uploader'
 import {
   addFile,
-  addProgressBar
+  addProgressBar,
+  setProgressPercent
 } from '../redux/actions'
 import { getCurrentDir } from '../redux/reducers'
 import { connect } from 'react-redux'
@@ -24,7 +25,7 @@ class UploaderContainer extends Component {
       Body: file,
       onProgress: progressData => {
         const percent = Math.round(progressData.percent*100)
-        console.log('onProgress', percent, file)
+        this.props.setProgressPercent(percent, file)
       }
     }

@@ -58,5 +59,6 @@ const mapStateToProps = state => ({

 export default connect(mapStateToProps, {
   addFile,
-  addProgressBar
+  addProgressBar,
+  setProgressPercent
 })(UploaderContainer)
 ```

每次 onProgress 事件被触发，`setProgressPercent` 都会执行一次。

到 actions/index.js 中，来实现 setProgressPercent 

```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index 99022da..3f9e225 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -47,3 +47,13 @@ export const addProgressBar = file => {
     })
   }
 }
+
+export const setProgressPercent = (percent, file) => {
+  return dispatch => {
+    dispatch({
+      type: 'SET_PROGRESS_PERCENT',
+      percent,
+      file
+    })
+  }
+}
```

把 `file` 变量传递给 reducer，目的就是确认要更新的进度到底是哪一个文件的。

到 reducer 代码中， `file` 的作用就能体现出来了

```diff
diff --git a/client/src/redux/reducers/progressBars.js b/client/src/redux/reducers/progressBars.js
index 6bdcbfc..29eca88 100644
--- a/client/src/redux/reducers/progressBars.js
+++ b/client/src/redux/reducers/progressBars.js
@@ -3,6 +3,13 @@ const progressBars = (state, action) => {
     case 'ADD_PROGRESS_BAR':
       console.log('ADD_PROGRESS_BAR', state, action)
       return [...state, action.progressBar]
+    case 'SET_PROGRESS_PERCENT':
+      return state.map(t => {
+        if (t.uid === action.file.uid) {
+          return { ...t, percent: action.percent}
+        }
+        return t
+      })
     default:
       return state
   }
```

通过 file 的 `uid` 找到对应文件，并更新 percent 值。

到页面中测试，可以看到终端中不断可以打印出 store 中的 progressBars 的值，进度 percent 不断被更新。

至此，《更新上传进度》这一部分就完成了。

### 使用 Progress 组件

上一步得到的可以不断更新的 progressBars 数据，传递给 [蚂蚁设计的 Progress 进度条组件](https://ant.design/components/progress-cn/)，就可以美观的显示进度条出来了。

到 UploaderContainer.js 中，导入一个展示组件 ProgressBars

```diff
diff --git a/client/src/containers/UploaderContainer.js b/client/src/containers/UploaderContainer.js
index 5579cf4..5aed3b4 100644
--- a/client/src/containers/UploaderContainer.js
+++ b/client/src/containers/UploaderContainer.js
@@ -2,8 +2,12 @@ import React, { Component } from 'react'
 import Settings from '../settings'
 import cos from '../lib/qcloud'
 import Uploader from '../components/Uploader'
-import { getCurrentDir } from '../redux/reducers'
+import {
+  getCurrentDir,
+  getProgressBars
+} from '../redux/reducers'
 import { connect } from 'react-redux'
+import ProgressBars from '../components/ProgressBars'
 import {
   addFile,
   addProgressBar,
@@ -43,16 +47,19 @@ class UploaderContainer extends Component {
   }
 
   render () {
+    const { progressBars } = this.props
     return (
       <div>
         <Uploader onChange={this.handleChange} />
+        <ProgressBars progressBars={progressBars} />
       </div>
     )
   }
 }
 
 const mapStateToProps = state => ({
-  currentDir: getCurrentDir(state)
+  currentDir: getCurrentDir(state),
+  progressBars: getProgressBars(state)
 })
 
 export default connect(mapStateToProps, {
```

把状态树中的 progressBars 数据传递给这个展示组件去显示。

到 reducers 文件中，定义 getProgressBars 函数

```diff
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index 5c92876..905804e 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -55,5 +55,6 @@ export const getCurrentDirFiles = state => {
 }

 export const getCurrentDir = state => state.currentDir
+export const getProgressBars = state => state.progressBars

 export default rootReducer
```

没有做什么处理，直接返回 progressBars 数据而已。

添加展示组件 ProgressBars.js ：

```js
import React from 'react'
import { Progress } from 'antd'

export default ({ progressBars }) => (
  <div>
    {
      progressBars.map(
        t => {
          return (
            <div key={t.uid}>
              {t.name}
              <Progress percent={t.percent} status={t.status} />
            </div>
          )
        }
      )
    }
  </div>
)
```

使用了蚂蚁设计的 Progress 组件。

浏览器中试着上传一个或者多个文件，会发现进度条已经可以工作了。

至此，《使用 Progress 组件》这部分就胜利完成了。

### 总结

首先感谢腾讯云的接口提供了不断更新的百分比数据，感谢 redux 把数据整理的很清楚，感谢蚂蚁设计的组件给出了美观的展示。至此，《进度条》这个小节就胜利完成了。
