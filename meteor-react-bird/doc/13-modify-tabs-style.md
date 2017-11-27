# 修改导航栏的样式

本节将讲述如何采用 inline styles（内联样式）定义导航栏的样式，涉及到如何修改 Material-UI 组件的默认样式，还有 Radium 的使用。

### 修改 Tabs 的样式

现在导航栏的周边有一点儿空白，这是由浏览器的默认样式造成的，可以通过 Chrome 开发者工具检查出来，所以要给 `<body>` 标签添加样式，修改 `main.html` 文件：

```
<body style='margin: 0'>
```

保存文件，访问网页，你会发现导航栏周边的留白已经不见了，好看了些。不过，我觉得导航栏还不够完美，比如说导航栏的宽度太窄，三个 tab 标签位置应该居右显示等。接下来，我们就更改 Material-UI 组件的默认样式，让导航栏变得更漂亮些。

首先要说明的是，在 React 组件中编写样式，要遵循 React 组件的 [inline styles](https://facebook.github.io/react/tips/inline-styles.html) 语法规则，与我们之前所熟悉的有些差异。

Material-UI 的所有组件都采用 inline styles，每个组件会有一个 `style` 属性，可以通过 `style` 属性值更改组件最外层 HTML 元素的样式，那内部 HTML 元素的样式则由组件的其它属性决定，比如 Tabs 组件的红色下划线的样式可以由 Tabs 组件的 `inkBarStyle` 属性来更改。组件并不支持更改所有内部元素的样式，若您有此需求，可以到 GitHub 的 Material-UI 项目中发布请求。关于 Material-UI 组件的 inline 样式，详情参考[这里](http://www.material-ui.com/#/customization/inline-styles)。

查看代码更改: [修改 Tabs 的样式](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/d7d89284fde41f1f40c0b30770520ad326723e58)

这样，一个漂亮的导航栏就完成了。不过会有一个疑问，修改 Material-UI 组件样式需要手动添加厂商前缀吗？答案是不需要，Material-UI 底层通过 [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) node 包为组件自动添加厂商前缀。那我们自定义组件样式如何处理厂商前缀呢？借助 [Radium](http://stack.formidable.com/radium/)，下面将详细介绍。

### 使用 Radium 包

首先安装 Radium 的 node 包，运行命令：

```
npm install --save radium
```

安装完毕之后，就可以在 Meteor 应用中使用 Radium 了。Radium 是一个可以用来轻松编写 React 组件样式的工具箱。Radium 的官方文档列出了它的六项功能：

* 从概念上讲简单拓展了普通 inline styles 的功能
* 支持 :hover、:focus 和 :active 浏览器状态样式
* 媒体查询
* 自动添加厂商前缀
* Keyframes 动画助手
* 支持 ES6 class 和 createClass 语法

看到 Radium 提供的这些功能，真是消除了在使用 inline styles 的时候，我们经常会产生的疑问。废话少说，赶紧动手用起来。做些准备工作，分别修改 `App.jsx` 和 `NavBar.jsx` 文件，再添加一些样式代码进来。组件样式采用了 flexbox 布局方案，因为各个浏览器厂商对 flexbox 还没有完全支持，需要添加厂商前缀，可以很好的测试 Radium 的第四个功能。现在就要把 Radium 用起来了，在组件文件开头导入 `Radium` 功能模块：

```
import Radium from 'radium'
```

然后就是把 React 组件作为参数传递给 `Radium()` 方法，以我们的 App 组件为例：

```
export default Radium(App);
```

查看更改：[使用 Radium 包](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/e862390dc02342a6817fae3336fc3e58cb544911)

这样，Radium 就会自动为我们的组件样式添加厂商前缀了。Radium 底层也是使用的 [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) node 包，它不会给样式属性添加所有的厂商前缀，而是先检测你用的浏览器，根据具体的浏览器参数为样式属性添加合适的厂商前缀。
