# 构建获取单个用户信息的 GraphQL API

我们在上一节课程中已经保存了一条用户信息到 MongoDB 数据库中，本节课程要完成的任务是构建一个 GraphQL API 读取数据库中的一条用户数据。若使用 RESTful API 的话，应该构建这样一个接口：

```
GET /users/:id
```

其中，`id` 是传递给接口的参数，代表用户在数据库中保存的 `id` 信息。请求上面的接口，应该能返回 JSON 数据，包含用户的 `_id` 还有 `name` 和 `email`。

仿照上面的 RESTful API，我们先构建客户端的 GraphQL 查询字符串，获取某个用户的 `_id` 还有 `name` 和 `email`，应该这样编写：

```
{
  user(id: "id" ) {
    _id
    name
    email
  }
}
```

其中，`user` 是要查询的字段，`id` 是传递给 `user` 字段的参数。注意：这里有两个 id ，一个是 `_id` ，这个是 mongodb 中的字段名，另一个
是 `id` ，这个马上我们就会在 graphql 的 schema 文件中（也就是 graphql/index.js ）去写明。

### 添加 user 查询入口

根据客户端的 GraphQL 查询字符串，我们就可以更改 GraphQL schema 结构，实现这个获取某个用户信息的 API。打开 `graphql/index.js` 文件，修改 GraphQL schema，因为我们读取数据库中的用户数据，所以先导入 `User` 模型：

```
const User = require('../models/user');
```

然后，在 `query` 根类型中添加一个 `user` 字段，其类型是一个自定义的 GraphQL Object 类型 `userType`，稍后定义。

```
module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'MyQuery',
    fields: {
      user: {
        type: userType,
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve: (_, {id}) => {
          return User.findById(id).exec().then(user => user)
        }
      }
    }
  })
});
```

通过 `args` 属性设置 `user` 字段需要的参数为 `id`，类型为 `GraphQLID`。因此，还需要导入 `GraphQLID` 类型：

```
var {
  ...
  GraphQLID
} = require('graphql');
```

另外，`resolve` 函数第一参数 `_` 没有意义，只是一个占位符的作用，第二个参数 `{id}` 用到了 ES6 的 [对象解构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 的语法，这样可以在函数体内直接使用 `id` 参数，通过 Mongoose 提供的 `findById` 接口找到与 `id` 相匹配的用户信息。

`resolve` 函数接受三个参数，如下所示：

```
resolve(obj, args, context) {...}
```

* obj 代表前面的对象（后面课程会用到），而在根类型（指的是出现在 GraphQL schema 中最顶端的类型，如 query 类型）字段中出现则没有意义，正如上述代码所示的情况。

* args 代表传递给字段的参数

* context 包含重要的上下文信息，如当前登录用户的信息，或者访问数据库的信息

对 `resolve` 函数三个参数的解释说明，请参考文档[Root fields & resolvers](http://graphql.org/learn/execution/#root-fields-resolvers)

### 定义 userType 类型

定义 `userType` 类型，就如定义 GraphQL schema 根类型 `query` 的方式一样，需要调用 [GraphQLObjectType](http://graphql.org/graphql-js/type/#graphqlobjecttype) 接口，graphql/index.js 需要添加的代码如下：

```
const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  }
})
```

这个 `userType` 类型包含三个字段 `_id`、`name` 和 `email`，这三个字段都可以返回给客户端。

### 消除 Mongoose 警告信息

因为 Mongoose 的 `Model#findById().exec()` 接口会返回一个 promise，所以 Mongoose 会在命令行中报告警告信息：

```
(node:28925) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
```

消除警告信息的方法是给 Mongoose 指定一个 promise 库，打开 `index.js` 文件，添加一行代码：

```
mongoose.Promise = global.Promise;
```
