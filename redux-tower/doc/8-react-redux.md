# React 和 Redux 搭建友谊的小船

目前，我们已经了解了 Redux 的三个核心概念，不过项目中的 React 组件并知道 Redux 的存在，需要通过 [React Redux](https://github.com/reactjs/react-redux) 把它们 React 和 Redux 绑定起来。

### Redux Store 用起来

修改 `src/index.js` 文件，修改代码如下：

```
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      ...
    </Router>
  </Provider>
)
```

参考文档:

* [Provider](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store)
* [React 和 Redux 绑定起来](http://redux.js.org/docs/basics/UsageWithReact.html)
* [初始化 Store 中的状态变量](https://egghead.io/lessons/javascript-redux-supplying-the-initial-state?course=building-react-applications-with-idiomatic-redux)
