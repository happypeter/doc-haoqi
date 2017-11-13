# 进度条增强

完成进度条功能的强化。

### 更新上传状态

进度条工作了，但是由于进度状态，也就是 status 一直不变，所以颜色一直是蓝色的，下面我们来在上传报错时让进度条变红，上传成功后让它变绿。

从 [Progress 组件文档](https://ant.design/components/progress-cn/) 上看到，上传状态有三种，先来把它们定义成常量，保存到一个常量文件 src/constants/ProgressStatus.js 之中

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

上面两步的目的非常明确了，就是要在添加 progressBar 信息的时候，把 currentDir 也保存到状态树中。接下来只要我们在显示这些 progressBar 的时候，根据 currentDir 做一下筛选即可。

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

这样，进度条工作就更加完美了。实际应用中根据需要，可能要添加在上传完毕后隐藏进度条的功能，这里我们就不做了。

《进度条增强》这个小节就胜利完成了。同时本节也是第二章《上传》的最后一个小节了。