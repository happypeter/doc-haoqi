# 把 State 存放到 Store

Redux 是数据流管理工具。使用 Redux 的最重要的一句话：

>一切数据都要保存的 Store 之中，组件自己不保留自己的 state 数据


### 为何要统一存放到 Store 中？

把所有的数据都存放到 Store 中，然后所有的组件都订阅 Store 的数据。那么组件间通信岂不是就不成为一个问题了，not a issue anymore ，因为组件自己也不保留自己的 state 了。


### 创建 Store ？

先来装包：

```
npm i --save redux
```


到 src/redux/store.js 中先导入

```
import { createStore } from 'redux'
```

根据 createStore 的[官方文档](http://redux.js.org/docs/api/createStore.html) 需要传入一个参数。 这个参数就是 reducer 。

### reducer

reducer 和 store 一样是 redux 三大核心概念之一。说白了就是用来修改 store 中的数据的函数。

创建 src/redux/reducers/index.js 文件，来写一个 reducer

```
let comments = [
  'hello1',
  'hello2'
]

export default function rootReducer(state=comments, action) {
  return state
}
```

这样，回到  store.js 文件中

```js
import rootReducer from './reducers'

const store = createStore(rootReducer)
export default store
```

这样，store.js 就写好了。


代码： [add store](https://github.com/happypeter/redux-hello-v2/commits)


### 读取 store 中的数据

下面的代码实现了，数据存储到 store.js 同时组件内部读取 store.js 中的数据成功。最简单的方式是使用，

```
store.getState()
```

注意：后续我们会看到这个接口的局限。

代码：[getState](https://github.com/happypeter/redux-hello-v2/commits)
