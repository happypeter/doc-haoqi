# 组件精讲：头像，列表，Fab

本节来继续添加 mui 组件。

### <a name="trglxe"></a>列表

Layout.js

```javascript
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import InboxIcon from '@material-ui/icons/Inbox'
import ListItemText from '@material-ui/core/ListItemText'

const list = (
  <List>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="women" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="men" />
    </ListItem>
  </List>
)

const Layout = ({ children }) => (
  <div>
    <Drawer open>{list}</Drawer>
    {children}
  </div>
)

export default Layout
```


抽屉侧边栏中，我们要放几个导航项目。同质化的项目垂直排列到一起，就要用到 List 组件。先来导入 List 组件的各个相关组件。

使用方式是这样：

* List 也就是列表组件，包裹所有项目
* ListItem 也就是具体的一项了，加上 button 属性，在点击的时候就会有类似于按钮的那种波纹效果了
* ListItemIcon 就是在列表上使用图标的时候要添加的组件
* InboxIcon 是从 svg 图标库里面导入的收件箱图标
* ListItemText 也就是每一项的文字，是通过这个组件的 `primary` 属性来设置的

List 的基本使用思想是，每一个 `ListItem` 的背景区域，可以叫做一个瓦片 ( tile ) ，可以作为一个点击的对象，执行最主要的操作，其他的辅助性的操作，可以通过单独设置 `ListItemIcon` 或者其他元素的点击事件来实现。不过这里咱们就不细化去做了。

浏览器中看到列表出来了。


### <a name="qw7pyd"></a>用户头像

Layout.js

```javascript
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const userInfo = (
  <div>
    <Avatar src="/img/peter.jpg" />
    <Typography>Peter</Typography>
    <Typography>React Dev</Typography>
  </div>
)


  <Drawer open>
    {userInfo}
    {list}
  </Drawer>
```



用户头像用 `Avatar` 组件来显示。用户简介文字还是用 `Typography` 。下面先显示出来，具体如何定制 css ，后续章节中咱们再聊。

浏览器中，看到头像和信息了。


### <a name="c42rdm"></a>Fab


Material Design 材料设计的一大特点就是有 Fab ，也就是 Floating Action Button ，浮动动作按钮，这个概念。


 Layout.js

```javascript
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'

    <Button variant="fab">
      <SearchIcon />
    </Button>
```


导入 `Button` 导入 `Search` 图标，`fab` 其实就是按钮的一个变体（ variant ）。

浏览器中，看到 Fab 被侧边栏盖住了，把 `Drawer` 的 `open` 属性去掉，可以看到 Fab 处于 `Appbar` 之下。实际上 mui 对于各个组件谁应该在上，谁在下面都有专门的安排，可以从 [官网](https://material-ui.com/layout/basics/#z-index) 上看到很多组件都有默认的 z-index 值。


好，这一节就先到这里，前面两节中添加了不少组件进来，但是总体样式都不太好看，下一节开始来解决这些问题。
