### 基本用法

先写一个路由传参数的 Hello World 。

代码

```js
import React, { Component } from 'react'
import './app.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Post extends Component {
  render () {
    const { title } = this.props.match.params
    return (
      <div className='Post'>
        <h1>
          {title}
        </h1>
      </div>
    )
  }
}


class App extends Component {

  render () {
    return (
      <Router>
        <div>
          <Link to='/post/git'>Git 文章</Link>
          <Link to='/post/cli'>Cli 文章</Link>
          <Route path='/post/:title' component={Post} />
        </div>
      </Router>
    )
  }
}

export default App
```

注意：一旦一个组件作为一个 Route 的 component 来使用，例如上面的 Post ，那么组件中就自动多了一个对象，也就是 match 。而其他组件是没有这个 match ，因为 match 是 React Router 提供的。
