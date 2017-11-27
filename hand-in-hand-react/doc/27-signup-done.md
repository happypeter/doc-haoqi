# 前端请求后端 API 完成注册

### 获取注册表单中的数据

修改 `ui/auth/SignUp.js` 文件，给注册表单的各个输入框 TextField 组件添加一个 [ref]() 属性，从而获取输入框中的数据：

```
<TextField ... floatingLabelText="用户名" ref='username' />
<TextField ... type="password" ref='password' />
<TextField ... floatingLabelText="确认密码" type="password" ref='confirmPassword' />
```

然后，给注册表单添加一个 `onSubmit` 事件，其对应的事件处理函数为 `handleSubmit`：

```
<form onSubmit={this.handleSubmit.bind(this)}>
```

接下来，定义 `handleSubmit` 方法：

```
handleSubmit(event) {
  event.preventDefault();
  let username = this.refs.username.getValue();
  let password = this.refs.password.getValue();
  let confirmPassword = this.refs.confirmPassword.getValue();
  if(password !== confirmPassword) {
    console.log('密码不匹配');
    return;
  }
  console.log(username, password, confirmPassword)
}
```

### 编写 Action 创建函数 signup

打开 `redux/actions/authActions.js` 文件，定义 `signup` 函数：

```
export function signup(data) {
  return dispatch => {
    axios.post(`${Settings.host}/auth/signup`, data).then(response => {
      const token = response.data.token;
      const user = response.data.user;
      sessionStorage.setItem('jwtToken', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      dispatch(setCurrentUser(user));
      browserHistory.push(`/`);
      console.log('注册成功了！')
    }).catch(error => {
      handleError(error);
    });
  }
}
```

### 组件中调用 Action 创建函数 signup

打开 `ui/auth/SignUp.js` 文件，先导入 `connect` 方法：

```
import { connect } from 'react-redux';
```

再导入刚入定义的 Action 创建函数 `signup`：

```
import { signup } from '../../redux/actions/authActions';
```

接下来，检验一下传入到组件中的 `signup` 属性的类型：

```
SignUp.propTypes = {
  signup: React.PropTypes.func.isRequired
}
```

最后，通过 `connect` 方法把 Action 创建函数 `signup` 注入到 `SignUp` 组件中：

```
export default connect(null, { signup })(Radium(SignUp));
```

提交表单的时候，执行传入到组件中的 `signup` 函数，向服务器端发送请求：

```
this.props.signup({username, password});
```
