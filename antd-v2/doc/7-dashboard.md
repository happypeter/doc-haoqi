# 查看好友更新

欢迎来到新的一节《查看好友更新》。要达成的效果是，我 follow 的人，如果在一个甜点上发评论，那么在我自己的操作盘界面，要可以看到更新。

### 添加操作盘界面

进入下一部分《添加操作盘界面》。好友更新会显示在操作盘页面，所以先把这个页面的基本样式写好。

第一步先把路由加上


```diff
diff --git a/client/src/components/Dashboard.js b/client/src/components/Dashboard.js
new file mode 100644
index 0000000..3df75da
--- /dev/null
+++ b/client/src/components/Dashboard.js
@@ -0,0 +1,18 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+class Dashboard extends Component {
+  render() {
+    return (
+      <Wrap>
+        Dashboard
+      </Wrap>
+    )
+  }
+}
+
+export default Dashboard
+
+const Wrap = styled.div`
+
+`
diff --git a/client/src/components/DishCommentsItem.js b/client/src/components/DishCommentsItem.js
index a7292f5..9de4fbc 100644
--- a/client/src/components/DishCommentsItem.js
+++ b/client/src/components/DishCommentsItem.js
@@ -9,7 +9,7 @@ moment.locale('zh-cn')
 const DishCommentsItem = ({ comment }) => {
   const { content, user } = comment
-  const avatar = undefined
+  const { avatar } = user
   return (
     <Item>
       <Avatar avatar={avatarUrl(avatar)}
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index c1dca07..c72ccd1 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -7,6 +7,7 @@ import DishesContainer from '../containers/DishesContainer'
 import SettingsContainer from '../containers/SettingsContainer'
 import { PrivateRoute } from '../utils/routerUtils'
 import UserContainer from '../containers/UserContainer'
+import DashboardContainer from '../containers/DashboardContainer'
 import {
   Switch,
   Route
@@ -29,6 +30,7 @@ const Layout = ({ title, showAlert, isAuthenticated }) => (
           <Route path='/dishes' component={DishesContainer} />
           <Route path='/dish/:id' component={DishContainer} />
           <Route path='/user/:id' component={UserContainer} />
+          <Route path='/dashboard' component={DashboardContainer} />
           <PrivateRoute isAuthenticated={isAuthenticated} path='/settings' component={SettingsContainer} />
         </Switch>
       </MainInner>
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index d23e272..e9d1762 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -30,6 +30,7 @@ class Sidebar extends Component {
               <Link onClick={this.closeMenu} to="/">首页</Link>
               <Link onClick={this.closeMenu} to="/settings">个人中心</Link>
               <Link onClick={this.closeMenu} to="/dishes">猜你喜欢</Link>
+              <Link onClick={this.closeMenu} to="/dashboard">操作盘</Link>
             </div>
             <div className="bottom-button">
               <button onClick={this.closeMenu} className ="bm-close-button" >关闭</button>
diff --git a/client/src/containers/DashboardContainer.js b/client/src/containers/DashboardContainer.js
new file mode 100644
index 0000000..e3285b2
--- /dev/null
+++ b/client/src/containers/DashboardContainer.js
@@ -0,0 +1,9 @@
+import React from 'react'
+import Dashboard from '../components/Dashboard'
+import { connect } from 'react-redux'
+
+const DashboardContainer = props => <Dashboard {...props} />
+
+const mapStateToProps = state => ({ })
+
+ export default connect(mapStateToProps)(DashboardContainer)
```

添加了路由，容器还有展示组件，全部都只是骨架。同时顺便把甜点页面的评论者头像加上了，便于后续操作。

接下来写样式。

```diff
diff --git a/client/src/assets/global.css b/client/src/assets/global.css
index 96268d9..1f06d56 100644
--- a/client/src/assets/global.css
+++ b/client/src/assets/global.css
@@ -8,6 +8,7 @@ body {
 * {
   box-sizing: border-box;
+  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
 }
 a {
diff --git a/client/src/components/CommentIcon.js b/client/src/components/CommentIcon.js
new file mode 100644
index 0000000..8b84aeb
--- /dev/null
+++ b/client/src/components/CommentIcon.js
@@ -0,0 +1,23 @@
+import React from 'react'
+
+const CommentIcon = ({ color }) => {
+  return (
+    <svg width="20px" height="18px" viewBox="0 0 20 18" >
+      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
+        <g id="/dashboard-不展开" transform="translate(-314.000000, -119.000000)" fill={color}>
+          <g id="Comments" transform="translate(314.000000, 119.000000)">
+            <g>
+              <path d="M9.99591837,0 C4.48163265,0 0,3.95918367 0,8.8244898 C0,10.7469388 0.718367347,12.6285714 2.02857143,14.155102 C1.75510204,14.7591837 1.35510204,15.2367347 0.832653061,15.5755102 C0.563265306,15.7510204 0.432653061,16.0693878 0.502040816,16.3836735 C0.571428571,16.6938776 0.820408163,16.922449 1.13877551,16.9673469 C1.45306122,17.0122449 1.7755102,17.0326531 2.08979592,17.0326531 C3.10204082,17.0326531 4.0244898,16.8163265 4.83673469,16.3877551 C6.39183673,17.2163265 8.16734694,17.6530612 9.99183673,17.6530612 C15.5061224,17.6530612 19.9877551,13.6938776 19.9877551,8.82857143 C19.9877551,3.96326531 15.5102041,0 9.99591837,0 Z M9.99591837,16.6489796 C8.24489796,16.6489796 6.54693878,16.2081633 5.08571429,15.3755102 C5.00816327,15.3306122 4.92244898,15.3102041 4.83673469,15.3102041 C4.74693878,15.3102041 4.65714286,15.3346939 4.57959184,15.3795918 C3.8122449,15.8408163 2.88979592,16.0612245 1.88571429,16.0244898 C2.4122449,15.5510204 2.8122449,14.9510204 3.08163265,14.2285714 C3.14693878,14.0530612 3.10612245,13.8530612 2.97959184,13.7142857 C1.68163265,12.3142857 1,10.6244898 1,8.8244898 C1,4.51020408 5.03673469,1 9.99591837,1 C14.955102,1 18.9918367,4.51020408 18.9918367,8.8244898 C18.9918367,13.1387755 14.955102,16.6489796 9.99591837,16.6489796 Z" id="Shape"></path>
+              <circle id="Oval" cx="10.0158163" cy="8.76581633" r="1"></circle>
+              <circle id="Oval" cx="7.51581633" cy="8.76581633" r="1"></circle>
+              <circle id="Oval" cx="12.5158163" cy="8.76581633" r="1"></circle>
+            </g>
+          </g>
+        </g>
+      </g>
+    </svg>
+  )
+}
+
+
+export default CommentIcon
diff --git a/client/src/components/Dashboard.js b/client/src/components/Dashboard.js
index 3df75da..0ee96e0 100644
--- a/client/src/components/Dashboard.js
+++ b/client/src/components/Dashboard.js
@@ -1,11 +1,33 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
+import DashboardItem from '../components/DashboardItem'
 class Dashboard extends Component {
   render() {
+    const comments = [
+      {
+        _id: '5a27dcca6b481776199ae99f',
+        updatedAt: '2017-12-06T12:04:26.391Z',
+        createdAt: '2017-12-06T12:04:26.391Z',
+        content: '好吃',
+        dish: {
+          '_id': '5a26738e8ed6687f81859d24',
+          'poster': 'tlms.png'
+        },
+        user: {
+          _id: '5a2638f58b8b05037aed5007',
+          username: 'happypeter',
+          avatar: '44cc62180b17e78e7079b32298b81a30'
+        },
+        "__v": 0
+      }
+    ]
+    const cardList = comments.map(comment =>
+      <DashboardItem key={comment._id} comment={comment} />
+    )
     return (
       <Wrap>
-        Dashboard
+        { cardList }
       </Wrap>
     )
   }
@@ -14,5 +36,8 @@ class Dashboard extends Component {
 export default Dashboard
 const Wrap = styled.div`
-
+  height: 100%;
+  background-color: #F9FAFB;
+  padding-bottom: 10px;
+  padding-top: 10px;
 `
diff --git a/client/src/components/DashboardItem.js b/client/src/components/DashboardItem.js
new file mode 100644
index 0000000..a820519
--- /dev/null
+++ b/client/src/components/DashboardItem.js
@@ -0,0 +1,151 @@
+import React, { Component } from 'react'
+import CommentIcon from './CommentIcon'
+import { Link } from 'react-router-dom'
+import moment from 'moment'
+import { avatarUrl, posterUrl } from '../constants/ApiConstants'
+import { BRAND_PINK, GRAY } from '../constants/Colors'
+import styled from 'styled-components'
+
+class DashBoardItem extends Component {
+  state = {
+    expand: false
+  }
+
+  toggleExpand = () => {
+    this.setState({
+      expand: !this.state.expand
+    })
+  }
+
+  render() {
+    const { comment } = this.props
+    const { expand } = this.state
+    return (
+      <Wrap expand={expand}>
+        <div className="feed-expand">
+          {comment.content}
+        </div>
+        <div className="feed-card">
+          <div className="feed-card-header">
+            <Link to={`/user/${comment.user._id}`}
+              className="feed-user">
+              <div style={{
+                'backgroundImage':
+                  `url(${avatarUrl(comment.user.avatar)})`
+              }}
+                className="feed-avatar">
+              </div>
+              {/* avatar 部分应该抽出成一个组件了 */}
+              <div className="feed-user-info">
+                <div className="feed-username">
+                  {comment.user.username}
+                </div>
+                <div className="feed-time">
+                  {moment(comment.createdAt).fromNow()}
+                </div>
+              </div>
+            </Link>
+            <div className="feed-button"
+              to="" onClick={this.toggleExpand}>
+              <CommentIcon color={expand ? BRAND_PINK : GRAY} />
+            </div>
+          </div>
+          <Link style={{ 'backgroundImage': `url(${posterUrl(comment.dish.poster)})` }}
+            to={`/dish/${comment.dish._id}`} className='feed-dish'>
+          </Link>
+        </div>
+      </Wrap>
+    )
+  }
+}
+
+export default DashBoardItem
+
+const Wrap = styled.div`
+  width: 90%;
+  margin: 10px auto;
+  position: relative;
+  height: ${props => props.expand ? '280px' : '330px'};
+  transition: height .5s ease;
+  .feed-card {
+    position: absolute;
+    top: 0;
+    left: 0;
+    width: 100%;
+    box-shadow: ${props => props.expand
+    ? '0 10px 10px 0 rgba(0,0,0,0.21)'
+    : '0 2px 4px 0 rgba(0,0,0,0.21)'};
+    box-shadow: ;
+    background-color: #fff;
+    padding: 10px;
+    padding-top: 20px;
+    transition: box-shadow .5s ease;
+  }
+
+  .feed-card-header {
+    display: flex;
+    margin-bottom: 10px;
+    justify-content: space-between;
+  }
+
+  .feed-user {
+    display: flex;
+  }
+
+  .feed-avatar{
+    width: 55px;
+    height: 55px;
+    border-radius: 50%;
+    margin-right: 10px;
+    margin-left: 8px;
+    margin-bottom: 8px;
+    background-position: center center;
+    background-size: 65px;
+  }
+
+  .feed-username {
+    font-size: 16px;
+    color: #F77062;
+    line-height: 25px;
+    margin-top: 5px;
+  }
+
+  .feed-time {
+    font-size: 12px;
+    color: #878787;
+  }
+
+  .feed-expand {
+    position: absolute;
+    left: 2%;
+    top: ${props => props.expand ? '245px' : '180px'};
+    width: 96%;
+    color: white;
+    transition: top .5s ease;
+    height: 70px;
+    padding-top: 35px;
+    padding-bottom: 5px;
+    text-align: center;
+    background-color: green;
+    background-image: linear-gradient(-45deg, #F77062 0%, #FE5196 100%);
+    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
+  }
+
+  .feed-button {
+    width: 20px;
+    display: block;
+    line-height: 40px;
+    margin-right: 10px;
+    margin-top: 10px;
+    cursor: pointer;
+  }
+
+  .feed-dish {
+    display: block;
+    width: 100%;
+    height: 160px;
+    background-repeat: no-repeat;
+    background-position: center center;
+    background-size: 350px;
+  }
+`
```


在 dashboard.js 中添加了一条评论的临时数据，主要样式都是在 DashboardItem 中写的，其中用到一个评论图标，因为需要它能改变颜色所以写成了一个组件，另外点按这个图标的时候移动设备上默认会有难看的阴影，所以在 global.css 加了一行来解决这个问题。

看看本部分达成的效果。页面侧边栏中点操作盘，打开 /dashboard 页面，可以看到好友更新，默认可以看到的是好友信息，被他评论的甜点海报，以及评论时间，点一下评论图标，可以查看评论详情，点一下甜点海报，可以打开甜点详情页。

至此，《添加操作盘界面》这部分就胜利完成了。

### 获取好友评论

进入下一部分《获取好友评论》。用真正的好友评论替换前面的临时数据。

重点就是写选择器。


```diff
diff --git a/client/src/components/Dashboard.js b/client/src/components/Dashboard.js
index 0ee96e0..920deb7 100644
--- a/client/src/components/Dashboard.js
+++ b/client/src/components/Dashboard.js
@@ -1,28 +1,12 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
-import DashboardItem from '../components/DashboardItem'
+import DashboardItem from './DashboardItem'
 class Dashboard extends Component {
   render() {
-    const comments = [
-      {
-        _id: '5a27dcca6b481776199ae99f',
-        updatedAt: '2017-12-06T12:04:26.391Z',
-        createdAt: '2017-12-06T12:04:26.391Z',
-        content: '好吃',
-        dish: {
-          '_id': '5a26738e8ed6687f81859d24',
-          'poster': 'tlms.png'
-        },
-        user: {
-          _id: '5a2638f58b8b05037aed5007',
-          username: 'happypeter',
-          avatar: '44cc62180b17e78e7079b32298b81a30'
-        },
-        "__v": 0
-      }
-    ]
-    const cardList = comments.map(comment =>
+    const { friendComments } = this.props
+    const commentsCopy = friendComments.slice()
+    const cardList = commentsCopy.map(comment =>
       <DashboardItem key={comment._id} comment={comment} />
     )
     return (
diff --git a/client/src/components/DashboardItem.js b/client/src/components/DashboardItem.js
index a820519..69cbebf 100644
--- a/client/src/components/DashboardItem.js
+++ b/client/src/components/DashboardItem.js
@@ -2,7 +2,7 @@ import React, { Component } from 'react'
 import CommentIcon from './CommentIcon'
 import { Link } from 'react-router-dom'
 import moment from 'moment'
-import { avatarUrl, posterUrl } from '../constants/ApiConstants'
+import { posterUrl, avatarUrl } from '../constants/ApiConstants'
 import { BRAND_PINK, GRAY } from '../constants/Colors'
 import styled from 'styled-components'
@@ -65,7 +65,7 @@ const Wrap = styled.div`
   width: 90%;
   margin: 10px auto;
   position: relative;
-  height: ${props => props.expand ? '280px' : '330px'};
+  height: ${props => props.expand ? '330px' : '290px'};
   transition: height .5s ease;
   .feed-card {
     position: absolute;
diff --git a/client/src/containers/DashboardContainer.js b/client/src/containers/DashboardContainer.js
index e3285b2..b5349d3 100644
--- a/client/src/containers/DashboardContainer.js
+++ b/client/src/containers/DashboardContainer.js
@@ -1,9 +1,12 @@
 import React from 'react'
 import Dashboard from '../components/Dashboard'
 import { connect } from 'react-redux'
+import { getFriendComments } from '../selectors/commentSelectors'
 const DashboardContainer = props => <Dashboard {...props} />
-const mapStateToProps = state => ({ })
+const mapStateToProps = state => ({
+  friendComments: getFriendComments(state)
+})
  export default connect(mapStateToProps)(DashboardContainer)
diff --git a/client/src/selectors/commentSelectors.js b/client/src/selectors/commentSelectors.js
index 093548f..2684864 100644
--- a/client/src/selectors/commentSelectors.js
+++ b/client/src/selectors/commentSelectors.js
@@ -1,4 +1,5 @@
 import { createSelector } from 'reselect'
+import { getCurrentUser } from './authSelectors'
 export const getComments = state => state.comment.all
@@ -13,3 +14,11 @@ export const getCommentsByDishId = createSelector(
     return obj
   }, {})
 )
+
+export const getFriendComments = createSelector(
+  getComments,
+  getCurrentUser,
+  (comments, currentUser) => comments.filter(comment => {
+    return currentUser.followings && currentUser.followings.includes(comment.user._id)
+  })
+)
```

getFriendComments 选择器中从所有评论中筛选出当前用户的好友的评论，这也正是操作盘页面上需要显示的信息。

看看本部分达成的效果。当前用户可以在操作盘上看到他的好友的更新，如果取消对该好友的关注，更新就会消失。

至此，《获取好友评论》这部分就胜利完成了。

### 结语

进入最后一部分《结语》。

复盘一下本节思路。按照咱们习惯的方法，先按照设计图把界面做出来，这个过程中通过对临时数据的填写，也理清了需要数据的结构，接下来真正获取数据时，主要用到的技巧是选择器。

至此，《查看好友更新》就胜利完成了。
