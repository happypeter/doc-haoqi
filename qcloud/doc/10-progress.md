# 进度条

好的用户体验就是要对用户操作有及时反馈 ，这节来添加进度条，提升一下用户体验。

### 通过接口读进度数据

参考 [Javscript SDK]( https://cloud.tencent.com/document/product/436/11459) 的 **分块上传任务操作** (不是分块上传操作) 。

在操作参数说明中，我们可以看到 onProgress 参数的说明：

>onProgress —— (Function) ： 上传文件的进度回调函数，回调参数为进度对象 progressData

到 src/containers/UploadContainer.js 中

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


### 新建进度条

来到 redux store 中定义一个 state 叫 `progressBars` ，初始值给一个空数组，然后每次有文件上传，就往数组中添加一条进度条数据。


先到 UploadContainer 组件中添加触发整个链条的函数

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

接下来实现对应的 action creator 代码如下：

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

上面的代码，给 progressBar 设置了四项初始值：

- percent 这个不用说，最重要的百分比数据，number 型，未来要传递给[ antd 的 Progress 组件](https://ant.design/components/progress-cn/)
- name 就是文件名，这个当然要保存，不然都不知道是谁的进度了
- status 状态，可选：success exception active ，参考 [Progress 组件](https://ant.design/components/progress-cn/) 响应文档
- uid 唯一 id ，后面筛选信息的时候用得着

上面这四项信息组成的对象，就代表一个进度条，会被添加到 progressBars 数组中。下面就要写 reducer 了，由于 progressBars 相关的 reducers 代码不少，为了不让 rootReducer 看上去过于臃肿，所以单独新建一个文件 reducers/progressBars.js 来写 progressBars 相关的 reducer 。代码如下：


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


暂时功能很简单，技术添加新文件的进度条进来，为了还会加其他的 `case` 进来。最后，reducers/index.js 中要使用一下上面的文件，它才能生效

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

有了上面的代码，页面上我们选择一个或者多个文件进行上传，就可以看到终端中 redux-logger 打印出的信息

```js
action     {type: "ADD_FILE", newFile: {…}}
redux-logger.js:1  next state {allFiles: Array(20), currentDir: "aa", progressBars: Array(1)}
```

可以看到，新的 progressBar 数据已经成功添加到数组中了。

### 更新上传进度

腾讯的 `cos.sliceUploadFile` 接口会多次执行 `onProgress` 事件函数，源源不断的把最新的 percent 值传递过来，我们这部分要做的就是更新这个 percent 值到 redux store 中的 progressBars 数据中。


UploaderContainer 组件中要执行一个 action 创建器，叫做 setProgressPercent ，如下：

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

Action 创建器的实现：

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

上面，要把 `file` 传递过来，目的就是确认要更新的进度到底是哪一个文件的。所以到 reducer 代码中， file 的作用就能体现出来了，如下：

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


到页面中测试，可以看到终端中不断可以打印出 store 中的 progressBars 的值，每一次里面的文件的上传进度 percent 值都不一样。


### 使用 antd 的 Progress 组件

上一步中的动态 progressBars 数据，传递给 [蚂蚁设计的 Progress 进度条组件](https://ant.design/components/progress-cn/)，就可以美观的显示进度条出来了。


```diff
diff --git a/client/src/containers/UploaderContainer.js b/client/src/containers/UploaderContainer.js
index 7da402d..2dc38e1 100644
--- a/client/src/containers/UploaderContainer.js
+++ b/client/src/containers/UploaderContainer.js
@@ -2,12 +2,16 @@ import React, { Component } from 'react'
 import Settings from '../settings'
 import cos from '../lib/qcloud'
 import Uploader from '../components/Uploader'
+import ProgressBars from '../components/ProgressBars'
 import {
   addFile,
   addProgressBar,
   setProgressPercent
 } from '../redux/actions'
-import { getCurrentDir } from '../redux/reducers'
+import {
+  getCurrentDir,
+  getProgressBars
+} from '../redux/reducers'
 import { connect } from 'react-redux'

 @@ -45,16 +49,19 @@ class UploaderContainer extends Component {
      )
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

添加 src/components/ProgressBars.js 作为进度条的展示组件：

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


这样，试着上传一个或者多个文件，会发现进度条已经可以工作了。


### 上传状态

进度条工作了，但是由于 status 一直不变，所以颜色一直是蓝色的，下面我们来在上传报错时让进度条变红，上传成功后让它变绿。


从 [Progress 组件文档](https://ant.design/components/progress-cn/) 上看到，上传状态有三种，先来把它们定义成常量，保存到一个常量（ constants ）文件 src/constants/ProgreeStatus.js ：

```js
export const EXCEPTION = 'exception'
export const ACTIVE = 'active'
export const SUCCESS = 'success'
```

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

上面内容的核心是 `setProgressStatus` 这个函数，它可以用来更新 store 中的进度条状态。有两种情形：

- 第一种，直接在 `setProgressPercent` 中，当 `percent === 100`，也就意味着上传成功后，来把 status 设置为 success ，未来显示到 Progress 组件上，是一个嫩绿色效果
- 第二种，就是 `handleException` ，当程序发成错误的时候触发，把 status 设置为 exception ，未来显示到 Progress 组件上，是一个红色效果

那么 handleException 在什么情况下触发呢？来看我们在 UploaderContainer 做出的修改：

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

当 `cos.sliceUploadFile` 执行报错的时候，会触发 `handleException()` ，测试这一行代码执行要有耐心。可以先上传一个文件，过程中把网断掉，等待两三分钟后 `if(err)` 中的语句才会被执行到。

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

至此，可以上传文件观察一下不同的上传状态，进度条的颜色变化了。

### 区分文件夹

目前的情况是，在 aa/ 文件夹中的上传进度条，切换到 bb/ 文件夹，依然可以看到，这个我们马上来解决。

到 src/containers/UploaderContainer.js 中

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

接着到 src/redux/actions/index.js

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

上面两步的目的非常明确了，就是要在添加 progressBar 信息的时候，把 currentDir 也保存到状态树中。让后接下来只要我们在显示这些 progressBar 的时候，也根据 currentDir 做一下筛选即可。具体做法如下。

到 src/redux/reducers/index.js

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

这样，分别到两个不同的文件夹中去上传文件，可以看到进度条的显示是互不干扰的。

### 总结

这样，进度条就添加好了。实际应用中根据需要，我们可能要添加在上传完毕后隐藏进度条的代码，这里我们就不做了。
