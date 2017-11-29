# MongoDB 数据库入门

本案例是一个简单的后台管理系统，管理员可以在后台写文章给网站访客阅读，而我们要做的工作就是把管理员写的这些文字保存起来，这就需要和数据库打交道了。本案例将使用 MongoDB 数据库，所以我们要在本地开发环境下安装 MongoDB 数据库。

### 安装 MongoDB 数据库

如何安装 MongoDB 数据库，本节课程就不介绍了，好奇猫网站上的《Meteor 和 Express Ajax 思路对比》和《Express 极简 API》两门课程中都演示了具体的操作步骤。

不同的操作系统，MongoDB 数据库的安装方式也就不一样了，请参考官网的[安装文档](https://docs.mongodb.com/manual/installation/)入坑。

### 启动 MongoDB 数据库

MongoDB 数据库安装好之后，默认是不会自动启动的，需要手动运行命令把它跑起来。下面就以 Mac OS X 系统为例，在用户主目录下新建一个 `data/db` 目录：

```
cd ~
mkdir -p data/db
```

目录创建成功之后，然后再运行命令：

```
mongod --dbpath ~/data/db
```

上面这条命令执行之后会一直占据着终端窗口，一直是运行状态，表明 MongoDB 数据库已经启动了。

### 操作 MongoDB 数据库

MongoDB 数据库自带了一个 [mongo](https://docs.mongodb.com/manual/mongo/) shell 交互程序，你可以使用 mongo shell 查询和更新数据 以及执行管理操作。请参考好奇猫上的《Express 极简 API》课程
