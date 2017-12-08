# 添加商品到购物车

欢迎来到新的一节《添加商品到购物车》。达成的效果是，用户点购买甜点按钮，右下方的购物数量就会加一。

### 添加购物车图标

进入下一部分《添加购物车图标》。

因为在各个页面都有可能要显示购物车图标所以把它放到布局组件中。


```diff
diff --git a/client/src/assets/cartIcon.svg b/client/src/assets/cartIcon.svg
new file mode 100644
index 0000000..1c0e063
--- /dev/null
+++ b/client/src/assets/cartIcon.svg
@@ -0,0 +1,14 @@
+<svg width="19px"  height="19px" viewBox="0 0 19 19" version="1.1"
+   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
+
+    <defs></defs>
+    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
+        <g id="/dish/berry-pie" transform="translate(-319.000000, -619.000000)" fill-rule="nonzero" fill="#F86E67">
+            <g id="cart-button" transform="translate(304.000000, 604.000000)">
+                <g id="shopping-cart" transform="translate(15.000000, 15.000000)">
+                    <path d="M19.006,2.97 C18.815,2.751 18.54,2.625 18.25,2.625 L4.431,2.625 L4.236,1.461 C4.156,0.979 3.739,0.625 3.25,0.625 L1,0.625 C0.447,0.625 0,1.072 0,1.625 C0,2.178 0.447,2.625 1,2.625 L2.403,2.625 L4.263,13.789 C4.271,13.834 4.294,13.871 4.308,13.913 C4.324,13.966 4.337,14.016 4.362,14.064 C4.394,14.13 4.437,14.186 4.482,14.243 C4.513,14.282 4.541,14.321 4.577,14.355 C4.635,14.409 4.702,14.447 4.77,14.485 C4.808,14.506 4.841,14.534 4.882,14.55 C4.998,14.597 5.12,14.625 5.249,14.625 C5.25,14.625 16.25,14.625 16.25,14.625 C16.803,14.625 17.25,14.178 17.25,13.625 C17.25,13.072 16.803,12.625 16.25,12.625 L6.097,12.625 L5.931,11.625 L17.25,11.625 C17.748,11.625 18.17,11.259 18.24,10.767 L19.24,3.767 C19.281,3.479 19.195,3.188 19.006,2.97 Z M17.097,4.625 L16.812,6.625 L13.25,6.625 L13.25,4.625 L17.097,4.625 Z M12.25,4.625 L12.25,6.625 L9.25,6.625 L9.25,4.625 L12.25,4.625 Z M12.25,7.625 L12.25,9.625 L9.25,9.625 L9.25,7.625 L12.25,7.625 Z M8.25,4.625 L8.25,6.625 L5.25,6.625 C5.197,6.625 5.149,6.64 5.102,6.655 L4.764,4.625 L8.25,4.625 Z M5.264,7.625 L8.25,7.625 L8.25,9.625 L5.597,9.625 L5.264,7.625 Z M13.25,9.625 L13.25,7.625 L16.668,7.625 L16.383,9.625 L13.25,9.625 Z M6.75,18.625 C5.92157288,18.625 5.25,17.9534271 5.25,17.125 C5.25,16.2965729 5.92157288,15.625 6.75,15.625 C7.57842712,15.625 8.25,16.2965729 8.25,17.125 C8.25,17.9534271 7.57842712,18.625 6.75,18.625 Z M15.75,18.625 C14.9215729,18.625 14.25,17.9534271 14.25,17.125 C14.25,16.2965729 14.9215729,15.625 15.75,15.625 C16.5784271,15.625 17.25,16.2965729 17.25,17.125 C17.25,17.9534271 16.5784271,18.625 15.75,18.625 Z" id="Shape"></path>
+                </g>
+            </g>
+        </g>
+    </g>
+</svg>
diff --git a/client/src/components/CartButton.js b/client/src/components/CartButton.js
new file mode 100644
index 0000000..55ea456
--- /dev/null
+++ b/client/src/components/CartButton.js
@@ -0,0 +1,54 @@
+import React, { Component } from 'react'
+import cartIcon from '../assets/cartIcon.svg'
+import {
+  Link
+} from 'react-router-dom'
+import styled from 'styled-components'
+
+
+class CartButton extends Component {
+  render() {
+    const cartCount = 2
+    return (
+      <Wrap to='/cart' >
+        <No>
+          {cartCount}
+        </No>
+        <img src={cartIcon} alt="icon" />
+      </Wrap>
+    )
+  }
+}
+
+export default CartButton
+
+const Wrap = styled(Link) `
+  z-index: 1000;
+  background-color: white;
+  border-radius: 50%;
+  box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
+  width: 50px;
+  height: 50px;
+  padding: 15px;
+  position: fixed;
+  bottom: 20px;
+  right: 10px;
+  img {
+    display: block;
+    width: 20px;
+    height: 20px
+  }
+`
+
+const No = styled.div`
+  position: absolute;
+  top: 0;
+  right: 0;
+  width: 17px;
+  height: 17px;
+  border-radius: 50%;
+  background: #212121;
+  text-align: center;
+  line-height: 17px;
+  color: white;
+`
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index c72ccd1..4e96658 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -4,6 +4,7 @@ import SignupContainer from '../containers/SignupContainer'
 import AlertBoxContainer from '../containers/AlertBoxContainer'
 import SidebarContainer from '../containers/SidebarContainer'
 import DishesContainer from '../containers/DishesContainer'
+import CartButtonContainer from '../containers/CartButtonContainer'
 import SettingsContainer from '../containers/SettingsContainer'
 import { PrivateRoute } from '../utils/routerUtils'
 import UserContainer from '../containers/UserContainer'
@@ -18,6 +19,7 @@ import DishContainer from '../containers/DishContainer'
 const Layout = ({ title, showAlert, isAuthenticated }) => (
   <Wrap>
     { showAlert && <AlertBoxContainer /> }
+    <CartButtonContainer />
     <SidebarContainer />
     <Header>
       {title}
diff --git a/client/src/containers/CartButtonContainer.js b/client/src/containers/CartButtonContainer.js
new file mode 100644
index 0000000..78f886e
--- /dev/null
+++ b/client/src/containers/CartButtonContainer.js
@@ -0,0 +1,11 @@
+import React from 'react'
+import CartButton from '../components/CartButton'
+import { connect } from 'react-redux'
+
+const CartButtonContainer = props => <CartButton {...props} />
+
+const mapStateToProps = state => ({
+
+})
+
+export default connect(mapStateToProps)(CartButtonContainer)
```

一个小圆形按钮，点一下可以到购物车页面。

看看本部分达成的效果。
至此，《添加购物车图标》这部分就胜利完成了。

### 构建购物车数据

进入下一部分《构建购物车数据》。

先从购买按钮开始做。


```diff
diff --git a/client/src/actions/cartActions.js b/client/src/actions/cartActions.js
new file mode 100644
index 0000000..3640f5c
--- /dev/null
+++ b/client/src/actions/cartActions.js
@@ -0,0 +1,5 @@
+import * as types from '../constants/ActionTypes'
+
+export const addToCart = dishId => dispatch => {
+  dispatch({ type: types.ADD_TO_CART, dishId })
+}
diff --git a/client/src/components/DishBuyArea.js b/client/src/components/DishBuyArea.js
index 670ab8c..87c8bb2 100644
--- a/client/src/components/DishBuyArea.js
+++ b/client/src/components/DishBuyArea.js
@@ -5,7 +5,7 @@ import styled from 'styled-components'
 class DishBuyArea extends Component {
   render () {
-    const { dishesById, match } = this.props
+    const { dishesById, match, addToCart } = this.props
     const { id } = match.params
     const dish = dishesById[id] || {}
     return (
@@ -16,7 +16,7 @@ class DishBuyArea extends Component {
         <Price>
           {dish.price}元
         </Price>
-        <Icon>
+        <Icon onClick={() => addToCart(id)}>
           <DishBuyIcon color={GRAY} />
         </Icon>
         <Desc>
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index 5860dfd..40026bf 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -20,3 +20,5 @@ export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
 export const SUBMIT_COMMENT_SUCCESS = 'SUBMIT_COMMENT_SUCCESS'
 export const UPDATE_USER = 'UPDATE_USER'
+
+export const ADD_TO_CART = 'ADD_TO_CART'
diff --git a/client/src/containers/DishBuyAreaContainer.js b/client/src/containers/DishBuyAreaContainer.js
index e0f5f5f..5100366 100644
--- a/client/src/containers/DishBuyAreaContainer.js
+++ b/client/src/containers/DishBuyAreaContainer.js
@@ -3,6 +3,7 @@ import DishBuyArea from '../components/DishBuyArea'
 import { connect } from 'react-redux'
 import { withRouter } from 'react-router-dom'
 import { getDishesById } from '../selectors/dishSelectors'
+import { addToCart } from '../actions/cartActions'
 const DishBuyAreaContainer = props => <DishBuyArea {...props} />
@@ -10,4 +11,6 @@ const mapStateToProps = (state) => ({
   dishesById: getDishesById(state)
 })
-export default connect(mapStateToProps)(withRouter(DishBuyAreaContainer))
+export default connect(mapStateToProps, {
+  addToCart
+})(withRouter(DishBuyAreaContainer))
```

甜点展示页面，点购买按钮，可以执行 addToCart action 负载数据是当前甜点的 id 。

下面来实现 reducer 。


```diff
diff --git a/client/src/reducers/cart.js b/client/src/reducers/cart.js
new file mode 100644
index 0000000..5c9d65d
--- /dev/null
+++ b/client/src/reducers/cart.js
@@ -0,0 +1,18 @@
+import * as types from '../constants/ActionTypes'
+import { combineReducers } from 'redux';
+
+const addedIds = (state = [], action) => {
+  switch (action.type) {
+    case types.ADD_TO_CART:
+      return state.indexOf(action.dishId) === -1
+        ? [...state, action.dishId]
+        : state
+    default:
+      return state
+  }
+}
+
+
+export default combineReducers({
+  addedIds
+})
diff --git a/client/src/reducers/index.js b/client/src/reducers/index.js
index c2d3ec1..ebb38dd 100644
--- a/client/src/reducers/index.js
+++ b/client/src/reducers/index.js
@@ -4,13 +4,15 @@ import auth from './auth'
 import user from './user'
 import dish from './dish'
 import comment from './comment'
+import cart from './cart'
 const rootReducer = combineReducers({
   common,
   auth,
   user,
   dish,
-  comment
+  comment,
+  cart
 })
 export default rootReducer
```



添加了 cart.addedIds 字段，用来记录到底哪个甜点被添加进购物车了。

看看本部分达成的效果。用户点一个甜品的购买按钮，甜品 id 会被添加到状态树的 cart.addedIds 字段中了。

至此，《构建购物车数据》这部分就胜利完成了。

### 读取购物车数据

进入下一部分《读取购物车数据》。暂时判断三个事情，第一，购物车是否为空，第二，购物车中甜点数量，第三，一个甜点我们有没有已经甜点到购物车了。

先来判断购物车是否为空。


```diff
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index 4e96658..41bcccd 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -16,10 +16,10 @@ import {
 import styled from 'styled-components'
 import DishContainer from '../containers/DishContainer'
-const Layout = ({ title, showAlert, isAuthenticated }) => (
+const Layout = ({ title, showAlert, isAuthenticated, isCartEmpty }) => (
   <Wrap>
     { showAlert && <AlertBoxContainer /> }
-    <CartButtonContainer />
+    {!isCartEmpty && <CartButtonContainer />}
     <SidebarContainer />
     <Header>
       {title}
diff --git a/client/src/containers/LayoutContainer.js b/client/src/containers/LayoutContainer.js
index d1765b7..9cfd5ed 100644
--- a/client/src/containers/LayoutContainer.js
+++ b/client/src/containers/LayoutContainer.js
@@ -2,6 +2,7 @@ import React from 'react'
 import Layout from '../components/Layout'
 import { getTitle, getShowAlert } from '../selectors/commonSelectors'
 import { getIsAuthenticated } from '../selectors/authSelectors'
+import { getIsCartEmpty } from '../selectors/cartSelectors'
 import { connect } from 'react-redux'
 const LayoutContainer = props => <Layout {...props} />
@@ -9,7 +10,8 @@ const LayoutContainer = props => <Layout {...props} />
 const mapStateToProps = state => ({
   title: getTitle(state),
   showAlert: getShowAlert(state),
-  isAuthenticated: getIsAuthenticated(state)
+  isAuthenticated: getIsAuthenticated(state),
+  isCartEmpty: getIsCartEmpty(state)
 })
 export default connect(mapStateToProps)(LayoutContainer)
diff --git a/client/src/selectors/cartSelectors.js b/client/src/selectors/cartSelectors.js
new file mode 100644
index 0000000..879ef0c
--- /dev/null
+++ b/client/src/selectors/cartSelectors.js
@@ -0,0 +1,8 @@
+import { createSelector } from 'reselect'
+
+export const getAddedIds = state => state.cart.addedIds
+
+export const getIsCartEmpty = createSelector(
+  getAddedIds,
+  addedIds => addedIds.length === 0
+)
```

主要是定义一个 iscartempty 选择器，然后容器组件取值，展示组件使用即可。

再来判断甜点数量。


```diff
diff --git a/client/src/components/CartButton.js b/client/src/components/CartButton.js
index 5d4e0a3..cea4bf0 100644
--- a/client/src/components/CartButton.js
+++ b/client/src/components/CartButton.js
@@ -7,7 +7,7 @@ import styled from 'styled-components'
 class CartButton extends Component {
   render () {
-    const cartCount = 2
+    const { cartCount } = this.props
     return (
       <Wrap to='/cart' >
         <No>
diff --git a/client/src/containers/CartButtonContainer.js b/client/src/containers/CartButtonContainer.js
index 78f886e..df97eac 100644
--- a/client/src/containers/CartButtonContainer.js
+++ b/client/src/containers/CartButtonContainer.js
@@ -1,11 +1,12 @@
 import React from 'react'
 import CartButton from '../components/CartButton'
 import { connect } from 'react-redux'
+import { getCartCount } from '../selectors/cartSelectors'
 const CartButtonContainer = props => <CartButton {...props} />
 const mapStateToProps = state => ({
-
+  cartCount: getCartCount(state)
 })
 export default connect(mapStateToProps)(CartButtonContainer)
diff --git a/client/src/selectors/cartSelectors.js b/client/src/selectors/cartSelectors.js
index 879ef0c..d01263f 100644
--- a/client/src/selectors/cartSelectors.js
+++ b/client/src/selectors/cartSelectors.js
@@ -6,3 +6,8 @@ export const getIsCartEmpty = createSelector(
   getAddedIds,
   addedIds => addedIds.length === 0
 )
+
+export const getCartCount = createSelector(
+  getAddedIds,
+  addedIds => addedIds.length
+)
```

定义 cartcount 选择器，让 cartButton 的容器组件可以拿到购物车中具体的商品数量，然后让展示组件显示这个数量。

最后，判断一个甜点有没有已经添加到购物车。


```diff
diff --git a/client/src/components/DishBuyArea.js b/client/src/components/DishBuyArea.js
index 87c8bb2..9bf865a 100644
--- a/client/src/components/DishBuyArea.js
+++ b/client/src/components/DishBuyArea.js
@@ -1,13 +1,14 @@
 import React, { Component } from 'react'
 import DishBuyIcon from './DishBuyIcon'
-import { GRAY } from '../constants/Colors'
+import { BRAND_PINK, GRAY } from '../constants/Colors'
 import styled from 'styled-components'
 class DishBuyArea extends Component {
   render () {
-    const { dishesById, match, addToCart } = this.props
+    const { dishesById, match, addToCart, cartAddedIds } = this.props
     const { id } = match.params
     const dish = dishesById[id] || {}
+    const isInCart = cartAddedIds.includes(id)
     return (
       <Wrap>
         <Name>
@@ -17,7 +18,7 @@ class DishBuyArea extends Component {
           {dish.price}元
         </Price>
         <Icon onClick={() => addToCart(id)}>
-          <DishBuyIcon color={GRAY} />
+          <DishBuyIcon color={isInCart ? BRAND_PINK : GRAY} />
         </Icon>
         <Desc>
           {dish.desc}
diff --git a/client/src/containers/DishBuyAreaContainer.js b/client/src/containers/DishBuyAreaContainer.js
index 5100366..0ac0d40 100644
--- a/client/src/containers/DishBuyAreaContainer.js
+++ b/client/src/containers/DishBuyAreaContainer.js
@@ -3,12 +3,14 @@ import DishBuyArea from '../components/DishBuyArea'
 import { connect } from 'react-redux'
 import { withRouter } from 'react-router-dom'
 import { getDishesById } from '../selectors/dishSelectors'
+import { getAddedIds } from '../selectors/cartSelectors'
 import { addToCart } from '../actions/cartActions'
 const DishBuyAreaContainer = props => <DishBuyArea {...props} />
 const mapStateToProps = (state) => ({
-  dishesById: getDishesById(state)
+  dishesById: getDishesById(state),
+  cartAddedIds: getAddedIds(state)
 })
 export default connect(mapStateToProps, {
```

容器组件中拿到已经添加到购物车的所有甜点 id ，展示组件中判断一下当前 id 是否已经在购物车中，从而决定购物按钮是要显示成灰色还是红色。

看看本部分达成的效果。默认情况下，购物车图标隐藏，购买第一件甜点，购物车图标出现，同时购买按钮变红，购买第二件商品，购物数量可以变为2。
至此，《读取购物车数据》这部分就胜利完成了。

### 结语

进入最后一部分《结语》。

复盘一下本节思路。首先添加了购物车图标，然后点购买按钮时会触发添加购物车相关的 action 和 reducer，保存到 redux 中的依然是最简数据，只保存了甜点 id ，后面实现界面效果的时候需要回答的多个问题，都是最简数据的派生数据，这些都是通过选择器获得的。

至此，《添加商品到购物车》就胜利完成了。
