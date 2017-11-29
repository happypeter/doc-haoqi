# 构建获取所有用户信息的 GraphQL API

本节课程主要完成的任务是通过 GraphQL 查询语句获取数据库中的所有用户信息，若用 RESTful API 表示，如下所示：

```
GET /users
```

若用 GraphQL 查询语句应该是这样的：

```
{
  users {
    _id
    name
    email
  }
}
```

`users` 将是 GraphQL schema 中 `query` 类型所包含的一个字段，代表一个查询入口点。

### 添加 users 查询入口

修改 `graphql/index.js` 文件中的 GraphQL schema 的结构，再添加一个 `users` 字段：

```
users: {
  type: new GraphQLList(userType),
  resolve: () => {
    return User.find({}).exec().then(users => users);
  }
}
```

上面 Mongoose 查询接口，调用 `exec()` 可以返回一个 Promise ，所以后面可以使用 `.then()` 。参考 [exec 的 API 文档](http://mongoosejs.com/docs/api.html#query_Query-exec) 。

`users` 字段的类型是由 `userType` 类型构成的集合，所以用到了 `graphql-js` 库提供的 [GraphQLList](http://graphql.org/graphql-js/type/#graphqllist) 接口，导入 `GraphQLList`：

```
var {
  ...
  GraphQLList
} = require('graphql');
```

### 限制返回的用户数量

继续修改 `graphql/index.js` 文件中的 GraphQL schema，给 `users` 字段传递一个 `count` 参数，类型是 [GraphQLInt](http://graphql.org/graphql-js/type/#graphqlint)，代表整型：

```
users: {
  ...
  args: {
    count: {
      type: GraphQLInt
    }
  },
```

然后，把 `count` 参数传递给 `resolve` 函数，通过 Mongoose 的 [limit](http://mongoosejs.com/docs/api.html#query_Query-limit) 接口，返回特定数量的用户信息。

```
  resolve: (_, {count}) => {
    return User.find({}).limit(count).exec().then(users => users);
  }
}
```

最后，导入 `GraphQLInt` 类型：

```
var {
  ...
  GraphQLInt
} = require('graphql');
```

然后到 GraphiQL 工具中测试一下，比如说客户端只需要3名用户的数据，对应的客户端 GraphQL 查询语句如下：

```
{
  users(count: 3) {
    _id
    name
    email
  }
}
```
