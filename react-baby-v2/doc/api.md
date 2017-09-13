### 什么是 API ？

一个程序开发出来之后，有正常的额 UI （用户界面）。同时，还可能会有 API （编程界面）。UI 是给普通用户用的，API 是给开发者用的。

### API 的例子

以 Github ，如果打开 github.com 就可以看到 UI ，UI 里面我们可以读数据或者写数据，API 也可以完成读写任务。

例如，到 https://github.com/happypeter ，可以看到 happypeter 这个人的，个人信息。那么这些信息，我们用 API 也可以拿到。

命令行中输入

```
curl  https://api.github.com/users/happypeter
```

就可以读取到 happypeter 这个用户的 Github 信息了。

返回信息的格式为 JSON ：

```json
{
  "login": "happypeter",
  "id": 72467,
  "avatar_url": "https://avatars0.githubusercontent.com/u/72467?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/happypeter",
  "html_url": "https://github.com/happypeter"
}
```

注意：上面的 curl 是一个命令行工具，可以用来进行 API 的调试。但是在 js 代码中，我们通过 axios 这个 npm 包，来做 http 请求。


### 打怪

我们自己写一个网页，上面显示我们的 github 头像，还有用户名。

```js
import React, { Component } from 'react'
import './app.css'
import axios from 'axios'

class App extends Component {

  state = {
    username: '',
    avatar: ''
  }

  componentDidMount = () => {
    axios.get('https://api.github.com/users/happypeter').then(res => {
      console.log(res.data)
      this.setState({
        username: res.data.login,
        avatar: res.data.avatar_url
      })
    })
  }
  render () {
    return (
      <div className='app'>
        <img src={this.state.avatar} alt='avatar'/>
        <h1>
          {this.state.username}
        </h1>
      </div>
    )
  }
}

export default App
```
