# 使用 create-react-app 创建开发环境

先来使用 [create-react-app](https://github.com/facebookincubator/create-react-app) 创建开发环境。

```
create-react-app redux-hello-v3
```

环境中包含一套 webpack 最佳配置，提供了 react 的 jsx 语法和 es6 语法的编译能力。

### 代码结构调整

进入项目，删除整个 src 文件夹

```
rm -rf src
```

然后自己创建一个基本的项目骨架。

src/index.js

```js

import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'

ReactDOM.render(<App />, document.getElementById('root'))
```

首先创建整个程序的入口 src/index.js 文件。导入 React ，ReactDOM 负责把组件渲染到浏览器中。然后从 containers 文件夹中导入 App 。最后执行 ReactDOM.render 把 App 组件挂载到 id 为 root 的页面元素上，这个元素在 public/index.html 中。

添加 App 组件进来。

src/containers/App.js

```js
import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div>
        App
      </div>
    )
  }
}

export default App
```

首先导入 React 和 Component ，然后定义一个 class 组件，render 方法中暂时只 return 一个简单的字符串。

命令行中执行

```
npm start
```

就可以把项目运行在开发环境下了。

浏览器中，可以看到 App 字符串，表示 App 组件已经运行起来了。

### 添加 react-router

项目中添加两个页面进来，会用到 react-router 。

```
npm i react-router-dom
```

这里安装的是 react-router 第四版。

App.js

```js
import React, { Component } from 'react'
import Main from '../components/Main'

class App extends Component {
  render() {
    return (
      <Main />
    )
  }
}
```

添加 App 组件对应的展示组件 Main ， JSX 中显示出来。

components/Main.js

```js
import React, { Component } from 'react'
import HomeContainer from '../containers/HomeContainer'
import PostContainer from '../containers/PostContainer'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class Main extends Component {
  render () {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={HomeContainer} />
            <Route path='/post' component={PostContainer} />
          </div>
        </Router>
      </div>
    )
  }
}

export default Main
```

创建 components 文件夹下的 Main.js 文件。导入 React 和 Component ，添加两个页面组件进来，页面组件属于比较大的组件，所以一定有自己的 container 组件的，所以导入 HomeContainer 和 PostContainer 。然后从 react-router 的包里面导入 Router 也就是路由器，和 Route 也就是路由。

接下来一个普通的 class 组件叫 Main 。render 中 return 的内容主要是路由了，Router 只能有一个子元素所以要加上 div ，然后里面写两条路由规则，通过添加 exact 保证精确匹配，也就是如果用户访问 / 就显示 HomeContainer ，而如果用户访问 /xxx 就不会显示 HomeContainer 了。下面把 /post 指向 PostContainer 组件。

containers/PostContainer.js 

```js
import React from 'react'
import Post from '../components/Post'

const PostContainer = props => <Post {...props} />

export default PostContainer
```

添加一个无状态组件，直接把当前组件的所有属性值传递给展示组件 Post 。

components/Post.js

```js
import React, { Component } from 'react'

class Post extends Component {
  render() {
    return (
      <div>
        Post
      </div>
    )
  }
}

export default Post
```

创建展示组件 Post ，写成一个 class 组件。暂时只显示一个字符串 Post 。

HomeContainer 和 Home 组件的情况是完全一样的，这里不再赘述。

浏览器中，访问 / 可以打开 Home 组件，访问 /post 可以打开 Post 组件。

### 创建两个组件

引入 redux 很大一个作用就是解决组件间的通信问题，所以先到 Post 页面来创建两个组件。

Post.js

```js
import React, { Component } from 'react'
import PostBody from './PostBody'
import CommentBox from './CommentBox'
import styled from 'styled-components'

class Post extends Component {
  render() {
    return (
      <Wrap>
        <Upper>
          <PostBody />
        </Upper>
        <Bottom>
          <CommentBox />
        </Bottom>
      </Wrap>
    )
  }
}

export default Post

const Wrap = styled.div``

const Upper = styled.div`
  display: flex;
  background: #00bcd4;
`

const Bottom = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, .1)
`
```

Post.js 中添加 PostBody ，用来放文章主体，CommentBox ，用来放评论，然后把页面分成了上下两个大块 Upper 和 Bottom ，分别加了一点背景色进来，二者样式中添加的 display: flex 用于避免 margin 重叠问题。

然后添加 PostBody 和 CommentBox 组件。里面的内容都只写字符串，并添加简单的样式，css 的详细情况参考这个[commit](https://github.com/haoqicat/redux-hello-v3/commit/ea8b9ae5a7d772bef796456cbd65f9f01bad35d2)。

浏览器中，访问 /post 可以看到页面有了上下两个大组件。
