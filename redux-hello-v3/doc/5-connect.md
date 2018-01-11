# 动态订阅状态树

这集通过 react-redux 这个包，来让组件动态订阅状态树。也就是状态树一旦被修改，让组件能自动刷新显示最新数据。

### 显示评论数

到 CommentBox 的兄弟组件 PostBody 中显示一下评论数。

PostBody.js

```js
        <CommentNo>
          {store.getState().length} 评论
        </CommentNo>
```

到 PostBody.js ，导入 store ，添加样式组件 CommentNo ，里面显示评论数量。这里通过 store.getState() 的形式来读取评论数据。

下面添加 CommentNo 相关样式，把评论显示到 PostBody 的右下角。

浏览器中，发现提交新评论之后，评论数是不会自动更新的。

### 动态读取

先来装包。

```
npm i react-redux
```

这个包负责把 react 和 redux 动态的连接起来。

src/index.js

```js
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'))
```

从 react-redux 中导入 Provider ，提供者，那提供什么给谁呢？下面导入 store ，然后使用 Provider 包裹 App 组件，同时把 store 作为参数传入。这样就把 store 提供给了 App 和它所有的子组件。这样到各个组件中才有可能去用 connect 接口实现动态订阅。

PostContainer.js

```js
import { connect } from 'react-redux'

const PostContainer = props => <Post {...props} />

const mapStateToProps = state =>({
  comments: state
})

export default connect(mapStateToProps)(PostContainer)
```

导入跟 Provider 配合使用的 connect ，也就是连接，接口。定义 mapStateToProps 函数，参数中拿到整个状态树，也就是这里的 state 。返回一个对象，其中 comments 属性对应的值是 state 。也就是整个状态树，而目前整个状态树中恰好也只有一个评论数组。这样当前组件，就多了一个属性就是 comments。

mapStateToProps 的参数中能够拿到状态树，是因为它会被作为参数传递给 connect 语句，而 connect 能够把状态树传递给 mapStateToProps 的前提就是之前使用了 Provider。

Post.js

```js
class Post extends Component {
  render() {
    const { comments } = this.props
    return (
          <PostBody comments={comments} />
   
          <CommentBox comments={comments} />
    )
```

到 Post.js 中，把 this.props.comments 分别传递给 PostBody 和 CommentBox 去使用。

PostBody.js 

```js
class PostBody extends Component {
  render () {
    const { comments } = this.props
    return (
      <Wrap>
        <CommentNo>
          {comments.length} 评论
        </CommentNo>
      </Wrap>
    )
```

this.props 中拿到 comments ，然后 comments.length 拿到评论数。这次的数据就是动态的了。

到浏览器中，再次发评论，发现评论数可以动态变化了。
