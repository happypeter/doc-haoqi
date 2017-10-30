客户端项目中请求 api ，然后把拿到的所有文件的数据存入 redux store 中。

### 搭建 redux 的 store

先来把 redux 的 store 搭建起来。

安装 redux 相关的包

```
cd client/
npm i redux react-redux redux-thunk
```

其中 redux 是 redux 核心包，react-redux 负责连接 react 组件和 redux 系统，redux-thunk 让我们可以在 Action Creator 中去发异步请求。本课程重点不在 redux ，所以如果你对 redux 不熟悉，欢迎先去看看好奇猫上的其他 redux 基础课程，然后回来继续看本课程。

创建 client/src/redux 文件夹，以后 redux 相关的文件都放到这里面。先来创建 src/redux/store.js

```js
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

export default store
```

上面，导入 createStore 接口，创建了一个 store 对象并导出。

然后是 redux/reducers/index.js

```js
const initState = {
  allFiles: [
    {
      fileName: 'xxx'
    }
  ]
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'XXX':
      return state
    default:
      return state
  }
}

export default rootReducer
```

`initState` 中有一个 `allFiles` 变量，用来存储 bucket 中所有的文件，暂时先添加一点点假数据，便于测试。下面 rootReducer 函数只是有一个 reducer 的基本形式，里面的语句没有实际作用，都是直接返回老状态树。

有了上面的两个文件，store 就基本建立起来了，现在到 App.js 中来读取一下 store 中存放的数据。

App.js 中添加如下内容：

```js
import store from './redux/store'

console.log('store', store.getState())
```

首先导入了 store ，然后通过 `store.getState()` 去读 store 中存放的数据，如果 chrome 的 console 中可以打印出 allFiles 的具体值，表示 store 已经正常工作了。

### 动态连接 react 和 redux

这个主要是前面安装的 react-redux 这个包的作用了，通过添加 Provider/connect 这些接口，保证 redux 数据一旦有了变化，react 组件可以自动刷新。

首先要修改 src/index.js ，最终内容如下：

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))
```

Provider 包裹了项目的顶级组件 App 。也就让本项目的所有组件都有可能去订阅 store 。一个组件想要 store 中的数据，就 `connect` 一下即可。

我们会用一个表格（ table ）来美观的展示文件列表。所以创建 src/containers/TableContainer.js


```js
import React, { Component } from 'react'
import { getAllFiles } from '../redux/reducers'
import { connect } from 'react-redux'

class TableContainer extends Component {
  render () {
    console.log('TableContainer', this.props.allFiles)
    return (
      <div>
        TableContainer
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allFiles: getAllFiles(state)
})

export default connect(mapStateToProps)(TableContainer)
```

解释一下上面的代码。主要的作用就是通过 connect 方法，把 store 和当前组件连接起来。也就是说在当前组件中就可以拿到 store 中的 state 了（注意，跟前面通过 store.getState() 来拿 state 不同，这次拿到的是动态的 state ，而不是静态的一次性读取的数值）。然后通过 `mapStateToProps` 来把整个状态树（也就是 mapStateToProps 的参数 state ）的一部分数据拿出来备用，当前组件需要的是 `allFiles` 数据，所以通常我们就会用 `allFiles: state.allFiles` 把这个特定数据拿到。但是这里我做了一些改变，使用的语句是 `allFiles: getAllFiles(state)` ，之所以采用 **函数选择器** 的形式，是因为这种形式更为灵活。另外， render 函数中就是一些临时代码，目的就是把 allFiles 中的数据显示到页面上。

`getAllFiles()` 函数是在 reducer 中定义的，所以到 src/redux/reducers/index.js 中，添加

```js
export const getAllFiles = state => state.allFiles
```

这样，getAllFiles 就定义好了。通过这个简单的 getAllFiles 看不出使用 **函数选择器** 的优势，但是后续当我们需要的数据不是状态数中直接提供的，而是状态数中已有数据进行演算得到的时候，优势就会比较明显了。

组件有了，但是跟项目的入口组件 App.js 没有关联，所以到 Main.js 中添加对这个组件的使用：

```js
...
import TableContainer from '../containers/TableContainer'
...
export default () => (
  <MainWrap>
    <TableContainer />
  </MainWrap>
)
```


这样，到浏览器中查看，就可以看到 console 中打印出的 store 中的 allFiles 数据了。动态连接 redux 和 react 的工作也就完成了。

### 读取 API 数据到 store 中

现在来读取服务器端的 API ，拿到真正的腾讯云上的文件列表，然后存入 store 中。

到 App.js 中添加

```js
componentDidMount () {
  this.props.loadAllFiles()
}
```
