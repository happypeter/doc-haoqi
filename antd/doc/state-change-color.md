一个 state 的非常实用的小案例。



```
import React, { Component } from 'react'
import './app.css'

class App extends Component {

  state = {
    active: false
  }

  handleClick = () => {
    this.setState({
      active: !this.state.active
    })
  }
  render () {
    return (
      <div className='app'>
        <div onClick={this.handleClick}
          className={`button ${this.state.active && 'active'}`}>
        </div>
      </div>
    )
  }
}

export default App
```
