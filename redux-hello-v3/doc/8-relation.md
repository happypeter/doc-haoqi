# 文章显示各自评论

评论要知道自己属于哪一篇文章，看看如何来实现两类数据之间的关联。

### 显示当前文章评论

reducers/comments.js

```js
const initialState = [
  {
    id: 'wewe2122',
    text: 'hello',
    post: '1'
  },
  {
    id: 'wqewqeq23',
    text: 'hi',
    post: '2'
  }
]
```

最关键的一步是数据自己要知道自己的从属关系，所以给每一个评论对象添加一个新属性 post ，保存自己所在的文章的 id 。

Post.js

```js
  <Bottom>
    <CommentBox postId={id} comments={comments} />
  </Bottom>
```

Post 组件中把文章 id 传递给 CommentBox 。

CommentBox.js

```js
 const reversedComments = [...comments].reverse()
    const { comments, postId } = this.props
    const currentComments = comments.filter(
      t => t.post === postId
    )
    // FIXME：重构到 selecters 函数中比较好
    const reversedComments = [...currentComments].reverse()
```

CommentBox 中拿到 postId ，定义 currentComments 保存当前这篇文章的评论，对所有评论进行 filter 操作，找到 post 属性等于当前文章 id 的。下面在进行逆序操作的时候，也使用当前文章评论。

浏览器中，打开不同的文章，可以显示各自的评论了。

### 发评论

评论数据现在多了 post 属性，那么在提交评论的时候自然也少不了这一项。

CommentBox 

```js
 submitCmt = e => {
    const comment = {
      id,
      text,
      post: this.props.postId
    }
```

CommentBox 中在提交评论的时候，除了 id 和 text ，再把 post 一项加上。

浏览器中，可以看到每条评论现在都可以发到自己的文章上了。

### 修改评论数显示

PostBody 中的评论数也需要改一下。

Post.js

```js
    const { comments, match, posts } = this.props
    const { id } = match.params
    const currentComments = comments.filter(
      t => t.post === id
    )
    return (
      <Wrap>
        <Upper>
          <PostBody id={id} posts={posts} comments={currentComments} />
        </Upper>
        <Bottom>
          <CommentBox comments={currentComments} />
        </Bottom>
```

既然 PostBody 和 CommentBox 都需要筛选后的 currentComments 数据，那就把这部分逻辑从 CommentBox 里面提升到 Post 组件中，然后把 currentComments 分别传递到 PostBody 和 CommentBox 即可。

这样 PostBody 中代码不用动，CommentBox 也把代码还原到最初状态。

浏览器中，看到评论数显示正常了。
