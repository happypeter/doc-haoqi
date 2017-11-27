# 热加载 Redux Reducers

修改 `store.js` 文件，添加下面代码：

```
if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}
```
