# 新建一个简单的 Express 应用

本案例的后端开发环境需要有 [Node.js](https://nodejs.org/en/) (>=5.4.1) 运行环境，若您是 Node.js 初学者不知道如何安装 Node.js，可以参考好奇猫上的另外一门课程 《Nodejs 乐高》课程，该课程是专门讲解 Node.js 知识点的。

### 创建课程案例目录

首先创建课程案例目录 `hand-in-hand-react-demo`, 然后在案例目录中新建 `server` 目录，存放实现后端 API 服务的代码，

```
mkdir hand-in-hand-react-demo
cd hand-in-hand-react-demo
mkdir server
```

接下来，生成应用需要的 `package.json` 文件：

```
npm init -y
```

参考 [npm init](https://docs.npmjs.com/cli/init) 命令的用法

### 安装 express 包

```
npm install --save express
```

[Express](https://expressjs.com/) 是一个轻便灵活的 Node.js 应用开发框架

### 添加应用入口文件

在 `server` 目录下新建文件 `index.js`，然后打开 `index.js` 文件，添加一些代码：

```
var express = require('express');
var app = express();

app.get('/api', function(req, res) {
  res.send('Welcome to here!')
})

app.listen(3000, function() {
  console.log('Express server is listening on port 3000');
});
```

保存 `index.js` 文件并退出。

### 启动 express 应用

在 `server` 目录下，执行命令：

```
node index.js
```

然后，打开谷歌浏览器，访问网址 `http://localhost:3000/api`，会看到 `Welcome to here!` 字样显示在页面中了。

### 添加应用配置文件

一个 express 应用在生产环境下使用的配置参数，可能与开发环境下使用的参数不一样，比如本案例在开发环境下监听的是 3000 端口，若部署到服务器上的时候，有可能服务器上的 3000 端口被占用了，在这种情况下我们就需要修改代码启用其它的端口号，显然这种做法是很不明智的，端口号改来改去的太不利于开发了，为了避免类似问题，给 express 应用在生产和开发环境下分别添加一个配置文件，把诸如端口号等数据都放到配置文件中，程序中其它用到端口号的地方都从配置文件中读取，这样生产环境和开发环境就可以各用各的配置信息，互不妨碍。

注意：配置文件是不需要被 Git 做版本控制的，所以要把配置文件忽略掉。另外，若你开发的应用打算开源，只要给应用添加一个配置文件样例就可以了。本案例是要开源的，看一下如何操作吧

首先，新建文件 `server/config.js`, 添加端口号配置信息：

```
module.exports = {
  port: 3000
};
```

然后，打开 `server/index.js` 导入端口号配置信息

```
var port = require('./config.js').port
```

接下来，替换明文的 3000 端口号

```
app.listen(port, function() {
  console.log('Express server is listening on port ' + port);
});
```

修改代码之后，需要重新启动应用，配置文件才能生效。回到命令行，按下快捷键 ctrl+c 关闭当前运行的程序，然后执行命令：

```
node index.js
```

最后，再新建一个应用配置信息的样例文件 `server/config.default.js`，如下：

```
module.exports = {
  port: xxx
};
```

这个样例文件是需要由 Git 控制的，可以开源让开发者查看的文件。

### 添加 .gitignore 文件

本案例代码是通过 Git 做版本控制的，若有一些文件不需要被 Git 跟踪，可以把这些文件的名字写入项目根目录下的 `.gitignore` 文件中。在 `hand-in-hand-react-demo` 目录下，新建文件 `.gitignore`，添加不需要追踪的文件名：

```
server/config.js
server/node_modules
```

这样，案例代码库中就不会包含 `server` 目录下的 `config.js` 文件以及安装在 `node_modules` 目录下的所有 npm 软件包。
