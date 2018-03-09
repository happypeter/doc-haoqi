看看 list 使用技巧。

## 渲染多个组件

index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

const messages = ['hello', 'hi', 'how are you']

const List = props => {
  const { messages } = props

  const list = messages.map(t => <li>{t}</li>)
  return <ul>{list}</ul>
}

ReactDOM.render(<List messages={messages} />, document.getElementById('root'))
```

一个 `messages` 数组，里面有三条信息。定义 `List` 组件，从属性中拿到 `messages` 。使用 `map` 生成一个多个元素组成的数组，元素数组是可以在 JSX 中直接显示出来的，只要用大括号包裹即可。

浏览器中，看到列表显示正常。但是终端中有报错，原因是每一个列表条目都应该有一个独一无二的 key 。

## Key

把数据的 id 作为 key 是非常常见的做法。

```js
import React from 'react'
import ReactDOM from 'react-dom'

const messages = [
  {
    id: 1,
    text: 'React'
  },
  {
    id: 2,
    text: 'Re: React'
  },
  {
    id: 3,
    text: 'Re:Re: React'
  }
]

const List = props => {
  const { messages } = props

  const list = messages.map(t => <li key={t.id}>{t.text}</li>)
  return <ul>{list}</ul>
}

ReactDOM.render(<List messages={messages} />, document.getElementById('root'))
```

实际开发中的数据一般都是配有 id 的，所以咱们这里也把字符串数组改写成对象数组，来把 id 配上。下面 `List` 组件中，用 id 做 key 即可。

另外，用数组 index 作为 key 也是勉强可以的，但是由于 index 可能会随着数组元素的增减发生变化，所以并不安全，不推荐。

浏览器中，报错没有了。
