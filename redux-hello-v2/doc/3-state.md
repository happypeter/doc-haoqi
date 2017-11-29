# 内部 State 使用

这一集不涉及 Redux ，我们只是使用每个组件自己的 State 来达成基本评论框效果。

要求：不需要使用后台。直接把假数据设置到 state 变量里面。然后每次点提交按钮的时候
，也只是修改组件内部的 state 。

这里的体现出 React 的特点，就是所有的组件显示出来的动态数据，都要存放到 state 值之中。

设置一个 state ，就叫 comments 。

```
this.state = {
  comments: [
    'hello1',
    'hello2'
  ]
}
```

然后涉及的都是对这些数据的显示和操作了。

代码: [submit comment](https://github.com/happypeter/redux-hell-v2o/commis)
