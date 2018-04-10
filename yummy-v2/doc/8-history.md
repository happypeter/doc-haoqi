# JS 实现页面跳转

注册和登录成功后，需要跳转一下。这集来看看如何不用点按钮跳转，而是通过 JS 语句实现跳转。

src/utils/routerUtils.js

```js
import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory()
```

跳转工作在 action 创建函数中完成，但是要在这里使用 history 对象，需要把 React-router 的代码稍微改一下，因为 React-router 默认使用自己内置的 history ，而 action 文件不在 react-router 的包裹范围内，所以用不了这个 history 。所以需要来定义一个全局的 history 文件。然后在各个地方都使用这个 history ，就能实现导航了。

src/components/Main.js

```js
import { Router } from 'react-router'
import { history } from '../utils/routerUtils'
import { Switch, Route } from 'react-router-dom'

class Main extends Component {
  render() {
    return <Router history={history}>...</Router>
  }
}
```

接下来， Router 中使用这个专门创建的 history 。

src/actions/authActions.js

```js
...
import { history } from '../utils/routerUtils'

export const signup = data => dispatch => {
  axios
    .post(SIGNUP_URL, data)
    .then(res => {
      console.log('res', res.data)
      history.push('/dashboard')
    })
   ...
}

export const login = data => {
  return dispatch => {
    axios
      .post(LOGIN_URL, data)
      .then(res => {
        console.log('res', res.data)
        history.push('/dashboard')
      })
 ...
  }
}
```

这样页面跳转也就可以实现了。

页面中，分别尝试登录和注册。可以看到成功后页面都会跳转到 /dashboard 操作盘页面。
