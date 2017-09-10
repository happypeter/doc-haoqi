向 React 组件内传数据，不仅仅有 props 这一种形式，还可以使用 children 。

### Children 的传入方式

```
<Button>登录</Button>
```

### 组件内获取

Button.js 中这样写

```
this.props.children
```

就可以取到“登录”这个字符串了。


### children 也可以是组件

```
<Layout>
  <Main />
</Layout>
```

这种也是很常见的。
