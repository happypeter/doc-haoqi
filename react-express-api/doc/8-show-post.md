# 展示每篇文章的详细信息

### 添加前端路由

通过 [react-router](https://github.com/ReactTraining/react-router) 添加前端路由让单页面看起来有 “多个页面” 的效果，新建文件 `src/routes.js`，添加代码：

```
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './ui/App';
import PostList from './ui/posts/PostList';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={PostList} />
    </Route>
  </Router>
);
```

### 修改 App 组件

打开 `src/ui/App.js` 文件，删除代码：

```
import PostList from './posts/PostList';
```

然后导入 [Link](https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link) 组件

并把代码：

```
<div>
  <header style={styles.header}>
    <div style={styles.link}>BORN TO CODE</div>
  </header>
</div>
```

更改为：

```
  <div>
    <header style={styles.header}>
      <Link to='/' style={styles.link}>BORN TO CODE</Link>
    </header>
    { this.props.children }
  </div>
```

### 渲染路由组件

打开 `src/index.js` 文件，删除代码：

```
import App from './ui/App';

render(<App />, document.getElementById('root'));
```

添加新代码：

```
import { renderRoutes } from './routes';

render(renderRoutes(), document.getElementById('root'));
```

这时访问项目首页，看不出任何变化，不过蓝底白字的条幅已经变身成导航栏了，点击 `BORN TO CODE` 字样可以链接到首页

### 添加文章详情页面路由

打开文件 `src/routes.js`，导入 ShowPost 组件（尚未编写）

```
import ShowPost from './ui/posts/ShowPost';
```

然后在添加 ShowPost 组件对应的路由

```
<Route path='/posts/:post_id' component={ShowPost} />
```

其中参数 `post_id` 用来指代每篇文章在 MongoDB 数据库中存储的 `_id` 号，作为每篇文章的标识符

### 添加文章详情页面入口

打开 `ui/posts/PostList.js` 文件，首先导入 `Link` 组件：

```
import {Link} from 'react-router'
```

然后给首页文章列表中的每篇文章添加一个`查看`链接，

```
const postList = map((post) => {
  return (
    <div style={styles.content} key={post._id}>
      ...
      // new code
      <div style={styles.actions}>
        <Link to={`/posts/${post._id}`} style={styles.link}>查看</Link>
      </div>
      // end
    </div>
  )
}, this.state.posts);
```

### 创建 ShowPost 组件

新建文件 `src/ui/posts/ShowPost.js`，添加代码：

```
import React, { Component } from 'react';
import axios from 'axios';
import Settings from '../../settings';

class ShowPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    }
  }

  componentWillMount() {
    axios.get(`${Settings.host}/posts/${this.props.params.post_id}`).then(res => {
      this.setState({
        post: res.data.post
      })
    })
    .catch(res => {
      if (error.response) {
        console.log(error.response.data.error);
      } else {
        console.log(error.message);
      }
    });
  }

  getStyles() {
    return {
      content: {
        position: 'relative',
        width: '100%',
        minHeight: '200px',
        maxWidth: '600px',
        margin: '30px auto',
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '16px',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
      },
      category: {
        position: 'absolute',
        top: '0',
        right: '0',
        padding: '4px 6px',
        color: '#fff',
        fontSize: '.8em',
        backgroundColor: '#ed5a5a'
      },
      title: {
        fontSize: '1.3em',
        paddingTop: '10px',
        paddingBottom: '20px',
        textAlign: 'center'
      },
      text: {
        fontSize: '1em',
        color: 'rgba(0,0,0,.8)'
      }
    }
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.content}>
        <div style={styles.category}>{this.state.post.category}</div>
        <div style={styles.title}>{this.state.post.title}</div>
        <div style={styles.text}>{this.state.post.content}</div>
      </div>
    );
  }
}

export default ShowPost;
```

