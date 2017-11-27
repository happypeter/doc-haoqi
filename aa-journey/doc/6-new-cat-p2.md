# 前端功能--基本环境搭建

后台 API 写好之后，应该把 API 文档补充上，具体格式可以参考：

[Github API](https://developer.github.com/v3/gists/comments/)

现在我们要进入 client/ 文件夹中开发前端代码了，首先来创建一个基本的 React Webpack 的开发环境。


### React-Webpack 基本环境准备

我们会用的 Webpack2 ，跟 Webpack1 的写法略有不同

webpack.config.js 写成这样：

```
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};
```


package.json 内容如下：

```
{
  "name": "aa-client",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack -w"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.15.3",
    "babel-core": "^6.23.1",
    "babel-loader": "^6.4.0",
    "babel-preset-env": "^1.2.1",
    "babel-preset-react": "^6.23.0",
    "react": "^15.4.2",
    "react-cookie": "^1.0.4",
    "react-dom": "^15.4.2",
    "react-router": "^3.0.2",
    "webpack": "^2.2.1"
  },
  "devDependencies": {
    "express": "^4.15.2"
  }
}
```

server.js

```js
var express = require('express');
var app = express();

app.use(express.static('build'));
// 用跟本文件平级的一个 public 夹作为静态文件的存放位置
// 没有这一行，后面 sendFile 的 index.html 就找不到了。

app.get('*', function(req, res){
  res.sendFile('index.html', {root: 'build'});
});


app.listen(8080, function(err) {
  console.log('Listening at http://localhost:8080');
});
```



基本环境搭建的总的代码如下：

[react webpack dev env](https://github.com/happypeter/aa-journey-demo/commit/2e991459f496c2bdfb6c0b1d344d49da55c1722e)

### 结语

这一节就先介绍到这，下一节继续实现前台代码。
