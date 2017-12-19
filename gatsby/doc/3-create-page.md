# 使用 Node API 创建页面

之前有一个 1.md 文件，我们为它专门创建了一个页面 1.js，如果页面多了肯定需要根据数据自动创建页面。这个咱们分两集来做，这集先来《使用 Node API 创建页面》。

### 使用 Gatsby 的 Node API

要实现自动创建页面，需要在项目编译的时候插入一下操作。需要《使用 Gatsby 的 Node API》来实现。

node-api

项目顶级位置创建 gatsby-node.js 。里面调用 Gatsby 的一个名为 createPages 的 API ，它的执行时间点是在数据读取完毕之后，所以后续可以放心的在里面使用 graphql 数据查询。这里添加了 console.log 语句，来证实这个 API 运行正常与否。

命令行中重启一下

```
npm run develop
```

会看到打印了 createPages 中的信息。那如何来创建一个新页面呢？


### 使用创建页面接口

这就需要来《使用创建页面接口》。

createpage---

一共修改了两个文件。

先来添加各个博客详情页面的模板文件，templates 文件夹下的 blog-post.js ，里面是一个只显示一行占位符的 React 组件。

到 gatsby-node.js 文件中，因为需要访问本地文件系统，所以需要 require('path') ，createPages 拥有 boundActionCreators 属性，其中可以解构赋值拿到创建页面的接口 createPage ，传递的参数中 path 用来指定页面路径，component 指定要使用的组件，也就是模板文件。

再次运行命令。

```
npm run develop
```

会执行刚刚添加的代码，创建页面。

浏览器中，输入 localhost:8000/sdf ，打开404页面，可以看到当前网站已有的所有页面，其中果然包括 `/2` 这个页面，点开，里面显示的是模板文件的内容。

### 创建多个页面

再来看看如何《创建多个页面》，并且给每个页面传递不同的数据。

context---

修改了两个文件。

gatsby-node.js 中创建把 page1 和 page2 这两个页面路径组成一个 slugs 数组，迭代一下，让 createPage 接口创建两个文件出来。context 机制是用来往各个页面中传递数据用的，现在传的是页面路径 slug 。

再到模板文件 blog-post.js 中看看如何接收。解构 pathContext 属性，拿到 slug ，并在页面上显示出来。重新运行 npm run develop 。

浏览器中，进入404页面，可以看到 page1 和 page2 两个新页面了，分别点开，里面可以显示传递进来的路径数据。一切都好，可惜 page1 和 page2 都是无中生有的页面。
