# 用户认证

这集来做注册和登录功能。

### 登录

src/components/Login.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Cart from '@material-ui/core/Card'
import PropTypes from 'prop-types'

const propTypes = {
  login: PropTypes.func.isRequired
}

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = () => {
    this.props.login(this.state)
    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    const { username, password } = this.state
    return (
      <Wrap>
        <StyledCart>
          <Field>
            <TextField
              name="username"
              onChange={this.handChange}
              value={username}
              label="用户名"
            />
          </Field>

          <Field>
            <TextField
              name="password"
              type="password"
              onChange={this.handChange}
              value={password}
              label="密码"
            />
          </Field>

          <ButtonField>
            <Button
              variant="raised"
              color="secondary"
              onClick={this.handleClick}
            >
              登录
            </Button>
          </ButtonField>
        </StyledCart>
      </Wrap>
    )
  }
}

Login.propTypes = propTypes

export default Login

const Wrap = styled.div``

const StyledCart = styled(Cart)`
  margin: 40px auto;
  max-width: 300px;
  padding: 20px;
`

const Field = styled.div`
  text-align: center;
  margin-bottom: 10px;
`

const ButtonField = styled.div`
  text-align: center;
  margin-top: 30px;
`
```

Login 的展示组件中，用 propTypes 类型检查，明确一下，唯一的对外接口就是 action 创建函数 `login` 。其他的内容，就是导入 mui 的组件，组成一个美观的表单，并且用受控组件的形式，获取用户输入，传递给 `login` 函数。

src/containers/LoginContainer.js

```js
import { login } from '../actions/authActions'

export default connect(mapStateToProps, { login })(LoginContainer)
```

容器组件中，导入 login 函数。

src/actions/index.js

```js
export const historyPush = path => {
```

actions/index.js 中导出 `historyPush` ，供其他 action 创建函数文件使用。

src/actions/authActions.js

```js
import { historyPush } from './index'

export const login = data => async dispatch => {
  console.log('login', data)
  dispatch(historyPush('/'))
}
```

创建 authActions.js 文件。`login` 函数中暂时打印一下用户提交数据，并做页面跳转。

浏览器中，填写表单并提交，终端中会打印出用户填写的内容。

### 请求登录 API

```
npm i axios
```

发请求还是使用 axios 。

src/actions/authActions.js

```js
import { historyPush } from './index'
import axios from 'axios'
import { LOGIN_URL } from '../constants/ApiConstants'
import * as types from '../constants/ActionTypes'
import { decodeJwt } from '../utils/jwtUtils'

export const login = data => async dispatch => {
  try {
    const res = await axios.post(LOGIN_URL, data)
    const { token } = res.data
    window.localStorage.setItem('jwtToken', token)
    const { username, admin } = decodeJwt(token)
    const isAdmin = admin
    dispatch({
      type: types.LOGIN_SUCCESS,
      currentUser: username,
      isAdmin
    })
    dispatch(historyPush('/'))
  } catch (err) {
    console.log('err', err.response.data.msg)
  }
}
```

把 login 函数完善起来。把用户的信息传递给后端的登录 API ，请求成功后就可以拿到 jwt 的 token 。把 token 保存到本地硬盘中备用。

解析 token 内容，可以拿到用户名和是否为 admin 的身份信息。把用户信息发送给 reducer 处理。然后重定向到首页。

如果 axios 请求错误，就打印一下服务器端返回的报错信息。

src/constants/ActionTypes.js

```js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
```

添加 action 类型 `LOGIN_SUCCESS` 。

src/constants/ApiConstants.js

```js
const SERVER = `http://localhost:3009`

export const LOGIN_URL = `${SERVER}/user/login`
```

创建常量文件，保存 API 链接。

```
npm i jsonwebtoken
```

安装 `jsonwebtoken` 对服务器端返回的 token 进行解析。

src/utils/jwtUtils.js

```js
import jwt from 'jsonwebtoken'

export const decodeJwt = token => {
  return jwt.decode(token)
}
```

添加 jwt 解码功能。

浏览器中，输入错误的用户名密码，可以看到终端中服务器返回的报错信息。

输入正确的，可以看到重定向到首页，终端中打印出了用户的身份信息。

### 注册

src/components/Signup.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'

const propTypes = {
  signup: PropTypes.func.isRequired
}

class Login extends Component {
  state = {
    username: '',
    password: '',
    passwordConfirm: ''
  }

  handChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = () => {
    this.props.signup(this.state)
    this.setState({
      username: '',
      password: '',
      passwordConfirm: ''
    })
  }

  render() {
    const { username, password, passwordConfirm } = this.state
    return (
      <Wrap>
        <StyledCard>
          <Field>
            <TextField
              name="username"
              onChange={this.handChange}
              value={username}
              label="用户名"
            />
          </Field>

          <Field>
            <TextField
              name="password"
              type="password"
              onChange={this.handChange}
              value={password}
              label="密码"
            />
          </Field>

          <Field>
            <TextField
              name="passwordConfirm"
              type="password"
              onChange={this.handChange}
              value={passwordConfirm}
              label="再次输入密码"
            />
          </Field>

          <ButtonField>
            <Button
              variant="raised"
              color="secondary"
              onClick={this.handleClick}
            >
              注册
            </Button>
          </ButtonField>
        </StyledCard>
      </Wrap>
    )
  }
}

Login.propTypes = propTypes

export default Login

const Wrap = styled.div``

const StyledCard = styled(Card)`
  margin: 40px auto;
  max-width: 300px;
  padding: 20px;
`

const Field = styled.div`
  text-align: center;
  margin-bottom: 10px;
`

const ButtonField = styled.div`
  text-align: center;
  margin-top: 30px;
`
```

注册部分的逻辑跟 Login 完全一样，受控组件，把用户提交的内容传递给 `signup` 函数。

src/constants/ActionTypes.js

```js
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
```

添加 signup 需要的 action 类型。

ApiConstants.js

```js
export const SIGNUP_URL = `${SERVER}/user/signup`
```

添加 signup 需要的 API 链接。

actions/authActions.js

```js
import { historyPush } from './index'
import axios from 'axios'
import { LOGIN_URL, SIGNUP_URL } from '../constants/ApiConstants'
import * as types from '../constants/ActionTypes'
import { decodeJwt } from '../utils/jwtUtils'

const handleAuth = async (AUTH_URL, AUTH_ACTION, data, dispatch) => {
  try {
    const res = await axios.post(AUTH_URL, data)
    const { token } = res.data
    const { username, admin } = decodeJwt(token)
    const isAdmin = admin
    window.localStorage.setItem('jwtToken', token)
    dispatch(historyPush('/'))
    dispatch({
      type: types[AUTH_ACTION],
      currentUser: username,
      isAdmin
    })
  } catch (err) {
    console.log(err)
    err.response && console.log('err', err.response.data.msg)
  }
}

export const login = data => dispatch => {
  handleAuth(LOGIN_URL, 'LOGIN_SUCCESS', data, dispatch)
}

export const signup = data => dispatch => {
  handleAuth(SIGNUP_URL, 'SIGNUP_SUCCESS', data, dispatch)
}
```

由于 login 和 signup 逻辑基本一样，所以抽出 `handleAuth` 函数，然后通过传递不同的参数，就可以分别实现 `login` 和 `signup` 了。

src/containers/SignupContainer.js

```js
import React from 'react'
import { connect } from 'react-redux'
import Signup from '../components/Signup'
import { signup } from '../actions/authActions'

const SignupContainer = props => <Signup {...props} />

export default connect(null, { signup })(SignupContainer)
```

容器组件中导入 signup 。

浏览器中，测试注册功能，发现可以完美的处理正确和报错状态。
