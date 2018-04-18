### 热模块替换 HMR

当前条件下，如果修改组件，会看到浏览器中是整页刷新的，为了提升开发体验，可以把热模块替换加进来。

src/App.js

```js
import { hot } from 'react-hot-loader'

export default hot(module)(App)
```

这样，每次组件有了修改内容，页面更新时就不会整页刷新了，眼睛舒服了不少。

### 添加 redux

```
npm i -D redux-logger
npm i redux react-redux redux-thunk
```

先装包。

src/App.js

```js
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}
```

前面提过的，Provider 不能加到 src/index.js ，而要加到这里。另外，store 定义要独立到一个单独文件中，否则会造成终端警告。

src/store.js

```js
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

let middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger')
  middleware = [...middleware, logger]
}

export default createStore(reducer, applyMiddleware(...middleware))
```

store 初始化的写法，跟我通常在 create-react-app 中的写法没有任何区别。

src/reducers/index.js

```js
import { combineReducers } from 'redux'
import common from './common'

export default combineReducers({
  common
})
```

reducer 写法也都是完全一样的。这里导入 common 。

src/reducers/common.js

```js
import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'

const isAuthenticated = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return true
    default:
      return state
  }
}

export default combineReducers({
  isAuthenticated
})
```

common reducer 中保存 `isAuthenticated` 状态，未来控制登录态会用到。

src/constants/ActionTypes.js

```js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
```

定义需要的 action 类型。

src/components/Home.js

```js
class Home extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const data = this.props.form.getFieldsValue()
    console.log(data)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Wrap>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('username')(
                <Input
                  placeholder="username"
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password')(
                <Input
                  placeholder="password"
                  type="password"
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                />
              )}
            </FormItem>
          </Form>
        </Card>
      </Wrap>
    )
  }
}

export default Form.create()(Home)
```

下面来收集表单数据。添加 `handleSubmit` 函数，通过蚂蚁设计的机制可以通过 `this.props.form.getFieldsValue()` 来拿到用户添加的数据。暂时先打印一下。

但是前提是要把 `input` 用 `getFieldDecorator` 接口包裹一下。最后还要在导出时 `Form.create()()` 包裹一下组件。

浏览器中，填写数据，点提交，可以看到终端中可以打印出填写的数据。
