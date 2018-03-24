# enzyme 测试界面

[enzyme](http://airbnb.io/enzyme/) 是 airbnb 公司出品的专门用来测试 React 组件的测试工具。enzyme 中模拟了 jQuery 的各种 API 形式，所以上手也非常容易。

### 先写界面

删除一些不必要的文件，例如 src 下的 App.css index.css logo.svg registerServiceWorker.js 。

App.js 放到 src/containers 文件夹中。

src/containers/App.js

```js
import React, { Component } from 'react'
import Main from '../components/Main'

class App extends Component {
  render() {
    return <Main />
  }
}

export default App
```

App 组件是容器组件，里面导入对应的展示组件 Main 。

src/components/Main.js

```js
import React, { Component } from 'react'
import CartContainer from '../containers/CartContainer'

class Main extends Component {
  render() {
    return <CartContainer />
  }
}

export default Main
```

Main 组件导入 CartContainer 。

src/containers/CartContainer.js

```js
import React from 'react'
import Cart from '../components/Cart'

const CartContainer = props => <Cart {...props} />

export default CartContainer
```

CartContainer 中导入自己的展示组件 Cart 。我们这集要测试的也就只是这个 Cart 组件。

src/components/Cart.js

```js
import React, { Component } from 'react'

class Cart extends Component {
  render() {
    return <div>购物车</div>
  }
}

export default Cart
```

Cart 中只显示三个字购物车。

src/index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'

ReactDOM.render(<App />, document.getElementById('root'))
```

src/index.js 中做一下相应的调整。

命令行中，启动 `npm start` 。

浏览器中，可以看到“购物车”三个字。

### 添加测试

```
npm i enzyme enzyme-adapter-react-16 -D
```

测试 React 的组件输出，或者说是测试 UI ，就需要用到 enzyme 这个库了，需要配合的是 enzyme 的 react16 的适配器，所以把这个包也装上。

Cart.spec.js

```js
import React from 'react'
import { shallow } from 'enzyme'
import Cart from './Cart'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
  const component = shallow(<Cart />)
  return {
    div: component.find('div')
  }
}

it('should display 购物车', () => {
  const { div } = setup()
  expect(div.text()).toMatch(/购物车/)
})
```

导入浅层渲染 shallow 接口，所谓浅层渲染，就是运行的时候不会牵涉到被测试组件的子组件。导入被测试对象 Cart 组件。下面三行都是为了配置 enzyme 适配器，不用深究。

定义一个 `setup` 函数，里面渲染一下 `Cart` 组件，然后使用 enzyme 的 `find` 接口 ，传入选择器作为参数，这里就是 `div` 了，返回的是对应的节点。

下面写测试，测试名是：“它应该展示购物车”。具体语句就是先执行 `setup` 得到 `div` 节点。通过 `.text` 接口就能拿到节点文本，这里使用 toBe 也可以，但是对于字符串的判断 `toMatch` 更灵活一些，因为可以在两个斜杠之间写正则表达式。

命令行中，看到测试依然是通过的。这里要提一句，如果我们使用 git 对上一节的内容做了版本，那么这次运行的只是新添加的测试内容。Jest 的这个特点，一方面是大大提高了跑测试的速度，另一方面也鼓励咱们开发的时候坚持一个最佳实践，就是测试没通过的代码，不要做版本。
