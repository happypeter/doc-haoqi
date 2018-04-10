# 项目组织结构

我们先来创建一个 [Create-react-app](https://github.com/facebookincubator/create-react-app) 的项目，然后调整一下文件结构，确定基于 styled-components 技术的 CSS 使用规范。

### 创建 Git 仓库

先来创建一个项目

```
create-react-app demo
```

当前我用的 1.5.2 版本的 create-react-app 。

src/index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'

ReactDOM.render(<App />, document.getElementById('root'))
```

删除 src/ 中的所有文件， 然后新建一个 src/index.js。导入 App 组件，渲染到 `root` 节点之上。

src/containers/App.js

```js
import React, { Component } from 'react'
import Main from '../components/Main'

class App extends Component {
  render() {
    return <Main />
  }
}

export default App
```

App 组件放到 containers 文件夹中。遵循 Redux 社区非常常见的“容器组件和展示组件”的思路。容器组件中，最佳实践是只负责数据，所以凡是要真正显示到页面上的 html 内容，都放到展示组件 `Main` 中。

src/components/Main.js

```js
import React, { Component } from 'react'

class Main extends Component {
  render() {
    return <div>Main</div>
  }
}

export default Main
```

创建展示组件 Main.js ，里面只显示一个字符串。

```
npm start
```

启动项目。

浏览器中，会自动打开 http://localhost:3000/ ，页面上会看到 `Main` 这个单词。

### 存放全局 css

src/assets/global.css

```css
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}
```

全局样式都会放到 assets/global.css 中。写一下常用的样式重置代码。

App.js

```js
import '../assets/global.css'
```

到 App.js 中导入这个文件。

浏览器中，打开 chrome 开发者工具，选中 body 标签，可以看到 global.css 中的内容生效了。

### 写局部 css

全局说完了，那么局部样式呢？每个组件的局部样式就我一般都用 [styled-components](https://www.styled-components.com/) 来实现。

```
npm i styled-components
```

这样包就装好了。

添加一个容器组件 src/containers/HomeContainer.js 进来，修改代码如下

```js
import React from 'react'
import Home from '../components/Home'

const HomeContainer = props => <Home {...props} />

export default HomeContainer
```

基本就是个传令官，什么都不做，直接把所有属性传递给了展示组件。

src/components/Home.js

```js
import React, { Component } from 'react'

class Home extends Component {
  render() {
    return <div>Home</div>
  }
}

export default Home
```

添加展示组件 src/components/Home.js 。

Main.js

```js
import React, { Component } from 'react'
import HomeContainer from '../containers/HomeContainer'

class Main extends Component {
  render() {
    return (
      <div>
        <HomeContainer />
      </div>
    )
  }
}

export default Main
```

到 Main.js 中导入，并使用 HomeContainer .

浏览器中，显示了 `Home` 字样，表示 Home 组件成功运行了。

Home.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'

class Home extends Component {
  render() {
    return <Wrap>Home</Wrap>
  }
}

export default Home

const Wrap = styled.div`
  height: 100vh;
  background: #00bcd4;
`
```

到 Home.js 中导入一下 styled-components 。这里的 Wrap 就是所谓的一个 styled-components ，带样式的组件。

浏览器中， Wrap 的样式生效了。
