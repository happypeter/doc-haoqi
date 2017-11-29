# 搭建基本的 Express 应用开发环境

本案例使用的 Node.js 的版本是 v7.2.0

### 创建案例目录

```
mkdir graphql-baby-demo
cd graphql-baby-demo
```

### 生成 package.json 文件

```
npm init -y
```

### 安装 express

```
npm install --save express
```

### 安装 nodemon

```
npm install -g nodemon
```

### 添加案例入口文件

在案例根目录下，新添加一个 `index.js` 文件，内容如下：

```
const express = require('express');
const app = express();

app.use('/test', function(req, res){
  res.send('welcome to graphql!')
});

app.listen('3000', function() {
  console.log('Your server is running on port 3000');
});
```

### 启动 Express 应用

```
nodemon index.js
```

打开 Chrome 浏览器，访问 `localhost:3000/test` 地址，会看到 `welcome to graphql!` 一行字。
