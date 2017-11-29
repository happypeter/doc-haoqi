# 加载 CSS

项目中肯定会用到 CSS 的，所以这集来演示 Webpack 如何通过 loader 的形式来加载 CSS 。同时给 CSS 加上厂商前缀。


### 导入 CSS

默认情况下，导入 css 文件到组件中肯定会报错的，需要先安装两个 loader ：

```
npm install style-loader css-loader --save
```

然后 webpack.config.js 改成这样

```
var path = require('path');

module.exports = {
  devtool: 'source-map',
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
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
     }
    ]
  }
};
```


App.js 添加

```js
import './css/main.css';
```

其中的 css/main.css 文件写成这样

```css
body {
  display: flex;
  background-color: #bada55;
}
```

后台运行

```
npm run dev
```

这样浏览器中打开项目就能看到 main.css 已经生效了。

### 用 postcss-loader 添加厂商前缀

从 chrome 的开发者工具中可以看到，代码运行起来 `display: flex` 这个语句没有被自动添加厂商前缀，下面我们来解决这个问题。

自动添加 CSS 的厂商前缀会用到 autoprefixer ，这个是由 postcss 为我们提供的，所以现在先来安装 postcss-loader


```
npm install postcss-loader --save
```

添加一个 postcss.config.js 内容如下

```
module.exports = {
  plugins: [
    require('autoprefixer')({ /* ...options */ })
  ]
}
```

webpack.config.js 中的 loader 改成这样

```js
{
  test: /\.css$/,
  loaders: [
    'style-loader',
    'css-loader',
    'postcss-loader'
  ]
}
```


### Sass 或者 CSS Module

实际项目中很多人使用 Sass（需要再安装 sass-loader ） ，也有一些人使用 CSS Module（ postcss 可以支持）。这个看项目复杂度吧，小项目就用纯 CSS 就行，大一点的用 Sass （可以 import 多个 css 文件），更复杂的项目用 CSS Module 似乎是非常帅的，我还没有用过。
