介绍一下 react 最核心的概念 state ，也就是状态值。以及 lifecycle ，生命周期函数。

## class 式组件中才能用 state

class 式组件要比函数式组件功能多，使用 state 就是只能用在 class 式组件中的功能。

```js
import React from 'react'
import ReactDOM from 'react-dom'

class Clock extends React.Component {
  state = { date: new Date() }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}
const element = <Clock />

ReactDOM.render(element, document.getElementById('root'))
```

`Clock` 是一个 class 式组件。里面初始化了 state 值。然后 render 函数中，显示出了这个 state 值。

浏览器中，看到显示成功。

## 给 class 添加生命周期方法

接下来，让 `Clock` 设置自己的的定时器并且每秒钟自动更新。

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Clock extends Component {
  state = {
    date: new Date()
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick = () => {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, World</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'))
```

组件初次渲染之后，会自动执行 `componentDidMount` 这个生命周期方法，这里面我们设置一个定时器，每秒钟执行一下 `tick` 方法。这里把定时器 id 赋值给了 `this.timerID` 。

组件被从 DOM 移除的时候，会自动执行 `componentWillUnmount` ，这里面我们需要清除一下定时器，释放资源。

来定义关键的 `tick` 函数，里面的关键动作就是更新 state 值。注意一定要用 `this.setState` 来更新。

浏览器中，可以看到每秒钟界面显示时间都会更新。
