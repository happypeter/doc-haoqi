# 查看文章

首页显示文章列表，点开列表可以查看详情。

### 首页

src/components/Home.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_SERVER } from '../constants/ApiConstants'

class Home extends Component {
  state = {
    posts: []
  }

  async componentDidMount() {
    const { data: posts } = await axios.get(`${API_SERVER}/posts`)
    this.setState({
      posts
    })
  }

  render() {
    const { posts } = this.state
    const postList = posts.map(post => (
      <Card key={post._id}>
        <div className="title">{post.title}</div>
      </Card>
    ))
    return (
      <Wrap>
        ...
        {postList}
      </Wrap>
    )
  }
}

export default Home

const Card = styled.div`
  position: relative;
  width: 80%;
  height: 60px;
  max-width: 600px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 5px;
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  .title {
    font-size: 1.2em;
  }
`
```

Home 组件中要显示出所有评论的列表。因为要用到 state ，所以组件变成一个类组件。导入做 API 请求的需要的工具，把请求得到的所有评论数组保存到 `posts` 状态值中。然后渲染到页面上。

浏览器中，看到列表出现了。

### 添加查看按钮

src/components/Home.js

```js
render() {
  <Card>
    <div className="actions">
      <Link className="link" to={`/post/${post._id}`}>
        查看
      </Link>
    </div>
  </Card>
}

const Card = styled.div`
  .actions {
    position: absolute;
    bottom: 16px;
    right: 16px;

    .link {
      display: inline-block;
      font-size: 0.9em;
      color: #00bcd4;
      opacity: 0.8;
      text-decoration: none;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`
```

每篇文章标题后面添加一个连接，指向查看文章详情页面。

浏览器中，点查看，可以打开新页面。

### 文章详情

src/components/Main.js

```js
import Post from './Post'

export default () => (
  <Switch>
    <Route path="/post/:id" component={Post} />
  </Switch>
)
```

Main 组件中添加指向文章详情页的路由。

src/components/Post.js

```js
import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { API_SERVER } from '../constants/ApiConstants'

class Post extends Component {
  state = {
    post: {}
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const { data: post } = await axios.get(`${API_SERVER}/post/${id}`)
    this.setState({
      post
    })
  }
  render() {
    const { category, title, body } = this.state.post
    return (
      <Wrap>
        <div className="category">{category}</div>
        <div className="title">{title}</div>
        <div className="body">{body}</div>
      </Wrap>
    )
  }
}

export default Post

const Wrap = styled.div`
  position: relative;
  width: 80%;
  min-height: 200px;
  max-width: 600px;
  margin: 30px auto;
  background-color: #fff;
  border-radius: 5px;
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;

  .category {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 6px;
    color: #fff;
    font-size: 0.8em;
    background-color: #ed5a5a;
  }
  .title {
    font-size: 1.3em;
    padding-top: 10px;
    padding-bottom: 20px;
    text-align: center;
  }
  .content {
    font-size: 1em;
    color: rgba(0, 0, 0, 0.8);
  }
`
```

Post 组件中，请求 API 拿到路由参数中的 id 对应的文章数据，并且显示出来。代码不少，没有新知识，所以可以直接查看 [github 上的本次 commit](https://github.com/haoqicat/express-love-api-v2/commit/e029eb5819f3c10afbecbd3b94a2301dabf09536)

浏览器中，看到文章详情页可以查看了。
