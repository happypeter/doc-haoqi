# 借助 React Devtools 演示 Redux 数据流

本节课程将借助 React Devtools 来演示一下 Redux store 的 [dispatch](http://redux.js.org/docs/api/Store.html#dispatch) 接口的使用，发送一个 Redux action，从而触发 Redux reducer，进而更新存储在 store 中的状态变量

```
$r.store.dispatch({type: 'INCREMENT_LIKE', index: 1})
```

参考文档 [Redux 数据流](http://redux.js.org/docs/basics/DataFlow.html)
