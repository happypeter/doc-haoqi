条件渲染，就是根据不同条件决定渲染哪部分组件。

## if 条件渲染

基本的 JSX 中条件语句的使用其实跟 JS 中没啥区别，先看一个使用 If 的例子。

index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

const UserGreeting = () => <h1>Welcome back!</h1>

const GuestGreeting = () => <h1>Please sign up.</h1>

const Greeting = props => {
  const isLoggedIn = props.isLoggedIn
  if (isLoggedIn) {
    return <UserGreeting />
  }
  return <GuestGreeting />
}

ReactDOM.render(<Greeting isLoggedIn={true} />, document.getElementById('root'))
```

先定义两个函数式组件，一个是跟已经等录的用户打招呼，另一个跟访客打招呼。下面定义 Greeting 组件。随着 `isLoggedIn` 的值的不同，会显示出不同的内容。

浏览器中，当 `isLoggedIn` 设置为 true 和 false ，会分别显示不同的打招呼信息。

## 元素变量

很常用的一个技巧是，把可变部分存到一个变量中。

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const UserGreeting = () => <h1>Welcome Back</h1>
const GuestGreeting = () => <h1>Please Sign Up</h1>
const LoginButton = props => <button onClick={props.onClick}>Login</button>
const LogoutButton = props => <button onClick={props.onClick}>Logout</button>

const Greeting = props => {
  const { isLoggedIn } = props
  if (isLoggedIn) {
    return <UserGreeting />
  }
  return <GuestGreeting />
}

class LoginControl extends Component {
  state = {
    isLoggedIn: false
  }

  handleLoginClick = () => {
    this.setState({
      isLoggedIn: true
    })
  }
  handleLogoutClick = () => {
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const { isLoggedIn } = this.state

    let button = null
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}

ReactDOM.render(<LoginControl />, document.getElementById('root'))
```

添加两个按钮组件进来，一个是登录，一个是登出。创建一个 `LoginControl` 组件，初始化 `isLoggedIn` ，添加登录和登出对应的处理函数，里面对 `isLoggedIn` 状态值进行了修改。

`render()` 函数中使用 `isLoggedIn` 状态值。定义 `button` 变量，根据 `isLoggedIn` 的值决定 `button` 到底赋值为哪个按钮，下面 `Greeting` 组件传入 `isLoggedIn` ，`button` 变量写到它下面，语法上看上去简单明了。

浏览器中，点按钮， `button` 和 `Greeting` 组件都可以正确的切换状态。

## 通过 && 元素符实现行内 if

`if` 这种方式比较强大，但是写的太复杂，下面看看在行内解决条件判断的方式。具体而言就是用 `&&` 号，实现 `if` 效果。

```js
import React from 'react'
import ReactDOM from 'react-dom'

const Mailbox = props => {
  const { unreadMessages } = props
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  )
}

const messages = ['React', 'Re: React', 'Re:Re: React']
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
)
```

定义 `Mailbox` 组件，属性中拿到未读邮件的数组，下面用 `&&` 号实现 if 的效果，如果未读邮件数量大于 0，就显示未读邮件的数量。数量为 0，那么大括号里面内容就求值为 undefined ，也就是什么都不会显示了。

下面定义，邮件数组 `messages` ，传入 `Mailbox` 组件。

浏览器中，看到可以显示未读邮件的数量。

类似的，可以使用条件运算符，或者叫三目运算符，来实现行内的 if else 效果。
