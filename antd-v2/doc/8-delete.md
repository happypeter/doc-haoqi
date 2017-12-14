# 添加删除甜点功能

这次来《添加删除甜点功能》。思路是先把后端删除甜点 API 调通，然后前端调用 API ，最后优化一下用户体验。

### 添加删除数据 API

那就先来《添加删除数据 API》。

```diff
diff --git a/happy-api-starter-1.0.0/controllers/dish.js b/happy-api-starter-1.0.0/controllers/dish.js
index 9fe75fc..de120f8 100755
--- a/happy-api-starter-1.0.0/controllers/dish.js
+++ b/happy-api-starter-1.0.0/controllers/dish.js
@@ -12,6 +12,20 @@ exports.all = (req, res) => {
   )
 }
+exports.remove = (req, res) => {
+  Dish.findOne({ _id: req.params.id }).exec(
+    (err, dish) => {
+      if (err) return res.status(500).json({ msg: '查找失败', err })
+      if (dish) {
+        dish.remove( err => {
+          if (err) return res.status(500).json({ error: err.message });
+          return setTimeout(() => res.json({ msg: '删除成功' }), 300)
+        })
+      }
+    }
+  )
+}
+
 exports.seed = (req, res) => {
   const dishes = [
     {
diff --git a/happy-api-starter-1.0.0/routes.js b/happy-api-starter-1.0.0/routes.js
index 8ce5f9d..bd33ca7 100755
--- a/happy-api-starter-1.0.0/routes.js
+++ b/happy-api-starter-1.0.0/routes.js
@@ -18,6 +18,7 @@ module.exports = app => {
   // dishes
   app.get('/dishes', Dish.all)
   app.get('/seed-dishes', Dish.seed)
+  app.delete('/dish/:id', Dish.remove)
   // comments
   app.post('/comment', Comment.new)
```


具体代码细节跟我们课程的中心无关，就不细聊了。这里我们要关系的就是 API 链接， DELETE /dish/id .

Postman 测试一下，首先请求 GET /dishes ，输出中拷贝一个 dish 的 id ，然后发出 DELETE /dish/xxxid 的请求，输出信息中可以看到，删除成功。

### 前端调用 API

接下来《前端调用 API》。

主要删除工作都在 action 创建器中完成，所以第一步先要保证 action 中可以拿到要删除的甜点的 id 。

```diff
diff --git a/admin/src/actions/dishActions.js b/admin/src/actions/dishActions.js
index 709da8c..2ac1c45 100644
--- a/admin/src/actions/dishActions.js
+++ b/admin/src/actions/dishActions.js
@@ -9,3 +9,7 @@ export const fetchDishes = () => dispatch => {
     dispatch({ type: types.RECEIVE_DISHES, dishes })
   })
 }
+
+export const deleteDish = id => dishpatch => {
+  console.log(id)
+}
diff --git a/admin/src/components/Dishes.js b/admin/src/components/Dishes.js
index f837778..6cce575 100644
--- a/admin/src/components/Dishes.js
+++ b/admin/src/components/Dishes.js
@@ -5,10 +5,10 @@ import styled from 'styled-components'
 class Dishes extends Component {
   render () {
-    const { dishes, isFetching } = this.props
+    const { dishes, isFetching, deleteDish } = this.props
     const content = (
-      <Table columns={dishTableColumns()}
+      <Table columns={dishTableColumns(deleteDish)}
         dataSource={dishes}
         rowKey={record => record._id}
       />
diff --git a/admin/src/constants/DishTableColumns.js b/admin/src/constants/DishTableColumns.js
index 660021e..979aaa5 100644
--- a/admin/src/constants/DishTableColumns.js
+++ b/admin/src/constants/DishTableColumns.js
@@ -3,7 +3,7 @@ import { Link } from 'react-router-dom'
 import { posterUrl } from '../constants/ApiConstants'
 import styled from 'styled-components'
-const dishTableColumns = () => [
+const dishTableColumns = (deleteDish) => [
   {
     title: '海报',
     dataIndex: 'poster',
@@ -30,7 +30,7 @@ const dishTableColumns = () => [
     title: '操作',
     dataIndex: '_id',
     render: id => {
-      return <Link to='#'>删除</Link>
+      return <Link to='#' onClick={() => deleteDish(id)}>删除</Link>
     }
   }
 ]
diff --git a/admin/src/containers/DishesContainer.js b/admin/src/containers/DishesContainer.js
index 9e270ba..33bf78c 100644
--- a/admin/src/containers/DishesContainer.js
+++ b/admin/src/containers/DishesContainer.js
@@ -1,6 +1,7 @@
 import React from 'react'
 import Dishes from '../components/Dishes'
 import { connect } from 'react-redux'
+import { deleteDish } from '../actions/dishActions'
 const DishesContainer = props => <Dishes {...props} />
@@ -9,4 +10,6 @@ const mapStateToProps = state => ({
   isFetching: state.dish.isFetching
 })
-export default connect(mapStateToProps)(DishesContainer)
+export default connect(mapStateToProps, {
+  deleteDish
+})(DishesContainer)
```

一共修改了四个文件。

dishActions.js 文件中，添加一个 deleteDish action 创建器，里面暂时只打印收到的 id 。

容器组件 DishesContainer 中拿到它，传递给展示组件。

展示组件 Dishes 再传递给列定义文件，因为真正的删除按钮是在列定义文件中的，

dishTableColumns 点删除的时候，把这一列的数据，也就是甜点 id 传递给 deleteDish 即可。

这样 deleteDish 中可以获得甜点 id 了，下一步来调用 API 。

```diff
diff --git a/admin/src/actions/dishActions.js b/admin/src/actions/dishActions.js
index 2ac1c45..25f6ace 100644
--- a/admin/src/actions/dishActions.js
+++ b/admin/src/actions/dishActions.js
@@ -1,5 +1,5 @@
 import * as types from '../constants/ActionTypes'
-import { DISHES_URL } from '../constants/ApiConstants'
+import { DISHES_URL, DELETE_DISH_URL } from '../constants/ApiConstants'
 import axios from 'axios'
 export const fetchDishes = () => dispatch => {
@@ -11,5 +11,10 @@ export const fetchDishes = () => dispatch => {
 }
 export const deleteDish = id => dishpatch => {
-  console.log(id)
+  axios.delete(DELETE_DISH_URL.replace(':id', id))
+    .then (
+      res => {
+        console.log('删除成功')
+      }
+    )
 }
diff --git a/admin/src/constants/ApiConstants.js b/admin/src/constants/ApiConstants.js
index 077afaf..971e5c0 100644
--- a/admin/src/constants/ApiConstants.js
+++ b/admin/src/constants/ApiConstants.js
@@ -2,3 +2,4 @@ const API_HOSTNAME = '//localhost:3008'
 export const posterUrl = poster => poster && `${API_HOSTNAME}/uploads/posters/${poster}`
 export const DISHES_URL = `${API_HOSTNAME}/dishes`
+export const DELETE_DISH_URL = `${API_HOSTNAME}/dish/:id`
diff --git a/happy-api-starter-1.0.0/controllers/dish.js b/happy-api-starter-1.0.0/controllers/dish.js
index de120f8..ea45f96 100755
--- a/happy-api-starter-1.0.0/controllers/dish.js
+++ b/happy-api-starter-1.0.0/controllers/dish.js
@@ -6,7 +6,7 @@ exports.all = (req, res) => {
     (err, dishes) => {
       if (err) return res.status(500).json({ msg: '查找失败', err })
       if (dishes) {
-        return setTimeout(() => res.json({ msg: '读取成功', dishes }), 3000)
+        return setTimeout(() => res.json({ msg: '读取成功', dishes }), 300)
       }
     }
   )
```

这次一共改了三个文件。

ApiConstants 常量文件中添加了请求链接，注意这里的动态参数 :id

dishActions 文件中，通过字符串替换来换成实际 id 。

第三处修改在服务器端代码的 dish.js 中，缩短了一下数据加载时间，方便调试。

看看达成的效果。页面上点删除链接，终端中可以打印出删除成功字样，不过页面上的甜点不会立刻消失，需要手动刷新页面才会消失。

### 更新 Redux 数据

所以就需要来《更新 Redux 数据》。这样就可以保证删除后甜点要在页面上自动消失。

```diff
diff --git a/admin/src/actions/dishActions.js b/admin/src/actions/dishActions.js
index 25f6ace..251422b 100644
--- a/admin/src/actions/dishActions.js
+++ b/admin/src/actions/dishActions.js
@@ -10,11 +10,11 @@ export const fetchDishes = () => dispatch => {
   })
 }
-export const deleteDish = id => dishpatch => {
+export const deleteDish = id => dispatch => {
   axios.delete(DELETE_DISH_URL.replace(':id', id))
-    .then (
+    .then(
       res => {
-        console.log('删除成功')
+        dispatch({ type: types.REMOVE_DISH, id })
       }
     )
 }
diff --git a/admin/src/constants/ActionTypes.js b/admin/src/constants/ActionTypes.js
index bd99d69..cf6d8ab 100644
--- a/admin/src/constants/ActionTypes.js
+++ b/admin/src/constants/ActionTypes.js
@@ -2,3 +2,4 @@ export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
 export const UPDATE_SELECTED_INDEX = 'UPDATE_SELECTED_INDEX'
 export const RECEIVE_DISHES = 'RECEIVE_DISHES'
 export const REQUEST_DISHES = 'REQUEST_DISHES'
+export const REMOVE_DISH = 'REMOVE_DISH'
diff --git a/admin/src/reducers/dish.js b/admin/src/reducers/dish.js
index 760b7b2..d10ebc2 100644
--- a/admin/src/reducers/dish.js
+++ b/admin/src/reducers/dish.js
@@ -5,6 +5,8 @@ const all = (state = [], action) => {
   switch (action.type) {
     case types.RECEIVE_DISHES:
       return action.dishes
+    case types.REMOVE_DISH:
+      return state.filter(dish => dish._id !== action.id)
     default:
       return state
   }
```

一共修改了三个文件。

ActionTypes 文件中新添加了一个 action 类型， `REMOVE_DISH` 。

dishActions 中，当服务器端删除数据成功后，发出这个 action 给 reducer ，负载数据是被删除的这个甜点的 id 。

reducer 文件 dish.js 中拿到被删除的 dish 的 id 把它从状态树中剔除掉即可。

看看达成的效果。页面上再次删除，这次甜点条目立即就消失了。但是如果能再有个提示信息是不是就更棒了呢？

### 添加操作成功提示信息

所以来《添加操作成功提示信息》。会用到 Promise 的技巧。

```diff
diff --git a/admin/src/actions/dishActions.js b/admin/src/actions/dishActions.js
index 251422b..36397b4 100644
--- a/admin/src/actions/dishActions.js
+++ b/admin/src/actions/dishActions.js
@@ -11,10 +11,11 @@ export const fetchDishes = () => dispatch => {
 }
 export const deleteDish = id => dispatch => {
-  axios.delete(DELETE_DISH_URL.replace(':id', id))
+  return axios.delete(DELETE_DISH_URL.replace(':id', id))
     .then(
       res => {
         dispatch({ type: types.REMOVE_DISH, id })
+        return { msg: '删除甜点成功' }
       }
     )
 }
diff --git a/admin/src/components/Dishes.js b/admin/src/components/Dishes.js
index 6cce575..f585ac9 100644
--- a/admin/src/components/Dishes.js
+++ b/admin/src/components/Dishes.js
@@ -1,14 +1,20 @@
 import React, { Component } from 'react'
-import { Table, Spin } from 'antd'
+import { Table, Spin, message } from 'antd'
 import dishTableColumns from '../constants/DishTableColumns'
 import styled from 'styled-components'
 class Dishes extends Component {
+  handleClick = id => {
+    this.props.deleteDish(id).then(
+      success => message.success(success.msg)
+    )
+  }
+
   render () {
     const { dishes, isFetching, deleteDish } = this.props
     const content = (
-      <Table columns={dishTableColumns(deleteDish)}
+      <Table columns={dishTableColumns(this.handleClick)}
         dataSource={dishes}
         rowKey={record => record._id}
       />
```

修改了两个文件。

dishActions.js 中， axios 的 .then 会返回一个 Promise ，在 axios 前面加上 return 就会把这个 Promise 返回会给 deleteDish 的呼叫者。要携带的信息通过下面的 return 语句来完成。

到展示组件 Dishes.js 中，把 action 创建器封装到 handleClick 函数中，让创建器执行成功后，运行这里的 .then 显示全局提示，handleClick 传递给列定义文件去呼叫执行。

看看达成的效果。页面中删除一个甜点，可以弹出全局提示显示“删除成功了”。如果删除失败了呢？

### 添加操作失败提示信息

所以还需要《添加操作失败提示信息》。

```diff
diff --git a/admin/src/actions/dishActions.js b/admin/src/actions/dishActions.js
index 36397b4..1e2d2d1 100644
--- a/admin/src/actions/dishActions.js
+++ b/admin/src/actions/dishActions.js
@@ -17,5 +17,11 @@ export const deleteDish = id => dispatch => {
         dispatch({ type: types.REMOVE_DISH, id })
         return { msg: '删除甜点成功' }
       }
+    ).catch(
+      err => {
+        const serverErr = err && err.response
+        console.log('服务器报错：', serverErr)
+        throw new Error('服务器出错啦')
+      }
     )
 }
diff --git a/admin/src/components/Dishes.js b/admin/src/components/Dishes.js
index f585ac9..aa9574a 100644
--- a/admin/src/components/Dishes.js
+++ b/admin/src/components/Dishes.js
@@ -7,11 +7,13 @@ class Dishes extends Component {
   handleClick = id => {
     this.props.deleteDish(id).then(
       success => message.success(success.msg)
+    ).catch(
+      err => message.error(err.message)
     )
   }
   render () {
-    const { dishes, isFetching, deleteDish } = this.props
+    const { dishes, isFetching } = this.props
     const content = (
       <Table columns={dishTableColumns(this.handleClick)}
diff --git a/happy-api-starter-1.0.0/controllers/dish.js b/happy-api-starter-1.0.0/controllers/dish.js
index ea45f96..5246be3 100755
--- a/happy-api-starter-1.0.0/controllers/dish.js
+++ b/happy-api-starter-1.0.0/controllers/dish.js
@@ -15,7 +15,7 @@ exports.all = (req, res) => {
 exports.remove = (req, res) => {
   Dish.findOne({ _id: req.params.id }).exec(
     (err, dish) => {
-      if (err) return res.status(500).json({ msg: '查找失败', err })
+      return res.status(500).json({ msg: '查找失败', err })
       if (dish) {
         dish.remove( err => {
           if (err) return res.status(500).json({ error: err.message });
```

一共修改三个文件。

先看服务器上的 dish.js 文件，故意返回一个 500 状态，并且把错误信息也发送给客户端，

dishActions.js 中，axios 只要收到非 2xx 的状态码就会执行 .catch 中的语句。详细的报错信息拿到后直接打印到终端中，方便开发者调试，只把简单的报错信息“服务器端报错啦”，返回给调用者。如果这里直接 return 一个对象，那么到 deleteDish 的调用位置，就会在 .then 中接收到报错，这里我们希望用 .catch 接收，所以需要 throw 一个 Error 。

回到展示组件 Dishes.js，把错误信息通过全局提示组件显示到页面上即可。

看看达成的效果。用户点删除，可以看到报错提示。调试完毕不要忘了把服务器端代码改回去。
