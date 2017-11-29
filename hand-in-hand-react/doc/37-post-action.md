# 文章操作组件

### 显示文章操作组件

打开文件 `src/ui/posts/PostItem.js`，修改代码，读取 store 中存储的 `auth` state，首先导入 `connect` 方法：

```
import { connect } from 'react-redux';
```

然后，导入 PostActionList 组件，稍后编写这个组件：

```
import PostActionList from './PostActionList';
```

接下来，判断用户是否为管理员，若为管理员则渲染 PostActionList 组件：

```
return (
  <div style={styles.root}>
    ...
    { this.props.isAuthenticated && (this.props.user.admin === true) ? <PostActionList post={this.props.post} /> : '' }
  </div>
);
```

检查注入给 PostItem 组件的属性类型：

```
PostItem.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired
}
```

读取 store 中的 `auth` state 的两个属性值，并通过 `connect` 方法注入到 PostItem 组件中：

```
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(Radium(PostItem));
```

### 编写 PostActionList 组件

新建文件 `posts/PostActionList.js` 文件：

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionLaunch from 'material-ui/svg-icons/action/launch';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Radium from 'radium';

export class PostActionList extends Component {
  getStyles() {
    return {
      actions: {
        borderTop: 'solid 1px rgba(200, 215, 225, 0.5)',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '44px',
        display: 'flex',
        flexDirection: 'row',
      },
      action: {
        borderLeft: 'solid 1px rgba(200, 215, 225, 0.5)',
        flexGrow: '1',
        textAlign: 'center',
        lineHeight: '44px'
      },
      a: {
        color: '#668eaa',
        padding: '0.8em 0',
        fontSize: '.8em',
        textDecoration: 'none'
      },
      svg: {
        width: '16px',
        height: '16px',
        marginRight: '6px',
        position: 'relative',
        top: '3px'
      }
    }
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.actions}>
        <div style={[styles.action, {borderLeft: 'none'}]}>
          <Link to='/dashboard' style={styles.a}>
            <EditorModeEdit color='#668eaa' style={styles.svg} />
            <span>编辑</span>
          </Link>
        </div>
        <div style={styles.action}>
          <Link to='/dashboard' style={styles.a}>
            <ActionLaunch color='#668eaa' style={styles.svg} />
            <span>查看</span>
          </Link>
        </div>
        <div style={styles.action}>
          <Link to='/dashboard' style={styles.a}>
            <ActionDelete color='#668eaa' style={styles.svg} />
            <span>删除</span>
          </Link>
        </div>
      </div>
    )
  }
}

export default Radium(PostActionList);
```
