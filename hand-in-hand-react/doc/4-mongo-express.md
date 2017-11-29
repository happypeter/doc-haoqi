# MongoDB 图形化管理工具

### 安装 MongoDB 图形化管理工具

你可能不想在 mongo 命令行交互窗口中敲入命令来打理 MongoDB 数据库，希望借助图形化管理工具查看和修改数据，下面就介绍一个用 Node.js 开发的基于 Web 的 MongoDB 数据库管理工具 [mongo-express](https://github.com/mongo-express/mongo-express)，说白了就是一个可以让你在浏览器页面中管理 MongoDB 数据库的 Node.js Web 应用。

全局安装 mongo-express 包：

```
npm install -g mongo-express
```

### 找到 mongo-express 配置文件

`mongo-express` 包安装好之后，找到其安装目录，执行下面命令：

```
npm list -g mongo-express
```

在 Mac OS X 系统中的输出结果是：

```
/Users/peter/.npm-global/lib
```

若你用的是非 Mac 系统，输出结果可能就不同了，不过只要正确的找到安装路径就对了。接下来，进入 `mongo-express` 包安装目录，列出目录中的条目：

```
cd /Users/peter/.npm-global/lib ; ls
```

上面命令执行之后，你会看到一个 `mongp-express` 目录，进入这个目录并列出目录中的内容：

```
cd mongo-express ; ls
```

在这个目录下，有一个叫做 `config.default.js` 的配置文件，复制这个文件：

```
cp config.default.js config.js
```

这个复制得到的 `config.js` 文件就是 `mongo-express` 的配置文件。

### 修改 config.js 配置文件

然后，修改 `config.js` 文件中的配置参数，先更改配置文件开始部分 `mongo` 变量的值：

```
mongo = {
  db:       'react-hand-in-hand',
  host:     'localhost',
  password: '',
  port:     27017,
  ssl:      false,
  url:      'mongodb://localhost:27017/react-hand-in-hand',
  username: '',
};
```

一共做了四处修改，分别是 `db` 的值设置为本案例所使用的 MongoDB 数据库的名字 `react-hand-in-hand`；因为访问本案例数据库不需要认证，所以把 `password` 的值设置为空，`username` 的值也设置为空；`url` 的值设置为本案例数据库对应的地址。其它项保持默认配置。

另外，`mongo-express` 应用采用了基本的用户认证方式，在浏览器中访问其页面的时候，需要输入用户名和密码才能看到实际的操作界面，默认的用户名和密码可以在配置文件中找到：

```
basicAuth: {
  username: process.env.ME_CONFIG_BASICAUTH_USERNAME || 'admin',
  password: process.env.ME_CONFIG_BASICAUTH_PASSWORD || 'pass',
},
```

为了安全起见，你可以重新设置用户名和密码，比如改成这样：

```
basicAuth: {
  username: process.env.ME_CONFIG_BASICAUTH_USERNAME || 'peter',
  password: process.env.ME_CONFIG_BASICAUTH_PASSWORD || 'hello',
},
```

配置文件修改完成之后，别忘了保存哦。

### 启动 mongo-express 应用

启动之前要确保 MongoDB 数据库是运行着的，找一个合适的目录，比方说 `~/data` 目录中，运行命令 `mongo-express`：

```
cd ~/data
mongo-express
```

`mongo-express` 应用启动之后，根据终端中的提示信息：

```
Mongo Express server listening at http://localhost:8081
```

打开浏览器，访问网址 `http://localhost:8081`，此时会出现对话框，输入在配置文件中设置的用户名 `peter` 和 密码 `hello`，点击回车之后，就能看到本案例 `react-hand-in-hand` 数据库的操作界面了，现在 `react-hand-in-hand` 数据库中还没有数据，试着存储数据吧。
