# 筛选任务

点下面的两个图标，应该等分别筛选出已完成或者全部 todo 进行显示。

### 筛选已经完成的任务

selectors/index.js

```js
const showCompletedFilter = todo => todo.completed
export const getFilteredTodos = state =>
  getTodos(state).filter(showCompletedFilter)
```

添加选择函数。showCompletedFilter 是一个回调函数，负责筛选已经完成的 todo 。然后定义筛选函数 getFilteredTodos ，把所有 todo 进行筛选，showCompletedFilter 作为回调传入。

TodoContainer.js 导入使用。

浏览器中，可以看到只显示已经完成的 todo 了。

### 切换筛选函数

下面要做的是切换筛选条件。

ActionTypes.js

```js
export const SET_FILTER = 'SET_FILTER'
```

添加 SET_FILETER action 类型。

constants/Filters.js

```js
export const SHOW_COMPLETED = 'SHOW_COMPLETED'
export const SHOW_ALL = 'SHOW_ALL'
```

创建常量文件 Filters.js ，里面添加代表两种筛选类型。显示已完成，和显示所有。

actions/index.js

```js
export const setFilter = filter => dispatch => {
  return dispatch({
    type: types.SET_FILTER,
    filter
  })
}
```

定义 setFilter action 创建函数，用来设置当前的筛选函数 filter 。

TodoContainer 中导入 setFilter 。

Todo.js

```js
<Actions setFilter={setFilter} />
```

传递给 Actions 组件使用。

Actions.js

```js
import { SHOW_COMPLETED, SHOW_ALL } from '../constants/Filters'
import PropTypes from 'prop-types'

const propTypes = {
  setFilter: PropTypes.func.isRequired
}

class Actions extends Component {
  render() {
    const { setFilter } = this.props
    return (
      <Wrap>
        <RightIcon
          onClick={() => setFilter(SHOW_COMPLETED)}
          fill={GRAY}
          width="30"
          height="30"
        />
        <ListIcon
          onClick={() => setFilter(SHOW_ALL)}
          fill={BLUE}
          width="30"
          height="30"
        />
      </Wrap>
    )
  }
}

Actions.propTypes = propTypes

export default Actions
```

Actions 组件中，如果用户点对号，就把 `SHOW_COMPLETED` 作为 filter 传递给 action 创建函数。如果点列表图标，就传递 `SHOW_ALL` 。

下一步要把用户传递的筛选类型保存到 store 中。

reducers/index.js 中导入 filter 。

filter.js

```js
import * as filterTypes from '../constants/Filters'
import * as actionTypes from '../constants/ActionTypes'

const filter = (state = filterTypes.SHOW_ALL, action) => {
  switch (action.type) {
    case actionTypes.SET_FILTER:
      return action.filter
    default:
      return state
  }
}

export default filter
```

filter reducer 中，把用户传递过来的 filter 类型，保存到 filter 状态值中。

所有这些准备工作，都是为了服务选择函数的。

selectors/index.js

```js
import { SHOW_ALL, SHOW_COMPLETED } from '../constants/Filters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_COMPLETED]: todo => todo.completed
}

export const getFilteredTodos = state =>
  getTodos(state).filter(TODO_FILTERS[state.filter])
```

导入两种 filter 类型。用一个对象 TODO_FILTERS 来把这两种类型对应成实际的筛选函数。下面真正传入到 filter 函数中的到底是哪一个筛选函数，就要取决于 store 中存储的当前 filter 类型了。

浏览器中，点对号图标，显示完成的 todo ，单列表图标，显示所有 todo 。

### 切换图标高亮

下面来优化一下界面，让用户切换筛选函数的时候，图标高亮也随之切换。

global.css 中，消除一下触屏设备上的点按阴影。

TodoContainer 中拿到 currentFilter ，通过 Todo 组件传递给 Action 组件。

Action.js

```js
import PropTypes from 'prop-types'

const propTypes = {
  setFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired
}

class Actions extends Component {
  render() {
    const { setFilter, currentFilter } = this.props
    return (
      <Wrap>
        <RightIcon
          onClick={() => setFilter(SHOW_COMPLETED)}
          fill={currentFilter === SHOW_COMPLETED ? BLUE : GRAY}
          width="30"
          height="30"
        />
        <ListIcon
          onClick={() => setFilter(SHOW_ALL)}
          fill={currentFilter === SHOW_ALL ? BLUE : GRAY}
          width="30"
          height="30"
        />
```

Action 组件中，拿到 filter 类型，如果是 `SHOW_COMPLETED` 就让对号图标高亮，如果是 `SHOW_ALL` 就让列表图标高亮。

浏览器中，可以看到高亮可以切换了。
