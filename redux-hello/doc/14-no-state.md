# 组件内不出现 State


CommentBox 组件中还使用了 getState() 和 this.setState 这样的方式，这个都是不符合 redux 的基本思想的。所以调整一下：

[this.props.comments](https://github.com/happypeter/redux-hello/commit/62439a59e1d830e7dcbe544e058f75f1baf19b33)

注：为何不符合 redux 基本思想？那么 getState 不让用了，替代方案是什么？Redux 基本思想是

>组件不管理自己的 state

所以，如果要更新 state 值，那也不允许直接在组件内该。不用 getState 替代方式是：

>组件发出 action ，action 触发 reducer ，reducer 修改 store 状态树。

由于各个组件，都通过 react-redux 库的 Provider 和 connect 接口订阅了 store 中的数据，所以，只要 store 数据变化了，那么组件也是可以自动刷新的。
