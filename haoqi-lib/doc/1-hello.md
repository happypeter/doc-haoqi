# 用 gatsby 写无数据源的网页

这集来用 gatsby 写无数据源的网页。

### 生成脚手架代码

先来生成脚手架代码。全局安装 gatsby-cli 这一个包。

```
npm install -g gatsby-cli
```

这样就有一个名为 gatsby 的系统命令被装好了。

[脚手架](https://www.gatsbyjs.org/docs/gatsby-starters/)有多种，我选择一个功能最简单的脚手架。

```
gatsby new haoqi-lib https://github.com/gatsbyjs/gatsby-starter-hello-world
```

运行 gatsby new ，然后是项目名 haoqi-lib，后面跟上脚手架链接，然后回车执行。

编辑器打开项目。

```
npm run develop
```

运行 npm run develop 启动项目的开发模式。到浏览器 localhost:8000 端口可以看到 src/pages/index.js 中的内容了。

### 添加布局文件

现在来添加布局文件。

src/layouts/index.js

```js
import React from 'react'

export default ({ children }) => {
  return (
    <div>
      LAYOUT
      {children()}
    </div>
  )
}
```

Gatsby 会到 src/layouts/index.js 找到布局文件，页面显示时各个页面主体部分会显示到 children 的位置。 注意，这里的 children 是函数需要执行一下。

重启 `npm run develop` 。

浏览器中，可以看到布局文件生效了。

### CSS

把全局样式放到 assets/global.css 中

global.css

```css
body {
  margin: 0;
}

a {
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
```

添加样式重置和 box-sizing 设置。

layouts/index.js

```
import '../assets/global.css'
```

到 src/layouts/index.js 中导入全局 css 文件。

用 styled-components 写局部样式。

```
npm i gatsby-plugin-styled-components styled-components
```

先装包。安装了 styled-components 本身，以及它对应的 gatsby 插件。

gatsby-config.js

```js
module.exports = {
  plugins: ['gatsby-plugin-styled-components']
}
```

项目顶级位置，创建 gatsby-config.js 把 `gatsby-plugin-styled-components` 添加到 plugins 数组中。

重新运行 `npm run develop` 插件就生效了。

src/layouts/index.js

```js
import '../assets/global.css'
import React from 'react'
import styled from 'styled-components'
import { PRIMARY } from '../constants/Colors'

export default ({ children }) => {
  return (
    <div>
      <Header />
      {children()}
    </div>
  )
}

const Header = styled.div`
  height: 80px;
  background: ${PRIMARY};
`
```

布局文件 layouts/index.js 中导入 styled-components, 添加一个 Header 做导航栏，样式组件的定义写到下面。

定义用到的常量文件

constants/Colors.js

```js
export const PRIMARY = '#00bcd4'
```

浏览器中，可以看到样式生效了。
