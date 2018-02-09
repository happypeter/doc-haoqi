# 提交 todo

这集开始做功能了，先来完成提交 todo 。

### 受控组件

先来把输入框改成一个受控组件。

TextInput.js

```js
class TextInput extends Component {
  state = {
    text: ''
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    })
  }

  handleSubmit = () => {
    const { text } = this.state
    if (text.length !== 0) {
      console.log(text)
    }
    this.setState({ text: '' })
  }

  render() {
    return (
      <Wrap>
        <Input value={this.state.text} onChange={this.handleChange} />
        <Button onClick={this.handleSubmit}>
          <AddIcon fill="white" width="16" height="16" />
        </Button>
      </Wrap>
```

添加 text 这个 state 值，然后是对应的 handleChange 和 handleSubmit 这三个可以说是受控组件的三件套了。分别设置到 Input 和 Button 的对应属性上。 这样，受控组件就改好了。

浏览器中，提交评论，可以看到终端中打印出了用户输入内容。

### 触发 Action

下面来触发 action 。

先来添加 Action 类型定义。

ActionTypes.js

```js
export const ADD_TODO = 'ADD_TODO'
```

添加 ADD_TODO 常量。

actions/index.js

```js
import * as types from '../constants/ActionTypes'

export const addTodo = text => dispatch => {
  return dispatch({
    type: types.ADD_TODO,
    text
  })
}
```

actions 创建函数文件中，删除原有内容，添加 addTodo ，发出 `ADD_TODO` 这个 action ，然后把 text 发送给 reducer 。

TodoContainer.js

```js
import { addTodo } from '../actions'

export default connect(mapStateToProps, {
  addTodo
})(TodoContainer)
```

容器组件中导入 addTodo 。

Todo.js

```js
import PropTypes from 'prop-types'

const propTypes = {
  addTodo: PropTypes.func.isRequired
}

class Todo extends Component {
  render() {
    const { todos, addTodo } = this.props
    return (
      <Wrap>
        <TextInputWrap>
          <TextInput addTodo={addTodo} />
        </TextInputWrap>
```

Todo.js 中添加对应的类型检查，并且把 addTodo 传递给 TextInput 。

TextInput.js

```js
import PropTypes from 'prop-types'

const propTypes = {
  addTodo: PropTypes.func.isRequired
}

  handleSubmit = () => {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }


TextInput.propTypes = propTypes

export default TextInput
```

TextInput 中，执行 addTodo ，把用户提交的 text 作为参数传递。

浏览器中，提交评论，可以看到 redux-logger 打印出的信息。

### 添加 reducer

```js
import * as actionTypes from '../constants/ActionTypes'

const todos = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ]
    default:
      return state
  }
```

reducer 中，来创建一个新的 todo ，首先需要一个 id 。使用 reduce 方法，找到所有的已有 id 中最大的一个，然后加一，作为新 todo 的 id 。下面再把 completed 和 text 添加进来。一个新 todo 对象就有了。

浏览器中，添加 Todo 成功。

### 回车添加 todo

TextInput.js

```js
  handleKeyDown = e => {
    if (e.which === 13) {
      this.handleSubmit()
    }
  }

      <Wrap>
        <Input
          value={this.state.text}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
```

添加 Input 的 handleKeyDown 事件处理函数，如果按下的键是 enter ，就执行 handleSubmit 。

浏览器中，填写内容，然后回车也可以添加 todo 了。
