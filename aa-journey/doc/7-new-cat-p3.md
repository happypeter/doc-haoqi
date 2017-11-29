# 前端功能--路由

继续来做前端功能，这集来把路由添加进来。

### 操作步骤

先来装包

```
npm i --save react-router@3.0.2
```

src/router.js

```js
import React from 'react';
import { Router,Route, browserHistory, IndexRoute } from 'react-router';

import App from './App.js'
import Home from './components/Home.js'
import NewCat from './components/NewCat.js'

export default function () {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='/new-cat' component={NewCat} />
      </Route>
    </Router>
  )
}
```


src/components/App.js 内容如下

```js
import React from 'react';
import Header from './Header';


class App extends React.Component {
  render(){
    return(
      <div>
        <Header />
        { this.props.children }
        <h1>Footer</h1>
      </div>
    )
  }
}

export default App;

```

src/components/Home.js


```js
import React from 'react';

class Home extends React.Component {
  constructor() {
    super();
    this.state={

    }
  }
  render(){
    return(
      <div>
         home
      </div>
    )
  }
}

export default Home;
```

为了辅助 react-router 的运行，需要一个 sever.js 文件：

```
var express = require('express');
var app = express();

app.use(express.static('build'));

app.get('*', function(req, res){
  res.sendFile('index.html', {root: 'build'});
});

app.listen(8080, function(err) {
  console.log('Listening at http://localhost:8080');
});
```



src/index.js 内容如下

```js
import App from './components/App';
import React from 'react';
import ReactDom from 'react-dom';
import Routes from './Router';


ReactDom.render(Routes(), document.getElementById('app'));
```

src/components/NewCat.js


```
import React from 'react';

class NewCat extends React.Component {
  constructor() {
    super();
    this.state={

    }
  }
  render(){
    return(
      <div>
        NewCat
      </div>
    )
  }
}

export default NewCat;
```




src/components/Header.js 内容

```js
import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render(){
    return(
      <div>
        <Link to='/'>Home</Link>
        <Link to='/new-cat'>新建分类</Link>
      </div>
    )
  }
}

export default Header;
```


### 代码

[react router](https://github.com/happypeter/aa-journey-demo/commit/191509348ee8802b890eccfed03bdcfa17c4e7f5)
