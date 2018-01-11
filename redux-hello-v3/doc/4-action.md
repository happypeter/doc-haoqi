# 修改 Store 中的数据

要修改 store 中的数据，需要先发出 action ，action 触发 reducer ，通过 reducer 来完成状态树的修改。

### 用 redux-logger 监控 action

为了辅助开发，先安装 redux-logger 。

```
npm i redux-logger
```

log 的意思是记录。

store/index.js

```js
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

const store = createStore(rootReducer, applyMiddleware（logger))
```

到 store 文件中，导入 applyMiddleware ，意思是应用中间件。然后导入 logger 。createStore 中传入 applyMiddleware 来加载 logger 。

到 CommentBox 中，发出 action 测试一下 Logger 。

```js
    store.dispatch({ type: 'ADD_COMMENT' })
```

submitCmt 函数中，添加 dispatch 语句，dispatch 的意思是发出，参数中就是一个 action 。可以看到 action 是一个对象。对象中必须要有的一个属性就是 type ，值是一个描述该 action 的字符串。这里是 `ADD_COMMENT` 添加评论。

浏览器中，点一下提交按钮，可以看到终端中有彩色的打印信息。redux-logger 可以在每次 action 发出的时候，在终端中打印出 action 以及前后的状态树。

### 用 action 触发 reducer 来修改状态树

来发出一个完整的 action

CommentBox.js

```js
import store from '../store'
import shortid from 'shortid'

class CommentBox extends Component {
  submitCmt = e => {
    ...
    const { text } = this.state
    const id = shortid()
    const comment = {
      id,
      text
    }
    store.dispatch({ type: 'ADD_COMMENT', comment })
```

导入 shortid ，submitCmt 函数中，从 state 中拿到用户输入的文本，然后用 shortid 来给这个文本配一个 id ，这样就能拼接成一条新评论了。然后，dispatch 的 action 中，就不仅仅有 type 了，还有携带的数据，也就是这条新评论对象。

action 发出之后，谁会接收它呢？

reducers/index.js

```js
const rootReducer = (state = initialState, action) => {
  return state
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
```

到 reducers/index.js 中，action 发出后 reducer 会收到 action ，reducer 中来添加 switch 语句，根据 action 的 type 来决定要执行哪个 case 下的代码。当 type 是 `ADD_COMMENT` 的时候，定义一个 comments 常量来存储新状态树，那它就应该是老状态树，再加上最新的这条评论。return comments 就可以把 store 中保存的状态树更新了。default ，也就是默认条件下要把 state 返回。

浏览器中，发出评论，终端中可以看到 next state ，也就是新状态树中的评论数量的确增加了。
