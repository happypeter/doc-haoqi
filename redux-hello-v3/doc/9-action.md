# 使用 action 创建函数

通常大家不会在展示组件中直接写 action ，而是会使用 [Action 创建函数](http://www.redux.org.cn/docs/basics/Actions.html) 。

### 把 action 封装到创建函数

action 创建函数就是能返回一个 action 的函数。马上来定义一个 。

actions/index.js

```js
export const addComment = comment => ({
  type: 'ADD_COMMENT',
  comment
})
```

actions 文件夹下的 index.js 中，定义并导出 addComment 函数，接收一条评论作为参数，返回值是一个 action 。这里 addComment 就是一个 action 创建函数。

接下来用一下。

CommentBox.js

```js
import { addComment } from '../actions'

class CommentBox extends Component {

  submitCmt = e => {
    store.dispatch(addComment(comment))  
  }
}
```

到 CommentBox 导入 addComment ， submitCmt 方法中，替换原有的 action 。

浏览器中，可以看到依然可以正确的提交评论。

### 使用 mapDispatchToProps

现在还有一个小点可以优化，就是避免每次要用 dispatch 的时候都导入一遍 store 。既然 connect 是能拿到 store 的，当然也可以拿到 dispatch 接口。使用 mapDispatchToProps 的技巧，可以解决这个问题。

PostContainer.js

```js
import { connect } from 'react-redux'
import { addComment } from '../actions'

export default connect(mapStateToProps, {
  addComment
})(PostContainer)
```

PostContainer 中导入 addComment ，然后用 mapDispatchToProps 的简写形式，把 addComment 传递给 connect 。这样 connect 就会给当前组件添加一个属性 this.props.addComment ，注意，这个 addComment 属性跟我们从 actions 文件中直接导入的函数可不是一个函数，因为里面多了 dispatch 功能。

Post.js

```js
class Post extends Component {
  render() {
    const { comments, match, posts, addComment } = this.props
    
          <CommentBox 
            postId={id} 
            comments={currentComments} 
            addComment={addComment}
          />
    )
  ```

  Post.js 中拿到 addComments 自己不用，传递给 CommentBox 。

  CommentBox.js

  ```js
    this.props.addComment(comment)
  ```

这样， CommentBox 中就不用导入 store 了，也不用从 actions 文件夹中导入本来的 addComment 了，直接使用 this.props.addComment(comment) 就可以把 action 给发出了。

浏览器中，发评论功能依然工作正常。那我们费力气重构，好处何在？后续发异步请求的时候就会体现出来。
