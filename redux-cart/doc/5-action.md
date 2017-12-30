# 修改状态树

如果想要添加商品到购物车中，就会涉及到修改状态树的操作。Redux 规定，必须先发 action ，触发相应的 reducer 去修改状态树。

### 安装 redux-logger 监控 action

先来安装 redux-logger 监控 action 的发出和 store 的变化。

```js
npm i redux-logger
```

redux-logger 是一个辅助开发的工具。

store/index.js

```js
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import logger from 'redux-logger'

const store = createStore(rootReducer, applyMiddleware(logger))

export default store
```

store/index.js 中导入 applyMiddleware ，也就是应用中间件接口，导入刚安装的 logger ，createStore 接口的第二个参数中，就可以通过 applyMiddleware ，加载 logger 。

### 发出 action

页面中有事件被触发后，可以发出 action 来。

Products.js

```js
class Products extends Component {
  handleClick = productId => {
    store.dispatch({ type: 'ADD_TO_CART', productId })
  }

  render() {
    ...
    const productList = products.map(t => (
      <div key={t.id}>
        <div>
          {t.name}
        </div>
        <button onClick={() => this.handleClick(t.id)} >购买</button>
      </div>)
    )
    ...
```

Products.js 中添加了一个购买按钮，用户点一下按钮就会执行 handleClick 函数，参数是当前商品的 id 。到 handleClick 函数中，store.dispatch 接口用来发出 action 。 一个 action 由两部分组成，首先是 type 也就是类型，这里为 `ADD_TO_CART` ，另外一部分是负载数据，这里是 productId 。

浏览器中，点一下购买按钮，终端中中就可以看到 redux-logger 打印出的 action 以及新旧两个状态树。

### 通过 reducer 修改状态树

Action 发出之后，谁会接收呢？Reducer 是一个特殊的函数，其输入是老状态以及接受到的 action ，输出，也就是 return 中返回的值，就是新状态值。

reducers/products.js

```js
const products = (state = initialState, action) => {
  console.log('products reducer---', action)
  return state
}
```

reducers/cart.js

```js
const cart = (state = [], action) => {
  console.log('cart reducer----', action)
  return state
}
```

Reducer 接收到 Action ，可以打印出 Action 对象。但是，一个问题是，所有的 reducer 函数都会接收到 action ，但是不是所有的 reducer 都需要处理这个 action 。所以需要添加一定的判断条件来避免不该执行的代码被执行，这个通过 Switch 语句来完成。

reducers/cart.js

```js
const cart = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.productId]
    default:
      return state
  }
}

export default cart
```

到 reducers/cart.js 中，添加 switch 语句，用接收到的 action.type 为判断条件，利用 case 匹配，来决定哪部分代码要被执行。这里 reducer 接收到 `ADD_TO_CART` 之后，要把 productId 添加到数组中，但是由于 redux 的规范要求 reducer 是纯函数，所以这里不能用 push ，而要借助展开运算符来完成。return 返回的内容，就会成为下一个状态树，也会成为 reducer 下一次执行时的参数 state 的初始值。

浏览器中，执行一下购买操作，终端中打印出的新状态树中，cart 数组果然添加了 productId 进来。再点另外一个商品的购买按钮，会发现另外一个商品的 id 也被添加了进来。

### 避免同一个 id 添加两次

但是如果在相同的商品购买按钮上重复点，发现其 id 也会被重复添加到 cart 数组中，这个是咱们不希望看到的。

reducers/cart.js

```js
  switch (action.type) {
    case 'ADD_TO_CART':
      if(state.indexOf(action.productId) !== -1) {
        return state
      }
      return [...state, action.productId]
    default:
```

到代码中，添加一个判断条件，通过 indexof 接口，判断如果 productId 已经被添加到 cart 数组中了，那就直接返回 state ，也就是什么都不做。

浏览器中，再试一下，重复添加一个商品就不会修改 cart 状态了。