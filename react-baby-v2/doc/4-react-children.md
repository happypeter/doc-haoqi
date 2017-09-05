# Children

往一个组件内部传入信息，不仅仅有 props 这种形式，还可以用 children 。

### 什么是 Children ？

如果我是一个 React 组件，那么用我的开始标签和结束标签包裹起来的部分就是我的 children 。

```
<HelloWorld>children here</HelloWorld>
```

未来在组件内部要引用，就使用下面的方式

```
this.props.children
```
