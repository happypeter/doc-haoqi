# 使用 material-ui

这里咱们使用还没有正是发布的 1.0 版的 material-ui ，网站在 https://material-ui-next.com/ ，material-ui 也可以简称叫 mui 。

```
npm install --save material-ui@next
```

注意，要加上 at next 才能安装新版进来。打开 package.json 可以看到安装的是 1.0 的 beta 版。

Course.js

```js
import Card from 'material-ui/Card'

const CommentWrap = styled(Card)`
```

课程详情页的课程列表可以加上一个 Card ，导入 Card ，然后让 mui 组件和 styled-components 样式配合。

CourseCard.js 

```js
import Card from 'material-ui/Card'

const Wrap = styled(Card)`
`
```

首页的课程卡片也应用 Card 样式。

浏览器中，看到首页和详情页都美观了一些。

### 使用 mui 的图标

```
npm install --save material-ui-icons
```

mui 也打包好了谷歌的图标库可以供我们使用，安装 material-ui-icons 这个包即可。


CourseCardAction.js

```js
import ThumbUp from 'material-ui-icons/ThumbUp'
import Comment from 'material-ui-icons/Comment'

    return (
      <Wrap>
        <Button onClick={() => like(id)}>
          <ThumbUp />
          {likes}
        </Button>
        <Button onClick={() => history.push(`/c/${id}`)}>
          <Comment />
          {comments.length}
        </Button>
      </Wrap>
    )

    
const Button = styled.div`
  ...
  line-height: 26px; // 16+5*2
  svg {
    fill: #212121;
    width: 16px;
    height: 16px;
    margin: 5px;
    margin-left: 0;
  }
`
```

导入挑大指和评论两个 svg 图标。下面在需要的地方直接使用即可。下面加一些样式，让图标小一些，然后垂直居中显示。

浏览器中，可以看到图标显示很美观。

### 使用 Button 和 Input

CourseCommentForm.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'
import Input from 'material-ui/Input'
import Button from 'material-ui/Button'

class CommentForm extends Component {
  render() {
    return (
      <Wrap>
        <NameInput
          placeholder="名字"
        />
        <CommentInput
          placeholder="评论"
        />
        <Button raised>
          评论
        </Button>
      </Wrap>
    )
  }
}

export default CommentForm

const Wrap = styled.div`
  display: flex;
`
const CommentInput = styled(Input) `
  flex-grow: 1;
  margin-right: 10px;
`

const NameInput = styled(Input) `
  margin-right: 10px;
`
```


新建 CourseCommentForm.js 文件，里面来实现表单组件。需要 Input 和 Button 两个 mui 组件。

Wrap 里面包含三兄弟，NameInput 和 CommentInput ，以及 Button 。

下面来定义这些样式组件。

Wrap 这里 display flex 。CommentInput 自动延展，占据所有空闲宽度。 NameInput 只需要保证一个右边距即可。

CourseCommentForm.js

```js
import CommentForm from './CourseCommentForm'

class Course extends Component {
  render() {
          <CommentWrap>
            <CommentForm />
            <CommentList comments={comments} />
          </CommentWrap>
```

导入 CommentForm，课程评论区添加进来。

浏览器中，可以看到 Input 和 Button 都出来了，但是颜色跟咱们网站主题不搭配。

### 定制主题

虽然可以用[withStyles 的形式来覆盖默认样式](https://material-ui-next.com/customization/overrides/)，但是这里更好的方式是[定制主题](https://material-ui-next.com/customization/themes/)来调整按钮和 Input 的颜色。

App.js

```js
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import cyan from 'material-ui/colors/cyan'
import pink from 'material-ui/colors/pink'

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: pink
  }
})
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Main />
      </MuiThemeProvider>
    )
  }
}
```

导入 theme 相关接口，mui 有各种颜色可供导入，每个颜色其实就是一个对象。下面调用 createMuiTheme 参数中传递一个色盘对象。这里只设置主色，也就是 primary。

CourseCommentForm.js


```js
<Button raised color="accent">
  评论
</Button>
```

表单按钮的颜色设置为 accent ，强调色，这个样会拿到默认主题的强调色。

浏览器中，进行输入时，Input 的下划线是我在主题中设置的主色，按键是粉色。
