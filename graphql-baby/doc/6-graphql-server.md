# 搭建 GraphQL API server

前面两节课程我们已经启动了一个 Express 应用，也编写了一个 GraphQL schema，但这两者之间还没有任何关联，本节课程我们将使用一个 Express 的中间件 [express-graphql](https://github.com/graphql/express-graphql) 让 GraphQL schema 在 Express 应用中使用起来，从而构建一个能够提供 GraphQL API 服务的 Express 应用。

### 安装 express-graphql

```
npm install --save express-graphql
```

[express-graphql](https://github.com/graphql/express-graphql)，实现 GraphQL API 服务的 Express 中间件。我们就用它来把前面已经有
的 express 和 schema 连接起来。

### 实现 GraphQL API 服务

打开 `index.js` 文件，导入 `express-graphql` 的功能模块 [graphqlHTTP](http://graphql.org/graphql-js/express-graphql/)：

```
const graphqlHTTP = require('express-graphql');
```

然后，导入上节课程编写的 GraphQL schema：

```
const schema = require('./graphql');
```

最后添加一个 `/graphql` 路由，其路由处理函数为 `graphqlHTTP`，

```
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true
}));
```

当 GraphQL 客户端访问 `/graphql` 地址的时候，`graphqlHTTP` 函数先抽取出 HTTP 请求中的 GraphQL 查询字符串，然后基于传递给它的 GraphQL schema 解析 GraphQL 查询字符串，若查询字符串检验通过，则给客户端返回 JSON 数据，若有错误，则给客户端返回错误信息。

接下来，简单介绍一下传入 `graphqlHTTP` 函数的三个参数 `shema`、`pretty` 和 `graphiql`:

* __schema__ 上节课程编写的 GraphQL schema

* __graphiql__ 若为 `true`，则可以到浏览器 `localhost:3000/graphql` 地址中打开 GraphQL 集成开发工具 [GraphiQL](https://github.com/graphql/graphiql)

* __pretty__ 控制响应的 JSON 数据的格式，若为 `true`，则返回格式美观的 JSON 数据

参考文档[选项](https://github.com/graphql/express-graphql#options)

### GraphiQL 测试

打开 Chrome 浏览器，访问网址 `localhost:3000/graphql`，则会显示 GraphQL 集成开发工具 GraphiQL 页面，在左侧窗口中输入：

```
query MyQuery{
  name
  email
}
```

或者省略 `query MyQuery` 前缀：

```
{
  name
  email
}
```

则右侧窗口中打印出服务器端响应的 JSON 数据：

```
{
  "data": {
    "name": "graphql",
    "email": "xx@xx.com"
  }
}
```

### curl 测试

如果我们不使用图形化的 GraphiQL ，使用 curl 也可以测试的：

```
curl -XPOST -H 'Content-Type:application/graphql'  -d 'query MyQuery {name, email}' 'http://localhost:3000/graphql'
```

或者，省略 `query MyQuery` 前缀：

```
curl -XPOST -H 'Content-Type:application/graphql'  -d '{name, email}' 'http://localhost:3000/graphql'
```

则命令行中打印出美观的从 GraphQL server 返回的 JSON 数据。
