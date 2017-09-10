通过选中列表中某个元素的这个案例，展示一下如何向事件处理函数（ event handler ）中传递参数。


### 代码

```js
import React, { Component } from 'react'
import './app.css'

class App extends Component {

  state = {
    activeIndex: 0,
    sizes: [
      {
        size: 'M'
      },
      {
        size: 'L'
      },
      {
        size: 'XL'
      },
      {
        size: 'xxL'
      }
    ]
  }

  handleClick = (i) => {
    console.log(`${i} clicked`)
    this.setState({
      activeIndex: i
    })
  }

  render () {

    const list = this.state.sizes.map((item, i) => (
      <div key={i}
        onClick={() => this.handleClick(i)}
        className={`size ${this.state.activeIndex === i && 'active'}`}>{item.size}</div>
      )
    )

    return (
      <div className='app'>
        <div className='list'>
          {list}
        </div>
      </div>
    )
  }
}

export default App
```
