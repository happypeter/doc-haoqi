# 客户端发起 ajax

来实现各项具体功能。

### 发起请求

```
cd client/
npm i axios
```

发 HTTP 请求，就用 axios 。因为 react 条件下，所有的请求都是 ajax 请求，所以 ajax 这个词大家都很少提了，就是叫 HTTP 请求。

client/src/App.js

```js
import axios from 'axios'

class App extends Component {
  state = {
    comments: []
  }

  componentDidMount = async () => {
    const {
      data: { comments }
    } = await axios.get('http://localhost:3000/comments')
    this.setState({ comments })
  }

  render() {
    const { comments } = this.state
```

App 组件中，导入 axios ，设置一个状态值 comments ，用来存放所有评论。在组件挂载结束后发起 axios 请求，拿到所有评论，更新状态值。

render 函数中，删除临时数据。从状态值中取所有评论。

浏览器中运行一下。看到终端中有报错了。

```
xhr.js:178 Failed to load localhost:3000/comments: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
```

这个是跨域问题。

### 解决跨域请求

```
npm i cors
```

到 api 项目中，安装跨域资源共享这个包。

api/index.js

```js
/*** cors START***/
const cors = require('cors')

app.use(cors())
/*** cors END ***/
```

API 文件中，导入这个包，并用中间件的方式加载。

浏览器中，再次刷新，看到评论加载了。

### 提交数据

client/src/App.js

```js
 state = {
    comments: [],
    text: ''
  }

handleClick = () => {
  const { text } = this.state
  console.log(text)
  this.setState({
    text: ''
  })
}

handleChange = e => {
  this.setState({
    text: e.target.value
  })
}
render() {
    <Input value={this.state.text} onChange={this.handleChange} />
    <Button onClick={this.handleClick}>提交</Button>
}
```

再来看如何提交评论。添加一个新状态值 `text` 来存放用户填写的文字。`handleClick` 函数会在用户点提交按钮的时候执行。里面暂时打印一下用户提交的内容，然后清空输入框。

`handleChange` 会在输入框内容有修改的时候被执行，它的作用就是更新输入框中的显示内容。

接下来把输入框变成一个受控组件，传入 `value` 和 `onChange` 属性即可。然后给 `Button` 传递 `onClick` 属性。

浏览器中，可以看到用户提交的内容会被在终端中打印出来。

下一步就是来发 http 请求了。

client/src/App.js

```js
handleClick = async () => {
  const { text } = this.state
  const res = await axios.post('http://localhost:3000/comment', { text })
  const { comment } = res.data
  this.setState({
    text: '',
    comments: [...this.state.comments, comment]
  })
}
```

把 handleClick 添加上 `async` 。发出 axios 请求，按照 API 需要的格式，发送评论数据。返回信息保存到 `res` 中，其中可以解构赋值拿到 `comment` 数据。下面更新 `comments` 状态值，把新评论，添加到 comments 之中。

浏览器中，提交新评论成功。

### 处理加载中状态

api/index.js

```js
app.post('/comment', async (req, res) => {
  try {
    const comment = new Comment(req.body)
    const cmt = await comment.save()
    setTimeout(() => {
      res.json({
        comment: cmt
      })
    }, 2000)
  } catch (err) {
    setTimeout(() => {
      res.status(406).json({ msg: '提交失败' })
    }, 2000)
  }
})
```

API 中，不管提交成功还是失败，都添加两秒钟延迟。

client/src/App.js

```js
  state = {
    comments: [],
    text: '',
    isFetching: false
  }

  handleClick = async () => {
    ...
    this.setState({
      isFetching: true
    })
    const res = await axios.post('http://localhost:3000/comment', { text })
    this.setState({
      isFetching: false
    })
    ...
  }

  render() {
    const { comments, isFetching } = this.state

    const btnText = isFetching ? '提交中...' : '提交'

    <Button disabled={isFetching} onClick={this.handleClick}>
      {btnText}
    </Button>
  }

  &:disabled {
    border: 2px solid lavender;
    cursor: text;
  }
```

添加新状态 `isFetching` 体现数据加载中状态。

`handleClick` 函数中，发起请求前，把 `isFetching` 设置为 true ，请求结束后，设置为 false .

`render` 中，拿到 `isFetching` 。用它来决定按钮是否处于 `disabled` 状态，以及显示什么文字内容。

再添加一下按钮禁用状态的 css 。

浏览器中，提交评论，可以看到按钮会处于禁用状态，两秒钟后评论提交成功。

### 处理错误状态

```js
state = {
  ...
  error: ''
}

handleClick = async () => {
  const { text } = this.state
  this.setState({
    isFetching: true
  })
  try {
    const res = await axios.post('http://localhost:3000/comment', { text })
    const { comment } = res.data
    this.setState({
      comments: [...this.state.comments, comment],
      error: ''
    })
  } catch (err) {
    this.setState({
      error: '提交失败'
    })
  }
  this.setState({
    isFetching: false,
    text: ''
  })
}

render () {
  const { comments, isFetching, error } = this.state
  <ErrMsg>{error}</ErrMsg>
}
```

添加一个新 state `error` 来保存报错信息。

然后到 `handleClick` 函数中，用 `try` 语句来处理服务器返回错误的情况。如果提交成功，就更新所有评论，并清空 `error` 。如果服务器返回错误信息，那么这里的 `catch` 语句就会被触发。这里面设置报错信息。

最后，不管成功还是失败，都要把 `isFetching` 设置为 false ，表示数据加载完毕。

`render` 函数中，拿到 state 中保存的 `error` 显示出来。

浏览器中，如果不填写评论直接提交，会看到报错信息。当然，对提交内容的非空校验也可以在客户端来完成。如果填写内容再提交，就会提交成功。

到这里，我们的案例就做完了。
