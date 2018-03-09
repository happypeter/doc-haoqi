组件（ components ）可以让我们把 UI 分割成独立的可以复用的片段。概念上来讲，组件类似于 JS 的函数，它接收任意的输入（也就是 props ，属性），返回 React 元素。

## 函数式和 class 式组件

定义一个组件最简单的方式是写一个 JS 的函数

```js
import React from 'react'
import ReactDOM from 'react-dom'

const Welcome = props => {
  return <h1>Hello, {props.name}</h1>
}
const element = <Welcome name="Sara" />

ReactDOM.render(element, document.getElementById('root'))
```

这个函数就是一个完整的 React 组件，因为它接收一个 props 对象作为参数，返回一个 React 元素。这样的组件叫做函数式组件，因为它的确就是个函数。

浏览器中，组件运行正常。

另外一个定义组件的方式就是使用 ES6 的 class

```js
import React from 'react'
import ReactDOM from 'react-dom'

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

const element = <Welcome name="Sara" />

ReactDOM.render(element, document.getElementById('root'))
```

从 React 的角度，上面两个组件是等价的。不过 class 式组件功能会多一些。

浏览器中，组件运行正常。

## 组件的组合

组件中可以使用其他组件。

```js
import React from 'react'
import ReactDOM from 'react-dom'

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

const App = () => {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

例如可以有一个 App 组件，里面使用很多次 Welcome 组件。

浏览器中，显示了三个 Welcome 。
