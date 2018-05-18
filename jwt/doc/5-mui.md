# Material-UI 组件库

开始做前端。为了让页面美观些，我们会使用 [Material-UI](https://github.com/callemall/material-ui) 组件库。

### 创建项目

```
create-react-app client
```

跟 api 文件夹平级，创建 `client` 项目。

```
rm -rf src
```

进入项目，删除 src 文件夹

```js
// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'

ReactDOM.render(<App />, document.getElementById('root'))
```

创建自己的 src/index.js

```js
//src/containers/App.js
import React, { Component } from 'react'
import Main from '../components/Main'

class App extends Component {
  render() {
    return <Main />
  }
}

export default App
```

容器组件 App 中只显示 Main 组件。

```js
//src/components/Main.js
import React, { Component } from 'react'

class Main extends Component {
  render() {
    return <div>Main</div>
  }
}

export default Main
```

Main 组件中，先显示一个字符串。

启动项目，浏览器中可以看到 Main 组件了。

### CSS 规范

```
npm i styled-components
```

安装 styled-components 。

```js
// src/components/Main.js
import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    margin: 0
  }

  * {
    box-sizing: border-box;
  }
`

class App extends Component {
  render() {
    return <Wrap>Main</Wrap>
  }
}

export default App

const Wrap = styled.div`
  background: lightblue;
  color: white;
  height: 100vh;
`
```

添加全局和局部样式。浏览器中可以看到全局和局部样式都生效了。

### 安装 material-ui 包

```
npm i @material-ui/core @material-ui/icons
```

这样，安装的版本是 1.0 。参考文档在：https://material-ui-next.com/ 。第一个包安装核心组件，第二个包安装图标。

```
cd client
cd node_modules/@material-ui/icons
```

如果不知道两个包中都有哪些组件或者图标可以使用，可以到 node_modules 文件夹中看一眼。

```js
// src/components/Main.js

import Header from '../containers/HeaderContainer'

class App extends Component {
  render() {
    return (
      <Wrap>
        <Header />
      </Wrap>
    )
  }
}

const Wrap = styled.div``
```

Main 组件中导入 Header 组件。删除原有的 `Wrap` 样式。

```js
// src/containers/HeaderContainer.js

import React from 'react'
import Header from '../components/Header'

const HeaderContainer = props => <Header {...props} />

export default HeaderContainer
```

Header 的容器组件中暂时没有任何功能。

```js
// src/components/Header.js
import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'

class Header extends Component {
  render() {
    return <AppBar position="static">AppBar</AppBar>
  }
}

export default Header
```

添加 Header 组件，导入 AppBar 来用一下。

浏览器中，看到 AppBar 显示出来了。

### 定制 mui 组件样式

```js
// src/componnets/Header.js
import React, { Component } from 'react'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import HomeIcon from '@material-ui/icons/Home'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class Header extends Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    const login = (
      <Login>
        <StyledButton color="inherit">登录</StyledButton>
        <StyledButton color="inherit">注册</StyledButton>
      </Login>
    )

    const logout = (
      <Logout>
        <IconButton onClick={this.handleMenu} color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open}>
          <MenuItem>账号</MenuItem>
          <MenuItem>退出</MenuItem>
        </Menu>
      </Logout>
    )

    return (
      <AppBar position="static">
        <Inner>
          <IconButton color="inherit">
            <StyledHomeIcon />
          </IconButton>
          {true ? logout : login}
        </Inner>
      </AppBar>
    )
  }
}

export default Header

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin: 10px auto;
`

const StyledHomeIcon = styled(HomeIcon)`
  && {
    margin: 4px;
    font-size: 40px;
  }
`
const Login = styled.div``

const Logout = styled.div``

const StyledButton = styled(Button)`
  && {
    line-height: 32px;
  }
`
```

到 Header 组件中，添加一些 mui 的要素进来。内容大都是不言自明的，所以就不细讲了。特别要提一下的就是 mui 的 1.0 版中很多接口的导出形式都变了，要查看最新的文档，例如： [menuItem 的文档](https://material-ui-next.com/api/menu-item/) 。

另外就是和 [Styled-component 结合使用的文档](https://material-ui-next.com/guides/interoperability/#styled-components) 上说结合是完美的。但是实际中，还是要用上 `&&` 来增加选择符优先级才行。估计这个问题很快就能解决。

目前我安装的版本是：

```js
"@material-ui/core": "^1.0.0-rc.0",
"@material-ui/icons": "^1.0.0-beta.43",
```

浏览器中，看到样式显示很完美。代码中，把 `true` 改成 `false` 就可以看到退出登录后的显示效果了。
