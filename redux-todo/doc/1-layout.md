# 大块布局

先来进行组件拆分，把页面的大块划分出来。

### 下载 react-starter

下载 [v1.2.0 版本的 react-starter 包](https://github.com/happypeter/react-starter/releases)。

```
mv react-starter redux-todo
npm i
npm start
```

重命名为 redux-todo ，装包，然后运行起来。

### 设置 todoBox 样式

Main.js

```js
import TodoContainer from '../containers/TodoContainer'

class Main extends Component {
  render() {
    return (
      <Wrap>
        <TodoBox>
          <TodoContainer />
        </TodoBox>
      </Wrap>
    )
  }

const Wrap = styled.div`
  background-color: #6f9436;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const TodoBox = styled.div`
  background: #fff;
  width: 300px;
  min-height: 170px;
  margin: 0 auto;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`
```

把原来的 PostContainer 出现的地方都改为 TodoContainer 。添加 TodoBox 样式组件。形成一个居中的白色块效果。

TodoContainer.js

```js
import React from 'react'
import Todo from '../components/Todo'
import { connect } from 'react-redux'

const TodoContainer = props => <Todo {...props} />

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(TodoContainer)
```

把原来的 PostsContainer 改名为 TodoContainer 。里面的 Post 组件改名为 Todo 。删除一些暂时用不到的代码。

Todo.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'

class Todo extends Component {
  render() {
    return <Wrap>Todo</Wrap>
  }
}

export default Todo

const Wrap = styled.div``
```

Posts.js 改名为 Todo.js 。暂时只显示占位符 todo 。

浏览器中，看到效果达成了。

### 三个小组件的轮廓

下面来填充次一级的组件。

Todo.js

```js
import List from './List'
import TextInput from './TextInput'
import Actions from './Actions'

class Todo extends Component {
  render() {
    return (
      <Wrap>
        <Title>TODO</Title>
        <ListWrap>
          <List />
        </ListWrap>
        <TextInputWrap>
          <TextInput />
        </TextInputWrap>
        <ActionsWrap>
          <Actions />
        </ActionsWrap>
      </Wrap>
    )
  }
}

export default Todo

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
`

const Title = styled.div`
  text-align: center;
  width: 100%;
  padding: 10px;
  font-size: 34px;
  font-weight: 600;
`

const ListWrap = styled.div`
  border: 1px solid red;
  flex-grow: 1;
`

const TextInputWrap = styled.div`
  border: 1px solid red;
`

const ActionsWrap = styled.div`
  border: 1px solid red;
`
```

添加 ListWrap 用来负责 List 组件的的大小位置这些样式。下面的 TextInputWrap 和 ActionsWrap 也是同理。

分别添加各自的样式组件进来，暂时都只是加了 Border。对了，这里忘了一个 Title 。

然后添加并导入各个小组件进来。

浏览器中，可以看到各个组件的位置和大小都已经明确了。
