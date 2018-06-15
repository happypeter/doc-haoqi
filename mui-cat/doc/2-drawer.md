# 组件精讲：文字，按钮，抽屉

到 [https://material-ui.com/](https://material-ui.com/) 网站上可以看到 mui 包含很多组件，这里我们只是选用其中的一部分。

### <a name="qorxgu"></a>添加文字

一个移动版界面的 Header 部分通常是由 AppBar 中包裹 ToolBar ，然后 ToolBar 中在包含各个项目来组成的。


```javascript
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Header = () => (
  <div>
    <AppBar>
      <Toolbar>
        <Typography variant="title" color="inherit">
          Women
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
)
```


导入 `Toolbar` ，然后导入 `Typogaphy` 也就是字体组件。

`Toolbar` 中还可能包含导航链接等其他内容，但是现在我们只是想显示一个标题文字。所谓标题文字，也就是比较大的 h1 或者 h2 中包裹文字，然后在加上我们自己定义的一些 css 。除了标题 title 字体，我们的网站上还会有大标题也就是 headline ， 也可能会有小一点的字体，例如简介字体 caption 。mui 的思路是把这些字体的 css 都保存到了 theme 变量中，方便到各个组件中使用，维持网站统一的风格。当然，默认的这些字体的 css 也是可以根据我们自己的设计图的要求去改变的，这个后续章节中会看到。

总之，只要是显示文字，就都用 `Typography` 组件包裹起来，然后通过 `variant` 也就是“变种”这个属性，来设置字体样式，这里设置的是 `title` ，也就是应用 theme 中的标题字体。到[默认 theme](https://material-ui.com/customization/default-theme/) 的 typography 一项下面，看到除了 title 还有十来个“变种”可以使用。`color="inherit"` 这一项如果不设置，那么 `Women` 的字体色就是默认的黑色。有了这一项，就会从父元素，这里也就是 `ToolBar` 中继承字体色，`ToolBar` 的字体色实际上又是从 `AppBar` 中继承的，但是这些细节不重要。重要的是，Mui 的很多组件，默认的背景色都是 `theme` 变量中的 primary 主色，而字体色，如果查看 mui 源码，就会发现

```javascript
 color: theme.palette.primary.contrastText,
```

设置成了色盘上的 contrastText ，也就是”对比字体色“，默认[色盘上](https://material-ui.com/customization/default-theme/) 可以看到这个颜色是白色。于是，一路继承下来，`Women` 也就变成白色了。


浏览器中，可以看到 AppBar 上显示出了白色的标题。

### <a name="fwcukt"></a>添加汉堡按钮


Header.js

```javascript
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'


const Header = () => (
  <div>
    <AppBar>
      <Toolbar>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        ...
    </AppBar>
  </div>
)

```


从 mui 的图标库中导入 `Menu` 图标，其实就是一个汉堡图标了，但是一个汉堡图标本身在 mui 这里并不是一个合格的按钮，需要在外面包裹 `IconButton` 。这里也有类似的 `color=“inherit` 的设置，有意思的是，这次继承过来的白色不是直接影响 `IconButton` 本身，而是应用到了 `MenuIcon` 这个 svg 图标上，把图标变成了白色。


浏览器中，看到白色的汉堡按钮，点一下，可以看到波纹扩散的 material design 的典型效果，这个自然就是 `IconButton` 带来的了。

### <a name="gmrovf"></a>抽屉式侧边栏


components/Layout.js

```javascript
import React from 'react'
import Drawer from '@material-ui/core/Drawer'

const Layout = ({ children }) => (
  <div>
    <Drawer open>hello</Drawer>
    {children}
  </div>
)

export default Layout

```


Layout 组件中使用一下抽屉式侧边栏，组件名就叫 `Drawer` ，也就是抽屉的意思。`Layout` 的作用是包裹页面主体部分，所以这里从属性中拿到 `children` 显示出来，当设置了 `open` 属性的时候，抽屉才会打开，`open` 设置为 false ，抽屉就会关闭。


Home.js

```javascript
import React from 'react'
import Header from './Header'
import Layout from './Layout'

const Home = () => (
  <div>
    <Layout>
      <Header />
    </Layout>
  </div>
)

export default Home

```

Home 组件中用 `Layout` 包裹页面主体内容。实际项目中，布局组件不应该放到具体的一个页面中，例如这里的 Home ，而应该放到路由定义的位置，例如 App.js 中，不过我们这里的案例只有一个页面，为了代码简单，所以直接就都放到 Home 组件中了。

浏览器中，一个有用的观察是，抽屉的宽度是由其中的内容的宽度决定的，自身没有默认宽度。


