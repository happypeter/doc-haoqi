客户端项目中请求 api ，然后把拿到的所有文件的数据存入 redux store 中，然后让 React 组件去订阅这些数据。

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
...
import { loadAllFiles } from '../redux/actions'
import { connect } from 'react-redux'


class App extends Component {
  componentDidMount () {
    this.props.loadAllFiles()
  }
  ...
}

export default connect(null, { loadAllFiles })(App)
```

上面的写法就是去执行一个 action creator 叫做 `loadAllFiles` 。

然后创建 src/redux/actions/index.js 去定义这个 action creator ：

```js
import axios from 'axios'

export const loadAllFiles = () => {
  return dispatch => {
    axios.get('http://localhost:3008/bucket').then(
      res => {
        console.log(res.data)
      }
    )
  }
}
```

上面使用了 `axios` ，所以需要运行

```
npm i axios
```

进行装包。 另外， `return dispatch =>` 这样的写法，让我们可以在 action creator 中发异步请求，这个需要 redux-thunk 生效才行，前面我们已经安装好了这个包。这还不够，需要到 redux/store.js 中添加

```js
import { createStore, applyMiddleware } from 'redux'
...
import thunk from 'redux-thunk'

const middleware = [ thunk ]
const store = createStore(rootReducer, applyMiddleware(middleware))
...
```

这样，redux-thunk 就能工作了。

这时来启动服务器端：

```
cd server/
npm start
```

服务器启动之后，到浏览器中刷新一下 http://localhost:3000 ，这样前端代码就会发起向我们自己的服务器端的请求，但是被服务器端拒绝了。Chrome console 中报错：

```
Failed to load http://localhost:3008/bucket: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access.
```

翻译一下：

```
加载 http://localhost:3008/bucket 失败：请求的资源没有提供 `Access-Control-Allow-Origin` （访问-控制-允许-来源）这个报头。所以 http://localhost:3000 这个来源的请求不允许访问。
```

上面是个常见文件，解决的方法就是让服务器的资源提供 `Access-Control-Allow-Origin` 报头即可。具体做法是添加 **跨域资源共享** ( cors ) 这个包。

所以到服务器端代码中，先来装包

```
cd server/
npm i cors
```

上面的 cors （就是 Cross Origin Resource Sharing 跨域资源共享） 就是 express 框架下专门解决跨域问题的。


然后打开 server/index.js 文件，稍作修改

```diff
+++ const cors = require('cors')
--- app.use('/', apiRouter)
+++ app.use('/', cors(), apiRouter)
```

也就是加载了 cors 中间件。这样跨域问题就解决了。

到浏览器再次刷新。可以看到 Chrome console 中果然可以打印成腾讯云上的 bucket 信息了。具体的文件名列表在 res.data.Contents 中，数据形式是：


```js
0 : {Key: "aa/", LastModified: "2017-10-28T13:24:30.000Z", ETag: """", Size: "0", Owner: {…}, …}
1 : {Key: "aa/aa.png", LastModified: "2017-10-28T13:26:10.000Z", ETag: ""8f1d18a9212115af3fea9b4051f6b81dfd1bc9cf"", Size: "687700", Owner: {…}, …}
2 : {Key: "bb/", LastModified: "2017-10-28T13:27:49.000Z", ETag: """", Size: "0", Owner: {…}, …}
3 : {Key: "bb/bb.png", LastModified: "2017-10-28T13:27:59.000Z", ETag: ""38673b617752d500152e6e0f8a988d6c893cfa52"", Size: "11186", Owner: {…}, …}
```

我们就把上面的这些信息保存到 redux 的状态数中，所以修改 actions/index.js 文件中的 `loadAllFiles` 函数为下面的内容：


```js
export const loadAllFiles = () => {
  return dispatch => {
    axios.get('http://localhost:3008/bucket').then(
      res => {
        const allFiles = res.data.Contents
        dispatch({ type: 'LOAD_ALL_FILES', allFiles })
      }
    )
  }
}
```

这样，等数据从服务器端拿到后，就会保存到 allFiles 变量中，接下来通过 `{ type: 'LOAD_ALL_FILES', allFiles}` 这个 action 的形式，发送给 reducer 。下面就来定义接受这些数据的 reducer 函数。

到 redux/reducers/index.js 中，把 `initState` 和 `case 'XXX'` 部分改为

```js

const initState = {
  allFiles: []
}
...
    case 'LOAD_ALL_FILES':
      return {
        ...state,
        allFiles: action.allFiles
      }

```

这样，action 中携带过来的 allFiles 数据就能真正的保存到状态树的 allFiles 字段了（ state.allFiles ）。同时由于 TableContainer 中订阅了 allFiles 字段，所以在 TableContainer 中也就可以拿到这些数据了。因为 TableContainer 中有

```js
console.log('TableContainer', this.props.allFiles)
```

所以 allFiles 的数据会被打印到浏览器终端中。

### 总结

文件列表数据 （ allFiles ）走通了一条完整的线，最终从腾讯云的接口中，到达了我们的 React 组件中。这样组件下一步就可以开发如何美观的展示这些数据的功能了。
