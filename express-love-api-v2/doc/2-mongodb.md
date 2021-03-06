# 使用 mongo shell 和 mongo-express 图形化界面

来看看如何用 mongo shell 中运行命令，以及用图形化客户端的形式来操作 MongoDB 数据库。

### 启动 MongoDB

启动 mongodb

```
mkdir  data
mongod --dbpath=./data/
```

第一步创建一个文件夹，用来存储数据。第二个命令就是启动 Mongodb ，注意，上面的命令就是 `mongod` ，后面传递的选项就是给出数据存储位置。

这样，mongodb 就启动成功了。

现在要，我们就

```
mongo
```

开启 Mongo Shell 。这样，我们进入 Mongo 的命令行界面，就可以进行 Mongodb 数据库操作了。

### 插入一条数据

```
$ use express-love-api
switched to db express-love-api
```

先来创建一个数据库。 `use` 不是创建，是进入的意思，但是 mongodb 中没有的数据库，一样可以先进入。下面的输出 `switched to db express-love-api` 意思是：已经切换到 express-love-api 这个数据库里面了。

```
show dbs
```

暂时，没有保存数据到该数据库，所以，输出中没有 express-love-api 。

```
> db.createCollection('users')
{ "ok" : 1 }
```

一个数据库中会包含多个集合也就是 collection。我们这里集合名称叫 users 。一个集合跟传统关系型数据库的一张表是对等的概念。

```
> db.users.insert({username: 'peter', email: 'peter@peter.com' })
WriteResult({ "nInserted" : 1 })
```

集合中可以插入数据，一条数据记录就会被保存成一个文档（ Document ）

输出结果 `WriteResult({ "nInserted" : 1 })` 表示成功写入了一条数据。

```
db.users.find()
```

列出一个集合中的所有文档，可以用 `find` 接口。

### 对数据记录进行增删改查

第一步，增。

```
> db.users.insert({username: 'billie', email: 'billie@billie.com'})
```

使用 insert() 接口。

第二步，改。

```
db.users.update({_id: ObjectId("5ae428182fbc802b6a643222")}, {username: "billie66", email:"billie@billie.com"})
```

使用 update() 接口。 update 接口中有两个参数，第一个是查询条件，用来定位要更新的是哪一个文档，后面是更新后的数据。

第三步，查。

```
db.users.find()
```

`find` 中不写参数，就可以列出所有的 users 集合中的文档。

第四步，删。

```
> db.users.remove({_id:  ObjectId("5ae428182fbc802b6a643222")})
WriteResult({ "nRemoved" : 1 })
```

使用 remove() 接口。给定一个查询条件对象，就可以删除特定文档。

```
> db.users.remove({})
```

如果要删除集合中所有文档，就给一个空对象做查询条件。

### 图形化的操作界面 mongo-express

Mongo-express 是一个用 express 技术开发的，MongoDB 的 GUI (图形界面)。可以方便美观的操作 MongoDB 中的数据。

```
npm i -g mongo-express
```

我当前安装的版本是 0.46.1 。

~/bin/mongo-ex.sh

```bash
mongo-express -u admin -p pass -d myDB -H localhost -P 27017
```

其中 myDB 就是我们要连接的数据库的名字。默认情况下，终端中会出现链接失败，因为数据库不存在这样的信息。不用管。

浏览器中，打开 mongo-express ，进入 myDB ，添加一下 colleciton 。

然后回到命令行中，运行 `mongo` 进入 mongo shell 环境。可以看到 `myDB` 已经被创建好了。
