# 前端环境搭建


进入第二小节《前端环境搭建。我们先来创建一个 [Create-react-app](https://github.com/facebookincubator/create-react-app) 的项目，然后调整一下文件结构，并确定 CSS 书写规范。

### 创建  Git 仓库

进入第一部分《创建 Git 仓库》。任务就是创建项目，并用 Git 对它进行版本控制。

创建一个项目。先创建一个文件夹，并用 Atom 打开，里面创建一个 README.md 文件，写一行项目介绍。

```
mkdir yummy
atom .
```

添加项目说明文件 README.md

```md
# 好奇猫《 React 社交化电商》课程代码
```

这样，一个项目就有了。


下一步，来把它初始化成一个 git 仓库。运行

```
git init
```

这样，一个 git 仓库就诞生了。

通过 [Github 客户端](https://desktop.github.com/) 操作仓库历史。Ctrl-o 添加这个项目。以后查看修改和提交版本都会很方便了。

几步下来，我们咱们拥有了一个 git 仓库。

至此，《创建 Git 仓库》这一部分就胜利完成了。

### 创建客户端项目

进入下一部分，《创建客户端项目》。用 create-react-app 来创建客户端项目脚手架，并重新组织一下文件结构。


创建项目脚手架。到 yummy 内，运行 create-react-app 进行脚手架创建：

```
cd  yummy
create-react-app client
```

`client/` 文件夹之中就有了一些脚手架代码和 Webpack/Babel 等工具的最佳配置。

删除我不用的文件。用 atom 打开项目，删除 src/ 中的所有文件， 然后自己创建 src/index.js 内容如下

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App.js'

ReactDOM.render(<App />, document.getElementById('root'))
```

渲染 App 组件到 id 为 `root` 的 DOM 节点上。

来添加 src/containers/App.js 。里面粘贴这些代码

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

App 组件放到 containers 文件夹中。是遵循 Redux 社区非常常见的“容器组件和展示组件”的思路。

启动项目。现在到 client/ 中

```
cd yummy/client
npm start
```

浏览器中会自动打开 http://localhost:3000/ ，页面上会看到 `App` 这个单词。


虽然没有功能，但是客户端项目总算运行起来了。

至此《创建客户端项目》这一步就胜利完成了。

### 存放全局 css

进入下一部分，《存放全局 css 》。基本思路就全局作用域的 css 都要集中放到一个文件中，便于管理。

创建 src/assets/global.css 文件。内容如下

```css
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}
```

全局样式是越少越好。


到 App.js 中导入这个文件。代码做这样的修改

```diff
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index 23be5d7..aa1d7be 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -1,4 +1,5 @@
 import React, { Component } from 'react'
+import '../assets/global.css'
 
 class App extends Component {
   render () {
```

这样 global.css 也就生效了。

全局的 css 以后就都往这一个文件里放了。

至此，《存放全局 css 》这一部分就胜利完成了。


### 写局部 css

进入下一部分《写局部 css》。全局说完了，那么局部样式呢？每个组件的局部样式就都用 [styled-components](https://www.styled-components.com/) 来实现。这是一种很让人上瘾的写 CSS 的新方法。

安装 npm 包。命令行中运行

```
npm i styled-components
```

这样包就装好了。


重新 `npm start` 启动项目。出现

```
sh: react-scripts: command not found
```

翻译：

```
sh: react-scripts: 命令未找到
```

这样的错误。


解决这个问题。就执行 `npm i` ，然后 `npm start` 即可。


添加一个容器组件 src/containers/HomeContainer.js 进来，修改代码如下


```diff
diff --git a/client/src/containers/HomeContainer.js b/client/src/containers/HomeContainer.js
new file mode 100644
index 0000000..e5af542
--- /dev/null
+++ b/client/src/containers/HomeContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import Home from '../components/Home'
+
+const HomeContainer = props => <Home {...props} />
+
+export default HomeContainer
```

基本就是个传令官，什么都不做，直接把所有属性传递给了展示组件。

添加展示组件 src/components/Home.js

```diff
diff --git a/client/src/components/Home.js b/client/src/components/Home.js
new file mode 100644
index 0000000..61ffee3
--- /dev/null
+++ b/client/src/components/Home.js
@@ -0,0 +1,13 @@
+import React, { Component } from 'react'
+
+class Home extends Component {
+  render () {
+    return (
+      <div>
+        Home
+      </div>
+    )
+  }
+}
+
+export default Home
```

到 App.js 中导入使用 HomeContainer 

```diff
diff --git a/client/src/containers/App.js b/client/src/containers/App.js
index aa1d7be..1ba8071 100644
--- a/client/src/containers/App.js
+++ b/client/src/containers/App.js
@@ -1,11 +1,12 @@
 import React, { Component } from 'react'
+import HomeContainer from './HomeContainer'
 import '../assets/global.css'
 
 class App extends Component {
   render () {
     return (
       <div>
-        App
+        <HomeContainer />
       </div>
     )
   }
```

浏览器页面中显示了 `Home` 字样，表示 Home 组件成功运行了。

到 Home.js 中实际使用一下 styled-components 。


```diff
diff --git a/client/src/components/Home.js b/client/src/components/Home.js
index 61ffee3..33f6522 100644
--- a/client/src/components/Home.js
+++ b/client/src/components/Home.js
@@ -1,13 +1,20 @@
 import React, { Component } from 'react'
+import styled from 'styled-components'
+
 
 class Home extends Component {
   render () {
     return (
-      <div>
+      <Wrap>
         Home
-      </div>
+      </Wrap>
     )
   }
 }
 
 export default Home
+
+const Wrap = styled.div`
+  height: 100vh;
+  background: #00bcd4;
+`
```

上面的 Wrap 就是一个带样式的组件。

页面上可以看到背景色了，styled-components 也就用起来了。

至此，《写局部 CSS 》

### 总结

进入最后一部分《总结》。复盘一下本小节都干了什么。

首先创建了项目文件夹，然后用 git 做了版本控制，接下来用 create-react-app 创建了项目脚手架，并按照我自己的需要重新组织了结构，主要就是区分了展示组件和容器组件。后续，比较大的篇幅用在了如何组织项目的 css 。全局样式存放到了 global.css 文件中，局部样式一律用 styled-components 来写。

最终，我们的项目代码运行起来了，而且有了 Home 组件，下一步就可以在这个组件里实现设计了。

至此，《前端环境搭建》这个小节就胜利完成了。