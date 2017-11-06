点一下每一个导航项目，目前就可以在处理函数中拿到这一项对应的文件夹。本节要做的是让右侧只显示这个文件夹名里面的文件。

### 保存当前文件夹到 store

首先要到 redux 的状态数中在添加一个字段 currentDir ，意思就是当前文件夹。

注：这个 currentDir 会在程序中发挥非常核心的作用。正常情况下，我们点菜单栏中的活跃项对应的文件夹就是当前文件夹。

先到 reducers/index.js 中添加

```js
const initState = {
  ...
  currentDir: ''
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    ...
    case 'SET_CURRENT_DIR':
      return {
        ...state,
        currentDir: action.dir
      }
    default:
      return state
  }
}


export const getCurrentDir = state => state.currentDir
...
```

上面的代码在 `initState` 添加了 `currentDir` 的初始值，也就是空字符串。同时通过一个 `case` ，也就是对 `SET_CURRENT_DIR` 这样的 action 的相应，对外提供了 **写** currentDir 的接口。通过定义 `getCurrentDir` 提供了外界 **读** 这个字段的接口。

下面来看如何在用户点菜单项目的时候，来把文件夹名保存到 store 中的 `currentDir` 。

先到 src/containers/DirMenuContainer.js 添加

```js
import { setCurrentDir } from '../redux/actions'
...
handleClick = e => {
  this.props.dispatch(setCurrentDir(e.key))
}
...

```

再到 redux/actions/index.js 添加

```js
export const setCurrentDir = (dir) => ({
  type: 'SET_CURRENT_DIR',
  dir
})
```

虽然使用了 redux-thunk ，但是有些 action creator 我们还是按照老样子用，因为没有异步操作么。上面的 action 一旦被发出，reducer 中对应的语句就会被触发了。

通过 redux-logger 在 console 中的输出

```
 next state {allFiles: Array(4), currentDir: "bb"}
```

可以看到 store 中的 `currentDir` 已经修改成功了。


### 显示文件夹各自文件

每次点击一个导航项，右侧的 FileTable 组件中只显示这个文件夹中的文件。

首先要到 reducer 中添加一个根据文件夹名筛选文件的的函数。

打开 redux/reducers/index.js 中添加

```js
export const getCurrentDirFiles = state => {
  return getAllFiles(state).filter(
    t => {
      return t.Key.split('/')[0] === getCurrentDir(state)
    }
  )
}
```

到 src/containers/FileTableContainer.js 中，修改如下

```diff
---  import { getAllFiles } from '../redux/reducers'
+++  import { getCurrentDirFiles } from '../redux/reducers'
...
const { allFiles } = this.props
const { currentDirFiles } = this.props
...
---  <FileTable allFiles={allFiles} />
+++  <FileTable currentDirFiles={currentDirFiles} />
...
---  allFiles: getAllFiles(state)
+++  currentDirFiles: getCurrentDirFiles(state)
```

然后到 src/components/FileTable.js 中，修改

```diff
--- return <span>{text}</span>
+++ return <span>{text.split('/')[1]}</span>
...
--- export default ({ allFiles }) => (
+++ export default ({ currentDirFiles }) => (
...
    <Table columns={tableColumns}
---   dataSource={allFiles}
+++   dataSource={currentDirFiles}
```

`<span>{text.split('/')[1]}</span>` 的作用是从文件名中去掉文件夹。有了上面的代码，功能基本实现了，刷新页面，点菜单项目，右侧确实看到文件名已经按照文件夹分别显示了。但是明显还是有问题，下一步来解决。


### 设置默认的 currentDir

这一部分，通过给 currentDir 设置默认值，解决上一步遗留的各种问题。

上一步做完，有明显问题：

- 页面刷新之后，默认没有菜单项被选中
- 右侧也不会显示任何文件列表

先来解决第二个问题。右侧显示为空，是因为页面刷新后 currentDir 依然是空字符串。解决方案就是，在刷新页面的时候，设置一下 currentDir 。具体做法如下。

打开 redux/actions/index.js ，添加

```js
const getFirstDir = allFiles => allFiles[0].Key.split('/')[0]

export const loadAllFiles = () => {
  return dispatch => {
    axios.get('http://localhost:3008/bucket').then(
      res => {
        ...
        dispatch(setCurrentDir(getFirstDir(allFiles)))
      }
    )
  }
}
```

页面刷新时，会执行到 `loadAllFiles` 所以我们就在这里的异步请求完成，拿到 allFiles 数据之后，来设置 currentDir ，设置的值就是 allFiles 中第一个文件的文件夹名。

这样，再去刷新页面，右侧默认就会显示第一个文件夹的内容了。

但是，左侧菜单项默认没有选中，这个也是挺别扭的，这个就是前面所说的第一个问题了。

打开 src/containers/DirMenuContainer.js ，修改

```diff
+++ import { getCurrentDir } from '../redux/reducers'

--- const { dirNames } = this.props
+++ const { dirNames, currentDir } = this.props

    <DirMenu
          dirNames={dirNames}
+++       currentDir={currentDir}
          onClick={this.handleClick} />
      </div>

...
    const mapStateToProps = state => ({
      dirNames: getDirNames(state),
+++   currentDir: getCurrentDir(state)
    })
```

再到 src/components/DirMenu.js 中，

```diff
--- export default ({ onClick, dirNames }) => (
+++ export default ({ onClick, dirNames, currentDir }) => (
      <Menu
        mode="inline"
        onClick={onClick}
+++     selectedKeys={[currentDir]}
      >
```

通过设置 `selectedKeys` 为 `[currentDir]` 就可以既保证页面刚刷新的时候，导航项目默认有高亮，也保证了用户点击切换导航项目时，高亮也能随时切换。

### 总结

至此，每次点菜单项，右侧的就只显示对应文件夹中的文件了。我们本小节的功能也就完成了。同时本小节也是第一章的最后一个小节。我们也来顺便回顾一下本章都做了些什么？

我们实现了用 ant design 的组件来美观的展示从腾讯云的 bucket 读出来的所有文件列表。通过菜单导航栏的使用，用户可以以文件夹为单位来查看文件内容。底层代码中，我们实现了自己的 express 服务器，搭建了 API ，同时前端写了不少 redux 相关的代码。好，这一章就到这里。下一章见！
