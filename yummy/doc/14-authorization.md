# 访问权限控制

欢迎来到新的一节《访问权限控制》。话题很大，这里只是实现一点，用户未登录，不能访问一些受保护页面的，会被直接重定向回到登录页，同时显示请登录字样，登录成功，能够自动跳转回被拒绝的那个页面。





```diff
diff --git a/client/src/actions/commonActions.js b/client/src/actions/commonActions.js
index a15ae8b..7cd01a3 100644
--- a/client/src/actions/commonActions.js
+++ b/client/src/actions/commonActions.js
@@ -8,6 +8,13 @@ export const alert = msg => ({
   type: types.ALERT, msg
 })
 
+export const showAlertIfNeeded = location => dispatch => {
+  console.log('location', location )
+  const referrer =  location.state && location.state.from.pathname
+  console.log('referrer....', referrer)
+  referrer && dispatch(alert('请先登录'))
+}
+
 export const hideAlert = () => dispatch => {
   dispatch({ type: types.HIDE_ALERT })
 }
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index 25439bd..f0ac250 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -3,13 +3,15 @@ import LoginContainer from '../containers/LoginContainer'
 import SignupContainer from '../containers/SignupContainer'
 import SidebarContainer from '../containers/SidebarContainer'
 import AlertBoxContainer from '../containers/AlertBoxContainer'
+import SettingsContainer from '../containers/SettingsContainer'
+import { PrivateRoute } from '../utils/routerUtils'
 import {
   Switch,
   Route
 } from 'react-router-dom'
 import styled from 'styled-components'
 
-const Layout = ({ title, showAlert }) => (
+const Layout = ({ title, showAlert, isAuthenticated }) => (
   <Wrap>
     <SidebarContainer />
     { showAlert && <AlertBoxContainer /> }
@@ -21,6 +23,7 @@ const Layout = ({ title, showAlert }) => (
         <Switch>
           <Route path='/signup' component={SignupContainer} />
           <Route path='/login' component={LoginContainer} />
+          <PrivateRoute isAuthenticated={isAuthenticated} path='/settings' component={SettingsContainer} />
         </Switch>
       </MainInner>
     </Main>
diff --git a/client/src/components/Login.js b/client/src/components/Login.js
index fd0de94..6d63a57 100644
--- a/client/src/components/Login.js
+++ b/client/src/components/Login.js
@@ -5,6 +5,7 @@ import Form from './Form'
 class Login extends Component {
   componentDidMount () {
     this.props.setTitle('登录')
+    this.props.showAlertIfNeeded(this.props.location)
   }
 
   render () {
diff --git a/client/src/components/Settings.js b/client/src/components/Settings.js
new file mode 100644
index 0000000..67dd3fd
--- /dev/null
+++ b/client/src/components/Settings.js
@@ -0,0 +1,13 @@
+import React, { Component } from 'react'
+
+class Settings extends Component {
+  render () {
+    return (
+      <div>
+        Settings
+      </div>
+    )
+  }
+}
+
+export default Settings
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index ffbd753..437d128 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -30,6 +30,7 @@ class Sidebar extends Component {
             <Link onClick={this.closeMenu} to="/login">登录</Link>
             <Link onClick={this.closeMenu} to="/signup">注册</Link>
             <Link onClick={this.closeMenu} to="/dishes">猜你喜欢</Link>
+            <Link onClick={this.closeMenu} to="/settings">个人设置</Link>
           </div>
           <div className="bottom-button">
             <button onClick={this.closeMenu} className ="bm-close-button" >关闭</button>
diff --git a/client/src/containers/LayoutContainer.js b/client/src/containers/LayoutContainer.js
index c4010ee..d1765b7 100644
--- a/client/src/containers/LayoutContainer.js
+++ b/client/src/containers/LayoutContainer.js
@@ -1,13 +1,15 @@
 import React from 'react'
 import Layout from '../components/Layout'
 import { getTitle, getShowAlert } from '../selectors/commonSelectors'
+import { getIsAuthenticated } from '../selectors/authSelectors'
 import { connect } from 'react-redux'
 
 const LayoutContainer = props => <Layout {...props} />
 
 const mapStateToProps = state => ({
   title: getTitle(state),
-  showAlert: getShowAlert(state)
+  showAlert: getShowAlert(state),
+  isAuthenticated: getIsAuthenticated(state)
 })
 
 export default connect(mapStateToProps)(LayoutContainer)
diff --git a/client/src/containers/LoginContainer.js b/client/src/containers/LoginContainer.js
index 78deadd..df4fecd 100644
--- a/client/src/containers/LoginContainer.js
+++ b/client/src/containers/LoginContainer.js
@@ -1,6 +1,6 @@
 import React from 'react'
 import Login from '../components/Login'
-import { setTitle } from '../actions/commonActions'
+import { setTitle, showAlertIfNeeded } from '../actions/commonActions'
 import { login } from '../actions/authActions'
 import { connect } from 'react-redux'
 
@@ -8,5 +8,6 @@ const LoginContainer = props => <Login {...props} />
 
 export default connect(null, {
   setTitle,
-  login
+  login,
+  showAlertIfNeeded
 })(LoginContainer)
diff --git a/client/src/containers/SettingsContainer.js b/client/src/containers/SettingsContainer.js
new file mode 100644
index 0000000..07732e0
--- /dev/null
+++ b/client/src/containers/SettingsContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import Settings from '../components/Settings'
+
+const SettingsContainer = props => <Settings {...props} />
+
+export default SettingsContainer
diff --git a/client/src/utils/routerUtils.js b/client/src/utils/routerUtils.js
index 96dc48a..5c93635 100644
--- a/client/src/utils/routerUtils.js
+++ b/client/src/utils/routerUtils.js
@@ -1,3 +1,25 @@
+import React from 'react'
+import {
+  Route,
+  Redirect
+} from 'react-router-dom'
 import createBrowserHistory from 'history/createBrowserHistory'
 
 export const history = createBrowserHistory()
+
+export const PrivateRoute = ({component: Component, isAuthenticated, ...rest }) =>
+{
+  console.log('PrivateRoute............')
+  return (
+    <Route { ...rest } render={(props) => {
+        if (isAuthenticated) {
+          return <Component />
+        } else {
+          return <Redirect to={{
+              pathname: '/login',
+              state: { from: props.location }
+            }} />
+        }
+      }} />
+  )
+}
```

看看本部分达成的效果。访问一个受保护的页面 /settings ，用户会被重定向到登录页面，并显示请先登录字样。



```diff
diff --git a/client/src/actions/authActions.js b/client/src/actions/authActions.js
index f1772c0..5250689 100644
--- a/client/src/actions/authActions.js
+++ b/client/src/actions/authActions.js
@@ -6,6 +6,7 @@ import {
 } from '../constants/ApiContants'
 import * as types from '../constants/ActionTypes'
 import { alert } from './commonActions'
+import { getReferrer } from '../selectors/commonSelectors'
 import { history } from '../utils/routerUtils'
 
 export const signup = data => dispatch => {
@@ -21,12 +22,20 @@ export const signup = data => dispatch => {
   })
 }
 
+const clearReferrer = () => ({
+  type: 'CLEAR_REFERRER'
+})
+
+
 export const login = data => {
-  return dispatch => {
+  return (dispatch, getState) => {
     axios.post(LOGIN_URL, data).then(res => {
       dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
       window.localStorage.setItem('userId', res.data.user._id)
-      history.push('/dashboard')
+      const referrer = getReferrer(getState())
+      dispatch(clearReferrer())
+      const redirectTo = referrer || '/dashboard'
+      history.push(redirectTo)
     }).catch(
       err => {
         if (err.response) {
diff --git a/client/src/actions/commonActions.js b/client/src/actions/commonActions.js
index 7cd01a3..925fccf 100644
--- a/client/src/actions/commonActions.js
+++ b/client/src/actions/commonActions.js
@@ -8,11 +8,10 @@ export const alert = msg => ({
   type: types.ALERT, msg
 })
 
-export const showAlertIfNeeded = location => dispatch => {
-  console.log('location', location )
+
+export const setReferrerIfNeeded = location => dispatch => {
   const referrer =  location.state && location.state.from.pathname
-  console.log('referrer....', referrer)
-  referrer && dispatch(alert('请先登录'))
+  referrer && dispatch({ type: types.SET_REFERRER, referrer }) && dispatch(alert('请先登录'))
 }
 
 export const hideAlert = () => dispatch => {
diff --git a/client/src/components/Cart.js b/client/src/components/Cart.js
new file mode 100644
index 0000000..90eb845
--- /dev/null
+++ b/client/src/components/Cart.js
@@ -0,0 +1,13 @@
+import React, { Component } from 'react'
+
+class Cart extends Component {
+  render () {
+    return (
+      <div>
+        Cart
+      </div>
+    )
+  }
+}
+
+export default Cart
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index f0ac250..f30839e 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -4,6 +4,7 @@ import SignupContainer from '../containers/SignupContainer'
 import SidebarContainer from '../containers/SidebarContainer'
 import AlertBoxContainer from '../containers/AlertBoxContainer'
 import SettingsContainer from '../containers/SettingsContainer'
+import CartContainer from '../containers/CartContainer'
 import { PrivateRoute } from '../utils/routerUtils'
 import {
   Switch,
@@ -24,6 +25,7 @@ const Layout = ({ title, showAlert, isAuthenticated }) => (
           <Route path='/signup' component={SignupContainer} />
           <Route path='/login' component={LoginContainer} />
           <PrivateRoute isAuthenticated={isAuthenticated} path='/settings' component={SettingsContainer} />
+          <PrivateRoute isAuthenticated={isAuthenticated} path='/cart' component={CartContainer} />
         </Switch>
       </MainInner>
     </Main>
diff --git a/client/src/components/Login.js b/client/src/components/Login.js
index 6d63a57..8ae5157 100644
--- a/client/src/components/Login.js
+++ b/client/src/components/Login.js
@@ -5,7 +5,7 @@ import Form from './Form'
 class Login extends Component {
   componentDidMount () {
     this.props.setTitle('登录')
-    this.props.showAlertIfNeeded(this.props.location)
+    this.props.setReferrerIfNeeded(this.props.location)
   }
 
   render () {
diff --git a/client/src/components/Sidebar.js b/client/src/components/Sidebar.js
index 437d128..a4f10ac 100644
--- a/client/src/components/Sidebar.js
+++ b/client/src/components/Sidebar.js
@@ -31,6 +31,7 @@ class Sidebar extends Component {
             <Link onClick={this.closeMenu} to="/signup">注册</Link>
             <Link onClick={this.closeMenu} to="/dishes">猜你喜欢</Link>
             <Link onClick={this.closeMenu} to="/settings">个人设置</Link>
+            <Link onClick={this.closeMenu} to="/cart">购物车</Link>
           </div>
           <div className="bottom-button">
             <button onClick={this.closeMenu} className ="bm-close-button" >关闭</button>
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index 288b65b..aa5b4f7 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -2,6 +2,8 @@
 export const SET_TITLE = 'SET_TITLE'
 export const ALERT = 'ALERT'
 export const HIDE_ALERT = 'HIDE_ALERT'
+export const SET_REFERRER = 'SET_REFERRER'
+export const CLEAR_REFERRER = 'CLEAR_REFERRER'
 
 // auth
 export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
diff --git a/client/src/containers/CartContainer.js b/client/src/containers/CartContainer.js
new file mode 100644
index 0000000..0c5a796
--- /dev/null
+++ b/client/src/containers/CartContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import Cart from '../components/Cart'
+
+const CartContainer = props => <Cart {...props} />
+
+export default CartContainer
diff --git a/client/src/containers/LoginContainer.js b/client/src/containers/LoginContainer.js
index df4fecd..8fa7418 100644
--- a/client/src/containers/LoginContainer.js
+++ b/client/src/containers/LoginContainer.js
@@ -1,6 +1,6 @@
 import React from 'react'
 import Login from '../components/Login'
-import { setTitle, showAlertIfNeeded } from '../actions/commonActions'
+import { setTitle, setReferrerIfNeeded } from '../actions/commonActions'
 import { login } from '../actions/authActions'
 import { connect } from 'react-redux'
 
@@ -9,5 +9,5 @@ const LoginContainer = props => <Login {...props} />
 export default connect(null, {
   setTitle,
   login,
-  showAlertIfNeeded
+  setReferrerIfNeeded
 })(LoginContainer)
diff --git a/client/src/reducers/common.js b/client/src/reducers/common.js
index 6a83a1f..407cbd9 100644
--- a/client/src/reducers/common.js
+++ b/client/src/reducers/common.js
@@ -26,7 +26,19 @@ const alert = (state = initAlert, action) => {
   }
 }
 
+const referrer = (state='', action) => {
+  switch (action.type) {
+    case types.SET_REFERRER:
+      return action.referrer
+    case types.CLEAR_REFERRER:
+      return ''
+    default:
+      return state
+  }
+}
+
 export default combineReducers({
   title,
-  alert
+  alert,
+  referrer
 })
diff --git a/client/src/selectors/commonSelectors.js b/client/src/selectors/commonSelectors.js
index b76e61e..f7fac9f 100644
--- a/client/src/selectors/commonSelectors.js
+++ b/client/src/selectors/commonSelectors.js
@@ -1,3 +1,4 @@
 export const getTitle = state => state.common.title
 export const getShowAlert = state => state.common.alert.show
 export const getAlertMsg = state => state.common.alert.msg
+export const getReferrer = state => state.common.referrer
```

看看本部分达成的效果。未登录条件下分别访问 /settings 和 /cart 这两个受保护页面，会被重定向到登录页，登录成功后应用可以把用户带回先前被拒绝访问的页面。