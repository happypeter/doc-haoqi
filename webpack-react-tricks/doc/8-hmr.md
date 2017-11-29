# 模块热替换

前面我们用 webpack-dev-server 实现的效果叫做 hot reload ，意思就是代码只要一修改，那么浏览器页面自动就刷新，显示出最新的代码效果。但是这一集介绍的这个东西更酷，叫做 Hot Module Replacement ，模块热替换。到底酷在哪？一起来看看。

### 妥协一下

实际中发现，hot reload 的效果已经足够高效了，HMR 模块热替换这个效果配置起来比较复杂，带来不少麻烦。所以这一集里面我们只是去演示一下效果。不把这部分功能集成到我们自己的代码了。


https://github.com/gaearon/react-transform-boilerplate 这个项目 clone 下来，然后

```
npm i
npm start
```

这样就可以看到浏览器打开 localhost:3000 就可以看到一个 React 写的计数器应用已经跑起来了。

### HMR 有何优势？

第一点，页面不会刷新，更新的只是局部的显示。

第二点，因为页面不会刷新，页面上的一些状态不会被改变。例如，我们改变代码中的计数跨度值，页面上的计数是继续进行的，不会清零。


### 如何动手搭建自己的 HMR 效果？

完全可以参考上面给出的项目来进行修改，主要涉及的是 devServer.js 和 webpack.config.dev.js 中的包含 `hot` 的配置语句。


### 参考

- [HMR 的演示视频](https://youtu.be/eWmkBNBTbMM?t=1277)
