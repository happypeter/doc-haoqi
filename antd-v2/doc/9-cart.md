# 实现购物车各项功能

欢迎来到新的一节《实现购物车各项功能》。购物车页面的主要功能有，显示商品海报和价格，修改单品数量，显示总价格，结账这些功能。

### 显示商品海报和价格

进入下一部分《显示商品海报和价格》。购物车页面会有的商品列表，每一个商品会显示海报和价格。

先做界面。


```diff
diff --git a/client/src/components/Cart.js b/client/src/components/Cart.js
new file mode 100644
index 0000000..86db2a8
--- /dev/null
+++ b/client/src/components/Cart.js
@@ -0,0 +1,16 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+class Cart extends Component {
+  render() {
+    return (
+      <Wrap>
+        Cart
+      </Wrap>
+    )
+  }
+}
+
+export default Cart
+
+const Wrap = styled.div``
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index 41bcccd..5b26e91 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -15,6 +15,7 @@ import {
 } from 'react-router-dom'
 import styled from 'styled-components'
 import DishContainer from '../containers/DishContainer'
+import CartContainer from '../containers/CartContainer'
 const Layout = ({ title, showAlert, isAuthenticated, isCartEmpty }) => (
   <Wrap>
@@ -33,6 +34,7 @@ const Layout = ({ title, showAlert, isAuthenticated, isCartEmpty }) => (
           <Route path='/dish/:id' component={DishContainer} />
           <Route path='/user/:id' component={UserContainer} />
           <Route path='/dashboard' component={DashboardContainer} />
+          <PrivateRoute isAuthenticated={isAuthenticated} path="/cart" component={CartContainer} />
           <PrivateRoute isAuthenticated={isAuthenticated} path='/settings' component={SettingsContainer} />
         </Switch>
       </MainInner>
diff --git a/client/src/containers/CartContainer.js b/client/src/containers/CartContainer.js
new file mode 100644
index 0000000..a15fdfa
--- /dev/null
+++ b/client/src/containers/CartContainer.js
@@ -0,0 +1,9 @@
+import React from 'react'
+import Cart from '../components/Cart'
+import { connect } from 'react-redux'
+
+const CartContainer = props => <Cart {...props} />
+
+const mapStateToProps = state => ({ })
+
+export default connect(mapStateToProps)(CartContainer)
```


```diff
diff --git a/client/src/components/Cart.js b/client/src/components/Cart.js
index 86db2a8..9428a63 100644
--- a/client/src/components/Cart.js
+++ b/client/src/components/Cart.js
@@ -1,11 +1,43 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
+import CartItem from './CartItem'
 class Cart extends Component {
-  render() {
+  render () {
+    const dishes = [
+      {
+        '_id': '5a26738e8ed6687f81859d24',
+        'name': '提拉米苏',
+        'price': 23,
+        'poster': 'tlms.png',
+        'desc': '非常好吃'
+      },
+      {
+        '_id': '5a2683d98ed6687f81859d25',
+        'name': '黑森林',
+        'price': 12,
+        'poster': 'hsl.png',
+        'desc': '非常好吃'
+      }
+    ]
+    let itemList = dishes.map(dish =>
+      <CartItem key={dish._id} dish={dish} />
+    )
     return (
       <Wrap>
-        Cart
+        <Hero>
+          <h1>
+            200 元
+          </h1>
+        </Hero>
+        <ListWrap>
+          <ItemList>
+            {itemList}
+          </ItemList>
+          <CheckoutButton>
+            结算
+          </CheckoutButton>
+        </ListWrap>
       </Wrap>
     )
   }
@@ -13,4 +45,44 @@ class Cart extends Component {
 export default Cart
-const Wrap = styled.div``
+const Wrap = styled.div`
+  display: flex;
+  flex-direction: column;
+  height: 100%;
+`
+
+const Hero = styled.div`
+  height: 230px;
+  padding-top: 50px;
+  h1 {
+    text-align: center;
+    color: white;
+  }
+`
+
+const ListWrap = styled.div`
+  background-color: #fff;
+  flex-grow: 1;
+  display: flex;
+  flex-direction: column;
+  padding: 10px;
+  justify-content: space-between;
+`
+
+const ItemList = styled.div`
+  background-color: #fff;
+  margin-top: -40px;
+  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
+  overflow: auto;
+  height: 40vh;
+`
+
+const CheckoutButton = styled.div`
+  background-image: linear-gradient(-45deg, #F77062 0%, #FE5196 100%);
+  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.20);
+  border-radius: 2px;
+  font-size: 14px;
+  line-height: 56px;
+  text-align: center;
+  color: #FFFFFF;
+`
diff --git a/client/src/components/CartItem.js b/client/src/components/CartItem.js
new file mode 100644
index 0000000..89c76b5
--- /dev/null
+++ b/client/src/components/CartItem.js
@@ -0,0 +1,112 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+import { posterUrl } from '../constants/ApiConstants'
+
+class CartItem extends Component {
+  render () {
+    const { name, poster, price } = this.props.dish
+    return (
+      <Wrap>
+        <Info>
+          <Poster poster={poster} />
+          <NamePriceWrap>
+            <Name>
+              {name}
+            </Name>
+            <Price>
+              {price}
+            </Price>
+          </NamePriceWrap>
+        </Info>
+        <CartAction>
+          <Minus>
+            -
+          </Minus>
+          <ItemCount>
+            1
+          </ItemCount>
+          <Plus>
+            +
+          </Plus>
+        </CartAction>
+      </Wrap>
+    )
+  }
+}
+
+export default CartItem
+
+const Wrap = styled.div`
+  border-bottom: 1px solid  #E3E9EC;
+  display: flex;
+  padding: 10px;
+  justify-content: space-between;
+`
+
+const Poster = styled.div`
+  width: 50px;
+  height: 50px;
+  background-size: 70px;
+  background-position: center center;
+  background-repeat: no-repeat;
+  position: relative;
+  background-image: ${props => `url(${posterUrl(props.poster)})`};
+  &:after {
+    background-image: linear-gradient(-45deg, #F77062 0%, #FE5196 100%);
+    opacity: 0.6;
+    content: "";
+    position: absolute;
+    top: 0;
+    left: 0;
+    right: 0;
+    bottom: 0;
+  }
+`
+
+const Info = styled.div`
+  display: flex;
+`
+
+const NamePriceWrap = styled.div`
+  margin-left: 10px;
+  padding-top: 5px;
+`
+
+const Name = styled.div`
+  font-size: 16px;
+  color: #F77062;
+`
+
+const Price = styled.div`
+  font-size: 12px;
+  color: #878787;
+`
+
+const CartAction = styled.div`
+  display: flex;
+  line-height: 30px;
+  padding-top: 10px;
+`
+
+const ItemCount = styled.div`
+  width: 30px;
+  height: 30px;
+  border-radius: 50%;
+  text-align: center;
+  color: white;
+  line-height: 30px;
+  background-color: #fff;
+  margin: 0px 15px;
+  background-image: linear-gradient(-45deg, #F77062 0%, #FE5196 100%);
+  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.20);
+`
+
+const Plus = styled.div`
+  color: #D0D0D0;
+  font-size: 19px;
+`
+
+const Minus = styled.div`
+  color: #D0D0D0;
+  font-size: 19px;
+`
```

把购物车页面的样式都添加了，弄了一下临时数据。

下一步来获取真实的购物车数据。


```diff
diff --git a/client/src/components/Cart.js b/client/src/components/Cart.js
index 9428a63..a351e99 100644
--- a/client/src/components/Cart.js
+++ b/client/src/components/Cart.js
@@ -4,23 +4,8 @@ import CartItem from './CartItem'
 class Cart extends Component {
   render () {
-    const dishes = [
-      {
-        '_id': '5a26738e8ed6687f81859d24',
-        'name': '提拉米苏',
-        'price': 23,
-        'poster': 'tlms.png',
-        'desc': '非常好吃'
-      },
-      {
-        '_id': '5a2683d98ed6687f81859d25',
-        'name': '黑森林',
-        'price': 12,
-        'poster': 'hsl.png',
-        'desc': '非常好吃'
-      }
-    ]
-    let itemList = dishes.map(dish =>
+    const { cartDishes } = this.props
+    let itemList = cartDishes.map(dish =>
       <CartItem key={dish._id} dish={dish} />
     )
     return (
diff --git a/client/src/containers/CartContainer.js b/client/src/containers/CartContainer.js
index a15fdfa..bf41c6f 100644
--- a/client/src/containers/CartContainer.js
+++ b/client/src/containers/CartContainer.js
@@ -1,9 +1,12 @@
 import React from 'react'
 import Cart from '../components/Cart'
 import { connect } from 'react-redux'
+import { getCartDishes } from '../selectors/cartSelectors'
 const CartContainer = props => <Cart {...props} />
-const mapStateToProps = state => ({ })
+const mapStateToProps = state => ({
+  cartDishes: getCartDishes(state)
+})
 export default connect(mapStateToProps)(CartContainer)
diff --git a/client/src/selectors/cartSelectors.js b/client/src/selectors/cartSelectors.js
index d01263f..b44de85 100644
--- a/client/src/selectors/cartSelectors.js
+++ b/client/src/selectors/cartSelectors.js
@@ -1,5 +1,5 @@
 import { createSelector } from 'reselect'
-
+import { getDishesById } from './dishSelectors'
 export const getAddedIds = state => state.cart.addedIds
 export const getIsCartEmpty = createSelector(
@@ -11,3 +11,9 @@ export const getCartCount = createSelector(
   getAddedIds,
   addedIds => addedIds.length
 )
+
+export const getCartDishes = createSelector(
+  getAddedIds,
+  getDishesById,
+  (addedIds, dishes) => addedIds.map(id => dishes[id])
+)
```

定义了 getCartDishes 选择器，拿到所有购物车中的甜点 id 和所有甜点的详情，当然就可以运算得到由添加到购物车的所有的甜点的详情组成的数据，也就是 cartDishes ，用这个数据到展示组件中替换临时数据即可。

看看本部分达成的效果。用户把一件商品添加到购物车后，点购物车图标进入购物车页面，购物车商品列表中，可以看到这件商品的海报和价格。

至此，《显示商品海报和价格》这部分就胜利完成了。

### 增加单品数量

进入下一部分《增加单品数量》。每一个甜点的具体数量都是可以修改的。

发出 action 。


```diff
diff --git a/client/src/actions/cartActions.js b/client/src/actions/cartActions.js
index 3640f5c..dd54d88 100644
--- a/client/src/actions/cartActions.js
+++ b/client/src/actions/cartActions.js
@@ -3,3 +3,11 @@ import * as types from '../constants/ActionTypes'
 export const addToCart = dishId => dispatch => {
   dispatch({ type: types.ADD_TO_CART, dishId })
 }
+
+export const decrCartItem = (dishId) => dispatch => {
+  dispatch({ type: types.DECR_CART_ITEM, dishId })
+}
+
+export const incrCartItem = (dishId) => dispatch => {
+  dispatch({ type: types.INCR_CART_ITEM, dishId })
+}
diff --git a/client/src/components/Cart.js b/client/src/components/Cart.js
index a351e99..9334cb4 100644
--- a/client/src/components/Cart.js
+++ b/client/src/components/Cart.js
@@ -4,9 +4,9 @@ import CartItem from './CartItem'
 class Cart extends Component {
   render () {
-    const { cartDishes } = this.props
+    const { cartDishes, incrCartItem, decrCartItem } = this.props
     let itemList = cartDishes.map(dish =>
-      <CartItem key={dish._id} dish={dish} />
+      <CartItem key={dish._id} {...{dish, incrCartItem, decrCartItem}} />
     )
     return (
       <Wrap>
diff --git a/client/src/components/CartItem.js b/client/src/components/CartItem.js
index 89c76b5..49822ea 100644
--- a/client/src/components/CartItem.js
+++ b/client/src/components/CartItem.js
@@ -4,7 +4,7 @@ import { posterUrl } from '../constants/ApiConstants'
 class CartItem extends Component {
   render () {
-    const { name, poster, price } = this.props.dish
+    const { name, poster, price, _id } = this.props.dish
     return (
       <Wrap>
         <Info>
@@ -19,13 +19,13 @@ class CartItem extends Component {
           </NamePriceWrap>
         </Info>
         <CartAction>
-          <Minus>
+          <Minus onClick={() => this.props.decrCartItem(_id)}>
             -
           </Minus>
           <ItemCount>
             1
           </ItemCount>
-          <Plus>
+          <Plus onClick={() => this.props.incrCartItem(_id)}>
             +
           </Plus>
         </CartAction>
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index 40026bf..8e13f44 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -22,3 +22,5 @@ export const SUBMIT_COMMENT_SUCCESS = 'SUBMIT_COMMENT_SUCCESS'
 export const UPDATE_USER = 'UPDATE_USER'
 export const ADD_TO_CART = 'ADD_TO_CART'
+export const DECR_CART_ITEM = 'DECR_CART_ITEM'
+export const INCR_CART_ITEM = 'INCR_CART_ITEM'
diff --git a/client/src/containers/CartContainer.js b/client/src/containers/CartContainer.js
index bf41c6f..47f3417 100644
--- a/client/src/containers/CartContainer.js
+++ b/client/src/containers/CartContainer.js
@@ -1,6 +1,7 @@
 import React from 'react'
 import Cart from '../components/Cart'
 import { connect } from 'react-redux'
+import { incrCartItem, decrCartItem } from '../actions/cartActions'
 import { getCartDishes } from '../selectors/cartSelectors'
 const CartContainer = props => <Cart {...props} />
@@ -9,4 +10,7 @@ const mapStateToProps = state => ({
   cartDishes: getCartDishes(state)
 })
-export default connect(mapStateToProps)(CartContainer)
+export default connect(mapStateToProps, {
+  incrCartItem,
+  decrCartItem
+})(CartContainer)
```

用户点增加或者减少单品按钮，可以发出对应的 action ，并且把当前甜点的 id 发送给 reducer 了。

那 reducer 接收到数据之后如何处理呢。

```diff
diff --git a/client/src/reducers/cart.js b/client/src/reducers/cart.js
index b7c4f0b..6fadce2 100644
--- a/client/src/reducers/cart.js
+++ b/client/src/reducers/cart.js
@@ -12,6 +12,31 @@ const addedIds = (state = [], action) => {
   }
 }
+const quantityById = (state = {} , action) => {
+  const { dishId } = action
+  switch (action.type) {
+    case types.ADD_TO_CART:
+      return {
+        ...state,
+        [dishId]: 1
+      }
+    case types.INCR_CART_ITEM:
+      return {
+        ...state,
+        [dishId]: state[dishId] + 1
+      }
+    case types.DECR_CART_ITEM:
+      if (state[dishId] === 0) return state
+      return {
+        ...state,
+        [dishId]: state[dishId] - 1
+      }
+    default:
+      return state
+  }
+}
+
 export default combineReducers({
-  addedIds
+  addedIds,
+  quantityById
 })
```


收到的是 ADD_TO_CART 这个 action ，意味着该商品被添加到了购物车，那么商品的数量，也就是是 quantity 默认设置为1，如果是 INCRE_CART_ITEM ，意味着用户要增加单品数量，那就把对应 id 的这个单品的数量加一，收到 DECRE_CART_ITEM 则减一。

最后让页面上显示正确的单品数量。


```diff
diff --git a/client/src/components/CartItem.js b/client/src/components/CartItem.js
index 49822ea..5fe2059 100644
--- a/client/src/components/CartItem.js
+++ b/client/src/components/CartItem.js
@@ -4,7 +4,7 @@ import { posterUrl } from '../constants/ApiConstants'
 class CartItem extends Component {
   render () {
-    const { name, poster, price, _id } = this.props.dish
+    const { name, poster, price, _id, quantity } = this.props.dish
     return (
       <Wrap>
         <Info>
@@ -23,7 +23,7 @@ class CartItem extends Component {
             -
           </Minus>
           <ItemCount>
-            1
+            { quantity }
           </ItemCount>
           <Plus onClick={() => this.props.incrCartItem(_id)}>
             +
diff --git a/client/src/selectors/cartSelectors.js b/client/src/selectors/cartSelectors.js
index b44de85..d35c573 100644
--- a/client/src/selectors/cartSelectors.js
+++ b/client/src/selectors/cartSelectors.js
@@ -12,8 +12,16 @@ export const getCartCount = createSelector(
   addedIds => addedIds.length
 )
+export const getQuantityById = state => state.cart.quantityById
+
 export const getCartDishes = createSelector(
   getAddedIds,
   getDishesById,
-  (addedIds, dishes) => addedIds.map(id => dishes[id])
+  getQuantityById,
+  (addedIds, dishes, quantityById) => addedIds.map(id => {
+    return {
+      ...dishes[id],
+      quantity: quantityById[id]
+    }
+  })
 )
```

在 cartDishes 中的每一个 dish 详情中，又插入了一项，就是数量 quantity ，然后显示到页面上即可。

看看本部分达成的效果。用户选中商品后，在购物车页面可以对单品数量进行修改。

至此，《增加单品数量》这部分就胜利完成了。

### 结账

进入下一部分《结账》。面临两个任务，一个是运算总价，另一个就是结账走人。

先来运算总价。


```diff
diff --git a/client/src/components/Cart.js b/client/src/components/Cart.js
index 4598398..1edcb23 100644
--- a/client/src/components/Cart.js
+++ b/client/src/components/Cart.js
@@ -4,7 +4,7 @@ import CartItem from './CartItem'
 class Cart extends Component {
   render () {
-    const { cartDishes, incrCartItem, decrCartItem } = this.props
+    const { cartDishes, incrCartItem, decrCartItem, total } = this.props
     let itemList = cartDishes.map(dish =>
       <CartItem key={dish._id} {...{ dish, incrCartItem, decrCartItem }} />
     )
@@ -12,7 +12,7 @@ class Cart extends Component {
       <Wrap>
         <Hero>
           <h1>
-            200 元
+            {total}元
           </h1>
         </Hero>
         <ListWrap>
diff --git a/client/src/containers/CartContainer.js b/client/src/containers/CartContainer.js
index 47f3417..231813c 100644
--- a/client/src/containers/CartContainer.js
+++ b/client/src/containers/CartContainer.js
@@ -2,12 +2,13 @@ import React from 'react'
 import Cart from '../components/Cart'
 import { connect } from 'react-redux'
 import { incrCartItem, decrCartItem } from '../actions/cartActions'
-import { getCartDishes } from '../selectors/cartSelectors'
+import { getCartDishes, getTotal } from '../selectors/cartSelectors'
 const CartContainer = props => <Cart {...props} />
 const mapStateToProps = state => ({
-  cartDishes: getCartDishes(state)
+  cartDishes: getCartDishes(state),
+  total: getTotal(state)
 })
 export default connect(mapStateToProps, {
diff --git a/client/src/selectors/cartSelectors.js b/client/src/selectors/cartSelectors.js
index d35c573..ee53f40 100644
--- a/client/src/selectors/cartSelectors.js
+++ b/client/src/selectors/cartSelectors.js
@@ -25,3 +25,13 @@ export const getCartDishes = createSelector(
     }
   })
 )
+
+export const getTotal = createSelector(
+  getAddedIds,
+  getDishesById,
+  getQuantityById,
+  (addedIds, dishes, quantityById) => addedIds.reduce(
+    (total, id) => total + dishes[id].price * quantityById[id]
+    , 0
+  ).toFixed(2)
+)
```


添加了运算总价的选择器 getTotal 。

再来做结账功能。

```diff
diff --git a/client/src/actions/cartActions.js b/client/src/actions/cartActions.js
index dd54d88..83215fe 100644
--- a/client/src/actions/cartActions.js
+++ b/client/src/actions/cartActions.js
@@ -1,4 +1,6 @@
 import * as types from '../constants/ActionTypes'
+import { alert } from './commonActions'
+import { history } from '../utils/routerUtils'
 export const addToCart = dishId => dispatch => {
   dispatch({ type: types.ADD_TO_CART, dishId })
@@ -11,3 +13,9 @@ export const decrCartItem = (dishId) => dispatch => {
 export const incrCartItem = (dishId) => dispatch => {
   dispatch({ type: types.INCR_CART_ITEM, dishId })
 }
+
+export const checkout = () => dispatch => {
+  dispatch(alert('欢迎继续购物'))
+  history.push('/dashboard')
+  dispatch({ type: types.CHECKOUT })
+}
diff --git a/client/src/components/Cart.js b/client/src/components/Cart.js
index 1edcb23..b415fa7 100644
--- a/client/src/components/Cart.js
+++ b/client/src/components/Cart.js
@@ -4,7 +4,7 @@ import CartItem from './CartItem'
 class Cart extends Component {
   render () {
-    const { cartDishes, incrCartItem, decrCartItem, total } = this.props
+    const { cartDishes, incrCartItem, decrCartItem, total, checkout } = this.props
     let itemList = cartDishes.map(dish =>
       <CartItem key={dish._id} {...{ dish, incrCartItem, decrCartItem }} />
     )
@@ -19,7 +19,7 @@ class Cart extends Component {
           <ItemList>
             {itemList}
           </ItemList>
-          <CheckoutButton>
+          <CheckoutButton onClick={checkout} >
             结算
           </CheckoutButton>
         </ListWrap>
diff --git a/client/src/constants/ActionTypes.js b/client/src/constants/ActionTypes.js
index 8e13f44..700632c 100644
--- a/client/src/constants/ActionTypes.js
+++ b/client/src/constants/ActionTypes.js
@@ -24,3 +24,4 @@ export const UPDATE_USER = 'UPDATE_USER'
 export const ADD_TO_CART = 'ADD_TO_CART'
 export const DECR_CART_ITEM = 'DECR_CART_ITEM'
 export const INCR_CART_ITEM = 'INCR_CART_ITEM'
+export const CHECKOUT = 'CHECKOUT'
diff --git a/client/src/containers/CartContainer.js b/client/src/containers/CartContainer.js
index 231813c..86639a6 100644
--- a/client/src/containers/CartContainer.js
+++ b/client/src/containers/CartContainer.js
@@ -1,7 +1,7 @@
 import React from 'react'
 import Cart from '../components/Cart'
 import { connect } from 'react-redux'
-import { incrCartItem, decrCartItem } from '../actions/cartActions'
+import { incrCartItem, decrCartItem, checkout } from '../actions/cartActions'
 import { getCartDishes, getTotal } from '../selectors/cartSelectors'
 const CartContainer = props => <Cart {...props} />
@@ -13,5 +13,6 @@ const mapStateToProps = state => ({
 export default connect(mapStateToProps, {
   incrCartItem,
-  decrCartItem
+  decrCartItem,
+  checkout
 })(CartContainer)
diff --git a/client/src/reducers/cart.js b/client/src/reducers/cart.js
index 9b5491c..ceae874 100644
--- a/client/src/reducers/cart.js
+++ b/client/src/reducers/cart.js
@@ -7,6 +7,8 @@ const addedIds = (state = [], action) => {
       return state.indexOf(action.dishId) === -1
         ? [...state, action.dishId]
         : state
+    case types.CHECKOUT:
+      return []
     default:
       return state
   }
@@ -31,6 +33,8 @@ const quantityById = (state = {}, action) => {
         ...state,
         [dishId]: state[dishId] - 1
       }
+    case types.CHECKOUT:
+      return {}
     default:
       return state
   }
```

结账成功只是执行页面跳转，显示提示信息以及清空 redux 中的购物车数据，至于生成后端订单数据等等其他功能，我们课程限于篇幅就不弄了。

看看本部分达成的效果。页面中修改单品数量，可以看到总价，点结账按钮可以离开购物车。

至此，《结账》这部分就胜利完成了。

### 结语

进入最后一部分《结语》

复盘一下本节思路。购物车页面的主要功能是增加单品数量和运算总价，其中单品数量应该是最简数据，所以要存储到 store 中，而总价则可以通过已有的最简数据演算得到，所以放到了选择器里来完成。

至此，《实现购物车各项功能》就胜利完成了。
