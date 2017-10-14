路由要解决的是多个页面间跳转的问题，已经如何传递路由参数给页面，对于服务器端渲染，还有什么特别要注意的地方。本节来揭晓。

### 添加路由

之前只有一个页面，若实现多个页面就需要添加路由，Next.js 应用如何实现页面路由的呢？

再添加一个新文件 `pages/video.js`，文件内容如下：

```
const video = () => (
  <div>
    <p>This is video page</p>
  </div>
)

export default video
```

保存文件之后，访问网址 localhost:3000/about，就会看到一句话'this is video page'，说明新添加的页面生效了。Nextjs 是不用 react-router 的，路由是由 pages/ 中的文件自动形成的。

### Link 页面间跳转

使用 Link 可以让我们在页面间跳转的时候，页面不刷新。

修改 `pages/index.js` 文件，在文件开头添加代码：

```
import Link from 'next/link'
```

然后，使用 Link 组件链接到 video 页面：

```
<div>
  <Link href="/video">
    <a>video page</a>
  </Link>
  <p>hello world</p>
</div>
```

保存文件，这时浏览 localhost:3000 页面的时候就会出现一个链接。点一下，注意浏览器，是没有整页刷新的。

### 动态页面

可以通过查询字符串构建动态页面，比如类似这样的链接 `/video?id=123`，参数 id 的数值改变，则 video 页面将展示不同的内容，那关键看一下 video 页面如何获取参数 id 对应的数值

修改 `pages/video.js` 文件

```
const video = (props) => (
  <div>
    <div>id: {props.url.query.id}</div>
    <p>This is video page</p>
  </div>
)

export default video
```

然后，修改一下 `pages/index.js` 文件中指向 video 页面的链接

```
<Link href="/video?id=123">
  <a>video page</a>
</Link>
```

到浏览器测试一下，video 页面中则会显示查询字符串参数 id 的数值。虽然通过查询字符串可以在页面中传递数据，但是这样的 URL 格式不美观。

### 自定制URL

有趣的事情是 Next.js 应用页面的 URL 是能够定制的，所以咱们不用担心页面 URL 的颜值，你想整成什么模样都可以。这一功能的实现需要借助 Next.js 的[路由掩码](https://learnnextjs.com/basics/clean-urls-with-route-masking/route-masking) 特性，只需要修改 `pages/index.js` 文件中的一行代码：

```
<Link as='/video/123' href='/video?id=123'>
```

现在访问 video 页面，浏览器地址栏中的链接就变成了 `/video/123`，页面中仍然能正确的显示参数 id 的数值。Link 组件的 `as` 属性值是浏览器地址栏能看到的地址，video 页面显示的 id 数值是通过 `href` 属性值获取的，所以可以任意更改 `as` 的数值，比如把 `video/123` 变成更简单的形式 `/v/123`，也是可以的，如下：

```
<Link as='/v/123' href='/video?id=123'>
```

### 创建自定义服务器

现在还有一个问题需要解决，若刷新 /v/123 页面，会出现 404 错误，原因是在 pages 目录中没有 `v/123` 文件存在，我们可以使用 Next.js 的[自定义服务器API](https://github.com/zeit/next.js#custom-server-and-routing)来解决这个问题。我们使用 Express 来创建一个自定义服务器，在项目根目录下添加文件 server.js，代码如下：

```
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
```

然后修改 package.json 文件，更新 npm 的开发脚本：

```
"scripts": {
  "dev": "node server.js"
},
```

此时，运行 `npm run dev` 命令可以启动应用，不过刷新页面 `/v/123` 之后，仍然会出现404错误，想要解决这个问题，咱们还需要自定义一个匹配 `/v/123` URL 的路由。

### 创建自定义路由

更新 server.js 文件，在 `const server = express()` 代码之后，添加如下代码：

```
server.get('/v/:id', (req, res) => {
  const id = req.params.id
  const actualPage = '/video'
  const queryParams = { id }
  app.render(req, res, actualPage, queryParams)
})
```

上述代码，把自定义的路由 `/v/:id` 映射到已经存在的 `pages/video` 页面文件上。代码保存之后，重新启动 Express 服务器，再次刷新 `/v/123` 页面，就能正确显示页面内容了。

### 同时响应 `123` 和 `123.html`

若我们此时访问 `/v/123.html`，而不是 `/v/123`, 仍然会是404错误，解决方法是在服务器端去掉 `/v/123.html` 字符串中的 `.html` 后缀：

```
server.get('/v/:id', (req, res) => {
  const id = req.params.id.replace(/\.[^/.]+$/, "")
  // v/1.html and v/1 will both work
  ...
})
```

至此，关于 Next.js 路由相关的问题就介绍完成了。
