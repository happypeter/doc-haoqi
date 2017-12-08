# 添加评论功能

欢迎来到新的一节《添加评论功能》。前端后端整个走一个基本功能开发流程。

### 先写界面

进入下一部分《先写界面》。美观的界面先出来，后面眼睛会比较愉悦一些。

先列出已有评论。




```diff
diff --git a/client/src/constants/ApiConstants.js b/client/src/constants/ApiConstants.js
index c176707..23e1f67 100644
--- a/client/src/constants/ApiConstants.js
+++ b/client/src/constants/ApiConstants.js
@@ -4,5 +4,5 @@ export const SIGNUP_URL = `${API_HOSTNAME}/user/signup`
 export const LOGIN_URL = `${API_HOSTNAME}/user/login`
 export const USERS_URL = `${API_HOSTNAME}/users`
 export const USER_BY_ID_URL = `${API_HOSTNAME}/user/:id`
-export const posterUrl = poster => `${API_HOSTNAME}/uploads/posters/${poster}`
+export const posterUrl = poster => poster && `${API_HOSTNAME}/uploads/posters/${poster}`
 export const DISHES_URL = `${API_HOSTNAME}/dishes`
```


```diff
diff --git a/client/src/components/DishComments.js b/client/src/components/DishComments.js
index 18526a1..236b9bc 100644
--- a/client/src/components/DishComments.js
+++ b/client/src/components/DishComments.js
@@ -1,4 +1,5 @@
 import React, { Component } from 'react'
+import DishCommentsItem from './DishCommentsItem'
 class DishComments extends Component {
@@ -10,9 +11,24 @@ class DishComments extends Component {
   }
   render() {
+    const comments = [
+      {
+        _id: '1',
+        content: '不错不错'
+      }
+    ]
+    const commentsCopy = comments.slice()
     return (
       <div>
         Comments
+        {
+          commentsCopy.reverse().map(comment => (
+            <DishCommentsItem
+              key={comment._id}
+              comment={comment}
+            />
+          ))
+        }
       </div>
     )
   }
diff --git a/client/src/components/DishCommentsItem.js b/client/src/components/DishCommentsItem.js
new file mode 100644
index 0000000..d618a7b
--- /dev/null
+++ b/client/src/components/DishCommentsItem.js
@@ -0,0 +1,66 @@
+import React from 'react'
+import Avatar from './Avatar'
+import styled from 'styled-components'
+import { Link } from 'react-router-dom'
+import { avatarUrl } from '../constants/ApiConstants'
+
+const DishCommentsItem = ({ comment }) => {
+  const { content } = comment
+  const avatar = undefined
+  return (
+    <Item>
+      <Avatar avatar={avatarUrl(avatar)}
+        size="50" />
+      <Details>
+        <UsernameTime>
+          <Username to={`/user/id`}>
+            三毛
+          </Username>
+          <Time>
+            三天前
+          </Time>
+        </UsernameTime>
+        <Content>
+          {content}
+        </Content>
+      </Details>
+    </Item>
+  )
+}
+
+export default DishCommentsItem
+
+const Item = styled.li`
+  display: flex;
+  margin: 30px 0;
+`
+
+
+const Details = styled.div`
+  flex-grow: 1;
+  margin-left: 9px;
+  padding-top: 5px;
+`
+
+
+const UsernameTime = styled.div`
+  display: flex;
+  justify-content: space-between;
+`
+
+const Username = styled(Link) `
+  font-size: 17px;
+  line-height: 24px;
+  color: #6E6E6E;
+`
+
+const Time = styled.div`
+  font-size: 14px;
+  line-height: 24px;
+  color: #AAAAAA;
+`
+
+const Content = styled.div`
+  font-size: 14px;
+  color: #AAAAAA;
+`
diff --git a/client/src/constants/ApiConstants.js b/client/src/constants/ApiConstants.js
index 23e1f67..ade730b 100644
--- a/client/src/constants/ApiConstants.js
+++ b/client/src/constants/ApiConstants.js
@@ -6,3 +6,8 @@ export const USERS_URL = `${API_HOSTNAME}/users`
 export const USER_BY_ID_URL = `${API_HOSTNAME}/user/:id`
 export const posterUrl = poster => poster && `${API_HOSTNAME}/uploads/posters/${poster}`
 export const DISHES_URL = `${API_HOSTNAME}/dishes`
+
+
+export const avatarUrl = avatar => avatar
+  ? `${API_HOSTNAME}/uploads/avatars/${avatar}`
+  : `${API_HOSTNAME}/uploads/avatars/default-avatar.png`
```

首先在 DishCommentItem 中完成一条评论显示的基本样式，其中要显示用户头像，所以到 ApiConstants 里面定义了 avavtarUrl 也就是头像链接，最后在 DishComments 组件里面调用 DishCommentItem ，先使用临时的假数据，然后逆序显示。

添加评论 Form 。


```diff
diff --git a/client/src/components/DishCommentForm.js b/client/src/components/DishCommentForm.js
new file mode 100644
index 0000000..8705fc8
--- /dev/null
+++ b/client/src/components/DishCommentForm.js
@@ -0,0 +1,78 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+class DishCommentForm extends Component {
+  state = {
+    text: ''
+  }
+
+  handleChange = e => {
+    this.setState({
+      text: e.target.value
+    })
+  }
+
+  submitComment = () => {
+    const { text } = this.state
+    console.log(text)
+    this.setState({
+      text: ''
+    })
+  }
+
+  render() {
+    const commentForm = (
+      <Form>
+        <Input value={this.state.text}
+          onChange={this.handleChange}
+          type="text"
+        />
+        <Button onClick={this.submitComment} type="submit">评论</Button>
+      </Form>
+    )
+    return (
+      <div>
+        {commentForm}
+      </div>
+    )
+  }
+}
+
+export default DishCommentForm
+
+const Form = styled.div`
+  display: flex;
+  justify-content: space-between;
+  background-color: #f7f7f7;
+  padding: 10px;
+  margin: 40px 0px;
+`
+
+const Input = styled.input`
+  border: 0;
+  outline: 0;
+  background-color: rgba(0, 0, 0, 0);
+  line-height: 31px;
+  font-size: 15px;
+  color: #777777;
+  flex-grow: 1;
+  & :focus {
+    outline: 0;
+    border: 0;
+  }
+`
+
+const Button = styled.button`
+  background-image: linear-gradient(-45deg, #F77062 0%, #FE5196 100%);
+  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.20);
+  border-radius: 2px;
+  font-size: 14px;
+  color: #FFFFFF;
+  text-align: center;
+  width: 90px;
+  border: 0;
+  &:focus {
+    border: 0;
+    outline: 0;
+  }
+`
diff --git a/client/src/components/DishComments.js b/client/src/components/DishComments.js
index 236b9bc..8553e09 100644
--- a/client/src/components/DishComments.js
+++ b/client/src/components/DishComments.js
@@ -1,5 +1,6 @@
 import React, { Component } from 'react'
 import DishCommentsItem from './DishCommentsItem'
+import DishCommentFormContainer from "../containers/DishCommentFormContainer";
 class DishComments extends Component {
@@ -20,7 +21,7 @@ class DishComments extends Component {
     const commentsCopy = comments.slice()
     return (
       <div>
-        Comments
+        <DishCommentFormContainer />
         {
           commentsCopy.reverse().map(comment => (
             <DishCommentsItem
diff --git a/client/src/containers/DishCommentFormContainer.js b/client/src/containers/DishCommentFormContainer.js
new file mode 100644
index 0000000..2d207d6
--- /dev/null
+++ b/client/src/containers/DishCommentFormContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import DishCommentForm from '../components/DishCommentForm'
+
+const DishCommentFormContainer = props => <DishCommentForm {...props} />
+
+export default DishCommentFormContainer
```

表单里面做出一个受控组件的效果，然后到 DishComments 中导入一下，因为评论是逆序显示的，所以这里正好评论框就放在评论列表之上。

看看本部分达成的效果。界面上看一下，样式都有了。
至此，《先写界面》这部分就胜利完成了。

### 后端添加评论种子数据

每一条评论数据都不仅仅是有自己的 _id 和 content ，还应该有是谁，也就是 User ，在哪个甜点，也就是 dish 上， 发布的。

先到服务器，添加 comment 的数据模型文件



```diff
diff --git a/happy-api-starter-1.0.0/models/comment.js b/happy-api-starter-1.0.0/models/comment.js
new file mode 100644
index 0000000..b5ee726
--- /dev/null
+++ b/happy-api-starter-1.0.0/models/comment.js
@@ -0,0 +1,12 @@
+const mongoose = require('mongoose');
+
+const CommentSchema = new mongoose.Schema(
+  {
+    content: { type: String, required: true },
+    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
+    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true }
+  },
+  { timestamps: true }
+)
+
+module.exports = mongoose.model('Comment', CommentSchema);
```

可以看到，保存的数据不仅仅是评论内容 content ，还有 user 和 dish 的 id ，用来建立当前数据和另外两类数据的关联。

再到 controller 中定义获取所有评论接口



```diff
diff --git a/happy-api-starter-1.0.0/controllers/comment.js b/happy-api-starter-1.0.0/controllers/comment.js
new file mode 100644
index 0000000..7ce02aa
--- /dev/null
+++ b/happy-api-starter-1.0.0/controllers/comment.js
@@ -0,0 +1,10 @@
+let Comment = require('../models/comment')
+
+exports.all = function (req, res) {
+  Comment.find().populate('user dish', 'username avatar poster').exec().then(
+    comments => {
+      return res.json({ msg: '读取评论成功', comments })
+    }
+  )
+}
+
```

在取出所有评论数据的时候，同时添加进来了 user 和 dish 的相关字段，包含用户的 username 和 avatar ，也就是用户名和头像，还有 dish ，也就是甜点的 poster 海报。

再来定义种子数据接口。





```diff
diff --git a/happy-api-starter-1.0.0/controllers/comment.js b/happy-api-starter-1.0.0/controllers/comment.js
index 7ce02aa..05af099 100644
--- a/happy-api-starter-1.0.0/controllers/comment.js
+++ b/happy-api-starter-1.0.0/controllers/comment.js
@@ -8,3 +8,25 @@ exports.all = function (req, res) {
   )
 }
+
+exports.seed = (req, res) => {
+  const comments = [
+    {
+      content: '好吃',
+      dish: '5a26738e8ed6687f81859d24',
+      user: '5a2638f58b8b05037aed5007'
+    },
+    {
+      content: '好吃',
+      dish: '5a26738e8ed6687f81859d24',
+      user: '5a2638f58b8b05037aed5007'
+    }
+  ]
+
+  comments.forEach(comment => {
+    let newComment = new Comment(comment)
+    newComment.save()
+  })
+
+  res.send('填充数据库成功！')
+}
diff --git a/happy-api-starter-1.0.0/controllers/dish.js b/happy-api-starter-1.0.0/controllers/dish.js
index 860d37e..57e2d3b 100755
--- a/happy-api-starter-1.0.0/controllers/dish.js
+++ b/happy-api-starter-1.0.0/controllers/dish.js
@@ -16,14 +16,12 @@ exports.all = (req, res) => {
 exports.seed = (req, res) => {
   const dishes = [
     {
-      _id: '1',
       poster: 'tlms.png',
       name: '提拉米苏',
       price: 20,
       desc: '好吃好吃'
     },
     {
-      _id: '2',
       poster: 'hsl.png',
       name: '黑森林',
       price: 20,
@@ -37,4 +35,4 @@ exports.seed = (req, res) => {
   })
   res.send('填充数据库成功！')
-}
\ No newline at end of file
+}
```

上面的 dish 和 user 的 id 值都是通过 postman 请求之前定义好的用户和甜点数据接口而得到的。同时注意 _id 一项就不用写了，因为保存到数据库的时候会自动生成这一项。

最后添加路由

```diff
diff --git a/happy-api-starter-1.0.0/routes.js b/happy-api-starter-1.0.0/routes.js
index e50bb95..77a8958 100755
--- a/happy-api-starter-1.0.0/routes.js
+++ b/happy-api-starter-1.0.0/routes.js
@@ -1,5 +1,6 @@
 const User = require('./controllers/user')
 const Dish = require('./controllers/dish')
+const Comment = require('./controllers/comment')
 module.exports = app => {
   // account
@@ -12,4 +13,8 @@ module.exports = app => {
   // dishes
   app.get('/dishes', Dish.all)
   app.get('/seed-dishes', Dish.seed)
+
+  // comments
+  app.get('/comments', Comment.all)
+  app.get('/seed-comments', Comment.seed)
 }
```

分别为读取所有评论，和填充种子数据两个接口设置了路由。

看一下本部分达成的最终效果。到 postman 中先去请求一下种子接口，看到返回填充数据库成功字样，接下来去请求所有评论信息，返回的数据中仔细观察，发现 user 和 dish 的相关信息，也就是之前我们在 populate 接口中填写的各项信息都返回了，但是 user.avatar 也就是用户头像一项没有返回，这个是因为数据库中 avatar 一项为空造成的，属于正常现象。

至此，《后端添加评论种子数据》这部分就胜利结束了。

### 读取评论

进入下一部分《读取评论》。把服务器端的真实数据读取到 redux 中。

老套路，添加 action/selector/reducer 进来

```diff
diff --git a/client/src/actions/commentActions.js b/client/src/actions/commentActions.js
new file mode 100644
index 0000000..3f5e01c
--- /dev/null
+++ b/client/src/actions/commentActions.js
@@ -0,0 +1,16 @@
+import * as types from '../constants/ActionTypes'
+import { COMMENTS_URL } from '../constants/ApiConstants'
+import axios from 'axios'
+
+const receiveComments = comments => ({
+  type: types.RECEIVE_COMMENTS,
+  comments
+})
+
+export const fetchComments = () => dispatch => {
+  axios.get(COMMENTS_URL).then(
+    res => {
+      dispatch(receiveComments(res.data.comments))
+    }
+  )
+}
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index c9a4ce7..ca43fd0 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -15,3 +15,5 @@ export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
 export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
 export const RECEIVE_DISHES = 'RECEIVE_DISHES'
+
+export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
diff --git a/client/src/constants/ApiConstants.js b/client/src/constants/ApiConstants.js
index ade730b..6c5c4e5 100644
--- a/client/src/constants/ApiConstants.js
+++ b/client/src/constants/ApiConstants.js
@@ -6,7 +6,7 @@ export const USERS_URL = `${API_HOSTNAME}/users`
 export const USER_BY_ID_URL = `${API_HOSTNAME}/user/:id`
 export const posterUrl = poster => poster && `${API_HOSTNAME}/uploads/posters/${poster}`
 export const DISHES_URL = `${API_HOSTNAME}/dishes`
-
+export const COMMENTS_URL = `${API_HOSTNAME}/comments`
 export const avatarUrl = avatar => avatar
   ? `${API_HOSTNAME}/uploads/avatars/${avatar}`
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index d9dc4a2..e5ef741 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -12,12 +12,14 @@ import {
   Route
 } from 'react-router-dom'
 import { fetchDishes } from '../actions/dishActions'
+import { fetchComments } from '../actions/commentActions'
 class App extends Component {
   componentDidMount () {
     this.props.fetchUsers()
     this.props.fetchCurrentUser()
     this.props.fetchDishes()
+    this.props.fetchComments()
   }
   render () {
@@ -35,5 +37,6 @@ class App extends Component {
 export default connect(null, {
   fetchUsers,
   fetchCurrentUser,
-  fetchDishes
+  fetchDishes,
+  fetchComments
 })(App)
diff --git a/client/src/reducers/comment.js b/client/src/reducers/comment.js
new file mode 100644
index 0000000..5d05a74
--- /dev/null
+++ b/client/src/reducers/comment.js
@@ -0,0 +1,15 @@
+import * as types from '../constants/ActionTypes'
+import { combineReducers } from 'redux'
+
+const all = (state = [], action) => {
+  switch (action.type) {
+    case types.RECEIVE_COMMENTS:
+      return action.comments
+    default:
+      return state
+  }
+}
+
+export default combineReducers({
+  all
+})
diff --git a/client/src/reducers/index.js b/client/src/reducers/index.js
index f062238..c2d3ec1 100644
--- a/client/src/reducers/index.js
+++ b/client/src/reducers/index.js
@@ -3,12 +3,14 @@ import common from './common'
 import auth from './auth'
 import user from './user'
 import dish from './dish'
+import comment from './comment'
 const rootReducer = combineReducers({
   common,
   auth,
   user,
-  dish
+  dish,
+  comment
 })
 export default rootReducer
```

跟之前读取所有甜点数据是完全一样的，这里就不重复啰嗦了。

数据到了前端，下一步是去展示这些数据。

```diff
diff --git a/client/src/components/DishComments.js b/client/src/components/DishComments.js
index 8553e09..82058c2 100644
--- a/client/src/components/DishComments.js
+++ b/client/src/components/DishComments.js
@@ -12,12 +12,9 @@ class DishComments extends Component {
   }
   render() {
-    const comments = [
-      {
-        _id: '1',
-        content: '不错不错'
-      }
-    ]
+    const { commentsByDishId, match } = this.props
+    const { id } = match.params
+    const comments = commentsByDishId[id] || []
     const commentsCopy = comments.slice()
     return (
       <div>
diff --git a/client/src/components/DishCommentsItem.js b/client/src/components/DishCommentsItem.js
index d618a7b..7784a7a 100644
--- a/client/src/components/DishCommentsItem.js
+++ b/client/src/components/DishCommentsItem.js
@@ -5,16 +5,18 @@ import { Link } from 'react-router-dom'
 import { avatarUrl } from '../constants/ApiConstants'
 const DishCommentsItem = ({ comment }) => {
-  const { content } = comment
+  const { content, user } = comment
   const avatar = undefined
   return (
     <Item>
       <Avatar avatar={avatarUrl(avatar)}
-        size="50" />
+        size='50' />
       <Details>
         <UsernameTime>
           <Username to={`/user/id`}>
             三毛
+          <Username to={`/user/${user._id}`}>
+            {user.username}
           </Username>
           <Time>
             三天前
@@ -35,20 +37,18 @@ const Item = styled.li`
   margin: 30px 0;
 `
-
 const Details = styled.div`
   flex-grow: 1;
   margin-left: 9px;
   padding-top: 5px;
 `
-
 const UsernameTime = styled.div`
   display: flex;
   justify-content: space-between;
 `
-const Username = styled(Link) `
+const Username = styled(Link)`
   font-size: 17px;
   line-height: 24px;
   color: #6E6E6E;
diff --git a/client/src/containers/DishCommentsContainer.js b/client/src/containers/DishCommentsContainer.js
index 4a79086..a0b56a9 100644
--- a/client/src/containers/DishCommentsContainer.js
+++ b/client/src/containers/DishCommentsContainer.js
@@ -1,6 +1,13 @@
 import React from 'react'
 import DishComments from '../components/DishComments'
+import { getCommentsByDishId } from '../selectors/commentSelectors'
+import { withRouter } from 'react-router-dom'
+import { connect } from 'react-redux'
 const DishCommentsContainer = props => <DishComments {...props} />
-export default DishCommentsContainer
+const mapStateToProps = state => ({
+  commentsByDishId: getCommentsByDishId(state)
+})
+
+export default connect(mapStateToProps)(withRouter(DishCommentsContainer))
diff --git a/client/src/selectors/commentSelectors.js b/client/src/selectors/commentSelectors.js
new file mode 100644
index 0000000..093548f
--- /dev/null
+++ b/client/src/selectors/commentSelectors.js
@@ -0,0 +1,15 @@
+import { createSelector } from 'reselect'
+
+export const getComments = state => state.comment.all
+
+export const getCommentsByDishId = createSelector(
+  getComments,
+  comments => comments.reduce((obj, comment) => {
+    if (obj[comment.dish._id]) {
+      obj[comment.dish._id].push(comment)
+    } else {
+      obj[comment.dish._id] = [comment]
+    }
+    return obj
+  }, {})
+)
```

也一样是跟 dish 一样的过程，先定义 selector 然后 container 中通过 selector 拿到数据，交给展示组件去显示到界面上。其中稍微复杂点的就是按照 dish 的 id ，对所有评论做了分组，存放到了 commentsByDishId 这个变量中了。

看看本部分达成的效果。页面中已经能显示真实的用户名，和评论内容了，如果未来我们上传头像功能开发完毕，这里的头像也应该可以显示真实的头像了。

至此，《读取评论》这部分就胜利完成了。

###  使用 momentjs 调整时间格式

进入下一部分《使用 momentjs 调整时间格式》。把评论的发布时间显示出来。



```diff
diff --git a/client/src/components/DishCommentsItem.js b/client/src/components/DishCommentsItem.js
index 7784a7a..a7292f5 100644
--- a/client/src/components/DishCommentsItem.js
+++ b/client/src/components/DishCommentsItem.js
@@ -3,6 +3,9 @@ import Avatar from './Avatar'
 import styled from 'styled-components'
 import { Link } from 'react-router-dom'
 import { avatarUrl } from '../constants/ApiConstants'
+import moment from 'moment'
+import 'moment/locale/zh-cn'
+moment.locale('zh-cn')
 const DishCommentsItem = ({ comment }) => {
   const { content, user } = comment
@@ -13,13 +16,11 @@ const DishCommentsItem = ({ comment }) => {
         size='50' />
       <Details>
         <UsernameTime>
-          <Username to={`/user/id`}>
-            三毛
           <Username to={`/user/${user._id}`}>
             {user.username}
           </Username>
           <Time>
-            三天前
+            {moment(comment.createdAt).fromNow()}
           </Time>
         </UsernameTime>
         <Content>
```

看看本部分达成的效果。页面上的时间就变成中文的多久以前了。
至此，《使用 momentjs 调整时间格式》这部分就胜利完成了。


### 添加评论

进入下一部分《添加评论》。把评论内容保存到数据库中。

添加 API 。



```diff
diff --git a/happy-api-starter-1.0.0/controllers/comment.js b/happy-api-starter-1.0.0/controllers/comment.js
index 05af099..d4913af 100644
--- a/happy-api-starter-1.0.0/controllers/comment.js
+++ b/happy-api-starter-1.0.0/controllers/comment.js
@@ -8,6 +8,18 @@ exports.all = function (req, res) {
   )
 }
+exports.new = function (req, res) {
+  let comment = req.body;
+  comment = new Comment(comment)
+  comment.save(function (err, comment) {
+    if (err) return res.status(403).json({ msg: '保存失败，请重试', err })
+    Comment.findOne({ _id: comment._id }).populate('user dish', 'username avatar poster').exec().then(
+      comment => {
+        return res.json({ msg: '保存评论成功', comment })
+      }
+    )
+  })
+}
 exports.seed = (req, res) => {
   const comments = [
diff --git a/happy-api-starter-1.0.0/routes.js b/happy-api-starter-1.0.0/routes.js
index 77a8958..e7b774f 100755
--- a/happy-api-starter-1.0.0/routes.js
+++ b/happy-api-starter-1.0.0/routes.js
@@ -15,6 +15,7 @@ module.exports = app => {
   app.get('/seed-dishes', Dish.seed)
   // comments
+  app.post('/comment', Comment.new)
   app.get('/comments', Comment.all)
   app.get('/seed-comments', Comment.seed)
 }
```

保存评论之后，要返回评论的详细信息供前端使用，这条评论的信息要用来更新 redux 中保存的所有评论数组，所以这里的数据结构务必要和读取所有评论的时候的每一条评论一样。

用 postman 测试一下接口，发送 POST /commment 请求，header 填写 ContentType: application/json ，发送 body 选 raw 格式

```
{
   "content": "非常好吃",
    "dish": "5a26738e8ed6687f81859d24",
    "user": "5a2638f58b8b05037aed5007"
}
```

点发送可以看到保存成功的信息，证明接口工作正常了。

下面回到前端代码。写 action/reducer 代码。



```diff
diff --git a/client/src/actions/commentActions.js b/client/src/actions/commentActions.js
index 3f5e01c..515ee0c 100644
--- a/client/src/actions/commentActions.js
+++ b/client/src/actions/commentActions.js
@@ -1,5 +1,6 @@
 import * as types from '../constants/ActionTypes'
-import { COMMENTS_URL } from '../constants/ApiConstants'
+import { COMMENTS_URL, NEW_COMMENT_URL } from '../constants/ApiConstants'
+import { alert } from './commonActions'
 import axios from 'axios'
 const receiveComments = comments => ({
@@ -14,3 +15,24 @@ export const fetchComments = () => dispatch => {
     }
   )
 }
+
+
+export const submitCommentSuccess = comment => ({
+  type: types.SUBMIT_COMMENT_SUCCESS,
+  comment
+});
+
+export const addComment = ({ text, user, dish }) => {
+  return dispatch => {
+    if (!text.trim()) {
+      dispatch(alert('您尚未填写内容'))
+      return
+    }
+    axios.post(NEW_COMMENT_URL, { content: text, user, dish }).then(res => {
+      dispatch(submitCommentSuccess(res.data.comment))
+    }).catch(err => {
+      console.log('err', err)
+      if (err.response) { console.log('err.response', err.response.data.err) }
+    })
+  }
+}
diff --git a/client/src/components/DishCommentForm.js b/client/src/components/DishCommentForm.js
index 8705fc8..f75ce54 100644
--- a/client/src/components/DishCommentForm.js
+++ b/client/src/components/DishCommentForm.js
@@ -1,5 +1,6 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
+import { Link } from 'react-router-dom'
 class DishCommentForm extends Component {
   state = {
@@ -14,13 +15,16 @@ class DishCommentForm extends Component {
   submitComment = () => {
     const { text } = this.state
-    console.log(text)
+    const user = this.props.currentUserId
+    const dish = this.props.match.params.id
+    this.props.addComment({ text, user, dish })
     this.setState({
       text: ''
     })
   }
   render() {
+    const { isAuthenticated } = this.props
     const commentForm = (
       <Form>
         <Input value={this.state.text}
@@ -30,9 +34,14 @@ class DishCommentForm extends Component {
         <Button onClick={this.submitComment} type="submit">评论</Button>
       </Form>
     )
+    const plzLogin = (
+      <PlzLogin>
+        发评论请先<Link to="/login">登录</Link>
+      </PlzLogin>
+    )
     return (
       <div>
-        {commentForm}
+        {isAuthenticated ? commentForm : plzLogin}
       </div>
     )
   }
@@ -76,3 +85,11 @@ const Button = styled.button`
     outline: 0;
   }
 `
+
+const PlzLogin = styled.div`
+  padding: 20px;
+  color: #ccc;
+  a {
+    color: #FE5196;
+  }
+`
diff --git a/client/src/components/DishComments.js b/client/src/components/DishComments.js
index 82058c2..4278733 100644
--- a/client/src/components/DishComments.js
+++ b/client/src/components/DishComments.js
@@ -7,7 +7,7 @@ class DishComments extends Component {
   componentDidMount = () => {
     this.props.setSubTitle({
       title: '评论',
-      details: `评论数: 0`
+      details: `发表一下你的意见吧`
     })
   }
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index ca43fd0..dd05a61 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -17,3 +17,4 @@ export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
 export const RECEIVE_DISHES = 'RECEIVE_DISHES'
 export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
+export const SUBMIT_COMMENT_SUCCESS = 'SUBMIT_COMMENT_SUCCESS'
diff --git a/client/src/constants/ApiConstants.js b/client/src/constants/ApiConstants.js
index 6c5c4e5..e724013 100644
--- a/client/src/constants/ApiConstants.js
+++ b/client/src/constants/ApiConstants.js
@@ -7,6 +7,7 @@ export const USER_BY_ID_URL = `${API_HOSTNAME}/user/:id`
 export const posterUrl = poster => poster && `${API_HOSTNAME}/uploads/posters/${poster}`
 export const DISHES_URL = `${API_HOSTNAME}/dishes`
 export const COMMENTS_URL = `${API_HOSTNAME}/comments`
+export const NEW_COMMENT_URL = `${API_HOSTNAME}/comment`
 export const avatarUrl = avatar => avatar
   ? `${API_HOSTNAME}/uploads/avatars/${avatar}`
diff --git a/client/src/containers/DishCommentFormContainer.js b/client/src/containers/DishCommentFormContainer.js
index 2d207d6..5642777 100644
--- a/client/src/containers/DishCommentFormContainer.js
+++ b/client/src/containers/DishCommentFormContainer.js
@@ -1,6 +1,17 @@
 import React from 'react'
 import DishCommentForm from '../components/DishCommentForm'
+import { withRouter } from 'react-router-dom'
+import { connect } from 'react-redux'
+import { getIsAuthenticated, getCurrentUserId } from '../selectors/authSelectors'
+import { addComment } from '../actions/commentActions'
 const DishCommentFormContainer = props => <DishCommentForm {...props} />
-export default DishCommentFormContainer
+const mapStateToProps = state => ({
+  isAuthenticated: getIsAuthenticated(state),
+  currentUserId: getCurrentUserId(state)
+})
+
+export default connect(mapStateToProps, {
+  addComment
+})(withRouter(DishCommentFormContainer))
diff --git a/client/src/reducers/comment.js b/client/src/reducers/comment.js
index 5d05a74..d03e542 100644
--- a/client/src/reducers/comment.js
+++ b/client/src/reducers/comment.js
@@ -5,6 +5,11 @@ const all = (state = [], action) => {
   switch (action.type) {
     case types.RECEIVE_COMMENTS:
       return action.comments
+    case types.SUBMIT_COMMENT_SUCCESS:
+      return [
+        ...state,
+        action.comment
+      ]
     default:
       return state
   }
```

评论提交后请求后端接口，把数据保存到数据库中，同时后端返回的完整的 comment 数据又被前端拿到保存到了所有评论数组中，所以界面可以自动更新看到新评论。

看看这部分达成的效果。页面中添加评论，如果不填写内容，就会看到提示信息，填写内容之后，可以成功的发布评论。

至此《添加评论》这部分就胜利结束了。

### 结语

进入最后一部分《结语》

复盘一下本节思路。先用一些临时数据，把前端界面写好，然后开发后端 API 的时候依然是先用种子数据填充数据库，这样就可以首先完成读数据的相关功能，最后在添加发评论的写操作，这样原本复杂的步骤就被拆成了几个简单步骤来完成了。

至此，《添加评论功能》这个小节就胜利完成了。

同时，本小节也是第一章《制作非电商和社交但是很实用的各项功能》的最后一个小节，到这里第一章就全部结束了。
