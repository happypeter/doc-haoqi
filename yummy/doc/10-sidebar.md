# 添加侧边栏

欢迎来到新的一节《添加侧边栏》。退出登录的按钮在侧边栏里，所以我们先来把侧边栏做出来。

### 跑通基本功能

进入《跑通基本功能》这个部分。

先把设计图画好。Sketch 图中画一个抽屉式的侧边栏。开发前先把样式确定好，还真是能提高开发效率的。

接下来一步就是搜网上能实现这个效果的插件。结果发现了一个 [react-burger-menu](https://github.com/negomi/react-burger-menu) ，所以先装上。

```
npm i react-burger-menu
```

包名的中文意思是，基于 react 技术的有汉堡按钮的菜单。

创建侧边栏，先添加容器组件。


```diff
diff --git a/client/src/containers/SidebarContainer.js b/client/src/containers/SidebarContainer.js
new file mode 100644
index 0000000..c68b062
--- /dev/null
+++ b/client/src/containers/SidebarContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import Sidebar from '../components/Sidebar'
+
+const SidebarContainer = props => <Sidebar {...props} />
+
+export default SidebarContainer
```


添加完毕。

再来添加展示组件。

```diff
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
new file mode 100644
index 0000000..69b8c00
--- /dev/null
+++ b/client/src/components/Sidebar.js
@@ -0,0 +1,105 @@
+import React, { Component } from 'react'
+import { slide as Menu } from 'react-burger-menu'
+import styled from 'styled-components'
+import {
+  Link
+} from 'react-router-dom'
+
+class Sidebar extends Component {
+  render () {
+    return (
+      <Wrap>
+        <Menu customCrossIcon={ false } >
+            <div className="bm-link-list">
+              <Link to="/">首页</Link>
+              <Link to="/profile">个人中心</Link>
+              <Link to="/dishes">猜你喜欢</Link>
+            </div>
+            <div className="bottom-button">
+              <button className ="bm-close-button" >关闭</button>
+            </div>
+        </Menu>
+      </Wrap>
+    )
+  }
+}
+
+export default Sidebar
+
+const Wrap = styled.div`
+  .bm-menu {
+    background: #fff;
+    padding: 2.5em 1.5em 0;
+    font-size: 1.15em;
+  }
+
+  /* Color/shape of burger icon bars */
+  .bm-burger-bars {
+    background: #fff;
+  }
+
+  .bm-burger-button {
+    position: absolute;
+    width: 18px;
+    height: 12px;
+    left: 17px;
+    top: 42px;
+  }
+
+  .bm-item-list {
+    display: flex;
+    flex-direction: column;
+    justify-content: space-between;
+  }
+
+  .bm-link-list {
+    flex-grow: 2;
+  }
+
+  .bm-link-list a {
+    display: block;
+    line-height: 56px;
+    border-bottom: 1px solid #E3E9EC;
+    padding-left: 10px;
+    font-size: 12px;
+    color: #878787;
+  }
+
+  .bm-menu .user-info-text, .bm-menu .user-info-text a {
+    font-size: 14px;
+    color: #F77062;
+    text-align: center;
+    line-height: 1.0;
+  }
+
+  .bm-menu .user-info-text {
+    display: block;
+    margin: 16px auto;
+  }
+
+  .bm-user-name {
+    display: inline-block;
+    padding-right: 5px;
+    border-right: 2px solid #F77062;
+  }
+
+  .bm-menu .user-info-text a {
+    padding-left: 5px;
+  }
+
+  .bm-close-button {
+    display: block;
+    color: white;
+    background-image: linear-gradient(-45deg, #F77062 0%, #FE5196 100%);
+    border-radius: 2px;
+    font-size: 14px;
+    border: 0;
+    width: 80%;
+    margin: 30px auto;
+    line-height: 39px;
+  }
+
+  .bm-user-avatar {
+    margin: 0 auto;
+  }
+`
```

代码虽多，没有太多需要讲的。需要提一下的就是，即使用了 styled-components ，我们也可以照原来的方式写 css ，就像我这里需要把插件的默认样式做一下覆盖，就采用了这种选中 class 名写 css 的形式。

接下来 Layout 组件中使用 sidebar 。

```diff
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index 0ac6b7a..c9ef5c9 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -2,6 +2,7 @@ import React from 'react'
 import LoginContainer from '../containers/LoginContainer'
 import SignupContainer from '../containers/SignupContainer'
 import AlertBoxContainer from '../containers/AlertBoxContainer'
+import SidebarContainer from '../containers/SidebarContainer'
 import {
   Switch,
   Route
@@ -11,6 +12,7 @@ import styled from 'styled-components'
 const Layout = ({ title, showAlert }) => (
   <Wrap>
    { showAlert &&  <AlertBoxContainer /> }
+   <SidebarContainer />
     <Header>
       {title}
     </Header>
```

添加进来即可。

看一下这部分达成的结果。设计图中的样式已经达成了，通过手动给 `Menu` 组件设置 `isOpen` 属性，可以控制侧边栏的开关。效果不错。

至此，《跑通基本功能》这部分就胜利完成了。


### 打开和关闭

进入《打开和关闭》这个部分。这个主要通过控制 isOpen 属性来实现。

添加对 isOpen 的控制。

```diff
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index 69b8c00..ef96b0e 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -6,10 +6,24 @@ import {
 } from 'react-router-dom'
 
 class Sidebar extends Component {
+  state = {
+    isOpen: false
+  }
+
+  closeMenu = () =>{
+    this.setState({
+      isOpen: false
+    })
+  }
+
   render () {
+    const { isOpen } = this.state
     return (
       <Wrap>
-        <Menu customCrossIcon={ false } >
+        <Menu
+          customCrossIcon={ false }
+          isOpen={isOpen}
+        >
             <div className="bm-link-list">
               <Link to="/">首页</Link>
               <Link to="/profile">个人中心</Link>
```

由于打开侧边栏，是通过点汉堡按钮修改组件内的 state 值来实现的，同时汉堡按钮又没公开出任何接口出来方便我们往 redux 中传递信息，所以这里的 `isOpen` 不能被放到 redux 中统一管理，只能用 state 控制。

除了汉堡按钮之外，每一个菜单项点击后，我们也是希望侧边栏能关闭的。

```diff
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index ef96b0e..cd34463 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -25,12 +25,12 @@ class Sidebar extends Component {
           isOpen={isOpen}
         >
             <div className="bm-link-list">
-              <Link to="/">首页</Link>
-              <Link to="/profile">个人中心</Link>
-              <Link to="/dishes">猜你喜欢</Link>
+              <Link onClick={this.closeMenu} to="/">首页</Link>
+              <Link onClick={this.closeMenu} to="/profile">个人中心</Link>
+              <Link onClick={this.closeMenu} to="/dishes">猜你喜欢</Link>
             </div>
             <div className="bottom-button">
-              <button className ="bm-close-button" >关闭</button>
+              <button onClick={this.closeMenu} className ="bm-close-button" >关闭</button>
             </div>
         </Menu>
       </Wrap>
```

对每一个链接都添加了 `onClick` 事件。

看看这部分的劳动成果。页面上用汉堡按钮可以打开侧边栏，同时点一下按钮或者任何一个菜单项目都可以闭合菜单栏。效果完美。

至此，《打开和关闭》这部分就胜利完成了。

### 添加用户状态区

进入《添加用户状态区》这个部分。就是设计图上带头像的区域。

头像功能网站上多处用到，所以单独抽出成一个组件。

```diff
diff --git a/client/src/components/Avatar.js b/client/src/components/Avatar.js
new file mode 100644
index 0000000..d01dea5
--- /dev/null
+++ b/client/src/components/Avatar.js
@@ -0,0 +1,12 @@
+import styled from 'styled-components'
+
+const Avatar = styled.div`
+  width: ${props => props.size}px;
+  height: ${props => props.size}px;
+  background-image: url(${props => props.avatar});
+  border-radius: 50%;
+  background-size: ${props => props.size * 1.5}px;
+  background-position: center center;
+`
+
+export default Avatar
```

父组件传属性值可以改变头像尺寸。

然后添加一个专门的组件来写用户状态区代码。


```diff
diff --git a/client/src/components/SidebarUserInfo.js b/client/src/components/SidebarUserInfo.js
new file mode 100644
index 0000000..dce1c49
--- /dev/null
+++ b/client/src/components/SidebarUserInfo.js
@@ -0,0 +1,43 @@
+import React from 'react'
+import styled from 'styled-components'
+import Avatar from './Avatar'
+import avatar from '../assets/avatar.png'
+import { Link } from 'react-router-dom'
+
+const UserInfo = () => (
+  <Wrap>
+    <CenteredAvatar avatar={avatar}  size='100' />
+    <Text>
+      <Name to="/profile" >
+        用户名
+      </Name>
+      <Link to="">退出</Link>
+    </Text>
+  </Wrap>
+)
+
+export default UserInfo
+
+const Wrap = styled.div``
+
+const Name = styled(Link)`
+  display: inline-block;
+  padding-right: 5px;
+  border-right: 2px solid #F77062;
+`
+
+const Text = styled.div`
+  font-size: 14px;
+  text-align: center;
+  line-height: 1.0;
+  display: block;
+  margin: 16px auto;
+  a {
+    padding-left: 5px;
+    color: #F77062;
+  }
+`
+
+const CenteredAvatar = styled(Avatar)`
+  margin: 0 auto
+`
```

使用了 Avatar 组件。

导入 UserInfo 组件


```diff
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index cd34463..e558f0c 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -1,6 +1,7 @@
 import React, { Component } from 'react'
 import { slide as Menu } from 'react-burger-menu'
 import styled from 'styled-components'
+import UserInfo from './SidebarUserInfo'
 import {
   Link
 } from 'react-router-dom'
@@ -24,6 +25,7 @@ class Sidebar extends Component {
           customCrossIcon={ false }
           isOpen={isOpen}
         > 
+            <UserInfo />
             <div className="bm-link-list">
               <Link onClick={this.closeMenu} to="/">首页</Link>
               <Link onClick={this.closeMenu} to="/profile">个人中心</Link>
```

代码就写完了。

不要忘了把头像图片添加进来。存放位置是 src/assets/avatar.png 。

看一下本部分的劳动成果。侧边栏上，用户状态区已经显示出来了。

至此，《添加用户状态区》这部分就胜利完成了。

### 总结

进入最后一部分《总结》。

来复盘一下本节思路。从设计图出发，我们先到网上搜了一个侧边栏插件，然后对插件的样式进行了 css 覆盖，达成了设计图上的效果，并且使用 state 值的形式来控制侧边栏的开闭。

至此，《添加侧边栏》这个小节就胜利结束。