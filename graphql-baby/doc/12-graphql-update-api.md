# 实现更新和删除用户的 GraphQL API

### 更新用户接口

修改 `graphql/index.js` 文件，在 `mutation` 类型下再添加一个更新用户信息的 `updateUser` 字段：

```
updateUser: {
  type: GraphQLBoolean,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve: (_, {id, data}) => {
    return User.findById(id).exec().then(user => {
      user.name = data.name
      user.email = data.email
      user.save()
      return true
    })
  }
}
```

`updateUser` 字段的类型是 `GraphQLBoolean` 类型，即 Boolean 类型，因为 `resolve` 函数执行之后返回值为 `true`。`updateUser` 字段还接受两个参数 `id` 和 `data`，参数 `id` 代表所要更新用户在数据库中保存的 `_id` 的值，`data` 是一个对象类型的数据，包含 `name` 和 `email` 两项内容，用来替换用户已经保存的 `name` 和 `email` 的值。

### GraphiQL 测试更新用户接口

先通过获取所有用户信息的接口，找到一个测试用户的 `_id`:

```
{
  users {
    _id
  }
}
```

然后，把测试用户的 `_id` 和 `data` 对象作为参数传递给 `updateUser` 字段，`data` 对象包含修改后的用户信息：

```
mutation {
  updateUser(id: "the_user_id", data: {name: "doudou", email: "dou@dou.com"})
}
```

操作执行成功之后，返回值为：

```
{
  data {
    updateUser: true
  }
}
```

### 删除用户接口

在 `mutation` 类型下再添加一个删除用户信息的 `deleteUser` 字段，它接受一个 `id` 参数：

```
deleteUser: {
  type: userType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (_, {id}) => {
    return User.findByIdAndRemove(id).exec().then(user => user);
  }
}
```

`deleteUser` 的类型是自定义的 `userType` 类型，因为 `resolve` 函数中的 Mongoose 接口 [findByIdAndRemove]() 找到并删除目标用户之后，返回值是所删除用户的信息，满足我们自定义的 `userType` 类型。

### GraphiQL 测试删除用户接口

同样先找到一个测试用户的 `_id` 然后作为 `deleteUser` 字段的 `id` 参数值，然后执行下面的查询语句：

```
mutation {
  deleteUser(id: "the_user_id"){
    _id
  }
}
```

操作执行成功之后，返回值为所删除用户的完整信息。

### 删除所有用户接口

在 `mutation` 类型下再添加一个删除用户信息的 `deleteUser` 字段：

```
deleteAllUsers: {
  type: GraphQLBoolean,
  resolve: () => {
    return User.remove({}).exec()
  }
}
```

Mongoose 提供的删除数据库中所有用户信息的接口是 [remove]()

### GraphiQL 测试删除所有用户接口

在 GraphiQL 窗口的左侧边栏中，输入下面的查询语句：

```
mutation {
  deleteAllUsers
}
```

操作执行成功之后，返回值为：

```
{
  "data": {
    "deleteAllUsers": true
  }
}
```
