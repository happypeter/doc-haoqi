# 添加点赞功能

来实现点赞功能。

### 发出 action

actions/index.js

```
export const like = id => ({
  type: types.LIKE,
  id
})
```

把原来的 POST 相关内容都删除，来添加需要的 action 创建器，参数是课程 id  。

constants/ActionTypes.js

```js
export const LIKE = 'LIKE'
```

添加需要的常量定义，使用常量的好处就是如果使用的时候一旦拼写错误，就可以立刻看到报错信息。让定位 Bug 变得容易了。

CourseCardContainer.js

```js
import { like } from '../actions'
...

export default connect(mapStateToProps, {
  like
})(CourseCardContainer)
```

导入 like ，然后用 mapDispatchToProps 的简写形式把 like 添加到 connect 的参数中。

CourseCartActions.js

```js
   const { commentsByCourseId, course, like } = this.props

    return (
      <Wrap>
        <Button>
        <Button onClick={() => like(course.id)}>
```

属性中拿到 like 函数，onClick 的时候把课程 id 作为参数传递进去。

浏览器中，点一下点赞按钮，终端中可以看到 action 被发出了。


### 添加 reducer


reducers/index.js

```js
import * as types from '../constants/ActionTypes'

const initialState = [
  {
    id: '1',
    title: '课程1',
    likes: 2
  }, {
    id: '2',
    title: '课程2',
    likes: 3
  }
]

const all = (state = initialState, action) => {
  switch (action.type) {
    case types.LIKE:
      return state.map(t => {
        if (t.id === action.id) {
          return {
            ...t,
            likes: t.likes + 1
          }
        }
        return t
      })
    default:
      return state
  }
```

导入常量文件。

方便点赞运算，likes 数据由字符串改为数字。

当 action 类型为 LIKE 的时候，state map 一下，找到 id 和 action 携带过来的课程 id 相等的课程对象，把它的点赞数量加一。

浏览器中，可以看到点赞操作现在成功了。
