# 通过 Redux 设置 header 文本

每个页面上都需要显示不同的 header 文本，咱们用 redux 来实现这个效果。

### 修改 store 数据

src/components/Login.js

```js
import React, { Component } from 'react'
import { loginConfig } from '../constants/FormConfig'
import Form from './Form'

class Login extends Component {
  componentDidMount() {
    this.props.setTitle('登录')
  }
  render() {
    return <Form config={loginConfig} />
  }
}

export default Login
```

添加 componentDidMount 函数。这样页面加载时会执行 `setTitle` 这个 Action 。我这里想要做的事情就是在用户打开 login 页面的时候，自动把 `登录` 这两个字保存到 redux store 中。

src/containers/LoginContainer.js

```js
import React from 'react'
import Login from '../components/Login'
import { setTitle } from '../actions'
import { connect } from 'react-redux'

const LoginContainer = props => <Login {...props} />

export default connect(null, {
  setTitle
})(LoginContainer)
```

我们的思路是，容器组件要作为展示组件的鸡蛋壳，也就是所有的展示组件对外的数据读写操作都要通过容器组件，这个其实不是 react 或者 redux 的具体要求，只不过这样写，代码会变得简单好维护。所以这里在容器组件中导入 `setTitle` 然后传递给展示组件使用。

src/actions/index.js

```js
import * as types from '../constants/ActionTypes'

export const setTitle = title => dispatch => {
  dispatch({ type: types.SET_TITLE, title })
}
```

导入 action 类型定义，定义 `setTitle` 这个 action 创建函数。把 `title` 传递给 reducer 去处理。

咱们课程中的思路是，凡是跟向 redux 中写数据相关的操作都放到 Action 中，凡是跟从 redux 读取数据相关的操作都放到数据选择函数，也就是 Selector 中。而组件容器组件中，不做任何运算处理。

src/constants/ActionTypes.js

```js
export const SET_TITLE = 'SET_TITLE'
```

创建常量文件，保存 action 类型定义。

到这里，代码是不可能执行成功的，因为缺少对 redux 相关的基础包的安装和配置。马上来装包。

```
npm i redux redux-thunk react-redux
npm i -D redux-logger
```

redux-thunk 让我们可以在 Action 创建函数中返回函数，react-redux 提供 connect 接口，redux-logger 可以把发出的 Action 打印到终端中，属于一个开发工具，所以加上 `-D` 参数，仅在开发环境下安装。

src/index.js

```js
...
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'

let middleware = [thunk]

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require(`redux-logger`)
  middleware.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

导入 `Provider` 负责把 `store` 中的数据传递给各级组件。导入 `createStore` 来创建 store，`applyMiddleware` 加载中间件。导入 reducer 。导入 `thunk` 以便方便的使用 action 。

定义 middleware 数组，保存所有要加载的中间件。

在非产品环境下，导入 `logger` 。

创建 `store` 并加载中间件。最后用 Provider 包裹顶级组件 `App` 。

src/reducers/index.js

```js
import { combineReducers } from 'redux'
import common from './common'

export default combineReducers({
  common
})
```

我自己习惯的做法基本上是在所有的 reducer 中都使用 `combineReducers` 了。导入 `common` reducer ，里面放一些比较难以归类的 reducer 。导出 rootReducer 。

src/reducers/common.js

```js
import * as types from '../constants/ActionTypes'
import { combineReducers } from 'redux'

const title = (state = 'Yummy', action) => {
  switch (action.type) {
    case types.SET_TITLE:
      return action.title
    default:
      return state
  }
}

export default combineReducers({
  title
})
```

common reducer 中暂时只有一个 `title` reducer 来负责 `title` 数据。这个数据就是需要展示到 header 之上的文本。

浏览器中，刷新 /login 页面。终端中会看到 redux-logger 打印出的信息， Action 发出之后，新的状态树中已经包含 `common: { title: '登录'}` 数据了。

### 订阅 store 中的数据

store 中数据有了，下一步要把 redux 数据读出来，放到 Header 中显示。

src/selectors/index.js

```js
export const getTitle = state => state.common.title
```

就像前面所说，咱们的思路是，数据写到 store 之前，所需要的运算都通过 action 创建函数来完成。对应读取的时候，需要的运算都在 selectors 中完成。store 中固有的字段，使用 selector 选择函数有点无意义，但是其实项目中很多时候，都要使用到状态树中的数据的派生数据，这时候选择函数的优势就发挥出来了。

src/containers/LayoutContainer.js

```js
...
import { getTitle } from '../selectors'
import { connect } from 'react-redux'

const LayoutContainer = props => <Layout {...props} />

const mapStateToProps = state => ({
  title: getTitle(state)
})

export default connect(mapStateToProps)(LayoutContainer)
```

LayoutContainer 中，来通过 selector 函数获取数据。 `mapStateToProps` 语句中，通过 `getTitle` 选择函数得到的数据会保存到 `title` 变量中，并通过属性值的形式传递给展示组件。

src/components/Layout.js

```js
<Header>{this.props.title}</Header>
```

展示组件中，把 `title` 实现到显示到 header 上。

浏览器中，打开 /login 页面，可以看到 header 上显示出了 `登录` 两个字。

### 处理注册页面

其他的页面也跟 login 页面一样的处理方式即可。

src/components/Signup.js

```js
class Signup extends Component {
  componentDidMount() {
    this.props.setTitle('注册')
  }
}
```

展示组件中呼叫 action 。

src/containers/SignupContainer.js

```js
...
import { setTitle } from '../actions'
import { connect } from 'react-redux'

const SignupContainer = props => <Signup {...props} />

export default connect(null, {
  setTitle
})(SignupContainer)
```

容器组件中导入 `setTitle` 。

浏览器中，访问 /login 和 /signup 。看到 header 部分可以显示不同的文本。
