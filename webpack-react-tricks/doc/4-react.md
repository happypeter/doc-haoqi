# Webpack 编译 React

这集来演示使用 Webpack-Babel 环境编译 React 项目，因为 Babel 本来就是有能力编译
React 的，所以配置稍微改改，编译就能成功了。

### 写一个简单的 React 组件

先来装包：

```
npm install --save react react-dom
```

上面 `react` 这个包用来提供 React 的核心功能，react-dom 来帮助我们把 React
组件显示（术语也叫”渲染“ 英文叫 render ）到浏览器之上。


把上一集的 a.js 改名为 App.js（ React 的组件文件名字要大写），内容改成下面这些：


```
import React, { Component } from 'react';

class App extends Component {
  render(){
    return(
      <div>
        App
      </div>
    )
  }
}

export default App;
```

然后 index.js 改为

```
import App from './App';
import ReactDOM from 'react-dom';
import React from 'react';


ReactDOM.render(<App />, document.getElementById('app'));
```


### 编译一下

运行

```
cd webpack-es6
webpack
```

进行项目编译，但是报错了：

```
ERROR in ./src/index.js
Module build failed: SyntaxError: Unexpected token (5:16)

  3 |
  4 |
> 5 | ReactDOM.render(<App />, document.getElementById('app'));
    |                 ^
  6 |
```

上面 ` Unexpected token` 意思是”未识别的符号“，你会说奇怪呀下面箭头指向的 `<App>` 没问题呀，
就是 React 的标准写法呀？对，代码没问题，但是编译都通过不了，那肯定是编译环境有问题呗。

### 安装

到 [Babel 的官网](https://babeljs.io/)，首页上就能看到除了能编译 ES6 ，Babel 还可以编译 JSX ，也就是可以编译 React 的，但是跟编译 ES6 一样，编译 React 也是要设置 Preset 的。


第一步，装包

```
npm i --save babel-preset-react
```

第二步，修改 .babelrc 文件，为

```
{
  "presets": ["es2015", "stage-0", "react"]
}
```

### 使用 server

```
Download the React DevTools and use an HTTP server (instead of a file: URL) for a better development experience: https://fb.me/react-devtools
```

下一集来介绍 webpack-dev-server
