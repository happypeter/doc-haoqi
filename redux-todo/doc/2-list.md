# 显示 todo 列表

把 todo 列表显示出来。

### 添加 todo 数据

reducers/index.js

```js
import { combineReducers } from 'redux'
import todos from './todos'

export default combineReducers({
  todos
})
```

添加 todos reducer 进来。

reducers/todos.js

```js
const initialState = [
  {
    id: 0,
    text: 'Use Redux',
    completed: true
  },
  {
    id: 1,
    text: 'Try React',
    completed: false
  }
]

const todos = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default todos
```

原来的 post.js 改名为 todos.js ，里面添加 todos 的初始数据。

TodoContainer.js

```js
import { getTodos } from '../selectors/index'

const mapStateToProps = state => ({
  todos: getTodos(state)
})
```

TodoContainer 文件中，导入一个选择函数 getTodos ，在 mapState 函数中使用一下，拿到 todos 数据。

selectors/index.js

```js
export const getTodos = state => state.todos || []
```

选择函数中从 state 中拿到 todos 数据，通常后面都给个默认值，不过这里咱们没有异步请求，实际上没有必要。

Todo.js

```js
import PropTypes from 'prop-types'

const propTypes = {
  todos: PropTypes.array.isRequired
}

class Todo extends Component {
  render() {
    const { todos } = this.props
    console.log('todos', todos)
}

Todo.propTypes = propTypes

export default Todo
```

Todo 组件中添加一下类型检查，真的是能大大提高开发效率的。然后下面把 todos 数据打印一下。

浏览器中，刷新，可以看到终端中打印出了 todo 数组。

### 展示 todo 列表

Todo.js

```js
<List todos={todos} />
```

Todo 组件中把 todos 数据传递给 List 组件。

List.js

```js
import PropTypes from 'prop-types'
import { GRAY, BLACK } from '../constants/Colors'

const propTypes = {
  todos: PropTypes.array.isRequired
}

class List extends Component {
  render() {
    const { todos } = this.props
    return (
      <Wrap>
        {todos.map(todo => (
          <Todo completed={todo.completed} key={todo.id}>
            {todo.text}
          </Todo>
        ))}
      </Wrap>
    )
  }
}

List.propTypes = propTypes

export default List

const Wrap = styled.div`
  padding: 20px;
`

const Todo = styled.div`
  position: relative;
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
  color: ${props => (props.completed ? GRAY : BLACK)};
  height: 22px;
  line-height: 22px;
  margin: 10px 0;
`
```

List 组件中，也添加一下类型检查。然后导入两个颜色常量。拿到 todos 数据，显示出来。

添加 Todo 样式组件，通过传递过来的 completed 属性，已经完成的 Todo 给一个中划线，显示为灰色，否则显示为黑色。

添加必要的颜色常量，并且在其他需要的位置都统一用常量。

浏览器中，可以看到列表显示出来了，其中一个带中划线的是已经完成的 todo 。

### 添加图标

已经完成的 todo 后面再给加个图标吧。

到[阿里图标库](http://iconfont.cn/)，搜索 right 。下载一个对号的 svg 格式图标。

```
npm i -g svgr
```

全局安装 [svgr](https://github.com/smooth-code/svgr) 。

```
svgr right.svg >RightIcon.js
```

运行 svgr 命令，把 svg 图标转换成一个 React 组件。并把组件放到 src/componnets 文件夹下。

Colors.js 先添加一个新的颜色常量，浅主色。

List.js

```js
import { GRAY, BLACK, LIGHT_PRIMARY } from '../constants/Colors'
import RightIcon from './RightIcon'

          <Todo completed={todo.completed} key={todo.id}>
            {todo.text}
            <IconWrap>
              {todo.completed && (
                <RightIcon width="18px" height="18px" fill={LIGHT_PRIMARY} />
              )}
            </IconWrap>
          </Todo>
        ))}
      </Wrap>


const IconWrap = styled.div`
  position: absolute;
  right: 0;
  top: 2px;
`
```

List 组件中，导入颜色和图标。下面 IconWrap 包裹下，使用图标，宽度和高度都是 18，当然只有已经完成的 todo 才会显示图标。

然后添加 IconWrap 控制一下图标的位置。

浏览器中，图标显示出来了。
