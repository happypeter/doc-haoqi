# 前端编写用户注册表单

编写 SignUp 组件，新建文件 `src/auth/SignUp.js`，添加代码：

```
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Radium from 'radium';

class SignUp extends Component {
  getStyles() {
    return {
      root: {
        backgroundColor: '#fff',
        boxShadow: '0 0 0 1px rgba(200, 215, 225, 0.5), 0 1px 2px #e9eff3',
        textAlign: 'center',
        padding: '0 1em 1em',
        margin: '30px 16px',
        '@media (min-width: 400px)': {
          width: '400px',
          margin: '30px auto'
        }
      },
      textField: {
        display: 'block',
        width: '100%',
        fontSize: '.9em'
      },
      label: {
        fontWeight: '600',
        fontSize: '1em',
        lineHeight: '40px'
      },
      button: {
        width: '130px',
        height: '40px',
        marginTop: '30px',
        marginBottom: '15px'
      },
      a: {
        fontSize: '.8em',
        textDecoration: 'none',
        color: 'gray',
        ':hover': {color: '#00bcd4'}
      }
    };
  }

  render() {
    let styles = this.getStyles();
    return (
      <div style={styles.root}>
        <form>
        <TextField
          style={styles.textField}
          floatingLabelText="用户名" />
        <TextField
          style={styles.textField}
          floatingLabelText="密码"
          type="password" />
        <TextField
          style={styles.textField}
          floatingLabelText="确认密码"
          type="password" />
          <RaisedButton
            primary={true}
            style={styles.button}
            labelStyle={styles.label}
            type="submit"
            label="注册" />
        </form>
      </div>
    );
  }
}

export default Radium(SignUp);
```

### 添加 SignUp 组件对应的路由

修改 `src/routes.js` 文件，首先导入 SignUp 组件：

```
import SignUp from './ui/auth/SignUp';
```

然后，添加 SignUp 组件对应的路由路径 `/signup`：

```
<Route path='/signup' component={SignUp} />
```

打开浏览器，访问地址 `http://localhost:8080/signup` 就能看到注册表单了

### 导航栏中添加用户注册入口

打开 `ui/shared/Header.js` 文件，在导航栏左侧添加一个 `注册` 链接：

```
const LoginLink = (
  <div>
    <Link to='/signup' style={styles.nav}>注册</Link>
    ...
  </div>
);
```

然后，再修改一下 `注册` 和 `登录` 两个链接之间的间距：

```
nav: {
  paddingLeft: '20px',
}
```
