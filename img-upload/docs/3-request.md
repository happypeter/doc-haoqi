# <a name="s9yggu"></a>axios 请求

课程用 redux 架构整个案例，所以发请求，我们就到 redux 的 action 创建器中去完成。

### <a name="0yw6db"></a>搭建 redux

关于 redux 的基础知识，请参考《 Hello Redux 课程》。

```
npm i redux react-redux redux-thunk redux-logger
```

具体的代码可以查看 [commit](https://github.com/haoqicat/img-upload/commit/3c835c18968482aa17d26b7c02b5e1ab74249c4f) 。代码中添加了后端的跨域共享，添加了读取所有 post 的 API 。前端通过 action 中发起 axios 请求的形式拿到数据，保存到 store 中。

浏览器中，刷新一下，可以看到加载了 posts 数据。

### <a name="y30fbx"></a>编程式页面跳转

再来添加自定义的 history 对象，实现编程式的页面跳转。

utils/router.js

```js
import createHistory from 'history/createBrowserHistory'

const genHistory = () => {
  if (typeof document !== 'undefined') {
    return createHistory()
  }
  return {}
}

export default genHistory()
```

创建 router.js 文件，里面通过 `createHistory` 接口，创建一个 history 对象并导出。if 语句判断的当前环境是不是浏览器，判断的目的就是防止编译的时候报错而已。

components/Main.js

```js

import history from '../utils/router'

  render () {
    return (
      <Router history={history}>

```

Main.js 中，让 `Router` 使用这个 history 。

接下来的任务就是定义一个 action 创建函数 `submitForm` ，然后创建 PostNew 页面表单，点表单的提交按钮时，可以执行这个创建函数来进行页面跳转到首页的操作。

具体代码在这个 [commit](https://github.com/haoqicat/img-upload/commit/03c5df4870699f27cc1c308f0e2f3a2caed19d6b) 。

### <a name="c7dmge"></a>创建文章

下面来提交文章数据，并在首页显示出所有文章。

这次在 sumbitForm 函数中，提交数据到服务器，创建一个 post ，提交成功后，把这条  post 数据添加到 store 中。然后跳转到网站首页，网站首页去显示所有的 post ，这里每一个 post 作为一个 course ，也就是课程。

代码在这个 [commit](https://github.com/haoqicat/img-upload/commit/f1c85778a5506efd4841cfae6e9f3fef9587e967)
