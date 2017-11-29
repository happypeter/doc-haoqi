# Switch 组件到底有啥用？

React Router 区别于其他语言框架下的 router 的一大特点就是一个 url 可以出发多个 Route ，同时显示多个 component 。这个让 React Router 实现 sidebar 等一些功能的时候变得非常方便，我自己的非常喜欢的。但是有些时候，也会造成一些麻烦。这时候，我们就要使用上 Switch 组件，它的作用就是，如果有多个 Route 都可以配对上 url ，那么就只去触发第一个 Route ，这样做有何实际用途呢？我们通过例子来说明。


### 例子

例子，来自[官方](https://reacttraining.com/react-router/web/example/ambiguous-matches) 。



### 404 页面

另外，前面我们介绍过，404页面的实现也要借助 switch 组件。其实看[Switch 的 API 文档](https://reacttraining.com/react-router/web/api/Switch) 上面说的 Switch 设计出来基本就是为了服务 /:user 和 404 这两种情况的。
