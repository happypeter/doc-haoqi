# 跑一个 Hello World

若创建一个 Gatsby 静态网站，我们不需要从头开发写代码，可以方便的借助 Gatsby 自带的命令行工具来快速搭建一个网站的雏形，然后在此基础上添加功能，满足自己的需求。

### 安装 Gatsby 命令行工具

```
npm install -g gatsby-cli
```

### 创建项目

创建一个新的 Gatsby 项目为 `gatsby-demo`，执行下面命令：

```
gatsby new gatsby-demo
```

命令执行完毕之后，会在当前目录生成一个 `gatsby-demo` 目录，进入到 `gatsby-demo` 目录之后，会看到一些文件，并且已经安装好了网站开发所需要的 npm 包，这就是我们开发自己的 Gatsby 网站的起点。

### 运行项目

项目创建好之后，我们可以执行下面命令就可以把网站运行起来了：

```
gatsby develop
```

或者执行命令：

```
npm run develop
```

现在，查看 localhost:8000 网址浏览一下效果吧。

### 修改首页内容

已经运行起来的网站有两个页面，并且页面之间可以通过链接互相访问。接下来，修改首页的内容。Gatsby 网站的页面文件一般存放在 `src/pages` 目录下，首页对应的文件是 `src/pages/index.js` ，打开该文件，编写了一个 React 组件 `IndexPage`，把组件中的一些文字：

```
<h1>Hi people</h1>
<p>Welcome to your new Gatsby site.</p>
<p>Now go build something great.</p>
```

替换为：

```
<p>Hello Gatsby</p>
```

保存文件之后，浏览网站，无需任何操作，首页中已经出现了 'Hello Gatsby' 字样，这是因为在开发环境下，Gatsby 服务器默认支持 '热加载' 功能，若页面组件内容发生变动，浏览器页面会自动局部刷新，从而提高了开发效率。

### 链接页面

然后，我们再看一下如何链接两个页面。在 HTML 页面中，我们可以使用 `<a>` 标签从一个页面链接到另一个页面，但是在 Gatsby 项目中需要用到从 `gatsby-link` 软件包导入的 `Link` 组件来实现这个功能。正如您在 `src/pages/index.js` 文件中看到的下面一行代码：

```
import Link from 'gatsby-link'
```

导入 `Link` 组件之后，就可以使用它了，组件的 `to` 属性指明所链接页面的路径：

```
<Link to="/page-2/">Go to page 2</Link>
```

`/page-2/` 代表第二个页面的路径，也就是第二个页面对应文件 `src/pages/page-2.js` 的文件名

### 404 页面

此时，若访问 `localhost:8000/page-3` 网址，会出现 Gatsby 开发环境下的 404 页面，因为在 `src/pages/` 目录下没有存放 `page-3` 页面文件。

### 添加一个新的页面

在 pages 目录下面新建一个文件 `page-3.js`，文件内容如下：

```
import React from 'react'
import Link from 'gatsby-link'

const ThirdPage = () => (
  <div>
    <p>ThirdPage</p>
    <Link to='/'>Home page</Link>
  </div>
)

export default ThirdPage
```
