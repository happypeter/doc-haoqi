# 引入 Material-UI 组件库美化页面

### 安装 material-ui 包

首先，安装 [materail-ui](https://www.npmjs.com/package/material-ui) 包：

```
npm install --save material-ui
```

然后，再安装 Material-UI 的依赖包 [react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin)：

```
npm install --save react-tap-event-plugin
```

打开 `src/index.js` 文件，导入并使用 `react-tap-event-plugin` 提供的 `injectTapEventPlugin` 方法：

```
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
```

Material-UI 的一些组件会借助 `react-tap-event-plugin` 包提供的功能，增加组件在移动设备上的体验。参考文档 [Material-UI 安装](http://www.material-ui.com/v0.16.0/#/get-started/installation)

### 使用 Material-UI 组件

Material-UI 从版本 v0.15.0 开始，自带了两套主题色：浅色和深色，默认组件使用浅色主题。在使用 Material-UI 组件之前，需要先选定一套主题色，才能使用 Material-UI 组件。本案例使用的 Material-UI 的版本是 v0.16.0，所以我们要先设置组件主题色。Material-UI 提供了不同的设置主题色的方式，其中一种是使用 React 组件的 [context](https://facebook.github.io/react/docs/context.html) 机制设置主题色，也是本案例采用的方式。

新建 `src/ui/App.js` 文件，添加代码:

```
import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme() };
  }

  getStyles() {
    const styles = {
      root: {
        paddingTop: '47px',
        minHeight: 400,
      }
    };
    return styles;
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.root}>
        <RaisedButton label='React 手牵手' primary={true} />
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;
```
