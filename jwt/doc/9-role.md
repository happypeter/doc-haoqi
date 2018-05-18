# 权限控制

管理员用户可以发表新文章，而非管理员是没有发布文章的权限的，本节来体现出这个效果。

### 添加创建新文章按钮

src/components/Home.js

```js
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

const propTypes = {
  goto: PropTypes.func.isRequired
}

class Home extends Component {
  render() {
    const { goto } = this.props
    return (
      <Wrap>
        <StyledButton
          onClick={() => goto('/post/new')}
          variant="raised"
          color="secondary"
        >
          创建新文章
        </StyledButton>
      </Wrap>
    )
  }
}

Home.propTypes = propTypes

export default Home

const StyledButton = styled(Button)`
  && {
    margin: 20px auto;
    display: block;
  }
`
```

Home 组件中添加一个按钮进来，指向新建文章页面。

src/containers/HomeContainer.js

```js
import { connect } from 'react-redux'
import { goto } from '../actions'

const HomeContainer = props => <Home {...props} />

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { goto })(HomeContainer)
```

容器组件中，导入 `goto` 方便进行页面跳转。

浏览器中，看到首页的按键出来了。

### 新建文章页面 UI

src/components/Main.js

```js
import PostNew from '../containers/PostNewContainer'

<Container>
  <Switch>
    <Route path="/post/new" component={PostNew} />
  </Switch>
</Container>

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
`
```

Main 组件中添加一个新页面路由，指向新建文章页面。添加一个 `Container` 组件，让页面主体内容窄一些，居中显示。

src/containers/PostNewContainer.js

```js
import React from 'react'
import { connect } from 'react-redux'
import PostNew from '../components/PostNew'

const PostNewContainer = props => <PostNew {...props} />

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(PostNewContainer)
```

容器组件中暂时没有实质性内容。

src/components/PostNew.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class PostNew extends Component {
  state = {
    title: '',
    body: ''
  }

  handChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = e => {
    console.log(this.state)
    this.setState({
      title: '',
      body: ''
    })
  }

  render() {
    const { title, body } = this.state
    return (
      <Wrap>
        <Field>
          <TextField
            name="title"
            onChange={this.handChange}
            value={title}
            label="标题"
          />
        </Field>

        <Field>
          <TextField
            name="body"
            multiline={true}
            onChange={this.handChange}
            value={body}
            label="内容"
            rows={4}
          />
        </Field>
        <Button onClick={this.handleClick} variant="raised" color="secondary">
          发布
        </Button>
      </Wrap>
    )
  }
}

export default PostNew

const Wrap = styled.div`
  margin-top: 30px;
`

const Field = styled.div`
  margin-bottom: 30px;
`
```

展示组件中添加一个基本的受控组件，收集用户输入数据。

浏览中，到新建文章页面，填写些内容，点提交按钮，可以在终端中打印出来了。

### 请求 API

下面来请求 API ，提交文章数据。

api/utils/jwt.js

```js
const generateToken = user => {
  return jwt.sign(user, CERT, {
    expiresIn: 1000 // 单位是秒
  })
}
```

到服务器端，把 token 的过期时间设置的长一些，便于测试。

回到客户端代码。

ApiConstants.js

```js
export const POST_URL = `${SERVER}/post`
```

添加 API 链接。

ActionTypes.js

```js
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
```

添加 action 类型定义。

actions/postActions.js

```js
import { historyPush, alert } from './index'
import axios from 'axios'
import { POST_URL } from '../constants/ApiConstants'
import * as types from '../constants/ActionTypes'

export const submitPost = data => async dispatch => {
  try {
    const res = await axios.post(POST_URL, data, {
      headers: { Authorization: window.localStorage.getItem('jwtToken') }
    })
    dispatch({ type: types.ADD_POST_SUCCESS, post: res.data })
    historyPush('/')
  } catch (err) {
    console.log(err)
    err.response && dispatch(alert(err.response.data.msg))
  }
}
```

创建 postActions 文件。`submitPost` 也就是提交文章的函数中。要从本地 localStorage 获取 `jwtToken` 然后以服务器端要求的格式，也就是以 header 的 `Authorization` 字段发送给服务器，这里的首字符大小写均可。这也就意味着未登录的用户肯定不能请求成功的。如果再去 api 代码的 requireAuth 中间件去看一下，会发现对用户是否是管理员也是有检查的。

如果请求成功，就发 `ADD_POST_SUCCESS` action ，把返回的数据传递给 reducer ，并跳转到首页。

请求失败，就显示服务器端的报错信息。

containers/PostNewContainer.js

```js
import { submitPost } from '../actions/postActions'

export default connect(mapStateToProps, { submitPost })(PostNewContainer)
```

容器组件中导入 `submitPost`。

components/PostNew.js

```js
 handleClick = e => {
    this.props.submitPost(this.state)
```

展示组件中点提交按钮后执行。

浏览器中，普通用户登录后发文章，会报错，用管理员用户 aa 登录，可以发表成功。

### 首页隐藏按钮

既然非管理员用户是不能发表文章的，所以干脆就让发表文章的按钮，只对管理员用户可见。

reducers/common.js

```js
const isAdmin = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return action.isAdmin
    case types.LOGOUT_SUCCESS:
      return false
    case types.LOAD_CURRENT_USER:
      return action.isAdmin
    default:
      return state
  }
}

export default combineReducers({
  isAuthenticated,
  currentUser,
  alert,
  isAdmin
})
```

common reducer 中添加 isAdmin 这一项，对应的 action 其实前面都已经把 admin 的数据准备好了，不信可以看看 redux-logger 的输出。所以这里只需要在登录注册成功把它设置为 true ，退出登录的时候设置为 false ，页面刷新的时候，也会有 `LOAD_CURRENT_USER` 负责更新 isAdmin 。

HomeContainer.js

```js
const mapStateToProps = state => ({
  isAdmin: state.common.isAdmin
})
```

Home 的容器组件中导入它。

Home.js

```js
const propTypes = {
  goto: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

const { goto, isAdmin } = this.props

{
  isAdmin && (
    <StyledButton
      onClick={() => goto('/post/new')}
      variant="raised"
      color="secondary"
    >
      创建新文章
    </StyledButton>
  )
}
```

展示组件中，通过判断 `isAdmin` 来决定是否显示按钮。

浏览器中，可以看到，只有管理员用户登录后，才能看到这个按钮。

### 首页显示文章列表

最后让首页显示出文章列表。这个跟 JWT 就没有太多关系了。所以大家直接到 github 仓库中拿到源码即可。

浏览器中，可以看到每次发布成功，都可以成功跳转到首页，并且看到新文章了。

至此，咱们这门课就胜利结束了。
