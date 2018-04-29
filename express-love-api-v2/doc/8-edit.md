# 编辑文章

添加编辑文章的功能。

### 添加编辑链接

src/components/Home.js

```js
<Link className="link" to={`/post/${post._id}/edit`}>
  编辑
</Link>
```

跟查看链接并列，添加编辑链接。

src/components/Main.js

```js
import EditPost from './EditPost'

    <Route path="/post/:id/edit" component={EditPost} />
```

添加指向编辑文章页面的路由，由于路由形式跟文章详情路由类似，所以要放到文章详情路由之前。

src/components/EditPost.js

```js
import React, { Component } from 'react'

class EditPost extends Component {
  render() {
    return <div>EditPost</div>
  }
}

export default EditPost
```

文章编辑页面暂时不写内容。

浏览器中，看到编辑文章的链接生效了。

### 表单初始值

src/components/EditPost.js

```js
import React, { Component } from 'react'
import axios from 'axios'
import Form from './Form'
import { API_SERVER } from '../constants/ApiConstants'

class EditPost extends Component {
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
    const { post } = this.state
    return <div>{Object.keys(post).length !== 0 && <Form post={post} />}</div>
  }
}

export default EditPost
```

编辑文章页面和新建文章页面可以复用同一个 Form 组件，最大的区别就是编辑文章的时候，Form 要显示当前文章数据，所以把文章数据请求到，然后传递给 `Form` 。

src/components/Form.js

```js
state = this.props.post || {
  category: '',
  title: '',
  body: ''
}
```

到 Form 组件内，如果传入的 `post` 属性不为空，就用它赋值给状态值。

浏览器中，点编辑按钮，可以看到表单中显示了文章内容。

### 提交修改后的内容

src/components/EditPost.js

```js
updatePost = async data => {
  const { id } = this.props.match.params
  await axios.put(`${API_SERVER}/post/${id}`, data)
  this.props.history.push('/')
}

          <Form submit={this.updatePost} post={post} />
```

定义 `updatePost` 函数，把新数据提交到服务器。

浏览器中，编辑后内容，可以成功提交了。
