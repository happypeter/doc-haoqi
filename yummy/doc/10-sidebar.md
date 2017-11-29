# 添加侧边栏

欢迎来到新的一节《添加侧边栏》。退出登录的按钮在侧边栏里，另外其实侧边栏也算布局的一部分，所以现在引入侧边栏已经是比较好的时机了。

### 跑通基本功能

进入《跑通基本功能》这个部分。


先把设计图画好。Sketch 图中画一个抽屉式的侧边栏。开发前先把样式确定好，还真是能提高开发效率的。


接下来一步就是搜网上能实现这个效果的插件。结果发现了一个 [react-burger-menu](https://github.com/negomi/react-burger-menu) ，所以先装上。

```
npm i react-burger-menu
```

包名的中文意思是，基于 react 技术的有汉堡按钮的菜单。

接下来的工作就是添加组件，导入插件，覆盖原有样式这些常见操作了

```diff
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index 52b6d4b..25439bd 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -1,6 +1,7 @@
 import React from 'react'
 import LoginContainer from '../containers/LoginContainer'
 import SignupContainer from '../containers/SignupContainer'
+import SidebarContainer from '../containers/SidebarContainer'
 import AlertBoxContainer from '../containers/AlertBoxContainer'
 import {
   Switch,
@@ -10,6 +11,7 @@ import styled from 'styled-components'
 
 const Layout = ({ title, showAlert }) => (
   <Wrap>
+    <SidebarContainer />
     { showAlert && <AlertBoxContainer /> }
     <Header>
       { title }
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
new file mode 100644
index 0000000..9ad2248
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
+`
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

代码虽多，没有太多需要讲的。需要提一下的就是，即使用了 styled-components ，我们也可以照原来的方式写 css ，就像我这里需要把插件的默认样式做一下覆盖，就采用了这种选中 class 名写 css 的形式。


看一下这部分达成的结果。页面中看一下，设计图中的样式已经达成了，通过手动给 `Menu` 组件设置 `isOpen` 属性，可以控制侧边栏的开关。效果不错。

至此，《跑通基本功能》这部分就胜利完成了。


### 打开和关闭

进入《打开和关闭》这个部分。通过把 redux 中的状态传递给 isOpen 属性的形式来控制侧边栏的开闭。


```diff
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index 9ad2248..71e9805 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -6,10 +6,23 @@ import {
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
     return (
       <Wrap>
-        <Menu customCrossIcon={ false } >
+        <Menu
+          isOpen={this.state.isOpen}
+          customCrossIcon={ false }
+        >
             <div className="bm-link-list">
               <Link to="/">首页</Link>
               <Link to="/profile">个人中心</Link>
```

由于打开按钮是通过点汉堡按钮修改组件内的 state 值来实现的，同时汉堡按钮没公开出任何接口出来，所以这里的 `isOpen` 不能被放到 redux 中统一管理。

每一个菜单项点击后，我们也是希望侧边栏能关闭的。

```diff
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index 71e9805..6a8ac7a 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -15,7 +15,7 @@ class Sidebar extends Component {
       isOpen: false
     })
   }
-  
+
   render () {
     return (
       <Wrap>
@@ -24,9 +24,9 @@ class Sidebar extends Component {
           customCrossIcon={ false }
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
               <button onClick={this.closeMenu} className ="bm-close-button" >关闭</button>
```

对每一个链接都添加了 `onClick` 事件。

看看这部分的劳动成果。页面上用汉堡按钮可以打开侧边栏，同时点一下按钮或者任何一个菜单项目都可以闭合菜单栏。效果完美。

至此，《打开和关闭》这部分就胜利完成了。



### 添加用户状态区

进入《添加用户状态区》这个部分。


```diff
diff --git a/client/src/assets/avatar.png b/client/src/assets/avatar.png
new file mode 100644
index 0000000..c4ccb6e
Binary files /dev/null and b/client/src/assets/avatar.png differ
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

```diff
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index caf1143..7f75dd3 100644
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
@@ -23,14 +24,15 @@ class Sidebar extends Component {
           isOpen={this.state.isOpen}
           customCrossIcon={ false }
         >
+          <UserInfo />
           <div className="bm-link-list">
```


```diff
diff --git a/client/src/components/SidebarUserInfo.js b/client/src/components/SidebarUserInfo.js
new file mode 100644
index 0000000..8227aa0
--- /dev/null
+++ b/client/src/components/SidebarUserInfo.js
@@ -0,0 +1,49 @@
+import React from 'react'
+import styled from 'styled-components'
+import Avatar from './Avatar'
+import avatar from '../assets/avatar.png'
+import { Link } from 'react-router-dom'
+
+const propTypes = {
+
+}
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
+UserInfo.propTypes = propTypes
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

至此，《添加用户状态区》这部分就胜利完成了。

### 总结

