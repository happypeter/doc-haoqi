# 添加好友

欢迎来到新的一节《添加好友》，如果我 follow 一个人，那我就能在自己的个人中心看到这个人，同时她评论甜点的时候，我可以在操作盘页面看到更新。

### 添加用户展示页面

进入下一部分《添加用户展示页面》。如果我看到一个评论人的头像，点进入，看到的就是这个用户的展示也，上面会有一个 follow 按钮，跟 twitter 上一样，点一下我就是这个人的粉丝了。

先来添加页面，把页面样式做出来

```diff
diff --git a/client/src/components/User.js b/client/src/components/User.js
index 7797454..b15f666 100644
--- a/client/src/components/User.js
+++ b/client/src/components/User.js
@@ -1,13 +1,104 @@
 import React, { Component } from 'react'
+import styled from 'styled-components'
+import Avatar from './Avatar'
+import { avatarUrl } from '../constants/ApiConstants'
 class User extends Component {
   render() {
     return (
-      <div>
-        User
-      </div>
+      <Wrap>
+        <Holder />
+        <Main>
+          <StyledAvatar
+            size={120}
+            avatar={avatarUrl('')}
+          />
+          <Name>
+            用户名
+          </Name>
+          <Card>
+            <Title>
+              个性签名
+            </Title>
+            <div>
+              世界第一美食家
+            </div>
+          </Card>
+          <Button>
+            follow
+          </Button>
+        </Main>
+      </Wrap>
     )
   }
 }
 export default User
+
+const Wrap = styled.div`
+  height: 100%;
+  display: flex;
+  flex-direction: column;
+`
+
+const Main = styled.div`
+  background: #F9FAFB;
+  position: relative;
+  flex-grow: 1;
+  display: flex;
+  flex-direction: column;
+  padding: 10px;
+  padding-top: 0;
+`
+
+const Holder = styled.div`
+  height: 80px;
+`
+
+const StyledAvatar = styled(Avatar) `
+  position: absolute;
+  left: 50%;
+  margin-left: -60px;
+  top: -60px;
+`
+
+const Name = styled.div`
+  margin-top: 80px;
+  text-align: center;
+  font-size: 26px;
+  color: #F77062;
+  line-height: 32px;
+`
+
+const Card = styled.div`
+  background: #FFFFFF;
+  margin-top: 50px;
+  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
+  font-size: 16px;
+  color: #878787;
+  display: flex;
+  flex-direction: column;
+  padding: 10px;
+  padding-top: 0;
+  text-align: center;
+  flex-grow: 1;
+  margin-bottom: 5px;
+`
+
+const Title = styled.div`
+  line-height: 24px;
+  margin-top: 18px;
+  margin-bottom: 18px;
+  font-size: 16px;
+  color: #F77062;
+`
+
+const Button = styled.div`
+  background-image: linear-gradient(-45deg, #F77062 0%, #FE5196 100%);
+  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.20);
+  border-radius: 2px;
+  font-size: 14px;
+  line-height: 56px;
+  text-align: center;
+  color: #FFFFFF;
+`
```

添加了页面上的一些基本元素。

看看本部分达成的效果。打开页面看一下，页面样式都有了，最重要的是底部的 follow 按钮，但是没有添加功能。

至此，《添加用户展示页面》这部分就胜利完成了。

### 展示用户真实信息

进入下一部分《展示用户真实信息》。让用户展示页显示真正的用户数据。

主要是要用 selector 拿到数据



```diff
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index c29245d..c1dca07 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -28,7 +28,7 @@ const Layout = ({ title, showAlert, isAuthenticated }) => (
           <Route path='/login' component={LoginContainer} />
           <Route path='/dishes' component={DishesContainer} />
           <Route path='/dish/:id' component={DishContainer} />
-          <Route path="/user/:id" component={UserContainer} />
+          <Route path='/user/:id' component={UserContainer} />
           <PrivateRoute isAuthenticated={isAuthenticated} path='/settings' component={SettingsContainer} />
         </Switch>
       </MainInner>
diff --git a/client/src/components/User.js b/client/src/components/User.js
index b15f666..19dec4e 100644
--- a/client/src/components/User.js
+++ b/client/src/components/User.js
@@ -4,17 +4,21 @@ import Avatar from './Avatar'
 import { avatarUrl } from '../constants/ApiConstants'
 class User extends Component {
-  render() {
+  render () {
+    const { match, usersById, currentUser, follow, unfollow } = this.props
+    const { id } = match.params
+    const user = usersById[id] || {}
+    const { username, avatar } = user
     return (
       <Wrap>
         <Holder />
         <Main>
           <StyledAvatar
             size={120}
-            avatar={avatarUrl('')}
+            avatar={avatarUrl(avatar)}
           />
           <Name>
-            用户名
+            {username}
           </Name>
           <Card>
             <Title>
@@ -55,7 +59,7 @@ const Holder = styled.div`
   height: 80px;
 `
-const StyledAvatar = styled(Avatar) `
+const StyledAvatar = styled(Avatar)`
   position: absolute;
   left: 50%;
   margin-left: -60px;
diff --git a/client/src/containers/UserContainer.js b/client/src/containers/UserContainer.js
index 9a2b1bc..c9173c8 100644
--- a/client/src/containers/UserContainer.js
+++ b/client/src/containers/UserContainer.js
@@ -1,6 +1,14 @@
 import React from 'react'
 import User from '../components/User'
+import { connect } from 'react-redux'
+import { getUsersById } from '../selectors/userSelectors'
+import { getCurrentUser } from '../selectors/authSelectors'
 const UserContainer = props => <User {...props} />
-export default UserContainer
+const mapStateToProps = (state) => ({
+  usersById: getUsersById(state),
+  currentUser: getCurrentUser(state)
+})
+
+export default connect(mapStateToProps)(UserContainer)
```

然后到展示组件中显示出来即可。

看看本部分达成的效果。用户名和头像现在都是正确的了。
至此，《展示用户真实信息》这部分就胜利完成了。

### 前端确立 follow 逻辑

进入下一部分《前端确立 follow 逻辑》。基本逻辑就是 currentUser 有一个 followings 数据，是一个由我粉的这些人的 id 组成的数据，如果我正查看的这用户的 id 包含其中，那我就已经粉过他了。

来瞄准 follow 按钮做文章

```diff
diff --git a/client/src/actions/userActions.js b/client/src/actions/userActions.js
index 95314e2..759f8e6 100644
--- a/client/src/actions/userActions.js
+++ b/client/src/actions/userActions.js
@@ -1,6 +1,6 @@
 import * as types from '../constants/ActionTypes'
 import axios from 'axios'
-import { USERS_URL, UPDATE_AVATAR_URL } from '../constants/ApiConstants'
+import { USERS_URL, UPDATE_AVATAR_URL, FOLLOW_URL, UNFOLLOW_URL } from '../constants/ApiConstants'
 import { getCurrentUserId } from '../selectors/authSelectors'
 import { alert } from './commonActions'
@@ -57,3 +57,32 @@ export const updateAvatar = e => (dispatch, getState) => {
   }
   reader.readAsDataURL(file)
 }
+
+export const unfollow = userId => (dispatch, getState) => {
+  const state = getState()
+  const currentUserId = getCurrentUserId(state)
+  let data = {
+    userId,
+    currentUserId
+  }
+  console.log('unfollow', data)
+  axios.post(UNFOLLOW_URL, data).then(
+    res => {
+      dispatch(updateUser(res.data.user))
+    }
+  )
+}
+
+export const follow = userId => (dispatch, getState) => {
+  const state = getState()
+  const currentUserId = getCurrentUserId(state)
+  let data = {
+    userId,
+    currentUserId
+  }
+  axios.post(FOLLOW_URL, data).then(
+    res => {
+      dispatch(updateUser(res.data.user))
+    }
+  )
+}
diff --git a/client/src/components/User.js b/client/src/components/User.js
index 19dec4e..bf49e70 100644
--- a/client/src/components/User.js
+++ b/client/src/components/User.js
@@ -7,6 +7,7 @@ class User extends Component {
   render () {
     const { match, usersById, currentUser, follow, unfollow } = this.props
     const { id } = match.params
+    const isFriend = currentUser.followings && currentUser.followings.includes(id)
     const user = usersById[id] || {}
     const { username, avatar } = user
     return (
@@ -28,9 +29,11 @@ class User extends Component {
               世界第一美食家
             </div>
           </Card>
-          <Button>
-            follow
-          </Button>
+          {
+            isFriend
+              ? <Button onClick={() => unfollow(user._id)} > unfollow </Button>
+              : <Button onClick={() => follow(user._id)} > follow </Button>
+          }
         </Main>
       </Wrap>
     )
diff --git a/client/src/constants/ApiConstants.js b/client/src/constants/ApiConstants.js
index 33b848c..56a438b 100644
--- a/client/src/constants/ApiConstants.js
+++ b/client/src/constants/ApiConstants.js
@@ -4,6 +4,9 @@ export const SIGNUP_URL = `${API_HOSTNAME}/user/signup`
 export const LOGIN_URL = `${API_HOSTNAME}/user/login`
 export const USERS_URL = `${API_HOSTNAME}/users`
 export const USER_BY_ID_URL = `${API_HOSTNAME}/user/:id`
+export const FOLLOW_URL = `${API_HOSTNAME}/user/follow`
+export const UNFOLLOW_URL = `${API_HOSTNAME}/user/unfollow`
+
 export const posterUrl = poster => poster && `${API_HOSTNAME}/uploads/posters/${poster}`
 export const DISHES_URL = `${API_HOSTNAME}/dishes`
 export const COMMENTS_URL = `${API_HOSTNAME}/comments`
diff --git a/client/src/containers/UserContainer.js b/client/src/containers/UserContainer.js
index c9173c8..1a288f9 100644
--- a/client/src/containers/UserContainer.js
+++ b/client/src/containers/UserContainer.js
@@ -3,6 +3,7 @@ import User from '../components/User'
 import { connect } from 'react-redux'
 import { getUsersById } from '../selectors/userSelectors'
 import { getCurrentUser } from '../selectors/authSelectors'
+import { follow, unfollow } from '../actions/userActions'
 const UserContainer = props => <User {...props} />
@@ -11,4 +12,7 @@ const mapStateToProps = (state) => ({
   currentUser: getCurrentUser(state)
 })
-export default connect(mapStateToProps)(UserContainer)
+export default connect(mapStateToProps, {
+  follow,
+  unfollow
+})(UserContainer)
```


首先按钮要显示 follow 发出 follow Action 还是显示 unfollow 发出 unfollow action 完全是由 isFriend 这个状态位决定的，而 isFriend 的判断条件则是当前用户的 followings 数组中是否包容正在查看的这个用户的 id ，container 中去拿到这些变量还有接口这个不用多说，再来看 user Actions 文件中对 follow 和 unfollow 的定义，其实也非常简单，就是把当前用户的 id 跟被查看用户的 id 都发给服务器，由服务器去更新数据库上的 .followings 数据，然后把更新后的结果返回给客户端，因为客户端需要这些数据来更新 redux 从而能更新页面显示。

看看本部分达成的效果。页面上看不出明显变化，点一下 follow 按钮可以看到发往服务器的请求并没有被接收，但是通过前端代码，其实 API 怎么写逻辑也已经搞清楚了。

至此，《前端确立 follow 逻辑》这部分就胜利完成了。

### 后端更新用户的 followings 数据

进入下一部分《后端更新用户的 followings 数据》。主要思路就是当前用户如果 unfollow 一个用户，那就在当前用户的 followings 字段中，剔除这个用户的 id ，反之则添加。

动手写代码。


```diff
diff --git a/happy-api-starter-1.0.0/controllers/user.js b/happy-api-starter-1.0.0/controllers/user.js
index ea45cd0..0608940 100755
--- a/happy-api-starter-1.0.0/controllers/user.js
+++ b/happy-api-starter-1.0.0/controllers/user.js
@@ -63,7 +63,7 @@ exports.logout = (req, res) => {
 // 通过 id 拿到用户信息
 exports.getById = (req, res) => {
-  User.findOne({_id: req.params.id}, '_id username')
+  User.findOne({_id: req.params.id}, '_id username avatar followings')
   .exec(
     (err, user) => {
       if (err) {
@@ -80,7 +80,7 @@ exports.getById = (req, res) => {
 // 读取所有用户
 exports.all = (req, res) => {
-  User.find({}, '_id username avatar').exec().then(
+  User.find({}, '_id username avatar followings').exec().then(
     users => {
       setTimeout(() =>
       res.json({ users }),
@@ -101,7 +101,8 @@ exports.updateAvatar = (req, res) => {
           user: {
             avatar: user.avatar,
             _id: user._id,
-            username: user.username
+            username: user.username,
+            followings: user.followings
           },
           message: '用户头像更新成功'
         })
@@ -113,3 +114,48 @@ exports.updateAvatar = (req, res) => {
     }
   })
 }
+
+exports.removeFollowing = (req, res) => {
+  User.findOne({ _id: req.body.currentUserId })
+  .exec().then(
+    user => {
+      let followings = user.followings
+      let { userId } = req.body
+      let index = followings.indexOf(userId)
+      followings.splice(index, 1)
+      user.save(() => {
+        res.json({
+          user: {
+            username: user.username,
+            _id: user._id,
+            avatar: user.avatar,
+            followings: user.followings
+          },
+          msg: '好友删除成功'
+        })
+      })
+    }
+  )
+}
+
+exports.addFollowing = (req, res) => {
+  User.findOne({ _id: req.body.currentUserId })
+  .exec().then(
+    user => {
+      let { followings } = user
+      let { userId } = req.body
+      followings.push(req.body.userId)
+      user.save(() => {
+        res.json({
+          msg: '添加成功',
+          user: {
+            username: user.username,
+            _id: user._id,
+            avatar: user.avatar,
+            followings: user.followings
+          }
+        })
+      })
+    }
+  )
+}
diff --git a/happy-api-starter-1.0.0/models/user.js b/happy-api-starter-1.0.0/models/user.js
index 46c8f8a..7962020 100755
--- a/happy-api-starter-1.0.0/models/user.js
+++ b/happy-api-starter-1.0.0/models/user.js
@@ -1,9 +1,11 @@
 const mongoose = require('mongoose')
+const ObjectId = mongoose.Schema.Types.ObjectId
 const UserSchema = new mongoose.Schema(
   {
     username: { type: String, maxlength: 18 },
     avatar: String,
+    followings: [{ type: ObjectId, ref: 'User' }],
     password: { type: String, required: true }
   },
   { timestamps: true }
diff --git a/happy-api-starter-1.0.0/routes.js b/happy-api-starter-1.0.0/routes.js
index b68408b..8ce5f9d 100755
--- a/happy-api-starter-1.0.0/routes.js
+++ b/happy-api-starter-1.0.0/routes.js
@@ -12,6 +12,8 @@ module.exports = app => {
   app.get('/users', User.all)
   app.get('/user/:id', User.getById)
   app.post('/avatar', uploadAvatar.single('avatar'), User.updateAvatar)
+  app.post('/user/follow', User.addFollowing)
+  app.post('/user/unfollow', User.removeFollowing)
   // dishes
   app.get('/dishes', Dish.all)
```

定义了 addFollowing 和 removeFollowing 两个接口，分别用来从当前用户的 followings 数据中增删用户 id 。

看看本部分达成的效果。到用户展示界面，点 follow ，按钮会变为 unfollow ，表示 follow 成功，点 unfollow 按钮，就又回到可 follow 状态。
至此，《后端更新用户的 followings 数据》这部分就胜利完成了。

### 个人中心页面显示好友列表

进入下一部分《个人中心页面显示好友列表》。一旦我 follow 一个人，这个人就会出现在我的个人中心。

先到 /settings 页面来添加样式。


```diff
diff --git a/client/src/components/Settings.js b/client/src/components/Settings.js
index 6b3500f..5f750a0 100644
--- a/client/src/components/Settings.js
+++ b/client/src/components/Settings.js
@@ -1,15 +1,25 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
 import SettingsAvatarContainer from '../containers/SettingsAvatarContainer'
+import SettingsList from './SettingsList'
 class Settings extends Component {
   render () {
+    const friends = [
+      {
+        _id: '5a2945e2451516b85e8ac6ba',
+        username: 'Billie',
+        avatar: '44cc62180b17e78e7079b32298b81a30'
+      }
+    ]
     return (
       <Wrap>
         <UpperWrap>
           <SettingsAvatarContainer />
         </UpperWrap>
-        <LowerWrap />
+        <LowerWrap>
+          <SettingsList friends={friends} />
+        </LowerWrap>
       </Wrap>
     )
   }
diff --git a/client/src/components/SettingsList.js b/client/src/components/SettingsList.js
new file mode 100644
index 0000000..edbbdb1
--- /dev/null
+++ b/client/src/components/SettingsList.js
@@ -0,0 +1,54 @@
+import React, { Component } from 'react'
+import { Link } from 'react-router-dom'
+import styled from 'styled-components'
+import { avatarUrl } from '../constants/ApiConstants'
+
+class UserList extends Component {
+  render () {
+    const { friends } = this.props
+    const listStr = friends.map(user => (
+      <ListItem key={user._id}>
+        <Avatar avatar={user.avatar} />
+        <UsernameLink to={`/user/${user._id}`} >
+          {user.username}
+        </UsernameLink>
+      </ListItem>
+    ))
+    return (
+      <Wrap>
+        {listStr}
+      </Wrap>
+    )
+  }
+}
+
+export default UserList
+
+const Wrap = styled.div`
+  padding: 20px;
+`
+
+const ListItem = styled.li`
+  background: #FFFFFF;
+  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
+  margin: 18px;
+  padding: 15px;
+  display: flex;
+`
+
+const Avatar = styled.div`
+  width: 50px;
+  height: 50px;
+  border-radius: 50%;
+  background-position: center center;
+  background-size: 90px;
+  background-image: url(${props => avatarUrl(props.avatar)});
+`
+
+const UsernameLink = styled(Link)`
+  font-size: 16px;
+  color: #F77062;
+  line-height: 50px;
+  flex-grow: 1;
+  margin-left: 10px;
+`
```


使用临时数据，把列表样式先做了出来。

然后去得到当前用户真正的好友列表。


```diff
diff --git a/client/src/components/Settings.js b/client/src/components/Settings.js
index 5f750a0..1cd852d 100644
--- a/client/src/components/Settings.js
+++ b/client/src/components/Settings.js
@@ -5,20 +5,13 @@ import SettingsList from './SettingsList'
 class Settings extends Component {
   render () {
-    const friends = [
-      {
-        _id: '5a2945e2451516b85e8ac6ba',
-        username: 'Billie',
-        avatar: '44cc62180b17e78e7079b32298b81a30'
-      }
-    ]
     return (
       <Wrap>
         <UpperWrap>
           <SettingsAvatarContainer />
         </UpperWrap>
         <LowerWrap>
-          <SettingsList friends={friends} />
+          <SettingsList {...this.props} />
         </LowerWrap>
       </Wrap>
     )
diff --git a/client/src/containers/SettingsContainer.js b/client/src/containers/SettingsContainer.js
index 07732e0..4547d99 100644
--- a/client/src/containers/SettingsContainer.js
+++ b/client/src/containers/SettingsContainer.js
@@ -1,6 +1,13 @@
 import React from 'react'
 import Settings from '../components/Settings'
+import { getFriends } from '../selectors/authSelectors'
+import { connect } from 'react-redux'
 const SettingsContainer = props => <Settings {...props} />
-export default SettingsContainer
+const mapStateToProps = (state) => ({
+  friends: getFriends(state)
+})
+
+
+export default connect(mapStateToProps)(SettingsContainer)
diff --git a/client/src/selectors/authSelectors.js b/client/src/selectors/authSelectors.js
index 4394afa..92fff50 100644
--- a/client/src/selectors/authSelectors.js
+++ b/client/src/selectors/authSelectors.js
@@ -1,5 +1,5 @@
 import { createSelector } from 'reselect'
-import { getUsersById } from './userSelectors'
+import { getUsersById, getUsers } from './userSelectors'
 export const getCurrentUserId = state => state.auth.currentUserId
@@ -9,5 +9,12 @@ export const getCurrentUser = createSelector(
   (users, currentUserId) => users[currentUserId] || {}
 )
+export const getFriends = createSelector(
+  getCurrentUser,
+  getUsers,
+  (currentUser, users) => users.filter(user => { return currentUser.followings.includes(user._id) })
+)
+
+
 export const getIsAuthenticated = state => state.auth.isAuthenticated
 export const getIsAuthFetching = state => state.auth.isFetching
```

通过定义 selector ，很容易把当前用户的 followings 数组里面的一个 id ，变成拥有 avatar _id 等信息的一个用户对象。

看看本部分达成的效果。当前用户 billie 首先前往 happypeter 用户的个人展示页，点 follow ，然后回到自己的 /settings 页面就可以看到 happypeter 出现在列表中了。如果 billie 想取消对 happypeter 的关注，只需要点 happypeter 的用户名，进入他的个人展示页，点 unfollow ，然后再次回到 /settings 页面，就可以看到 happypeter 已经不见了。

至此，《个人中心页面显示好友列表》这部分就胜利完成了。

### 修复私有路由 Bug

进入下一部分《修复私有路由 Bug》。现在有个问题，每次修改代码后页面就会刷新，而如果我们在 /settings 页面上时，即使处于登录状态也会被重定向到首页要求登录。

这个问题出在即使 localStorge 中保存 userId ，isAuthenticated 的初始值依然为 false


```diff
diff --git a/client/src/reducers/auth.js b/client/src/reducers/auth.js
index 207bc5a..f2f6764 100644
--- a/client/src/reducers/auth.js
+++ b/client/src/reducers/auth.js
@@ -1,7 +1,9 @@
 import * as types from '../constants/ActionTypes'
 import { combineReducers } from 'redux'
-const isAuthenticated = (state = false, action) => {
+const initAuthState = window.localStorage.getItem('userId') ? true : false
+
+const isAuthenticated = (state = initAuthState, action) => {
   switch (action.type) {
     case types.LOGIN_SUCCESS:
     case types.SIGNUP_SUCCESS:
diff --git a/client/src/selectors/authSelectors.js b/client/src/selectors/authSelectors.js
index 92fff50..2dc4a86 100644
--- a/client/src/selectors/authSelectors.js
+++ b/client/src/selectors/authSelectors.js
@@ -12,7 +12,14 @@ export const getCurrentUser = createSelector(
 export const getFriends = createSelector(
   getCurrentUser,
   getUsers,
-  (currentUser, users) => users.filter(user => { return currentUser.followings.includes(user._id) })
+  (currentUser, users) =>
+    users.filter(
+      user => {
+        return currentUser.followings
+        ? currentUser.followings.includes(user._id)
+        : []
+      }
+    )
 )
```


现在，如果 localStorge 中保存了 userId ，那么页面刷新的时候 isAuthenticated 默认值为 true 。代码中另外一处修改是因为 CurrentUser 初始值为空，那么 currentUser.following.include 就会执行报错，所以加了代码防范一下这种情况。


看看本部分达成的效果。这样再到 /settings 页面，刷新一下，问题就没有了。
至此，《修复私有路由 Bug》这部分就胜利完成了。


### 结语

进入最后一部分《结语》

复盘一下本节思路。

至此，《添加好友》就胜利完成了。
