# SVG 作为 React 组件使用

来把首页做出来。会用到的一个技巧就是使用 SVG 组件。

### 颜色放到常量文件

给 Home 组件添加背景色。

Home.js

```js
import { PINK_PRIMARY, PINK_ALT } from '../constants/Colors'
...
const Wrap = styled.div`
  height: 100vh;
  background-image: linear-gradient(
    -45deg,
    ${PINK_PRIMARY} 0%,
    ${PINK_ALT} 100%
  );
`
```

导入颜色，把背景设置成一个渐变色。

constants/Colors.js

```js
export const PINK_PRIMARY = `#f77062`
export const PINK_ALT = `#fe5196 `
```

常量文件中，导出颜色。

浏览器中，可以看到背景色已经生效了。

### 使用 flexbox 进行布局

```js
import React, { Component } from 'react'
import styled from 'styled-components'
import { PINK_PRIMARY, PINK_ALT } from '../constants/Colors'

class Home extends Component {
  render() {
    return (
      <Wrap>
        <Hero />
        <Action />
      </Wrap>
    )
  }
}

export default Home

const Wrap = styled.div`
  height: 100vh;
  background-image: linear-gradient(
    -45deg,
    ${PINK_PRIMARY} 0%,
    ${PINK_ALT} 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Hero = styled.div`
  border: 2px solid yellow;
  height: 300px;
`

const Action = styled.div`
  border: 2px solid yellow;
  height: 200px;
`
```

Home 组件，添加两个样式组件。用 flexbox 的技巧，让 Hero 顶天花板，Action 贴地。

浏览器中，打开 chrome 的设备模式，切换成 responsive 。拖拽一下，会发现布局中只是空闲空间有变化，Hero 和 Action 保持了高度和相对位置不变。这样，咱们的布局是有弹性，能适应不同尺寸的手机。

### 使用 svg

从设计图中把 svg 导出。

```
svgr Logo.svg >Logo.js
```

使用 svgr 把图标转换成 React 组件。放到 src/components 文件夹。

Home.js

```js
import Logo from './Logo'

class Home extends Component {
  render() {
    return (
      <Wrap>
        <Hero>
          <StyledLogo />
        </Hero>
        <Action />
      </Wrap>
    )
  }
}

export default Home

const StyledLogo = styled(Logo)`
  width: 120px;
  height: 120px;
  margin: 72px auto;
  display: block;
`
```

Home.js 中导入 `Logo` ，并通过 styled-components 给它设置样式。

浏览器中，看到一个美观的居中显示的图标了。

### 文字和按钮

设计图中的首页上还有一些内容。没有什么要讲的，大家可以到 [github 仓库](https://github.com/haoqicat/yummy-v2) 来获取这部分的代码，跟上咱们的这节的进度。查看项目历史，可以看到咱们每一节的内容都有相应的 commit 与之对应的。
