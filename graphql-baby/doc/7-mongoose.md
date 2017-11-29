# 使用 MongoDB 数据库存储数据

到目前为止，课程已经演示了搭建一个 GraphQL API 服务器的基本流程，不过课程中的 GraphQL API 返回的数据都是固定的字符串，而在实际应用中数据是要存储在数据库中的，所以 API 必然要和数据库打交道。本案例将使用 MongoDB 数据库，接下来要做的事情就是安装 MongoDB 数据库。

### 安装 MongoDB 数据库

在不同的操作系统中，MongoDB 数据库的安装方式也是不一样的，以 OS X 系统为例，可以通过 [Homebrew](http://brew.sh/) OS X 系统中的包管理工具安装 MongoDB 数据库，安装步骤是这样的：

```
brew update
brew install mongodb
```

若你使用的是其它类 Linux 的操作系统，可以参考 MongoDB 的[安装文档](https://docs.mongodb.com/manual/installation/)

### 启动 MongoDB 数据库

MongoDB 数据库安装成功之后，还得让它运行起来才能保存数据。仍然以 OS X 系统为例，介绍如何运行 MongoDB 数据库。在案例根目录 `graphql-baby-demo` 下，新建一个目录 `data/db`：

```
mkdir -p data/db
```

然后在 `graphql-baby-demo` 目录下，执行 `mongod` 命令，启动 MongoDB 数据库：

```
mongod --dbpath=./data/db
```

命令中的 `--dbpath` 选项是用来指定 MongoDB 数据库中的数据存储路径的，其参数 `./data/db` 指定的就是刚才新创建的 `data/db` 目录。

### 安装 Mongoose

若一切顺利的话，MongoDB 数据库的准备工作就完成了。下面要完成的任务是在 Express 应用中能够通过代码直接操作 MongoDB 数据库，完成这个任务需要安装 Express 的中间件 Mongoose，由 Mongoose 连接 Express 应用和 MongoDB 数据库，安装命令如下：

```
npm install --save mongoose
```

### 创建一个 User 模型

新建文件 `models/user.js`，添加创建一个 User 模型，将映射为 MongoDB 数据库 `graphql-baby` 中的 `users` 集合，先构建一个 Mongoose schema，名为 `userSchema`：

```
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true }
  }
);
```

定义 Mongoose schema 与 GraphQL schema 有些相似，不过 Mongoose schema 规定了 MongoDB 数据库集合所包含的字段名和类型，而 GraphQL schema 则限制了 `query` 和 `mutation` 操作可以访问的字段和类型。

最后，模型化 `userSchema` 并导出，使它映射到 `graphql-baby` 数据库中的 `users` 集合：

```
module.exports = mongoose.model('User', userSchema);
```

### 连接 MongoDB 数据库

打开 `index.js` 文件，导入 `mongoose` 功能模块：

```
const mongoose = require('mongoose');
```

然后，把 Express 应用连接到 MongoDB 数据库，本案例使用的 MongoDB 数据库名字为 `graphql-baby`：

```
mongoose.connect('mongodb://localhost:27017/graphql-baby');
```

### 保存一条用户数据到数据库

继续修改 `index.js` 文件，导入刚才定义的 `User` 模型：

```
const User = require('./models/user');
```

当应用和 `graphql-baby` 数据库连接成功之后，保存一条用户信息到数据库中：

```
const db = mongoose.connection;
db.once('open', function() {
  const user = new User({name: 'graphql', email: 'xx@xx.com'});
  user.save(function(err){
    if(err) console.log(err);
    console.log('success!');
  })
});
```

若用户信息保存成功之后，则在命令行中打印出 `success!` 提示信息，若用户信息保存失败，则命令行中打印出错误信息。

至此，我们创建的 GraphQL API 应用与 MongoDB 数据库 `graphql-baby` 之间已经建立了数据通道。下节课程我们将构建获取数据库中用户信息的 GraphQL API。
