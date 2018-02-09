### svg 组件

https://github.com/smooth-code/svgr

### props 处理

非必须 props

propTypes = {
text: PropTypes.string
}

state = {
text: this.props.text || ''
}

使用 state 做一个过渡，添加默认值。来自 redux/TODOMVC

### 前端生成 id

          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
