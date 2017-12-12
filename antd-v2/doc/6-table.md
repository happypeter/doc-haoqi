# 使用表格组件

这次来《使用表格组件》，在已有页面美观的展示甜点信息。参考 [官方的 Table 文档](https://ant.design/components/table-cn/) 来进行开发。

### 运行组件

先来《运行组件》。

第一步就是要做列定义

```diff
diff --git a/admin/src/components/Dishes.js b/admin/src/components/Dishes.js
index 4feb0d2..624a76e 100644
--- a/admin/src/components/Dishes.js
+++ b/admin/src/components/Dishes.js
@@ -1,11 +1,18 @@
 import React, { Component } from 'react'
+import { Table } from 'antd'
+import dishTableColumns from '../constants/DishTableColumns'
 import styled from 'styled-components'
 class Dishes extends Component {
   render () {
+    const content = (
+      <Table columns={dishTableColumns()} />
+    )
     return (
       <Wrap>
-        已有甜点
+        {
+          content
+        }
       </Wrap>
     )
   }
diff --git a/admin/src/constants/DishTableColumns.js b/admin/src/constants/DishTableColumns.js
new file mode 100644
index 0000000..ae3fabd
--- /dev/null
+++ b/admin/src/constants/DishTableColumns.js
@@ -0,0 +1,24 @@
+const dishTableColumns = () => [
+  {
+    title: '海报',
+    dataIndex: 'poster'
+  },
+  {
+    title: '菜品名称',
+    dataIndex: 'name'
+  },
+  {
+    title: '描述',
+    dataIndex: 'desc'
+  },
+  {
+    title: '价格',
+    dataIndex: 'price'
+  },
+  {
+    title: '操作',
+    dataIndex: '_id'
+  }
+]
+
+export default dishTableColumns
```

一共改了两个文件。

Dishes.js 中导入 Table.js 和列定义，下面把列定义作为属性传递给 Table 组件。

DishTableColumns 文件中，传入 Table 组件的 columns 属性值是一个数组，定义了一共有几列，每一列都显示什么内容。通过 title 定义了每一列的标题是什么，通过 dataIndex 指定了这一类要显示数据的那个字段。

下面来把后端服务器启动。

```
cd happy-api-starter
npm i
npm run db
npm run dev
```

happy-api-starter/public/uploads/posters 中添加 hsl.png 和 tlms.png 两张甜点海报。

浏览器中访问 localhost:3008/seed-dishes ，把数据库中插入两个甜点数据，然后访问 localhost:3008/dishes ，可以拿到 dishes 数据。

拷贝并添加到代码中做临时数据。




```diff
diff --git a/admin/src/components/Dishes.js b/admin/src/components/Dishes.js
index 624a76e..87247d3 100644
--- a/admin/src/components/Dishes.js
+++ b/admin/src/components/Dishes.js
@@ -5,8 +5,27 @@ import styled from 'styled-components'
 class Dishes extends Component {
   render () {
+    const dishes = [
+      {
+        _id: "5a26738e8ed6687f81859d24",
+        name: "提拉米苏",
+        price: 23,
+        poster: "tlms.png",
+        desc: "非常好吃"
+      },
+      {
+        _id: "5a2683d98ed6687f81859d25",
+        name: "黑森林",
+        price: 12,
+        poster: "hsl.png",
+        desc: "非常好吃"
+      }
+    ]
+
     const content = (
-      <Table columns={dishTableColumns()} />
+      <Table columns={dishTableColumns()}
+        dataSource={dishes}
+      />
     )
     return (
       <Wrap>
```

数据一定要是一个对象数组，同时对象中的属性名要和列定义中的 dataIndex 一一对应。

看看达成的效果。这样页面中数据就显示出来了。

### 自定制显示格式

每个数据在显示的时候都可以《自定制显示格式》。通过 render 渲染函数来完成。

先来个简单的，给价格添加单位。

```diff
diff --git a/admin/src/constants/DishTableColumns.js b/admin/src/constants/DishTableColumns.js
index ae3fabd..c4fa77e 100644
--- a/admin/src/constants/DishTableColumns.js
+++ b/admin/src/constants/DishTableColumns.js
@@ -13,7 +13,10 @@ const dishTableColumns = () => [
   },
   {
     title: '价格',
-    dataIndex: 'price'
+    dataIndex: 'price',
+    render: price => {
+      return `${price}元`
+    }
   },
   {
     title: '操作',
```

render 方法可以拿到这列数据为参数，在函数内部对参数做任意的修饰，然后最终显示返回的结果。

也可以渲染 React 组件。

```diff
diff --git a/admin/src/constants/DishTableColumns.js b/admin/src/constants/DishTableColumns.js
index c4fa77e..b1dcf30 100644
--- a/admin/src/constants/DishTableColumns.js
+++ b/admin/src/constants/DishTableColumns.js
@@ -1,3 +1,6 @@
+import React from 'react'
+import { Link } from 'react-router-dom'
+
 const dishTableColumns = () => [
   {
     title: '海报',
@@ -20,7 +23,10 @@ const dishTableColumns = () => [
   },
   {
     title: '操作',
-    dataIndex: '_id'
+    dataIndex: '_id',
+    render: id => {
+      return <Link to='#'>删除</Link>
+    }
   }
 ]
```

导入了 react-router-dom 中的 Link 组件，用来渲染最后的删除链接，这列暂时没有用到数据 id ，后面会用到。

再来把海报链接变成图片显示出来。

```diff
diff --git a/admin/src/constants/ApiConstants.js b/admin/src/constants/ApiConstants.js
new file mode 100644
index 0000000..bbf8fe5
--- /dev/null
+++ b/admin/src/constants/ApiConstants.js
@@ -0,0 +1,3 @@
+const API_HOSTNAME = '//localhost:3008'
+
+export const posterUrl = poster => poster && `${API_HOSTNAME}/uploads/posters/${poster}`
diff --git a/admin/src/constants/DishTableColumns.js b/admin/src/constants/DishTableColumns.js
index b1dcf30..660021e 100644
--- a/admin/src/constants/DishTableColumns.js
+++ b/admin/src/constants/DishTableColumns.js
@@ -1,10 +1,15 @@
 import React from 'react'
 import { Link } from 'react-router-dom'
+import { posterUrl } from '../constants/ApiConstants'
+import styled from 'styled-components'
 const dishTableColumns = () => [
   {
     title: '海报',
-    dataIndex: 'poster'
+    dataIndex: 'poster',
+    render: poster => {
+      return <Poster src={posterUrl(poster)} />
+    }
   },
   {
     title: '菜品名称',
@@ -31,3 +36,8 @@ const dishTableColumns = () => [
 ]
 export default dishTableColumns
+
+const Poster = styled.img`
+  display: block;
+  width: 100px;
+`
```

一共改了两个文件。

ApiConstants.js 中定义了 posterUrl 函数，接收海报名，返回海报链接。

DishTableColumns 中，用 styled-components 定义了 Poster 组件，显示出了图片。

最后还要注意，Menu 中需要传入 rowKey

```diff
diff --git a/admin/src/components/Dishes.js b/admin/src/components/Dishes.js
index f399418..b6335d5 100644
--- a/admin/src/components/Dishes.js
+++ b/admin/src/components/Dishes.js
@@ -25,6 +25,7 @@ class Dishes extends Component {
     const content = (
       <Table columns={dishTableColumns()}
         dataSource={dishes}
+        rowKey={record => record._id}
       />
     )
     return (
```

传入一个独一无二的东西就像，相当于普通 react 组件数组使用的时候用的 key ，这一项不加上，终端中就会有警告信息。

看看达成的效果。完美。
