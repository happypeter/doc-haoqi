# 不要配置，只要组件

作为本课程的结尾篇，来总结一下 [React-Router 之父介绍 V4 的演讲](https://www.youtube.com/watch?v=Vur2dAFZ4GE&feature=youtu.be&t=1638) 中的核心思想。


### 没人喜欢小于 V4 的版本

演讲中 Micheal 自己拿出 React 老大  Dan 的[推文](https://twitter.com/dan_abramov/status/776096318351634433?lang=en)

>Actually to be honest nobody on React team liked React Router <v4

Micheal 自己调侃说：其实 React-Router 团队的人也是这么想的。

V4 之前的版本 API 的最大问题就是

>Fighting with the parent environment

和自己的爹（ React ）唱对台戏。总在尝试实现一些 React 本来就已经做的很好的事情了。举个例子

```
<Route onEnter={...}
```

上面的 `onEnter` 完全对等 react 的生命周期 componentWillMount 。

### 嵌套路由不要用了

  v3 的用嵌套路由对应组件嵌套的方式是很蠢得做法：https://youtu.be/Vur2dAFZ4GE?t=1638

### 如何解决跟爹唱对台戏的问题呢

  https://youtu.be/Vur2dAFZ4GE?t=1762

>What is the router is just component, we get rid of the entire idea of routes，Just components


### 参考资料

- [结合实际项目代码讲解 Router](https://www.youtube.com/watch?v=_Fzl0Cim6F8) 基本上是对咱们前面讲过的知识点的一个综合演练，看看，回忆一下咱们讲过的内容，感觉超棒。
