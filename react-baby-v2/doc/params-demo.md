来做一个稍微完整些的博客案例，作为传参技巧的演练。

### 实现首页上的文章列表

```js
import React, { Component } from 'react'
import './app.css'
import {
  BrowserRouter as Router,
  Route,
  Link
 } from 'react-router-dom'


class App extends Component {

  state = {
    posts: [
      {
        id: '134',
        title: 'Git 使用技巧',
        content: 'main content'
      },
      {
        id: '256',
        title: '命令使用技巧',
        content: 'main content'
      },
      {
        id: '545',
        title: 'Github 基础',
        content: 'main content'
      }
    ]
  }

  render () {

    const postList = this.state.posts.map((t, i) => (
      <li key={i}>
        <Link to={`/post/${t.id}`}>
          {t.title}
        </Link>
      </li>
    ))
    return (
      <Router>
        <div>
          <ul>
            {postList}
          </ul>
        </div>
      </Router>
    )
  }
}

export default App
```

### 显示文章详情

Post.js 中


```js
import React, { Component } from 'react'

class Post extends Component {

  state = {
    posts: [
      {
        id: '134',
        title: 'Git 使用技巧',
        content: 'main content'
      },
      {
        id: '256',
        title: '命令使用技巧',
        content: 'main content'
      },
      {
        id: '545',
        title: 'Github 基础',
        content: 'main content'
      }
    ]
  }


  render () {
    const { id } = this.props.match.params
    const { posts } = this.state
    const post = posts.find(t => t.id === id)
    return (
      <div className='Post'>
        <h1>
          {post.title}
        </h1>
        <p>
          {post.content}
        </p>
      </div>
    )
  }
}

export default Post
```
