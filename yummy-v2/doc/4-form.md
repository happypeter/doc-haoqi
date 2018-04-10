# 复用 Form

Signup 和 Login 两个页面的表单非常类似，所以咱们就采用一个表单组件传递不同的配置参数的形式来实现。

### input 列表

src/constants/FormConfig.js

```js
export const signupConfig = {
  fields: [
    {
      name: 'username',
      type: 'text'
    },
    {
      name: 'password',
      type: 'password'
    },
    {
      name: 'passwordConfirm',
      type: 'password'
    }
  ],
  goto: {
    text: '已有账号，直接登录',
    link: '/login'
  }
}

export const loginConfig = {
  fields: [
    {
      name: 'username',
      type: 'text'
    },
    {
      name: 'password',
      type: 'password'
    }
  ],
  goto: {
    text: '没有账号，请先注册',
    link: '/signup'
  }
}
```

注册表单上，有三个 input ，一个是用户名，类型是 `text` ，一个是密码，类型是 `password` ，另一个是确认密码，类型也是 `password` 。input 下面有一个链接，显示 `已有账号，直接登录` ，实际指向的位置是登录页面。再看登录表单上，有两个字段，链接指向注册页面。

src/components/Signup.js

```js
import React, { Component } from 'react'
import { signupConfig } from '../constants/FormConfig'
import Form from './Form'

class Signup extends Component {
  render() {
    return <Form config={signupConfig} />
  }
}

export default Signup
```

Signup 页面中导入 Signup 相关配置，并且把配置传递给 Form 组件。

src/components/Login.js

```js
import React, { Component } from 'react'
import { loginConfig } from '../constants/FormConfig'
import Form from './Form'

class Login extends Component {
  render() {
    return <Form config={loginConfig} />
  }
}

export default Login
```

Login 页面中也是一样的道理。

src/components/Form.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class Form extends Component {
  render() {
    const { fields, goto } = this.props.config
    const inputList = fields.map(t => (
      <input key={t.name} type={t.type} placeholder={t.name} />
    ))
    return (
      <Wrap>
        {inputList}
        <Link to={goto.link}>{goto.text}</Link>
      </Wrap>
    )
  }
}

export default Form

const Wrap = styled.div``
```

Form 组件中从配置信息中导入 `fields` 和 `goto` ，`fields` 数据用来生成 input 列表。`goto` 信息用来生成链接。

浏览器中，到 Signup 页面，可以看到三个 input 和一个指向 login 页面的链接。login 页面上自己需要的 input 和链接也生成了。

### 拿到提交数据

如何拿到各个 input 中用户填写的数据才是重点。

src/components/Form.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class Form extends Component {
  state = this.props.config.fields.reduce((obj, t) => {
    obj[t.name] = ''
    return obj
  }, {})

  handleChange = (e, field) => {
    this.setState({
      [field]: e.target.value
    })
  }

  formSubmit = e => {
    e.preventDefault()
    let data = this.props.config.fields.reduce((obj, t) => {
      obj[t.name] = this.state[t.name]
      return obj
    }, {})
    console.log('data', data)
  }
  render() {
    const { fields, goto } = this.props.config
    const inputList = fields.map(t => (
      <input
        key={t.name}
        type={t.type}
        placeholder={t.name}
        value={this.state[t.name]}
        onChange={e => this.handleChange(e, t.name)}
      />
    ))
    return (
      <Wrap>
        {inputList}
        <Link to={goto.link}>{goto.text}</Link>
        <Button onClick={this.formSubmit}>提交</Button>
      </Wrap>
    )
  }
}

export default Form

const Wrap = styled.div``

const Button = styled.div``
```

把各个 Input 都变成受控组件，首先要给每一个 input 分配一个 state 值。

由于 Input 数量不固定，所以需要 reduce 帮我们循环一下，拼出来一个我需要的对象。对象的属性名是 input 对应的字段名，属性值的初始值为空字符串。属性名要用中括号括起来，因为是变量，需要求值后使用。整个这几句就给当前组件设置了几个不同的 state 值，每个 Input 恰好分到手一个。

对应的 `handleChange` 函数也会显得稍微绕一些。

用户点按钮的时候，会触发 `formSubmit` 函数。把用户填写的数据组成一个对象，打印出来。

下面，通过给 `input` 设置 `value` 属性，让每个 state 值控制住 input 中显示的内容。

浏览器中，验证一下。到登录页面输入一下内容，点提交按钮。可以看到终端中是可以打印出输入内容的。

### 添加 CSS

最后完善一下样式细节。详细代码见 [github 仓库中的 commit](https://github.com/haoqicat/yummy-v2/commit/8a159f5a7e485c6cc3a948ead48789f149c09f61)。

最后可以看到 singup 和 login 页面都美观的显示出来了。
