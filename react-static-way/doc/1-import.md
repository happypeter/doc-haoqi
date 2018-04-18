# 使用蚂蚁设计组件库

来看看 react-static 中如何使用蚂蚁设计组件库。

### 创建项目

```
npm i -g react-static
```

首先全局安装 react-static 。

```
react-static create
```

创建一个 react-static 项目：

* 项目名叫做 demo
* 如果想要按需加载 antd 组件，配置还是内容不少，所以直接用 `less-antdesign` 模板比较明智。

创建好的项目中，antd 相关的对 webpack 的自定制配置都在 static.config.js 中。

运行 `npm start` 。

浏览器中，看到脚手架代码运行起来了。

### 调整项目结构

src/index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

// Your top level component
import App from './App'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot
    ? ReactDOM.render
    : ReactDOM.hydrate || ReactDOM.render
  const render = Comp => {
    renderMethod(<Comp />, document.getElementById('root'))
  }

  // Render!
  render(App)
}
```

删除整个 src 文件夹。然后新建 src/index.js ，把脚手架中原始内容拷贝过来。

这里直接导出了 App 组件，做静态编译的时候用。所以如果添加 react-redux 的 Provider 包裹的时候，直接包裹了下面的 `renderMethod` 中的 `Comp` ，就会造成开发环境可以运行，但是进行编译的时候报错的情况。

src/theme-ant-overwrite.less

```less
@font-size-base : 16px;
@border-radius-base : 6px;
@border-radius-sm : 3px;
```

把主题样式覆盖文件也要拷贝回来，不然会报错。如果覆盖主题样式，可以参考[官方的文件](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less) 来覆盖变量即可。

src/App.js

```js
import React, { Component } from 'react'
import Main from './components/Main'

class App extends Component {
  render() {
    return <Main />
  }
}

export default App
```

创建 App.js ，来按照我自己通常的 create-react-app 下的思路来写代码。对比 gatsby ，react-static 的作者自己引以为傲的一点就是可以不用太多改变大家的写 react 项目的方式。

src/components/Main.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'

class Main extends Component {
  render() {
    return <Wrap>Main</Wrap>
  }
}

export default Main

const Wrap = styled.div``
```

添加展示组件 Main.js 。Styled-Components 已经预装了，所以这里可以直接使用。

重启 `npm start`

浏览器中，看到 Main 组件正常显示了。

### 使用 antd 组件

src/components/Home.js

```js
import Home from './Home'

class Main extends Component {
  render() {
    return (
      <Wrap>
        <Home />
      </Wrap>
    )
  }
}
```

Main.js 导入 Home 组件。

src/components/Home.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, Input, Icon, Form } from 'antd'

const FormItem = Form.Item

class Home extends Component {
  render() {
    return (
      <Wrap>
        <Card>
          <Form>
            <FormItem>
              <Input
                placeholder="username"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
            </FormItem>
            <FormItem>
              <Input
                placeholder="password"
                type="password"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
            </FormItem>
            <FormItem>
              <StyledButton type="primary" htmlType="submit">
                登录
              </StyledButton>
            </FormItem>
          </Form>
        </Card>
      </Wrap>
    )
  }
}

export default Home

const Wrap = styled.div``

const StyledButton = styled(Button)`
  width: 100%;
`

const Card = styled.div`
  width: 250px;
  padding: 30px;
  margin: 150px auto;
  background: #fff;
  height: 230px;
`
```

Home 组件中，使用了各个 antd 组件。

浏览器中，可以看到组件显示正常。另外，我们当前的环境中配置了 antd 的按需加载，所以编译后文件也都非常小。
