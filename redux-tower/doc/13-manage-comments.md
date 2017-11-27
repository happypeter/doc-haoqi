# 添加和删除评论

### 修改 ShowCourse 组件

把下面一行代码删除，

```
<CommentBox comments={comments} />
```

更改为这样：

```
<CommentBox courseComments={comments} {...this.props} />
```

添加 `{...this.props}` 属性，是为了给 CommentBox 组件传递 `addComment()` 和 `removeComment()` 两个属性。注意一下，CommentBox 组件的 `comments` 属性值改名为 `courseComments` 了，因为在 Redux store 中有一个对象类型的状态变量叫做 `comments`，当其通过 `{...this.props}` 传入 CommentBox 组件的时候，它会覆盖 CommentBox 组件自带的数组类型的 `comments` 属性值，导致在 CommentBox 组件中不能通过下面代码列出所有的评论信息。

```
this.props.comments.map()
```

### 添加评论

修改 CommentBox 组件，因为原来传入的 `comments` 属性已经改名为 `courseComments` 了，所以原来代码中使用 `comments` 的地方，都要用 `courseComments` 替换掉，把下面代码：

```
if(this.props.comments !== undefined) {
  commentList = this.props.comments.map((comment, i) => {
```

改成这样：

```
if(this.props.courseComments !== undefined) {
  commentList = this.props.courseComments.map((comment, i) => {
```

接下来，给下面一行代码，添加表单 `onSubmit` 事件处理方法：

```
<form ref="commentForm" style={styles.form}>
```
修改成这个样子：

```
<form ref="commentForm" onSubmit={this.handleSubmit.bind(this)} style={styles.form}>
```

定义表单提交事件处理方法，调用 `addComment` 方法添加评论，代码如下：

```
handleSubmit(e) {
  e.preventDefault();
  const courseId = this.props.params.courseId;
  const author = this.refs.author.getValue();
  const comment = this.refs.comment.getValue();
  this.props.addComment(courseId, author, comment);
  this.refs.commentForm.reset();
}
```

接下来，修改 `reducers/comments.js` 文件，更新存储在 Store 中的课程评论

```
function courseComments(state = [], action) {
  switch(action.type){
    case 'ADD_COMMENT':
      return [
        ...state,
        { user: action.author, text: action.comment }
      ];
    default:
      return state;
  }
}

function comments(state = [], action) {
  if(typeof action.courseId !== 'undefined') {
    return {
      ...state,
      [action.courseId]: courseComments(state[action.courseId], action)
    }
  }
  return state;
}

export default comments;
```

[reducer composition](http://redux.js.org/docs/basics/Reducers.html)

### 删除评论

修改 CommentBox 组件，给下面一行代码，添加 `onClick` 事件处理方法：

```
<ActionHighlightOff color='red' style={styles.icon} />
```

修改成这个样式，调用 `removeComment` 方法删除评论

```
<ActionHighlightOff color='red' style={styles.icon} onClick={this.props.removeComment.bind(null, this.props.params.courseId, i)} />
```

接下来，修改 `reducers/comments.js` 文件，更新存储在 Store 中的课程评论

```
function courseComments(state = [], action) {
  switch(action.type){
    ...
    case 'REMOVE_COMMENT':
      return [
        ...state.slice(0,action.i),
        ...state.slice(action.i + 1)
      ];
    default:
      return state
  }
}
```
