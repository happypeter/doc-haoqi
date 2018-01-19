# 向 redux 中填充数据

这集来把数据放进 redux store 中。

### 填充数据

reducers/index.js


```js
import { combineReducers } from 'redux'
import course from './course'

export default combineReducers({
  course
})
```

到 rootReducer 定义的位置，删除 post reducer ，替换成 course reducer 。同时把 reducers/post.js 文件也重命名为 reducers/course.js。

reducers/course.js

```js
import { combineReducers } from 'redux'

const initialState = [
  {
    id: '1',
    title: '课程1',
    likes: '2'
  }, {
    id: '2',
    title: '课程2',
    likes: '3'
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

到重命名得到 course.js 中，删除 types 导入，添加初始数据 initialState ，每个课程对象包含 id ，title 和 likes 也就是点赞数三项内容。

到 all reducer 中，initialState 作为初始状态值传入。删除 case 语句，因为暂时用不上，只保留 default 。这样数据就填充好了。


### 组件中读取数据


HomeContainer.js

```js
import { connect } from 'react-redux'
import { getCourses } from '../selectors'

const HomeContainer = props => <Home {...props} />

const mapStateToProps = state => ({
  courses: getCourses(state)
})

export default connect(mapStateToProps)(HomeContainer)
```

到 HomeContainer 中，导入 connect ，导入选择函数 getCourses ，定义 mapState 函数，通过 getCourses 函数，把整个状态树 state 中的所有课程的数据，选出来，保存到 courses 属性中。


selectors/index.js

```js
export const getCourses = state => state.course.all
```

添加需要的选择函数。

Home.js

```js
class Home extends Component {
  render() {
    const { courses } = this.props
    console.log(courses)
```

展示组件中，打印一下。

浏览器中，访问首页，终端中可以看到成功打印出了所有课程数据。

### 显示课程卡片

Home.js

```js
import CourseCardContainer from '../containers/CourseCardContainer'
import styled from 'styled-components'

class Home extends Component {
  render() {
    const { courses } = this.props
    const list = courses.map(t => (
      <CourseCardContainer key={t.id} course={t} />
    ))
    return <Wrap>{list}</Wrap>
  }
}

export default Home

const Wrap = styled.div`
  display: flex;
  width: 700px;
  margin: 20px auto;
  justify-content: space-between;
`
```

到 Home.js 中，导入 CourseCardContainer ，导入 styled ，list 常量中存放所有课程卡片，每张卡片的具体内容放到独立组件 CourseCard 中，下面的样式组件 Wrap 中使用 flexbox 技巧，让课程卡片布局美观一点。

CourseCardContainer.js

```js
import React from 'react'
import CourseCard from '../components/CourseCard'

const CourseCardContainer = props => <CourseCard {...props} />

export default CourseCardContainer
```

容器组件中，暂时没有实际内容。


CourseCard.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'

class CourseCard extends Component {
  render() {
    const { course } = this.props
    return (
      <Wrap>
        {course.title}
      </Wrap>
    )
  }
}

export default CourseCard

const Wrap = styled.div `
  width: 300px;
  background: #b369e2;
  height: 160px;
  color: white;
  font-size: 21px;
  text-align: center;
  line-height: 160px;
`
```

展示组件中，每张课程卡片暂时只显示课程名，下面样式组件 Wrap ，给课程卡片设置一个好看的背景色。

浏览器中，可以看到课程卡片上分别显示出了两门课程的 title 。
