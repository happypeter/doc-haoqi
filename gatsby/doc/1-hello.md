# 用 gatsby 写无数据源的网页

这集来把《用 gatsby 写无数据源的网页》的技巧都总结出来。

另，课程源码在：https://github.com/happypeter/demo-haoqi/tree/master/gatsby-demo

### 生成脚手架代码

第一步先来《生成脚手架代码》。全局安装 gatsby-cli 这一个包。


```
npm install -g gatsby-cli
```

这样就有一个名为 gatsby 的系统命令被装好了。


[脚手架](https://www.gatsbyjs.org/docs/gatsby-starters/)有多种，我选择一个功能最简单的脚手架。


```
gatsby new gatsby-demo https://github.com/gatsbyjs/gatsby-starter-hello-world
```

运行 gatsby new ，然后是项目名 gatsby-demo，后面跟上脚手架网络链接，然后回车执行。

当前位置，就新建一个 `gatsby-demo` 文件夹，并且从 GitHub 下载跑起一个 Hello World 网站所需要的文件，同时也安装了需要的 npm 包。

编辑器打开 `gatsby-demo`。就可以看到项目中的文件结构了。

真的是非常的 Hello World ，js 代码基本上就是在 src/pages/index.js 中这一个，里面是一个纯粹的 react 无状态组件。然后看 package.json 文件中的安装的包，除了 gatsby 自身以外，只有一个类似于 react-router 的 Link 的 gatsby-link ，这个用来生成单页面效效果的无刷新的链接跳转。另外就是三个 npm 脚本，devlop/build/serve ，开发过程中就使用 develop 这个即可。

### 体验页面热加载效果

接下来修改一下页面，《体验页面热加载效果》。

```
npm run develop
```

运行 npm run develop 启动项目的开发模式。到浏览器 localhost:8000 端口可以看到 src/pages/index.js 中的内容了。


```
src/pages/about.js
@@ -0,0 +1,3 @@
+import React from "react"
+
+export default () => <div>About!</div>
src/pages/index.js
@@ -1,3 +1,3 @@
 import React from "react"
 
-export default () => <div>Hello world!</div>
+export default () => <div>Hello peter!</div>
```


来《修改页面》看看效果。把 index.js 中的 world 改成 peter ，可以看到页面中是可以自动更新的。然后再添加一个 pages/about.js 进来，也一样是一个 react 组件，浏览器中访问 /about 就可以直接看到了。

### 添加布局文件

现在来《添加布局文件》。

```
src/layouts/index.js
@@ -0,0 +1,10 @@
+import React from "react"
+
+export default ({ children }) => {
+  return (
+    <div>
+      LAYOUT
+      {children()}
+    </div>
+  )
+}
```


Gatsby 会到 src/layouts/index.js 找到布局文件，页面显示时各个页面主体部分会显示到 children 的位置。 跟很多其他地方的 props 不一样，这里的 children 是函数需要执行一下。

重启启动 `npm run develop` ，浏览器中分别访问首页和 /about 页面，可以看到布局文件生效了。

### 使用 gatsby-link

实现链接，需要《使用 gatsby-link》。

```
src/layouts/index.js
@@ -1,9 +1,11 @@
 import React from "react"
+import Link from 'gatsby-link'
 
 export default ({ children }) => {
   return (
     <div>
-      LAYOUT
+      <Link to='/'>首页</Link> &nbsp;
+      <Link to='/about'>关于</Link>
       {children()}
     </div>
   )
```


从 gatsby-link 中导入 Link 组件，它其实就是 React-router 的 Link 的一个封装。可以让用户无刷新的从当前页面切换到链接指向的页面。布局文件中添加到首页和 about 链接。

浏览器中试一下。页面是没有刷新的，同时不同路由对应的页面其实代码是分割开的，为了避免延时，每个当前页面上能看到的链接对应的页面都会被预先加载。

### 把全局样式放到 assets/global.css 中

样式怎么写呢？

```
src/assets/global.css
@@ -0,0 +1,11 @@
+body {
+  margin: 0;
+}
+
+a {
+  text-decoration: none;
+}
+
+* {
+  box-sizing: border-box;
+}
src/layouts/index.js
@@ -1,5 +1,6 @@
 import React from "react"
 import Link from 'gatsby-link'
+import '../assets/global.css'
 
 export default ({ children }) => {
   return (
```


先《把全局样式放到 assets/global.css 中》。里面添加了 body 外边距重置，链接去除下划线，以及 box-sizing 设置，保证一个组件添加 padding 和 border 的时候所占据的总面积不会变大。最后到 src/layouts/index.js 中导入全局 css 文件。

页面中链接都没有下划线了，证明全局样式生效了。

### 用 styled-components 写局部样式

再来《 用 styled-components 写局部样式》。

```
npm install --save gatsby-plugin-styled-components styled-components
```

先装包。安装了 styled-components 本身，以及它对应的 gatsby 插件，插件的作用是增加 gatsby 功能，或者是对已有功能进行增强。

```
gatsby-config.js
@@ -0,0 +1,5 @@
+module.exports = {
+  plugins: [
+    'gatsby-plugin-styled-components'
+  ]
+}
```


使用插件一共分两步，第一步安装，第二步，需要添加到 gatsby-config.js 中生效。项目顶级位置，创建 gatsby-config.js Gatsby 每次启动会加载这个文件，其中来添加 plugin 以及其他一些配置。现在把 `gatsby-plugin-styled-components` 添加到 plugins 数组中。重新运行 `npm run develop` 插件就生效了。下面来用它写写样式。

```
src/layouts/index.js
@@ -1,13 +1,24 @@
 import React from "react"
 import Link from 'gatsby-link'
 import '../assets/global.css'
+import styled from 'styled-components'
 
 export default ({ children }) => {
   return (
     <div>
-      <Link to='/'>首页</Link> &nbsp;
-      <Link to='/about'>关于</Link>
+      <Header>
+        <Link to='/'>首页</Link>
+      </Header>
       {children()}
     </div>
   )
 }
+
+const Header = styled.div`
+  line-height: 40px;
+  padding: 10px;
+  background: #00bcd4;
+  a {
+    color: white;
+  }
+`
```


布局文件 layouts/index.js 中导入 styled-components, 添加一个 Header 做导航栏，样式写到下面，styled-components 中可以跟 sass 一样嵌套来写样式。

浏览器中可以看到样式生效了。
