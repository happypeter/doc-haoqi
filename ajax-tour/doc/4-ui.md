# 客户端 UI

开始写客户端项目了，这集先把界面做出来。

### 创建项目

```
create-react-app client
```

跟 api 文件夹平级，创建 client 项目，来写 react 客户端代码。

```
rm -rf src
npm i styled-components
```

删除 src 文件夹。安装 styled-components 用来做样式。

client/src/index.js

```js
import React from 'react'
import { render } from 'react-dom'
import App from './App'

const node = document.getElementById('root')
render(<App />, node)
```

一个最基本的 index.js ，把 App 渲染到页面上。

client/src/App.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'

class App extends Component {
  render() {
    return <Wrap>App</Wrap>
  }
}

export default App

const Wrap = styled.div``
```

App 里面使用了 Styled-components 。

进入 `client` 项目中，运行 `npm start` 。

浏览器中，看到 App 组件显示出来了。

### 添加组件

client/src/App.js

```js
import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import poster from './poster.jpg'

injectGlobal`
  * {
    box-sizing: border-box;
  }
`

class App extends Component {
  render() {
    const comments = [
      {
        _id: '1',
        text: 'hello 1'
      },
      {
        _id: '2',
        text: 'hello 2'
      }
    ]

    const cmtList = comments.map(t => <Comment key={t._id}>{t.text}</Comment>)
    return (
      <Wrap>
        <Img src={poster} />
        <CommentList>{cmtList}</CommentList>
        <Input />
        <ErrMsg>提交错误</ErrMsg>
        <Button>提交</Button>
      </Wrap>
    )
  }
}

export default App

const Wrap = styled.div`
  width: 400px;
  margin: 30px auto;
`

const Img = styled.img`
  display: block;
  padding: 20px;
  width: 100%;
  border: 2px solid #00bcd4;
`

const CommentList = styled.div`
  margin: 20px auto;
`

const Comment = styled.div`
  margin: 10px 0;
  line-height: 1.9;
`

const Input = styled.textarea`
  outline: 0;
  border: 2px solid lavender;
  width: 100%;
  padding: 10px 5px;
  &:focus {
    outline: 0;
    border: 2px solid #00bcd4;
  }
`

const Button = styled.button`
  border: 2px solid #00bcd4;
  border-radius: 0;
  width: 30%;
  float: right;
  margin: 9px 0;
  padding: 8px;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
`

const ErrMsg = styled.div`
  width: 40%;
  color: palevioletred;
  margin-top: 9px;
  float: left;
`
```

使用 styled-components 做一下样式，没有实现具体的功能，所以就不去细讲了，需要拷贝一张图片 poster.jpg 到 src 文件夹下。代码在文字稿中。

浏览器中，看到一个提交评论的页面有了。
