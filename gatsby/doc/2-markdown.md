# 读取并解析 markdown 文件

### 从文件系统上读取源文件

```
npm install --save gatsby-source-filesystem
```

需要到 gatsby-config.js 总去添加配置。这次添加到 plugins 数组中的不再是一个字符串，而是一个对象。对象中使用 resolve 属性指定插件名称，接下来可以用 options 属性来添加一些配置，这就是用对象这种形式比字符串有优势的地方。配置中 name 一项用来指定 TODO ， path 一项填写要读取的文件所在的文件夹，__dirname 代表当前文件，也就是 gatsby-config.js 所在的文件夹。这里我实际制定的文件夹是 haoduo/posts/ ，到里面去创建一个简单的 hello.md 文档。


重启 `npm run develop` 插件就可以工作了。也就意味着代码中可以读取 hello.md 的数据了。

gatsby 使用 GraphQL 来链接数据和我们的代码。graphiql 是用来写 graphql 查询语句的 IDE ，这里左侧我敲花括号，然后光标停留在括号内敲 Ctrl+Space 可以看到有哪些数据可以补齐，gatsby 自带的各种数据我们先不管，安装了 gatsby-source-filestyem 插件后，新增加的数量有两个一个是 allFile 一个是 file 。

先选择 allFile 然后敲 Ctrl-Enter ，就可以运行查询。右侧结果中， data.allFile.edges 数组中的各个对象就是一个文件。默认 node.id 的数据是文件的绝对路径。这里的 edge 和 node 都是 graphql 规范自己的术语跟我们代码没关系。

### 让文件信息显示到页面

graphiql 中点 prettify 按钮，让后拷贝美化后的查询语句。项目中新建一个 src/pages/hello.js 我现在的目的是在 hello.js 页面中显示 hello.md 中读到的数据。Gatsby 框架支持下，每个页面文件中都可以通过标签函数 graphql 来读取数据，不用担心导入问题。

把查询语句粘贴到代码中

```
{
  allFile {
    edges {
      node {
        id
        birthTime
      }
    }
  }
}
```

查询语句写好，当前组件就有 data 属性了，通过 console 语句打印到终端中看一下。

### 解析 markdown

原始的 markdown 格式的内容不能直接显示到页面上，所以要进行格式转换，这一类的操作都是用带 transformer ，也就是转换器字样的组件来完成的，remark 是一个转换 markdown 为 html 的工具，现在安装对应的 gatsby 插件来使用它

```
npm i gatsby-transformer-remark
```

gatsby-config.js 中添加好配置，重启 npm run devlopment ，这样插件就加载好了。

到 graphiql ，刷新一下，然后自动补齐的内容中就包含 allMarkDownRemark 这一项了，

发出请求

```
{
   allMarkdownRemark {
     edges {
       node {
         html
       }
     }
   }
}
```

就可以看到 markdown 内容转换后的 html 了。

show-markdown-on-page----

这里要注意：query 是有缓存的，所以 HelloQuery 这个名字要改一下，再改回来，才能读到新数据。




https://www.gatsbyjs.org/tutorial/part-four/

https://egghead.io/lessons/gatsby-install-gatsby-and-scaffold-a-blog
