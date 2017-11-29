# 演示 GraphiQL 的基本使用

点击导航栏右侧的 `Docs` 按钮，打开文档窗口，在 `ROOT TYPES` 标签下，有三个条目：

```
query: Test
mutation: MutationType
subscription: SubscriptionType
```

代表 GraphQL server 能够支持的操作类型，每个操作类型都必须对应着一个名字，这个名字可以随意命名。

然后，点击一个操作，比如说 `query`，切换到另一个页面，在 `FIELDS` 标签下，列出了 `query` 操作可以响应给客户端的字段，每个字段都规定了数据类型。

知道了这些，就可以在 GraphiQL 窗口的左侧边栏中构建查询语句了，比如说想执行 `query` 查询操作，获取 `id` 和 `isTest` 字段的信息，则查询语句如下：

```
query Test {
  id
  isTest
}
```

或者是这样，省略 `query Test` 前缀：

```
{
  id
  isTest
}
```

则在 GraphiQL 窗口的右侧边栏中输出 JSON 数据：

```
{
  "data": {
    "id": "abc123",
    "isTest": true
  }
}
```

服务器端返回的 JSON 数据结构和客户端构建的查询数据结构非常相似，这是由服务器端定义的 schema 支持的，不过 GraphiQL 源码案例中创建的 schema 比较复杂，从下一节课程开始我们将搭建一个基于 Express 框架的 GraphQL API 服务。
