# 从服务器端读取所有文章

本节课程将解决刷新页面，文章列表消失的问题。在 Home 组件和 DashBoard 组件重新渲染之前，我们向服务器端请求获取所有文章的接口，然后把服务器端返回的所有文章保存到 store 中的 `posts` 状态中。

### 后端定义获取所有文章接口

打开 `server/routes.js` 文件，添加一个支持 HTTP GET 请求的 `/posts` 接口：

```
app.get('/posts', function(req, res) {
  Post.find({}, 'name', function(err, posts) {
    if (err) return console.log(err);
    res.json({
      posts: posts,
      message: '获取所有文章成功了！'
    });
  })
})
```

### 前端编写异步 Action 创建函数 fetchPosts

打开文件 `redux/actions/postActions.js`，定义 `fetchPosts` 创建函数：

```
export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${Settings.host}/posts`).then(response => {
      dispatch({ type: 'LOAD_POSTS', posts: response.data.posts });
    }).catch(error => {
      handleError(error);
    });
  }
}
```

### 修改 posts reducer

修改 `src/redux/reducers/posts.js` 文件，添加 `LOAD_POSTS` action 的处理语句，初始化 `posts` 为从服务器端获取的所有文章：

```
switch(action.type) {
  case 'LOAD_POSTS':
    return action.posts
  ...
}
```

### DashBoard 组件中调用 fetchPosts

修改 `src/ui/DashBoard.js` 文件，导入 `fetchPosts`：

```
import { fetchPosts } from '../redux/actions/postActions';
```

定义 DashBoard 组件的生命周期函数 `componentWillMount`，当 DashBoard 组件挂载之前，先判断 store 中的 posts 是否为空，若为空，则从服务器端重新请求文章列表接口，获取所有文章存储到 store 中的 `posts` 中，处理页面刷新，store 中的 state 清空的情况：

```
componentWillMount() {
  if(this.props.posts.length === 0) {
    this.props.fetchPosts();
  }
}
```

最后，使用 `connect` 方法把 `fetchPosts` 创建函数注入到 DashBoard 组件中：

```
export default connect(mapStateToProps, {fetchPosts})(DashBoard);
```

### Home 组件中调用 fetchPosts

与 DashBoard 组件中调用 `fetchPosts` 函数操作一模一样，修改 `src/ui/Home.js` 文件，导入 `fetchPosts`：

```
import { fetchPosts } from '../redux/actions/postActions';
```

在 Home 组件渲染之前，定义 Home 组件的生命周期函数 `componentWillMount`：

```
componentWillMount() {
  if(this.props.posts.length === 0) {
    this.props.fetchPosts();
  }
}
```

最后，使用 `connect` 方法把 `fetchPosts` 创建函数注入到 Home 组件中：

```
export default connect(mapStateToProps, {fetchPosts})(Home);
```
