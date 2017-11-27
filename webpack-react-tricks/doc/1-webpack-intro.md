# Webpack 简介

Webpack 是一个专门为摩登 JS 应用开发而生的**模块打捆器**（ Module Bundler ）。安装 Webpack 就用 `npm install -g webpack` 就可以。 理解 Webpack 的功能，首先要理解它的四大概念。

### Entry 入口文件和 Output 出口文件

Webpack 既然是个打捆器，也就是说可以把很多 JS 文件打捆成一个 JS 文件，了解打捆，主要涉及到 Entry 和 Output 两个概念。

Entry 文件就是整个项目的入口文件，所有其他的 JS 模块文件都作为这个文件的儿孙导入进来(这里可以使用 ES6 模块格式，或者其他几种常用模块格式也可以)。相对于 Output 出口文件，Entry 入口文件是整个 Webpack 打包过程的被操作对象，出口文件 Output 用来指明出口文件的名字，习惯上叫做 bundle.js 。


webpack.config.js 中会写成这样：

```js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};
```

### Loader 加载器

Webpack 默认只认纯粹的 JS 文件，那对于 ES6 文件，React 文件，CSS 文件，等等其他格式，Webpack 就无能为力了吗？NO，Webpack 是超级灵活的，可以通过添加各种 loader 来把其他格式的文件，先翻译成 JS ，然后进行打包处理。

例如：

webpack.config.js

```js
const config = {
  ...
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};

```

### Plugins 插件

Webpack 还可以通过添加各种 Plugins 来丰富自己的功能。其他开发环境下能做的一些操作，例如文件压缩，使用 html 模板，等等各种功能，Webpack 这里也一样可以做到，只需要添加合适的插件进来即可。

```JS

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm

const config = {
  ...
  plugins: [
    new webpack.optimize.UglifyJsPlugin(), // webpack 内置有一些 plugin
    new HtmlWebpackPlugin({template: './src/index.html'}) // 另外一些可以通过装包实现
  ]
};

module.exports = config;
```

### Webpack 有何独特优势？

我只说两点：

第一，Webpack 的 Code Splitting 代码分割功能。

第二，Webpack 是 React 开发的事实标准。做 React 开发的人，大家基本都用 Webpack 。
