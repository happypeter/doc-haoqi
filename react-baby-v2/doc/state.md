一个 React 组件能够接受的数据有两类。一类就是我们介绍过的 props （属性值），另一类就是 state （状态值）。Props 是组件跟外部世界沟通的桥梁，而组件内部的数据，则会存放到 state 中。

state 中存放的是组件中**会变化**的数据，变化的原因，一般是用户交互，也有其他原因。

### 赋值和使用

一个组件初始化的时候，一般会对它用到的所有 state 赋值，如下第六行：

```
import React, { Component } from 'react'
import './app.css'

class App extends Component {

  state = {
    count: 0
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render () {
    return (
      <div onClick={this.handleClick} className='app'>
        <div className='count'>
          {this.state.count}
        </div>
      </div>
    )
  }
}

export default App
```

### 使用 state 值

采用 `this.state.stateName` 的形式来在 JSX 代码中使用，见上面的 `{this.state.count}` 这一句。

### state 变，render 就会自动重新执行

render 里面都是标签代码，render 重新执行，类似于我们手动刷新了页面，但是，整个页面不会被刷新，而刷新的只是当前组件。

每次我们在事件响应函数（ handleClick ）中修改了 state 值（采用 setState 方法），render 函数都会自动重新执行，于是网页中，我们就会看到更新后的结果了。

注：setState 英文本意是：设置状态。React 组件中，修改 state 值，必须要通过 setState() 来完成。

### state 的只读性

一个要特别注意的点，就是上面

```
this.setState({
  count: this.state.count + 1
})
```

不能写成

```
this.state.count++
```

直接修改 state 值本身是不允许的。
