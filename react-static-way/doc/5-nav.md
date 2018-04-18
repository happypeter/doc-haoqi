# Node-safe 代码

来开发导航功能，过程中会看到为何要写 Node-safe 代码。

### 导航

src/components/Nav.js

```js
class Nav extends Component {
  handleClick = e => {
    this.props.selectItem(e.key)
  }

  render () {
    const { selectedIndex } = this.props

    return (
      <Wrap>
        <Menu
          onClick={this.handleClick}

          selectedKeys={[selectedIndex]}
        >
```

Nav 组件中，定义 `handleClick` 里面执行 action 创建函数 selectItem 来进行导航项的选择。选中的这一项就保留在 redux 中的 `selectedIndex` 这个状态值中，这里把它读取出来，用来控制高亮。这样，用户点 `Menu` 的时候，传递给 `selectItem` 的参数 `e.key` 就是每个导航项目的 `key` 。同时我们故意把每一个 `key` 都对设置成了要打开的那个页面的链接。`selectedKeys` 可以用来指定哪几个导航项目处于高亮状态。

src/containers/NavContainer.js

```js
import { connect } from 'react-redux'
import { selectItem } from '../actions'

const mapStateToProps = state => ({
  selectedIndex: state.common.selectedIndex
})

export default connect(mapStateToProps, { selectItem })(NavContainer)
```

NavContainer 负责从 action 文件中导入 action 创建函数，并且从 redux store 中拿到被选中的那个导航项目的 `key` ，也就是 `selectedIndex` 。

src/actions/index.js

```js
const updateSelectedIndex = index => ({
  type: types.UPDATE_SELECTED_INDEX,
  index
})

export const selectItem = link => dispatch => {
  history.push(link)
  dispatch(updateSelectedIndex(link))
}
```

定义 action 创建函数 selectItem 。把导航项目的 key 值传递给 reducer 。而这个 key 值，也就是这里 `link` 对应的值，又恰好就是页面链接，所以这里直接进行 `history.push(link)` 就可以进行页面跳转了。

src/constants/ActionTypes.js

```js
export const UPDATE_SELECTED_INDEX = 'UPDATE_SELECTED_INDEX'
```

添加 action 类型。

src/reducers/common.js

```js
const selectedIndex = (state = '/charts', action) => {
  switch (action.type) {
    case types.UPDATE_SELECTED_INDEX:
      return action.index
    default:
      return state
  }
}

export default combineReducers({
  isAuthenticated,
  selectedIndex
})
```

reducer 中用 `selectedIndex` 来保存。

浏览器中，点每一个导航项目，都可以正确的进行高亮切换和页面跳转了。

### 刷新页面

导航过程中，用户如果刷新页面。那么高亮就会有问题了。

src/components/Nav.js

```js
  componentDidMount () {
    this.props.loadSelectedInex()
  }
```

解决方法就是当页面刷新后，更新一下选中项目。

src/containers/NavContainer.js

```js
import { selectItem, loadSelectedInex } from '../actions'

export default connect(mapStateToProps, { selectItem, loadSelectedInex })(
  NavContainer
)
```

容器组件中，导入一下。

src/actions/index.js

```js
export const loadSelectedInex = () => dispatch => {
  const path = history.location.pathname
  dispatch(updateSelectedIndex(path))
}
```

具体做的事情就是根据当前的 url 来更新一下高亮项目。

浏览器中，点到任意一项，刷新页面，高亮都会保持不变了。

### Node Safe

运行 `npm run build` 会看到报错

```
 window is not defined
 ...
 Browser history needs a DOM
```

涉及到静态渲染的代码，其实都有一个默认的规定，就是代码要能够脱离浏览器正确运行，如果用到了 `window` `document` 这些浏览器才有的变量， 就要用 if 语句包裹一下。不然 `npm build` 会报错。就像官方问题提到的，[要写普遍使用的，可以安全的被 node 执行的代码](https://react-static.js.org/concepts/#writing-universal-node-safe-code) 。

src/utils/routerUtils.js

```js
import createHistory from 'history/createBrowserHistory'

const genHistory = () => {
  if (typeof document !== 'undefined') {
    return createHistory()
  }
  return {}
}

export default genHistory()
```

代码加上条件，history 部分的编译就可以通过了。

src/actions/index.js

```js
if (typeof document !== 'undefined') {
  window.xxx
}
```

到 action 文件中，凡是用到 `window` 的地方，也都用 if 包裹。

src/reducers/common.js

```js
let initAuthState = false

if (typeof document !== 'undefined') {
  initAuthState = !!window.localStorage.getItem('authSecret')
}
```

reducer 这里也要改一下。

这样 `npm run build` 就通过了。

### 更安全的代码

运行 `npm run serve` ，刷新页面， 发现高亮消失了。

src/actions/index.js

```js
export const loadSelectedInex = () => dispatch => {
  const path = history.location.pathname
  console.log(path)
  dispatch(updateSelectedIndex(path))
}
```

打印一下 `path` ，然后重新编译运行。

浏览器中，可以看到，页面刷新后，`path` 中多了一个末尾的 `/` 。

src/actions/index.js

```js
import { removeTrailingSlashIfNeeded } from '../utils/commonUtils'

const updateSelectedIndex = link => {
  const index = removeTrailingSlashIfNeeded(link)
  return { type: types.UPDATE_SELECTED_INDEX, index }
}
```

定义一个删除末尾 `/` 的函数，使用一下即可。

src/utils/commonUtils.js

```js
export const removeTrailingSlashIfNeeded = str => {
  if (str.slice(-1) === '/') return str.slice(0, -1)
  return str
}
```

实现这个小工具。

然后 `npm run build` ，再运行。

浏览器中，再次刷新发现没有问题了。

### 新建文章后自动跳转

用代码实现导航切换，现在也非常简单了。

src/components/NewPost.js

```js
import { Button } from 'antd'

  handleClick = () => {
    this.props.submitPost()
  }

  render () {
    return (
      <Layout>
        <Button onClick={this.handleClick}> 提交文章 </Button>
      </Layout>
    )
```

比如到新建文章页面组件中，我想在提交文章后，让页面自动跳转到所有文章页面。只需要执行 `submitPost()` 即可。

src/containers/NewPostContainer.js

```js
import React from 'react'
import { connect } from 'react-redux'
import { submitPost } from '../actions'
import NewPost from '../components/NewPost'

const NewPostContainer = props => <NewPost {...props} />

export default connect(null, { submitPost })(NewPostContainer)
```

容器组件中导入一下。

src/actions/index.js

```js
export const submitPost = () => () => {
  history.push('/posts')
}
```

然后，直接用 `history.push` 操作一下即可。非常的直白和方便。

static.config.js

```js
        component: 'src/containers/NewPostContainer',
```

配置文件中使用容器组件。

浏览器中，点新建文章，可以自动跳转到所有文章页面，高亮也会随之切换。

### 避免导航延时

没有延时，没有页面刷新的导航，才是真正舒服的导航。

src/components/Home.js

```js
<Link to="/charts" />
```

到 Home 组件的 render 函数中，添加一个无名 Link ，指向登录后需要跳转到的 `/charts` 页面。

src/components/Nav.js

```js
     <Link to="/" />
        <Link to="/charts" />
        <Link to="/posts" />
        <Link to="/posts/new" />
```

Nav 组件中，也把所有的可能跳转到的目标位置都预加载一下。

`npm run build` 之后运行起来。

浏览器中，打开 Network 标签。可以看到首页打开后，Charts 页面的 JS 代码也在后台自动加载了。这样登录后，打开 /charts 页面是没有任何延迟的。再点各个导航项目，也是一样的道理，完全的无刷新无延迟。
