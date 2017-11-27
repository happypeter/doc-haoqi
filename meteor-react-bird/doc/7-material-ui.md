# 使用 Material-UI

至此，一个非常简单的 Meteor + React 应用就跑起来了，我们既可以在应用中定义自己的 React 组件，也可以直接使用第三方提供的 React 组件库。本课程要使用的 React 组件库就是 [Material-UI](http://material-ui.com/) 。 Material-UI 是实现了 Google Material Design 风格的 React 组件库。本节来看看如何在 Meteor + React 的环境下使用它。

### 安装 Material-UI

安装目前 [Material-UI](https://github.com/callemall/material-ui#installation) 的最新版本，输入命令：

```
npm install --save material-ui@next
```

另外，我们还需要安装一个 Material-UI 的依赖包 [react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin#installation)

```
npm install --save react-tap-event-plugin
```

查看更改： [安装 Material-UI 以及依赖包](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/1d954b14e876f659f2c62636d93a1bb9ccd626e8)

### 使用 Material-UI 组件

要想让 Material-UI 组件正常工作，首先需要修改一下 client/main.jsx 文件：

```
import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Hello from '../imports/ui/Hello.jsx';

Meteor.startup(() => {
  injectTapEventPlugin();
  render(<Hello />, document.getElementById('app-container'));
});
```

查看更改： [使用 Material-UI 的依赖包](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/460baee4a6af067462ffea84a66cec2577bed8e1)

添加了两行新代码，为什么要添加这两行新代码呢？因为 Material-UI 组件要借助 react-tap-event-plugin 监听 touch 事件，[Material-UI 官方的文档](http://www.material-ui.com/#/get-started/installation) 有说明。不过，这是一个临时的解决方案，等 React v1.0 发布之后，就不需要这样操作了。

接下来，就要真正的使用 Material-UI 组件了。打开 imports/ui/Hello.jsx 文件，修改文件如下：

```
import React, { Component } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class Hello extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <RaisedButton label='material-ui' primary={true} />
      </MuiThemeProvider>
    );
  }
}

export default Hello;
```

查看更改： [使用 Material-UI 组件 RaisedButton](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/5cd4cffd1a1c581e6bbc6064093461e2155ae6cd)

在 Hello 组件中，添加了一个按钮组件 RaisedButton。如何导入一个 Material-UI 组件，参考[使用文档](http://www.material-ui.com/#/get-started/usage)

Material-UI 组件库主题的配色有两种：浅色和深色，默认使用浅色。请参考 [主题色](http://www.material-ui.com/#/customization/themes) 一章的文档。在使用 Material-UI 组件之前，必须先确定组件的配色，可以通过 MuiThemeProvider 组件的 muiTheme 属性设置。本节所使用的 RaisedButton 组件采用的配色是默认主题色。

### 结语

这样，访问 http://localhost:3000/ 页面会看到一个写着 `material-ui` 字样的蓝色按钮，鼠标点一下还有漂亮的波纹效果。
