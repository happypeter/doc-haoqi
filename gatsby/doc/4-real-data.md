# 使用真实数据

我们的目标是根据数据自动创建页面，上一集中实现了一半，这集里面来《使用真实数据》。

### 拿到真实数据

所以先看看如何《拿到真实数据》。

```
data/posts/2.md
@@ -0,0 +1 @@
+第二个故事
data/posts/3.md
@@ -0,0 +1 @@
+第三个故事
data/posts/4.md
@@ -0,0 +1 @@
+第四个故事
gatsby-node.js
@@ -1,5 +1,9 @@
 const path = require(`path`)
 
+exports.onCreateNode = ({ node }) => {
+  console.log('node---type:', node.internal.type)
+}
+
 exports.createPages = ({ boundActionCreators }) => {
   const { createPage } = boundActionCreators
   const slugs = ['page1', 'page2']
```


到 data/posts 文件夹中，创建 2.md， 3.md ，4.md ，里面都只有一行文本而已。

gatsby-node.js 中使用另外一个 API ，叫做 onCreateNode ，这个 API 的执行时间点是在每个 Node 被创建的时候，里面添加的打印语句打印一下每个 node 的数据类型。

运行命令。

```
npm run develop
```

可以看到打印出的内容不少，但是咱们要关心的只是其中四个类型为 MarkdownRemark 的文件节点，因为它们对应我们的四个 .md 文件。此时注意，如果不去修改 .md 中的内容，再次运行 npm run develop 是不会有信息打印出来的，需要删除项目顶级位置的 .cache 夹才能再次看到。

### 创建页面路径

下一步就要根据这四个文件节点，创建四个页面路径。

```
gatsby-node.js
@@ -1,7 +1,10 @@
 const path = require(`path`)
+const { createFilePath } = require(`gatsby-source-filesystem`)
 
-exports.onCreateNode = ({ node }) => {
-  console.log('node---type:', node.internal.type)
+exports.onCreateNode = ({ node, getNode }) => {
+  if (node.internal.type === `MarkdownRemark`) {
+    console.log(createFilePath({ node, getNode }))
+  }
 }
 
 exports.createPages = ({ boundActionCreators }) => {
src/pages/1.js
@@ -1,18 +0,0 @@
-import React from 'react'
-
-export default ({ data }) => {
-  const post = data.markdownRemark
-  return (
-    <div
-      dangerouslySetInnerHTML={{__html: post.html}}
-    />
-  )
-}
-
-export const query = graphql`
-  query BlogPostQuery {
-    markdownRemark {
-      html
-    }
-  }
-`
```


改了两个文件。

把 pages/1.js 删除掉，因为下面会为 1.md 自动创建页面了。

gatsby-node.js 中，从 source-filesystem 插件中导入一个函数  createFilePath 。onCreateNode 接口中，如果当然文件节点是 .md 文件，就把 node 和 getNode 都传递给 createFilePath 来生成文件路径。

运行命令。

```
npm run develop
```

可以看到打印出的四个路径分别为 `/posts/1/` ，`/posts/2/` `/posts/3/` 和 `/posts/4/` ，如果想要把路径中的 posts 去掉，可以在 createFilePath 接口的对象参数中增加 basePath: `posts` 一项。下面的问题就是如何把路径传递给 createPage 接口了。

### 路径添加到 MarkdownRemark node 中

首先需要把《路径添加到 MarkdownRemark node 中》。

```
gatsby-node.js
@@ -1,9 +1,15 @@
 const path = require(`path`)
 const { createFilePath } = require(`gatsby-source-filesystem`)
 
-exports.onCreateNode = ({ node, getNode }) => {
+exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
+  const { createNodeField } = boundActionCreators
   if (node.internal.type === `MarkdownRemark`) {
-    console.log(createFilePath({ node, getNode }))
+    const slug = createFilePath({ node, getNode })
+    createNodeField({
+      node,
+      name: `slug`,
+      value: slug
+    })
   }
 }
 
```


结构赋值从 boundActionCreators 里拿到 createNodeField 接口。下面每次生成的路径数据存放到 slug 常量中，然后传递给 createNodeField 接口的 value 一项即可，上面的 name: `slug` 指定了这一项添加到在文件节点中之后的字段名。

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
              "slug": "/posts/1/"
            }
          }
        },
        {
          "node": {
            "fields": {
              "slug": "/posts/2/"
            }
          }
        }
        ...
      ]
    }
  }
}
```

注意路径信息没有跟 node 中的其他信息并列，而是添加了新的 fileds 属性，来专门存放新加进来的 slug 数据。这样每个 .md 文件对应的文件节点中就多了文件路径的数据。

### 到 createPages 接口中使用路径

于是下一步就可以《到 createPages 接口中使用路径》。

```
gatsby-node.js
@@ -13,18 +13,32 @@ exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
   }
 }
 
-exports.createPages = ({ boundActionCreators }) => {
+exports.createPages = ({ graphql, boundActionCreators }) => {
   const { createPage } = boundActionCreators
-  const slugs = ['page1', 'page2']
-  slugs.forEach(
-    slug => {
-      createPage({
-        path: slug,
-        component: path.resolve(`./src/templates/blog-post.js`),
-        context: {
-          slug
+  return new Promise((resolve, reject) => {
+    graphql(`
+      {
+        allMarkdownRemark {
+          edges {
+            node {
+              fields {
+                slug
+              }
+            }
+          }
         }
+      }
+    `).then(result => {
+      result.data.allMarkdownRemark.edges.map(({ node }) => {
+        createPage({
+          path: node.fields.slug,
+          component: path.resolve(`./src/templates/blog-post.js`),
+          context: {
+            slug: node.fields.slug
+          }
+        })
       })
-    }
-  )
+      resolve()
+    })
+  })
 }
```


这次修改实现了使用真实的数据来生成页面路径了。

首先从接口参数中拿到 graphql 函数，然后先来发查询，从所有 markdown 文件节点中拿到新插入进来的 fields.slug 数据，查询成功 .then 中可以拿到所有博客文件节点数据，也就是 result.data.allMarkdownRemark.edges 。所有博节点 map 一下，每个文件节点都可以解构赋值，拿到文件 node ，其中的 .fields.slug 中就包含着新页面路径，传递给 createPage 即可为每个 .md 都创建一个页面了。

这里最后要 return 的是一个 Promise 是因为 Gatsby 官网上有对 Node API 使用的规定，如果其中有异步操作，必须要返回 promise ，因为其他的 node API 有的需要判断这个 API 执行成功之后才能执行自己。

浏览器中，打开404页面，可以看到跟真实的四个 .md 文件对应的四个页面。

### 显示真实 Markdown 数据

最后要解决的问题就是页面中如何来《显示真实 markdown 数据》。

```
src/templates/blog-post.js
@@ -1,10 +1,18 @@
 import React from 'react'
 
-export default ({ pathContext }) => {
-  const { slug } = pathContext
+export default ({ data }) => {
+  const post = data.markdownRemark
   return (
-    <div>
-      模板文件 {slug}
-    </div>
+    <div
+      dangerouslySetInnerHTML={{ __html: post.html }}
+    />
   )
 }
+
+export const query = graphql`
+  query BlogPostQuery($slug: String!) {
+    markdownRemark(fields: { slug: { eq: $slug }}) {
+      html
+    }
+  }
+`
```


这次修改的内容都在模板文件 blog-post.js 中，通过 context 机制传递过来的 slug 数据，可以在 graphql 查询中直接使用，markdownRemark 接口以文件路径为查询条件，可以拿到属于当前页面的 markdown 对应的 html ，再用 react 的 dangerouslySetInnerHTML 把这些 html 内容显示出来即可。

浏览器中，访问各个页面，都可以看到对应的 markdown 内容了。
