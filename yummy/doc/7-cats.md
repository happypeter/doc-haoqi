# 分类图标列表

制作首页上的业务分类的图标列表。

### 把 SVG 做成 React 图标的思考

还是有一些麻烦的，很多 svg 中的标签，例如 `t`，`p-id`， `class` 这些在 JSX 中都是不合法的，需要删掉。不过这些在 Chrome 中的 console 中都会给出警告，所以也很容易删除。

简单的方式是下面这种

```
import logo from './logo.svg'
...
<img src={logo} className="App-logo" alt="logo" />
```

但是这样，就不能在 css 文件中去修改 svg 的颜色了，不爽。

结论：反正一个应用中图标的数量也不会太多，干脆都做成组件吧。
