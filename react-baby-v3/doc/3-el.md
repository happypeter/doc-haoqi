元素（ element ）是一个 React 应用的最小组成单元。

## 元素

index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

const element = <h1>Hello, world</h1>

ReactDOM.render(element, document.getElementById('root'))
```

这里 element 就是一个元素， 元素描述了我们在屏幕上会看到什么。React 元素不是组件，组件由元素构成。

可以通过 ReactDOM.render 把元素渲染到 DOM 中，id 为 root 的这个节点在 index.html 中。

浏览器中，可以看到 element 元素显示到了页面上。

## React 只会更新必要部分

```js
const tick = () => {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(element, document.getElementById('root'))
}

setInterval(tick, 1000)
```

element 元素中，显示当前时间。

React 元素是具有不可变性（ immutable ）的。一旦被创建，就不能更改它的内容（ children ）和属性（ attribute ）。 所以，想要更新就要创建一个新的元素，把它传递给 `ReactDOM.render()` 。这样，每一秒钟，ReactDOM.render 就会执行一遍。

浏览器中，chrome 开发工具中查看，会发现只有时间部分会被更新，其他部分保持不变。
