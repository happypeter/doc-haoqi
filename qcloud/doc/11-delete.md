# 删除文件

来加上删除文件的功能，easy ，就是调用一下 [deleteObject](https://cloud.tencent.com/document/product/436/12260) 接口。


### 添加删除按钮

[蚂蚁设计 Table 组件](https://ant.design/components/table-cn/)的属性 columns 定义了表格列的配置描述。
参考上面的文档：

> render	生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引...
>
> render:  Function(text, record, index) {}

所以我们可以在 render 中创建删除按钮。

```diff
diff --git a/client/src/components/FileTable.js b/client/src/components/FileTable.js
index 589e97b..d0ec906 100644
--- a/client/src/components/FileTable.js
+++ b/client/src/components/FileTable.js
@@ -1,5 +1,5 @@
 import React from 'react'
-import { Table } from 'antd'
+import { Table, Button } from 'antd'
 import moment from 'moment'


@@ -17,6 +17,18 @@ const tableColumns = [
     render: (text) => {
       return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
     }
+  },
+  {
+    title: '操作',
+    render: record => {
+      return (
+        <Button
+          onClick={() => deleteFile(record) }
+        >
+          删除
+        </Button>
+      )
+    }
   }
 ]
```

这样页面上就可以看到每个文件项后面都多了一个删除按钮。


### 实现删除函数

下面来添加删除按钮的 onClick 事件函数 `deleteFile` ，

```diff
diff --git a/client/src/components/FileTable.js b/client/src/components/FileTable.js
index d0ec906..a4fb00e 100644
--- a/client/src/components/FileTable.js
+++ b/client/src/components/FileTable.js
@@ -1,43 +1,62 @@
 import React from 'react'
-import { Table, Button } from 'antd'
+import { Table, Button, Modal } from 'antd'
 import moment from 'moment'
+const confirm = Modal.confirm


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
-        <Button
-          onClick={() => this.delete(record) }
-        >
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
+  const deleteFile = (record) => {
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
+  }
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
+          <Button
+            onClick={() => deleteFile(record) }
+          >
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


上面的 diff 比较长，部分原因是我把 `tableColumns` 变量移动到了组件函数内，因为 tableColumns 中使用了 `deleteFile` 函数，放到组件函数外访问不到。当然主体部分还是添加了 deleteFile 函数。之所以不把这个函数移动到 container 组件，是因为这里面基本上功能就是一个对话框，是一个界面，所以不适合放到 container 中。对话框会问用户是否真的要删除文件，点 No 就会执行 `onCancel` 的处理函数，这里面我们可以只写个终端打印就够了，主要的删除动作应该在用户点 Yes ，而执行的 `onOk` 的处理函数中。



### 调用腾讯删除对象接口

onOK 中的函数要调用腾讯云的 `deleteObject` 接口，真正去删除云端文件。


```diff
diff --git a/client/src/components/FileTable.js b/client/src/components/FileTable.js
index a4fb00e..c9cfeda 100644
--- a/client/src/components/FileTable.js
+++ b/client/src/components/FileTable.js
@@ -1,12 +1,12 @@
 import React from 'react'
-import { Table, Button, Modal } from 'antd'
+import { Table, Button, Modal, message } from 'antd'
 import moment from 'moment'
 const confirm = Modal.confirm


-export default ({ currentDirFiles }) => {
+export default ({ currentDirFiles, onDelete }) => {
   const deleteFile = (record) => {
     confirm({
       title: `确认删除 ${record.Key} ？`,
@@ -15,7 +15,11 @@ export default ({ currentDirFiles }) => {
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
diff --git a/client/src/containers/FileTableContainer.js b/client/src/containers/FileTableContainer.js
index cfabd59..a28a1bf 100644
--- a/client/src/containers/FileTableContainer.js
+++ b/client/src/containers/FileTableContainer.js
@@ -1,14 +1,19 @@
 import React, { Component } from 'react'
 import { getCurrentDirFiles } from '../redux/reducers'
 import { connect } from 'react-redux'
+import { removeFile } from '../redux/actions'
 import FileTable from '../components/FileTable'

 class FileTableContainer extends Component {
+  handleDelete = (record) => this.props.removeFile(record)
+
   render () {
     const { currentDirFiles } = this.props
     return (
       <div>
-        <FileTable currentDirFiles={currentDirFiles} />
+        <FileTable
+          onDelete={this.handleDelete}
+          currentDirFiles={currentDirFiles} />
       </div>
     )
   }
@@ -18,4 +23,4 @@ const mapStateToProps = state => ({
   currentDirFiles: getCurrentDirFiles(state)
 })

-export default connect(mapStateToProps)(FileTableContainer)
+export default connect(mapStateToProps, { removeFile })(FileTableContainer)
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index f438c2e..aa6a8a7 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -1,6 +1,7 @@
 import axios from 'axios'
 import Settings from '../../settings'
 import { ACTIVE, EXCEPTION, SUCCESS } from '../../constants/ProgressStatus'
+import cos from '../../lib/qcloud'


 const getFirstDir = allFiles => allFiles[0].Key.split('/')[0]
@@ -62,6 +63,7 @@ export const handleException = file => {
     dispatch(setProgressStatus(EXCEPTION, file))
   }
 }
+
 export const setProgressPercent = (percent, file) => {
   return dispatch => {
     if (percent === 100) dispatch(setProgressStatus(SUCCESS, file))
@@ -72,3 +74,26 @@ export const setProgressPercent = (percent, file) => {
     })
   }
 }
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

上面的代码又走了一遍咱们前面已经用过的思路：首先，用户对话框回答 Yes ，执行 `onOK` 的语句，也就是

```js
onDelete(record)
```

于是，父组件中的对应函数会触发 action 触发器文件中的，`removeFile` 函数，那么真正的删除工作也就在这里面了。腾讯云那边删除完成，返回一个 Promise 给 FileTableContainer 组件，然后这个 Promise 又继续返回给了 FileTable 组件。所以在 FileTable 内，可以继续执行 `.then` 或者 `.catch` 中的语句，来显示提示信息。

### 删除后更新前端文件列表

上面的代码，美中不足的是，每次删除文件成功后，需要刷新页面文件才会从表格中消失，现在来解决一下这个问题。

基本思路就是在 `cos.deleteObject` 接口执行成功之后，再来修改一下 store 中的数据即可。


```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index aa6a8a7..a194d8f 100644
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
diff --git a/client/src/redux/reducers/index.js b/client/src/redux/reducers/index.js
index f88abe7..be7239b 100644
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


有了上面的代码，删除了文件之后，文件名会自动从 table 中消失。


### 总结

整个删除的确完成了。
