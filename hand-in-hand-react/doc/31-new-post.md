# 前端实现添加新文章组件

### 创建 NewPost 组件

新建文件 `src/ui/posts/NewPost.js`，添加代码：

```
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from './BasicForm';

class NewPost extends Component {
  getStyles() {
    return {
      root: {
        maxWidth: '720px',
        margin: '32px auto 0',
      },
      title: {
        textAlign: 'center',
        color: '#2e4453',
        fontSize: '1.3em'
      },
      submit: {
        textAlign: 'center',
        marginTop: '32px'
      }
    };
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.root}>
        <p style={styles.title}>添加新文章</p>
        <form>
          <BasicForm />
          <div style={styles.submit}>
            <RaisedButton type="submit" label="发布" primary={true} />
          </div>
        </form>
      </div>
    );
  }
}

export default NewPost;
```

更新文章的时候，会用到同样的表单，所以把表单单独抽取为一个 BasicForm 组件

### 编写 BasicForm 组件

新建文件 `ui/posts/BasicForm.js` 文件，添加代码：

```
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class BasicForm extends Component {
  render() {
    let styles = {
      root: {
        padding: '20px',
        marginTop: '32px',
        backgroundColor: '#fff',
        boxShadow: '0 0 0 1px rgba(200, 215, 225, 0.5), 0 1px 2px #e9eff3'
      },
      textField: {
        display: 'block',
        fontSize: '.85em',
        width: '100%'
      }
    }

    return (
      <div style={styles.root}>
        <TextField ref='name' floatingLabelText='标题' style={styles.textField} />
        <div style={{marginTop: '15px', marginBottom: '15px'}}>
          <TextField ref='content' floatingLabelText="内容" multiLine={true} rows={3} style={styles.textField} />
        </div>
      </div>
    );
  }
}

export default BasicForm;
```

### 构建 NewPost 组件的路由

打开文件 `src/routes.js`，导入 NewPost 组件：

```
import NewPost from './ui/posts/NewPost';
```

然后构建 NewPost 组件对应的路由，添加代码

```
<Route path='/posts/new' component={NewPost} onEnter={requireAuth}/>
```

### DashBoard 组件中添加新文章入口

打开 `src/ui/DashBoard.js` 文件，导入两个组件：

```
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
```

然后，添加一个点击进入到写文章页面的按钮：

```
<div style={styles.actions}>
  <Link to='/posts/new'>
    <RaisedButton label='添加新文章' primary={true} />
  </Link>
</div>
```
