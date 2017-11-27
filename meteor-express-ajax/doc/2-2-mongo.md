# 安装 Mongodb

主要参考官网的[Mac 平台安装步骤](https://docs.mongodb.org/v3.0/tutorial/install-mongodb-on-os-x/) 。

### 更新 homebrew

咱们采用 [homebrew](http://brew.sh/) 的形式来进行安装。首先来更新一下 homebrew 的包仓库的数据。

```
brew update
```

如果上面的命令报错：没有权限。那么就执行下面的命令：

```
sudo brew update
```

意思就是用超级用户的权限来执行相同的操作。我自己的系统上就是用的这个命令。整个过程在我自己的系统上还是花了很长时间的，要有点耐心。

### 安装 MongoDB

下面就来真正安装 MongoDB 数据库到我们的系统了，执行

```
sudo brew install mongodb
```

如果没有报错，证明装好了。可以来试用一下

```
mkdir data
mongod --dbpath=./data --port 27017
```

如果命令能正确运行，表示安装 MongoDB 的工作就胜利完成了。
