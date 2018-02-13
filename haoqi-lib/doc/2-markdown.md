# 转译 markdown 文件

这集看看如何转译 markdown 文件。

### 从文件系统上读取源文件

看看如何从文件系统上读取源文件。

```
npm install --save gatsby-source-filesystem
```

source-filesystem 这个插件就是让我们可以从本地文件系统中读文件信息，创建 File 节点的。

gatsby-config.js

```js
module.exports = {
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/`
      }
    }
  ]
}
```

gatsby-config.js 中添加了配置。这次添加到 plugins 数组中的不再是一个字符串，而是一个对象。对象中使用 resolve 属性指定插件名称，接下来可以用 options 属性来添加一些配置，这就是用对象这种形式比字符串有优势的地方。配置中 path 一项指定要读取的文件所在的文件夹，dirname 代表当前文件夹，所以指定的文件夹是项目顶级位置的 data 文件夹。

到 data 里面去创建 git-beijing 文件夹，放一个 001-setup.md 文档，里面是 markdown 格式的文本。

重启 `npm run develop` 插件就可以工作了。

到浏览器中，打开 `localhost:8000/___graphql` 。 gatsby 使用 GraphQL 来连接数据和我们的代码。左侧敲花括号，然后光标停留在括号内敲 Ctrl+Space 可以看到有哪些数据可以补齐，gatsby 自带的各种数据我们先不管，安装了 gatsby-source-filesystiem 插件后，新增加的数据类型有两个，一个是 allFile，另一个是 file 。先选择 allFile 然后敲 Ctrl-Enter ，就可以运行查询。右侧结果中， data.allFile.edges 数组中的各个对象就是一个文件节点，这里看到节点中 id 的数据是文件的绝对路径。这里的 edges 和 node 都是 graphql 规范的术语。

### 解析 markdown

现在来处理 markdown 。source-filesystem 把文件节点创建好之后，会配合不同的 transformer ，也就是转换器来解析文件中的内容。现在来装 markdown 格式对应的 transformer 。

```
npm i gatsby-transformer-remark
```

remark 是一个转换 markdown 为 html 的工具，有了 tranformer-remark 这个插件，Gatsby 就可以使用 remark 这工具了。

gatsby-config.js

```js
module.exports = {
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/`
      }
    },
    'gatsby-transformer-remark'
  ]
}
```

gatsby-config.js 中添加好配置，重启 npm run develop ，这样插件就加载好了。

到浏览器中，打开 graphiql ，先刷新一下，然后 ctrl-space 自动补齐的内容中多了 markdownRemark 和 allMarkDownRemark 这两项了。选择 markdownRemark ，添加 html 作为请求内容。

```
{
  markdownRemark {
    html
  }
}
```

就可以看到 markdown 内容转换后的 html 了。

### 添加页面文件

添加一个页面来显示这些 Markdown 转换后的数据。

src/pages/001-setup.js

```js
import React from 'react'

export default ({ data }) => {
  const post = data.markdownRemark
  return <div dangerouslySetInnerHTML={{ __html: post.html }} />
}

export const query = graphql`
  query BlogPostQuery {
    markdownRemark {
      html
    }
  }
`
```

项目中新建一个 src/pages/001-setup.js 来显示 001-setup.md 中的内容。创建一个无状态组件，接收的 data 属性中包含的就是刚才在 graphiql 查询到的数据。所以 data.markdownRemark 就赋值到 post ，那么 post.html 中就可以拿到转换后的 html 内容。用 React 的 dangerouslySetInnerHTML 显示到页面上。

Gatsby 框架支持下，每个页面文件中都可以通过标签函数 graphql 来读取数据，新建一个查询叫 BlogPostQuery ，把从 graphiql 中拷贝到的查询语句粘贴到查询中。这样，当前组件的 data 属性就可以拿到刚才 graphiql 的输出了。

重启 npm run develop 。

到浏览器中，访问 `http://localhost:8000/001-setup` 转换得来的 html 内容就显示出来了。
