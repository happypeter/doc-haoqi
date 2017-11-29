### 显示文章列表

打开 `src/ui/DashBoard.js` 文件，添加代码：

```
import { connect } from 'react-redux';
import PostItem from './posts/PostItem';
```

### 读取 store 中的 posts

```
DashBoard.propTypes = {
  posts: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, null)(DashBoard);
```

### 渲染文章列表

```
const PostList = this.props.posts.map((post, i) => {
  return <PostItem key={i} post={post} />
});
```

```
<div style={styles.root}>
  <div style={styles.actions}> ... </div>
  { PostList }
</div>
```

### 编写 PostItem 组件

新建文件 `src/ui/posts/PostItem.js` 文件，添加代码

```
import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

class PostItem extends Component {
  getStyles() {
    return {
      root: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fff',
        border: '1px solid rgba(200, 215, 225, 0.5)',
        boxShadow: ' 0 1px 2px #e9eff3',
        marginBottom: '24px',
        position: 'relative'
      },
      content: {
        padding: '16px 24px 12px',
        lineHeight: '1.3em'
      },
      name: {
        color: '#2e4453',
        fontWeight: '600',
        fontSize: '1.2em',
        textDecoration: 'none'
      }
    }
  }

  render() {
    const styles = this.getStyles();
    const { post } = this.props;
    if(post !== undefined){
      return (
        <div style={styles.root}>
          <div style={styles.content}>
            <Link to={`/posts/${post._id}`} style={styles.name}>
              {post.name}
            </Link>
          </div>
        </div>
      );
    }
  }
}
export default Radium(PostItem);
```

