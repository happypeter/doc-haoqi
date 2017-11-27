# 修改 Store 中的数据

前面实现了从 Store 中通过 store.getState() 读数据。下面
我们来实现修改数据的操作。这个主要通过 Redux 三大概念的，另外两个：action ， reducer 来配合使用。

基本原理：组件发出 action ，action 触发 reducer ，真正修改
数据，是通过 reducer 来完成。

### 先来看 action

前面的用词是**组件发出 action** 可见 action 是名词。那么 redux 这里 action 其实就是一个如下的对象：

```
let action = {
  type: 'ADD_COMMENT',
  comment: "hello3"
}
```

action 对象有两个部分组成：

- 第一部分，要有一个 type 属性，值是一个字符串。
- 第二部分，payload ，也就是这个 action 携带的数据

上面的这个形式，让我们联想起了 axios 发 POST 请求（action 的接受方就是 reducer）。

发出一个 action 就是在组件内部：

```
store.dispatch(action)
```

就可以发出 action 。

发出之后，需要有专门对应的 reducer 进行接收。

### Reducer


reducer 作用就是接受 action ，然后根据 action 修改 store 中的数据。


### 执行流程

首先，用户点提交按钮

```
store.dispatch({type, payload})
```

然后，由 store.js 中的 commentReducer 来接收。

```
function commentReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [...state, action.comment]
    default:
      return state;
  }
}
```

当 `return [...state, action.comment]` 执行之后，
store.getState() 的值就被改变了。你可能会说，上面为什么不直接写

```
case 'ADD_COMMENT':
  state.comments.push(action.comment)
```

这个是因为，state 是不可改的，或者说必须保证 state 的只读特性，这是 redux 的专门要求。

### store.getState() 的局限

中读取评论数量的，但是为什么，store 数据更新后，页面上是不会自动 render 出新的数据的。好，如何解决？这个问题留到下一节中去回答。

代码： [action reducer](https://github.com/happypeter/redux-hello-v2/commits)
