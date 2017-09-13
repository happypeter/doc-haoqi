用了 React Router 之后，就不要再用 a 标签了（除非要链接到外站）。

而要使用 link 。

Link 在页面上显示后，通过 Chrome 开发者工具，可以看到就变成了 a 标签。但是，Link 跟 a 标签有明显区别，就是点 Link 进行页面跳转，页面不刷新。而页面刷新除了用户体验不好之外，重要的是会导致 state 值全部重置，所以不要使用 a 标签。

### 代码

Header.js

```js
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render () {
    return (
      <div className='header'>
        <Link to='/'>首页</Link>
        <Link to='/about'>关于</Link>
      </div>
    )
  }
}

export default Header
```
