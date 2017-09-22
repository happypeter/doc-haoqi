jsx 是 React 项目组自己发明的一种文件格式。作用就是让我们可以在一个 js 文件中，使用类似 html 这样语法来写界面。


JSX 跟普通 html 的区别

- 不能用 class ，而要用 className ，避免跟 JS 关键字冲突
- jsx 中还可以嵌入 JS 代码，但是需要包裹在大括号中
- jsx 中也可以去插入其他的 React 组件
- 拥有 html 没有的一些事件，例如 onClick/onSubmit


具体来说，一个 React 组件中 render 的 return 语句中包裹的内容就是 JSX ，例如：

```jsx
<div className='app'>
  <div className='header'>
    header
  </div>
  <div className='main'>
    main
  </div>
  <div className='footer'>
    footer
  </div>
</div>
```

### 全部代码

index.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      margin: 0;
    }
  </style>
</head>
<body>
  <div id='root'></div>
</body>
</html>
```

index.js

```js
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'

ReactDom.render(<App />, document.getElementById('root'))
```

App.js

```js
import React, { Component } from 'react'
import './app.css'

class App extends Component {
  render () {
    let name = 'happypeter'
    return (
      <div className='app'>
        <div className='header'>
          header
        </div>
        <div className='main'>
          {name}
        </div>
        <div className='footer'>
          footer
        </div>
      </div>
    )
  }
}

export default App
```

app.css

```
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  height: 50px;
  background-color: green;
}

.main {
  flex-grow: 1;
  background-color: yellow;
}

.footer {
  height: 50px;
  background-color: red;
}
```
