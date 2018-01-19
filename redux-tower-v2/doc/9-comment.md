# 添加和删除评论

实现评论相关功能。

### 实现受控组件

先来实现受控组件。

CourseCommentForm.js

```js
class CommentForm extends Component {
  state = {
    body: '',
    user: ''
  }

  bodyChange = e => {
    e.preventDefault()
    this.setState({
      body: e.target.value
    })
  }

  userChange = e => {
    e.preventDefault()
    this.setState({
      user: e.target.value
    })
  }

  handleClick = e => {
    e.preventDefault()
    const { body, user } = this.state
    const comment = {
      body,
      user
    }
    console.log('comment', comment)
    this.setState({
      body: '',
      user: ''
    })
  }
  render() {
    const { user, body } = this.state
    return (
      <Wrap>
        <NameInput
          placeholder="名字"
          value={user}
          onChange={this.userChange}
        />
        <CommentInput
          placeholder="评论"
          value={body}
          onChange={this.bodyChange}
        />
        <Button onClick={this.handleClick}
          raised color="accent">
          评论
        </Button>
      </Wrap>
```


首先定义两个 state ，body 和 user 初始值都是空字符串。配套的有 bodyChange 和 userChange ，来体现用户对 input 的输入内容的变化，以及一个 handleClick 函数，来把用户最终输入的内容打印出来。

render 函数中，拿到 user 和 body ，把两个 input 的 value 分别设置成 user 和 body 。onChange 事件的处理函数分别设置为 userChange 和 bodyChange 。Button 的 onClick 事件处理函数设置为 handleClick 。

整个上面这些就是完整的一个 React 受控组件的思路。

浏览器中，输入内容并提交，终端中可以看到打印出了用户输入。


### 添加评论 id 和课程 id

提交的评论对象中还需要一个自己的 id ，和一个课程 id 。

先来装包 

```
npm i shortid
```

shortid 顾名思义可以用来生成一个简单的 id 。

Course.js

```js
  <CommentForm id={id} />
```

course 的 id 要从父组件 Course 传递给 CommentForm 。

CourseCommentForm.js

```js
import shortid from 'shortid'

class CommentForm extends Component {
  handleClick = e => {
    const id = shortid()
    const comment = {
      body,
      id,
      user,
      course: this.props.id
    }
```

导入 shortid ，用它来生成新 comment 对象自己的 id ，然后拿到父组件的 id ，作为 course 属性的值。

### 添加评论

actions/index.js

```js
export const addComment = comment => ({
  type: 'ADD_COMMENT',
  comment
})
```

定义 addComment 这个 action 创建函数

containers/CourseContainer.js

```js
import { addComment } from '../actions'

const CourseContainer = props => <Course {...props} />

export default connect(mapStateToProps, {
  addComment
})(CourseContainer)
```

导入 addComment 并且把它 map 成一个当前组件的 prop 。

Course

```js
    const {
      addComment
    } = this.props
        <Lower>
          <CommentWrap>
            <CommentForm id={id} addComment={addComment} />
          </CommentWrap>
        </Lower>
```

传递 addComment 给真正用它的组件。

CourseCommentForm.js

```js
 this.props.addComment(comment)
```

表单组件中，把 comment 对象做参数，执行 addComment 。


reducers/comment.js

```js
import * as types from '../constants/ActionTypes'

const all = (state = initialState, action) => {
  switch (action.type) {
    case type.ADD_COMMENT:
      return [...state, action.comment]
    default:
      return state
  }
}
```

添加简单的 reducer 代码。

ActionTypes.js

```js
export const ADD_COMMENT = 'ADD_COMMENT'
```

不要忘记定义常量。

浏览器中，可以看到，提交评论成功。

### 添加删除评论图标

CourseCommentList.js

```js
import Delete from 'material-ui-icons/Delete'

class CommentList extends Component {
     <Comment key={t.id}>
        <User>{t.user}:</User>
        <Body>{t.body}</Body>
        <Action>
          <Delete />
        </Action>
      </Comment>

const Action = styled.div`
  cursor: pointer;
  svg {
    padding: 5px;
    width: 20px;
    height: 20px;
    display: block;
  }
`
```

导入 mui 的 `Delete` 图标 。评论的末尾添加上，通过 Action 样式组件，添加一些 css 。

浏览器中，看到多了一个删除图标。

### 删除评论

actions/index.js

```js
export const deleteCmt = id => ({
  type: 'DELETE_COMMENT',
  id
})
```

添加删除评论的 action ，需要传递评论 id 作为负载数据。

ActionTypes.js

```js
export const DELETE_COMMENT = 'DELETE_COMMENT'
```

添加常量定义。

CourseContainers.js

```js
import { addComment, deleteCmt } from '../actions'

const CourseContainer = props => <Course {...props} />

export default connect(mapStateToProps, {
  addComment,
  deleteCmt
})(CourseContainer)
```

容器组件中导入。

Course.js

```js
  <CommentList comments={comments} deleteCmt={deleteCmt} />
```

展示组件中传递给 CommentList 组件。


CourseCommentList.js

```js
class CommentList extends Component {
    const { comments, deleteCmt } = this.props
      <Comment key={t.id}>
        <Action onClick={() => deleteCmt(t.id)}>
          <Delete />
        </Action>
      </Comment>
```

导入 deleteCmt 。点删除图标的时候执行它。把评论 id 当参数传递过去。

reducers/index.js

```js
    case types.DELETE_COMMENT:
      return state.filter(t => t.id !== action.id)
```

添加对应的 reducer 代码，把对应 id 的评论筛选出去。

浏览器中，看到删除评论功能实现了。
