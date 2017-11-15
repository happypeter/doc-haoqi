# 布局组件和组件 CSS

本节将通过 [布局组件](https://www.gatsbyjs.org/docs/building-with-components/#layout-components) 让各个页面共享 Header 和 Footer，并添加页面样式

### 添加一个布局组件

Gatsby 的布局组件存放在 `src/layouts` 目录下，默认情况下，各个页面会使用 `src/layouts/index.js` 文件中的布局组件。

新建 `src/layouts/index.js` 文件：

```
import React from 'react'

export default ({ children }) => {
  return (
    <div>
      <div>Header</div>
      {children()}
      <div>Footer</div>
    </div>
  )
}
```

保存文件之后，需要停止 Gatsby 服务器，重新运行命令：

```
gatsby develop
```

才能让新添加的布局组件生效。现在浏览网页，各个页面中都添加了 Header 和 Footer 两部分内容。这就是使用布局组件的妙处所在。

### 设置页面全局样式

页面内容已经有了，但是页面还很简陋，所以要给页面添加样式，美化页面。首页，添加页面的全局样式。

创建一个 css 文件 `src/css/base.css`，随便设置了几个：

```
* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  background-color: #fff;
  font-family: sans-serif;
}
```

保存文件。然后，需要在布局文件 `src/layouts/index.js` 中导入刚才添加的样式才起作用：

```
import '../csss/base.css'
```

保存布局文件。浏览网页，样式已经生效了。

接下来，将设置组件的样式。对于组件的样式，目前 Gatsby 支持三种不同的 `css-in-js` 实现方式，本项目采用 [Styled Components](https://www.gatsbyjs.org/tutorial/part-two/#styled-components) 方式

### 安装插件

首先，安装一个 [Gatsby 插件](https://www.gatsbyjs.org/docs/plugins/)，[gatsby-plugin-styled-components](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-styled-components) 插件。

执行命令：

```
npm install --save gatsby-plugin-styled-components
```

插件安装成功之后，还需要配置一下，插件才能发挥作用。

### 配置插件

在项目根目录下，新建一个 `gatsby-config.js` 文件，内容如下：

```
module.exports = {
  plugins: [
    `gatsby-plugin-styled-components`,
  ],
}
```

保存文件之后，还不能知道插件是否能够正常工作，需要设置组件样式才能检验出来。

### 设置组件样式

导入

```
import styled from 'styled-components'
```

先修改 Header 组件的样式

```
const HeaderWrapper = styled.div`
  background-color: #00bcd4;
  padding: 30px;
`
```

然后是 Footer 组件的样式

```
```

最后是页面主体内容的样式

```
```

### 总结

至此，通过 Gatsby 的插件扩展功能，设置组件的样式
