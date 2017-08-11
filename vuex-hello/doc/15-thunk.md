# 引入 redux-thunk

thunk 的意思是“模式转换”，有了 redux-thunk ，redux 的工作模式就会发生一定的“转换”，具体来讲就是[官网](https://github.com/gaearon/redux-thunk)上说的

>Redux Thunk middleware allows you to write action creators that return a function instead of an action

翻译：Redux-thunk 中间件允许我们的 action creator 不直接返回 action ，而是去返回一个函数。（这样做的目的，就是为了实现一异步操作）。

Redux-thunk 解决的问题是：**异步操作** 。没有 thunk 之前，一旦用户点按钮，aciton 立即被发出，reducer 立即执行，store 立即改变。这个是 redux 默认工作机制。但是这种机制在很多情况下是不能满足要求的，例如，用户点按钮之后，action 中要携带的数据需要从网络上读取的这种情况。有了 thunk 之后，即使要等很长时间也没有问题，因为 diptach 操作可以等待网络请求结束之后再去执行。

先来装包

```
npm install --save redux-thunk
```

安装的版本是

```
"redux-thunk": "^2.2.0"
```



到 store.js 中，

```
import { createStore, applyMiddleware, compose } from 'redux';
```

- applyMiddleware: 使用中间件
- compose：构建


下面的代码是让我们的 redux 加载 thunk 中间件：

- [load thunk](https://github.com/happypeter/redux-hello/commit/473c8403d908b30cd4635d3a60830db82df3919a)

加载 thunk 之后，我们 dispatch（分发）action 的方式就有了很大变化。对 reducer 影响不大。

下面我们来创建 actions/commentActions.js 文件，里面会放很多函数，这些函数本身不是 action ，但是它们的返回值（或者说就是最终运算的结果是 action )，我们把这一类的函数叫 Action Creator （ Action 创建器）。

注：没有安装 thunk 之前，也是可以创建 Action Creator ，但是使用形式差别很大。但是有了 thunk 之后，Action Creator 的功能就变得很强大了。

下面的代码，使用了 redux-thunk ，虽然没有用它来完成任何异步操作：

- [thunk works](https://github.com/happypeter/redux-hello/commit/191c42a2c5d553e32f7ed331dc59bd1f4c046940)
