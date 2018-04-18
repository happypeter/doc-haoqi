# 静态编译和预加载

react-static 默认就安装了 react-router 第四版。但是为了实现静态编译，使用路由的方式和 create-react-app 下有比较大的不同。

### 静态编译

/static.config.js

```js
  getRoutes: () => [
    {
      path: '/',
      component: 'src/components/Home',
    },
    {
      path: '/about',
      component: 'src/components/About',
    },
  ],
```

`getRoutes` 里面添加两个路由：一个是 `/` 对应的组件是 `Home` ，另一个是 `/about` 对应的组件是 `About` 。

src/components/About.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'

class About extends Component {
  render() {
    return (
      <Wrap>
        <h1>About</h1>
      </Wrap>
    )
  }
}

export default About

const Wrap = styled.div``
```

添加一个 About 组件。

src/components/Main.js

```js
import { Router } from 'react-static'
import Routes from 'react-static-routes'

class Main extends Component {
  render() {
    return (
      <Router>
        <Routes />
      </Router>
    )
  }
}
```

删除 Main.js 中对 Home 组件的导入。导入 `Router` ，注意是从 `react-static` 中，而非 `react-router` 中。导入 `Routes` ，这里面包含了我们在 static.config.js 中书写的那两条路由。

浏览器中，分别访问 `/` 和 `/about` 可以看到表面上跟直接使用 react-rotuer 没有区别。

但是既然路由是写到 `static.config.js` 文件中，显然是服务于静态编译的。

```
npm run build
```

执行编译命令。输出的静态文件会存放到 dist/ 文件夹中。

```
npm run serve
```

可以运行起作为静态服务器，把 `dist` 中的内容展示出来。

浏览器中，访问对应链接。查看首页和 About 页的源码，可以看到组件已经编译成了静态的 html ，实现了 SEO 。同时代码分割也天然的形成了，可以达成最佳的首页加载速度。这些都是 react-static 的大卖点。

### 预加载

仅仅是首页最佳还不够，再来看看如何通过预加载实现第二页打开速度的最佳。

src/components/Home.js

```js
import { Link } from 'react-static'

<Link to="/about">关于</Link>
```

react-static 默认对当前页面的 Link 的指向位置进行预加载。

```
npm run build && npm run serve
```

再次编译。

浏览器中打开首页。开发者工具的 Network 标签下，可以看到，加载完首页之后，About.xxx.js 也被加载了。点开首页上的“关于”链接，可以看到不需要加载任何新的资源。

### 把 API 数据编译进 Html

最近两年兴起的对摩登静态化技术的兴趣，很多是因为静态网站能更安全，加载速度更快。这个的原因其实很简单，就是静态化输出之后，网站就不依赖于数据库和服务器了。

static.config.js

```js
import axios from 'axios'

//
export default {
  getRoutes: async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/1'
    )

    return [
      {
        path: '/',
        component: 'src/components/Home'
      },
      {
        path: '/about',
        component: 'src/components/About',
        getData: () => ({
          text: data.body
        })
      }
    ]
  }
}
```

导入 axios, 把 getRoutes 改成一个 `async` 函数 ，里面用 `await` 执行 axios 请求，这样就可以保证 `data` 中是有实际数据的了。通过 `getData` 把请求到的数据 `data.body` 传递给 About 组件。

src/components/About.js

```js
import React from 'react'

import { withRouteData } from 'react-static'

export default withRouteData(({ text }) => <div>{text}</div>)
```

About 组件中，只需要用 `withRouteData` 包裹一下，就可以从 `text` 属性中，拿到这些数据了。

重新编译打开项目。

浏览器中，可以看到 /about 页面已经把请求到的数据静态编译到 html 中了。

### 布局文件

详细代码参见本次 [commit](https://github.com/haoqicat/react-static-demo/commit/201d76e0965c0f4de9906a9ee0f612faff6ee579) 。

浏览器中，可以看到添加了应用了相同布局文件的三个页面进来，charts ，posts ，和 newPosts 。代码部分相对比较直白，文章稿中给出了对应的 GitHub commit 链接。蚂蚁设计的具体知识大家可以参考好奇猫上的《蚂蚁设计实战》课程。
