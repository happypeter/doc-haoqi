# 完成 todo

实现完成 todo 功能。

### 添加 action

ActionTypes.js

```js
export const COMPLETE_TODO = 'COMPLETE_TODO'
```

添加一个新的 action 类型，完成 todo 。

actions/index.js

```js
export const completeTodo = id => dispatch => {
  return dispatch({
    type: types.COMPLETE_TODO,
    id
  })
}
```

添加 action 创建函数。

容器组件中导入一下，然后展示组件中使用。

Todo.js

```js
<List todos={todos} completeTodo={completeTodo} />
```

Todo.js 中拿到，传递给 List 组件。

List.js

```js
const propTypes = {
  completeTodo: PropTypes.func.isRequired
}

class List extends Component {
  render() {
    const { todos, completeTodo } = this.props
    return (
          <Todo
            onClick={() => completeTodo(todo.id)}
            completed={todo.completed}
            key={todo.id}
          >
```

用户点 Todo 的时候，会执行 completeTodo ，并且把当前 todo 的 id 传递给 action 创建函数。

浏览器中，点 todo ，可以看到终端中，action 已经发出了。

### 添加 reducer

reducers/todos.js

```js
    case actionTypes.COMPLETE_TODO:
      return state.map(
        t => (t.id === action.id ? { ...t, completed: true } : t)
      )
```

添加对应的 reducer 代码。把对应 id 的 todo ，completed 设置为 true 。

浏览器中，可以看到完成 todo 的功能实现了。
