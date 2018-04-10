# React-Router 条件下如何使用布局文件

来一起看看 react-router 条件下如何使用布局文件。

### 添加 router

```
npm i react-router-dom
```

安装 react-router 。版本 4.2.2 。

Main.js

```js
import React, { Component } from 'react'
import HomeContainer from '../containers/HomeContainer'
import LayoutContainer from '../containers/LayoutContainer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route component={LayoutContainer} />
        </Switch>
      </Router>
    )
  }
}

export default Main
```

Main.js 中首先导入了 LayoutContainer ，然后导入了 React Router 自己的各个组件。接下书写路由规则。如果用户访问顶级位置，就执行 HomeContainer ，如果用户访问任意其他链接就执行 LayoutContainer 。

LayoutContainer.js

```js
import React from 'react'
import Layout from '../components/Layout'

const LayoutContainer = props => <Layout {...props} />

export default LayoutContainer
```

一个空的容器组件。

components/Layout.js

```js
import React, { Component } from 'react'

class Layout extends Component {
  render() {
    return <div>Layout</div>
  }
}

export default Layout
```

添加对应的展示组件 Layout.js 。

浏览器中，先访问 `/` ，然后访问其他任意路由。我们的目的是，除了首页，其他路由的页面都能应用布局文件。

### 布局文件中写次级路由

Layout.js

```js
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import SignupContainer from '../containers/SignupContainer'
import LoginContainer from '../containers/LoginContainer'
import styled from 'styled-components'

const Layout = () => (
  <Wrap>
    <Header>页面标题</Header>
    <Switch>
      <Route path="/signup" component={SignupContainer} />
      <Route path="/login" component={LoginContainer} />
    </Switch>
  </Wrap>
)

export default Layout

const Wrap = styled.div``

const Header = styled.div``
```

Layout 组件中添加了 `Header` 页面主体内容会根据路由的不同而显示不同的内容。如果，用户访问 `/signup` ，就显示 `SignupContainer` ，如果访问 `/login` 就显示 `LoginContainer` 。

对应的，要添加 Signup 和 Login 各自对应的展示组件和容器组件，里面的内容都暂时放一些最简单的脚手架内容。

浏览器中，分别打开 /signup 和 /login。可以看到两个组件中都加载了 Layout 组件。

### 完善一下

最后来完善一下相关功能：

* 首页的两个按钮分别指向 signup 和 login 页面
* 添加 layout 组件样式

浏览器中，看到点按钮可以打开对应页面，而且样式也生效了。

具体修改内容参考[源码对应的 commit](https://github.com/haoqicat/yummy-v2/commit/f5904a8f965406535774fe30b0ac8744d746ada8) 。
