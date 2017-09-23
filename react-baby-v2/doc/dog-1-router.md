来使用 react-router 和 Layout 文件。


App.js 如下

```js
import React, { Component } from 'react'
import './app.css'
import Layout from '../Layout/Layout'
import Main from '../Main/Main'

class App extends Component {
  render () {
    return (
      <Layout>
        <Main />
      </Layout>
    )
  }
}

export default App
```

Main.js 如下：


```js
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from '../Home/Home'
import Dog from '../Dog/Dog'

class Main extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/dog/:id' component={Dog} />
        </div>
      </Router>
    )
  }
}

export default Main
```
