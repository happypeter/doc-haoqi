# 把 State 存放到 Store

Redux 是数据管理工具。使用 Redux 的最重要的一句话：

> 一切数据都要保存的 Store 之中，组件自己不保留 state 数据

### 创建 Store

先来安装 redux 。

```
npm i --save redux
```

redux 并不是 react 的一部分。

下面要加载 redux 。

```js
import { createStore } from 'redux'
import rootReducer from '../reducers'

const store = createStore(rootReducer)

export default store
```

创建 src/store/index.js 文件。首先导入 createStore 接口，顾名思义，这个就是用来创建 store 的。然后导入 rootReducer ，reducer 是一个用来修改 store 的函数，也是 redux 的核心组成部分之一。定义 store 常量来存放 store ，createStore 接口中传入 rootReducer 。最后把 store 默认导出。

### 数据写到 reducer 中

store 有了，但是数据放到哪里呢？

reducers/index.js

```js
const initialState = [
  {
    id: 'wewe2122',
    text: 'hello'
  },
  {
    id: 'wqewqeq23',
    text: 'hi'
  }
]

const rootReducer = (state = initialState, action) => {
  return state
}

export default rootReducer
```

创建 reducers/index.js 文件，定义 initialState ，中文意思是初始状态值，来存放评论数组。

下面 reducer 其实就是一个函数，作用就是修改应用状态，一个应用所有的数据，我们把它叫做状态树，那 reducer 就是用来修改状态树的。修改的方式是把之前的状态树，作为第一个参数 state ，最后输出的新状态树就是 return 值，暂时我们直接 return state ，也就是对状态树不做任何修改。Action 是用户行为数据，用来做修改依据，暂时先忽略它，后面会用到。

这样，评论数组作为 reducer 的状态值传入，同时 store 又加载了 reducer ，这样数据移动到 store 的工作也就完成了。

### 读取 store 中的数据

那组件中如何读取 state 呢？

```js
import store from '../store'

  submitCmt = e => {
    e.preventDefault()
    this.setState({
      text: ''
    })
  }

   const comments = store.getState()
```

到 CommentBox.js 中，先导入 store 。submitCmt 函数中关于添加评论的代码现在都不能工作了，直接删除。然后使用 getState 接口就可以拿到 store 中保存的所有评论了。

浏览器中，可以看到评论依然能够正确显示。
