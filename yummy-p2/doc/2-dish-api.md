# 使用服务器端的数据

欢迎来到新的一节《使用服务器端数据》。让前端猜你喜欢部分的数据真正来自数据库中。

### 临时数据移动到 redux

进入下一部分《临时数据移动到 redux》。目的是把 reducer/selector 这一条线先跑通。

添加 dish reducer 文件。

```diff
diff --git a/client/src/components/Dishes.js b/client/src/components/Dishes.js
index 4a36ac7..3b4325a 100644
--- a/client/src/components/Dishes.js
+++ b/client/src/components/Dishes.js
@@ -13,24 +13,7 @@ class Dishes extends Component {
       slidesToScroll: 1,
       arrows: false
     }
-
-    const dishes = [
-      {
-        _id: '1',
-        poster: 'tlms.png',
-        name: '提拉米苏',
-        price: 20,
-        desc: '好吃好吃'
-      },
-      {
-        _id: '2',
-        poster: 'hsl.png',
-        name: '黑森林',
-        price: 20,
-        desc: '好吃好吃'
-      }
-    ]
-
+    const { dishes } = this.props
     return (
       <Wrap>
         <Slider {...settings}>
diff --git a/client/src/reducers/dish.js b/client/src/reducers/dish.js
new file mode 100644
index 0000000..7af4b83
--- /dev/null
+++ b/client/src/reducers/dish.js
@@ -0,0 +1,30 @@
+import * as types from '../constants/ActionTypes'
+import { combineReducers } from 'redux'
+
+const initState = [
+  {
+    _id: '1',
+    poster: 'tlms.png',
+    name: '提拉米苏',
+    price: 20,
+    desc: '好吃好吃'
+  },
+  {
+    _id: '2',
+    poster: 'hsl.png',
+    name: '黑森林',
+    price: 20,
+    desc: '好吃好吃'
+  }
+]
+
+const all = (state = initState, action) => {
+  switch (action.type) {
+    default:
+      return state
+  }
+}
+
+export default combineReducers({
+  all
+})
\ No newline at end of file
```

把数据移动到了 reducer 。而且没错，combineReducers 中只传入一项内容也是没有问题的。

rootReducer 中来导入一下。

```diff
diff --git a/client/src/containers/DishesContainer.js b/client/src/containers/DishesContainer.js
index a56ae31..eacd9b8 100644
--- a/client/src/containers/DishesContainer.js
+++ b/client/src/containers/DishesContainer.js
@@ -1,6 +1,12 @@
 import React from 'react'
 import Dishes from '../components/Dishes'
+import { connect } from 'react-redux'
+import { getDishes } from '../selectors/dishSelectors'
 const DishesContainer = props => <Dishes {...props} />
-export default DishesContainer
\ No newline at end of file
+const mapStateToProps = state => ({
+  dishes: getDishes(state)
+})
+
+export default connect(mapStateToProps)(DishesContainer)
\ No newline at end of file
diff --git a/client/src/reducers/index.js b/client/src/reducers/index.js
index 194aaa2..918baa0 100644
--- a/client/src/reducers/index.js
+++ b/client/src/reducers/index.js
@@ -2,11 +2,13 @@ import { combineReducers } from 'redux'
 import common from './common'
 import auth from './auth'
 import user from './user'
+import dish from './dish'
 const rootReducer = combineReducers({
   common,
   auth,
-  user
+  user,
+  dish
 })
diff --git a/client/src/selectors/dishSelectors.js b/client/src/selectors/dishSelectors.js
new file mode 100644
index 0000000..b3b832e
--- /dev/null
+++ b/client/src/selectors/dishSelectors.js
@@ -0,0 +1 @@
+export const getDishes = state => state.dish.all
```

然后把 selector 添加好，就可以到容器组件中去拿数据了。

看看本部分达成的效果。页面显示依旧，但是这次的数据是来自 redux 了。

至此，《临时数据移动到 redux》这部分就胜利完成了。

### 添加后端数据

进入下一部分《添加后端数据》。先把 mongodb 里放一些种子数据。

首先添加数据模式，

```diff
diff --git a/happy-api-starter-1.0.0/models/dish.js b/happy-api-starter-1.0.0/models/dish.js
new file mode 100755
index 0000000..f7a9c48
--- /dev/null
+++ b/happy-api-starter-1.0.0/models/dish.js
@@ -0,0 +1,13 @@
+const mongoose = require('mongoose')
+
+const DishSchema = new mongoose.Schema(
+  {
+    name: { type: String, required: true },
+    desc: { type: String, required: true },
+    poster: { type: String, required: true },
+    price: { type: Number, required: true },
+  },
+  { timestamps: true }
+)
+
+module.exports = mongoose.model('Dish', DishSchema)
diff --git a/happy-api-starter-1.0.0/models/post.js b/happy-api-starter-1.0.0/models/post.js
deleted file mode 100755
index 367fb84..0000000
--- a/happy-api-starter-1.0.0/models/post.js
+++ /dev/null
@@ -1,11 +0,0 @@
-const mongoose = require('mongoose')
-
-const PostSchema = new mongoose.Schema(
-  {
-    title: { type: String, required: true },
-    content: { type: String, required: true }
-  },
-  { timestamps: true }
-)
-
-module.exports = mongoose.model('Post', PostSchema)
```


删除原有的 post.js 添加了 user.js ，描述了一下数据的字段名和数据类型。


再来添加 controller


```diff
diff --git a/happy-api-starter-1.0.0/controllers/Post.js b/happy-api-starter-1.0.0/controllers/Post.js
deleted file mode 100755
index 2c5c687..0000000
--- a/happy-api-starter-1.0.0/controllers/Post.js
+++ /dev/null
@@ -1,45 +0,0 @@
-const Post = require('../models/post.js')
-
-// 删除一篇文章
-exports.remove = (req, res) => {
-  const { id } = req.params
-  Post.findById({_id: id}).exec(
-    (err, post) => {
-      if (err) return res.status(500).json({ msg: '查找失败', err })
-      if (!post) {
-        // 如果 id 不存在，err 为 null 但是 post 会为空
-        res.status(400).json({ msg: '未找到记录' })
-      } else {
-        post.remove(err => {
-          if (err) return res.status(500).json({error: err.message})
-          setTimeout(() => res.json({ msg: '删除成功！' }), 400)
-        })
-      }
-    }
-  )
-}
-
-// 列出所有文章
-exports.all = (req, res) => {
-  Post.find({}).exec(
-    (err, posts) => {
-      if (err) return res.status(500).json({ msg: '查找失败', err })
-      if (posts) {
-        return setTimeout(() => res.json({ msg: '读取成功', posts }), 400)
-      }
-    }
-  )
-}
-
-// 新建一篇文章
-exports.new = (req, res) => {
-  const _post = req.body
-  const post = new Post(_post)
-  post.save((err, post) => {
-    if (err) return res.status(500).json({ msg: '保存失败，请重试', err })
-    res.json({
-      post,
-      msg: '保存成功'
-    })
-  })
-}
diff --git a/happy-api-starter-1.0.0/controllers/dish.js b/happy-api-starter-1.0.0/controllers/dish.js
new file mode 100755
index 0000000..860d37e
--- /dev/null
+++ b/happy-api-starter-1.0.0/controllers/dish.js
@@ -0,0 +1,40 @@
+const Dish = require('../models/dish.js')
+
+
+// 列出所有文章
+exports.all = (req, res) => {
+  Dish.find({}).exec(
+    (err, dishes) => {
+      if (err) return res.status(500).json({ msg: '查找失败', err })
+      if (dishes) {
+        return setTimeout(() => res.json({ msg: '读取成功', dishes }), 400)
+      }
+    }
+  )
+}
+
+exports.seed = (req, res) => {
+  const dishes = [
+    {
+      _id: '1',
+      poster: 'tlms.png',
+      name: '提拉米苏',
+      price: 20,
+      desc: '好吃好吃'
+    },
+    {
+      _id: '2',
+      poster: 'hsl.png',
+      name: '黑森林',
+      price: 20,
+      desc: '好吃好吃'
+    }
+  ]
+
+  dishes.forEach(dish => {
+    let newDish = new Dish(dish)
+    newDish.save()
+  })
+
+  res.send('填充数据库成功！')
+}
\ No newline at end of file
```

.all 接口会列出所有甜点数据。.seed 的作用就是添加种子数据。

最后添加对应的路由


```diff
diff --git a/happy-api-starter-1.0.0/routes.js b/happy-api-starter-1.0.0/routes.js
index 2894fc7..e50bb95 100755
--- a/happy-api-starter-1.0.0/routes.js
+++ b/happy-api-starter-1.0.0/routes.js
@@ -1,5 +1,5 @@
 const User = require('./controllers/user')
-const Post = require('./controllers/post')
+const Dish = require('./controllers/dish')
 module.exports = app => {
   // account
@@ -9,8 +9,7 @@ module.exports = app => {
   app.get('/users', User.all)
   app.get('/user/:id', User.getById)
-  // post
-  app.post('/post', Post.new)
-  app.delete('/post/:id', Post.remove)
-  app.get('/posts', Post.all)
+  // dishes
+  app.get('/dishes', Dish.all)
+  app.get('/seed-dishes', Dish.seed)
 }
```

路由添加完毕。

看看本部分达成的效果。浏览器中，首先访问 /seed-dishes ，可以看到种子数据可以成功添加进 mongodb 数据库，然后访问 /dishes 就可以看到这些数据了。
至此，《添加后端数据》这部分就胜利完成了。

###  请求后端 API

进入下一部分《请求后端 API》。从 API 拿到数据，并填充到 redux 中。

定义 action 类型。

```diff
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index 2da22a9..9d7ba7e 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -13,3 +13,5 @@ export const LOGIN_REQUEST  = 'LOGIN_REQUEST'
 export const LOGIN_FAILURE  = 'LOGIN_FAILURE'
 export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
 export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
+
+export const RECEIVE_DISHES = 'RECEIVE_DISHES'
\ No newline at end of file
```

名字就叫 RECEIVE_DISHES ，接收甜点数据。

定义 action 创建器。


```diff
diff --git a/client/src/actions/dishActions.js b/client/src/actions/dishActions.js
new file mode 100644
index 0000000..b447055
--- /dev/null
+++ b/client/src/actions/dishActions.js
@@ -0,0 +1,15 @@
+import * as types from '../constants/ActionTypes'
+import axios from 'axios'
+import { DISHES_URL } from '../constants/ApiConstants'
+
+const receiveDishes = dishes => ({
+  type: types.RECEIVE_DISHES,
+  dishes
+})
+
+export const fetchDishes = () => dispatch => {
+  axios.get(DISHES_URL).then(res => {
+    dispatch(receiveDishes(res.data.dishes))
+  }
+  )
+}
```

请求后端 API 中的数据。

添加必要的常量


```diff
diff --git a/client/src/constants/ApiConstants.js b/client/src/constants/ApiConstants.js
index 225b540..c176707 100644
--- a/client/src/constants/ApiConstants.js
+++ b/client/src/constants/ApiConstants.js
@@ -5,3 +5,4 @@ export const LOGIN_URL = `${API_HOSTNAME}/user/login`
 export const USERS_URL = `${API_HOSTNAME}/users`
 export const USER_BY_ID_URL = `${API_HOSTNAME}/user/:id`
 export const posterUrl = poster => `${API_HOSTNAME}/uploads/posters/${poster}`
+export const DISHES_URL = `${API_HOSTNAME}/dishes`
```

添加了请求所有甜点的 API 链接。

定义 reducer 。


```diff
diff --git a/client/src/reducers/dish.js b/client/src/reducers/dish.js
index 7af4b83..d4aa10f 100644
--- a/client/src/reducers/dish.js
+++ b/client/src/reducers/dish.js
@@ -1,25 +1,11 @@
 import * as types from '../constants/ActionTypes'
 import { combineReducers } from 'redux'
-const initState = [
-  {
-    _id: '1',
-    poster: 'tlms.png',
-    name: '提拉米苏',
-    price: 20,
-    desc: '好吃好吃'
-  },
-  {
-    _id: '2',
-    poster: 'hsl.png',
-    name: '黑森林',
-    price: 20,
-    desc: '好吃好吃'
-  }
-]
-const all = (state = initState, action) => {
+const all = (state = [], action) => {
   switch (action.type) {
+    case types.RECEIVE_DISHES:
+      return action.dishes
     default:
       return state
   }
```

接收数据并修改 dish.all 状态值。

App.js 中呼叫 action 创建器。


```diff
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index 14154d8..d9dc4a2 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -11,11 +11,13 @@ import {
   Switch,
   Route
 } from 'react-router-dom'
+import { fetchDishes } from '../actions/dishActions'
 class App extends Component {
   componentDidMount () {
     this.props.fetchUsers()
     this.props.fetchCurrentUser()
+    this.props.fetchDishes()
   }
   render () {
@@ -32,5 +34,6 @@ class App extends Component {
 export default connect(null, {
   fetchUsers,
-  fetchCurrentUser
+  fetchCurrentUser,
+  fetchDishes
 })(App)
```

应用加载的时候就会发出请求。

最后运行一下 `standard --fix` 来处理一下格式问题。

看看本部分达成的效果。页面上显示依然正常，chrome console 中可以看到 redux 中数据的变化。

至此，《请求后端 API》这部分就胜利完成了。

### 结语

进入最后一个部分《结语》。

复盘一下本节思路。首先到服务器端插入了种子数据，并开放了请求所有甜点的接口。前端在页面加载时，会执行 fetchDishes 这个 action ，从后端取到数据后，发送给 reducer ，reducer 接收数据并修改状态树之后，界面上也就能直接显示出来了，因为咱们上一节已经把 redux 读取数据的这条线跑通了。

至此，《使用服务器端的数据》就胜利完成了。
