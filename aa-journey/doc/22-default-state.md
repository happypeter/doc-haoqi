# 什么时候使用 defaultState ？


在 createStore() 的时候我们可以传入 defaultState ，但是一般来讲整个状态树的初始值不用这种方式来传入，而是到各个 reducer 中去设置初始值。相关的讨论可以参考[这里](https://css-tricks.com/learning-react-redux/) 。

本节的主体内容是对代码进行了重构，把获取分类列表的工作方式做了修改，由原来的组件内部 state 值的形式改成了由 redux 和 redux-thunk 来完成的形式。具体代码如下：

- [fetchCats()](https://github.com/happypeter/aa-journey-demo/commit/6883053d7baafec0b750362213229e3de990d6b7)
