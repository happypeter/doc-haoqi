

### 生成脚手架代码

第一步先来《生成脚手架代码》。把 gatsby 的命令行工具先装上。

```
npm install -g gatsby-cli
```

这样系统上就多了一个命令 gatsby 。

[脚手架](https://www.gatsbyjs.org/docs/gatsby-starters/)有多种，我选择一个功能最简单的 [Hello World](https://github.com/gatsbyjs/gatsby-starter-hello-world) 脚手架。

运行

```
gatsby new haoduo https://github.com/gatsbyjs/gatsby-starter-hello-world
```

这样，当前目录就新建一个 `haoduo` 目录，并且从 GitHub 下载跑起一个 Hello World 网站所需要的文件，同时安装需要的 npm 包。

命令执行完毕之后，进入到 `haoduo` 目录，就可以看到目录中的文件结构了。真的是非常的 Hello World ，js 代码基本上就是在 src/pages/index.js 中这一个，里面是一个纯粹的 react 无状态组件。然后看 package.json 文件中的安装的包，除了 gatsby 自身以外，只有一个类似于 react-router 的 Link 的 gatsby-link ，这个用来生成单页面效效果的无刷新的链接跳转。另外就是三个 npm 脚本，devlop/build/serve ，开发过程中就使用 develop 这个即可。



### 修改页面

运行

```
npm run develop
```

可以启动项目。

到浏览器 localhost:8000 端口可以看到 src/pages/index.js 中的内容了。

来《修改页面》看看效果。把 index.js 中的 gatsby 改成 world ，可以看到页面中是可以自动更新的。然后再添加一个 pages/about.js 进来，也一样是一个 react 组件，浏览器中访问 /about 就可以直接看到了。

### 添加布局文件

跟很多其他地方的 props 不一样，这里的 children 是函数需要执行一下。重启启动 `npm run develop` 可以让新的布局文件生效。


### 使用 gatsby-link

其实就是 React-router 的 Link 的一个封装。可以让用户无刷新的从当前页面切换到链接指向的页面。

布局文件中添加到首页的链接，首页添加指向 About 页面的链接，浏览器中试一下。页面是没有刷新的，同时不同路由对应的页面其实代码是分割开的，为了避免延时，每个当前页面上能看到的链接对应的页面都会被预先加载。

### 把全局样式放到 assets/global.css 中

全局 css 放到 src/assets/global.css 中。里面添加了 body 外边距重置，链接去除下划线，以及 box-sizing 设置，保证一个组件添加 padding 和 border 的时候所占据的总面积不会变大。最后从 src/layouts/index.js 中导入 css。

### 用 styled-components 写局部样式

```
npm install --save gatsby-plugin-styled-components styled-components
```

安装了 styled-components 本身，以及它对应的 gatsby 插件，插件的作用是增加 gatsby 功能，或者是对已有功能进行增强。

使用插件一共分两步，第一步安装，第二步，需要添加到 gatsby-config.js 中生效。项目顶级位置，创建 gatsby-config.js 这个文件中来添加 plugin 以及其他一些网站配置。现在把 `gatsby-plugin-styled-components` 添加到 plugins 数组中。重新运行 `npm run develop` 插件就生效了。

给 index.js 添加一个 Wrap 样式组件，浏览器中可以看到样式生效了。
