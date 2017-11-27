# 跳转到登录前的页面（第一部分）

这集开始，分几节对于官方的 https://reacttraining.com/react-router/web/example/auth-workflow 这个案例进行拆分讲解，本节先来讲清楚下面的代码：



```js
import React from 'react'

import {
  BrowserRouter as Router,
  Link,
  Route,
  withRouter,
  Redirect
} from 'react-router-dom'

const Public = () => <h3>公开页面</h3>
const Video = () => <h3>视频页面</h3>

const fakeAuth = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true
    console.log(this.isAuthenticated)
  }
}


class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate()
    this.setState({
      redirectToReferrer: true
    })
  }
  render() {
    if (this.state.redirectToReferrer) {
      return (
        <Redirect to={'/'} />
      )
    }
    return (
      <div>
        <button onClick={this.login}>登录</button>
      </div>
    )
  }
}


const AuthButton = withRouter(() => (
  fakeAuth.isAuthenticated ? (
    <p>你好！</p>
  ) : (
    <p>尚未登录</p>
  )
))


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li><Link to="/public">公开页面</Link></li>
            <li><Link to="/video">视频</Link></li>
            <li><Link to="/login">登录</Link></li>
          </ul>
          <Route path="/public" component={Public}/>
          <Route path="/login" component={Login}/>
          <Route path="/video" component={Video}/>
        </div>
      </Router>
    )
  }
}

export default App
```
