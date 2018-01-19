# 编程式页面跳转

除了使用 Link 进行页面跳转，还可以用 js 语句进行编程式的页面跳转。

### 创建自己的 history 对象

src/utils/history.js

```js
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()

export default customHistory
```

安装了 react-router 之后，依赖安装了 history 这个包，导入 createBrowserHistory 接口，可以创建自己的 history 对象。

Main.js

```js
import history from '../utils/history'
import {
  Router,
  Route
} from 'react-router'

class Main extends Component {
  render() {
    return (
      <Router history={history}>
```

导入 history 对象，删除自己就内置 history 对象的 BrowserRouter 改成从 react-router 包中导入比较纯洁的一个 Router 。

让纯洁的 Router 使用咱们自己创建的 history 。


CourseCardActions.js

```js
import history from '../utils/history'

class CourseCardActions extends Component {
  render() {
    const { id, likes } = course
    const comments = commentsByCourseId[id] || []
    return (
      <Wrap>
        <Button onClick={() => like(id)}>
          {likes}赞
        </Button>
        <Button>
        <Button onClick={() => history.push(`/c/${id}`)}>
          {comments.length}评论
        </Button>
      </Wrap>
```

于是全 App 范围内，只要导入自己的这个 history ，就可以用它来进行编程式跳转操作了。
从 course 对象中拿到 id 和 likes ，这样下面的 course.id 就都可以写成 id  了。

评论按钮上如果加一个 Link 也一样能实现页面跳转，不过写 css 的时候就会麻烦一些，因为点赞按钮是不需要包裹 Link 的，不对称。所以这里用编程的方式来进行跳转，onClick 的处理函数中使用 history.push 跳转到课程详情页。

浏览器中，点击评论按钮，果然可以跳转到课程详情页面。
