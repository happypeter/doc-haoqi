# enzyme 模拟按钮点击

本节来用 enzyme [模拟按钮点击事件](http://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html)。也会涉及到用 Jest [模拟出一个函数](https://facebook.github.io/jest/docs/en/mock-function-api.html#mockfnmockimplementationfn)的知识。

### 添加 onClick 事件

src/components/ProductItem.js

```js
import Product from './Product'
import PropTypes from 'prop-types'

const ProductItem = ({ product, onAddToCartClicked }) => (
  <div style={{ marginBottom: 20 }}>
    <Product title={product.title} price={product.price} />
    <button onClick={onAddToCartClicked}>Add to cart</button>
  </div>
)

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductItem
```

ProductItem 组件多传入一个属性，`onAddToCartClicked` ，里面添加一个按钮，点按钮的时候，执行这个函数。有了新属性传入了，不要忘记添加 prop-types 类型检查。

浏览器中，看到 console 有报错信息。

### 去除 console 报错

```js
...

const ProductsContainer = ({ products }) => (
  <ProductsList title="商品列表">
    {products.map(product => (
      <ProductItem
        key={product.id}
        product={product}
        onAddToCartClicked={() => console.log('add me to cart')}
      />
    ))}
  </ProductsList>
)
```

要消除 console 报错，只需要给 `ProductItem` 传入需要的属性即可。

浏览器中，可以看到报错没有了。可见良好的测试有时候就能直接指引我们如何去写代码。

### 模拟点击

src/components/ProductItem.spec.js

```js
import React from 'react'
import { shallow } from 'enzyme'
import Product from './Product'
import ProductItem from './ProductItem'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

const setup = product => {
  const actions = {
    onAddToCartClicked: jest.fn()
  }

  const component = shallow(<ProductItem product={product} {...actions} />)

  return {
    component: component,
    actions: actions,
    button: component.find('button')
  }
}

it('should call action on button click', () => {
  const { button, actions } = setup({
    title: 'Product 1',
    price: 9.99
  })
  button.simulate('click')
  expect(actions.onAddToCartClicked).toBeCalled()
})
```

`jest.fn` 可以模拟一个函数，因为出于测试目的，其实 `onAddToCartClicked` 函数不需要有任何具体代码，但是同时它也必须是一个函数，不然 `shallow` 渲染 `ProductItem` 组件的时候，就会因为缺少必要参数而报错了。所以，正好可以使用 `jest.fn` 。

`simulate` 中传入 `click` 事件的时候，其实就是去找 `button` 的 `onClick` 事件对应的函数去执行。

命令行中，看到测试通过，但是如果删除 `button` 的 `onClick` 事件，或者把 `onClick` 事件的处理函数改个名字，测试就都会失败。
