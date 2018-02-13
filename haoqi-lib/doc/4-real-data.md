#  使用真实数据

这集里面来使用真实数据。

### 拿到真实数据

先看看如何拿到真实数据。

在添加两个 md 文件进来。于是 gitbeijing 中总共有三个文件了 001-setup 002-clone 003-pull 。

gatsby-node.js

```js
exports.onCreateNode = ({ node }) => {
  console.log('node---type:', node.internal.type)
}
```

gatsby-node.js 中使用另外一个 API ，叫做 onCreateNode ，这个 API 的执行时间点是在每个 Node 被创建的时候，里面添加的打印语句打印一下每个 node 的数据类型。

命令行中，

```
npm run develop
```

可以看到打印出的内容不少，但是咱们要关心的只是其中三个类型为 MarkdownRemark 的文件节点，因为它们对应我们的三个 markdown 文件。此时注意，如果不去修改 .md 中的内容，再次运行 npm run develop 是不会有信息打印出来的，需要删除项目顶级位置的 .cache 夹才能再次看到。

### 创建页面路径

下一步就要根据这三个文件节点，创建三个页面路径。

gatsby-node.js

```js
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    console.log(createFilePath({ node, getNode }))
  }
}
```

gatsby-node.js 中，从 source-filesystem 插件中导入一个函数 createFilePath 。onCreateNode 接口中，如果当然文件节点是 .md 文件，就把 node 和 getNode 都传递给 createFilePath 来生成文件路径。

命令行中，

```
npm run develop
```

可以看到打印出的三个路径分别为

```
/git-beijing/001-setup/
/git-beijing/003-pull/
/git-beijing/002-clone/
```

如果想要把路径中的 git-beijing 去掉，可以在 createFilePath 接口的对象参数中增加 `basePath: 'git-beijing'` 一项。

### 路径添加到 MarkdownRemark 节点

下面的问题就是如何把路径传递给 createPage 接口了，可以用把路径添加到 MarkdownRemark 节点的方式来实现。

gatsby-node.js

```js
exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const episode = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `episode`,
      value: episode
    })
  }
}
```

结构赋值从 boundActionCreators 里拿到 createNodeField 接口。下面每次生成的路径数据存放到 episode 常量中，然后传递给 createNodeField 接口的 value 一项即可，上面的 name: `episode` 指定了这一项添加到在文件节点中之后的字段名。

加好之后，重启 npm run develop 。

浏览器中，刷新 graphiql ，请求

```
{
  allMarkdownRemark {
    edges {
      node {
        fields {
          episode
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
              "episode": "/git-beijing/001-setup/"
            }
          }
        },
        {
          "node": {
            "fields": {
              "episode": "/git-beijing/002-clone/"
            }
          }
        },
        {
          "node": {
            "fields": {
              "episode": "/git-beijing/003-pull/"
            }
          }
        }
      ]
    }
  }
}
```

注意路径信息没有跟 node 中的其他信息并列，而是添加了新的 fields 属性，来专门存放新加进来的 episode 数据。这样每个 .md 文件对应的文件节点中就多了文件路径的数据。

### 重构一下代码

gatsby-node.js 中代码越写越多，拆分一下比较好。

gatsby-node 中的内容分别放到 gatsby/onCreateNode.js 和 gatsby/createPages.js 中 。然后 require 回来即可。

命令行中，重启 npm run develop ，发现一切工作如常。

### 到 createPages 接口中使用路径

既然已经把小节文件的路径数据插入到了数据节点中，于是下一步就可以到 createPages 接口中使用路径数据了。

createPages.js

```js
const path = require(`path`)

module.exports = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const allMarkdown = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              episode
            }
          }
        }
      }
    }
  `)

  allMarkdown.data.allMarkdownRemark.edges.map(({ node }) => {
    createPage({
      path: node.fields.episode,
      component: path.resolve(`./src/templates/episode.js`),
      context: {
        episode: node.fields.episode
      }
    })
  })
}
```

Gatsby Node API 使用的规定，如果其中有异步操作，必须要处理一下，所以这里用 async/await ，因为其他的 node API 有的需要判断这个 API 执行成功之后才能执行自己。

接口参数中拿到 graphql 函数，然后先来发查询，从所有 markdown 文件节点中拿到新插入进来的 fields.episode 数据，查询成功 拿到所有节点数据 allMarkdown.data.allMarkdownRemark.edges ， map 一下，解构赋值，拿到文件节点对象，也就是 node 。node.fields.episode 中就包含着新页面路径，传递给 createPage 即可为每个 .md 都创建一个页面了。

浏览器中，打开 404 页面，可以看到跟三个 .md 对应的页面，每个页面打开，都可以看到本小节路径。

### 显示真实 Markdown 数据

最后要解决的问题就是页面中如何来显示真实 markdown 数据。

src/templates/episode.js

```js
import React from 'react'

export default ({ data }) => {
  const ep = data.markdownRemark
  return <div dangerouslySetInnerHTML={{ __html: ep.html }} />
}

export const query = graphql`
  query PageQuery($episode: String!) {
    markdownRemark(fields: { episode: { eq: $episode } }) {
      html
    }
  }
`
```

模板文件 episode.js 中，data 中拿到一个小节的数据，用 react 的 dangerouslySetInnerHTML 把每一小节的 html 内容显示出来即可。

通过 context 机制传递过来的 episode 数据，可以在 graphql 查询中直接使用，可以通过 `$episode` 来拿到，markdownRemark 接口以 episode 字段为查询条件，可以拿到属于当前页面的 markdown 对应的 html ，

浏览器中，访问各个页面，都可以看到对应的 markdown 内容了。
