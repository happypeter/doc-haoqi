# react-router 路由控制

添加 react-router 进项目，因为我们的示例只有一个页面，所以这部分意义不大。

### 安装 react-router

执行命令

```
npm i --save react-router
```

### 添加代码

创建 imports/routes.jsx 文件，添加

```
import React from 'react';
import {Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './App.jsx';
import Post from './Post.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Post} />
    </Route>
  </Router>
)
```

上面这些都是 react-router 使用的最基本的代码了，不介绍了。

需要添加一个部件文件 App.jsx ，如下

```
import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
```

另外一个就是我们的主要组件了 Post.jsx ，但是暂时我们先放一些最基本的内容进来

```
import React, { Component } from 'react';

export default class Post extends Component {
  render() {
    return (
      <div>
        Post.jsx
      </div>
    );
  }
}
```

### 其他修改

删除 imports/ui 这个文件夹，然后修改 main.jsx 中的内容，改成下面这样

```
...
import { renderRoutes } from '../imports/routes.jsx';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app-container'));
});
```

这样，启动 meteor 就可以看到显示的效果了。