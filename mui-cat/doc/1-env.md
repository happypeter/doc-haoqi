# 环境搭建

```plain
npm i -g react-static
```

我们使用 [react-static](https://react-static.js.org/) 来生成项目的基础架构。我当前的版本是 5.9.7 。



### <a name="8r0siw"></a>搭建脚手架

```plain
react-static create
```

运行命令来生成脚手架代码。第一个问题问项目名，这里我取名为 demo 。第二个问题选择脚手架类型，这里选择 basic ，这是一个自带功能比较少的脚手架。


```plain
yarn start
```

就可以在浏览器中看到项目了。

修改 src/containers/Home.js ，但是发现浏览器中不能进行自动的刷新，这是因为 react-static 的热替换功能在当前这个版本有些问题。


/.babelrc

```json
{
  "extends": "react-static/.babelrc",
  "plugins": ["react-hot-loader/babel"]
}

```

调整一下 bablerc 文件，然后再试一下，就没有问题了。


### <a name="fgg3cw"></a>重新组织

static.config.js

```plain
  getRoutes: async () => [
    {
      path: '/',
      component: 'src/components/Home',
    },
  ],
```


static.config.js 中，路由部分只保留一个首页。


```plain
rm -r containers/
```

删除整个 containers 文件夹 



App.js

```javascript
import React from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'

const App = () => (
  <Router>
    <div>
      <div className="content">
        <Routes />
      </div>
    </div>
  </Router>
)

export default hot(module)(App)

```


App.js 中删除导航部分。

components/Home.js

```javascript
import React from 'react'

const Home = () => <div>Home</div>

export default Home

```


Home 组件中先写一些简单的内容。

重启 `yarn start` 可以看到新内容显示出来了。


## <a name="xktlnf"></a>安装 mui

```plain
yarn add @material-ui/core @material-ui/icons
```

安装 material-ui ，也可以简称 mui 的这套组件库的核心包，以及 svg 图标包。


src/components/Header.js

```javascript
import React from 'react'
import AppBar from '@material-ui/core/AppBar'

const Header = () => (
  <div>
    <AppBar>Hello</AppBar>
  </div>
)

export default Header

```


添加一个 Header 组件，里面使用 mui 的 `AppBar` 组件。


Home.js

```javascript
import React from 'react'
import Header from './Header'

const Home = () => (
  <div>
    <Header />
  </div>
)

export default Home

```


Home 组件中导入一下。

浏览器中，会看到 `AppBar` 显示出来了。
