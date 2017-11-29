# 异步请求

### 伪造一个 API


api/post.js 中

```
setTimeout(cb(_posts), 2000)
```


#### 引入 redux-thunk

thunk 的意思是“模式转换”，有了 redux-thunk ，redux 的工作模式就会发生一定的“转换”，具体来讲就是[官网](https://github.com/gaearon/redux-thunk)上说的

>Redux Thunk middleware allows you to write action creators that return a function instead of an action

翻译：Redux-thunk 中间件允许我们的 action creator 不直接返回 action ，而是去返回一个函数。（这样做的目的，就是为了实现异步操作）。

Redux-thunk 解决的问题是：**异步操作** 。没有 thunk 之前，一旦用户点按钮，aciton 立即被发出，reducer 立即执行，store 立即改变。这个是 redux 默认工作机制。但是这种机制在很多情况下是不能满足要求的，例如，用户点按钮之后，action 中要携带的数据需要从网络上读取的这种情况。有了 thunk 之后，即使要等很长时间也没有问题，因为 diptach 操作可以等待网络请求结束之后再去执行。

先来装包

```
npm i redux-thunk
```


然后到 store.js 中加载使用即可。
