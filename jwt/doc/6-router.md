# redux 和 react-router

搭建一下基础设施。

### 添加 redux

```
npm i redux react-redux redux-thunk redux-logger
```

安装需要的 redux 相关包。

```js
// src/index.js

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './containers/App'

let middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  const { logger } = require(`redux-logger`)
  middleware = [...middleware, logger]
}

const store = createStore(reducer, applyMiddleware(...middleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

在 src/index.js 中创建 store ，并加载中间件。

```js
// src/reducers/index.js

import { combineReducers } from 'redux'
import common from './common'

export default combineReducers({
  common
})
```

创建 reducer 文件。

```js
// src/reducers/common.js

import { combineReducers } from 'redux'

const isAuthenticated = (state = false, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  isAuthenticated
})
```

common reducer 中保存用来体现登录态的状态值 `isAuthenticated` 。

```js
// src/containers/HeaderContainer.js

import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'

const HeaderContainer = props => <Header {...props} />

const mapStateToProps = state => ({
  isAuthenticated: state.common.isAuthenticated
})

export default connect(mapStateToProps)(HeaderContainer)
```

Header 容器组件中，导入 `isAuthenticated` 。

```js
// src/containers/Header.js

import PropTypes from 'prop-types'

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const { isAuthenticated } = this.props

{
  isAuthenticated ? logout : login
}

Header.propTypes = propTypes
```

Header 的容器组件中添加属性类型检查，然后导入并使用 `isAuthenticated` 。

浏览器中，看到 `isAuthenticated` 的 false 状态被读出来了，所以界面上显示出未登录的状态。

### 路由

```
npm i react-router history
```

装包。

```js
// src/utils/historyUtils.js

import createHistory from 'history/createBrowserHistory'
export default createHistory()
```

创建一个全局可用的 `history` 对象，便于编程式页面跳转，说白了就是为了用 `history.push` 。

```js
// src/containers/App.js
import { Router } from 'reacr-router'
import history from '../utils/historyUtils'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Main />
      </Router>
    )
  }
}
```

App 组件中，从 `react-router` 中导入 `Router` ，让 Router 使用这个全局的 history 。官方还有一个 react-router-dom 包，咱们不用，因为那里面的 Router 是内置自己的 history 的。

```js
// src/components/Main.js

import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { Switch, Route } from 'react-router'
import Home from '../containers/HomeContainer'
import Login from '../containers/LoginContainer'
import Signup from '../containers/SignupContainer'
import Header from '../containers/HeaderContainer'

class App extends Component {
  render() {
    return (
      <Wrap>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Wrap>
    )
  }
}

export default App

const Wrap = styled.div``
```

Main 组件中，添加指向登录注册和新建文章的各个页面的路由。对应的还要添加 `Home Login Signup` 这几个家伙的容器和展示组件。内容都是空的，这里就不粘贴了。

页面中，访问 `/login` `/signup` 这些链接，已经可以打开页面了。

### 编程式导航

总觉得代码写好之后，把一个按钮再变成一个 React Router 的 Link 组件会比较麻烦，因为还要改 css 。

src/actions/index.js

```js
import history from '../utils/historyUtils'
import * as types from '../constants/ActionTypes'

const historyPush = path => {
  history.push(path)
  return { type: types.CHANGE_PATH, path }
}

export const goto = path => dispatch => {
  dispatch(historyPush(path))
}
```

创建 action 创建函数文件，里面导入 `history` 然后定义一个 `goto` 函数，专门做页面跳转，然后发出一个 action 。 以后，action 内要执行页面跳转，就都执行这个 `historyPush` 函数。组件文件中要是需要页面跳转，就导入 `goto` 函数。

src/constants/ActionTypes.js

```js
export const CHANGE_PATH = 'CHANGE_PATH'
```

src/containers/HeaderContainer.js

```js
import { goto } from '../actions'

const HeaderContainer = props => <Header {...props} />

export default connect(mapStateToProps, { goto })(HeaderContainer)
```

Header 的容器组件中导入。

```js
const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  goto: PropTypes.func.isRequired
}


  render() {
    const { isAuthenticated, goto } = this.props

    const login = (
      <Login>
        <StyledButton onClick={() => goto('/login')} color="inherit">
          登录
        </StyledButton>
        <StyledButton onClick={() => goto('/signup')} color="inherit">
          注册
        </StyledButton>
      </Login>
    )

    return (
      <AppBar position="static">
        <Inner>
          <IconButton onClick={() => goto('/')} color="inherit">

        </Inner>
      </AppBar>
    )
  }
}
```

展示组件中，添加 `goto` 的类型检查。然后从属性中拿到，在所有需要执行页面跳转的按钮上用一下。

浏览器中，点各个按钮，页面成功跳转，而且可以终端中显示出 redux-logger 的打印信息，虽然咱们咱们不用把路径保存到 store 中，但是这些信息留着，没准就会很有用。
