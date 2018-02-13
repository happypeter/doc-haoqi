#  使用 Node API 创建页面

来看看如何自动化的创建页面。

### 使用 Gatsby 的 Node API

需要在项目编译的时候插入一下操作。需要使用[ Gatsby 的 Node API ](https://www.gatsbyjs.org/docs/node-apis/#createPages)来实现。

gatsby-node.js

```
exports.createPages = () => {
  console.log('createPages...')
}
```

项目顶级位置创建 gatsby-node.js 。里面调用 Gatsby 的一个名为 createPages 的 API ，它的执行时间点是在数据读取完毕之后，所以后续可以放心的在里面使用 graphql 数据查询。这里添加了 console.log 语句，来证实这个 API 运行正常与否。

命令行中，重启一下 npm run develop ，会看到打印了 createPages 中的信息。

### 使用创建页面接口

来真正创建页面吧。

删除 pages/001-setup.js ，因为我们要用自动化的方式来创建它了。

gatsby-node.js

```js
const path = require(`path`)

exports.createPages = ({ boundActionCreators }) => {
  const { createPage } = boundActionCreators
  createPage({
    path: '/001-setup',
    component: path.resolve(`./src/templates/episode.js`)
  })
}
```

到 gatsby-node.js 文件中，因为需要访问本地文件系统，所以需要 require('path') ，createPages 拥有 boundActionCreators 属性，其中可以解构赋值拿到创建页面的接口 createPage ，传递的参数中 path 用来指定要创建的页面路径，component 指定要使用的组件，也就是模板文件。

src/templates/episode.js

```js
import React from 'react'

export default () => {
  return <div>模板文件 Episode</div>
}
```

先来添加模板文件，templates 文件夹下的 episode.js 。

重启 npm run develop ，会执行刚刚添加的代码，创建页面。

浏览器中，输入 localhost:8000/sdf ，会打开 404 页面，可以看到当前网站已有的所有页面，其中果然包括 `001-setup` 这个页面，点开，里面显示的是模板文件的内容。

### 创建多个页面

再来看看如何创建多个页面。

gatsby-node.js

```js
const path = require(`path`)

exports.createPages = ({ boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const episodes = ['/001-setup', '002-clone']
  episodes.forEach(episode => {
    createPage({
      path: episode,
      component: path.resolve(`./src/templates/episode.js`),
      context: {
        episode
      }
    })
  })
}
```

gatsby-node.js 中创建把 001-setup 和 002-pull 这两个页面路径组成一个 episodes 数组，迭代一下，让 createPage 接口创建两个文件出来。context 机制是用来往各个页面中传递数据用的，现在传的是 episode 。解释一下，这个 episode 是小节的意思，是我自己起的变量名，这里的数据是一本书 git-beijing ，里面有两个小节 001-setup 和 002-pull 。

src/templates/episode.js

```js
import React from 'react'

export default ({ pathContext }) => {
  const { episode } = pathContext
  return <div>{episode}</div>
}
```

再到模板文件 episode.js 中看看如何接收。解构 pathContext 属性，拿到 episode ，并在页面上显示出来。重新运行 npm run develop 。

浏览器中，进入 404 页面，可以看到两个新页面了，分别点开，里面可以显示传递进来的 episode。
