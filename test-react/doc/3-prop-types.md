# Prop-types 测试属性

prop-types 进行类型检查也是一种重要的测试手段，虽然它并不是 Jest 的一部分，但是可以和 Jest 的已有功能形成很好的互补。

### 数据来自 redux

先来把 redux 搭建起来，因为咱们要从 redux 中拿数据。

```
npm i redux react-redux
```

先来装包。

src/components/Main.js

```js
import React, { Component } from 'react'
import CartContainer from '../containers/CartContainer'
import ProductsContainer from '../containers/ProductsContainer'

class Main extends Component {
  render() {
    return (
      <div>
        <ProductsContainer />
        <hr />
        <CartContainer />
      </div>
    )
  }
}
```

Main 组件中，添加 ProductsContainer ，因为咱们本节主要就是以 Product 相关的组件来做例子，Cart 暂时不碰。

src/containers/ProductsContainer.js

```js
import React from 'react'
import { connect } from 'react-redux'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'

const ProductsContainer = ({ products }) => (
  <ProductsList title="商品列表">
    {products.map(product => (
      <ProductItem key={product.id} product={product} />
    ))}
  </ProductsList>
)

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps)(ProductsContainer)
```

ProductsContainer 中，导入 ProductItem 和 Product 两个展示组件。下面让这两个组件配合，展示出商品列表。

src/components/ProductsList.js

```js
import React from 'react'

const ProductsList = ({ title, children }) => (
  <div>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
)

export default ProductsList
```

ProductsList 中，使用了 `children` ，会替换为多个 ProductItem 。

src/components/Product.js

```js
import React from 'react'

const Product = ({ price, title }) => (
  <div>
    {title} - {price} 元
  </div>
)

export default Product
```

Product 组件中每一件商品只显示名称和价格。

src/components/ProductItem.js

```js
import React from 'react'
import Product from './Product'

const ProductItem = ({ product }) => (
  <div style={{ marginBottom: 20 }}>
    <Product title={product.title} price={product.price} />
  </div>
)

export default ProductItem
```

未来 ProductItem 中还会添加购买按钮，暂时就是直接传递信息给 Product 组件。

src/index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

src/index.js 中来添加 store 。

src/reducers/index.js

```js
import { combineReducers } from 'redux'
import products from './products'

export default combineReducers({
  products
})
```

rootReducer 中暂时只有 products 一项。

src/reducers/products.js

```js
const products = [
  { id: 1, title: 'iPad', price: 500 },
  { id: 2, title: 'T恤', price: 10 },
  { id: 3, title: '杯子', price: 19 }
]
export default (state = products, action) => {
  return state
}
```

products reducer 中也没有什么内容，纯粹为提供数据而生。

浏览器中，看到商品列表显示出来了。

### 使用 prop-types

实际操作中，即使不写测试，也建议把 prop-types ，也就是属性类型检查加上，因为的确能帮我们捕捉到不少错误，而如果没有检查，很多错误可能就悄无声息，自己看代码仔细找，会浪费不少时间。

src/components/Product.js

```js
import PropTypes from 'prop-types'

Product.propTypes = {
  price: PropTypes.number,
  title: PropTypes.string
}
```

对应 Product 组件，要求输入的 `price` 属性是 `number` 类型，`title` 是 `string` 类型。

src/components/ProductItem.js

```js
import PropTypes from 'prop-types'

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
}
```

ProductItem 只接受一个参数，就是 `product` ，但是里面的细节还可以通过 `.shape` 接口细化，这里可以看到 `product` 是一个对象，里面包含两个元素 `title` ，要求是 `string` ，`price` 要求是 `number` ，`isRequired` 意味着着这一项必须传递，留空就会报错。

src/components/ProductList.js

```js
import PropTypes from 'prop-types'

ProductsList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}
```

ProductList 组件中，道理完全一样, `children` 的类型是 `node` 也就是节点，这个是咱们第一次用到。

注意，prop-types 检测出的问题，不会体现在 `npm test` 运行所在的命令行界面，而是会在 chrome console 中显示。
