# 请求 API 实现登录注册

用代码来请求 API ，实现登录注册功能。

### Action 中使用 axios

先来请求注册接口。

```
npm i axios
```

安装 axios 。

src/constants/ApiConstants.js

```js
const API_HOSTNAME = '//localhost:3008'

export const SIGNUP_URL = `${API_HOSTNAME}/user/signup`
```

先把 API 链接添加到常量文件中。

src/actions/authActions.js

```js
import axios from 'axios'
import { SIGNUP_URL } from '../constants/ApiContants'

export const signup = data => dispatch => {
  axios
    .post(SIGNUP_URL, data)
    .then(res => {
      console.log('res', res.data)
    })
    .catch(err => {
      if (err.response) {
        const { msg } = err.response.data
        console.log(msg)
      }
    })
}
```

action 文件中请求一下注册 API ，分别打印出正确和报错情况的返回结果。

src/containers/SignupContainer.js

```js
import React from 'react'
import Signup from '../components/Signup'
import { setTitle } from '../actions'
import { signup } from '../actions/authActions'
import { connect } from 'react-redux'

const SignupContainer = props => <Signup {...props} />

export default connect(null, {
  setTitle,
  signup
})(SignupContainer)
```

容器组件中导入，signup 这个 action 创建函数 ，传递给展示组件。

src/components/Signup.js

```js
<Form config={signupConfig} onFormSubmit={this.props.signup} />
```

展示组件中继续传递， 交给 Form 组件去处理。

Form 组件中。

```js
this.props.onFormSubmit(data)
```

用户点注册按钮的时候，执行这个函数。

到注册页面，填写用户名密码，注册成功然后重复注册，终端会分别显示出成功和失败信息。

### 调通登录功能

注册弄完了，下面来调登录功能。思路跟注册完全一样，读后端 api 文档，实现 action 创建函数，容器组件中导入，展示组件中使用。

详细代码参看 [commit](https://github.com/haoqicat/yummy-v2/commit/c62613ded9bbb26a964a203fb3be33b394f3c3a9)。

登录页面上，输入正确的用户名密码，然后改用错用户名，再改用错密码。可以看到这三种情况都有各自的返回信息。
