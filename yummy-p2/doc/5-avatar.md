# 上传头像

欢迎来到新的一节《上传头像》。允许用户可以在个人中心上传自己的头像。

### 添加个人中心页面

进入下一部分《添加个人中心页面》。对应的路由是 /settings 。

```diff
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index 1c391b8..1887c36 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -26,6 +26,7 @@ const Layout = ({ title, showAlert, isAuthenticated }) => (
           <Route path='/signup' component={SignupContainer} />
           <Route path='/login' component={LoginContainer} />
           <Route path='/dishes' component={DishesContainer} />
+          <Route path='/settings' component={SettingsContainer} />
           <Route path='/dish/:id' component={DishContainer} />
           <PrivateRoute isAuthenticated={isAuthenticated} path='/settings' component={SettingsContainer} />
         </Switch>
diff --git a/client/src/components/Settings.js b/client/src/components/Settings.js
new file mode 100644
index 0000000..52c6ce1
--- /dev/null
+++ b/client/src/components/Settings.js
@@ -0,0 +1,33 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+class Settings extends Component {
+  render() {
+    return (
+      <Wrap>
+        <UpperWrap>
+        </UpperWrap>
+        <LowerWrap>
+        </LowerWrap>
+      </Wrap>
+    )
+  }
+}
+
+export default Settings
+
+
+const Wrap = styled.div`
+   height: 100%;
+   display: flex;
+   flex-direction: column;
+`
+
+const UpperWrap = styled.div`
+  height: 100px;
+`
+
+const LowerWrap = styled.div`
+  background: #F9FAFB;
+  flex-grow: 1;
+`
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index 3d8d1be..d23e272 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -25,10 +25,10 @@ class Sidebar extends Component {
           customCrossIcon={ false }
           isOpen={isOpen}
         >
-            <UserInfo {...this.props} />
+            <UserInfo {...this.props} closeMenu={this.closeMenu} />
             <div className="bm-link-list">
               <Link onClick={this.closeMenu} to="/">首页</Link>
-              <Link onClick={this.closeMenu} to="/profile">个人中心</Link>
+              <Link onClick={this.closeMenu} to="/settings">个人中心</Link>
               <Link onClick={this.closeMenu} to="/dishes">猜你喜欢</Link>
             </div>
             <div className="bottom-button">
diff --git a/client/src/components/SidebarUserInfo.js b/client/src/components/SidebarUserInfo.js
index ed62fb2..bbe688c 100644
--- a/client/src/components/SidebarUserInfo.js
+++ b/client/src/components/SidebarUserInfo.js
@@ -4,13 +4,13 @@ import Avatar from './Avatar'
 import avatar from '../assets/avatar.png'
 import { Link } from 'react-router-dom'
-const UserInfo = ({ isAuthenticated, logout, currentUser }) => (
+const UserInfo = ({ isAuthenticated, logout, currentUser, closeMenu }) => (
   <Wrap>
     <CenteredAvatar avatar={avatar} size='100' />
     {
       isAuthenticated &&
       <Text>
-        <Name to='/profile' >
+        <Name onClick={closeMenu} to='/settings' >
           { currentUser.username }
         </Name>
         <Link to='#' onClick={logout}>退出</Link>
diff --git a/client/src/containers/SettingsContainer.js b/client/src/containers/SettingsContainer.js
index bb2351e..07732e0 100644
--- a/client/src/containers/SettingsContainer.js
+++ b/client/src/containers/SettingsContainer.js
@@ -1,5 +1,6 @@
 import React from 'react'
+import Settings from '../components/Settings'
-const SettingsContainer = props => <h1>个人设置页面</h1>
+const SettingsContainer = props => <Settings {...props} />
 export default SettingsContainer
```

把页面路由和链接添加了进来。

下面来把上传 avatar 部分的界面添加进来



```diff
diff --git a/client/src/actions/commentActions.js b/client/src/actions/commentActions.js
index 515ee0c..240bbcf 100644
--- a/client/src/actions/commentActions.js
+++ b/client/src/actions/commentActions.js
@@ -16,11 +16,10 @@ export const fetchComments = () => dispatch => {
   )
 }
-
 export const submitCommentSuccess = comment => ({
   type: types.SUBMIT_COMMENT_SUCCESS,
   comment
-});
+})
 export const addComment = ({ text, user, dish }) => {
   return dispatch => {
diff --git a/client/src/components/Settings.js b/client/src/components/Settings.js
index 52c6ce1..6b3500f 100644
--- a/client/src/components/Settings.js
+++ b/client/src/components/Settings.js
@@ -1,14 +1,15 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
+import SettingsAvatarContainer from '../containers/SettingsAvatarContainer'
 class Settings extends Component {
-  render() {
+  render () {
     return (
       <Wrap>
         <UpperWrap>
+          <SettingsAvatarContainer />
         </UpperWrap>
-        <LowerWrap>
-        </LowerWrap>
+        <LowerWrap />
       </Wrap>
     )
   }
@@ -16,16 +17,13 @@ class Settings extends Component {
 export default Settings
-
 const Wrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
 `
-const UpperWrap = styled.div`
-  height: 100px;
-`
+const UpperWrap = styled.div``
 const LowerWrap = styled.div`
   background: #F9FAFB;
diff --git a/client/src/components/SettingsAvatar.js b/client/src/components/SettingsAvatar.js
new file mode 100644
index 0000000..2603ef4
--- /dev/null
+++ b/client/src/components/SettingsAvatar.js
@@ -0,0 +1,62 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+import { avatarUrl } from '../constants/ApiConstants'
+
+class SettingsAvatar extends Component {
+  render () {
+    const { currentUser } = this.props
+    const { avatar, username } = currentUser
+    return (
+      <Wrap>
+        <UploadImgLabel
+          style={{
+            'backgroundImage': `url(${avatarUrl(avatar)})`
+          }}
+        >
+          <ImageInput type='file'
+            onChange={this.props.updateAvatar}
+          />
+        </UploadImgLabel>
+        <Username>
+          {username}
+        </Username>
+      </Wrap>
+    )
+  }
+}
+
+export default SettingsAvatar
+
+const Wrap = styled.div`
+  display: flex;
+  padding: 20px
+`
+
+const Username = styled.div`
+  font-size: 19px;
+  margin-bottom: 10px;
+  padding: 10px;
+  color: white;
+  flex-grow: 1;
+`
+
+const UploadImgLabel = styled.label`
+  outline: 0;
+  border: 0;
+  display: block;
+  width: 80px;
+  height: 80px;
+  border-radius: 50%;
+  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.30);
+  background-size: 150px;
+  background-position: center center;
+`
+
+const ImageInput = styled.input`
+  width: 0;
+  height: 0;
+  &:focus {
+    outline: 0;
+    border: 0;
+  }
+`
diff --git a/client/src/containers/SettingsAvatarContainer.js b/client/src/containers/SettingsAvatarContainer.js
new file mode 100644
index 0000000..8a1ab70
--- /dev/null
+++ b/client/src/containers/SettingsAvatarContainer.js
@@ -0,0 +1,12 @@
+import React from 'react'
+import SettingsAvatar from '../components/SettingsAvatar'
+import { getCurrentUser } from '../selectors/authSelectors'
+import { connect } from 'react-redux'
+
+const SettingsAvatarContainer = props => <SettingsAvatar {...props} />
+
+const mapStateToProps = state => ({
+  currentUser: getCurrentUser(state)
+})
+
+export default connect(mapStateToProps)(SettingsAvatarContainer)
```


仅仅是做了样式，真正的文件上传功能没有实现。

看看本部分达成的效果。点 /settings 页面上的头像，可以打开文件浏览器进行文件选择了。
至此，《添加个人中心页面》这部分就胜利完成了。

### 前端发送数据

进入下一部分《前端发送数据》。其中特别要注意的就是数据格式。


首先来在用户选中文件之后，触发一个 action 创建器




```diff
diff --git a/client/src/actions/userActions.js b/client/src/actions/userActions.js
index 8b8998e..ae03d9b 100644
--- a/client/src/actions/userActions.js
+++ b/client/src/actions/userActions.js
@@ -14,3 +14,13 @@ export const fetchUsers = () => dispatch => {
     }
   )
 }
+
+export const updateAvatar = e => dispatch => {
+  const file = e.target.files[0]
+  const reader = new FileReader()
+  reader.onload = e => {
+    console.log('inside onload-------e.target.value', e.target.result)
+  }
+  console.log('after onload-----file', file)
+  reader.readAsDataURL(file)
+}
diff --git a/client/src/containers/SettingsAvatarContainer.js b/client/src/containers/SettingsAvatarContainer.js
index 8a1ab70..2d66f0b 100644
--- a/client/src/containers/SettingsAvatarContainer.js
+++ b/client/src/containers/SettingsAvatarContainer.js
@@ -2,6 +2,7 @@ import React from 'react'
 import SettingsAvatar from '../components/SettingsAvatar'
 import { getCurrentUser } from '../selectors/authSelectors'
 import { connect } from 'react-redux'
+import { updateAvatar } from '../actions/userActions'
 const SettingsAvatarContainer = props => <SettingsAvatar {...props} />
@@ -9,4 +10,6 @@ const mapStateToProps = state => ({
   currentUser: getCurrentUser(state)
 })
-export default connect(mapStateToProps)(SettingsAvatarContainer)
+export default connect(mapStateToProps, {
+  updateAvatar
+})(SettingsAvatarContainer)
```


用户选中文件后会触发 updateAvatar 这个 action 创建器，其中使用 e.target.files[0] 可以拿到文件对象。文件对象简单来说只是一个文件名，没有文件主体数据。所以需要使用 FileReader 来读取主体数据并且转换为可以在网上发送的 base64 格式。readAsDataURL 函数执行结束之后，reader.onload 回调函数会被触发。回调函数里面，我们就可以用 e.target.result 打印出文件主体数据了。

接下来把需要发送的数据整理成 formData ，也就是表单数据的格式。




```diff
diff --git a/client/src/actions/userActions.js b/client/src/actions/userActions.js
index ae03d9b..6e3fdfb 100644
--- a/client/src/actions/userActions.js
+++ b/client/src/actions/userActions.js
@@ -1,6 +1,7 @@
 import * as types from '../constants/ActionTypes'
 import axios from 'axios'
-import { USERS_URL } from '../constants/ApiConstants'
+import { USERS_URL, UPDATE_AVATAR_URL } from '../constants/ApiConstants'
+
 export const receiveUsers = users => ({
   type: types.RECEIVE_USERS,
@@ -15,12 +16,21 @@ export const fetchUsers = () => dispatch => {
   )
 }
-export const updateAvatar = e => dispatch => {
+const sendAvatarRequest = formData => {
+  axios.post(UPDATE_AVATAR_URL, formData).then(
+    res => {
+      console.log('request sent')
+    }
+  )
+}
+
+export const updateAvatar = e => (dispatch, getState) => {
   const file = e.target.files[0]
   const reader = new FileReader()
+  let formData = new FormData()
   reader.onload = e => {
-    console.log('inside onload-------e.target.value', e.target.result)
+    formData.append('avatar', file)
+    sendAvatarRequest(formData)
   }
-  console.log('after onload-----file', file)
   reader.readAsDataURL(file)
 }
diff --git a/client/src/constants/ApiConstants.js b/client/src/constants/ApiConstants.js
index e724013..33b848c 100644
--- a/client/src/constants/ApiConstants.js
+++ b/client/src/constants/ApiConstants.js
@@ -12,3 +12,5 @@ export const NEW_COMMENT_URL = `${API_HOSTNAME}/comment`
 export const avatarUrl = avatar => avatar
   ? `${API_HOSTNAME}/uploads/avatars/${avatar}`
   : `${API_HOSTNAME}/uploads/avatars/default-avatar.png`
+
+export const UPDATE_AVATAR_URL = `${API_HOSTNAME}/avatar`
```

这里必须把数据组织成 formData 来发送，因为 axios 在发送 formData 的时候，默认的 ContentType 就是 multipart ，而这个格式也正是未来服务器上我要采用的 Multer 所期待的格式。

看一下本部分达成的效果。浏览器中选中一个文件，注意 chorome 开发者工具的 Network 标签下，有一个红色的，也就是发送失败的 avatar 请求，点开查看请求详情，在 request header 一项下面，可以看到 Content-Type 是 multipart/form-data ，这样的请求就满足服务器端要求了。

至此，《前端发送数据》这部分就胜利完成了。

### 补充一些前端功能

进入下一部分《补充一些前端功能》。一个就是就是发送数据时要把当前用户 id 也发送给服务器，另一个就是对文件是不是图片做一下类型检查。

首先拿到当前用户 id ，一个好消息是用来 redux-thunk 后，action 创建器中是可以拿到整个状态树的




```diff
diff --git a/client/src/actions/userActions.js b/client/src/actions/userActions.js
index 6e3fdfb..31c2397 100644
--- a/client/src/actions/userActions.js
+++ b/client/src/actions/userActions.js
@@ -1,7 +1,7 @@
 import * as types from '../constants/ActionTypes'
 import axios from 'axios'
 import { USERS_URL, UPDATE_AVATAR_URL } from '../constants/ApiConstants'
-
+import { getCurrentUserId } from '../selectors/authSelectors'
 export const receiveUsers = users => ({
   type: types.RECEIVE_USERS,
@@ -28,7 +28,9 @@ export const updateAvatar = e => (dispatch, getState) => {
   const file = e.target.files[0]
   const reader = new FileReader()
   let formData = new FormData()
+  const userId = getCurrentUserId(getState())
   reader.onload = e => {
+    formData.append('userId', userId)
     formData.append('avatar', file)
     sendAvatarRequest(formData)
   }
```

通过 getState 参数拿到状态树，然后用 getCurrentUserId 选择器来把当前用户 id 拿到，附着在表单的 userId 字段上。

接下来检查文件类型




```diff
diff --git a/client/src/actions/userActions.js b/client/src/actions/userActions.js
index 31c2397..dfd0b88 100644
--- a/client/src/actions/userActions.js
+++ b/client/src/actions/userActions.js
@@ -2,6 +2,7 @@ import * as types from '../constants/ActionTypes'
 import axios from 'axios'
 import { USERS_URL, UPDATE_AVATAR_URL } from '../constants/ApiConstants'
 import { getCurrentUserId } from '../selectors/authSelectors'
+import { alert } from './commonActions'
 export const receiveUsers = users => ({
   type: types.RECEIVE_USERS,
@@ -24,8 +25,24 @@ const sendAvatarRequest = formData => {
   )
 }
+const checkFile = (file, dispatch) => {
+  if (!file.type.match('image.*')) {
+    dispatch(alert('请上传图片类型的文件'))
+    return false
+  } else if (parseInt(file.size / 1024, 10) > 1024) {
+    // 注意：手机上拍照上传会失败，是因为 niginx 对上传文件的大小是有限制的，
+    // 最大就是 1M ，可以通过修改 /etc/nginx/site-enabled/xxx.conf 文件来解决
+    const err = `请不要上传大于 1M 的图片，当前图片 ${parseInt(file.size / 1024, 10)}K`
+    dispatch(alert(err))
+    return false
+  } else {
+    return true
+  }
+}
+
 export const updateAvatar = e => (dispatch, getState) => {
   const file = e.target.files[0]
+  if (!checkFile(file, dispatch)) return
   const reader = new FileReader()
   let formData = new FormData()
   const userId = getCurrentUserId(getState())
```

对文件是否为图片，是否小于1M，进行了检查，检查不通过，直接发出警告信息，不进行上传。

看看本部分达成的效果。
至此，《补充一些前端功能》这部分就胜利完成了。

### 上传到服务器

进入下一部分《上传到服务器》。使用 multer 来接受客户端传递过来的信息。

先装包

```
npm i multer
```

包装好了。


然后写代码。




```diff
diff --git a/happy-api-starter-1.0.0/controllers/user.js b/happy-api-starter-1.0.0/controllers/user.js
index 9c796d7..61639ff 100755
--- a/happy-api-starter-1.0.0/controllers/user.js
+++ b/happy-api-starter-1.0.0/controllers/user.js
@@ -88,3 +88,9 @@ exports.all = (req, res) => {
     }
   )
 }
+
+
+exports.updateAvatar = (req, res) => {
+  console.log('req.body', req.body)
+  console.log('req.file', req.file)
+}
diff --git a/happy-api-starter-1.0.0/routes.js b/happy-api-starter-1.0.0/routes.js
index e7b774f..b68408b 100755
--- a/happy-api-starter-1.0.0/routes.js
+++ b/happy-api-starter-1.0.0/routes.js
@@ -1,6 +1,8 @@
 const User = require('./controllers/user')
 const Dish = require('./controllers/dish')
 const Comment = require('./controllers/comment')
+const multer = require('multer')
+const uploadAvatar = multer({ dest: './public/uploads/avatars' })
 module.exports = app => {
   // account
@@ -9,6 +11,7 @@ module.exports = app => {
   app.get('/user/logout', User.logout)
   app.get('/users', User.all)
   app.get('/user/:id', User.getById)
+  app.post('/avatar', uploadAvatar.single('avatar'), User.updateAvatar)
   // dishes
   app.get('/dishes', Dish.all)
```


require multer 进来，然后指定上传存储位置。接下来 uploadAvatar.single('avatar') 这句的作用是加载 multer 中间件，这样才能接口中打印出 req.body 的信息，再说 .single('avatar') ，意思是接受名为 avatar 的单独一个文件，有了它才能打印出 req.file 的信息，当然同时也才能实现文件上传。

看看本部分达成的效果。上传文件，服务器的终端，也就是命令行界面上会打印出 req.body 和 req.file 的具体值，分别包含 userId 信息，和图片信息。

```
req.body { userId: '5a2638f58b8b05037aed5007' }
req.file { fieldname: 'avatar',
  originalname: '屏幕快照 2017-12-06 下午11.19.24.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: './public/uploads/avatars',
  filename: '198f9b712f49f700156b0b9f925efd5b',
  path: 'public/uploads/avatars/198f9b712f49f700156b0b9f925efd5b',
  size: 20006 }
```

到 pubic/uploads/avatars 文件夹中，可以看到文件上传成功了。

至此，《上传到服务器》这部分就胜利完成了。


### 更新服务器字段

进入下一部分《更新服务器字段》。上传成功了，还有很多后续工作要做。例如，要把上传的头像信息保存到数据库中这个用户对应的条目，



```diff
diff --git a/client/src/actions/userActions.js b/client/src/actions/userActions.js
index dfd0b88..af848b3 100644
--- a/client/src/actions/userActions.js
+++ b/client/src/actions/userActions.js
@@ -20,7 +20,7 @@ export const fetchUsers = () => dispatch => {
 const sendAvatarRequest = formData => {
   axios.post(UPDATE_AVATAR_URL, formData).then(
     res => {
-      console.log('request sent')
+      console.log(res.data)
     }
   )
 }
diff --git a/happy-api-starter-1.0.0/controllers/user.js b/happy-api-starter-1.0.0/controllers/user.js
index 61639ff..397a85f 100755
--- a/happy-api-starter-1.0.0/controllers/user.js
+++ b/happy-api-starter-1.0.0/controllers/user.js
@@ -91,6 +91,26 @@ exports.all = (req, res) => {
 exports.updateAvatar = (req, res) => {
-  console.log('req.body', req.body)
-  console.log('req.file', req.file)
+  User.findOne({ _id: req.body.userId }, (err, user) => {
+    if (user) {
+      if (req.file && req.file.filename) {
+        user.avatar = req.file.filename
+      }
+      user.save(err => {
+        if (err) return console.log(err)
+        res.json({
+          user: {
+            avatar: user.avatar,
+            _id: user._id,
+            username: user.username,
+          },
+          message: '用户头像更新成功'
+        })
+      })
+    } else {
+      res.status(404).json({
+        message: '没有该用户'
+      })
+    }
+  })
 }
diff --git a/happy-api-starter-1.0.0/models/user.js b/happy-api-starter-1.0.0/models/user.js
index 9c94ed6..46c8f8a 100755
--- a/happy-api-starter-1.0.0/models/user.js
+++ b/happy-api-starter-1.0.0/models/user.js
@@ -3,6 +3,7 @@ const mongoose = require('mongoose')
 const UserSchema = new mongoose.Schema(
   {
     username: { type: String, maxlength: 18 },
+    avatar: String,
     password: { type: String, required: true }
   },
   { timestamps: true }
```

首先找到数据库中符合客户端发送过来的 userId 的那个用户，然后把上传后的 avatar 的文件名保存到数据库中这个用户的 avatar 字段，最后把包含新 avatar 的用户数据返回给客户端。

返回所有用户信息的接口中把 avatar 一项也加上

```diff
diff --git a/happy-api-starter-1.0.0/controllers/user.js b/happy-api-starter-1.0.0/controllers/user.js
index 397a85f..347cdf7 100755
--- a/happy-api-starter-1.0.0/controllers/user.js
+++ b/happy-api-starter-1.0.0/controllers/user.js
@@ -80,7 +80,7 @@ exports.getById = (req, res) => {
 // 读取所有用户
 exports.all = (req, res) => {
-  User.find({}, '_id username').exec().then(
+  User.find({}, '_id username avatar').exec().then(
     users => {
       setTimeout(() =>
       res.json({ users }),
```


这样，客户端才能拿到用户的 avatar 数据。

看看本部分达成的效果。命令行中用 mongo shell 查看一下数据库数据，

```
mongo
use sandbox
db.users.find({username : "happypeter"})
```

发现 avatar 一项果然加好了。并且浏览器终端中也可以打印出包含 avatar 信息的用户数据。页面刷新，是可以看到新 avatar 的。

至此，《更新服务器字段》这部分就胜利完成了。


### 更新客户端 redux 数据

进入下一部分《更新客户端 redux 数据》。拿到服务器端返回的包含新 avatar 的 user 数据，更新 redux ，这样新头像才能无需刷新直接显示到页面上。






```diff
diff --git a/client/src/actions/userActions.js b/client/src/actions/userActions.js
index af848b3..95314e2 100644
--- a/client/src/actions/userActions.js
+++ b/client/src/actions/userActions.js
@@ -17,10 +17,14 @@ export const fetchUsers = () => dispatch => {
   )
 }
-const sendAvatarRequest = formData => {
+const updateUser = (user) => ({
+  type: types.UPDATE_USER, user
+})
+
+const sendAvatarRequest = (formData, dispatch) => {
   axios.post(UPDATE_AVATAR_URL, formData).then(
     res => {
-      console.log(res.data)
+      dispatch(updateUser(res.data.user))
     }
   )
 }
@@ -49,7 +53,7 @@ export const updateAvatar = e => (dispatch, getState) => {
   reader.onload = e => {
     formData.append('userId', userId)
     formData.append('avatar', file)
-    sendAvatarRequest(formData)
+    sendAvatarRequest(formData, dispatch)
   }
   reader.readAsDataURL(file)
 }
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index dd05a61..5860dfd 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -18,3 +18,5 @@ export const RECEIVE_DISHES = 'RECEIVE_DISHES'
 export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
 export const SUBMIT_COMMENT_SUCCESS = 'SUBMIT_COMMENT_SUCCESS'
+
+export const UPDATE_USER = 'UPDATE_USER'
diff --git a/client/src/reducers/user.js b/client/src/reducers/user.js
index 8318164..7e63483 100644
--- a/client/src/reducers/user.js
+++ b/client/src/reducers/user.js
@@ -5,6 +5,13 @@ const all = (state = [], action) => {
   switch (action.type) {
     case types.RECEIVE_USERS:
       return action.users
+    case types.UPDATE_USER:
+      return state.map(user => {
+        if (user._id === action.user._id) {
+          return action.user
+        }
+        return user
+      })
     default:
       return state
   }
```

当前用户更新后的数据从服务端拿到之后，发送到 reducer ，在所有用户信息中找到当前用户，并更新它的数据。


修改侧边栏中的头像链接。




```diff
diff --git a/client/src/assets/avatar.png b/client/src/assets/avatar.png
deleted file mode 100644
index 495a05b..0000000
Binary files a/client/src/assets/avatar.png and /dev/null differ
diff --git a/client/src/components/SidebarUserInfo.js b/client/src/components/SidebarUserInfo.js
index bbe688c..6d15f7f 100644
--- a/client/src/components/SidebarUserInfo.js
+++ b/client/src/components/SidebarUserInfo.js
@@ -1,12 +1,12 @@
 import React from 'react'
 import styled from 'styled-components'
 import Avatar from './Avatar'
-import avatar from '../assets/avatar.png'
 import { Link } from 'react-router-dom'
+import { avatarUrl } from '../constants/ApiConstants'
 const UserInfo = ({ isAuthenticated, logout, currentUser, closeMenu }) => (
   <Wrap>
-    <CenteredAvatar avatar={avatar} size='100' />
+    <CenteredAvatar avatar={avatarUrl(currentUser.avatar)} size='100' />
     {
       isAuthenticated &&
       <Text>
```

统一改为 avatarUrl 。

看看本部分达成的效果。用户在个人中心修改头像之后，不仅是当前页面头像变化，而且 sidebar 页面的也变了。
至此，《更新客户端 redux 数据》这部分就胜利完成了。


### 修复路由 bug

进入下一部分《修复路由 bug》。之前有些代码不小心写错了，这里修改一下。

首先是 /settings 的路由，再就是退出登录功能



```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index 94fb5cd..0551a14 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -54,6 +54,7 @@ export const login = data => {
 export const logout = () => {
   history.push('/')
+  window.localStorage.removeItem('userId')
   return dispatch => dispatch({ type: types.LOGOUT })
 }
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index 1887c36..1c391b8 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -26,7 +26,6 @@ const Layout = ({ title, showAlert, isAuthenticated }) => (
           <Route path='/signup' component={SignupContainer} />
           <Route path='/login' component={LoginContainer} />
           <Route path='/dishes' component={DishesContainer} />
-          <Route path='/settings' component={SettingsContainer} />
           <Route path='/dish/:id' component={DishContainer} />
           <PrivateRoute isAuthenticated={isAuthenticated} path='/settings' component={SettingsContainer} />
         </Switch>
```

/settings 页面路由有重复，删除了，另外退出登录的时候应该把 localStorage 中保存的 userId 删除。

看看本部分达成的效果。未登录用户访问 /settings ，会被重定向到登录页，用户退出登录后，页面再刷新，不会看到用户自动登录进来的情况了。
至此，《修复路由 bug》这部分就胜利完成了。

### 结语

进入最后一部分《结语》

复盘一下本节思路。

至此，《上传头像》就胜利完成了。
