# 《 Webpack-React 环境搭建技巧 》

Webpack react mole 课程太烂了，赶紧隐藏，
来一门改进版《 Webpack-React 环境搭建技巧》

- source-map 要加上
- 介绍部分，已经不用 require 了，现在用 ES6 模块了，babel 就可以处理了
- webpack-dev-server 的作用要介绍一下
- npm script 是相关知识，需要介绍
- create-react-app 要介绍，但是课程中以一步步搭建为主线
- Code Splitting 怎么搞


先从

```js
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  }
};
```

开始讲起
