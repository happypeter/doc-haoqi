# 主题

MUI 我刚刚接触的时候，就有一个担心，那就是把默认的样式，定制成客户给的设计图上的样式，这个是不是足够的方便。通过实践，我发现不仅仅是方便，同时还给我以后写 React 项目提供了非常值得参考的思路。

定制过程其实主要分两个角度来完成，首先可以通过定制主题，来影响各个 mui 的组件的样式，第二个角度就是用 JSS 来设置局部样式。这一节下来聊定制主题。

设计图采用这个 [sketch](https://www.sketchappsources.com/free-source/1099-zalando-material-design-ui-sketch-freebie-resource.html)   。

### <a name="893aau"></a>主题对象

之所以有一个全局的 theme 也就是主题对象，主要就是为了让整个应用维持一个统一的格调。 theme 对象中的元素可以到 [官网的 default theme](https://material-ui.com/customization/default-theme/) 页面看到：其中不仅仅包含色盘，包括体现堆叠关系的阴影层级，等等一些其他的我们下面都会用到的一些要素。


src/utils/withMui.js

```javascript
import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const BRAND = '#EE7E33'
const theme = createMuiTheme({})

theme.palette.primary.main = BRAND

theme.palette.background.default = '#fff'

function withMui (Component) {
  function WithRoot (props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    )
  }

  return WithRoot
}

export default withMui

```

创建一个高阶组件 `withMui` ，专门用来自定制一个主题。

* MuiThemeProvider 用来包裹所有需要应用新 theme 的组件
* createMuiTheme 字面意思是“创建 theme" 但是实际中的作用其实是用来覆盖默认 theme
* CssBaseline 算不上 theme ，就是一些常见的 css 样式重置代码，[官方文档](https://material-ui.com/style/css-baseline/) 上说它类似于 normalize.css ，提供 box-sizing 和 font-alias 等一些常用的全局 css 设置。
* BRAND 颜色常量，顾名思义，就是品牌色，对应的是设计图上非常显眼的那个黄色，这个颜色很能体现整个 App 的色彩风格，发挥着体现品牌区分度的作用，所以作为咱们这个应用的品牌色
* createMuiTheme 前面说了是用来覆盖默认 theme 的，这里如果传递一个空对象，就会直接返回默认 theme 了


下面

```javascript
theme.palette.primary.main = BRAND
```


这种方式来覆盖默认样式，虽然有些语句比较长，但是好处是不会不小心把 theme 中原有的我们不想去覆盖的内容覆盖掉。把品牌色，设置为整个应用的 `primary` 也就是主色。

默认的 theme 给出的背景色是灰色的，这里覆盖为白色。

高阶组件中，就是用 `MuiThemeProvider` 包裹传入的组件，让组件应用修改后的 theme ，当然也包含了 `CssBaseLine` 的使用。


App.js

```javascript
import withMui from './utils/withMui'


export default hot(module)(withMui(App))
```

App 组件用 withMui 包裹一下，那 App 以及它的所有子组件中，都能拿到新 theme 了。

浏览器中，看到新的 primary 颜色已经应用到了 AppBar 上。因为 AppBar 的背景色默认就是 primary 。

### <a name="y0l2nf"></a>添加 tabs 组件

其他的组件当然也很有可能默认就是应用主色的。例如 tabs 组件。

Header.js

```javascript
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const Header = () => (
  <div>
    <AppBar color="inherit" position="static">
      <Toolbar>
      </Toolbar>
      <Tabs fullWidth indicatorColor="primary" textColor="primary" value={0}>
        <Tab label="Features" />
        <Tab label="Style Notes" />
      </Tabs>
    </AppBar>
  </div>
```


Header 组件中导入 `Tabs` 和 `Tab` 组件。AppBar 的背景色可以通过 `color` 属性来修改，这里改为 `inherit`。同时， AppBar 默认是 `position: fixed` ，先把它改成 `static` ，这样就不会遮挡下面的 Tabs 组件了。`Tabs` 组件设置 `fullWidth` 属性，把宽度变为百分百。`indicator` 也就是下划线， `text` 也就是字体，这二者的颜色都设置为 `primary` 。`value` 属性用来指定哪一个 tab 处于活跃状态，从零开始计算。

浏览器中，可以看到处于活跃状态的 tab ，显示出了黄色字体和下划线。



Layout.js

```javascript
<Button variant="fab" color="primary">
```


同样的道理，给 fab 添加 color 属性，也可以让它显示为主色。注意，图标颜色也会自动切换为白色。

### <a name="h7ngya"></a>theme 中的字体样式

mui 的思路是，所有的字体样式都要保存到 theme 中，同时给每个字体样式按照它的作用而命名，例如标题字体 title ，大标题字体 headline ，说明文字字体 caption 等等。完整的列表在 [默认 theme](https://material-ui.com/customization/default-theme/#default-theme) 的 Typography 下有，可以看到，已经非常够用了，不够的化，也可以再添加自定义的。总之，字体都统一管理，有利于做出层级关系清晰的网站。

设置页面上的字体的基本思路就是，给字体设置一个合适的变种名，然后按照设计图覆盖 theme 中这个变种的样式。

Header.js

```javascript
        <Typography variant="headline">Women</Typography>
```


例如 `Women` 是页面上出现的最大的字体了，所以给她一个变种名， `headline` 。

Layout.js

```javascript
    <Typography variant="title">Peter</Typography>
    <Typography variant="caption">React Dev</Typography>
```

Layout 组件中用户名设置变种为 `title` ，简介设置为 `caption` 。


查看 mui 源码会发现 `ListItemText` 使用的变种是 `subheading` 。


withMui.js

```javascript
theme.typography.headline = {
  fontSize: '20px',
  fontFamily: 'Roboto-Medium',
  color: 'rgba(84,85,85,1)',
}

theme.typography.title = {
  fontSize: '18px',
  fontFamily: 'Roboto-Regular',
  color: 'rgba(84,85,85,1)',
}
theme.typography.caption = {
  fontSize: 14,
  fontFamily: 'Roboto-Regular',
  color: 'rgba(155,155,155,1)',
}

theme.typography.subheading = {
  fontSize: 16,
  fontFamily: 'Roboto-Regular',
  color: 'rgba(84,85,85,1)',
}


```

所以就从设计图中拷贝 css 代码，然后到 withMui 中，分别覆盖各个变种的默认样式即可。


也不是所有的组件文字都有默认变种名，例如 Tab 组件的文字，源码中就是直接给出的样式，没有用 Typography 组件设置变种名的方式来设置样式。

但是要是想改变 Tab 文字的样式也是很容易的，因为 `label` 属性是可以接受一个 html 元素的。也可以写成

```plain
        <Tab label={<Typography variant="headline">Women</Typography>} />
```

当然也可以通过局部 css 来设置样式，后面章节中，咱们就用这个方式来修改一下 Tab 文字样式。
