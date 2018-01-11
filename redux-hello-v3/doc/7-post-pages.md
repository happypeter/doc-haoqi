# 添加首页博客目录

来添加首页上的文章目录，会用到 react-router 的动态参数。

### 添加目录

HomeContainer.js

```js
import Home from '../components/Home'
import { connect } from 'react-redux'

const HomeContainer = props => <Home {...props} />

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(HomeContainer)
```

先来到 HomeContainer 中，把数据从 store 中读出来。导入 connect ，实现 mapStateToProps 拿到 posts 数据。最后把 mapStateToProps 传递给 connect 。

Home.js

```js
import { Link } from 'react-router-dom'

class Home extends Component {
  render () {
    const { posts } = this.props
    const postList = posts.map(
      post => (
        <Link key={post.id} to={`/post/${post.id}`}>
          {post.title}
        </Link>
      )
    )
    return (
      <div>
        {postList}
      </div>
    )
```

展示组件中，导入 Link ，拿到容器组件传递过来的 posts 数据。map 一下，Link 指向对应 id 的文章页面。Link 显示文本是文章标题。最后把 postList 显示出来。

浏览器中，可以看到显示出了两个链接。

### 文章页显示自己的 Title

目前两个链接指向的页面，显示内容一样。现在来让不同文章页面上显示自己的标题。

Main.js

```js
<Route path='/post/:id' component={PostContainer} />
```

给文章页对应的路由添加动态参数 id 。具体的值可以在 React-router 的 match 对象中拿到，PostContainer 作为路由对应的组件，里面天然的就可以拿到 this.props.match 。同时，PostContainer 又会自动把自己的所有属性都传递给展示组件。所以 Post.js 中也可以拿到 match 对象。进而通过 match.params.id 拿到文章 id 。

但是要显示文章标题，只有 id 是不够的，还需要文章数据。

PostContainer.js

```js
const mapStateToProps = state =>({
  comments: state.comments,
  posts: state.posts
})
```

容器组件中，mapStateToProps 把 posts 数据也拿到。

Post.js

```js
    const { comments, match, posts } = this.props
    const { id } = match.params
    return (
      <Wrap>
        <Upper>
          <PostBody id={id} posts={posts} comments={comments} />
        </Upper>
```

展示组件中，拿到 match 和 posts ，从 match 中拿到 id ，然后把 id 和 posts 都传递给 PostBody 。

PostBody.js 

```js
  render () {
    const { comments, id, posts } = this.props
    const post = posts.find(
      t => t.id === id
    )
    return (
      <Wrap>
        <Title>
          {post.title}
        </Title>
```

PostBody 中，有了文章 id 和所有文章数据 posts ，可以很容易通过 find 接口拿到当前文章数据 post ，并且把 post.title 显示在下面。

到浏览器中，打开首页上每一个链接，文章页面上可以显示出自己的文章标题了。

### 美化样式

添加一些 css 进来，要强调一下的就是 styled.div 这个点后面跟的是 html 原生的标签，但是对于像 Link 这样的第三方的标签，就要用 styled 括号了。

浏览器中，看到页面中样式果然好看了。
