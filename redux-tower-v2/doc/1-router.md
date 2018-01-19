# 使用 react-starter

为了避免重复讲解 redux 的一些基础知识，所以用我自己的 react-starter 来开始项目。

### 下载 react-starter

https://github.com/happypeter/react-starter/releases 下载 v1.0.0 的压缩包。

解压，并且重命名为 redux-tower-v2

```
npm i
npm start
```

安装依赖，并启动。

浏览器中，可以看到一个加载文章的按钮，点一下，可以加载出网上的一些文章数据。

### 使用 react-router

先添加两个页面进来。

```
npm i react-router-dom
```

使用的是 react-router 第四版。


App.js

```js
import Main from '../components/Main'

class App extends Component {
  render () {
    return (
      <Main />
    )
  }
}
```

App.js 中，把 PostContainer 删除，改为显示 Main 组件。同时把 PostContainer.js 和 Post.js 两个文件直接删除。

components/Main.js

```js
import React, { Component } from 'react'
import HomeContainer from '../containers/HomeContainer'
import CourseContainer from '../containers/CourseContainer'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/c/:id' component={CourseContainer} />
        </div>
      </Router>
    )
  }
}

export default Main
```


Main.js 中来写路由配置，导入两页面组件 HomeContainer 和 CourseContainer ，分别是首页和课程详情页。导入 Router 和 Route，然后 JSX 中来写路由。用户访问 / 的时候，运行 HomeContainer ，访问 /c/xxx 的时候，显示 CourseContainer 。

HomeConainer.js

```js
import React from 'react'
import Home from '../components/Home'

const HomeContainer = props => <Home {...props} />

export default HomeContainer
```

HomeContainer.js 中写一个无状态组件，把所有属性都传递给展示组件 Home.js 。

components/Home.js

```js
import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div>
        Home
      </div>
    )
  }
}

export default Home
```

暂时只显示 Home 字符串。

CourseContainer 和它对应的展示组件 Course  的情况也是完全类似的。

浏览器中，访问 / ，可以看到 Home 字样，访问 /c/123 可以看到 Course 字符串。


### 添加 Header 导航栏

添加一个 Header 进来。

Main.js

```js
import Header from '../components/Header'
import '../assets/global.css'

    return (
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={HomeContainer} />
          <Route path='/c/:id' component={CourseContainer} />
        </div>
```

导入 Header ，导入 assets/global.css ，Header 组件显示到页面主体组件之上。


components/Header.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Link
} from 'react-router-dom'

class Header extends Component {
  render () {
    return (
      <Wrap>
        <Link to='/'>Home</Link>
      </Wrap>
    )
  }
}

export default Header

const Wrap = styled.div`
  background: #00bcd4;
  text-align: center;
  padding: 10px;
  a {
    display: inline-block;
    color: white;
    line-height: 2em;
  }
`
```

创建 Header.js 文件。导入 styled-components 来做样式，这个是 react-starter 自带的功能了，所以无需装包。导入 Link 。

Header 中，就显示一个回首页的链接。

样式组件 Wrap ，添加 Header 背景色，内容居中，链接白色。

assets/global.css

```css
body {
  margin: 0;
}

a {
  text-decoration: none;
}
```

global.css 中添加 body 和 a 的样式重置。

浏览器中，看到导航栏已经显示出来了。
