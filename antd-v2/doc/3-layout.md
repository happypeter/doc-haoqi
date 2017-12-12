# 搭建页面布局

这集来《搭建页面布局》。达成一个左边放导航栏 ，右边是主体内容的效果。

### 划分左右两栏

先来《划分左右两栏》。我尝试了一下 [官方的 Layout 组件](https://ant.design/components/layout-cn/) 发现还是欠缺灵活性，不用了，最后决定使用 flexbox 手写。

```diff
diff --git a/admin/src/components/Dashboard.js b/admin/src/components/Dashboard.js
index 6e456ae..8b9b8ec 100644
--- a/admin/src/components/Dashboard.js
+++ b/admin/src/components/Dashboard.js
@@ -5,7 +5,10 @@ class Dashboard extends Component {
   render () {
     return (
       <Wrap>
-        Dashboard
+        <Sider>
+        </Sider>
+        <Content>
+        </Content>
       </Wrap>
     )
   }
@@ -13,4 +16,19 @@ class Dashboard extends Component {
 export default Dashboard
-const Wrap = styled.div``
+const Wrap = styled.div`
+  height: 100vh;
+  display: flex;
+`
+
+const Sider = styled.div`
+  border: 1px solid green;
+  flex-basis: 200px;
+  display: flex;
+  flex-direction: column;
+`
+
+const Content = styled.div`
+  border: 1px solid red;
+  flex-grow: 1;
+`
```

Dashboard.js 中，放侧边栏的部分叫 Sider ，右侧的主体部分叫 Content，用了 styled-components 方式，这标签写的是不是特别简练？！具体的 CSS 语句就写到了下面。

看看达成的效果。左右两栏布局有了，左侧宽度初始值 200px ，右侧自动占据其余宽度。

### 细化布局

继续来《细化布局》。侧边栏部分里面分上中下三小块，主体内容部分加一个 Header 。

```diff
diff --git a/admin/src/components/Dashboard.js b/admin/src/components/Dashboard.js
index 8b9b8ec..f775560 100644
--- a/admin/src/components/Dashboard.js
+++ b/admin/src/components/Dashboard.js
@@ -6,8 +6,14 @@ class Dashboard extends Component {
     return (
       <Wrap>
         <Sider>
+          <LogoWrap />
+          <NavWrap>
+            Menu
+          </NavWrap>
+          <LogoutWrap />
         </Sider>
         <Content>
+          <Header />
         </Content>
       </Wrap>
     )
@@ -22,13 +28,30 @@ const Wrap = styled.div`
 `
 const Sider = styled.div`
-  border: 1px solid green;
   flex-basis: 200px;
   display: flex;
   flex-direction: column;
 `
 const Content = styled.div`
-  border: 1px solid red;
   flex-grow: 1;
 `
+
+const LogoWrap = styled.div`
+  height: 60px;
+  background: #ececec;
+`
+
+const NavWrap = styled.div`
+  flex-grow: 1;
+`
+
+const LogoutWrap = styled.div`
+  height: 60px;
+  background: #ececec;
+`
+
+const Header = styled.div`
+  height: 60px;
+  background: #212121;
+`
```

侧边栏这边的三小块分别是，LogoWrap 里面放网站 Logo ，NavWrap 里面放导航菜单，LogoutWrap 放退出按钮。右侧主体内容通篇都是白的不好看，添加一个深色的 Header 进来。具体这四个小块的样式都写到了最下方。

看看达成的效果。页面上一共分了五块，错落有致。

### 添加登出部分样式

再来《添加登出部分样式》。把 LogoutWrap 里面填充上内容。

```diff
diff --git a/admin/src/components/Dashboard.js b/admin/src/components/Dashboard.js
index f775560..a1c1ce6 100644
--- a/admin/src/components/Dashboard.js
+++ b/admin/src/components/Dashboard.js
@@ -1,4 +1,5 @@
 import React, { Component } from 'react'
+import LogoutContainer from '../containers/LogoutContainer'
 import styled from 'styled-components'
 class Dashboard extends Component {
@@ -10,7 +11,9 @@ class Dashboard extends Component {
           <NavWrap>
             Menu
           </NavWrap>
-          <LogoutWrap />
+          <LogoutWrap>
+            <LogoutContainer />
+          </LogoutWrap>
         </Sider>
         <Content>
           <Header />
@@ -37,10 +40,7 @@ const Content = styled.div`
   flex-grow: 1;
 `
-const LogoWrap = styled.div`
-  height: 60px;
-  background: #ececec;
-`
+const LogoWrap = styled.div``
 const NavWrap = styled.div`
   flex-grow: 1;
diff --git a/admin/src/components/Logout.js b/admin/src/components/Logout.js
new file mode 100644
index 0000000..93cd2f2
--- /dev/null
+++ b/admin/src/components/Logout.js
@@ -0,0 +1,37 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+class Logout extends Component {
+  render () {
+    return (
+      <Wrap>
+        <LogoutText>
+          退出
+        </LogoutText>
+        <UserName>
+          admin
+        </UserName>
+      </Wrap>
+    )
+  }
+}
+
+export default Logout
+
+const Wrap = styled.div`
+  height: 60px;
+  line-height: 60px;
+  background: #ececec;
+  display: flex;
+`
+
+const LogoutText = styled.div`
+  text-align: center;
+  flex-basis: 50px;
+  background: #ff8a00;
+  color: white;
+`
+
+const UserName = styled.div`
+  padding-left: 10px;
+`
diff --git a/admin/src/containers/LogoutContainer.js b/admin/src/containers/LogoutContainer.js
new file mode 100644
index 0000000..09f9fa9
--- /dev/null
+++ b/admin/src/containers/LogoutContainer.js
@@ -0,0 +1,9 @@
+import React from 'react'
+import Logout from '../components/Logout'
+import { connect } from 'react-redux'
+
+const LogoutContainer = props => <Logout {...props} />
+
+const mapStateToProps = state => ({ })
+
+export default connect(mapStateToProps)(LogoutContainer)
```

修改一共涉及到，三个文件。DashBoard.js 中，为了防止未来代码太多太乱，所以登出部分单纯抽出成了组件。但是为啥这里是一个容器组件，而不是直接写个展示组件呢？原则是这样，如果这个组件会调用对外接口，例如 action 创建器接口或者是 redux 数据接口，就会专门给他一个容器组件去拿接口，这样代码的结构会更清晰。再来看看添加进来的容器组件 containers 文件夹中的 LogoutContainer ，目前还没有导入对外接口。容器组件 Logout.js 中添加了 LogoText 和 UserName 两部分，下面的 CSS ，让它们一左一右。

看看达成的效果。侧边栏底部看到了用户登出的按钮。
