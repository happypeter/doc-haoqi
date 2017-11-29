# 添加路由功能

本节课程我们将借助 [React Router](https://github.com/reactjs/react-router) 给项目添加路由功能，让单页面应用看起来有多个页面。

### 构建路由

在 `dev-env/src/index.js` 文件中，添加代码：

```
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Courses from './components/Courses';
import ShowCourse from './components/ShowCourse';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Courses}></IndexRoute>
      <Route path="/view/:courseId" component={ShowCourse}></Route>
    </Route>
  </Router>
)

render(router, document.getElementById('root'));
```

上述代码中的常量 `router` 的数值就代表了整个项目的路由模块，每一个 `Route` 对应着一个 React 组件，并使用了嵌套路由，把 Main 组件作为布局组件，让其能够包含 Courses 和 ShowCourse 子组件。其中，[IndexRoute](https://github.com/reactjs/react-router/blob/master/docs/guides/IndexRoutes.md) 作用是把 Courses 组件设置为默认渲染的组件，也就是当我们访问 `/` 地址的时候，先渲染 Main 组件，而后就、是 Courses 子组件，而不是其它的组件。

体现 Main 组件是布局组件，仅通过上述代码还不够，还需要在 `Main.js` 文件中添加一行代码：

```
{ this.props.children }
```

这样，Main 组件才能包含其它的子组件。当访问首页的时候，Course 组件会取代上面这一行代码。另外，`Main.js` 文件中不再单独使用 Courses 组件了，所以要删除下面一行代码：

```
import Courses from './Courses';
```

### 编写新组件 ShowCourse

ShowCourse 组件是课程详情页面要展示的信息，后续还会添加课程评论功能。先添加如下代码：

```
import React, { Component } from 'react';

import courses from '../data/courses';
import Course from './Course';

class ShowCourse extends Component {
  getStyles() {
    return {
      top: {
        backgroundColor: '#00bcd4',
        paddingTop: '3rem',
        paddingBottom: '1rem'
      },
      container: {
        maxWidth: '900px',
        margin: '0 auto',
      }
    };
  }

  render() {
    const { courseId } = this.props.params;

    const index = courses.findIndex((c) => c.id === courseId);
    const selectedCourse = courses[index];

    let styles = this.getStyles();
    return (
      <div>
        <div style={styles.top}>
          <div style={styles.container}>
            <Course course={selectedCourse} />
          </div>
        </div>
      </div>
    );
  }
}

export default ShowCourse;
```

确定显示哪一门课程的信息，是由路径 `/view/:courseId` 中的查询字符串 `courseId` 的值决定的，这个 `courseId` 的值可以通过下面一行代码获取：

```
this.props.params.courseId
```

这个 `params` 属性是由 React Router 注入给组件的。比如说，我们访问 `/view/1` 地址的时候，`params` 的属性值为 `{courseId: '1'}` 。文档请查看 [Injected Props](https://github.com/reactjs/react-router/blob/master/docs/API.md#injected-props) 部分的介绍。

获得了要展示的课程 `id` 之后，我们就可以从导入的课程数组 `courses` 中找到相匹配的课程：

```
import courses from '../data/courses';
const index = courses.findIndex((c) => c.id === courseId);
const selectedCourse = courses[index];
```

最后把找到的课程 `selectedCourse` 传递给 Course 组件，从而展示出课程信息。这会儿访问地址 `localhost:3000/view/1`, 可以看到一张大大的课程封面。

### 修改 Course 组件

使用 React Router 的 `Link` 组件，给课程封面图片添加进入课程详情页面的链接，：

```
import { Link } from 'react-router';

<Link to={`/view/${course.id}`}>
  <img src={course.image} alt={course.name} style={styles.img} />
</Link>
```
