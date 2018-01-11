# 请求 API 

最初的文章和评论数据应该是通过请求 API ，从服务器端获取的。

### 通过 axios 发请求

先来装包

```
npm i axios
```

axios 是一个非常优秀的 HTTP 客户端。

App.js

```js
import axios from 'axios'
import store from '../store'

class App extends Component {
  componentDidMount() {
    const uri = `https://jsonplaceholder.typicode.com/posts`
    axios.get(uri).then(
      res => {
        const posts = res.data
        store.dispatch({ type: 'LOAD_POSTS', posts })
      }
    )
  }
```

App.js 中，导入 axios ，导入 store ，我们希望应用加载的时候就自动去加载所有的文章数据，所以到 App 组件的 componentDidMount 中去发 action 。把好心的 typicode 提供的请求所有文章的 api 链接保存到 uri 常量中，然后 axios 发 get 请求，返回的 res.data 就是100个文章对象组成的数组，保存的 posts 常量中，然后用 store.dispatch 发出类型为 `LOAD_POSTS` 的 action ，把 posts 数据携带给 reducer 处理。

reducers/index.js

```js
const posts = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_POSTS':
      return action.posts
    default: 
      return state
  }
}
```

到 reducer 文件中，把初始状态值变成一个空数组，当收到加载 posts 的 action 的时候，把携带过来的 posts 数组作为下一个状态返回。这样就成功的把文章数据填充到了 redux 状态树中。

到浏览器中，首页上可以看到显示出了一百篇文章的标题。

### 注意初始数据为空

posts 数据加载需要一个过程，所以到 /post/1 页面，默认会报错。

```js
  render () {
    const { comments, id, posts } = this.props
    const post = posts.find(
      t => t.id.toString() === id
    ) || {}
    // FIXME: 上面的逻辑最好移动到 selectors 中
    // 实现一下 postsById
    return (
```

首先 typicode 上获取的文章 id 是 number 型，所以先要转换成字符串然后在进行匹配。然后更重要的一个问题是，第一时间 posts 很可能是空数组，所以 .find 返回一个 undefined ，会造成代码报错，解决方法是给一个 post 的默认值，或运算符后跟上一个空对象。

浏览器中，可以看到 /post/1 页面上，文章标题可以正常加载了。
