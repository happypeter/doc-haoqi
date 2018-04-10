# 添加侧边栏

我们来把侧边栏做出来，抽屉式的侧边栏。

### 跑通基本功能

[react-burger-menu](https://github.com/negomi/react-burger-menu) 是个不错的插件。

```
npm i react-burger-menu
```

包名的中文意思是，基于 react 技术的有汉堡按钮的菜单。

src/containers/SidebarContainer.js

```js
import React from 'react'
import Sidebar from '../components/Sidebar'

const SidebarContainer = props => <Sidebar {...props} />

export default SidebarContainer
```

创建侧边栏容器组件。

src/components/Sidebar.js

```js
import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <Wrap>
        <Menu customCrossIcon={false}>
          <div className="bm-link-list">
            <Link to="/">首页</Link>
            <Link to="/profile">个人中心</Link>
            <Link to="/dishes">猜你喜欢</Link>
          </div>
          <div className="bottom-button">
            <button className="bm-close-button">关闭</button>
          </div>
        </Menu>
      </Wrap>
    )
  }
}

export default Sidebar

const Wrap = styled.div`
  .bm-menu {
    background: #fff;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #fff;
  }

  .bm-burger-button {
    position: absolute;
    width: 18px;
    height: 12px;
    left: 17px;
    top: 42px;
  }

  .bm-item-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bm-link-list {
    flex-grow: 2;
  }

  .bm-link-list a {
    display: block;
    line-height: 56px;
    border-bottom: 1px solid #e3e9ec;
    padding-left: 10px;
    font-size: 12px;
    color: #878787;
  }

  .bm-menu .user-info-text,
  .bm-menu .user-info-text a {
    font-size: 14px;
    color: #f77062;
    text-align: center;
    line-height: 1;
  }

  .bm-menu .user-info-text {
    display: block;
    margin: 16px auto;
  }

  .bm-user-name {
    display: inline-block;
    padding-right: 5px;
    border-right: 2px solid #f77062;
  }

  .bm-menu .user-info-text a {
    padding-left: 5px;
  }

  .bm-close-button {
    display: block;
    color: white;
    background-image: linear-gradient(-45deg, #f77062 0%, #fe5196 100%);
    border-radius: 2px;
    font-size: 14px;
    border: 0;
    width: 80%;
    margin: 30px auto;
    line-height: 39px;
  }

  .bm-user-avatar {
    margin: 0 auto;
  }
`
```

再来添加展示组件。需要提一下的就是，即使用了 styled-components ，我们也可以照原来的方式写 css ，就像我把插件的默认样式做一下覆盖。

src/components/Layout.js

```js
import AlertBoxContainer from '../containers/AlertBoxContainer'
import Sidebar from '../containers/SidebarContainer'

class Layout extends Component {
  render() {
    return (
      <Wrap>
        <Sidebar />
```

把 Sidebar 显示到布局文件中。

浏览器中，侧边栏出来了。

### 打开和关闭

通过控制 isOpen 属性可以来打开和关闭侧边栏。

src/components/Sidebar.js

```js
class Sidebar extends Component {
  state = {
    isOpen: false
  }

  closeMenu = () => {
    this.setState({
      isOpen: false
    })
  }
  render() {
    const { isOpen } = this.state
    return (
      <Wrap>
        <Menu customCrossIcon={false} isOpen={isOpen}>
          ..
          <div className="bottom-button">
            <button onClick={this.closeMenu} className="bm-close-button">
              关闭
            </button>
          </div>
        </Menu>
      </Wrap>
    )
  }
}

export default Sidebar
```

添加 `isOpen` 状态值，通过 `closeMenu` 可以控制它，`isOpen` 作为 `Menu` 的属性使用。点按钮的时候执行 `this.closeMenu` 就可以关闭侧边栏了。

浏览器中，点一下关闭按钮，侧边栏就关闭了。

### 添加用户状态区

侧边栏上还要显示用户登录状态。

src/components/Avatar.js

```js
import styled from 'styled-components'

const Avatar = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-image: url(${props => props.avatar});
  border-radius: 50%;
  background-size: ${props => props.size * 1.5}px;
  background-position: center center;
`

export default Avatar
```

应用中很多地方都会用到头像，所以单独抽出成一个组件。父组件传属性值可以改变头像尺寸。这里不是一个 react 组件，而是一个 styled-components 组件，所以 `props` 的使用方式略有不同。

src/components/SidebarUserInfo.js

```js
import React from 'react'
import styled from 'styled-components'
import Avatar from './Avatar'
import avatar from '../assets/avatar.png'
import { Link } from 'react-router-dom'

const UserInfo = () => (
  <Wrap>
    <CenteredAvatar avatar={avatar} size="100" />
    <Text>
      <Name to="/profile">用户名</Name>
      <Link to="">退出</Link>
    </Text>
  </Wrap>
)

export default UserInfo

const Wrap = styled.div``

const Name = styled(Link)`
  display: inline-block;
  padding-right: 5px;
  border-right: 2px solid #f77062;
`

const Text = styled.div`
  font-size: 14px;
  text-align: center;
  line-height: 1;
  display: block;
  margin: 16px auto;
  a {
    padding-left: 5px;
    color: #f77062;
  }
`

const CenteredAvatar = styled(Avatar)`
  margin: 0 auto;
`
```

SidebarUserInfo 组件中使用了 Avatar 组件。下方显示了用户名和退出登录的链接。

src/components/Sidebar.js

```js
import UserInfo from './SidebarUserInfo'

class Sidebar extends Component {

  render() {
    return (
      <Wrap>
        <Menu customCrossIcon={false} isOpen={isOpen}>
          <UserInfo />
```

Sidebar 组件中导入 UserInfo 显示到 Menu 的顶部。不要忘了把头像图片添加进来。存放位置是 src/assets/avatar.png 。

侧边栏上，用户状态区已经显示出来了。
