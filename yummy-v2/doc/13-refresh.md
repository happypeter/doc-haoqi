# 持久化登录态

所谓《持久化登录态》，主要应对用户刷新网页或者关闭网页重新打开的场景。

### 保存用户机密信息到 localStorage

不管是传统的 session 形式，还是比较摩登的 JWT ，持久化登录态的方式都是要把一串信息保存到浏览器端的系统硬盘上。

src/actions/authActions.js

```js
export const signup = data => dispatch => {
    .then(res => {
      dispatch({ type: types.SIGNUP_SUCCESS, user: res.data.user })
      window.localStorage.setItem('userId', res.data.user._id)
      history.push('/dashboard')
    })
}

export const login = data => {
      .then(res => {
        dispatch({ type: types.LOGIN_SUCCESS, user: res.data.user })
        window.localStorage.setItem('userId', res.data.user._id)
        history.push('/dashboard')
      })
}
```

authActions 中，我们这里采用的形式是，保存用户 id 到 localStorage 中。用户注册成功，需要保存，用户登录成功也需要保存一下。

看看本部分达成的效果。执行用户登录或者注册操作，成功后。到 chrome 终端中运行

```
localStorage.getItem('userId')
```

读取 localStoreage 中 `userId` 的字段的操作，就能看到保存的一串数，也就是 userId 了。

### 刷新时加载用户数据

页面刷新时 redux 中的数据会全部丢失，所以需要用 localStorage 中存储的 userId 去 API 中再次获取当前用户数据。

src/constants/ApiConstants.js

```js
export const USER_BY_ID_URL = `${API_HOSTNAME}/user/:id`
```

需要请求一个新的 API ，所以先把链接写到常量文件中。 根据用户 id 获取这位用户的详情。

src/constants/ActionTypes.js

```js
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
```

接下来定义 Action 类型。 `RECEIVE_CURRENT_USER` ，“接收当前用户的详情”。

src/actions/authActions.js

```js
import {
  SIGNUP_URL,
  LOGIN_URL,
  USER_BY_ID_URL
} from '../constants/ApiConstants'

const receiveCurrentUser = user => ({
  type: types.RECEIVE_CURRENT_USER,
  user
})

export const fetchCurrentUser = () => dispatch => {
  const id = window.localStorage.getItem('userId')
  if (id) {
    axios.get(USER_BY_ID_URL.replace(':id', id)).then(res => {
      dispatch(receiveCurrentUser(res.data.user))
    })
  }
}
```

首先导入 API 链接，然后定义 `receiveCurrentUser` ，发起 `RECEIVE_CURRENT_USER` 这个 action ，把参数中的信息发送给 reducer 。下面，定义 `fetchCurrentUser` ，其中首先要拿到本地存储的 id ，然后发送到服务器上获取当前用户的信息，再把信息传递给 `receiveCurrentUser` 。

src/reducers/auth.js

```js
const isAuthenticated = (state = false, action) => {
  switch (action.type) {
    ...
    case types.RECEIVE_CURRENT_USER:
      return true

    default:
      return state
  }
}

const currentUserId = (state = '', action) => {
  switch (action.type) {
  ...
    case types.RECEIVE_CURRENT_USER:
      return action.user._id
    default:
      return state
  }
}
```

reducer 中收到 action ，有两个事情要做，第一个把表征登录状态的 isAuthenticated 设置为 true ，第二个保存当前用户的 id 。

最后，让页面刷新时，执行刚刚定义的 action 。

src/containers/App.js

```js
import { fetchCurrentUser } from '../actions/authActions'

class App extends Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchCurrentUser()
  }
}

export default connect(null, {
  fetchUsers,
  fetchCurrentUser
})(App)
```

App 组件加载后执行 fetchCurrentUser 。

登录后，刷新页面，可以看到侧边栏上用户依然处于登录状态。
