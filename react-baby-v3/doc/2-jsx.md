来了解一下 jsx 的基本含义和用法。

## 基本用法

index.js

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
const element = <h1>Hello, world!</h1>

ReactDOM.render(element, document.getElementById('root'))
```

打开 index.js ，删除所有内容，来重新写一遍。第一步导入 React ，虽然下面用不到 `React` 这个变量，但是因为下面用了 JSX 语法，所以必须在本文件内有 React 才能工作。下一步导入 `ReactDOM` ，赋值给 `element` 变量的这些跟 html 看起来很像的内容，就是 JSX 。这样 `element` 就是一个 React 的元素了，可以用 ReactDOM 渲染到页面上的 id 为 `root` 的节点上。

浏览器中，看到 JSX 内容转换成了 html 显示了出来。

## 在 JSX 中使用表达式

咱们可以任意地在 JSX 当中使用 JavaScript 表达式。

```js
import React from 'react'
import ReactDOM from 'react-dom'

const user = {
  firstName: 'Peter',
  lastName: 'Wang'
}

const formatName = user => `${user.firstName}  ${user.lastName}`
const element = <h1>Hello, {formatName(user)}</h1>

ReactDOM.render(element, document.getElementById('root'))
```

定义 `formatName` 方法，拼接姓和名为一个全名。user 对象中包含两个字段，姓和名。在 JSX 当中的表达式要包含在大括号里。

浏览器中，打印出了 Hello 和 user 的全名。

## JSX 嵌套

JSX 标签同样可以相互嵌套。

```js
const element = (
  <div>
    <div>头像</div>
    <h1>Hello, {formatName(user)}!</h1>
  </div>
)
```

多行的 jsx 要用小括号包裹，里面如果有多个 DOM 节点，也需要用一个 DOM 节点包裹起来，所以我们这里加了最外面的 `div` 。原来的 h1 之前，添加了一个 div ，显示头像两个字。

## JSX 属性

JSX 也跟 html 一样可以使用属性。

```js
const element = (
  <div>
    <img src="https://avatars0.githubusercontent.com/u/72467?s=460&v=4" />
    <h1>Hello, {formatName(user)}!</h1>
  </div>
)
```

可以是跟 html 一样的字符串做属性值。

```js
const avatar = 'https://avatars0.githubusercontent.com/u/72467?s=460&v=4'
const element = (
  <div>
    <img src={avatar} />
    <h1>Hello, {formatName(user)}!</h1>
  </div>
)
```

也可以通过大括号包裹的形式来定义以 JavaScript 表达式为值的属性。

浏览器中，看到这两种方式都是生效的。

## JSX 防注入攻击

JSX 是默认防注入攻击的：

```js
  render() {
    const content = 'First &middot; <i>Second</i>'
    const element = <div>{content}</div>
    return element
  }
```

也就是默认要显示的内容中有任何的标签或者脚本都会转义，按照字符串直接显示出来。 所以可以放心地在 JSX 当中使用用户输入。

浏览器中，看到特殊字符都按照原文字符串形式显示。

```js
const element = <div dangerouslySetInnerHTML={{ __html: content }} />
```

但是，如果需要按照 html 显示的内容，可以使用 `dangerouslySetInnerHTML` 来实现。

浏览器中，可以看到特殊字符都显示成了具体格式。
