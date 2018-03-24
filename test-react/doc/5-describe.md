# 使用 describe 对测试进行分组

本节来用 Jest 自带的 describe 接口，把测试分组，让测试看上去逻辑更清楚。

### 直接使用

src/components/ProductItem.spec.js

```js
describe('ProductItem component', () => {
  it('should render Add To Cart message', () => {
    const { button } = setup({
      title: 'Product 1',
      price: 9.99
    })
    expect(button.text()).toMatch(/^Add to cart/)
  })
  it('should call action on button click', () => {
    const { button, actions } = setup({
      title: 'Product 1',
      price: 9.99
    })
    button.simulate('click')
    expect(actions.onAddToCartClicked).toBeCalled()
  })
})
```

ProductItem.spec.js 中再添加一个测试进来，可以把多个测试用 `describe` 接口包裹起来，形成一组，这样，不管是源码层面上，还是最终命令行的输出都会更清晰。

命令行中，测试运行的界面中，可以看到 `ProductItem component` 字样出现在了各个具体测试名称之前，逻辑从属关系更加清楚了。

### 配合 beforeEach

多个测试有时候需要事先运行相同的准备工作，这个可以用 `beforeEach` 接口来完成。

src/components/ProductItem.spec.js

```js
let productProps

describe('ProductItem component', () => {
  beforeEach(() => {
    productProps = {
      title: 'Product 1',
      price: 9.99
    }
  })

  it('should render Add To Cart message', () => {
    const { button } = setup(productProps)
    ...
  })

  it('should call action on button click', () => {
    const { button, actions } = setup(productProps)
    ...
  })
```

比如这里我们用 `beforeEach` 给每个测试都初始化了 `productProps` 变量，用作 `setup` 的参数。

命令行中，测试运行正常。

### 多次和嵌套使用

一个测试文件中，也可以多次并列，或者嵌套使用 `describe` 。

src/selectors/index.spec.js

```js
import { getTotal, getCartProducts } from './index'

describe('selectors', () => {
  describe('getTotal', () => {
    it('should return price total', () => {
      expect(getTotal()).toBe(10)
    })
  })

  describe('getCartProducts', () => {
    it('should return products ', () => {
      expect(getCartProducts()).toBe('products')
    })
  })
})
```

比如咱们假设 selectors/index.js 中未来会有两个接口，一个叫 `getTotal` ，另一个叫 `getCartProducts` 。它们两个都是 selector 函数，所以最外层 `describe` 的文字描述是 `selectors` ，里面再写一层 `describe` 描述是 `getTotal` ，再里面再写测试，描述是 `should return price total` 。这里测试语句不是重点，暂时认为这个接口返回数字 `10` 。

同理，下面跟 `describe('getTotal')` 并列的，写一个 `describe('getCartProducts')` ，里面也写一个测试，暂时要求这个接口返回的内容是 `products` 这个字符串。

命令行中，可以看到测试没有通过。但是测试环境给出的报错信息是非常的层级分明。

### 保证测试通过

沿着测试的指引。

src/selectors/index.js

```js
export const getTotal = () => 10
export const getCartProducts = () => 'products'
```

临时添加两个空壳函数，保证测试能通过。

命令行中，测试全部 pass 了。
