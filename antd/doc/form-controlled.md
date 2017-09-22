受控组件 https://facebook.github.io/react/docs/forms.html


### 什么是“受控组件”?

通过对 input 的 value 和 onChange 事件的使用，让 input 显示的内容被 state 值*控制*，也就是形成所谓的受控组件。

### 代码

```
import React, { Component } from 'react'
import './app.css'

class App extends Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }

  handleSubmit = () => {
    console.log(this.state)
  }

  render () {

    return (
      <div className='app'>
        <input name='username'
          type='text'
          value={this.state.username} onChange={this.handleChange} />
        <input name='password'
          type='password'
          value={this.state.password} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>登录</button>
      </div>
    )
  }
}

export default App
```
