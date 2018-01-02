# 运算总价

这集来制作购物车中另外一项重要的功能，运算总价。

### 添加单价信息

首先要添加商品单价。

reducers/products.js

```js
const initialState = [
  {
    id: '324',
    name: '苹果电脑',
    price: 3
  },
  {
    id: '452',
    name: '橘子',
    price: 2
  }
]
```

到 reducers/products.js 中，添加商品单价进来。

### 运算总价

store 中保存了购物车的所有商品的 id 和单品数量，同时每个商品都有单价，所以可以到 selectors 函数中，去运算总价了。

selectors/index.js

```js
export const getTotal = state =>
  state.cart.addedIds
    .reduce(
      (total, id) =>
        total + getProductsById(state)[id].price * state.cart.quantityById[id],
      0
    )
    .toFixed(2)
```

首先通过 state.cart.addedIds 拿到所有商品 id ，这次输出不要数组了，而是要一个数值，所以用 reduce 来运算。reduce 函数中，第一个参数是一个回调函数，回调函数的第一个参数就是保存最终运算结果的变量，这里是 total ，意思是总价，第二个参数是每个商品的 id 。进入回调函数，拿到上一次迭代的总价 total 加上当前商品的价格乘以它的数量，这样，最终的迭代结束的结果就是总价了。逗号之后，是 reduce 函数的第二个参数，用来做回调函数的参数 total 的初始值，设置为0。toFixed(2) ，保留小数点后面两位数。

注意，上面用到了两个 ES6 的箭头函数，每个之中都只有一条语句，所以不用加 return ，也可以返回语句的运算结果的。

### 显示总价

CartContainer.js

```js
...
import { connect } from 'react-redux'
import { getCartProducts, getTotal } from '../selectors'

const CartContainer = props => <Cart {...props} />

const mapStateToProps = state => ({
  products: getCartProducts(state),
  total: getTotal(state)
})

export default connect(mapStateToProps)(CartContainer)
```

容器组件中，导入 getTotal ，然后再 mapStateToProps 函数中使用，可以拿到总价数据 total 。


Cart.js

```js
class Cart extends Component {
  render () {
    const { products, total } = this.props
    const productList = products.map(t => (
    ...
      <div>
        <p>总计：{total}元</p>
```

到展示组件 Cart.js 中，导入 total ，并且显示出来。

浏览器中，可以看到随着用户点购买按钮，总价是一直可以正确显示的。