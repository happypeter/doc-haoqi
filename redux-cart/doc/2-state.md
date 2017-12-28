# 使用内部 state 实现商品列表

先来做商品列表，暂时性的把商品数据放到组件内部的 state 中，以便让列表先显示出来。

### 添加 Products 组件

分为展示和容器两部分来添加 Products 也就是商品列表组件。

Main.js

```js
import React, { Component } from 'react'
import ProductsContainer from '../containers/ProductsContainer'

class Main extends Component {
  render() {
    return (
      <div>
        <ProductsContainer />
      </div>
    )
  }
```

Main.js 中导入容器组件 ProductsContainer ，放到下面 render 函数中显示出来。

ProductsContainer.js

```js
import React from 'react'
import Products from '../components/Products'

export default () => <Products />
```

添加 containers/ProductsContainer.js 文件。里面写成一个无状态组件，返回展示组件 Products 。

Products.js

```js
import React, { Component } from 'react'

class Products extends Component {
  render () {
    return (
      <div>
        Products
      </div>
    )
  }
}

export default  Products
```

添加展示组件 components/Products.js 文件。里面写一个 class 组件
，显示一个占位符字符串 Products 。

浏览器中，显示出了 Products 字符串。

### 使用组件内 state 做数据

现在来来显示出一个商品列表。

Products.js

```js
import React, { Component } from 'react'

class Products extends Component {
  state = {
    products: [
      {
        id: '324',
        name: '苹果电脑'
      },
      {
        id: '452',
        name: '橘子'
      }
    ]
  }
  render() {
    const { products } = this.state
    const productList = products.map(t => <div key={t.id}>{t.name}</div>)
    return (
      <div>
        <h2> 所有商品 </h2>
        {productList}
      </div>
    )
  }
}

export default Products
```

到 components/Products.js 中， state 中添加一个常量 products ，是一个对象数组，每一个 product 对象，包含 id 和 name 两项内容。下面，解构赋值拿到 products ，map 一下，把生成的 jsx 赋值到 productList 常量，并最终在 return 语句中显示出来。

浏览器中，看到商品列表显示出来了。
