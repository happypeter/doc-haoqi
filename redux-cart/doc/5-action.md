# 修改状态树

添加商品到购物车中，就涉及到修改状态树的操作。Redux 规定，必须先发 action ，触发相应的 reducer 去修改状态。


### 安装 redux-logger 监控 action

```js
npm i redux-logger
```

redux-logger 是一个辅助开发的工具。

logger--

store/index.js 中导入 applyMiddleware ，也就是应用中间件接口，导入刚安装的 logger ，createStore 接口的第二个参数中，就可以写 applyMiddleware ，加载一下 logger 。这样 logger 就生效了。

### 发出 action

页面中有事件被触发后，可以发出 action 来。


button---


Products.js 中添加了一个购买按钮，用户点一下按钮就会执行 handleClick 函数，参数是当前商品的 id 。到 handleClick 函数中，store.dispatch 接口用来发出 action 。 一个 action 由两部分组成，首先是 tyoe 也就是类型，我们这里类型为 `ADD_TO_CART` ，另外一部分是负载数据，我们这里就是 productId 。

浏览器中，点一下购买按钮，开发者 工具中就可以看到发出的 action 了。
