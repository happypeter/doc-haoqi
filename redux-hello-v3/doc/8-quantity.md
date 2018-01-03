# 同一商品买多件

同一件商品连续点购买，那么购物车中怎么能增加这个单品的购买数量呢？

### 继续给状态树添加分支

这样，store 中的 cart 数据只保存商品 id 就不够用了。需要让状态树再多分个叉。

```js
const initialState = []
import { combineReducers } from 'redux'

const addedIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      if(state.indexOf(action.productId) !== -1) {
        ...
  }
}

const quantityById = (state = {}, action) => {
  return state
}

export default combineReducers({
  addedIds,
  quantityById
})
```

到 reducers/cart.js 中， 再次仰仗 combineReducers 接口。

把原来负责整个 cart 数据的 reducer，直接改名叫 addedIds。

下面再添加一个 reducer 叫 quantityById ，state 的初始值是一个空对象，暂时里面直接返回 state。

 这样， cart 就被分成了两部分，一个是 addedIds ，保存添加进来的商品 id ， 另一个是 quantityById ，记录每个商品的数量。


selectors/index.js

```js
export const getCartProducts = state => {
  ...
  const cartProducts = state.cart.addedIds.map(id => allProducts[id])
  ...
}
```

reducer 改了，对应其他地方的代码就可能不能运行了，所以要修改一下。到 selectors/index.js 中，添加 addedIds 。

浏览器中，可以看到 cart 数据变成了一个对象，里面有 addedIds 和 quantityById 两项内容。

### 修改 quantityById

下面来实现 quntityById 这个 reducer 。

reducers/cart.js

```js
const quantityById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { productId } = action
      return {...state, 
        [productId]: (state[productId] || 0) + 1
      }
    default:
      return state
  }
}
```

当接收到 `ADD_TO_CART` 这个 action 的时候，从 action 中解构赋值拿到商品 id 。下面用展开运算符拿到原来的数据，方括号包裹的内容会先求值，把结果作为属性名，如果该 id 对应的商品已经添加过了，那么用以前的数量加一，然后覆盖原有的数量。如果是第一次添加，state[productId] 是未定义，那就赋值为0，然后该商品的购买数量就是零加一。

浏览器中，可以看到每次点购买按钮，这个商品对应的购物车中的数量都会发生变化。

### 显示购物车单品数量

下一步要让单品数量显示到界面上。

Cart.js

```js
      <div key={t.id}>
        {t.name}--{t.quantity}
      </div>
```

假设每一个商品对象，都有了 quantity 属性，那直接把它显示到商品名之后任务就完成了，多方便。

selectors/index.js

```js
export const getCartProducts = state => {
  const cartProducts = state.cart.addedIds.map(id => {
   return {
     ...allProducts[id],
     quantity: state.cart.quantityById[id]
   }
  })
  return cartProducts
}
```

所以到 selectors 文件中，需要给每一个商品对象来添加 quantity 属性。通过 state.cart.quantityById 能拿到这件商品的数量。

浏览器中，点购买按钮，看到商品名后面可以正确的显示商品数量了。
