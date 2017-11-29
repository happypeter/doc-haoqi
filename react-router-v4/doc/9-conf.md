# 2017 React 大会上的讲话

React Router 之父 Micheal 和 Ryan 最近在 React 大会上的讲座。很多内容是关于使用 API 的角度的，很有启发性，而且直接从文档上看不出来的，所以我总结出来跟你分享一下。

### 市场占有量 60%

- [时间点](https://youtu.be/Mf0Fy8iHp8k?t=44)

所有 React 项目中，有60%用的都是 React-Router 。


### Just Components

- [时间点](https://youtu.be/Mf0Fy8iHp8k)

V4 的变化最大的就是组件化。React 组件真的什么都能干，我可以用组件做动画效果，读取数据，读取 media-query 等，那么为何我们不能用组件来实现路由呢？所有的 API 都是组件。


<Route /> 组件是整个 react-router 的心脏。Route 的特点就是，一旦 url 匹配上 Route 组件的 path 属性值，对应的组件就会显示出来。

### Switch 组件

- [时间点](https://youtu.be/Mf0Fy8iHp8k?t=288)

如果两个 path 比较接近了，但是我们不希望它们同时都显示出来，我们就给它们包裹上 <Switch> 组件。这样就能保证，只有第一个匹配的 Route 会被显示。

### Link 和 Redirect

- [时间点](https://youtu.be/Mf0Fy8iHp8k?t=305)

如果你希望用户自己改变 url ，那你就给它们一个 Link 。如果你想用代码来改变 URL ，那你就用 <Redirect> 组件。

Peter 注：言下之意就会 <Route /> 组件不一定非要跟 Link 去配对用的。


### React Router 用于虚拟现实

- [时间点](https://youtu.be/Mf0Fy8iHp8k?t=759)
