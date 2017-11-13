# 删除文件

加上删除文件的功能，很 easy ，就是调用一下 [deleteObject](https://cloud.tencent.com/document/product/436/12260) 接口。

### 添加删除按钮

[蚂蚁设计 Table 组件](https://ant.design/components/table-cn/)的属性 columns 定义了表格列的配置描述，参考文档，我来给 FileTable 组件再添加一列，内容就是删除按钮。

到 FileTable 组件中，给表格增加一列

```diff
diff --git a/client/src/components/FileTable.js b/client/src/components/FileTable.js
index 1969f5e..79d6336 100644
--- a/client/src/components/FileTable.js
+++ b/client/src/components/FileTable.js
@@ -1,5 +1,5 @@
 import React from 'react'
-import { Table } from 'antd'
+import { Table, Button} from 'antd'
 import moment from 'moment'
 
 const tableColumns = [
@@ -16,6 +16,16 @@ const tableColumns = [
     render: (text) => {
       return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
     }
+  },
+  {
+    title: '操作',
+    render: record => {
+      return (
+        <Button>
+          删除
+        </Button>
+      )
+    }
   }
 ]
```

`render` 函数中使用了 Button 组件。

这样页面上就可以看到每个文件后面都多了一个删除按钮。

至此，《添加删除按钮》这部分就胜利完成了。

### 实现删除函数

添加删除按钮的 onClick 事件的事件函数。

为了后续使用方便，先把 `tableColumns` 移动到组件函数内

```diff
diff --git a/client/src/components/FileTable.js b/client/src/components/FileTable.js
index 79d6336..ff63233 100644
--- a/client/src/components/FileTable.js
+++ b/client/src/components/FileTable.js
@@ -2,39 +2,42 @@ import React from 'react'
 import { Table, Button} from 'antd'
 import moment from 'moment'
 
-const tableColumns = [
-  {
-    title: '文件名',
-    dataIndex: 'Key',
-    render: (text) => {
-      return <span>{text.split('/')[1]}</span>
-    }
-  },
-  {
-    title: '上传时间',
-    dataIndex: 'LastModified',
-    render: (text) => {
-      return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
-    }
-  },
-  {
-    title: '操作',
-    render: record => {
-      return (
-        <Button>
-          删除
-        </Button>
-      )
-    }
-  }
-]
 
-export default ({ currentDirFiles }) => (
-  <div>
-    <Table columns={tableColumns}
-      dataSource={currentDirFiles}
-      rowKey={item => item.ETag}
-      pagination={false}
-      />
-  </div>
-)
+
+export default ({ currentDirFiles }) => {
+  const tableColumns = [
+    {
+      title: '文件名',
+      dataIndex: 'Key',
+      render: (text) => {
+        return <span>{text.split('/')[1]}</span>
+      }
+    },
+    {
+      title: '上传时间',
+      dataIndex: 'LastModified',
+      render: (text) => {
+        return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
+      }
+    },
+    {
+      title: '操作',
+      render: record => {
+        return (
+          <Button>
+            删除
+          </Button>
+        )
+      }
+    }
+  ]
+  return (
+    <div>
+      <Table columns={tableColumns}
+        dataSource={currentDirFiles}
+        rowKey={item => item.ETag}
+        pagination={false}
+        />
+    </div>
+  )
+}

```

几乎没改代码，就是移动了一下。

接下来添加删除按钮的 onClick 事件的处理函数。

```diff
diff --git a/client/src/components/FileTable.js b/client/src/components/FileTable.js
index ff63233..cc7ed90 100644
--- a/client/src/components/FileTable.js
+++ b/client/src/components/FileTable.js
@@ -5,6 +5,10 @@ import moment from 'moment'
 
 
 export default ({ currentDirFiles }) => {
+  const deleteFile = (record) => {
+    console.log('record', record)
+  }
+
   const tableColumns = [
     {
       title: '文件名',
@@ -24,7 +28,9 @@ export default ({ currentDirFiles }) => {
       title: '操作',
       render: record => {
         return (
-          <Button>
+          <Button
+            onClick={() => deleteFile(record)}
+          >
             删除
           </Button>
         )

```

把 render 拿到的 record 数据传递给了 deleteFile 。

浏览器中点一下删除按钮，可以看到打印出的 record

```js
record {Key: "aa/aa.mp4", LastModified: "2017-11-13T11:45:32.000Z", ETag: ""f85644067d06576f4d743295771431ca-19"", Size: "19238065", Owner: {…}, …}
```

FileTable 组件中，添加一个确认删除对话框

```diff
diff --git a/client/src/components/FileTable.js b/client/src/components/FileTable.js
index cc7ed90..2e1321b 100644
--- a/client/src/components/FileTable.js
+++ b/client/src/components/FileTable.js
@@ -1,12 +1,26 @@
 import React from 'react'
-import { Table, Button} from 'antd'
+import { Table, Button, Modal } from 'antd'
 import moment from 'moment'
+const confirm = Modal.confirm
 
 
 
 export default ({ currentDirFiles }) => {
   const deleteFile = (record) => {
     console.log('record', record)
+    confirm({
+      title: `确认删除 ${record.Key} ？`,
+      content: '删除之后无法恢复',
+      okText: 'Yes',
+      okType: 'danger',
+      cancelText: 'No',
+      onOk: () => {
+        console.log('OK')
+      },
+      onCancel: () => {
+        console.log('Cancel')
+      }
+    })
   }
 
   const tableColumns = [
```

这样每次点删除，就会看到对话框了。对话框有两个按钮，点 NO 按钮，就会触发 onCancel ，点 Yes 就会触发 onOk 。

浏览器中试一下，如果点 YES ，终端中就会打印 OK ，点 NO ，就会打印出 Cancel 。

至此，《实现删除函数》这部分就胜利完成了。

### 调用腾讯删除对象接口

onOK 的处理函数中来调用腾讯云的 `deleteObject` 接口，真正去删除云端文件。

调整 onOK 函数的代码

```diff
diff --git a/client/src/components/FileTable.js b/client/src/components/FileTable.js
index 2e1321b..f05ab5f 100644
--- a/client/src/components/FileTable.js
+++ b/client/src/components/FileTable.js
@@ -1,11 +1,9 @@
 import React from 'react'
-import { Table, Button, Modal } from 'antd'
+import { Table, Button, Modal, message } from 'antd'
 import moment from 'moment'
 const confirm = Modal.confirm
 
-
-
-export default ({ currentDirFiles }) => {
+export default ({ currentDirFiles, onDelete }) => {
   const deleteFile = (record) => {
     console.log('record', record)
     confirm({
@@ -15,7 +13,11 @@ export default ({ currentDirFiles }) => {
       okType: 'danger',
       cancelText: 'No',
       onOk: () => {
-        console.log('OK')
+        onDelete(record).then(
+          key => message.success(`已删除：${key}`)
+        ).catch(
+          key => message.error(`${key} 删除失败`)
+        )
       },
       onCancel: () => {
         console.log('Cancel')
```

onOK 处理函数中真正执行的是容器组件中传递过来的 `onDelete` 。

到容器组件中来传 `onDelete`

```diff
diff --git a/client/src/containers/FileTableContainer.js b/client/src/containers/FileTableContainer.js
index adb8b46..6d66d83 100644
--- a/client/src/containers/FileTableContainer.js
+++ b/client/src/containers/FileTableContainer.js
@@ -1,13 +1,18 @@
 import React, { Component } from 'react'
 import { connect } from 'react-redux'
 import { getCurrentDirFiles } from '../redux/reducers'
+import { removeFile } from '../redux/actions'
 import FileTable from '../components/FileTable'
 
 class FileTableContainer extends Component {
+  handleDelete = (record) => this.props.removeFile(record)
+
   render () {
     return (
       <div>
-        <FileTable currentDirFiles={this.props.currentDirFiles} />
+        <FileTable
+          onDelete={this.handleDelete}
+          currentDirFiles={this.props.currentDirFiles} />
       </div>
     )
   }
@@ -16,4 +21,4 @@ class FileTableContainer extends Component {
 const mapStateToProps = state => ({
   currentDirFiles: getCurrentDirFiles(state)
 })
-export default connect(mapStateToProps)(FileTableContainer)
+export default connect(mapStateToProps, { removeFile })(FileTableContainer)
```

`handleDelete` 中也没干实事，真正调用腾讯云接口的工作，是在 action 创建器 removeFile 中完成的。

到 actions/index.js 实现 `removeFile` 

```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index 32cda96..f5680e0 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -1,6 +1,7 @@
 import axios from 'axios'
 import Settings from '../../settings'
 import { ACTIVE, EXCEPTION, SUCCESS } from '../../constants/ProgressStatus'
+import cos from '../../lib/qcloud'
 
 const getFirstDir = allFiles => allFiles[0].Key.split('/')[0]
 export const loadAllFiles = () => {
@@ -72,3 +73,27 @@ export const setProgressPercent = (percent, file) => {
     })
   }
 }
+
+
+export const removeFile = (record) => {
+  const params = {
+    Bucket: Settings.Bucket,
+    Region: Settings.Region,
+    Key : record.Key
+  }
+  const key = record.Key
+
+  return dispatch => {
+    return new Promise(
+      (resolve, reject) => {
+        cos.deleteObject(params, (err, data) => {
+          if(err) {
+            reject(key)
+          } else {
+            resolve(key)
+          }
+        })
+      }
+    )
+  }
+}
```

`removeFile` 函数，真正的调用了 `cos.deleteObject` 接口，删除了云端文件。然后返回一个 Promise 给 FileTableContainer 组件，然后这个 Promise 又继续返回给了 FileTable 组件。所以在 FileTable 内，可以继续执行 `.then` 或者 `.catch` 中的语句，来显示提示信息。

浏览器中，删除一个文件，可以显示删除成功的提示，美中不足的是需要删除页面，才能看到列表上的文件被隐藏。

至此，《调用腾讯删除对象接口》这部分就结束了。

### 删除后更新前端文件列表

每次删除文件成功后，需要刷新页面，文件才会从表格中消失，现在来解决一下这个问题。

基本思路就是在 `cos.deleteObject` 接口执行成功之后，再来修改一下 redux 状态树。

先到 action 创建器中，发出 action

```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index f5680e0..5e79c63 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -90,6 +90,7 @@ export const removeFile = (record) => {
           if(err) {
             reject(key)
           } else {
+            dispatch({ type: 'REMOVE_FILE', key })
             resolve(key)
           }
         })
```

文件从腾讯云如果删除成功，`REMOVE_FILE` action 就会被发出。

reducers/index.js 添加 reducer

```diff
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index 59fb795..dd4d614 100644
--- a/client/src/redux/reducers/index.js
+++ b/client/src/redux/reducers/index.js
@@ -23,6 +23,13 @@ const rootReducer = (state = initState, action) => {
         ...state,
         allFiles: [...state.allFiles, action.newFile]
       }
+    case 'REMOVE_FILE':
+      return {
+        ...state,
+        allFiles: state.allFiles.filter(
+          t => t.Key !== action.key
+        )
+      }
     default:
       return {
         ...state,

```

根据传递过来的文件名，从状态树中删除该文件。

有了上面的代码，删除了文件之后，文件名会自动从 table 中消失。浏览器中试一下，可以看到这个效果。

至此，《删除后更新前端文件列表》就胜利完成。

### 总结

走了一个很基本的流程，界面中通过蚂蚁金服的组件触发对话框，对话框如果点 YES ，就执行 onOk 事件的处理函数，函数中调用了父组件方法。而真正的删除接口，不是在父组件中调用，而是放到了 Action 创建器中，创建器中先请求腾讯 API ，把文件从腾讯云上删除，然后发出删除文件的 action ，把文件从我们自己的页面上隐藏掉。

这样，《删除文件》这一小节就胜利完成了。