# 美化导航栏

前一小节我们实现了一个很难看的导航栏，本节就要把导航栏做的漂亮些，主要涉及到的是 Material-UI 的 Tabs 组件的使用，还有一个更深入的 React Router 知识点。

### 使用 Tabs 组件

前面我们已经知道了，如何在 Meteor 应用中使用 Material-UI 组件，但是这种方式有一个缺点，每引入一个组件都要用 `<MuiThemeProvider></MuiThemeProvider>` 标签包裹起来，若自己定义的组件中有多个 Material-UI 组件的话，代码看起来就很冗余，所以本节介绍另外一种使用 Material-UI 组件的方法，利用 context 设置 Material-UI 组件主题。详情参考 [自定义主题](http://www.material-ui.com/#/customization/themes) 一章的 __Using context__ 部分的内容。

首先，修改 `imports/ui/App.jsx` 文件，仅列出需要添加的代码：

```
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }
...
}
 App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
```

另外，与之配套的是在 `imports/ui/shared/NavBar.jsx` 文件，添加下面三行代码：

```
NavBar.contextTypes = {
  router: React.PropTypes.object.isRequired
}
```

这种方式，其实是由 React 提供的 [context](https://facebook.github.io/react/docs/context.html) 功能实现的。另外，还需要在 `NavBar.jsx` 文件中，添加 Material-UI 的 [Tabs](http://www.material-ui.com/#/components/tabs) 组件。此时，查看页面会看到一个蓝色的导航栏。导航栏的样式是可以修改的，不过本节不涉及。

查看代码更改：[使用 Tabs 组件](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/2a3d4328d355c7664443e6f28fe43af1b83fa35d)

注意：这里就涉及到了，inline style 使用的一个重要的知识点了，就是通过 context 机制传数据。后续对 inline style 我们还会有更多介绍。简单来说，使用 context 传数据的好处是各级 children 一次性设置完毕，而不用一级一级的传递 props 了。

### 可控模式的 Tabs 组件（controlled Tabs）

现在页面中是有了一个高大上的导航栏，但是没啥鸟用。继续修改 `NavBar.jsx` 文件，这次我们要给 Tabs 组件中的每个子组件 Tab 添加一个 value 属性，并且 value 的属性值与路由相对应，然后再给 Tabs 组件添加一个 onChange 事件，其对应的事件处理器是 handChange（注：代码中方法名为 handChange，不过 hand 改为 handle 语义上才正确）。经过这番修改，原来的 Tabs 组件就变成了可控模式的 Tabs 组件了，其用法参考 [Tabs](http://www.material-ui.com/#/components/tabs) 文档中 __Controlled example__ 中的代码实例。此时，点击导航栏中的标签就会触发 Tabs 组件的 onChange 事件处理器，打开浏览器中的 console，相应的 Tab 组件的 value 值就打印出来了。

查看代码更改：[使用可控模式的 Tabs 组件](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/fd2baf707a65fb9841e5ff90b2fce37f34c8c99f)

### Tabs 导航栏生效了

既然我们已经能够得到 Tab 组件的 value 值了，那怎样真正的利用它们呢。这就涉及到 React Router 的另一个知识点了 —— [context.router](https://github.com/reactjs/react-router/blob/master/docs/API.md#contextrouter)。这里的 context 是 React Router 利用 React 的 context 功能给子组件传递数据，如这里的 router 变量，具体是一个对象变量，其包含我们要用到的 [push](https://github.com/reactjs/react-router/blob/master/docs/API.md#pushpathorloc) 方法，使用方式：

```
this.context.router.push('/login')
```

这样就会把地址栏中的路径更改为 '/login'，从而渲染与之对应的 LogIn 组件。

查看代码更改：[Tabs 导航栏生效了](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/79bd23de8ef18b4671208e1a5376ef1be68ca2c7)

这时，在页面中点击不同的 tab 标签，相应的也会渲染不同的组件内容。欧耶，导航栏可以工作了，但并不完美，如刷新页面，处于选中状态的 tab 标签变成了 `HOME` 标签，而不是 原来被选中的标签。下一节就解决这个问题。

