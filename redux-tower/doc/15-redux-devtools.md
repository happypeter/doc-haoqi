# Redux Devtools 的妙用

修改 `store.js` 文件

```
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(rootReducer, defaultState, enhancers);
```
