# 更新 Store 中的 Courses State

### 修改 Courses 组件

```
<Course increment={this.props.increment} key={i} course={course} />
```

### 修改 Course 组件

删除以下代码：

```
constructor(props) {
  super(props);
  this.state = {
    likes: this.props.course.likes
  }
}

increment() {
  this.setState({likes: this.state.likes + 1})
}
```

然后，把下面一行代码：

```
<span key={this.state.likes} className="likes-heart">{this.state.likes}</span>
```

修改成这样：

```
<span key={course.likes} className="likes-heart">{course.likes}</span>
```

再把下面一行代码：

```
<CourseActions course={course} increment={this.increment.bind(this)} likes={this.state.likes}/>
```

修改成这样：

```
<CourseActions course={course} increment={this.props.increment} />
```

### 修改 CourseActions 组件

把下面一行代码：

```
<button style={styles.button} onClick={this.props.increment} key='1'>
```

修改成这样：

```
<button style={styles.button} onClick={this.props.increment.bind(null, parseInt(course.id) - 1)} key='1'>
```

然后，再把下面一行代码：

```
<div>{this.props.likes}</div>
```

修改成这样

```
<div>{course.likes}</div>
```

### 修改 ShowCourse 组件

把下面一行代码：

```
<Course course={selectedCourse} />
```

修改成这样：

```
<Course course={selectedCourse} increment={this.props.increment} />
```

### 修改 Courses Reducer

打开 `reducers/courses.js` 文件，清空原来的代码，添加如下代码：

```
import { INCREMENT_LIKES } from '../actions';

function courses(state = [], action) {
  switch(action.type) {
    case INCREMENT_LIKES :
      const i = action.index;
      return [
        ...state.slice(0,i),
        {...state[i], likes: state[i].likes + 1},
        ...state.slice(i + 1),
      ]
    default:
      return state;
  }
}

export default courses;
```

Reducer 必须是一个 pure function
