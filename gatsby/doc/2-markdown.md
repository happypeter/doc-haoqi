# 解析 markdown 文件

这集看看如何《解析 markdown 》文件。

### 从文件系统上读取源文件

先来《从文件系统上读取源文件》。需要安装新插件。

```
npm install --save gatsby-source-filesystem
```

source-filesystem 这个插件是从本地文件系统中读文件信息，来创建 File 节点的。那它如何使用呢？

source-filesystem---


一共有三个文件被修改。

package.json 中可以看到新安装的插件。

gatsby-config.js 中添加了配置。这次添加到 plugins 数组中的不再是一个字符串，而是一个对象。对象中使用 resolve 属性指定插件名称，接下来可以用 options 属性来添加一些配置，这就是用对象这种形式比字符串有优势的地方。配置中 path 一项指定要读取的文件所在的文件夹，__dirname 代表当前文件，所以 指定的文件夹是项目顶级位置的 data 文件夹。

到里面去创建 posts 文件夹，放一个 1.md 文档，里面是 markdown 格式的文本，有三级标题，和带有加粗字体的一行文字。重启 `npm run develop` 插件就可以工作了。那所谓的 File 节点去哪里看呢？

到浏览器中，打开 localhost:8000/___graphql 。 gatsby 使用 GraphQL 来连接数据和我们的代码。graphiql 是用来写 graphql 查询语句的 IDE ，这里左侧我敲花括号，然后光标停留在括号内敲 Ctrl+Space 可以看到有哪些数据可以补齐，gatsby 自带的各种数据我们先不管，安装了 gatsby-source-filesystiem 插件后，新增加的数据类型有两个，一个是 allFile，另一个是 file 。

先选择 allFile 然后敲 Ctrl-Enter ，就可以运行查询。右侧结果中， data.allFile.edges 数组中的各个对象就是一个文件节点，这里看到节点中 id 的数据是文件的绝对路径。这里的 edges 和 node 都是 graphql 规范的术语。 那数据怎么才能显示到页面上呢？

### 解析 markdown

这就需要来《解析 markdown 》。source-filesystem 把文件节点创建好之后，会配合不同的 transformer ，也就是转换器来解析文件中的内容。现在来装 markdown 格式对应的 transformer 。

```
npm i gatsby-transformer-remark
```

remark 是一个转换 markdown 为 html 的工具，有了 tranformer-remark 这个插件，Gatsby 就可以使用 remark 这工具了。那如何使用呢？

transformer-remark---

gatsby-config.js 中添加好配置，重启 npm run devlop ，这样插件就加载好了。

到浏览器中，打开 graphiql ，先刷新一下，然后 ctrl-space 自动补齐的内容中多了 markdownRemark 和 allMarkDownRemark 这两项了。选择 markdownRemark ，添加 html 作为请求内容。

```
{
  markdownRemark {
    html
  }
}
```

就可以看到 markdown 内容转换后的 html 了，这里的数据嵌套关系注意一下，稍后代码中会用到。graphiql 中点 prettify 按钮，拷贝美化后的查询语句，准备粘贴到项目中。那这些内容如何显示到网页上呢？

### 让文件信息显示到页面

需要先来添加页面文件。

show-markdown---

项目中新建一个 src/pages/1.js 来显示 1.md 中的内容。Gatsby 框架支持下，每个页面文件中都可以通过标签函数 graphql 来读取数据，新建一个查询叫 BlogPostQuery ，把查询语句粘贴到查询中。这样，当前组件就有 data 属性了，根据刚才 graphiql 的输出， data 对象包含的 markdownRemark 属性对应一篇具体的 post ，post.html 就可以得到 html 内容了，然后通过 dangerouslySetInnerHTML 传递给一个自闭和的 div 显示即可。重启 run develop 。

到浏览器中，访问 /1 转换得来的 html 内容就显示出来了。
