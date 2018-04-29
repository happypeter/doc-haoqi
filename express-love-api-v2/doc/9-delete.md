# 删除

添加删除功能。

### 确认对话框

src/components/Home.js

```js
import Dialog from './Dialog'

class Home extends Component {
  state = {
    isDialogShown: false
  }

  openDialog = () => {
    this.setState({
      isDialogShown: true
    })
  }

  closeDialog = () => {
    this.setState({
      isDialogShown: false
    })
  }


   <Link className="link" to="" onClick={this.openDialog}>
      删除
   </Link>

  <Wrap>
    <Dialog isShown={this.state.isDialogShown} close={this.closeDialog} />
  </Wrap>
```

Home 组件中导入删除确认对话框，用状态值 `isDialogShown` 来控制它是否显示。定义 `openDialog` 打开，定义 `closeDialog` 关闭对话框。添加删除链接，用户点的时候，就打开删除对话框。然后把 `isDialogShown` 和 `closeDialog` 都传递到 `Dialog` 组件内去使用。

src/components/Dialog.js

```js
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default ({ isShown, close }) => (
  <Wrap isShown={isShown}>
    <div className="dialog">
      确认删除吗？
      <div className="actions">
        <Link className="action" to="" onClick={close}>
          确定
        </Link>
        <Link className="action" to="" onClick={close}>
          取消
        </Link>
      </div>
    </div>
  </Wrap>
)

const Wrap = styled.div`
  display: ${props => (props.isShown ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 999;

  .dialog {
    width: 300px;
    height: 100px;
    margin: 0 auto;
    padding: 16px;
    background-color: #fff;
    top: 50%;
    margin-top: -50px;
    border: 1px solid #ddd;
    border-radius: 5px;
    position: relative;
    color: #f44336;
  }
  .actions {
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
  .action {
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    color: #00bcd4;
    font-size: 0.9em;
    text-decoration: none;
  }
  .action:hover {
    cursor: pointer;
  }
`
```

添加 Dialog 组件，用 `isShown` 属性决定是否显示，用户点确定或者取消链接的时候，都执行 `close` 函数，隐藏对话框。代码可以参考[本次 commit](https://github.com/haoqicat/express-love-api-v2/commit/c27b44044d5482f342d2fcebc8ecc390c861b962)

浏览器中，果然可以打开和关闭对话框。

### 删除

src/components/Dialog.js

```js
        <Link className="action" to="" onClick={() => close(false)}>
          确定
        </Link>
        <Link className="action" to="" onClick={() => close(true)}>
          取消
        </Link>
```

用户如果点确定，给 `close` 传递 `false` ，点取消传递 `true` 。

src/components/Home.js

```js
state = {
  id: ''
}

openDialog = id => {
  this.setState({
    id,
    isDialogShown: true
  })
}

closeDialog = async cancelled => {
  this.setState({
    isDialogShown: false
  })
  if (cancelled) return

  const { id } = this.state
  await axios.delete(`${API_SERVER}/post/${id}`)
  const posts = this.state.posts.filter(post => post._id !== id)
  this.setState({
    posts
  })
}

  <Link
    className="link"
    to=""
    onClick={() => this.openDialog(post._id)}
  >
    删除
  </Link>
```

`state` 中新添加一项 `id` ，保存要被删除的文章的 id 。打开对话框的时候，设置一下这个 id 。 `closeDialog` 中，判断用户是否点了取消，如果不是，那就发请求删除对应 `id` 的文章，然后，把前端显示的所有文章数组也更新一下。

下面，点删除的时候，把文章 id 传递给 `openDialog` 。

浏览器中，打开删除对话框，确定和取消都工作正常。

至此，本课程中要做的项目就完成了。
