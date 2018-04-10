# 全局提示

来做一个全局提示框，展示各种报错或者警告信息。

### 添加组件

src/containers/AlertBoxContainer.js

```js
import React from 'react'
import AlertBox from '../components/AlertBox'

const AlertBoxContainer = props => <AlertBox {...props} />

export default AlertBoxContainer
```

先添加容器组件。

src/components/AlertBox.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'

class AlertBox extends Component {
  render() {
    return <Wrap>提示信息提示信息提示信息提示信息</Wrap>
  }
}

export default AlertBox

const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: auto;
  padding: 20px;
  color: #fff;
  line-height: 1.8;
  background-color: rgba(0, 0, 0, 0.8);
`
```

再来添加展示组件。 就是一个小框框么，没有多复杂。

src/components/Layout.js

```js
import AlertBoxContainer from '../containers/AlertBoxContainer'

const Layout = ({ title }) => (
  <Wrap>
    <AlertBoxContainer />
    <Header>{title}</Header>
```

既然是全局提示，那么就把它添加在一个全局的位置，布局文件中。

浏览器中，除了首页，其他页面上现在都默认显示一个提示框了。所谓全局的效果已经出来了。

### redux 状态控制显示

进入下一部分《redux 状态控制显示》。默认提示框肯定是隐藏的，需要有一个专门的 redux 字段来控制它。

redux 中添加 alert 字段。

src/reducers/common.js

```js
const alert = (state = { isShown: false }, action) => {
  return state
}

export default combineReducers({
  title,
  alert
})
```

现在状态树中有了一个布尔值，`alert.isShown` 来决定警告框要不要显示了。

src/selectors/index.js

```js
export const getAlertVisibility = state => state.common.alert.isShown
```

再来添加读取这个值的 selector 也就是选择函数。

src/containers/LayoutContainer.js

```js
import { getTitle, getAlertVisibility } from '../selectors'

const mapStateToProps = state => ({
  title: getTitle(state),
  isAlertShown: getAlertVisibility(state)
})
```

容器组件中先来拿到这个值。这样展示组件 Layout 中就拿到了一个新属性 `isAlertShown` 。

展示组件里来使用这个属性。

```js
  <Wrap>
        {this.props.isAlertShown && <AlertBoxContainer />}
```

就可以通过 `isAlertShown` 来决定要不要显示提示框了。

手动修改 redux 中的 alert.isShown 的默认值试一下，看到警告框是否显示是受到它的控制的。

### 触发显示

下面关心的是如何来修改这个状态值，来触发状态框的显示。

先定义对应的 Action 类型名。

src/constants/ActionTypes.js

```js
export const ALERT = 'ALERT'
```

名字虽短，却是下面几部分代码的枢纽。

src/actions/index.js

```js
export const alert = () => ({
  type: types.ALERT
})
```

定义 Action 创建函数。作用很简单，就是向 reducer 发出修改信号。

src/reducers/common.js

```js
const alert = (state = { isShown: false }, action) => {
  switch (action.type) {
    case types.ALERT:
      return { ...state, isShown: true }
    default:
      return state
  }
}
```

reducer 中，收到 `ALERT` 这个 action ，执行对 `isShown` 状态的修改。

src/actions/authActions.js

```js
import { alert } from './index'

export const signup = data => dispatch => {
  axios
    .post(SIGNUP_URL, data)
    .then(res => {
      ...
    })
    .catch(err => {
      if (err.response) {
        ...
        dispatch(alert())
      }
    })
}

export const login = data => {
  return dispatch => {
    axios
      .post(LOGIN_URL, data)
      .then(res => {
        ...
      })
      .catch(err => {
        if (err.response) {
          ...
          dispatch(alert())
        }
      })
  }
}
```

那什么时候触发 acton 呢？可能性未来会有很多。当前就是，当登录或者注册失败的时候，触发 action 。

浏览器中，到登录页面，输出错误的用户名密码，点登录，看到可以显示出全局提示框了。

### 添加报错信息

全局提示框里面具体显示什么文本呢？

src/actions/authActions.js

```js
dispatch(alert(msg))
```

把报错信息作为提示信息文本。

src/actions/index.js

```js
export const alert = msg => ({
  type: types.ALERT,
  msg
})
```

action 创建函数中，把 msg 发送给 reducer 。

src/reducers/common.js

```js
const alert = (state = { isShown: false, msg: '' }, action) => {
  switch (action.type) {
    case types.ALERT:
      return { isShown: true, msg: action.msg }
    default:
      return state
  }
}
```

这样，msg 状态值就保存到状态树中了。

下面开始读取，先定义 selector

src/selectors/index.js

```js
export const getAlertMsg = state => state.common.alert.msg
```

拿到 store 中的 msg 。

src/containers/AlertBoxContainer.js

```js
import { getAlertMsg } from '../selectors'
import { connect } from 'react-redux'

const AlertBoxContainer = props => <AlertBox {...props} />

const mapStateToProps = state => ({
  alertMsg: getAlertMsg(state)
})
export default connect(mapStateToProps)(AlertBoxContainer)
```

下面去容器组件中去使用 selector，把 `alertMsg` 传递给展示组件。

src/components/AlertBox.js

```js
  render() {
    return <Wrap>{this.props.alertMsg}</Wrap>
  }
```

展示组件中来显示报错信息。

到登录注册界面触发各种报错，可以看到提示框中都能正常显示。

### 延时隐藏

最后来实现四秒后自动隐藏全局提示框。

src/constants/ActionTypes.js

```js
export const HIDE_ALERT = 'HIDE_ALERT'
```

定义需要的 Action 类型。

src/actions/index.js

```js
export const hideAlert = () => dispatch => {
  dispatch({ type: types.HIDE_ALERT })
}
```

添加 Action 创建器。给 reducer 发出隐藏提示框的信号。

src/containers/AlertBoxContainer.js

```js
import { hideAlert } from '../actions'

export default connect(mapStateToProps, {
  hideAlert
})(AlertBoxContainer)
```

容器组件中把 hideAlert 传递给展示组件。

src/components/AlertBox.js

```js
  componentDidMount() {
    window.setTimeout(this.props.hideAlert, 4000)
  }
```

`componentDidMount` 正好是组件显示的时候触发，里面设置了 4 秒延时，然后就会执行 Action 创建器。

src/reducers/common.js

```js
const alert = (state = { isShown: false, msg: '' }, action) => {
  switch (action.type) {
    ...
    case types.HIDE_ALERT:
      return { show: false, msg: '' }
```

到 reducer 中，响应一下 `HIDE_ALERT` 把警告框隐藏。

这样，一个流程就走通了。

到页面上，触发全局提示框。可以看到四秒后它会自动隐藏。
