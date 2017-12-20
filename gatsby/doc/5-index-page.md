# 生成博客目录

这集来《生成博客目录》。

### 解析 JSON

目录信息我把它存到一个 json 中，所以先要学会《解析 JSON》。

来安装另一个 transformer 。


```
npm i gatsby-transformer-json
```

它的作用就是解析 json 。现在写代码来使用插件解析 json 数据。

```
data/index.json
@@ -0,0 +1,18 @@
+[
+  {
+    "id": "1",
+    "title": "第一篇博客标题"
+  },
+  {
+    "id": "2",
+    "title": "第二篇博客标题"
+  },
+  {
+    "id": "3",
+    "title": "第三篇博客标题"
+  },
+  {
+    "id": "4",
+    "title": "第四篇博客标题"
+  }
+]
gatsby-config.js
@@ -7,6 +7,7 @@ module.exports = {
         path: `${__dirname}/data/`
       }
     },
-    'gatsby-transformer-remark'
+    'gatsby-transformer-remark',
+    'gatsby-transformer-json'
   ]
 }
```


data/ 文件夹下添加了 index.json 文件夹来存放目录数据。里面存放了各个博客的 id 和 title 。

同时 gatsby-config.js 中添加了插件名称。

到浏览器中，打开 graphiql 界面，刷新一下，添加了 json 插件后又多了两项数据用来取一项数据信息的 indexJson 和取所有信息的 allIndexJson ，这里的 Index 显然是由文件名 index.json 决定的。

发出查询

```
{
  allIndexJson {
    edges {
      node {
        id
        title
      }
    }
  }
}
```

就可以读出所有的信息了。页面上点 Prettify ，然后拷贝查询代码，准备粘贴到项目中。

### 实现博客目录

数据到手，就可以来《实现博客目录》了。

```
src/pages/index.js
@@ -1,3 +1,43 @@
-import React from "react"
+import React from 'react'
+import Link from 'gatsby-link'
+import styled from 'styled-components'
 
-export default () => <div>Hello peter!</div>
+export default ({ data }) => {
+  const { edges: posts } = data.allIndexJson
+
+  return (
+    <ul>
+      {
+        posts.map(p => (
+          <StyledLink key={p.node.id} to={`/posts/${p.node.id}`}>
+            {p.node.title}
+          </StyledLink>
+        ))
+      }
+    </ul>
+  )
+}
+
+export const pageQuery = graphql`
+  query IndexQuery {
+    allIndexJson {
+      edges {
+        node {
+          id,
+          title
+        }
+      }
+    }
+  }
+`
+
+const StyledLink = styled(Link) `
+  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
+  display: block;
+  line-height: 40px;
+  padding-left: 10px;
+  color: rgba(0, 0, 0, 0.87);
+  &:hover {
+    background: rgb(232, 232, 232);
+  }
+`
```


只需要修改 pages/index.js 即可，导入 Link 和 styled-components ，拿到 data 数据，并且结构赋值把 data.allIndexJson.edges 赋值给 posts 常量。下面 map 一下，拿到每一篇 post ，post 的 id 做 key ，同时利用 post 的 id ，通过字符串拼接获得各个链接指向，每个链接显示文章标题。用 styled-components 对 Link 添加了一下样式，所以就有了这里的 styledLink。

浏览器中，可以看到博客目录可以工作了。如果再有一个下一篇的功能，就更爽了。

### 实现下一篇功能

现在来《实现下一篇功能》。

```
gatsby-node.js
@@ -4,11 +4,11 @@ const { createFilePath } = require(`gatsby-source-filesystem`)
 exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
   const { createNodeField } = boundActionCreators
   if (node.internal.type === `MarkdownRemark`) {
-    const slug = createFilePath({ node, getNode })
+    const slug = createFilePath({ node, getNode, basePath: `pages` })
     createNodeField({
       node,
       name: `slug`,
-      value: slug
+      value: slug,
     })
   }
 }
@@ -28,13 +28,20 @@ exports.createPages = ({ graphql, boundActionCreators }) => {
           }
         }
       }
-    `).then(result => {
-      result.data.allMarkdownRemark.edges.map(({ node }) => {
+    `
+    ).then(result => {
+      const { edges: posts } = result.data.allMarkdownRemark
+      posts.map(({ node }) => {
+        const { slug } = node.fields
+        const pid = Number(slug.split('/')[2])
         createPage({
-          path: node.fields.slug,
+          path: slug,
           component: path.resolve(`./src/templates/blog-post.js`),
           context: {
-            slug: node.fields.slug
+            slug,
+            pid,
+            next: pid === posts.length ? null : `/posts/${pid + 1}`,
+            prev: pid === 1 ? null : `/posts/${pid - 1}`
           }
         })
       })
src/layouts/index.js
@@ -1,19 +1,42 @@
-import React from "react"
+import React from 'react'
 import Link from 'gatsby-link'
 import '../assets/global.css'
 import styled from 'styled-components'
 
 export default ({ children }) => {
   return (
-    <div>
+    <Wrap>
       <Header>
         <Link to='/'>首页</Link>
       </Header>
-      {children()}
-    </div>
+      <MainWrap>
+        <Inner>
+          {children()}
+        </Inner>
+      </MainWrap>
+    </Wrap>
   )
 }
 
+const Wrap = styled.div`
+  height: 100vh;
+  display: flex;
+  flex-direction: column;
+`
+
+const MainWrap = styled.div`
+  flex-grow: 1;
+  position: relative;
+`
+
+const Inner = styled.div`
+  position: absolute;
+  top: 0;
+  left: 0;
+  right: 0;
+  bottom: 0;
+`
+
 const Header = styled.div`
   line-height: 40px;
   padding: 10px;
src/templates/blog-post.js
@@ -1,11 +1,30 @@
 import React from 'react'
+import styled from 'styled-components'
+import Link from 'gatsby-link'
 
-export default ({ data }) => {
+export default ({ data, pathContext }) => {
   const post = data.markdownRemark
+  const { prev, next } = pathContext
   return (
-    <div
-      dangerouslySetInnerHTML={{ __html: post.html }}
-    />
+    <Wrap>
+      <div className='markdown-content'
+        dangerouslySetInnerHTML={{ __html: post.html }}
+      />
+      <Nav>
+        <div>
+          {
+            prev &&
+            <Link to={prev}>Prev</Link>
+          }
+        </div>
+        <div>
+          {
+            next &&
+            <Link to={next}>Next</Link>
+          }
+        </div>
+      </Nav>
+    </Wrap>
   )
 }
 
@@ -16,3 +35,27 @@ export const query = graphql`
     }
   }
 `
+
+const Nav = styled.div`
+  background: #00bcd4;
+  padding: 10px;
+  color: white;
+  display: flex;
+  justify-content: space-between;
+  a {
+        color: white;
+    display: block;
+    padding: 10px;
+  }
+`
+
+const Wrap = styled.div`
+  height: 100%;
+  display: flex;
+  padding-top: 20px;
+  flex-direction: column;
+  .markdown-content {
+    padding: 20px;
+    flex-grow: 1;
+  }
+`
```


主要工作都在 gatsby-node.js 中完成，首先拿到所有文章数组，map 一下，从当前博客的页面链接中获得博客 id 存放到 pid 常量中，生成 next ，也就下一篇的链接，主要看的这是不是最后一篇博客，如果是就赋值为 null ，否则就是下一篇博客的链接。对于 prev ，如果当前博客是第一篇了，就赋值为 null ，否则就赋值为上一篇博客的链接。

到模板文件 blog-post.js 中，结构 pathContext 拿到 prev 和 next ，下面判断如果 prev 不是 null ，那就显示 Prev 链接，指向的就是上一篇页面路径。下一篇的处理方式完全一样。

其他几个地方的修改都是对样式的处理。重启一下 run develop 。

到浏览器中，点开任意一篇博客试试，上一篇和下一篇的功能都实现了。
