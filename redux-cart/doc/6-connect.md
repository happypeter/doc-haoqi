# 通过 connect 动态订阅状态树

如果是组件内 state ，咱们用 setState 接口一改，界面上就能立即体现出新 state 值，但是现在数组在 store 中，改完了，界面没有反应。要解决这个问题，就不能用  getState 一次性读值，而要用 connect 动态订阅状态树。

### 安装 react-redux 把组件和状态树 connect 起来

```
npm i react-redux
```

react-redux 这个包就是专门用来把 store 和 react 组件动态的链接起来的。然后就可以导入 connect 实现动态订阅了。

src/index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'))
```

首先到 src/index.js 从 react-redux 中导入 Provider ，意思是提供者，那提供什么呢？下面导入 store 。然后用 Provider 包裹 App ，其中 store 作为 Provider 的一个属性来传入。这样就把 store 提供给了整个项目中的所有组件。

Cart.js

```js
import store from '../store'
import { connect } from 'react-redux'

class Cart extends Component {
  render () {
    const { cart } = this.props
    const hasProduct = cart.length > 0
    const productList = cart.map(t => (
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(Cart)
```

到展示组件 Cart.js 中，如何来使用状态树呢？从 react-redux 中导入一个跟 Provider 配合使用的接口，就是 connect 。定义 mapStateToPorps 函数，它的参数 state 中可以拿到的就是状态树。

返回一个对象，状态树中拿到 cart 数据，保存这个对象的 cart 属性。

mapStateToProps 之所以能拿到状态树，是因为它是作为 connect 的参数使用的，connect 是一个高阶组件，没有函数式编程经验的同学可能会感觉的形式有些奇怪，但是作用是很明朗的，就是让当前组件拿到状态树。

mapStateToProps 从整个状态树中筛选出了当然组件需要的那部分状态值，这里也就是 cart ，把它映射成了当前组件的一个 prop 。所以到组件中，可以用 this.props.cart 拿到数据。

浏览器中，再点购买按钮，购物车就会立刻显示出所购商品。

### container 组件负责对外数据接口

根据展示组件和容器组件的最佳实践，要把 connect 这一套逻辑放到 container 组件中。

Cart.js

```js
import React from 'react'
import Cart from '../components/Cart'
import { connect } from 'react-redux'

const CartContainer = props => <Cart {...props} />

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(CartContainer)
```

展示组件 Cart.js 中，把 connect 相关的代码都删除。

然后到容器组件 CartContainer.js 中，重新实现一遍这个逻辑。导入 connect 接口，通过 mapStateToProps 筛选出 cart 数据，这样当前组件就能通过 this.props.cart 拿到数据了，但是问题是，当前组件中我也不用这个数据呀，所以需要传递给展示组件 Cart 。通过 props 的展开运算符的形式，我们把当前容器组件的所有的 props 一次性都传递给了展示组件，这样也方便的后续再有新 props 引入进来。

浏览器中，看到添加购物车操作依然没有问题，表示代码重构成功了。