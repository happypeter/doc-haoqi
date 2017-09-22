React 组件内，如何添加事件（ event ）响应函数呢？

React 组件中的事件和 html 页面中其实很像，只不过是有一点语法上的差异：

- React 的事件都是用骆驼字体，而不是全部小写
- 传递响应函数的时候，不穿字符串，而要传递函数

### 常见事件


- onClick 当鼠标单击的时候被触发，例如

```
<div onClick={this.handleClick}
```

- onSubmit 当表单提交的时候

```
<form onSumit={this.xxx}
```

上面 onClick 事件被触发的时候，会执行 handleClick 函数，这个函数就叫**事件响应函数** 。

### 例子

```js
class App extends Component {

  sayHello = () => {
    console.log('hello')
  }
  render () {
    return (
      <div className='app'>
        <div onClick={this.sayHello} className='click'>
          click me
        </div>
      </div>
    )
  }
}
```

注意：上面的额 this 必须写，不然就找不到 sayHello() 函数了。
