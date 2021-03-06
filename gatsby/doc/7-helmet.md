# 用 Helmet 实现动态 title

现在我想要在不同页面打开时把博客标题显示到页面的标签 title 中，而 helmet 就是用来在设置 HTML 的 head 标签内的各项信息的，所以本集来《用 Helmet 实现动态 title 》。

### 获取 title 数据

先来《获取 title 数据》。

```
src/templates/blog-post.js
@@ -4,9 +4,13 @@ import Link from 'gatsby-link'
 
 export default ({ data, pathContext }) => {
   const post = data.markdownRemark
+  const { title } = data.indexJson
   const { prev, next } = pathContext
   return (
     <Wrap>
+      <Title>
+        {title}
+      </Title>
       <div className='markdown-content'
         dangerouslySetInnerHTML={{ __html: post.html }}
       />
@@ -29,10 +33,13 @@ export default ({ data, pathContext }) => {
 }
 
 export const query = graphql`
-  query BlogPostQuery($slug: String!) {
+  query BlogPostQuery($slug: String!, $pid: String!) {
     markdownRemark(fields: { slug: { eq: $slug }}) {
       html
     }
+    indexJson(id: {eq: $pid}) {
+      title
+    }
   }
 `
 
@@ -59,3 +66,8 @@ const Wrap = styled.div`
     flex-grow: 1;
   }
 `
+const Title = styled.div`
+  font-size: 20px;
+  text-align: center;
+  font-weight: 600px;
+`
```



修改两个文件。

gatsby-node.js 中把页面 id ，也就是 pid 通过 context 机制传递到页面中。

页面模板组件 blog-post.js 中，可以在 graphql 查询中使用 pid ，传递给 indexJson 接口来拿到当前博客的 title 。组件中可以通过结构 data.indexJson 拿到 title ，先把它作为大标题显示出来。

浏览器中，可以看到各个博客页面已经能看到标题了。

### 使用 Helmet

这里的 title 数据要想显示为 html 的 head 中的 title ，就要《使用 Helmet 》了。

```
npm install --save gatsby-plugin-react-helmet react-helmet
```

gatsby-plugin-react-helmet 这个插件可以让我们在 gatsby 代码中使用 react-helmet 了。具体代码怎么写呢？


```
src/templates/blog-post.js
@@ -1,6 +1,8 @@
 import React from 'react'
 import styled from 'styled-components'
 import Link from 'gatsby-link'
+import Helmet from 'react-helmet'
+
 
 export default ({ data, pathContext }) => {
   const post = data.markdownRemark
@@ -8,6 +10,7 @@ export default ({ data, pathContext }) => {
   const { prev, next } = pathContext
   return (
     <Wrap>
+      <Helmet title={title} />
       <Title>
         {title}
       </Title>
```


gatsby-config.js 中把配置添加进来。

blog-post.js 中，导入 Helmet ，然后把当前博客标题作为 Helmet 组件的 title 属性传递进去即可。


到浏览器中，打开每篇文章看一下，title 可以动态显示了。
