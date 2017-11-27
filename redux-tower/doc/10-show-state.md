# 读取 Store 中的 Courses State

### 创建一个 Container 组件 App

新建文件 `components/App.js`，添加如下代码：

```
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import Main from './Main';

function mapStateToProps(state) {
  return {
    courses: state.courses,
    comments: state.comments
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
```

* [bindActionCreators](http://redux.js.org/docs/api/bindActionCreators.html)
* [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

### 使用 App 组件

修改 `index.js` 文件，修改代码：

```
import App from './components/App';

<Route path="/" component={App}>
  ...
</Route>
```

### 读取 Courses State

修改 `components/Main.js` 文件，用下面一行代码代替 `{ this.props.children }`

```
{ React.cloneElement(this.props.children, this.props) }
```

这样，才能在 Courses 和 ShowCourse 组件中通过代码 `this.props.courses` 获取 `store` 中的 `courses` 状态值。


### 修改 Courses 组件

然后，打开 `components/Courses.js` 文件，注释掉下面一行代码：

```
import courses from '../data/courses';
```

在代码开头添加双斜杠 `//` 符号，改成这样：

```
// import courses from '../data/courses';
```

现在所有的课程数据不再从静态文件中读取，而是从 `store` 中获取，所以把存储所有课程信息的常量 `courses` 由 `this.props.courses` 代替，也就是把下面一行代码：

```
{ courses.map((course, i) => <Course key={i} course={course} />)}
```

改成这样：

```
{ this.props.courses.map((course, i) => <Course key={i} course={course} />)}
```

### 修改 ShowCourse 组件

按照修改 Courses 组件的思路，修改 ShowCourse 组件，注释掉下面一行代码：

```
import courses from '../data/courses';
```

改成这样：

```
// import courses from '../data/courses';
```

然后，把下面两行代码：

```
const index = courses.findIndex((c) => c.id === courseId);
const selectedCourse = courses[index];
```

改成这样：

```
const index = this.props.courses.findIndex((c) => c.id === courseId);
const selectedCourse = this.props.courses[index];
```
