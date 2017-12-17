# 根据数据自动创建页面

前面有一个数据文件 hello.md ，我们为它专门创建页面 src/pages/hello.js 成功读取了 hello.md 的内容。但是如果有很多 md 文件呢？这就用好的 Gatsby 的非常核心的一个功能，《根据数据自动创建页面》。


### 创建数据和模板文件


add-data-template---

首先把 posts/hello.md 和 src/pages/hello.js 删除掉，然后创建 posts/page1.md 和 posts/page2.md 以及到 src/templates 下创建一个 blog-post.js ，里面是一个基本的 react 无状态组件。后续的操作看看能不同创建两个页面，里面都使用 blog-post 作为模板，同时分别显示 page1.md 和 page2.md 的内容。

### 使用 Gatsby 的 Node API


createPages---


因为需要访问本地文件系统，所以需要 require('path')

要实现自动创建页面，需要在项目编译的时候插入一下操作。需要《使用 Gatsby 的 Node API》来实现，项目顶级位置创建 gatsby-node.js 。里面调用 Gatsby 的一个名为 createPages 的 API 。这个 API 中的代码会在运行 npm run develop 或者 npm run build 的时候执行一次，为我们创建页面。同时它的执行时间点是在数据读取完毕之后，所以可以放心的在里面使用 graphql 数据查询。


从 createPages API 的 boundActionCreators 属性中可以那都 createPage 接口来创建页面。


slugs 变量中保存两个页面的路径，map 一下，分别创建这两个页面，页面组件都使用 templates 文件夹中的 blog-post.js 。运行 `npm run develop` ，然后到浏览器，访问 localhost:8000/sfsd ，显示404页面，上面会看到网站的其他页面中已经包含 page1 和 page1 两个页面了，只可惜打开后里面显示的内容都是一样的。

### 给模板文件传递数据

pass-context

所以需要《给模板文件传递数据》。使用 context 机制即可。gatsby-node.js 中 createPage 中，添加 context  一项，传递 slug ，也就是文件路径。这样到 blog-post.js 中，通过 pathContext 属性结构就可以获取到。

重新 run develop ，打开 page1 和 page2 现在可以显示出不同的路径名了。当然最终要的不是显示路径名，而是要显示出 page1.md 和 page2.md 中的 markdown 内容。

### 打印 node 信息

print-node---


让 Gatsby 自动创建页面，其实最重要的一步咱们还没做呢，那就是让 Gatsby 自动根据数据来生成页面路径。主要需要用到 Gatsby 的另外一个张红艳的 Node API ，onCreateNode 。这个接口会在每次有新 node 被创建的时候执行。

到 gatsby-node.js 文件中，添加打印语句，输出信息中可以看到每当一个新 node 被创建的时候，打印语句就会执行一次，其中有两次打印出了 MarkdownRemark ，这是 remark 插件为 page1.md 和 page2.md 创建 node 的时候打印出了。


### 生成页面路径

get-paths---

const { createFilePath } = require(`gatsby-source-filesystem`)
拿到 node ，到把两个 node 转换成路径还是有些麻烦，所以可以从 source-filesystem 插件中导入一个函数  createFilePath 来吗辅助这个工作，打印处理结果。

运行 run develop 可以看到输出为 page1 和 page2 正是我们想要的。但是数据有了，如何传递给 createPages API 呢？

### 路径添加到 MarkdownRemark node 中

解决方法就是，《路径添加到 MarkdownRemark node 中》。

加好之后 run develop 到 grapiql 中发出请求


```
{
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
```

结果为

```
{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "fields": {
              "slug": "/page1/"
            }
          }
        },
        {
          "node": {
            "fields": {
              "slug": "/page2/"
            }
          }
        }
      ]
    }
  }
}
```

### 到 createPages 使用路径


real-paths----




使用真实的数据做创建路径。

到页面中看到 page1 和 page2 两个页面还是都能打开的。最后解决的问题件就是页面中如果显示 markdown 了。


### 显示各自 Markdown 数据


markdown-shown---


通过 context 机制传递过来的数据，也可以在 graphql 中直接使用。


### 构造页面路径

创建文件的第一步是要《构造页面路径》。
