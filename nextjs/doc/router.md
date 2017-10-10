路由要解决的是多个页面间跳转的问题，已经如何传递路由参数给页面，对于服务器端渲染，还有什么特别要注意的地方。本节来揭晓。

### 添加路由

之前只有一个页面，若实现多个页面就需要添加路由，Nextjs 应用如何实现页面路由的呢？

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

### 传递参数

`/video/123` 这样的链接，如何把 123 传递到 video 页面内呢？


### 修改 url

现在我想把 `video/123` 变成 `/v/123` 。


### 同时响应 `123` 和 `123.html`

### 页面刷新时要注意的问题
