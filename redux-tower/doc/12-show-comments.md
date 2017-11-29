# 显示课程评论

### 修改 Courses 组件

把下面一行代码

```
<Course increment={this.props.increment} key={i} course={course} />
```

替换成这样，给 `Course` 组件添加一个 `comments` 属性，从 Store 中读取课程的评论信息，传递课程评论数据

```
<Course comments={this.props.comments[course.id]} increment={this.props.increment} key={i} course={course} />)
```

### 修改 Course 组件

把下面一行代码删除：

```
<CourseActions course={course} increment={this.props.increment} />
```

更改为这样，给 `CourseActions` 组件添加一个 `comments` 属性，读取父组件 `Courses` 中传入的评论

```
<CourseActions course={course} increment={this.props.increment} comments={this.props.comments}/>
```

### 修改 CourseActions 组件

把下面一行占位代码删除：

```
<div>0</div>
```

更改为这样，读取父组件 `Course` 中传入的评论信息，显示真实的评论数

```
<div>{this.props.comments ? this.props.comments.length.toString() : '0'}</div>
```

### 修改 ShowCourse 组件

新添加一行代码，从 Store 中读取课程的评论信息

```
const comments = this.props.comments[courseId];
```

然后，把下面一行代码删除
```
<Course course={selectedCourse} increment={this.props.increment} />
```

更改为这样，显示评论数

```
 <Course course={selectedCourse} increment={this.props.increment} comments={comments} />
```

最后，导入 CommentBox 组件，这个组件还不存在，稍后就编写

```
import CommentBox from './CommentBox';
```

然后使用导入的 `CommentBox` 组件：

```
return (
  <div>
    ...
    <CommentBox comments={comments} />
  <div>
)
```

### 编写 CommentBox 组件

新建一个文件 `components/CommentBox.js`，添加如下代码，显示评论信息：

```
import React, { Component } from 'react';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import { Card } from 'material-ui/Card';
import Radium from 'radium';

class CommentBox extends Component {
  getStyles() {
    return {
      root: {
        maxWidth: '900px',
        margin: '0 auto 30px',
      },
      container: {
        margin: '3rem 2rem',
        padding: '1rem 2rem 2rem'
      },
      textField: {
        display: 'block',
        width: '80%',
        minWidth: '256px'
      },
      comment: {
        display: 'flex',
        paddingTop: '16px',
        paddingBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #ddd'
      },
      user: {
        fontSize: '1.7rem',
        paddingRight: '2rem',
        display: 'block',
        color: '#555',
        fontWeight: '600'
      },
      icon: {
        cursor: 'pointer',
        marginLeft: '1rem',
        width: '18px',
        height: '18px',
        flexShrink: '0'
      },
      content: {
        fontSize: '1.6rem',
        color: '#777',
        flexGrow: '1',
        fontWeight: 'normal'
      },
      form: {
        marginTop: '30px'
      }
    }
  }

  render() {
    let styles = this.getStyles();
    let commentList;
    if(this.props.comments !== undefined) {
      commentList = this.props.comments.map((comment, i) => {
        return (
          <div key={i} style={styles.comment}>
            <div style={styles.user}>{comment.user}: </div>
            <div style={styles.content}>{comment.text}</div>
            <ActionHighlightOff color='red' style={styles.icon} />
          </div>
        )
      });
    }
    return (
      <div style={styles.root}>
        <Card style={styles.container}>
          { commentList }
        </Card>
      </div>
    )
  }
}

export default Radium(CommentBox);
```

### 修改 CommentBox 组件

编写课程评论表单，先导入需要的 Material-UI 组件：

```
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
```

接下来，在 `{ commentList }` 代码下方，添加评论表单代码：

```
<form ref="commentForm" style={styles.form}>
  <TextField
    ref='author'
    style={styles.textField}
    hintText="名字" />
  <TextField
    ref='comment'
    style={styles.textField}
    hintText="评论" />
  <RaisedButton
    style={{marginTop: '10px'}}
    labelStyle={styles.label}
    type="submit"
    label="评论"
    secondary={true} />
</form>
```
