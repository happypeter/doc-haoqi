本课程中 react-router 侧重基础知识，不做高阶功能讲解。

### 路由（ Route ）原理

路由的基本含义就是：给定路径，例如（ /about ），服务器就应该知道为用户执行哪段代码。

先来说什么是路由。给定一个 url ，网站就会知道要去执行那个页面，这个过程就叫路由。例如，访问 example.com/about.html ，浏览器中就能打开 about.html 页面。

传统的网站，路由其实非常简单。就是如果 url 是 example.com/about.html 那么服务器上就是有一个 about.html 页面，直接发送给浏览器显示即可。那么这种传统的方式，路由就是通过后端达成的。

### 为何需要前端路由？

但是 React 项目中，只有一个 html 页面。这一类的应用叫做 SPA （单页面应用）。它的天然特点就决定，路由需要在前端实现，这个就涉及到 react-router 的使用了。有了前端路由，明明是只有一个 html 的项目，用户用起来也可以跟多页面项目一样了。

### 基本例子

react-router 是一个 npm 包。官网在：https://reacttraining.com/react-router/web


可以通过

```
npm i react-router-dom
```

进行安装。


```js
import React, { Component } from 'react'
import './app.css'
import {
  BrowserRouter as Router,
  Route
 } from 'react-router-dom'

import Home from '../Home/Home'
import About from '../About/About'


class App extends Component {

  render () {
    return (
      <Router>
        <div>
          <Route path='/home' component={Home} />
          <Route path='/about' component={About} />
        </div>
      </Router>
    )
  }
}

export default App
```
