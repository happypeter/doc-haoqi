# 添加增强型功能

欢迎来到新的一节《添加增强型功能》。主要做三个功能，第一，已登录用户访问首页时，直接重定向到操作盘页面，第二，操作盘上如果没有更新，那就显示一段提示性文字。

### 重定向到操作盘

进入第一部分《重定向到操作盘》。对于已经登录的用户，没有必要再看到那个只有登录和注册按钮的首页了，直接重定向到操作盘界面更好。

到首页路由位置进行修改。

```diff
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index e5ef741..fba998e 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -9,10 +9,12 @@ import { Router } from 'react-router'
 import { history } from '../utils/routerUtils'
 import {
   Switch,
-  Route
+  Route,
+  Redirect
 } from 'react-router-dom'
 import { fetchDishes } from '../actions/dishActions'
 import { fetchComments } from '../actions/commentActions'
+import { getIsAuthenticated } from '../selectors/authSelectors'
 class App extends Component {
   componentDidMount () {
@@ -26,7 +28,18 @@ class App extends Component {
     return (
       <Router history={history} >
         <Switch>
-          <Route exact path='/' component={HomeContainer} />
+          <Route exact path='/' render={
+              props => {
+                if (!this.props.isAuthenticated) {
+                  return <HomeContainer />
+                } else {
+                  return < Redirect to = {{
+                    pathname: '/dashboard'
+                  }} />
+                }
+              }
+            }
+          />
           <Route component={LayoutContainer} />
         </Switch>
       </Router>
@@ -34,7 +47,11 @@ class App extends Component {
   }
 }
-export default connect(null, {
+const mapStateToProps = state => ({
+  isAuthenticated: getIsAuthenticated(state)
+})
+
+export default connect(mapStateToProps, {
   fetchUsers,
   fetchCurrentUser,
   fetchDishes,
```


使用了 render 功能，跟直接指定 component 不同，写路由的时候可以使用 render 函数的形式，这样就可以根据条件判断决定具体要执行的操作了，例如我们这里先判断用户是否登录，来决定是要展示首页，还是要重定向到操作盘页面。

看看本部分达成的效果。未登录用户是可以通过访问 / ，看到首页的，但是登录后，再去访问首页，会被重定向到操作盘。

至此，《重定向到操作盘》这部分就胜利完成了。

### 添加暂无好友更新提示

进入下一部分《添加暂无好友更新提示》。如果当前用户还没有 follow 好友，那操作盘页面上就会是空的，更好的用户体验是提供一个提示信息。

到操作盘的展示组件中判断一下即可。


```diff
diff --git a/client/src/components/Dashboard.js b/client/src/components/Dashboard.js
index 027b2ff..13d1dce 100644
--- a/client/src/components/Dashboard.js
+++ b/client/src/components/Dashboard.js
@@ -9,9 +9,14 @@ class Dashboard extends Component {
     const cardList = commentsCopy.map(comment =>
       <DashboardItem key={comment._id} comment={comment} />
     )
+    const noUpdate = (
+      <NoUpdate>
+        暂无好友更新
+      </NoUpdate>
+    )
     return (
       <Wrap>
-        { cardList }
+        {friendComments.length === 0 ? noUpdate : cardList}
       </Wrap>
     )
   }
@@ -25,3 +30,7 @@ const Wrap = styled.div`
   padding-bottom: 10px;
   padding-top: 10px;
 `
+
+const NoUpdate = styled.div`
+  padding: 10px;
+`
```

如果没有好友更新，就显示 no-update 部分的文字。

看看本部分达成的效果。用户登录后，去评论区 follow 一个好友，可以看到操作盘界面上会出现他的更新，unfollow 所有好友，那操作盘上就会显示 No-update 的文字。

至此，《添加暂无好友更新提示》这部分就胜利完成了。

### 结语

进入最后一部分《结语》。

复盘一下本节思路。作为本课程最后一章，做了一些功能增强，这样整个社交化电商课程的前端部分就全部完成了，后台系统会放到《蚂蚁设计实战》课程中去讲解。

好，《社交化电商--功能篇》就到这里了，我是 Peter ，下一门课程中咱们再见。
