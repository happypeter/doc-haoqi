# 实现添加用户 GraphQL API

通过前面的课程，我们已经知道了如何构建 GraphQL API 读取服务器端的数据，但是一个完整的 API 服务器不仅要提供读操作接口，还要提供写操作的接口，所以本节课程将演示如何通过 GraphQL API 修改数据库中的数据，实现 GraphQL API 服务器写操作的功能。仍然以 `users` 集合为例，首先实现一个 GraphQL API 往 `users` 集合中新添加一条用户信息。

### 添加用户接口

添加用户的操作属于修改操作，GraphQL 规范称之为 `mutation` 类型，它与 `query` 类型都属于 GraphQL schema 中的根类型（Root type）。修改 `graphql/index.js` 文件，在 GraphQL schema 中的 `query` 类型下方添加 `mutation` 类型：

```
module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({ ... }),
  mutation: new GraphQLObjectType({
    name: 'MyMutation',
    fields: {
      addUser: {
        type: GraphQLBoolean,
        args: {
          data: {
            type: new GraphQLNonNull(userInputType)
          }
        },
        resolve: (_, {data}) => {
          const user = new User(data);
          user.save()
          return true
        }
      }
    }
  })
});
```

上述代码中，我们又引入了新的类型，一个 `graphql-js` 库自带的 [GraphQLBoolean](http://graphql.org/graphql-js/type/#graphqlboolean) 类型，代表布尔类型和自定义的 `userInputType` 类型，用来规定传给 `addUser` 字段的参数 `data` 的类型，还有一个用来规定字段值不能为空的 [GraphQLNonNull](http://graphql.org/graphql-js/type/#graphqlnonnull) 接口。接下来，我们就导入这些新的东东：

```
const {
  ...
  GraphQLBoolean,
  GraphQLNonNull
} = require('graphql');
```

### 自定义 userInputType 类型

我们先导入 [GraphQLInputObjectType](http://graphql.org/graphql-js/type/#graphqlinputobjecttype) 接口，如下所示：

```
const {
  ...
  GraphQLInputObjectType
} = require('graphql');
```

这个接口可以把字段的参数类型设置为对象类型，然后定义 `userInputType` 类型，也就是：

```
const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    name: {type: GraphQLString},
    email: {type: GraphQLString}
  }
});
```

### GraphiQL 测试添加用户接口

当构建修改操作语句的时候，必须包含 `mutation` 关键字：

```
mutation {
  addUser(data: {name: "doudou", email: "dou@dou.com"})
}
```

操作执行成功之后，返回值为：

```
{
  data {
    addUser: true
  }
}
```

### curl 命令测试

在命令行中，通过下面的命令也可以测试 GraphQL 修改操作：

```
curl -XPOST -H 'Content-Type:application/graphql'  -d 'mutation {addUser(data: {name: "doudou", email: "dou@dou.com"})}' 'http://localhost:3000/graphql'
```
