# JSS 设置局部样式

不可能所有的样式都存放的 theme 中，所以局部样式也是不可避免的。mui 推荐的方式是用 JSS 来写局部样式。

### withStyles

Header.js

```javascript
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  item: {
    fontFamily: 'Roboto-Medium',
    color: 'rgba(209,209,209,1)',
    textTransform: 'none',
  },
})


const Header = ({ classes: s }) => (

   <Tab className={s.item} label="Features" />
   <Tab className={s.item} label="Style Notes" />


export default withStyles(styles)(Header)
```

导入 withStyles 高阶组件。样式就写到 styles 函数的返回值中。从设计图中，拷贝 Tab 文字的字体和颜色，`textTransfrom: none` 的作用是覆盖原有的 `uppercase` ，因为设计图上的文字并不是全部大写的。

应用这些样式就是通过给特定元素添加 className 的方式来实现。

浏览器中，看到 Tab 的字体跟设计图上一致了。

### 调用 theme

theme 有了之后，不仅仅可以自动应用在 mui 自己的组件上，也可以手动调用，应用到局部样式和我们自己写的组件上。

Layout.js

```javascript
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  list
    width: 304,
  },
  wrapper: {
    textAlign: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    margin: '8px auto',
    marginTop: theme.spacing.unit * 4,
  },
})

const list = className => (
  <List className={className}>


const userInfo = (wrapper, avatar) => (
  <div className={wrapper}>
    <Avatar className={avatar} src="/img/peter.jpg" />
  </div>
)

const Layout = ({ children, classes: s }) => (
  <div>
    <Drawer open>
      {userInfo(s.wrapper, s.avatar)}
      {list(s.list)}
    </Drawer>
  </div>
)

export default withStyles(styles)(Layout)
```

这一步来给侧边栏做局部样式调整。其他的我们不聊，关键看 avatar 的 marginTop 这一项。mui 推荐的元素间的间距采用 8 个像素的整数倍，所以这里，如果我们写 32 ，没有问题，但是也可以从 theme 中把这个间距的基本单位，也就是 8 个像素读取出来，再乘以 4。这样做的好处是如果需要调整间距，可以全 App 统一调整。

浏览器中，看到侧边栏的样式比较整齐了。
