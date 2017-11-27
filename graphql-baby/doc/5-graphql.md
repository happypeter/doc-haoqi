# 编写一个 GraphQL Schema

### 安装 graphql-js

```
npm install --save graphql
```

[graphql-js](https://www.npmjs.com/package/graphql) 是 GraphQL 规范的 JavaScript 参考实现，由 Facebook 开发团队维护。

### 编写一个 GraphQL Schema

> 一个 GraphQL Schema 定义了 GraphQL 服务器的能力。它展示了 GraphQL 服务器上所有的可用类型和指令，也是 query、mutation 和 subscription 操作的入口点。

新建 `graphql/index.js` 文件，定义一个 GraphQL schema 并导出：

```
var {
  GraphQLObjectType,   // 用来创建 GraphQL 对象类型实例
  GraphQLSchema,       // 用来创建一个 schema 实例
  GraphQLString        // 代表 GraphQL 字符串类型
} = require('graphql');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'MyQuery', // 必须设置 name
    fields: {
      name: {
        type: GraphQLString,
        resolve: function() {
          return 'graphql'
        }
      },
      email: {
        type: GraphQLString,
        resolve: function() {
          return 'xx@xx.com'
        }
      }
  })
});
```

一个 GraphQL schema 必须包含一个 `query` 类型，即客户端所有 `query` 查询操作的入口点，并且要设置类型的名字。上述代码中，定义的 `query` 类型的[名字](http://graphql.org/learn/queries/#operation-name)为 `MyQuery`，另外规定了 `query` 操作可以检索的两个[字段](http://graphql.org/learn/queries/#fields) `name` 和 `email`，两个字段各包含一个 [resolve](http://graphql.org/learn/execution/#root-fields-resolvers) 函数，函数分别返回一个字符串，也就是 name 和 email 两个字段的值。

另外，GraphQL 规范有自己的一套类型系统，[graphql-js](https://github.com/graphql/graphql-js) 所实现的 GraphQL 各种类型的表示方式，请参考其[类型接口](http://graphql.org/graphql-js/type/) 文档。
