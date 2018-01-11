# Store 中添加多类数据

来添加另一类数据，也就是文章数据。看一下 store 中如何来处理多类数据。主要涉及到 combineReducers 这个接口的使用。

### 使用 combineReducers 分拆 reducer

总体思路是这样：每加一类数据，就添加一个 reducer 来负责修改它，最后通过 combineReducers ，中文意思是”合并 reducer“ 这个接口，再把所有的 reducer 合并成 rootReducer 即可。

reducers/index.js

```js
import { combineReducers } from 'redux'
import comments from './comments'
import posts from './posts'

const rootReducer = combineReducers({
  comments,
  posts
})
```

rootReducer 文件中，导入 combineReducers ，导入 comments 和 posts 这两个 reducer 。

rootReducer 现在由 comments 和 posts 两个 reducer 合并得到。这样，最终的状态树中就会有两个属性，一个叫 comments ，值是评论数据，另一个就是 posts ，值是文章数据。这两个属性名正好和 reducer 的名字相同，这是 CombineReducers 达成的第一个效果。

CombineReducers 达成的第二个，也是非常巧妙的的一个效果是，到 posts 和 comments 两个 reducer 中，每一个的参数 state 就不再代表整个状态树了，而只是代表 comments 或者 posts 数据，这样能大大简化每个 reducer 的代码。

reducers/comment.js

```js
const initialState = [
  {
    id: 'wewe2122',
    text: 'hello'
  },
  {
    id: 'wqewqeq23',
    text: 'hi'
  }
]

const comments = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      const comments = [
        ...state,
        action.comment
      ]
      return comments
    default:
      return state
  }
}

export default comments
```

comments reducer 的内容和之前 rootReducer 完全相同，只是把函数名从 rootReducer 改成了 comments 。

reducers/posts.js

```js
const initialState = [
  {
    id: '1',
    title: 'Git Tips'
  },
  {
    id: '2',
    title: 'React Tips'
  }
]

const posts = (state = initialState, action) => {
  return state
}

export default posts
```

posts reducer 这里先添加 posts 数组，每一个对象包括 id 和 title 两个数据。把数组作为 reducer 的初始状态值传入。reducer 中直接返回 state ，暂时不做任何操作。

PostContainer.js

```js
const mapStateToProps = state =>({
  comments: state.comments
})
```

因为现在整个状态树的数据结构已经变化的，所以需要到 PostContainer 中，把 comments 属性对应的数据由 state 改为 state.comments ，代码才能继续正确运行。

浏览器中，添加评论。注意观察终端中打印出的状态树的形状，果然多了 posts 数据。
