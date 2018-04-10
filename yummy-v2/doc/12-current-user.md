# 管理当前用户信息

进入新的一节《管理当前用户信息》。核心就是对 currentUser 这个变量的管理，用它来存放当前用户详细信息。

### redux 中存储当前用户

/src/reducers/auth.js

```js
const currentUserId = (state = '', action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return action.user._id
    default:
      return state
  }
}

export default combineReducers({
  isAuthenticated,
  currentUserId
})
```

用一个新的状态 currentUserId 存储当前用户的 id ，注意，这里只存一个 id ，详细用户信息可以到 users 自己的数据中去取，这样的好处是避免维护两份相同数据，出现数据冗余。

首先用户登录成功后要把包含 id 的用户信息发送给 reducer ，这个在 authActions 文件的 dispatch 语句中之前已经添加过了，所以现在 reducer 中保存一下即可。

这样，登录或者注册成功后，可以看到当前用户的 id 已经被保存到到了 auth.currentUserId 中了。

### 保存所有用户信息

前面已经存储了当前用户 id ，但是如果我想要当前用户的用户名或者其他信息呢，就要去所有用户信息中去找了。

到 Postman 中先调试一下 API 。发起请求

```
GET localhost:3008/users
```

服务器端会返回包含 username 和 id 的所有用户信息组成的数组。

接下了，咱们把这些数据保存到 store 中。

src/constatns/ActionTypes.js

```js
export const RECEIVE_USERS = 'RECEIVE_USERS'
```

先来添加 Action 类型。

src/actions/userActions.js

```js
import * as types from '../constants/ActionTypes'
import axios from 'axios'
import { USERS_URL } from '../constants/ApiConstants'

export const receiveUsers = users => ({
  type: types.RECEIVE_USERS,
  users
})

export const fetchUsers = () => dispatch => {
  axios.get(USERS_URL).then(res => {
    dispatch(receiveUsers(res.data.users))
  })
}
```

导入 action 类型，导入 `axios` ，`USERS_URL` 是请求所有用户数据的 api 链接。

定义 `receiveUsers` 创建函数，发出 `RECEIVE_USERS` action ，并把所有用户的数据 `user` 发送给 reducer 。

`fetchusers` 这个创建函数中去取用户信息，使用 `axios` 请求 api ，然后把拿到的所有用户数据，也就是 `res.data.users` 传递给 `receiveUsers` 。

src/constants/ApiConstants.js

```js
export const USERS_URL = `${API_HOSTNAME}/users`
```

USERS_URL ，需要定义一下。

src/reducers/index.js

```js
import { combineReducers } from 'redux'
import common from './common'
import auth from './auth'
import user from './user'

export default combineReducers({
  common,
  auth,
  user
})
```

到 rootReducer 里面再专门添加一个 user Reducer 。

src/reducers/user.js

```js
import * as types from '../constants/ActionTypes'
import { combineReducers } from 'redux'

const all = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_USERS:
      return action.users
    default:
      return state
  }
}

export default combineReducers({
  all
})
```

创建 reducers/user.js 文件，每当收到 RECEIVE_USERS action 后，把接收到的所有用户的数据，存放到 user.all 状态中。

下面的任务就是如何触发 action 了。

src/containers/App.js

```js
import { fetchUsers } from '../actions/userActions'
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }
}

export default connect(null, {
  fetchUsers
})(App)
```

因为 users 数据未来会在多个组件中用到，所以干脆就在 App 组件加载的时候获取它。

首先导入 fetchUsers 和 connect ，然后在 App 组件挂载后立即执行 fetchUsers ，最后几行是把 fetchUsers 映射为当前组件的属性。

刷新页面，redux-logger 中的信息会打印出来。可以看到所有用户的信息已经保存到 user.all 状态中了。

### Reselect 获取派生数据

前面提过的是，store 中不建议保存冗余信息，例如分别保存当前用户 id 和所有用户信息即可，那么当前用户详细信息可以通过 selector 函数把二者进行混合运算而获取。为了避免 selector 反复执行造成的资源浪费，可以用 [reselect](https://github.com/reactjs/reselect) 来进行数据缓存。

```
npm i reselect
```

包就装好了。

src/selectors/userSelectors.js

```js
import { createSelector } from 'reselect'

export const getUsers = state => state.user.all

export const getUsersById = createSelector(getUsers, users =>
  users.reduce((obj, user) => {
    obj[user._id] = user
    return obj
  }, {})
)
```

创建 selectors 文件夹下的 userSelectors.js 文件。作为准备工作，需要把所有用户数据的格式稍作调整。

首先把状态树中的所有用户信息通过 getUsers 这个选择器拿到，把它最为第一个参数传递给 createSelector 接口，getUsers 的返回值，会赋值到后面这个回调函数的参数 users 之上，而回调函数的返回值会最终作为 getUsersById 选择器的返回值。回调函数中通过 reduce 的使用把原有的数组形式变成了对象形式，方便后续根据一个用户的 id 直接取这个用户的详情。

src/selectors/authSelectors.js

```js
import { createSelector } from 'reselect'
import { getUsersById } from './userSelectors'

export const getCurrentUserId = state => state.auth.currentUserId

export const getCurrentUser = createSelector(
  getUsersById,
  getCurrentUserId,
  (users, currentUserId) => users[currentUserId] || {}
)

export const getIsAuthenticated = state => state.auth.isAuthenticated
```

再到专门负责认证的选择器文件 authSelectors.js 中，首先导入了 getUserById ，再通过 getCurrentUserId 拿到当前用户的 id ，这样就很容易实现 getCurrentUser 选择器了，万一所有用户信息为空，我们也给 getCurrentUser 赋值为一个空对象，不要让他返回 undefined ，避免后续报错。

下一步就是使用当前用户信息了。

src/containers/SidebarContainer.js

```js
import { getIsAuthenticated, getCurrentUser } from '../selectors/authSelectors'

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  currentUser: getCurrentUser(state)
})
```

导入定义好的选择函数，然后 mapStateToProps 中使用一下即可。

src/components/SidebarUserInfo.js

```js
<Name to="/profile">{currentUser.username}</Name>
```

展示组件中显示出当前用户的名字。

至此，登录成功后，侧边栏中可以看到真实的用户名了。
