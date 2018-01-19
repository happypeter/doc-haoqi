# 添加点赞评论区

来增加点赞评论相关的按钮。

### 按钮区样式

CourseCard.js

```js
import Actions from './CourseCardActions'

class CourseCard extends Component {
  render() {
    return (
      <Wrap>
        <Poster>
          {course.title}
        </Poster>
        <Actions />
      </Wrap>
    )
  }

const Wrap = styled.div `
  width: 300px;
`

const Poster = styled.div`
  background: #b369e2;
  height: 160px;
  color: white;
  font-size: 21px;
  text-align: center;
  line-height: 160px;
`
```

按钮们都放到 CourseCardActions.js 中去定义，这里来导入一下。下面为了避免 Wrap 的样式，影响到 Actions 组件的样式，把原有内容封装到 Poster 中。

下面把 Wrap 组件改名为 Poster 组件，宽度300这一行，继续保留为 Wrap 的样式。

components/CourseCardActions.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'

class CourseCardActions extends Component {
  render() {
    return (
      <Wrap>
        <Button>
          12赞
        </Button>
        <Button>
          5评论
        </Button>
      </Wrap>
    )
  }
}

export default CourseCardActions

const Wrap = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between
`

const Button = styled.div`
  display: flex;
  background-color: rgb(242, 244, 246);
  color: rgb(76, 87, 101);
  padding: 2px 9px;
  :hover {
    cursor: pointer;
  }
`
```

Actions 组件的文件名为何起的这么长呢？主要是突出这个组件是从属于 CourseCard 组件的，所以文件名中以 CourseCard 为前缀。

暂时也只写了样式，没有功能，主要显示两个按钮，一个是点赞，一个负责跳转到评论区。

下面 Wrap 组件中设置 display: flex 。Button 组件给一个浅灰的背景色。

浏览器中，按钮出来了。

### 添加评论数据

来从 store 中读取真实的点赞和评论数，显示到两个按钮上。

reducers/comment.js

```js
import { combineReducers } from 'redux'

const initialState = [
  {
    id: '1',
    user: 'peter',
    body: '很有意思',
    course: '1'
  },
  {
    id: '2',
    user: 'billie',
    body: 'nice',
    course: '2'
  },
  {
    id: '3',
    user: 'Jay',
    body: 'cool',
    course: '2'
  }
]

const all = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  all
})
```

跟 course reducer 采用完全一样的结构，comment reducer 中，添加初始数据，每个评论包含 id ，评论者用户名，评论内容，已经被评论的课程 id 四项内容。

reducers/index.js

```js
import { combineReducers } from 'redux'
import course from './course'
import comment from './comment'

export default combineReducers({
  course,
  comment
})
```

rootReducer 文件中，经过 combineReducers 导出之后，可以在 state.comment.all 中拿到评论数组。

### 使用 store 中的数据

selectors/index.js

```js
export const getComments = state => state.comment.all

export const getCommentsByCourseId = state => {
  return getComments(state).reduce((obj, t) => {
    obj[t.course] = obj[t.course] || []
    obj[t.course].push(t)
    return obj
  }, {})
}
```

到选择函数文件中，对评论数据进行一下变形，通过 getCommentsByCourseId 函数，把原来的评论数据按照所在课程 id 进行分组，方便后续使用。

CourseCardContainer.js

```js
import { connect } from 'react-redux'
import { getCommentsByCourseId } from '../selectors'

const CourseCardContainer = props => <CourseCard {...props} />

const mapStateToProps = state => ({
  commentsByCourseId: getCommentsByCourseId(state)
})

export default connect(mapStateToProps)(CourseCardContainer)
```

课程卡片的容器组件中，来读取评论数据。导入选择函数 getCommentsByCourseId ，mapStateToProps 中使用一下，把变形后的评论数据存放到 commentsByCourseId 属性中，传递给 CourseCard 。

CourseCard.js

```js
    <Actions {...this.props} />
```

CourseCard 自己不用，通过 this.props 展开的形式，把自己的所有属性都传递给 Actions 组件。

CourseCardActions.js

```js
class CourseCardActions extends Component {
  render() {
    const { commentsByCourseId, course } = this.props
    const comments = commentsByCourseId[course.id] || []
    return (
      <Wrap>
        <Button>
          {course.likes}赞
        </Button>
        <Button>
          {comments.length}评论
        </Button>
      </Wrap>
    )
```

Action 组件中，可以拿到传递过来的按照课程 id 分组过的评论数据，以及从 Home 组件中一路传递过来的课程对象。

把当前课程的所有评论保存到 comments 常量中，当前课程无评论时候默认赋值为空数组，避免后续出现 undefined 相关错误。

两个按钮中分别显示出真实的点赞数和评论数。

浏览器中，看到数据正确显示出来了。
