# 进度条

好的用户体验就是要对用户操作有及时反馈，这节来添加上传进度条。

### 通过接口读进度数据

参考 [Javscript SDK]( https://cloud.tencent.com/document/product/436/11459) 的 **分块上传任务操作** 。

在操作参数说明中，可以看到 onProgress 参数的说明：

>onProgress —— (Function) ： 上传文件的进度回调函数，回调参数为进度对象 progressData

到 src/containers/UploadContainer.js 中，添加 onProgress

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

这时，到页面上，同时选中两个或者多个文件上传，可以看到，新添加的打印语句可以不断的打印出上传百分比和它对应的文件。这里要注意的是 `progressData` 本身内部不包含文件名，所以后续操作进度条数据的时候，需要同时把 `precent` 和 `file` 值一块儿传递给处理函数。

这样，我们看到的是，展示进度条需要的必要数据就有了。后面的所有步骤都是为了展示这些数据了。

至此，《通过接口读进度数据》这部分就胜利完成。

### 新建进度条

来到 redux 中央状态树中定义一个状态叫 `progressBars` ，初始值给一个空数组，然后每次有文件上传，就往数组中添加一个进度条对象。

先到 UploadContainer 组件中添加触发整个链条的函数，也就是 Action 创建器

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

到页面中测试，可以看到终端中不断可以打印出 store 中的 progressBars 的值，进度 percent 不断被更新。

至此，《更新上传进度》这一部分就完成了。

### 使用 Progress 组件

上一步得到的可以不断更新的 progressBars 数据，传递给 [蚂蚁设计的 Progress 进度条组件](https://ant.design/components/progress-cn/)，就可以美观的显示进度条出来了。

到 UploadContainer.js 中，导入一个展示组件 ProgressBars

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

### 更新上传状态

进度条工作了，但是由于进度状态，也就是 status 一直不变，所以颜色一直是蓝色的，下面我们来在上传报错时让进度条变红，上传成功后让它变绿。

从 [Progress 组件文档](https://ant.design/components/progress-cn/) 上看到，上传状态有三种，先来把它们定义成常量，保存到一个常量文件 src/constants/ProgreeStatus.js 之中

```js
export const EXCEPTION = 'exception'
export const ACTIVE = 'active'
export const SUCCESS = 'success'
```

这样，我们就用这几个大写常量来代表状态了。这样做的一个好处就是，如果拼写错误会有报错，说变量未找到。如果直接代码中使用字符串，可能代码就无声无息的失效了。

然后 action 创建器文件修改如下：

```diff
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -1,5 +1,7 @@
 import axios from 'axios'
 import Settings from '../../settings'
+import { ACTIVE, EXCEPTION, SUCCESS } from '../../constants/ProgressStatus'
+

 const getFirstDir = allFiles => allFiles[0].Key.split('/')[0]

@@ -37,7 +39,7 @@ export const addProgressBar = file => {
   const progressBar = {
     percent: 0,
     name: file.name,
-    status: 'normal',
+    status: ACTIVE,
     uid: file.uid,
   }
   return dispatch => {
@@ -48,8 +50,20 @@ export const addProgressBar = file => {
   }
 }
+const setProgressStatus = (status, file) => ({
+  type: 'SET_PROGRESS_STATUS',
+  status,
+  file
+})
+
+export const handleException = file => {
+  return dispatch => {
+    dispatch(setProgressStatus(EXCEPTION, file))
+  }
+}
 export const setProgressPercent = (percent, file) => {
   return dispatch => {
+    if (percent === 100) dispatch(setProgressStatus(SUCCESS, file))
     dispatch({
       type: 'SET_PROGRESS_PERCENT',
       percent,
```

上面内容的核心是 `setProgressStatus` 这个函数，可以用来更新 store 中的进度条状态。有两种情形：

- 第一种，直接在 `setProgressPercent` 中，当 `percent === 100`，也就意味着上传成功后，把 status 设置为 success ，未来显示到 Progress 组件上，是一个嫩绿色效果
- 第二种，就是 `handleException` ，当程序发成错误的时候触发，把 status 设置为 exception ，未来显示到 Progress 组件上，是一个红色效果

那么 handleException 在什么情况下触发呢？到 UploaderContainer 做出修改

```diff
diff --git a/client/src/containers/UploaderContainer.js b/client/src/containers/UploaderContainer.js
index 2dc38e1..05dbde0 100644
--- a/client/src/containers/UploaderContainer.js
+++ b/client/src/containers/UploaderContainer.js
@@ -6,7 +6,8 @@ import ProgressBars from '../components/ProgressBars'
 import {
   addFile,
   addProgressBar,
-  setProgressPercent
+  setProgressPercent,
+  handleException
 } from '../redux/actions'
 import {
   getCurrentDir,
@@ -38,6 +39,7 @@ class UploaderContainer extends Component {
         cos.sliceUploadFile(params, (err, data) => {
           if(err) {
             reject(file.name)
+            this.props.handleException(file)
             console.log(err)
           } else {
             resolve(file.name)
@@ -67,5 +69,6 @@ const mapStateToProps = state => ({
 export default connect(mapStateToProps, {
   addFile,
   addProgressBar,
-  setProgressPercent
+  setProgressPercent,
+  handleException
 })(UploaderContainer)
```

当 `cos.sliceUploadFile` 报错的时候，会触发 `handleException()` 。测试这一行代码执行要有耐心。可以先上传一个文件，过程中把网断掉，等待两三分钟后 `if(err)` 中的语句才会被执行到。

最后，来把 reducer 代码添加上：

```diff
diff --git a/client/src/redux/reducers/progressBars.js b/client/src/redux/reducers/progressBars.js
index 29eca88..06ced0e 100644
--- a/client/src/redux/reducers/progressBars.js
+++ b/client/src/redux/reducers/progressBars.js
@@ -10,6 +10,14 @@ const progressBars = (state, action) => {
         }
         return t
       })
+    case 'SET_PROGRESS_STATUS':
+      return state.map(t => {
+          if (t.uid === action.file.uid) {
+            const status =  action.status
+            return { ...t, status }
+          }
+          return t
+        })
     default:
       return state
   }
```

通过 uid 区分不同文件，把状态树 status 更新一下。

浏览器中，可以上传文件观察一下不同的上传状态，进度条的颜色变化了。同时上传两个文件，一个大的，一个小的，等小的上传完毕，会看到进度条变绿，同时有成功的全局提示。然后把网断掉，等一会儿，会看到大文件的进度条变红，弹出报错的全局提示。

至此，《更新上传状态》这部分就完成了。

### 区分文件夹

目前的情况是，在 aa/ 文件夹中的上传进度条，切换到 bb/ 文件夹，依然可以看到，这个我们马上来解决。

到 src/containers/UploaderContainer.js 修改 addProgressBar 函数的参数

```diff
diff --git a/client/src/containers/UploaderContainer.js b/client/src/containers/UploaderContainer.js
index 05dbde0..a0d0951 100644
--- a/client/src/containers/UploaderContainer.js
+++ b/client/src/containers/UploaderContainer.js
@@ -21,7 +21,7 @@ class UploaderContainer extends Component {
   handleChange = info => {
     const { currentDir } = this.props
     const file = info.file.originFileObj
-    this.props.addProgressBar(file)
+    this.props.addProgressBar(file, currentDir)
     const key = `${currentDir}/${file.name}`
     const params = {
       Bucket: Settings.Bucket,
```

把 currentDir 传递给 action 创建器。

接着到 src/redux/actions/index.js 修改创建器实现

```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index af459f0..f438c2e 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -35,12 +35,13 @@ export const addFile = (filePath) => {
   }
 }

-export const addProgressBar = file => {
+export const addProgressBar = (file, currentDir) => {
   const progressBar = {
     percent: 0,
     name: file.name,
     status: ACTIVE,
     uid: file.uid,
+    currentDir
   }
   return dispatch => {
     dispatch({
```

把 currentDir 传递给 reducer 。

上面两步的目的非常明确了，就是要在添加 progressBar 信息的时候，把 currentDir 也保存到状态树中。接下来只要我们在显示这些 progressBar 的时候，根据 currentDir 做一下筛选即可。具体做法如下。

到 src/redux/reducers/index.js 修改 getProgressBars 函数

```diff
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index 905804e..f88abe7 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -55,6 +55,10 @@ export const getCurrentDirFiles = state => {
 }

 export const getCurrentDir = state => state.currentDir
-export const getProgressBars = state => state.progressBars
+export const getProgressBars = state => {
+  return state.progressBars.filter(
+    t => t.currentDir === state.currentDir
+  )
+}

 export default rootReducer
```

这样就只有当前文件夹的进度条了。

浏览器中，分别到两个不同的文件夹中去上传文件，可以看到进度条的显示是互不干扰的。

至此，《区分文件夹》这部分就胜利完成了。

### 总结

这样，进度条就添加好了。实际应用中根据需要，可能要添加在上传完毕后隐藏进度条的功能，这里我们就不做了。

这样，《进度条》这个小节就胜利完成了。