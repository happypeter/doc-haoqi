# 安装 Graphiql

Graphiql 是个运行在浏览器内的 graphql 的 IDE ，是新手学习 graphql 的
一个非常好的方式。

最初我对这个东西发生兴趣，是在看 [facebook 的 Zero to GraphQL in 30 Minutes – Steven Luscher 演讲](https://www.youtube.com/watch?v=UBGzsb2UkeY) 。看到人家一边用 atom 写查询，这边用 graphiql
的图形界面直接测试效果超级酷。

我们这一集先来介绍如何安装。

### Github 仓库

https://github.com/graphql/graphiql 是 graphiql 的 github 仓库地址。

```
git clone git@github.com:graphql/graphiql.git
```

下载得到代码仓库。里面的 example/README.md 中有具体的运行步骤。

### 运行

首先在顶级目录执行一下编译

```
npm install & npm run build
```

然后进入 example 文件夹

```
cd example
npm install
npm start
```


这样就可以在 http://localhost:8080/ 看到运行效果了。

### 一个小陷阱

最初我运行 `npm start` 的时候报错了，原因是我用的 node 版本比较老，五点几，而同时 example 文件夹里面
用到了 ES6 的语法。解决方式就是升级到最新版的 node 。

```
nvm install v7.2.0
```

问题就解决了。
