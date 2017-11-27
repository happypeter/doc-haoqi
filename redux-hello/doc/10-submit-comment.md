# 修复评论功能

现在数据结构变了，那么同样的 commentReducer 肯定是失灵了，所以提交评论的功能肯定是不能用了。这一节来进行修复。

- [ADD_COMMENT works](https://github.com/happypeter/redux-hello/commit/2e2e5bb774a428e6eabd75c7353374ed9c253def)

注意，上面代码中使用了[对象展开运算符](http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html) ，它可不是 ES6 的内容，所以 Babel 中如果只有 ES2015 支持是不够的。可以加上 preset-stage0 支持，或者使用：

```js
{
  "presets": ["es2015"],
  "plugins": ["transform-object-rest-spread"]
}
```


上面的 commentReducer 可以改进一下：

```js
function commentReducer(state={}, action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {...state, [action.postId]: [...state[action.postId], action.comment]}
    default:
      return state;
  }
}
```
