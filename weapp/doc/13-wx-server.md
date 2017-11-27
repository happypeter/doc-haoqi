# 搭建小程序后端服务器

本节课程将使用 [Express](https://expressjs.com/) 框架搭建小程序后端服务器，专门为小程序提供 RESTful API 服务。如何搭建 Express 应用，好奇猫网站上凡是涉及到前后端分离架构的案例课程，后端服务都使用的是 Express 框架，所以本文不再具体介绍了，详情可以参考 [《React-Express 极简 API》](http://haoqicat.com/react-express-api) 课程。

开发环境需要的软件包版本：

* [Node.js](https://nodejs.org/en/) 版本 v7.2.0
* [npm](https://www.npmjs.com/) 版本 v3.10.9
* [MongoDB](https://www.mongodb.com/) 版本 v3.0.6

### 安装和启动 MongoDB 数据库

MongoDB 数据库的安装步骤，比如说安装3.0版本的 MongoDB，可以查看[官方文档](https://docs.mongodb.com/v3.0/installation/)，请根据您自己使用的操作系统，选择适合自己的 MongoDB 安装文档。若您使用的是 Mac 系统，您也可以观看 [《React-Express 极简 API》](http://haoqicat.com/react-express-api) 课程的第二小节 [MongoDB 数据库简单操作](http://haoqicat.com/react-express-api/2-mongodb)的视频，里面详细演示了 MongoDB 数据库的安装和启动过程。

### 创建应用目录

新建一个目录文件 `weapp-server`，进入目录：

```
mkdir weapp-server && cd weapp-server
```

接下来生成项目需要的 `package.json` 文件，如下：

```
npm init -y
```

### 安装 express 和 mongoose 软件包

```
npm install --save express mongoose
```

* [express](https://www.npmjs.com/package/express) 基于 Node.js 的 web 应用框架
* [mongoose](https://www.npmjs.com/package/mongoose) 可以让 Express 和 MongoDB 之间进行通信的中间件

### 添加应用入口文件

新建文件 `index.js`，然后添加代码如下：

```
let express = require('express');
let app = express();
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/weapp-server');

app.listen(3000, function() {
  console.log('Your server is running on port 3000');
});
```




上述代码就创建了一个最简单的 Express 应用，首先创建了一个 Express 实例 `app`，然后调用 `mongoose` 中间件连接 MongoDB 数据库，最后创建一个 HTTP server 实例，监听来自本地3000端口的所有请求。

### 启用应用

首先，启动 MongoDB 需要执行：

```
mkdir -p data/db
mongod --dbpath=./data/db
```


然后，安装一下 [nodemon](https://nodemon.io/)，执行命令：

```
npm install -g nodemon
```

然后，启用刚才创建的 Express 应用，执行命令：

```
nodemon index.js
```

命令行中会打印出 `Your server is running on port 3000`，说明 Express 应用已经运行起来了。

使用 `nodemon` 启动应用的目的是为了提高开发效率，每次修改代码之后，`nodemon` 会自动重启应用。这样，我们的后端服务器就算搭建起来，后续会提高用户登录 API，存储小程序登录用户的信息。
