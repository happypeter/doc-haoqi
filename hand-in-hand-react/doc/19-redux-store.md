# 创建 Redux Store 传递给 React 组件

### 安装包 npm 包

```
npm install --save redux react-redux redux-thunk
```

* [redux](https://www.npmjs.com/package/redux) JavaScript 应用程序的状态容器。
* [react-redux](https://www.npmjs.com/package/react-redux) React 绑定库，连接 React 和 Redux，让 React 组件可以获取 Redux Store 存储的状态数据
* [redux-thunk](https://www.npmjs.com/package/redux-thunk) 一个 Redux 中间件，管理 Redux 中的异步数据流

### Provider 组件包裹路由模块

打开 `src/routes.js` 文件，从 `react-redux` 包中导入 `Provider` 组件：

```
import { Provider } from 'react-redux';
```

然后，从自定义的模块 `./redux/store` 中导入 `store` 对象，这个 [Redux store](http://cn.redux.js.org/docs/api/Store.html) 还没有创建。

```
import { store } from './redux/store';
```

接下来，就是用 Provider 组件包裹路由模块，并把应用中创建的 `store` 对象传递给各级子组件，若在子组件中访问 `store` 中的 state 的时候，就不需要再手动导入 `store` 对象了。

```
<Provider store={store}>
  <Router history={browserHistory}>
    ...
  </Router>
</Provider>
```

* [<Provider store>](http://cn.redux.js.org/docs/react-redux/api.html)

### 创建 Redux Store

新建文件 `src/redux/store.js`，创建一个 store：

```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
```

* [createStore](http://cn.redux.js.org/docs/api/createStore.html)
* [applyMiddleware](http://cn.redux.js.org/docs/api/applyMiddleware.html)
