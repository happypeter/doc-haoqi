# Webpack-Babel 编译 ES6

ES6 的各种语法浏览器并不是完全支持，所以如果我们要在项目中使用 ES6 还是需要编译的。那这个编译器就是
[Babel](https://babeljs.io/) 。虽然单独使用 Babel 也可以编译 ES6  ，但是本节中我们用 Webpack 中添加 Babel Loader 的形式来进行 ES6 的编译。案例代码会非常简单，作为我们实际使用 Webpack 的开场。


### 装包

首先新建一个项目，并通过 npm init 把它初始化为一个 nodejs 项目

```
mkdir webpack-es6
cd webpack-es6
npm init -y
```

最后一个命令执行完毕，package.json 文件就生成了，可以开始装包了

```
npm i --save babel-loader babel-core babel-preset-es2015 babel-preset-stage-0
```

上面


添加 .babelrc 文件：

```
{
  "presets": ["es2015", "stage-0"]
}
```

上面，安装 babel-preset-es2015 这个包以及在 .babelrc 中写入 `es2015` 使得 Babel 启动了 ES6( 也就是 ES2015 )的编译支持。但是 stage-0 （ ES7 的第0阶段提案功能）的包和 .babelrc 中的设置也是必要的，不然实际使用中也会出现某些语法编译不过去的错误。


> 注意：我的系统上 webpack 已经用 `npm i -g webpack` 全局安装过了

接下来写 webpack.config.js 文件

```js
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  }
};
```

要被编译的 src/index.js 文件如下：

```js
class Bar {
  doStuff() {
    console.log('stuff');
  }
}

var b = new Bar();
b.doStuff();
```


为了展示浏览器中的运行效果，来添加一个 index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <script src="./dist/bundle.js"></script>
</body>
</html>
```



### 编译执行

现在就来运行命令进行编译

```
cd webpack-es6
webpack
```

执行 webpack 命令的时候，默认就会去加载当前位置的 webpack.config.js 中的配置内容，
于是 Webpack 就可以找到配置文件中指明的 Entry （入口文件），通过 babel-loader 来把入口文件
中的 ES6 的内容编译成 ES5 ，并且输出到出口文件 Output ，也就是 dist 文件夹之内的 bundle.js 文件。


要看执行效果，就用 Chrome 浏览器打开 index.html 文件，同时打开 chrome 开发者工具，这样就可以终端中
输出了

```
stuff
```

证明代码执行成功了。

也可以手动打开 dist/bundle.js 看一下，就会发现本来写到 index.js 中的 ES6 语法，现在都已经被编译成
了 ES5 语法了。
