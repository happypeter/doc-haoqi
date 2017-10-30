创建 Create-react-app 的一个项目，涉及到 styled-components 的使用，各个功能的文件如何组织等一些基础设施建设。

### 创建  Git 仓库

创建一个项目文件夹，并且初始化成一个 git 仓库。

创建一个文件夹

```
mkdir qcloud-cos
```

书写 README.md 文件

```
cd qcloud-cos
atom README.md
```

README.md 文件内容

```
# 好奇猫《跟 Peter 写腾讯云客户端》课程代码

项目分为客户端和服务器端：

- 客户端代码放在 client/
- 服务器端代码放在 server/
```

把 qcloud-cos/ 初始化为一个 Git 仓库

```
git init
```

这样，通过 [Github 客户端](https://desktop.github.com/)，就可以制作新版本了。


### 创建客户端项目

使用 create-react-app 来创建客户端项目脚手架，并按照我的惯常做法删除组织一下文件结构。


```
cd  qcloud-cos
create-react-app client
```

用 atom 打开项目，然后按照我习惯的方式删除调整一下文件结构。删除 src/ 中的所有文件，然后自己创建

index.js 内容如下

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App.js'

ReactDOM.render(<App />, document.getElementById('root'))
```

添加 src/containers/App.js ，就是一个普通的 React 组件。我已经设置了 Atom 的 snippet 帮助自动补齐，最终补齐后代码如下：

```js
import React, { Component } from 'react'

class App extends Component {
  render () {
    return (
      <div>
        App
      </div>
    )
  }
}

export default App
```


现在启动项目

```
cd qcloud-cos/client
npm start
```

浏览器中会自动打开 http://localhost:3000/ ，页面上会看到 `App` 这个单词，表示我们的 App 组件以及成功运行起来了。

注：后续项目中会使用 redux ，而这一步中我们会把 App.js 放到 src/containers 文件夹中，也是遵循了 Redux 社区非常常见的“容器组件和展示组件”的思路。

### 全局 css

全局的 css 我会放到 main.css 中。

对应 App.js 这个容器组件，来创建一个展示组件 Main.js和它配对。先到 App.js 中添加对 Main.js 的导入和使用：

```js
import Main from '../components/Main'
...
   return (
     <div>
       <Main />
     </div>
   )
```

添加 src/components/Main.js ，内容如下：

```js
import React from 'react'
import './main.css'

export default () => (
  <div>
    Main
  </div>
)
```

src/components/main.css 中来写全局样式

```css
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}
```

注意，Chrome 开发者工具中去查看一下 body 的样式，会发现 `margin: 0` 已经生效了。也就是全局 css 的存放文件 main.css 也就生效了。


### 组件 css

每个组件的局部样式就都用 [styled-components](https://www.styled-components.com/) 来实现。


Ctrl-C 停下命令行中的后台进程，安装

```
npm i styled-components
```

重新 `npm start` 启动项目。如果出现

```
sh: react-scripts: command not found
```

翻译：

```
sh: react-scripts: 命令未找到
```

这样的错误。就先执行 `npm install` ，然后 `npm start` 即可。

到 Main.js 组件中使用一下

```js
import React from 'react'
import './main.css'
import styled from 'styled-components'

const MainWrap = styled.div`
  min-height: 100vh;
  background-color: #00bcd4;
`

export default () => (
  <MainWrap>
    Main
  </MainWrap>
)
```

到浏览器，可以看到页面已经变成了好看的蓝色，说明 styled-components 已经工作了。

### 总结

本节没有涉及到腾讯云的接口，知识搭建了一下 React 项目的基本框架。redux 部分没有安装，但是起了个头，就是采用了容器组件和展示组件的划分，另外就是 styled-components 后面章节中我们会逐步用起来。
