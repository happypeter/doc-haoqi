# 单元测试与集成测试

reducer 中购物车数据有了，但是只是最简完备数据。跟购物车界面上要显示的内容不同。那么这个数据转换工作，就要在 selectors 中完成。

### 显示商品列表

购物车中首先要显示的是商品列表，但是 cart reducer 中，只保存了 addedIds 也就是购买商品的 id ，所以需要进行一下转换。

src/selectors/index.spec.js

```js
describe('selectors', () => {
  describe('getCartProducts', () => {
    it('should return products', () => {
      const state = {
        cart: {
          addedIds: [1, 2]
        },
        products: [
          {
            id: 1,
            title: 'Product 1',
            price: 1
          },
          {
            id: 2,
            title: 'Product 2',
            price: 3
          },
          {
            id: 3,
            title: 'Product 3',
            price: 4
          }
        ]
      }

      expect(getCartProducts(state)).toEqual([
        {
          id: 1,
          title: 'Product 1',
          price: 1
        },
        {
          id: 2,
          title: 'Product 2',
          price: 3
        }
      ])
    })
  })
})
```

还是先写测试，把我们期待 selector 函数能干的事情，写清楚。

命令行中，看到测试报错。

### 实现 getCartProducts

src/selectors/index.js

```js
export const getTotal = () => 10

const getProductsById = state =>
  state.reduce((obj, product) => {
    obj[product.id] = product
    return obj
  }, {})

const getAddedIds = state => state.cart.addedIds
const getProduct = (state, id) => getProductsById(state.products)[id]

export const getCartProducts = state =>
  getAddedIds(state).map(id => ({
    ...getProduct(state, id)
  }))
```

上面的代码用了函数式编程的思路做了逻辑拆分，我们不需要仔细关注具体逻辑。

命令行中，看到测试通过了。

### 继续添加测试

下面还需要更多的功能。购物车中还需要添加每个商品的购买数量，以及总价。这个都一样可以使用测试驱动的思路来开发。

我们这里就不介绍了。可以参考[最终代码](http://github.com/haoqicat/test-react) 。

### 集成测试及其他

前面写的这些测试基本上都是单元测试，意思是测试范围关注的是局部，例如一个函数。

所以咱们课程往上说，会涉及到集成测试的概念，便于测试各个功能单元是否能配合良好。往下说，会涉及到类型检查，例如咱们课程介绍过的 prop-types 的方式，也可以使用 flow 和 typescript 来更全面的进行类型检查。另外，ESLint 也是非常好的定位错误的方式，也是强烈推荐的。一个完整的 react 测试系统，应该说这些部分都不可或缺。
