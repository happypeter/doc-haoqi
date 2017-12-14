# 调用 API 和体现加载状态

这集来《调用 API 和体现加载状态》。现在要跟后端 API 打交道了，后端代码来自《React 社交化电商--功能篇》那门课程。

### 读取数据

先来《读取数据》，存入 Redux ，并显示在界面上。前面咱们不是已经添加了种子数据，所以现在访问读取所有甜点的 API ，也就是 localhost:3008/dishes 是能够拿到所有甜点的数组的。

第一步，页面加载的时候来触发读取甜点的 action 创建器，并把数据保存到 redux 中

```diff
diff --git a/admin/src/actions/dishActions.js b/admin/src/actions/dishActions.js
+++ b/admin/src/actions/dishActions.js
@@ -0,0 +1,10 @@
+import * as types from '../constants/ActionTypes'
+import { DISHES_URL } from '../constants/ApiConstants'
+import axios from 'axios'
+
+export const fetchDishes = () => dispatch => {
+  axios.get(DISHES_URL).then(res => {
+    const { dishes } = res.data
+    dispatch({ type: types.RECEIVE_DISHES, dishes })
+  })
+}
diff --git a/admin/src/constants/ActionTypes.js b/admin/src/constants/ActionTypes.js
@@ -1,2 +1,3 @@
 export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
 export const UPDATE_SELECTED_INDEX = 'UPDATE_SELECTED_INDEX'
+export const RECEIVE_DISHES = 'RECEIVE_DISHES'
diff --git a/admin/src/constants/ApiConstants.js b/admin/src/constants/ApiConstants.js
index bbf8fe5..077afaf 100644
--- a/admin/src/constants/ApiConstants.js
+++ b/admin/src/constants/ApiConstants.js
@@ -1,3 +1,4 @@
 const API_HOSTNAME = '//localhost:3008'
 export const posterUrl = poster => poster && `${API_HOSTNAME}/uploads/posters/${poster}`
+export const DISHES_URL = `${API_HOSTNAME}/dishes`
diff --git a/admin/src/containers/App.js b/admin/src/containers/App.js
index 58a994a..33853fa 100644
--- a/admin/src/containers/App.js
+++ b/admin/src/containers/App.js
@@ -9,9 +9,11 @@ import {
   Route
 } from 'react-router'
 import { loadSelectedIndex } from '../actions/navActions'
+import { fetchDishes } from '../actions/dishActions'
 class App extends Component {
   componentDidMount () {
+    this.props.fetchDishes()
     this.props.loadSelectedIndex()
   }
@@ -33,5 +35,6 @@ const mapStateToProps = state => ({
 })
 export default connect(mapStateToProps, {
-  loadSelectedIndex
+  loadSelectedIndex,
+  fetchDishes
 })(App)
diff --git a/admin/src/reducers/dish.js b/admin/src/reducers/dish.js
new file mode 100644
index 0000000..fd44242
--- /dev/null
+++ b/admin/src/reducers/dish.js
@@ -0,0 +1,15 @@
+import * as types from '../constants/ActionTypes'
+import { combineReducers } from 'redux'
+
+const all = (state = [], action) => {
+  switch (action.type) {
+    case types.RECEIVE_DISHES:
+      return action.dishes
+    default:
+      return state
+  }
+}
+
+export default combineReducers({
+  all
+})
diff --git a/admin/src/reducers/index.js b/admin/src/reducers/index.js
index 15840c6..8674285 100644
--- a/admin/src/reducers/index.js
+++ b/admin/src/reducers/index.js
@@ -1,8 +1,10 @@
 import { combineReducers } from 'redux'
 import common from './common'
+import dish from './dish'
 const rootReducer = combineReducers({
-  common
+  common,
+  dish
 })
 export default rootReducer
```

一共修改了六个文件。

ActionTypes.js 总定义一个新的 Action 类型，RECEIVE_DISHES 。

ApiConstants.js 中添加了读取所有甜点的 API 链接 DISHES_URL 。

然后创建 actions/dishActions.js 文件来写 action 创建器，fecthDishes 创建器中请求了后端读取所有甜点的 API ，拿到的数据，伴随 RECEIVE_DISHES 这个 action ，一起发送给 reducers 。

然后 dish.js 中，可以看到数据保存到了 dish.all 这个数组中。

再进入 rootReducer 中， 导入 dish.js

最后到 App.js 中添加触发 action 的语句。

看看达成的效果。刷新一下页面，终端中可以看到，dish.all 的状态值果然就是服务器上返回的数据。

### 显示真实数据

下面就来《显示真实数据》。

```diff
diff --git a/admin/src/components/Dishes.js b/admin/src/components/Dishes.js
index b6335d5..12412af 100644
--- a/admin/src/components/Dishes.js
+++ b/admin/src/components/Dishes.js
@@ -5,22 +5,7 @@ import styled from 'styled-components'
 class Dishes extends Component {
   render () {
-    const dishes = [
-      {
-        _id: '5a26738e8ed6687f81859d24',
-        name: '提拉米苏',
-        price: 23,
-        poster: 'tlms.png',
-        desc: '非常好吃'
-      },
-      {
-        _id: '5a2683d98ed6687f81859d25',
-        name: '黑森林',
-        price: 12,
-        poster: 'hsl.png',
-        desc: '非常好吃'
-      }
-    ]
+    const { dishes } = this.props
     const content = (
       <Table columns={dishTableColumns()}
diff --git a/admin/src/containers/DishesContainer.js b/admin/src/containers/DishesContainer.js
index b6056a3..ffeef92 100644
--- a/admin/src/containers/DishesContainer.js
+++ b/admin/src/containers/DishesContainer.js
@@ -4,6 +4,8 @@ import { connect } from 'react-redux'
 const DishesContainer = props => <Dishes {...props} />
-const mapStateToProps = state => ({ })
+const mapStateToProps = state => ({
+  dishes: state.dish.all
+})
 export default connect(mapStateToProps)(DishesContainer)
```

修改了两个文件。

容器组件 DishesContainer 中先把数据拿到，存放到 dishes 变量中，

展示组件 Dishes 中，把临时数据换成 this.props.dishes 数据。

看看达成的效果。页面上没有变化，但是已经是真实的数据了。

### 体现加载状态

页面刷新，加载数据的时候肯定是有延迟的，达成更好的用户体验，就需要《体现加载状态》。思路就是添加 dishes.isFetching 状态位，同时使用一下蚂蚁设计的[加载中](https://ant.design/components/spin-cn/)组件。

先来添加状态位。

```diff
diff --git a/admin/src/actions/dishActions.js b/admin/src/actions/dishActions.js
index f7e9907..709da8c 100644
--- a/admin/src/actions/dishActions.js
+++ b/admin/src/actions/dishActions.js
@@ -3,6 +3,7 @@ import { DISHES_URL } from '../constants/ApiConstants'
 import axios from 'axios'
 export const fetchDishes = () => dispatch => {
+  dispatch({ type: types.REQUEST_DISHES })
   axios.get(DISHES_URL).then(res => {
     const { dishes } = res.data
     dispatch({ type: types.RECEIVE_DISHES, dishes })
diff --git a/admin/src/constants/ActionTypes.js b/admin/src/constants/ActionTypes.js
index 1d82754..bd99d69 100644
--- a/admin/src/constants/ActionTypes.js
+++ b/admin/src/constants/ActionTypes.js
@@ -1,3 +1,4 @@
 export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
 export const UPDATE_SELECTED_INDEX = 'UPDATE_SELECTED_INDEX'
 export const RECEIVE_DISHES = 'RECEIVE_DISHES'
+export const REQUEST_DISHES = 'REQUEST_DISHES'
diff --git a/admin/src/reducers/dish.js b/admin/src/reducers/dish.js
index fd44242..760b7b2 100644
--- a/admin/src/reducers/dish.js
+++ b/admin/src/reducers/dish.js
@@ -10,6 +10,18 @@ const all = (state = [], action) => {
   }
 }
+const isFetching = (state = false, action) => {
+  switch (action.type) {
+    case types.REQUEST_DISHES:
+      return true
+    case types.RECEIVE_DISHES:
+      return false
+    default:
+      return state
+  }
+}
+
 export default combineReducers({
-  all
+  all,
+  isFetching
 })
```

修改了三个文件。

ActionTypes 文件中又添加了一个新的 `DISHES_REQUEST` 。

dishActions 文件中，在发起 axios 请求之前，先发出一个 `DISHES_REQUEST` action ，它的作用就是专门用来通知 redux ，说我现在开始加载数据啦，你马上把 isFething 状态位设置为 true 吧。

具体修改数据还要依靠 reducer ，到 dish.js 中修改状态树即可。那 isFetching 也就是加载中这个状态位何时恢复为 false 呢？那就是数据获取成功之后呗，所以当 `RECEIVE_DISHES` 收到后，isFetching 就会重新设置为 false 。

下一步就是到组件中使用这个状态位，它为 true 这这段时间，显示加载中图标就行了。

```diff
diff --git a/admin/src/components/Dishes.js b/admin/src/components/Dishes.js
index 12412af..f837778 100644
--- a/admin/src/components/Dishes.js
+++ b/admin/src/components/Dishes.js
@@ -1,11 +1,11 @@
 import React, { Component } from 'react'
-import { Table } from 'antd'
+import { Table, Spin } from 'antd'
 import dishTableColumns from '../constants/DishTableColumns'
 import styled from 'styled-components'
 class Dishes extends Component {
   render () {
-    const { dishes } = this.props
+    const { dishes, isFetching } = this.props
     const content = (
       <Table columns={dishTableColumns()}
@@ -16,7 +16,9 @@ class Dishes extends Component {
     return (
       <Wrap>
         {
-          content
+          isFetching
+          ? <StyledSpin />
+          : content
         }
       </Wrap>
     )
@@ -26,3 +28,8 @@ class Dishes extends Component {
 export default Dishes
 const Wrap = styled.div``
+
+const StyledSpin = styled(Spin)`
+  margin: 30px auto;
+  display: block;
+`
diff --git a/admin/src/containers/DishesContainer.js b/admin/src/containers/DishesContainer.js
index ffeef92..9e270ba 100644
--- a/admin/src/containers/DishesContainer.js
+++ b/admin/src/containers/DishesContainer.js
@@ -5,7 +5,8 @@ import { connect } from 'react-redux'
 const DishesContainer = props => <Dishes {...props} />
 const mapStateToProps = state => ({
-  dishes: state.dish.all
+  dishes: state.dish.all,
+  isFetching: state.dish.isFetching
 })
 export default connect(mapStateToProps)(DishesContainer)
diff --git a/happy-api-starter-1.0.0/controllers/dish.js b/happy-api-starter-1.0.0/controllers/dish.js
index 34cd924..9fe75fc 100755
--- a/happy-api-starter-1.0.0/controllers/dish.js
+++ b/happy-api-starter-1.0.0/controllers/dish.js
@@ -6,7 +6,7 @@ exports.all = (req, res) => {
     (err, dishes) => {
       if (err) return res.status(500).json({ msg: '查找失败', err })
       if (dishes) {
-        return setTimeout(() => res.json({ msg: '读取成功', dishes }), 400)
+        return setTimeout(() => res.json({ msg: '读取成功', dishes }), 3000)
       }
     }
   )
```

一共修改了三个文件。

首先到服务器端代码 dish.js 中，为了让效果更明显，所以 API 中添加了3秒的延迟。

容器组件 DishesContainer.js 中，读取 isFetching 。

展示组件 Dishes.js 中导入 Spin 组件，并对它加了点样式，最后当 isFetching 为 true 的这段时间，让 Spin 显示到页面上。

看看达成的效果。页面中刷新，可以看到加载中图标先出现，稍后图表会显示出来。
