# GraphQL 实现关系型数据查询

在实际应用中，根据业务逻辑的需要，数据库中存储的数据并不是孤立的，它们之间有一定的关联。比如说我们打算创建一个交友网站，数据库不仅要保存注册用户的信息，还要保存用户所结交的朋友的信息。那么为了表达用户和其它用户之间的朋友关系，当建立数据表的时候就变得复杂了。本节课程仍然以 `users` 集合为例，介绍在 MongoDB 数据库中建立多对多数据关系的知识点。另外，还会介绍如何构建 GraphQ API 获取用户的朋友信息，以及朋友的朋友信息。

若获取某个用户的朋友信息，用 RESTful API 实现，则应该这样表示：

```
GET /users/:id/friends
```

若同时获取某个用户的信息，还有用户的朋友信息，那用 RESTful API 实现，则可能需要请求两个接口：

```
GET /users/:id
GET /users/:id/friends
```

或者客户端希望得到每个用户的朋友信息，甚至朋友的朋友信息，若用 RESTful API 实现这个功能，可能又需要提供新的接口。

那么接下来，我们就演示一下 GraphQL 是如何解决上述问题的，最终得到的结果会简单很多哦。


首先咱们先研究一下，如何在 MongoDB 数据库中构建数据集合的多对多关系。

### 建立数据集合的多对多关系

在非关系型数据库 MongoDB 中建立数据集合的多对多关系，需要根据数据量的大小选择合理的方案，对于少量（比如说几十个）的数据，以 `users` 集合为例，直接添加一个数组类型的 `friends` 字段，数组中直接存储用户朋友的完整信息，就可以实现这种多对多的数据关联；若用户的朋友比较多，比如说有几百个，那么 `friends` 数组就只存储用户朋友的 `_id` 信息就可以了，本案例假定用户的朋友很多。打开 `models/user.js` 文件，修改 `userSchema` 的定义，如下所示：

```
const userSchema = new mongoose.Schema(
  {
    ...
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }
);
```

通过 [mongoose.Schema.Types](http://mongoosejs.com/docs/api.html#schema_Schema.Types) 接口设置 `friends` 数组元素的类型为 `ObjectId`，那么数组元素来自何方，是由 `ref` 选项的值 `User` 决定的，这个 `User` 指的是我们创建的 `User` 模型，从而确定了 `friends` 数组中的每个元素为 `users` 集合中存储的用户信息的 `_id`

关于构建 MongoDB 数据库集合之间关联的理论知识，请参考 Mongoose 的关于 [Population](http://mongoosejs.com/docs/populate.html) 章节的内容


### 手动设置用户测试数据

因为给数据库中的 `users` 集合新添加了一个 `friends` 字段，所以 `users` 集合中已经保存的用户信息都不包含 `friends` 字段，因此我们要手动添加用户的朋友信息。若使用 `mongo` shell 命令，可以这样操作：

```
db.users.update({_id: "ObjectId(xxx)"}, {$set: {friends: ["ObjectId(xxx)"]}})
```

可以把用户与用户之间的关系设置的复杂些，用户的朋友也有朋友，用户的朋友的朋友仍然有朋友，哦，这不是在写绕口令，而是为了在测试 API 的时候，您可以体会到 GraphQL 的强大功能。

当然也可以使用 MongoDB 的图形化操作工具 `mongo-express` 来修改用户信息。


### userType 类型中添加 friends 字段

当客户端请求用户信息的时候，希望 GraphQL API 还能够返回用户的朋友信息，我们不需要添加新的查询入口点，只修改 `userType` 类型就可以了。

在 `userType` 类型中再新添加一个 `friends` 字段，其类型是 `userType` 类型的集合，其对应的数值即为 `resolve` 函数的返回值，一个包含用户朋友信息的数组。打开 `graphql/index.js` 文件，修改代码如下：

```
const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    ...
    friends: {
      type: new GraphQLList(userType),
      resolve: (user) => {
        return user.friends.map((id, i) => {
          return User.findById(id).exec().then(user => user)
        })
      }
    }
  }
})
```

上述代码中，`resolve` 函数的第一个参数代表 `userType` 类型作用的对象，一条完整的用户信息。

注意：上述代码其实有错误，因为 `friends` 字段属于自定义的 `userType` 类型的一个字段，而 `friends` 字段本身又使用了 `userType` 类型，这样在代码运行的时候，报告如下错误：

```
type: new GraphQLList(userType),
                            ^
ReferenceError: userType is not defined
```

消除上面错误信息的方法是把 `fields` 的属性值用一个函数包裹起来，如下所示：

```
const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    ...
  })
})
```


### GraphiQL 测试

代码修改无误之后，就应该到浏览器 GraphiQL 工具中，检验一下我们的修改是否生效了。在 GraphiQL 工具的左侧边栏中输入下面的查询语句：

```
{
  user(id: "xxx") {
    _id
    name
    email
    friends {
      _id
      name
      email
    }
  }
}
```

请求某个用户的信息，用具体的 `_id` 值代替上述代码中的 `xxx`，若右侧边栏没有错误输出，您就可以同时得到用户及其朋友的详细信息了。若您还想查看用户朋友的朋友信息，您还可以这样构建查询语句：

```
{
  user(id: "xxx") {
    _id
    name
    email
    friends {
      _id
      name
      email
      friends {
        name
      }
    }
  }
}
```

您还可以一级一级的往下查询朋友的朋友的朋友的...信息，一直到你的机器内存溢出！哦，现实世界中应该不会这样操作。感觉 GraphQL 真是太方便了！

然后再构建下面的查询语句，请求所有的用户信息：

```
{
  users {
    _id
    name
    email
    friends {
      _id
      name
      email
      friends {
        name
        email
      }
    }
  }
}
```

若右侧边栏没有错误输出，您就可以同时得到每个用户，及其用户的朋友，还有朋友的朋友的详细信息了。
