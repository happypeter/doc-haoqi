# 用 selector 函数获取派生数据

购物车 cart 中保存的数据是商品 id ，现在我们要在购物车中显示商品详情，所以需一个购物车中所有的商品对象组成的一个数组。这个数组数据不是状态树中自然就有的，但是可以通过已有数据运算出来，属于派生数据。来看看派生数据如何获取。

### 引入 selectors 函数

可以在 reducers 文件中直接写派生运算函数，但是更好的方法是专门写到独立的文件中。

CartContainer.js

```js
...
import { connect } from 'react-redux'
import { getCartProducts } from '../selectors'

const CartContainer = props => <Cart {...props} />

const mapStateToProps = state => ({
  products: getCartProducts(state)
})

export default connect(mapStateToProps)(CartContainer)
```

到 CartContainers 中，从 selectors 文件夹的 index.js 中导入 getCartProducts 选择函数。接下来 mapStateToProps 中，不要 cart 数据了，改为利用 getCartProducts 函数来获取购物车中所有商品详情的数据，最终映射出来的属性名叫 products 。

selectors/index.js

```js
export const getCartProducts = state => {
  const allProducts = getProductsById(state)
  const cartProducts = state.cart.map(id => allProducts[id])
  return cartProducts
}

const getProductsById = state => {
  return state.products.reduce((obj, product) => {
    obj[product.id] = product
    return obj
  }, {})
}
```

再到 selectors/index.js 中，看看 getCartProducts 函数式如何实现的。

首先原材料是所有商品对象，本来这个通过 state.products 就可以得到，但是这样得到的 products 是一个对象数组，这种形式如果想根据商品的 id 从中获取到商品是比较麻烦的，所以，这里来实现另外一个接口 getProductsById  ，里面会调整一下 products 数据的格式，以便通过 allProducts[id] 这种形式就可以拿到一个商品对象。

state.cart 中保存了所有商品 id ，map 一下，最终保存到 cartProducts 中的数据，就是一个由商品对象组成的数组，正好是咱们需要的。

再来看看  getProductsById 的实现，里面用 reduce 函数，把 products 这个数组变形成了一个对象，对象的每个属性名是商品 id ，属性值是商品对象，其中包含商品 id 和商品名称两个属性。

Cart.js

```js
  render () {
    const { products } = this.props
    const hasProduct = products.length > 0
    const productList = products.map(t => (
      <div key={t.id}>
        {t.name}
      </div>
    ))
    return (
```

到展示组件 Cart.js 中，把 cart 改为 products ，这样，下面能够获取的就不仅仅是 id 了，还可以获得商品 name ，JSX 中显示出来即可。

浏览器中，点购买商品按钮，可以看到购物车中出现了商品名。