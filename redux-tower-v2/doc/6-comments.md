# 显示评论

到课程详情页面把评论显示出来。

### 读取数据

CourseContainer.js

```js
import { getCommentsByCourseId, getCoursesById } from '../selectors'

const CourseContainer = props => <Course {...props} />

const mapStateToProps = state => ({
  commentsByCourseId: getCommentsByCourseId(state),
  coursesById: getCoursesById(state)
})

export default connect(mapStateToProps)(CourseContainer)
```


导入两个选择函数，一个是把所有评论按照课程 id 分组的 getCommentsByCourseId ，另一个是获得变形后的 Courses 数据的 getCoursesById 。

mapStateToProps 中，分别使用两个选择函数，拿到对应数据。


selectors/index.js

```js
export const getCoursesById = state => {
  return getCourses(state).reduce((obj, t) => {
    obj[t.id] = t
    return obj
  }, {})
}
```

定义 getCoursesById ，把原始的课程数组，变形成一个对象，每一个属性名是各个课程的 id ，属性值是课程对象，这样转换后的数据方便通过课程 id 来取得一个课程对象。


Course.js

```js
import styled from 'styled-components'
import CommentList from './CourseCommentList'

class Course extends Component {
  render() {
    const {
      commentsByCourseId,
      match,
      coursesById
    } = this.props
    const { id } = match.params
    const comments = commentsByCourseId[id] || []
    const course = coursesById[id] || {}
    return (
      <Wrap>
        <Upper>
          {course.title}
        </Upper>
        <Lower>
          <CommentWrap>
            <CommentList comments={comments} />
          </CommentWrap>
        </Lower>
      </Wrap>
    )
  }
}

export default Course

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Upper = styled.div`
  background: #00bcd4;
  text-align: center;
  font-size: 25px;
  color: white;
  line-height: 8em;
`

const Lower = styled.div`
  min-height: 60vh;
  background-color: #eeeeee;
  padding-top: 50px;
  flex-grow: 1;
`

const CommentWrap = styled.div`
  background: #fff;
  min-height: 10vh;
  width: 600px;
  margin: 0 auto;
  padding: 20px;
`
```

课程详情页 Course.js 中，评论列表放到 CommentList 组件中。

拿到属性中传递过来的评论，路由还有课程数据。从路由对象 match 中拿到当前课程 id 。

于是就能很方便的通过整理好的数据格式，拿到当前课程自己的所有评论，存放到 comments 常量中，以及当前课程对象存放到 course 常量中，避免出现 undefined 情况造成后续报错，这里都在或运算符后都给出了默认值。

接下来把页面分为 Upper 和 Lower 两大块，Upper 中显示课程标题。Lower 中包含 CommentWrap 其中显示 CommentList 也就是评论列表。

接下来定义样式组件 Wrap ，通过 display:flex ，以及后面的 flex-grow 设置，让后 Upper 的高固定，而 Lower 部分占据 Wrap 的所有剩余高度。这里的 height: 100% ，显然是想让 Wrap 跟自己的父元素等高。这里理想的高度就是整个视窗高度，减去 Header 高度。但是这个效果的达成有赖于 Main.js 组件中的一些调整，马上就会看到。

Upper 组件给一个好看的背景色。

Lower 背景是浅灰色。

CommentWrap 也就是评论列表区域的背景色设置为白色，居中放置。

CourseCommentList.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'

class CommentList extends Component {
  render() {
    const { comments } = this.props
    const list = comments.map(t => (
      <Comment key={t.id}>
        <User>{t.user}:</User>
        <Body>{t.body}</Body>
      </Comment>
    ))
    return <Wrap>{list}</Wrap>
  }
}

export default CommentList

const Wrap = styled.div`
  padding: 10px 0;
  line-height: 30px;
`

const Comment = styled.div`
  display: flex;
  margin-bottom: 5px;
`

const User = styled.div`
  font-weight: 600;
  margin-right: 5px;
`

const Body = styled.div`
  flex-grow: 1;
`
```

拿到父组件传递过来的 comments 数据，map 一下，显示出每个评论的评论者，还有内容。然后添加一些样式组件，让页面好看一些。

Main.js

```js
import styled from 'styled-components'

  render() {
    return (
      <Router history={history}>
        <Wrap>
          <div className="header">
            <Header />
          </div>
          <div className="main">
            <div className="inner">
              <Route exact path='/' component={HomeContainer} />
              <Route path='/c/:id' component={CourseContainer} />
            </div>
          </div>
        </Wrap>
      </Router>
    )


const Wrap = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .main {
    flex-grow: 1;
    position: relative;
  }
  .inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`
```

Main.js 中的调整，完全是为了保证 Course 组件的总高度能够占满视窗总高度减去 Header 。为此，给 header 部分和页面主体部分都加了 div 包裹。

Wrap 部分高度是100vh ，同时 class 名为 Main 的组件设置为 flex-grow: 1 ，这样就能保证，class 名为 Main 的 div 的高度能够自动延展，沾满整个屏幕的除了 header 以外的所有空间了，但是一个问题是，一旦一个 div 变成了一个 flex-item ，就像当前条件下一样，那么他的子元素上直接设置 height: 100% 就不会生效了。也就是如果不加上 inner 这个 div ，那么刚才在 Course 组件中，设置的 Wrap 的高度百分百是不会生效的。

浏览器中，可以看到样式完美显示，同时评论也正确显示出来了。
