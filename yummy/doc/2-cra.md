# 前端环境搭建

课程的第一章，任务是通过 API 读取腾讯云上的文件，并美观的展示到我自己制作的页面上。

作为本章的第一节，我们先来创建一个 [Create-react-app](https://github.com/facebookincubator/create-react-app) 的项目，然后调整一下文件结构，并确定 CSS 书写规范。

### 创建  Git 仓库

来，一起动手。

第一步，创建一个项目文件夹，并且把它初始化成一个 git 仓库。

好，咱们就先创建一个文件夹，并用 Atom 打开

```
mkdir qcloud-cos
atom .
```

添加项目说明文件 README.md

```md
# 好奇猫《跟 Peter 写腾讯云客户端》课程代码

项目分为客户端和服务器端：

- 客户端代码放在 client/
- 服务器端代码放在 server/
```

README 文件中就是来写一些项目简介性的东西。现在，把 qcloud-cos/ 初始化为一个 Git 仓库

```
git init
```

运行 `git init` 之后，这个工作就完成了。

这样，通过 [Github 客户端](https://desktop.github.com/) 打开这个项目，就可以制作新版本了。

### 创建客户端项目

Git 仓库创建完毕，来进入第二步，用 create-react-app 来创建客户端项目脚手架，并重新组织一下文件结构。

到 qcloud-cos 内，运行 create-react-app 进行脚手架创建：

```
cd  qcloud-cos
create-react-app client
```

用 atom 打开项目，然后按照我习惯的方式删除调整一下文件结构。 

删除 src/ 中的所有文件， 然后自己创建 src/index.js 内容如下

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App.js'

ReactDOM.render(<App />, document.getElementById('root'))
```

都是最常见的 React 项目入口代码，这里就不解释了。来添加 src/containers/App.js ，App 就是一个普通的 React 组件。我已经设置了 Atom 的 snippet 帮助自动补齐，最终补齐后代码如下：

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

没有功能，就是显示一个字符串 `App` 。不过这个文件为何放到 containers/ 文件夹内呢？这是因为后续项目中会使用 redux ，而这一步中我们会把 App.js 放到 src/containers 文件夹中，也是遵循了 Redux 社区非常常见的“容器组件和展示组件”的思路。

现在到 client/ 中，启动项目

```
cd qcloud-cos/client
npm start
```

浏览器中会自动打开 http://localhost:3000/ ，页面上会看到 `App` 这个单词，表示我们的 App 组件以及成功运行起来了。

### 全局 css

文件结构调整完毕，下一步敲定 CSS 书写规范。全局的 css 我会放到一个叫做 main.css 的文件中。

对应 App.js 这个容器组件，来创建一个展示组件 Main.js 和它配对。先到 App.js 中添加对 Main.js 的导入和使用：

```diff
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index 23be5d7..b61afeb 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -1,10 +1,11 @@
 import React, { Component } from 'react'
+import Main from '../components/Main'

 class App extends Component {
   render () {
     return (
       <div>
-        App
+        <Main />
       </div>
     )
   }

```

这样 Main 组件就导入到 App 中了。光导入不行啊？还没创建呢，所以马上来添加 src/components/Main.js ，内容如下：

```js
import React from 'react'
import './main.css'

export default () => (
  <div>
    Main
  </div>
)
```

写成了一个无状态的组件，够用了。

书归正传，全局样式写到哪呢？添加 src/components/main.css

```css
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}
```

把 body 的 margin 设置为 0 ，覆盖一下浏览器默认的8个像素的难看的 margin 。另外，我也不想当我给一个元素加 border 或者 padding 的时候，元素变胖，挤乱整个原有布局，所以，设置 `box-sizing` 也是很常见的做法。

Chrome 开发者工具中去查看一下 body 的样式。会发现 `margin: 0` 已经生效了。也就是全局 css 的存放文件 main.css 也就生效了。

### 组件 css

全局说完了，那么局部样式呢？每个组件的局部样式就都用 [styled-components](https://www.styled-components.com/) 来实现。这是一种很让人上瘾的写 CSS 的新方法。

Ctrl-C 停下命令行中的后台进程，安装

```
npm i styled-components
```

包装好了，重新 `npm start` 启动项目。如果出现

```
sh: react-scripts: command not found
```

翻译：

```
sh: react-scripts: 命令未找到
```

这样的错误。就先执行 `npm install` ，然后 `npm start` 即可。

到 Main.js 组件中使用一下 styled-components

```js
diff --git a/client/src/components/Main.js b/client/src/components/Main.js
index 66eca11..a0c9395 100644
--- a/client/src/components/Main.js
+++ b/client/src/components/Main.js
@@ -1,8 +1,14 @@
 import React from 'react'
 import './main.css'
+import styled from 'styled-components'
+
+const MainWrap = styled.div`
+  min-height: 100vh;
+  background-color: #00bcd4;
+`

 export default () => (
-  <div>
+  <MainWrap>
     Main
-  </div>
+  </MainWrap>
 )
```

导入 `styled` 之后，用 styled.div 就可以得到一个添加了附件样式的 `div` 了。反引号里面，就写纯粹的 css 代码就行。最后把这个加了样式的 div 赋值给 MainWrap 这个变量，然后 MainWrap 就可以像一个组件这样来使用了。


到浏览器，可以看到页面已经变成了好看的蓝色，说明 styled-components 已经工作了。

### 总结

本节没有涉及到腾讯云的接口，只是搭建了一下 React 项目的基本框架。redux 部分没有安装，但是起了个头，就是采用了容器组件和展示组件的划分，另外就是安装了 styled-components ，后面章节中会逐步用起来。
