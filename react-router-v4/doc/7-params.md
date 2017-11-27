# URL 参数

把 URL 中动态的部分作为参数，传递到组件中备用。说起来有点抽象了，但是看看视频中的演示就会一目了然。

### 代码

```js
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Video = ({ match }) => (
  <h1>{match.params.id}</h1>
)



const App = () => (
  <Router>
    <div>
      <h2>Accounts</h2>
      <ul>
        <li><Link to="/v/1-git">1-git</Link></li>
        <li><Link to="/v/2-react">2-react</Link></li>
      </ul>
      <Route path="/v/:id" component={Video} />
    </div>
  </Router>
)

export default App
```
