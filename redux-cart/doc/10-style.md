# 使用 styled-components 做样式

用 [styled-components](https://github.com/styled-components/styled-components) 思路加样式，可以把 css 分成全局 css 和组件 css 两部分来写。

### 全局 css 

src/assets/global.css

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

创建 src/assets/global.css 文件。

body 默认是有8个像素的 margin ，所以先把它重置为0。

把链接默认的下划线，去掉。

一个块元素上加 padding 或者 border 的时候，会让整个块元素所占据的面积变大，往往会把其他元素挤掉，所以通过 box-sizing 设置，可以让总面积保持不变。

App.js

```js
import '../assets/global.css'
```

导入一下 global.css 。

到浏览器中，用过开发者工具看一下，发现 body 的 margin 现在变成0了，表示全局样式已经生效。

### 写组件内样式

先来安装 styled-components 

```
npm i styled-components
```

写样式的思路，就是到展示组件中，添加“带样式的组件”，然后在当前组件内使用即可。所有的样式都只作用于当前组件，css 是绝对不复用。复用是以组件为单位的。

```js
import styled from 'styled-components'
...
    )
    return (
      <Wrap>
        <h2> 所有商品 </h2>
        {productList}
      </Wrap>
...
const Wrap =  styled.div`
  background: #00bcd4;
`
```

首先导入 styled 。然后都文件末尾定义 Wrap 变量，这里首字母大写就是因为 Wrap 会作为一个所谓的“带样式的组件”来使用。`styled.div` 表示 Wrap 是基于 html 原生的 div 的，也就是默认会继承 div 的所有样式，例如 width: 100% 。然后倒引号之中再来添加样式，这里只是添加了背景色。

然后 Wrap 就可以作为一个组件来用了，用它替换 JSX 中的最顶级的 div 。

浏览器中，可以看到背景色已经生效了。

### 添加更多样式

使用 styled-components 还有很多小技巧，是直接可以通过看源码就能弄明白，可以直接参考咱们的[源码](https://github.com/haoqicat/redux-cart/)
