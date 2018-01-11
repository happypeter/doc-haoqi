# 通过内部 State 实现评论功能

这一集不涉及 Redux ，使用组件自己的 State 来达成评论效果。

### 用受控组件思路添加一个表单

CommentBox.js 中

```js
class CommentBox extends Component {

  state = {
    text: ''
  }

  submitCmt = e => {
    e.preventDefault()
    console.log(this.state.text)
    this.setState({
      text: ''
    })
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({
      text: e.target.value
    })
  }
  
  render () {
    const cmtForm = (
      <div>
        <input 
          value={this.state.text} 
          onChange={this.handleChange}
        />
        <button onClick={this.submitCmt}>提交</button>
      </div>
    )
    
    return (
      <Wrap>
        {cmtForm}
      </Wrap>
    )
  }
}
```

先来定义一个 state 值 text ，来存放用户输入的内容，初始值设置为空字符串。

常量 cmtForm 来存放 input 相关的 jsx 。多行内容需要用小括号括起来，所有内容都要包裹在一个节点内。使用受控组件的思路，其实 form 标签就可以不写了。直接写 input 标签，里面把 value 设置为 this.state.text ，这样 input 就被控制起来了，也就是用户再输入内容，input 中就不会有显示了。所以需要添加 onChange 事件的响应函数 handleChange 。

定义 handleChange 函数，拿到事件对象 e ，e.preventDefault 阻止默认行为，然后把 text 这个 state 值更新为用户当前输入的内容，也就是 e.target.value 的值。

用户输入完毕后，就会点提交按钮，而此时此刻状态值 text 中保存的内容，也正好就是用户想要提交的评论文字了。到处理函数 submitCmt 中，打印这个值，并且把输入框中的内容清空。

把 cmtForm 添加到 jsx 中显示出来。

浏览器中，点提交按钮，终端中可以打印出用户提交的字符串，同时输入框会被清空。

### 显示评论列表

CommentBox.js 中

```js
class CommentBox extends Component {

  state = {
    text: '',
    comments: [
      {
        id: 'wewe2122',
        text: 'hello'
      },
      {
        id: 'wqewqeq23',
        text: 'hi'
      }
    ]
  }

    ...

    const { comments } = this.state
    const reversedComments = [...comments].reverse()
    const cmtList = reversedComments.map(
      t => <div key={t.id}>{t.text}</div>
    )
    
    return (
      <Wrap>
        {cmtForm}
        {cmtList}
      </Wrap>
    )
  }
  ```

评论数据暂时先添加到组件 state 中，comments 是一个对象数组，每个对象有 id 和 text 两项内容。

因为咱们想要逆序显示，所以需要先解构赋值拿到 comments 状态值，然后定义常量 reversedComments 来存放逆序的评论，调用 reverse() 也就是逆序接口的时候要注意，这个接口是会修改 comments 自身的，但是如果 comments 数据本身被来回逆序，肯定会造成程序运行混乱，所以要先拷贝 comments 数据，然后对拷贝执行 reverse 操作，拷贝一个数组传统上就是用 slice 接口，但是更潮的一种方式是使用 es6 的展开运算符。

下面，把 map 出来的 jsx 赋值到 cmtList 常量。

然后显示到 cmtForm 之下即可。

浏览器中，可以看到显示出了逆序的评论列表。

### 提交评论

需要安装 shortid 来生成评论的 id 。

```
npm i shortid
```

可以用来生成一个很简短的 id 。

```js
import shortid from 'shortid'

class CommentBox extends Component {
  submitCmt = e => {
    e.preventDefault()
    const { text } = this.state
    const id = shortid()
    const comments = [
      ...this.state.comments,
      { id, text }
    ]
    this.setState({
      text: '',
      comments
    }
```

导入 shortid 。

submitCmt 中，解构赋值拿到用户输入的内容 text 。使用 shortid 来生成一个简单的 id 。新的 comments 数据存放到 comments 常量中，它应该是状态值中本来就有的 comments 加上用户这次提交的评论。注意这里要使用 es6 展开运算符的形式来修改 comments ，千万不能使用 push ，因为 push 会导致 this.state.comments 被改变，违背了 immutability 也就是“不变性”原则。最后，在 setState 接口中，用 es6 的简写形式，这样 comments 状态值就被正确的更新了。

浏览器中，可以看到提交评论成功了。

### 添加样式

通过 styled-components 的形式，添加一些样式进来。

```js
  
  render () {
      <FormWrap>
        <Input 
          value={this.state.text} 
          onChange={this.handleChange}
        />
        <Button onClick={this.submitCmt}>提交</Button>
      </FormWrap>
    )

    return (
      <Wrap>
        {cmtForm}
        <CmtList>
          {cmtList}
        </CmtList>
      </Wrap>
    )
  }
const Wrap = styled.div`
  width: 400px;
  margin: 30px auto;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .5);
  height: 300px;
  min-height: 300px;
`
const FormWrap = styled.div`
  display: flex;
  padding: 10px;
`
const Input = styled.input`
  flex-grow: 1;
  height: 30px;
  line-height: 30px;
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  :focus {
    outline: none;
    border-bottom: 1px solid deeppink;
  }
`

const Button = styled.div`
  background-color: deeppink;
  margin-left: 10px;
  padding: 0 10px;
  border: none;
  line-height: 30px;
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
  color: white;
`

const CmtList = styled.div`
  padding: 10px;
  div {
    line-height: 30px;
  }
`
```

把需要加样式的 html 标签，都改成 styled-components 的样式组件。

FromWrap 中 display flexbox ，目的是让 Input 通过 flex-grow: 1 来占满按钮之外的所有水平空间。用户选中状态，Input 的底部边框是深粉色，其他时候都是灰色。

Button 按钮就用深粉色。

评论列表中让每个评论隔开一段距离，显示会清爽一些。

浏览器中，看到好看了不少。
