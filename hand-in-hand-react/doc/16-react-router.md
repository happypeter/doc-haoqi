# 添加前端路由模块

通过 [react-router](https://github.com/ReactTraining/react-router) 添加前端路由让单页面看起来有 “多个页面” 的效果，新建文件 `src/routes.js`，添加代码：

```
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './ui/App';
import LogIn from './ui/auth/LogIn';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/login' component={LogIn} />
    </Route>
  </Router>
);
```

注意：包裹 `Router` 组件的圆括号不能用花括号取代，若用花括号的话，应该添加 `return` 关键字，如下：

```
export const renderRoutes = () => {
  return (
    <Router history={browserHistory}>
      ...
    </Router>
  );
}
```

这里的 `renderRoutes` 变量是一个函数类型，用到了 ES6 [箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 的基本用法：

```
(param1, param2, …, paramN) => expression
         // 等价于：  => { return expression; }
```

然后，修改 `src/ui/App.js` 文件， 添加 `{ this.props.children }` 一行代码：

```
  <div style={styles.root}>
    ...
    { this.props.children }
  </div>
);
```

最后，修改 `src/index.js` 文件，导入 `renderRoutes` 路由模块并挂载到页面中：

```
import { renderRoutes } from './routes';

render(renderRoutes(), document.getElementById('root'));
```

因为 `LogIn` 组件还没有编写，这时浏览器中会报告错误。

### 编写 LogIn 组件

新建文件 `src/ui/auth/LogIn.js`，添加 `LogIn` 组件代码：

```
import React, { Component } from 'react';

class LogIn extends Component {
  render() {
    return (
      <div>登录页面</div>
    );
  }
}

export default LogIn;
```

目前 `LogIn` 组件只是显示 `登录页面` 字样，还没有实际的功能，下节课程将添加登录表单。

### 更改导航栏

上节视频中，导航栏中的每个 `<a>` 链接有一个 `to` 属性，其实是不对的，应该改为 `href` 属性：

```
<div>
  <a href='/' style={styles.nav} key='1'><ActionHome color='#fff' /></a>
</div>
<div>
  <a href='/login' style={styles.nav} key='2'>登录</a>
</div>
```

这时到浏览器中点击导航栏中的每个链接，链接都生效了，不过会导致页面整页刷新。因为我们开发的是单页面应用，使用起来就如本地应用一样，没有整页刷新，所以用 `react-router` 提供的 `Link`组件代替 HTML 的 `<a>` 链接，避免整页刷新的问题。首先导入 `Link` 组件：

```
import { Link } from 'react-router';
```

然后用 `Link` 组件替换 `<a>` 元素：

```
<div>
  <Link to='/' style={styles.nav} key='1'><ActionHome color='#fff' /></Link>
</div>
<div>
  <Link to='/login' style={styles.nav} key='2'>登录</Link>
</div>
```

保存文件之后，再到浏览器中测试一下导航栏上的链接，不会出现整页刷新的情况了。
