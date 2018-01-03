# 数据搬家到 redux store 中

redux 的所有优势都基于组件内的 state 会被存储到中央 store 中, store 中会保存全项目的所有 state ，这些数据会组成一个大的对象，叫做状态树。

### 运行一个基本的 store

装包

```
npm i redux
```

然后把 store 运行起来。

store/index.js

```js
import { createStore } from 'redux'
import rootReducer from '../reducers'

const store = createStore(rootReducer)

export default store
```

创建 store/index.js 。导入 createStore 接口，导入 rootReducer ，createStore 接口唯一一个必填参数就是 reducer ，这样可以生成 store ，然后导出一下。

```js
const initialState = {
  myData: 'hello'
}

const rootReducer = (state = initialState, action) => {
  return state
}

export default rootReducer
```

创建 reducers/index.js 。先来定义一个常量叫做 initialState ，中文意思是初始状态，里面放一个 myData 属性作为占位符。下面定义 rootReducer ，一个 reducer 是一个函数，专门用来修改状态树的。要有两个参数，一个是 state ，这里我们用 ES6 的参数默认值的形式，把 initialState 传递给它，第二个参数叫 action ，后面的小节中会用到。reducer 中可能会有很复杂的运算，但是这里我们只是返回了 state ，也意味这没有对状态树做任何修改，直接返回了状态树。最后导出 rootReducer 。

```js
import React, { Component } from 'react'
import store from '../store'

class Products extends Component {
  render() {
    console.log(store.getState())
    const { products } = this.state
```

到展示组件 Product.js 中，使用 getState 接口，就可以读出 store 中存储的数据。在终端中打印一下。

浏览器中，打开开发者工具，可以打印出 store 中存储的 initalState 数据了，表示 store 运行良好。

### 购物车数据移动到 store 中

redux 的原则是组件不维护自己的 state ，所以来把 Products 组件内的 state 移动到 store 中

store/index.js

```js
const initialState = {
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

const rootReducer = (state = initialState, action) => {
```

store/index.js 中把购物车的数据替换了原有的 myData 。


```js
import store from '../store'

class Products extends Component {
  render() {
    const { products } = store.getState()
    const productList = products.map(t => <div key={t.id}>{t.name}</div>)
    return (
      <div>
```

到 Products.js 中，删除组件内的 state ，下面显示 store 中读取到的 products 数据。

浏览器中，如果商品列表照常显示，表示从 store 中读取数据的操作成功了。
