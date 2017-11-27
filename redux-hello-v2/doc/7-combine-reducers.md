# Store 中添加多类数据

现在我们把应用做的复杂点，添加另一类数据，也就是文章（ post ）数据。来看一下 store 中如何来处理多类数据。主要涉及到 combineReducers 这个接口的使用。

### 讲解一下 combineReducers

如果写成这样

```
const rootReducer = combineReducers({
    comments: commentReducer,
    posts: postReducer
})
```

这样，未来如果 state 代表整个状态树，那么 state.comments 拿到的就是评论数据， state.posts 拿到的就是 posts 数据。


代码：[combineReducers](https://github.com/happypeter/redux-hello-v2/commits)
