# GraphQL 简介

GraphQL 是 facebook 推出的一套请求后台数据的规范，用来解决复杂情况下，使用 RESTful API 变得
很不方便的问题。注意，GraphQL 的使用前提是我们的应用够复杂，GraphQL 可以让复杂的问题变得简单。
但是如果您还是初学者，建议先不要碰 GraphQL ，先学基本的 RESTful API 比较好。


### 查询示例

GraphQL 是开发客户端的时候使用的一门查询语言，它提出了一套非常简单而灵活的语法，来描述数据需求和数据交互。下面通过几个示例来看一下 GraphQL 的查询是什么样的。

```
{
  me {
    name
  }
}
```

上面这段就是一个 GraphQL 的查询语句，非常的容易懂。有点像 JSON 形式。

服务器端返回来的东西是这样的：

```
{
  "me": {
    "name": "peter"
  }
}
```

返回来的数据应该就是 JSON。注意这里返回来的数据跟查询用的语言是非常像的，你会看到结构基本是一样的。这让 GraphQL 非常容易学习跟使用。用 GraphQL 的查询来描述要查询的结果数据的形状。


### GraphQL 也能实现写操作

GrapshQL 不仅能从服务器端读取数据，也就是发出 RESTful 架构下，相当于 GET 动词发出的各种请求，也能进行各种*写*操作，
去修改服务器数据。

客户端发出的查询语句如下

```
mutation ExampleMutation {
  deleteArticle(id: 1234) {
    status
  }
}
```

这里的关键字是 `mutation` 意思是**修改** ，对应 RESTful 架构下，这个就相当于 POST 动词发出的各种请求了。


### GraphQL 适用于各种开发平台

不管你是在用 Nodejs ，还是 Python 的 Django 框架，或者是 Ruby On Rails 框架，都可以使用 GraphQL 。具体到咱们关心的 JS 开发
，graphql 在 React/Meteor 社区都非常流行。Github 也推出了自己的 graphql API 。

### 参考资料

- http://facebook.github.io/graphql/#sec-Overview
- http://ninghao.net/blog/2857
- https://www.youtube.com/watch?v=UBGzsb2UkeY
  - 这个视频非常接地气，直接用例子展示出 graphql 的优势
