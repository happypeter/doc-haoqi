# 管理当前用户信息

欢迎进入新的一节《管理当前用户信息》。核心就是对 currentUser 这个变量的管理，用它来存放当前用户的各种信息。

### redux 中存储当前用户

进入《redux 中存储当前用户》这个部分。用一个新的状态 auth.currentUserId 存储当前用户的 id ，注意，这里只存一个 id ，详细用户信息可以到 users 自己的数据中去取，这样的好处是避免维护两份相同数据。

来想办法存储当前用户的 id ，首先用户登录成功后要把包含 id 的用户信息发送给 reducer ，这个在 authActions 文件的 dispatch 语句中之前已经添加过了，所以现在需要添加 reducer 处理这些数据。

```diff
currentuserid-reducer
```

这样就把当前用户的 id 存储到了状态树中。

看看本部分达成的效果。登录或者注册成功后，redux-logger 就会打印出 Action 执行的信息。可以看到当前用户的 id 已经被保存到到了 auth.currentUserId 中了。

至此，《redux 中存储当前用户》这部分就胜利完成了。

### 保存所有用户信息

进入《保存所有用户信息》这个部分。前面已经存储了当前用户 id ，但是如果我想要当前用户的用户名或者其他信息呢，就要去所有用户信息中去找了。

到 Postman 中先调试一下 API 。发起请求

```
GET localhost:3008/users
```

服务器端会返回包含用户名和用户 id 的所有用户信息。

先来添加 Action 类型。

```diff
receive-users
```

接收所有用户信息的时候会被发出。

接下来到 action 中去使用。


```diff
fetchuser-action
```

fetchusers 意思是去取用户信息，这个过程中可以发出多个 action ，例如出了我们这里的接收 users 之外，还可以发出请求失败等其他 action 。

代码中用到了 USERS_URL ，需要定义一下。

```diff
users-url
```

接下来要去组件中触发 fetchUsers 这个 action 。因为 users 数据未来会在多个组件中用到，所以干脆就在程序加载的时候获取它。

```diff
call-fetchusers
```

首先导入 fetchUsers 和 connect ，然后在 App 组件挂载后立即执行 fetchUsers ，最后几行是把 fetchUsers 映射为当前组件的属性。

真正修改状态树，还是需要添加 reducer 。

到 rootReducer 里面再专门添加一个 user Reducer 。

```diff
import-user-reducer
 ```

 导入一下 user ，然后加到 combineReducers 中。
 
 添加 user reducer 。

```diff
user-reducer
```

每当收到 RECEIVE_USERS action 后，把接收到的所有用户的数据，存放到 user.all 状态中。

看看本部分达成的效果。刷新页面，redux-logger 中的信息会打印出来。可以看到所有用户的信息已经保存到 user.all 状态中了。

至此，《保存所有用户信息》这部分就胜利完成了。

### Reselect 获取派生数据

进入下一部分《Reselect 获取派生数据》。保存数据的原则是要有 Single Source Of Truth ，唯一可信数据源。所以 redux 中不建议保存冗余信息，例如保存当前用户 id 和所有用户信息即可，那么当前用户详细信息，作为派生出来的数据，可以直接到 selector 中去运算获得，为了避免重复运算造成的资源浪费，所以才有 [reselect](https://github.com/reactjs/reselect) 来进行数据缓存。

首先来装包

```
npm i reselect
```

包就装好了。

作为准备工作，需要把所有用户数据的格式稍作调整。

```
getusersbyid
```

首先把状态树中的所有用户信息通过 getUsers 这个选择器拿到，把它最为第一个参数传递给 createSelector 接口，getUsers 的返回值，会赋值到后面这个回调函数的参数 users 之上，而回调函数的返回值会最终作为 getUsersById 选择器的返回值。回调函数中通过 reduce 的使用把原有的数组形式变成了对象形式，方便后续根据一个用户的 id 直接取这个用户的详情。

接下来定义 getCurrentUser 选择器。

```diff
getcurrentuser
```

首先导入了 getUserById ，再通过 getCurrentUserId 拿到当前用户的 id ，这样就很容易实现 getCurrentUser 选择器了，万一所有用户信息为空，我们也给 getCurrentUser 赋值为一个空对象，不要让他返回 undefined ，避免后续报错。


下一步就是使用当前用户信息了，到展示组件中先拿到这些信息存放到 currentUser 变量中。

```diff
currentuser
```

导入定义好的选择器，然后 mapStateToProps 中使用一下即可。

接下来展示组件中使用 currentUser 数据。

```diff
show-name
```

首先参数中结构赋值拿到 currentUser ，然后替换原先的固定字符串为当前用户的名字。

看看本部分达成的效果。

至此，《Reselect 获取派生数据》这部分就胜利完成了。

### 结语

进入最后一部分《结语》。

先来复盘一下本节的思路。宏观上的核心目的就是拿到当前用户数据，具体做法是先把当前用户 id 保存到 redux 中，然后拿到所有用户信息，二者在 selector 中进行混合运算就可以派生出 currentUser 数据，重复运算对带来性能问题，所以引入了 reselect 来进行数据的缓存。

再来看看本节的最终劳动成果。可见的成果非常简单明了，用户登录后可以看得见自己的用户名了。底层的成果非常的坚固实用，用 reselect 实现 selector 这种形式可以让我们在 redux 中只保留最简数据，为后续添加功能提供了坚实的基础。

至此，《管理当前用户信息》这一小节就胜利完成了。