# 测试驱动开发

要记住，不管是 reducer 还是 react 组件，其实都是纯函数。给定一个输入，肯定输出是一定的。组件测试前面已经做过了，这集来测试 reducer 。

### 添加购物车

测试其实就是最好的，活着的文档，同时测试代码一定比真实代码要简单，所以咱们先写测试，再写代码，来一把测试驱动开发。

src/reducers/cart.js

```js
export default () => null
```

先要写一个空的 reducer ，不然测试文件根本运行不起来。

src/reducers/cart.spec.js

```js
import cart from './cart'

describe('reducers', () => {
  describe('cart', () => {
    const initialState = {
      addedIds: [],
      quantityById: {}
    }

    it('should provide the initial state', () => {
      expect(cart(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_TO_CART action', () => {
      expect(cart(initialState, { type: 'ADD_TO_CART', productId: 1 })).toEqual(
        {
          addedIds: [1],
          quantityById: { 1: 1 }
        }
      )
    })

    describe('when product is already in cart', () => {
      it('should handle ADD_TO_CART action', () => {
        const state = {
          addedIds: [1, 2],
          quantityById: { 1: 1, 2: 1 }
        }

        expect(cart(state, { type: 'ADD_TO_CART', productId: 2 })).toEqual({
          addedIds: [1, 2],
          quantityById: { 1: 1, 2: 2 }
        })
      })
    })
  })
})
```

首先，导入被测试的对象 cart ，它是一个 reducer ，也就是说是一个纯函数。下面用两层 `describe` 描述请了测试对象，`reducers` 之一的 `cart` 。接下来要思考的是 `cart` 的初始值，`initialState` 是一个对象，其中有两项内容，一个是 `addedIds` 里面保存添加到购物车的商品的 id ，初始条件下是一个空数组。另一个是 `quantityById` ，里面保存一个商品，用户购买了几件，初始条件下是一个空对象。

第一个测试是，`cart` reducer 要提供初始状态，测试代码中传入 `cart` 的第一个参数是 `undefined` ，同时传入的 action 是一个空对象，期待 `cart` 能把初始值返回给我们。这里 `toEqual` 比 `toBe` 更适用于对象比对。

第二个测试是，要能响应 `ADD_TO_CART` 这个 action 。给 `cart` 函数传入初始状态值，以及一个携带了具体商品 id 的 action 。期待能正确的修改 state 值。

下面的 `describe` 又构成一个逻辑单元，里面的测试的前提是购物车里已经有了至少一件商品了。仔细看看，也非常好理解。

命令行中，可以看到三个测试都报错了。

### 返回初始状态值

我们一个一个的来消灭报错。

src/reducers/cart.js

```js
import { combineReducers } from 'redux'

const addedIds = (state = [], action) => {
  return state
}

const quantityById = (state = {}, action) => {
  return state
}

export default combineReducers({
  addedIds,
  quantityById
})
```

写两个空 reducer ，每个 reducer 都什么都不干，直接返回初始值，最终合并成 cart reducer 。

命令行中，可以看到 `should return initialState` 那个测试通过了。

### 添加商品

src/reducers/cart.js

```js
...
const addedIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.productId]
    default:
      return state
  }
}

const quantityById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { productId } = action
      return {
        [productId]: 1
      }
    default:
      return state
  }
}
...
```

添加 reducer 代码。

命令行中，第二个测试也通过了。

### 适应购物车非空

只有购物车中已有商品的这个测试还没有通过。

src/reducers/cart.js

```js
const addedIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { productId } = action
      if (state.indexOf(productId) === -1) {
        return [...state, action.productId]
      }
      return state
    default:
      return state
  }
}

const quantityById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { productId } = action
      return {
        ...state,
        [productId]: (state[productId] || 0) + 1
      }
    default:
      return state
  }
}
```

添加上对于购物车非空的一些考虑。

命令行中，所有的测试就都通过了。而我们的代码也写完了。
