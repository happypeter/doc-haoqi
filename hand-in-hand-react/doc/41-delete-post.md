# 实现删除文章功能

### 服务器端编写删除文章的接口

```
app.delete('/posts/:post_id', requireAuth, function(req, res) {
  var id = req.params.post_id;
  Post.findById({_id: id}, function(err, post) {
    post.remove(function(err){
      if (err) return res.status(422).json({error: err.message});
      res.json({
        id: id,
        message: '文章已经移除了！'
      });
    });
  });
})
```

### 删除选定的文章

修改 PostActionList 组件，导入 `connect` 方法：

```
import { connect } from 'react-redux';
```

再导入用于删除选定文章的 `deletePost` 创建函数：

```
import { deletePost } from '../../redux/actions/postActions';
```

把 `deletePost` 创建函数注入 PostActionList 组件：

```
export default connect(null, { deletePost })(Radium(PostActionList));
```

给 `删除` 标签的最外层添加一个 `onClick` 事件：

```
<div style={styles.action} onClick={this.handleClick.bind(this)}>...</div>
```

定义 `handleClick` 事件处理函数：

```
handleClick() {
  this.props.deletePost(this.props.post._id);
}
```

### 定义 deletePost 创建函数

修改 `redux/actions/postActions.js` 文件，添加代码：

```
export function deletePost(id) {
  return function(dispatch) {
    axios.delete(`${Settings.host}/posts/${id}`, {
      headers: {'Authorization': sessionStorage.getItem('jwtToken')}
    }).then(response => {
      dispatch({ type: 'DELETE_POST', id: response.data.id })
      console.log(response.data.message)
    }).catch(error => {
      handleError(error);
    });
  }
}
```

### 修改 posts reducer

修改 `redux/reducers/posts.js` 文件，首先导入 `filter` 方法：

```
import filter from 'lodash/fp/filter';
```

然后，添加响应 `DELETE_POST` action 的代码：

```
switch(action.type) {
  ...
  case 'DELETE_POST':
    return filter((post) => {
      return post._id !== action.id
    }, state)
  default:
    return state
}
```
