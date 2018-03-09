React 处理事件跟 DOM 元素处理事件很类似。

## 基本用法

```js
class Toggle extends Component {
  state = { isToggleOn: true }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}

ReactDOM.render(<Toggle />, document.getElementById('root'))
```

当采用 ES6 class 定义组件的时候，常见的做法就是用 class 的方法作为事件处理函数（ handler )。例如，这里的 `Toggle` 组件首先初始化了 state ，把 `isToggleOn` 意思是”开关打开“，设置为 true 。

接下来，使用 create-react-app 支持的这种类字段新语法，`handleClick` 直接赋值为一个 es6 函数，这样的好处是里面直接使用 `this` 而无需绑定。由于 `this.setState` 的异步性，所以参数不能传入对象，而要传入一个函数，才能稳妥的基于之前的状态来获得最新状态值。

渲染了一个按钮，监听 onClick 事件，传入 `this.handleClick` 作为处理函数。

浏览器中，点按钮，可以让用户在 ON 和 OFF 直接切换。

## 给事件处理函数传参

事件处理函数中有时候需要传入参数。

```js
import React from 'react'
import ReactDOM from 'react-dom'
class List extends React.Component {
  deleteRow = id => {
    console.log(id)
  }

  render() {
    return <button onClick={() => this.deleteRow(2)}>Delete Row</button>
  }
}

ReactDOM.render(<List />, document.getElementById('root'))
```

比如有一个列表，这里封装成 List 组件。里面 `deleteRow` 需要接受行号，这里就是 id ，才能知道要删除哪一行的内容。

下面 `render` 中，咱们就不渲染一个列表了，直接给一个按钮, 传参的正确方式就是添加一个 es6 的箭头函数，把本行 Id ，例如 2 传递给处理函数。

浏览器中，点按钮，打印出了 2 。

那如果 `deleteRow` 中，还想要事件对象呢？

```js
  deleteRow = (id, e) => {
    console.log(id)
  }

  render() {
    return <button onClick={e => this.deleteRow(2, e)}>Delete Row</button>
  }
```

也不难，ES6 参数中拿到 e ，把它作为第二个参数传递给 `deleteRow` 即可。

浏览器中，可以看到打印出了事件对象。
