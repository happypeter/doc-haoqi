# 使用 react-router 实现“多页面”的单页面应用

SPA 应用开发的一个挑战就是，怎么样给让单页面应用上看起来是有“多个页面”的。这个涉及到的就是“路由控制”（ route ）的问题。本节咱们来通过 [react-router](https://github.com/rackt/react-router) 来实现路由功能。


### 全部代码

[react router](https://github.com/happypeter/react-transform-boilerplate/commit/153edae4d99322be03d97e0a989fdea594c98951)


### 安装 react-router

```
cnpm i -D react-router@^2.0.0-rc4
```

### 使用 context.router

[React 提供了 context](https://facebook.github.io/react/docs/context.html) 功能，用来很方便的在组件之间传递数据。如果要在 [ES6 语法中使用 context](https://github.com/rackt/react-router/issues/1059)，需要下面的格式：


```
...
class NavBar extends Component {
  constructor(props, context) {
    super(props, context);
  }
}
...
NavBar.contextTypes = {
    router: React.PropTypes.object.isRequired
};
...
```

上面的 [router](https://github.com/rackt/react-router/issues/2646#context-router) 是 react-router 提供的。


### 使用 H5 的 pushstate() 接口

较老版本的 react-router 中要实现挺麻烦的，需要安装 [history](https://www.npmjs.com/package/history) 这个包，另外代码也比较啰嗦。从 react-router@2.0.0 开始变得简单了，一个 [browserHistory](https://github.com/rackt/react-router/blob/latest/upgrade-guides/v2.0.0.md#using-browser-html5-pushstate-history) 就搞定了。

### 结语

这样就让单页面应用中看起来有了多个页面。
