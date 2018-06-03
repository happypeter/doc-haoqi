# <a name="8r4blb"></a>前端开发

本节来写 react 前端代码。为了让页面美观些，我们会使用 [Material-UI](https://github.com/callemall/material-ui) 组件库。

### <a name="tzfgir"></a>创建项目

```
react-static create
```

跟 api 文件夹平级，创建 `client` 项目。这次不用 create-react-app 了，来用用 react-static 。运行命令，第一个问题问项目名，这里就叫 client 了，第二问题选择模板类型，我们选择 `basic` 。

```
cd client
npm start
```

进入项目，启动。

浏览器中，看到 react-static 的脚手架代码运行起来了。

### <a name="ifl8ki"></a>使用路由

src/App.js

```js
import React, { Component } from 'react';
import Main from './containers/Main';

class App extends Component {
  render() {
    return <Main />;
  }
}

export default App;
```

App.js 中导入 Main 组件的容器。以前用 create-react-app 的时候我通常都是用 App.js 直接做 Main 的容器，但是 react-static 条件下，这个行不通了。

src/containers/Main.js

```js
import React from 'react';
import Main from '../components/Main';

const MainContainer = props => <Main {...props} />;

export default MainContainer;
```

容器组件中直接指向展示组件。

src/components/Main.js

```js
import React, { Component } from 'react'
import Routes from 'react-static-routes'
import { Router } from 'react-static'

class Main extends Component {
  render () {
    return (
      <Router>
        <div>
          <Routes />
        </div>
      </Router>
    );
  }
}

export default Main
```

展示组件中，导入 react-static 自己的路由，这里 `Routes` 所代表的路由都在 static.config.js 中定义。

浏览器址栏中，输入 `/about` 这样的地址，发现，只要 static.config.js 中定义的页面，依然是可以访问的。

### <a name="mfdnes"></a>CSS 规范

```
npm i styled-components
```

css 还是用 styled-components 的形式来写。

src/app.css

```css
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}
```

全局样式写到 app.css 中。

components/Main.js

```js
import Header from './Header'
import '../app.css'


      <Router>
        <div>
          <Header />
          <Routes />
        </div>
      </Router>


```

Main 的展示组件中导入才能生效。同时 Main 中也添加一个 Header 组件。

components/Header.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'

class Header extends Component {
  render () {
    return <Wrap>Header</Wrap>
  }
}

export default Header

const Wrap = styled.div`
  border: 2px solid red;
`
```

Header 组件的局部样式用 styled-components 来写。

浏览器中，看到全局和局部样式都生效了。

### <a name="nqcxbd"></a>安装 material-ui

```
npm i @material-ui/core @material-ui/icons
```

安装 material 核心包，版本是 1.0。以及图标包。参考文档在：[https://material-ui.com/](https://material-ui.com/) 。有时候装包会造成 node\_modules 内容损坏，会报错说缺东西，这时候只需要删除 node\_modules ，然后 `npm i` 重新安装一下即可。

components/Header.js

```js
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import styled from 'styled-components'
import { Link } from 'react-static'

export default () => (
  <Wrap>
    <AppBar position="static" color="primary">
      <div className="inner">
        <Link exact to="/">
          首页
        </Link>
        <Link exact to="/post/new">新建</Link>
      </div>
    </AppBar>
  </Wrap>
)

const Wrap = styled.div`
  .active {
    border-bottom: 2px solid white;
  }
  .inner {
    display: flex;
    padding: 10px;
    width: 400px;
    margin: 0 auto;
    a {
      margin-right: 15px;
      color: white;
    }
  }
`
```

Header 组件中，导入 mui 的 AppBar 组件来制作导航栏。里面加一下链接。从 react-static 包中导入的 `Link` 具有 react-router 的 `navLink` 的特性，也就是活跃状态的链接会自动加上 `active` 这个 class 名。下面，我对应设置了一下下划线样式。

浏览器中，看到 Appbar 显示出来了，首页链接处于活跃状态所有有下划线。
