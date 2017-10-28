# 操作 Gatsby 的静态页面

本节将在网站中添加新的页面，并且通过 `<Link>` 组件让页面之间链接起来。

### 修改首页内容

通过修改页面内容，找到页面在项目中对应的文件。

注：Gatsby 网站的页面文件一般存放在 `src/pages` 目录下，每一个 React 组件文件代表一个页面，首页对应的文件是 `src/pages/index.js` 。

打开该文件，做些修改，把：

```
export default () => <div>Hello world!</div>
```

替换为：

```
export default () => <div>Hello gatsby!</div>
```

保存文件之后，浏览网站，无需任何操作，首页中已经出现了 'Hello Gatsby' 字样，说明修改生效了。

注：在开发环境下，Gatsby 服务器默认支持 '热加载' 功能，若页面组件的内容发生了变动，浏览器页面会自动局部刷新。

### 添加一个新的页面

照猫画虎再给网站添加一个页面。

在 `src/pages` 目录下面新建一个文件 `post.js`。

post.js 的文件内容如下：

```
import React from 'react'

export default () => <div>Post page</div>
```

页面文件保存之后，怎么在浏览器中访问到它呢？

注：Gatsby 网站的页面路径和页面文件名保持一致，所以在浏览器中访问 `localhost:8000/post` 网址，就能看到页面内容了。

### 链接页面

网站中已经有了两个页面，那么这两个页面如何链接起来呢？

在 HTML 页面中，可以直接使用 `<a>` 标签，但是在 Gatsby 项目中需要使用 `<Link>` 组件来实现这个功能。 `<Link>` 组件由 gatsby-link 软件包提供，这个 `gatsby-link` 软件包已经默认安装了。

打开 `src/pages/index.js` 文件，导入 Link 组件：

```
import Link from 'gatsby-link'
```

`<Link>` 组件的 `to` 属性指明所链接页面的路径：

```
export default () => (
  <div>
    <div>Hello gatsby!</div>
    <Link to="/post">Post page</Link>
  </div>
)
```

保存文件，网站首页则出现了一个链接，点击 `Post page`，则进入到 post 页面。

### 总结

通过本节内容可以知道在 Gatsby 网站中添加静态页面是一件很容易的事情。
