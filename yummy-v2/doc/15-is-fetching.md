# 处理加载状态

欢迎进入最后一节《处理加载状态》。用户执行操作后往往需要去请求网络数据，这时候就有一个数据加载时间，需要显示一个转轮图标，这样用户体验才足够好。

### 设置加载状态字段

首先要到 api 项目中把登录注册接口的响应故意延时一下，设置为 4 秒后返回。

先添加 Action 类型定义

src/constants/ActionTypes.js

```js
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
```

LOGIN_REQUEST 和 SIGNUP_REQUEST 用来记录异步请求发起之前的那一瞬间，也就是加载过程的开始时间点，下划线 FAILURE 和之前我们定义过的下划线 SUCCESS 对应的这些 action 都是加载过程的结束时间点。

src/reducers/auth.js

```js
const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.SIGNUP_REQUEST:
      return true
    case types.LOGIN_SUCCESS:
    case types.RECEIVE_CURRENT_USER:
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_FAILURE:
    case types.SIGNUP_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  isAuthenticated,
  currentUserId,
  isFetching
})
```

再来添加 isFetching 对应的 reducer 。

src/actions/authActions.js

```js
export const signup = data => dispatch => {
  dispatch({ type: types.SIGNUP_REQUEST })
  axios
    .post(SIGNUP_URL, data)
    .then(res => {
      ...
    })
    .catch(err => {
      if (err.response) {
        dispatch({ type: types.SIGNUP_FAILURE })
        ...
      }
    })
}



export const login = data => {
  return (dispatch, getState) => {
    dispatch({ type: types.LOGIN_REQUEST })
    axios
      .post(LOGIN_URL, data)
      .then(res => {
        ...
      })
      .catch(err => {
        if (err.response) {
          dispatch({ type: types.LOGIN_FAILURE })
          ...
        }
      })
  }
}
```

请求发起前，发出 `LOGIN_REQUEST` ，请求成功，发出 `LOGIN_SUCCESS` ，请求失败，发出 `LOGIN_FAILURE` 。

浏览器中，登录或者注册过程开始，终端中可以看到 isFetching 会被设置为 true ，随后不管操作成功或者是失败 isFetching 都会变为 false 。这正是我们需要的效果。

### 添加 Spinner

只要处于加载状态，也就是 isFetching 为 true 的这段时间，我们就让页面上显示一个转轮图标 。

```
npm i react-spinner
```

先来装包。

src/assets/global.css

```css
@import '~react-spinner/react-spinner.css';
```

导入一些 css 内容进来。

src/selectors/authSelectors.js

```js
export const getIsAuthFetching = state => state.auth.isFetching
```

要拿到 isFetching 数据，首先来定义 selector 。

src/containers/LoginContainer.js

```js
import { getIsAuthFetching } from '../selectors/authSelectors'

const mapStateToProps = state => ({
  isFetching: getIsAuthFetching(state)
})

export default connect(mapStateToProps, {
  setTitle,
  login,
  setReferrerIfNeeded
})(LoginContainer)
```

容器组件中拿到 `isFetching` ，传递给展示组件。

src/components/Login.js

```js
import Spinner from 'react-spinner'
import styled from 'styled-components'

class Login extends Component {
  render() {
    const { isFetching } = this.props
    return (
      <Wrap>
        {isFetching ? (
          <Spinner />
        ) : (
          <Form config={loginConfig} onFormSubmit={this.props.login} />
        )}
      </Wrap>
    )
  }
}

const Wrap = styled.div`
  height: 100%;
`
```

只要 isFetching 为 true ，就显示转轮图标。

看看本部分达成的效果。登录的时候的确能显示图标。

好，至此咱们这门课程就结束了，没有做完的部分到《社交化电商--功能篇》课程中继续。
