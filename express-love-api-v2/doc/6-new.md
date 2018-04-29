# 新建文章

React 客户端中添加新建文章页面。

### 脚手架

```
create-react-app client
```

跟 api 平级，创建 `client` 项目。

```
rm -rf src
```

删除 src 文件夹

src/index.js

```js
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

render(<App />, document.getElementById('root'))
```

创建自己的 index.js 文件。

```
npm i styled-components
```

安装 styled-components 来写 css 。

src/components/App.js

```js
import React from 'react'
import { injectGlobal } from 'styled-components'
import Header from './Header'
import Main from './Main'

injectGlobal`
  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`

export default () => (
  <div>
    <Header />
    <Main />
  </div>
)
```

App 组件内添加全局样式，并显示 `Header` 和 `Main` 组件。

src/components/Header.js

```js
import React from 'react'
import styled from 'styled-components'

export default () => (
  <Wrap>
    <a to="/">Born To Code</a>
  </Wrap>
)

const Wrap = styled.div`
  background-color: #00bcd4;
  line-height: 64px;
  text-align: center;

  a {
    text-decoration: none;
    color: white;
  }
`
```

Header 组件中只是一个指向首页的链接。

src/components/Main.js

```js
import React from 'react'

export default () => <div>Main</div>
```

Main 组件中暂时不写实际内容。

```
npm start
```

浏览器中，看到 Header 显示出来了。

### Router

```
npm i  react-router-dom
```

安装 react-router 。

src/components/App.js

```js
import { BrowserRouter as Router } from 'react-router-dom'

export default () => (
  <Router>
    <div>
      <Header />
      <Main />
    </div>
  </Router>
)
```

App 组件中用 `Router` 包裹所有组件。

src/components/Main.js

```js
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import NewPost from './NewPost'

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/post/new" component={NewPost} />
  </Switch>
)
```

Main 组件中写路由规则，分别有两个路由指向 Home 和 NewPost 这两个组件。

src/components/Home.js

```js
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default () => (
  <Wrap>
    <Link className="button" to="/post/new">
      写文章
    </Link>
    Home
  </Wrap>
)

const Wrap = styled.div`
  .button {
    display: block;
    margin: 30px auto;
    width: 120px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: #ff4081;
    font-size: 1em;
    color: #fff;
    text-decoration: none;
    border-radius: 20px;
  }
`
```

Home 组件中添加一个写文章按钮。

src/components/NewPost.js

```js
import React from 'react'

export default () => <div>NewPost</div>
```

写文章的组件中暂时不写内容。

浏览器中，点首页写文章按钮，可以进入 NewPost 页面。

### 添加 Form

src/components/NewPost.js

```js
import React from 'react'
import Form from './Form'

export default () => <Form />
```

导入 `Form` 组件并显示。

src/components/Form.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class Form extends Component {
  render() {
    return (
      <Wrap>
        <div>
          <label>分类</label>
          <input />
        </div>
        <div>
          <label>标题</label>
          <input />
        </div>
        <div>
          <label>内容</label>
          <textarea rows="20" />
        </div>
        <div className="actions">
          <button type="submit">提交</button>
          <Link className="link" to="/">
            取消
          </Link>
        </div>
      </Wrap>
    )
  }
}

export default Form

const Wrap = styled.div`
  padding: 20px 40px;

  div {
    margin-bottom: 10px;
  }
  label {
    display: block;
    font-size: 0.9em;
    color: rgba(0, 0, 0, 0.6);
    padding-bottom: 10px;
  }

  textarea,
  input {
    width: 100%;
    height: 48px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    padding: 10px;
    box-sizing: border-box;
  }

  textarea {
    height: 100%;
  }

  textarea:focus,
  input:focus {
    border: 1px solid #00bcd4;
    outline: none;
  }
  .actions {
    text-align: center;
  }
  button {
    width: 120px;
    height: 36px;
    border: none;
    background-color: #ff4081;
    font-size: 1em;
    color: #fff;
    display: inline-block;
    margin: 20px auto 0;
    border-radius: 20px;
  }

  button:hover {
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }

  .link {
    display: inline-block;
    margin-left: 15px;
    font-size: 1em;
    color: #00bcd4;
    opacity: 0.8;
    text-decoration: none;
  }
`
```

添加一个美观的表单进来。[本次 commit](https://github.com/haoqicat/express-love-api-v2/commit/44416bf3b4dfd475187cf041012e0467d40f0375)。

浏览器中，看到效果不错。

### 从 Input 中提交数据

src/components/Form.js

```js
class Form extends Component {
  state = {
    category: '',
    title: '',
    body: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = e => {
    e.preventDefault()
    this.props.submit(this.state)
  }

  render() {
    const { category, title, body } = this.state

    return (
      <Wrap>
        <div>
          <label>分类</label>
          <input
            name="category"
            value={category}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>标题</label>
          <input name="title" value={title} onChange={this.handleChange} />
        </div>
        <div>
          <label>内容</label>
          <textarea
            name="body"
            value={body}
            rows="20"
            onChange={this.handleChange}
          />
        </div>
        <div className="actions">
          <button onClick={this.handleClick}>提交</button>
        </div>
      </Wrap>
    )
  }
}

export default Form
```

Form 变成一个受控组件，分别给两个 `input` 和一个 `textarea` 传递 `value` 和 `onChange` 属性，给提交按钮，添加 `onClick` 属性。数据会被传递给父组件 `NewPost` 去处理。

src/components/NewPost.js

```js
import React, { Component } from 'react'
import Form from './Form'

class NewPost extends Component {
  newPost = data => {
    console.log(data)
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <Form submit={this.newPost} />
      </div>
    )
  }
}

export default NewPost
```

这里因为要在 `newPost` 函数中使用 `this` 所以把组件变成了一个类组件。

浏览器中，用户填写内容，点提交按钮，可以看到页面跳转到首页，并且终端中打印出的用户填写的数据。

### 发送到服务器

```
npm i axios
```

安装 axios ，把数据保存到服务器。

src/components/NewPost.js

```js
import axios from 'axios'

import { API_SERVER } from '../constants/ApiConstants'

newPost = async data => {
  await axios.post(`${API_SERVER}/post`, data)
  this.props.history.push('/')
}
```

NewPost 组件中，通过 axios 发送请求。

src/constants/ApiConstants.js

```js
export const API_SERVER = `http://localhost:3000`
```

添加 API 服务器的链接。

浏览器中，提交新文章。

```
Access-Control-Allow-Origin
```

会看到请求被服务器拒绝了。

### 修改 API

```
cd api/
npm i cors
```

进行 API 项目中，安装 `cors` 这个包。

api/index.js

```js
const cors = require('cors')
app.use(cors())
```

api 文件中加载 cors 取消跨域限制。

浏览器中，再次提交，发现页面跳转到了首页。到 mongo-express 界面中查看，发现果然保存成功了。
