# 使用 Webpack 来处理 sass

前面咱们用 gulp 来处理 sass 文件，这里来切换到 webpack 下实现相同的功能。


### 全部代码

[webpack sass loader](https://github.com/happypeter/react-transform-boilerplate/commit/4c0306d8e8573247d4e6400ebbdb2584e8c2e915)

### 安装 loader

```
$ cnpm i -D style-loader css-loader autoprefixer-loader sass-loader node-sass
```
注意：-D 和 --save-dev 是等价的。


### 修改配置

然后到 webpack.config.js 来添加 loader 的配置

```
    module: {
        loaders: [
          { test: /\.scss$/, loader: 'style!css!autoprefixer!sass' },
        ]
    }
  ```

### 导入 sass 文件。

到 main.js 中把 main.scss 导入一下就可以了。现在我们用 [ES6 模块](http://es6.ruanyifeng.com/#docs/module) ，用 import 就可以了 （ 原来按照 commonjs 格式，要用 require ）

```
import './style/main.scss';
```

### 结语

虽然 Peter 对 react 社区推行的 inline style 的理念完全支持，但是在相应的工具链成熟之前，sass 用用还是很方便的。