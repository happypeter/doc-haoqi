后面的思路是把来自不同文件夹的文件进行分组，按照文件夹为单位进行导航。本节先使用 [导航菜单](https://ant.design/components/menu-cn/) 来显示出 store 中保存的所有文件夹。

### 安装 redux-logger

安装 redux-logger 把每次状态值的改变都打印到 Chrome console 里，大大方便调试。

首先装包：

```
npm i redux-logger
```

然后到 redux/store.js 添加

```js
import { logger } from 'redux-logger'

const middlewares = [ thunk ]

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middlewares))
```

`process.env.NODE_ENV === `development` 这个判断条件保正了，只有在开发模式下，才会启用 logger 。

这样，刷新页面， console 中可以看到彩色的，类似下面的内容：

```js
{type: "LOAD_ALL_FILES", allFiles: Array(4)}

next state
{allFiles: Array(4)}
```

上面可以看到的是，触发了什么 action 以及更新后的状态树。

这样，redux-logger 配置成功。

### 使用 Menu 组件

分别添加 DirMenuContainer 和 DirMenu 组件，先把蚂蚁设计的 Menu 跑起来。

先来添加容器组件 src/containers/DirMenuContainer.js

```js
import React, { Component } from 'react'
import DirMenu from '../components/DirMenu'

class DirMenuContainer extends Component {
  render () {
    return (
      <div>
        <DirMenu />
      </div>
    )
  }
}

export default DirMenuContainer
```

没有什么内容，只是引用了展示组件。下面就写对应的展示组件 src/components/DirMenu.js

```js
import React from 'react'
import { Menu } from 'antd'

export default () => (
  <Menu
    mode="inline"
  >
    <Menu.Item key="aa">aa</Menu.Item>
    <Menu.Item key="bb">bb</Menu.Item>
  </Menu>
)
```

展示组件就是按照 [Menu 文档](https://ant.design/components/menu-cn/) 使用了一下导航菜单 Menu . `mode="inline"` 加上后，处于高亮的菜单项目右侧会有好看的小蓝色边框，不加就没有。

最后，到 Main.js 中，添加

```js
import DirMenuContainer from '../containers/DirMenuContainer'
...
<Sider
  style={{
    background: '#fff'
  }}
>
  <LogoWrap />
  <DirMenuContainer />
</Sider>
```

就是让菜单栏显示在 `LogoWrap` 组件的下面。

有了上面代码 Menu 就运行起来了，到页面中点菜单项，效果美观，只是没有实际功能。

### 添加导航功能

点菜单项，来执行一个函数，就可以在函数中完成特定功能了。

到 src/containers/DirMenuContainer.js 中添加

```js
handleClick = e => {
  console.log(e.key)
}
...
  return (
    <div>
      <DirMenu onClick={this.handleClick}/>
    </div>
  )
```

上面的 handleClick 的参数 e 是从展示组件中传过来的。

到 src/components/DirMenu.js 中做如下修改

```diff
--- export default () => (
+++ export default ({ onClick }) => (
      <Menu
        mode="inline"
+++     onClick={onClick}
      >
```

这时，如果点菜单项，那么这一项对应的 `key` 值，就会显示到 console 中。

### 菜单中显示文件夹名

到这里，来梳理一下思路。我们可以让菜单的每一项对应一个文件夹，把 `key` 和要显示的文字赋值为文件夹名。这样，后续每次点菜单项，就可以直接在 handleClick 中拿到文件夹名了，以备后续使用。


首先要到 src/containers/DirMenuContainer.js 中，添加

```js
import { getDirNames } from '../redux/reducers'
...

  const { dirNames } = this.props
  ...
      <DirMenu
        dirNames={dirNames}
        onClick={this.handleClick} />

const mapStateToProps = state => ({
  dirNames: getDirNames(state)
})

export default connect(mapStateToProps)(DirMenuContainer)
```

目的只有一个，就是拿到全部的文件夹名。当然，如何拿到这些文件夹名，还要到 reducer 中去定义。

到 redux/reducers/index.js 添加

```js
export const getDirNames = state => {
  const dirNames = getAllFiles(state).reduce((arr, t) => {
    const dirName = t.Key.split('/')[0]
    if (arr.indexOf(dirName) === -1) { arr.push(dirName)}
    return arr
  }, [])
  return dirNames
}
```

这样，DirMenuContainer 中就可以拿到文件夹名组成的数组了，保存到了 allFiles 变量中，并传递给了展示组件。

到展示组件 src/components/DirMenu.js 中，把原有内容改写为

```js
import React from 'react'
import { Menu, Icon } from 'antd'

export default ({ onClick, dirNames }) => (
  <Menu
    mode="inline"
    onClick={onClick}
  >
    {
      dirNames.map(
        t => (
          <Menu.Item key={t}>
            <Icon type="folder" />
            {t}
          </Menu.Item>
        )
      )
    }
  </Menu>
)
```

到页面上查看，可以看到每个导航项目都是由文件夹图标后面跟一个文件名组成。


### 总结

本节达成的效果是，导航菜单中显示了所有的文件夹，点一下导航项，就可以在执行的函数中打印出这个文件夹的名字。
