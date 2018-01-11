# 使用 redux-thunk 执行异步操作

对于 API 请求这样的异步操作，redux 是通过 redux-thunk 的方式来发送 action 的。

### 用 mapDispatchToProps 的思路重构

App.js

```js
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class App extends Component {
    axios.get(uri).then(
      res => {
        const posts = res.data
        this.props.fetchPosts(posts)
      }
    )
  }
}

export default connect(null, {
  fetchPosts
})(App)
```

导入 connect 删除 store ，导入 action 创建函数 fetchPosts ，下面可以通过 this.props.fetchPosts 调用的可不是直接导入的这个函数，而是经过 connect 处理过的，connect 中这次咱们不用 mapStateToProps 了，所以传递一个 null ，然后通过 mapDispatchToProps 的简写形式传递给 connect 。

actions/index.js

```js
export const fetchPosts = posts => ({
  type: 'LOAD_POSTS',
  posts
})
```

action 创建函数文件中，定义 fetchPosts 直接返回跟原先一样的 action 对象即可。

浏览器中，发现一切工作如常。

### 使用 redux-thunk  

axios 请求部分的内容发现很难被封装到 action 创建函数中，需要对创建函数的运行机制做一下调整，这个调整就可以通过 redux-thunk 来完成。

```
npm i redux-thunk
```

thunk 的意思就是模式变化。

store/index.js

```js
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(logger, thunk))

export default store
```

store 文件中，导入 thunk ，然后传入 applyMiddleware 加载到 redux 中。

App.js

```js
    this.props.fetchPosts()
```

到 App 组件，删除 axios 导入， componentDidMount 中，删除所有代码，添加一句 this.props.fetchPosts()

actions/index.js 

```js
export const fetchPosts = () => {
  return dispatch => {
    const uri = `https://jsonplaceholder.typicode.com/posts`
    axios.get(uri).then(
      res => {
        const posts = res.data
        dispatch({
          type: 'LOAD_POSTS',
          posts
        })
      }
    )
  }
}
```

action 创建函数 fetchPosts 要做很大的调整，因为 thunk 一旦加载，就会改变 action 创建函数的执行方式，现在里面可以返回一个函数了，函数的参数就是 dispatch ，这样的好处是在执行这个 action 创建函数的时候，action 可以不必立刻发出，而是可以先进行异步操作，等数据返回的时候再发出 action 。这里，我们先请求文章数据，等文章数据到手，then 中的函数执行的时候才发出 action 。

浏览器中，看到数据依然可以正常加载。
