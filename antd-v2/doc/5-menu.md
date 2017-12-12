# 添加导航功能

来用[导航菜单](https://ant.design/components/menu-cn/)给应用《添加导航功能》。

### 运行导航菜单组件

先来《运行导航菜单组件》。

```diff
diff --git a/admin/src/components/Dashboard.js b/admin/src/components/Dashboard.js
@@ -1,5 +1,6 @@
 import React, { Component } from 'react'
 import LogoutContainer from '../containers/LogoutContainer'
+import NavContainer from '../containers/NavContainer'
 import styled from 'styled-components'
 class Dashboard extends Component {
@@ -7,9 +8,9 @@ class Dashboard extends Component {
     return (
       <Wrap>
         <Sider>
-          <LogoWrap />
+          <LogoWrap>吮指店铺</LogoWrap>
           <NavWrap>
-            Menu
+            <NavContainer />
           </NavWrap>
           <LogoutWrap>
             <LogoutContainer />
@@ -40,7 +41,13 @@ const Content = styled.div`
   flex-grow: 1;
 `
-const LogoWrap = styled.div``
+const LogoWrap = styled.div`
+  height: 60px;
+  background: #ececec;
+  text-align: center;
+  font-size: 20px;
+  line-height: 60px;
+`
 const NavWrap = styled.div`
   flex-grow: 1;
diff --git a/admin/src/components/Nav.js b/admin/src/components/Nav.js
new file mode 100644
index 0000000..9970c12
--- /dev/null
+++ b/admin/src/components/Nav.js
@@ -0,0 +1,32 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+import { Menu, Icon } from 'antd'
+const SubMenu = Menu.SubMenu
+
+class Nav extends Component {
+  render () {
+    return (
+      <Wrap>
+        <Menu
+          style={{ borderRight: 'none' }}
+          defaultOpenKeys={['dishes', 'orders']}
+          selectedKeys={['/dashboard/dishes/new']}
+          mode='inline'
+        >
+          <SubMenu key='orders' title={<span><Icon type='file' /><span>订单</span></span>}>
+            <Menu.Item key='/dashboard/orders'>未发货</Menu.Item>
+            <Menu.Item key='/dashboard/orders/completed'>已发货</Menu.Item>
+          </SubMenu>
+          <SubMenu key='dishes' title={<span><Icon type='file' /><span>甜点</span></span>}>
+            <Menu.Item key='/dashboard/dishes'>已有</Menu.Item>
+            <Menu.Item key='/dashboard/dishes/new'>新建</Menu.Item>
+          </SubMenu>
+        </Menu>
+      </Wrap>
+    )
+  }
+}
+
+export default Nav
+
+const Wrap = styled.div``
diff --git a/admin/src/containers/NavContainer.js b/admin/src/containers/NavContainer.js
new file mode 100644
index 0000000..063f1ed
--- /dev/null
+++ b/admin/src/containers/NavContainer.js
@@ -0,0 +1,9 @@
+import React from 'react'
+import Nav from '../components/Nav'
+import { connect } from 'react-redux'
+
+const NavContainer = props => <Nav {...props} />
+
+const mapStateToProps = state => ({ })
+
+export default connect(mapStateToProps)(NavContainer)
diff --git a/admin/src/reducers/common.js b/admin/src/reducers/common.js
index 30c038f..ce487c1 100644
--- a/admin/src/reducers/common.js
+++ b/admin/src/reducers/common.js
@@ -1,7 +1,7 @@
 import * as types from '../constants/ActionTypes'
 import { combineReducers } from 'redux'
-const isAuthenticated = (state = false, action) => {
+const isAuthenticated = (state = true, action) => {
   switch (action.type) {
     case types.LOGIN_SUCCESS:
       return true
```

一共修改了四个文件。

Dashboard.js 文件中，组件里面添加了 Nav 组件专门存放导航菜单。

NavContainer.js 文件中，是一个空壳子容器。

展示组件 Nav.js 内部导入了蚂蚁设计的 Menu ，也就是导航菜单组件。其中 defaultOpenKeys 的意思是默认要打开那个子菜单，我们这里内容比较少，所以把两个子菜单全部设置为默认打开状态。selectedKeys 用来指定处于高亮状态的是那一项，注意这两个 Keys 的数据类型都是数组，不是字符串。菜单里面包含子菜单，子菜单里面包含导航项，其中导航项的 key 都我都设置为对应的页面链接了，后面会比较方便跟路由操作配合。

common.js 中把 isAuthenticated 默认值，临时性的改成了 true ，这个是为了方便调试。

页面上有很多导航项了，默认高亮的一项在新建甜点一项下。看上去不错可惜就是不管用。

### 添加路由规则

要想导航到其他路由，首先要《添加路由规则》。

```diff
diff --git a/admin/src/actions/authActions.js b/admin/src/actions/authActions.js
index fbf94c2..68ef7f1 100644
--- a/admin/src/actions/authActions.js
+++ b/admin/src/actions/authActions.js
@@ -4,7 +4,7 @@ import * as types from '../constants/ActionTypes'
 export const login = data => dispatch => {
   const { username, password } = data
   if (username === 'happypeter' && password === '111111') {
-    history.push('/dashboard')
+    history.push('/dashboard/dishes/new')
     dispatch({ type: types.LOGIN_SUCCESS })
     return Promise.resolve('登录成功！')
   } else {
diff --git a/admin/src/components/Dashboard.js b/admin/src/components/Dashboard.js
index 30f8cae..d29586c 100644
--- a/admin/src/components/Dashboard.js
+++ b/admin/src/components/Dashboard.js
@@ -2,6 +2,7 @@ import React, { Component } from 'react'
 import LogoutContainer from '../containers/LogoutContainer'
 import NavContainer from '../containers/NavContainer'
 import styled from 'styled-components'
+import Routes from './DashboardRoutes'
 class Dashboard extends Component {
   render () {
@@ -18,6 +19,7 @@ class Dashboard extends Component {
         </Sider>
         <Content>
           <Header />
+          <Routes />
         </Content>
       </Wrap>
     )
diff --git a/admin/src/components/DashboardRoutes.js b/admin/src/components/DashboardRoutes.js
new file mode 100644
index 0000000..50de3f5
--- /dev/null
+++ b/admin/src/components/DashboardRoutes.js
@@ -0,0 +1,30 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+import DishesContainer from '../containers/DishesContainer'
+import NewDishContainer from '../containers/NewDishContainer'
+import OrdersContainer from '../containers/OrdersContainer'
+import {
+  Switch,
+  Route,
+  withRouter
+} from 'react-router'
+
+class DashboardRoutes extends Component {
+  render () {
+    const { match } = this.props
+    return (
+      <Wrap>
+        <Switch>
+          <Route exact path={`${match.url}/dishes`} component={DishesContainer} />
+          <Route path={`${match.url}/dishes/new`} component={NewDishContainer} />
+          <Route path={`${match.url}/orders`} component={OrdersContainer} />
+          <Route render={() => <div>对不起，404 了</div>} />
+        </Switch>
+      </Wrap>
+    )
+  }
+}
+
+export default withRouter(DashboardRoutes)
+
+const Wrap = styled.div``
diff --git a/admin/src/components/Dishes.js b/admin/src/components/Dishes.js
new file mode 100644
index 0000000..4feb0d2
--- /dev/null
+++ b/admin/src/components/Dishes.js
@@ -0,0 +1,16 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+class Dishes extends Component {
+  render () {
+    return (
+      <Wrap>
+        已有甜点
+      </Wrap>
+    )
+  }
+}
+
+export default Dishes
+
+const Wrap = styled.div``
diff --git a/admin/src/components/NewDish.js b/admin/src/components/NewDish.js
new file mode 100644
index 0000000..7ba84ac
--- /dev/null
+++ b/admin/src/components/NewDish.js
@@ -0,0 +1,16 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+class NewDish extends Component {
+  render () {
+    return (
+      <Wrap>
+        添加甜点
+      </Wrap>
+    )
+  }
+}
+
+export default NewDish
+
+const Wrap = styled.div``
diff --git a/admin/src/components/Orders.js b/admin/src/components/Orders.js
new file mode 100644
index 0000000..a45fccf
--- /dev/null
+++ b/admin/src/components/Orders.js
@@ -0,0 +1,16 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+class Orders extends Component {
+  render () {
+    return (
+      <Wrap>
+        订单
+      </Wrap>
+    )
+  }
+}
+
+export default Orders
+
+const Wrap = styled.div``
diff --git a/admin/src/containers/DishesContainer.js b/admin/src/containers/DishesContainer.js
new file mode 100644
index 0000000..b6056a3
--- /dev/null
+++ b/admin/src/containers/DishesContainer.js
@@ -0,0 +1,9 @@
+import React from 'react'
+import Dishes from '../components/Dishes'
+import { connect } from 'react-redux'
+
+const DishesContainer = props => <Dishes {...props} />
+
+const mapStateToProps = state => ({ })
+
+export default connect(mapStateToProps)(DishesContainer)
diff --git a/admin/src/containers/NewDishContainer.js b/admin/src/containers/NewDishContainer.js
new file mode 100644
index 0000000..8846d9b
--- /dev/null
+++ b/admin/src/containers/NewDishContainer.js
@@ -0,0 +1,9 @@
+import React from 'react'
+import NewDish from '../components/NewDish'
+import { connect } from 'react-redux'
+
+const NewDishContainer = props => <NewDish {...props} />
+
+const mapStateToProps = state => ({ })
+
+export default connect(mapStateToProps)(NewDishContainer)
diff --git a/admin/src/containers/OrdersContainer.js b/admin/src/containers/OrdersContainer.js
new file mode 100644
index 0000000..9eb330c
--- /dev/null
+++ b/admin/src/containers/OrdersContainer.js
@@ -0,0 +1,9 @@
+import React from 'react'
+import Orders from '../components/Orders'
+import { connect } from 'react-redux'
+
+const OrdersContainer = props => <Orders {...props} />
+
+const mapStateToProps = state => ({ })
+
+export default connect(mapStateToProps)(OrdersContainer)
```

这次一共改动了9个文件，不过不要担心，逻辑上比较简单。

Dashboard.js 中我想加路由进来，但是由于代码比较多，所以还是分拆到了 DashboardRoutes.js 文件中。

DashboardRoutes.js 中就是这部分的核心内容了，导入了三个暂时还不存在的容器组件进来，然后来写路由规则。比较显眼的通过使用 withRouter ，那么本组件中就能拿到 react-router 的 match 对象了。这里的 match.url 就是当这个组件显示的时候的页面 url ，而当前组件肯定是跟 Dashboard 组件一起显示的，所以 match.url 也就只有一种可能，就是 localhost:3000/dashbaord ，不过这里写成 match.url 还是有好处的，如果将来组件换个位置使用呢对吧？最后一条对应的是用户敲了一个我们这里没有的路由，我们给它一个404页面。注意这里没有定义对应 /dashboard 的路由规则。

所以如果在 authActions.js 中继续重定向到 /dashboard ，那显示的一定是 404 页面了，所以这里改成新建甜点页，也就是 /dashboard/dish/new 。

剩下的六个文件不用说了，就是这里主要的三条路由规则对应的容器和展示组件的文件。

看看达成的效果。页面上手动敲链接，例如 /dashboard/dishes 或者 /dashboard/dishes/new ，右侧主体部分是可以显示对应组件的。这就意味着页面本身都没问题了，就差在导航菜单中使用了。

### 使用导航菜单

所以来《使用导航菜单》。点菜单项的时候，让右侧主体内容部分能正确切换。

```diff
diff --git a/admin/src/actions/navActions.js b/admin/src/actions/navActions.js
new file mode 100644
index 0000000..945fb8c
--- /dev/null
+++ b/admin/src/actions/navActions.js
@@ -0,0 +1,6 @@
+import { history } from '../utils/routerUtils'
+
+export const selectItem = link => dispatch => {
+  console.log(link)
+  history.push(link)
+}
diff --git a/admin/src/components/Dashboard.js b/admin/src/components/Dashboard.js
index d29586c..e6b1ce8 100644
--- a/admin/src/components/Dashboard.js
+++ b/admin/src/components/Dashboard.js
@@ -19,7 +19,7 @@ class Dashboard extends Component {
         </Sider>
         <Content>
           <Header />
-          <Routes />
+          <Routes {...this.props} />
         </Content>
       </Wrap>
     )
diff --git a/admin/src/components/DashboardRoutes.js b/admin/src/components/DashboardRoutes.js
index 50de3f5..35e7d75 100644
--- a/admin/src/components/DashboardRoutes.js
+++ b/admin/src/components/DashboardRoutes.js
@@ -5,8 +5,7 @@ import NewDishContainer from '../containers/NewDishContainer'
 import OrdersContainer from '../containers/OrdersContainer'
 import {
   Switch,
-  Route,
-  withRouter
+  Route
 } from 'react-router'
 class DashboardRoutes extends Component {
@@ -25,6 +24,6 @@ class DashboardRoutes extends Component {
   }
 }
-export default withRouter(DashboardRoutes)
+export default DashboardRoutes
 const Wrap = styled.div``
diff --git a/admin/src/components/Nav.js b/admin/src/components/Nav.js
index 9970c12..16ec536 100644
--- a/admin/src/components/Nav.js
+++ b/admin/src/components/Nav.js
@@ -5,9 +5,11 @@ const SubMenu = Menu.SubMenu
 class Nav extends Component {
   render () {
+    const { selectItem } = this.props
     return (
       <Wrap>
         <Menu
+          onClick={e => selectItem(e.key)}
           style={{ borderRight: 'none' }}
           defaultOpenKeys={['dishes', 'orders']}
           selectedKeys={['/dashboard/dishes/new']}

diff --git a/admin/src/containers/NavContainer.js b/admin/src/containers/NavContainer.js
index 063f1ed..0e2df60 100644
--- a/admin/src/containers/NavContainer.js
+++ b/admin/src/containers/NavContainer.js
@@ -1,9 +1,12 @@
 import React from 'react'
 import Nav from '../components/Nav'
 import { connect } from 'react-redux'
+import { selectItem } from '../actions/navActions'
 const NavContainer = props => <Nav {...props} />
 const mapStateToProps = state => ({ })
-export default connect(mapStateToProps)(NavContainer)
+export default connect(mapStateToProps, {
+  selectItem
+})(NavContainer)
```

一共修改了五个文件。

到 Nav.js 中，看到其实核心思路也很简单，因为每个菜单项目在被 click 的时候，事件函数中都能得到这个菜单项目的 key ，而我们这里设置的 key 又恰好是要跳转的路径，所以直接发送到 action 创建器中。

新创建的 navActions.js 文件中，添加了一个 action 创建器 selectItem ，里面拿到链接，执行 history.push 就能执行跳转。

NavContainer 的作用就是把 setItem 传递给展示组件去使用。所以这部分的逻辑就是非常简单。剩下两个文件的修改是另外一个问题了。

Dashboard.js 看一下，我把 Dashboard 组件自己的所有 props 原封不动的传递给了 Routes 组件去使用，其中当然也包含 react-router 给它的 match 对象了。

所以 Routes 组件中，就没有必要使用 withRouter 了，删掉就好。

看看达成的效果。每次点菜单项，右侧会显示对应组件了。美中不足，菜单项的高亮不会随着变。

### 切换菜单项高亮

下一步就来《切换菜单项高亮》。

```diff
diff --git a/admin/src/actions/navActions.js b/admin/src/actions/navActions.js
index 945fb8c..8206f6a 100644
--- a/admin/src/actions/navActions.js
+++ b/admin/src/actions/navActions.js
@@ -1,6 +1,12 @@
 import { history } from '../utils/routerUtils'
+import * as types from '../constants/ActionTypes'
+
+const updateSelectedIndex = index => ({
+  type: types.UPDATE_SELECTED_INDEX,
+  index
+})
 export const selectItem = link => dispatch => {
-  console.log(link)
+  dispatch(updateSelectedIndex(link))
   history.push(link)
 }
diff --git a/admin/src/components/Nav.js b/admin/src/components/Nav.js
index 16ec536..0e0ea80 100644
--- a/admin/src/components/Nav.js
+++ b/admin/src/components/Nav.js
@@ -5,14 +5,14 @@ const SubMenu = Menu.SubMenu
 class Nav extends Component {
   render () {
-    const { selectItem } = this.props
+    const { selectItem, selectedIndex } = this.props
     return (
       <Wrap>
         <Menu
           onClick={e => selectItem(e.key)}
           style={{ borderRight: 'none' }}
           defaultOpenKeys={['dishes', 'orders']}
-          selectedKeys={['/dashboard/dishes/new']}
+          selectedKeys={[selectedIndex]}
           mode='inline'
         >
           <SubMenu key='orders' title={<span><Icon type='file' /><span>订单</span></span>}>
diff --git a/admin/src/constants/ActionTypes.js b/admin/src/constants/ActionTypes.js
index 11f7d02..b9fef70 100644
--- a/admin/src/constants/ActionTypes.js
+++ b/admin/src/constants/ActionTypes.js
@@ -1 +1,2 @@
 export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
+export const UPDATE_SELECTED_INDEX = 'UPDATE_SELECTED_INDEX'
diff --git a/admin/src/containers/NavContainer.js b/admin/src/containers/NavContainer.js
index 0e2df60..c74b281 100644
--- a/admin/src/containers/NavContainer.js
+++ b/admin/src/containers/NavContainer.js
@@ -5,7 +5,9 @@ import { selectItem } from '../actions/navActions'
 const NavContainer = props => <Nav {...props} />
-const mapStateToProps = state => ({ })
+const mapStateToProps = state => ({
+  selectedIndex: state.common.selectedIndex
+})
 export default connect(mapStateToProps, {
   selectItem
diff --git a/admin/src/reducers/common.js b/admin/src/reducers/common.js
index ce487c1..dd7d671 100644
--- a/admin/src/reducers/common.js
+++ b/admin/src/reducers/common.js
@@ -10,6 +10,16 @@ const isAuthenticated = (state = true, action) => {
   }
 }
+const selectedIndex = (state = '/dashboard/dishes', action) => {
+  switch (action.type) {
+    case types.UPDATE_SELECTED_INDEX:
+      return action.index
+    default:
+      return state
+  }
+}
+
 export default combineReducers({
-  isAuthenticated
+  isAuthenticated,
+  selectedIndex
 })
```

一共修改了五个文件。思路就是通过一个 redux 状态值来控制高亮位置，你会问为啥要这么麻烦不用导航栏自己的 state 值来搞定？答案就是未来其他组件中也需要触发高亮切换，所以为了后续不麻烦，现在咱们就麻烦一点。

ActionTypes.js 中定义一个新的 action 类型，UPDATE_SELECTED_INDEX ，什么时候来用呢？

navActions.js 中，每次 selectItem 被执行到，就会发出这个 action ，来更新被选中的项目信息，负载数据 index ，就是被点的这一项的链接。

common.js 中 reducer 代码所做的事情就是，把传递进来的 index 值，存储为状态数中的 selectedIndex 值。注意，这里是有一个初始值的 /dashboard/dishes 。

NavContainer.js 拿到这个值。

Nav.js 中用这个值来设置导航菜单组件的 selectedKeys ，也就是控制高亮的这个属性，于是 redux 中存储的这个状态值就在界面上体现出来了。


看看达成的效果。点每一个菜单项，随着右侧显示的切换，菜单项的高亮也会切换过来。能用不代表没 bug ，刷新一下页面试试？不灵了吧。如果在任意的一个页面上，刷新一下高亮的位置就会回到 redux 中设置的 selectedIndex 的初始值。


### 保证页面刷新时高亮正确

所以最后来《保证页面刷新时高亮正确》。思路是让页面刷新的时候，去用当前地址栏中的链接信息，更新一下 redux 中的 selectedIndex 。

```diff
diff --git a/admin/src/actions/navActions.js b/admin/src/actions/navActions.js
index 8206f6a..cc9dbcc 100644
--- a/admin/src/actions/navActions.js
+++ b/admin/src/actions/navActions.js
@@ -10,3 +10,7 @@ export const selectItem = link => dispatch => {
   dispatch(updateSelectedIndex(link))
   history.push(link)
 }
+
+export const loadSelectedIndex = () => dispatch => {
+  dispatch(updateSelectedIndex(history.location.pathname))
+}
diff --git a/admin/src/containers/App.js b/admin/src/containers/App.js
index bd3e461..58a994a 100644
--- a/admin/src/containers/App.js
+++ b/admin/src/containers/App.js
@@ -8,8 +8,13 @@ import {
   Switch,
   Route
 } from 'react-router'
+import { loadSelectedIndex } from '../actions/navActions'
 class App extends Component {
+  componentDidMount () {
+    this.props.loadSelectedIndex()
+  }
+
   render () {
     const { isAuthenticated } = this.props
     return (
@@ -27,4 +32,6 @@ const mapStateToProps = state => ({
   isAuthenticated: state.common.isAuthenticated
 })
-export default connect(mapStateToProps)(App)
+export default connect(mapStateToProps, {
+  loadSelectedIndex
+})(App)
```

一共改了两个文件。

App.js 中，页面一旦刷新，就触发执行 loadSelectedIndex 函数。

navActions.js 定义了这个函数，功能就是拿到地址栏中的当前链接，去更新 redux 中的 selectedIndex 状态值。

看看达成的效果。跳转到任意页面刷新，高亮保持正确。
