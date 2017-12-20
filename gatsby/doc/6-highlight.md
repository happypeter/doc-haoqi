# 实现代码高亮

用 prism 来《实现代码高亮》。

先来装包。

```
npm install --save  gatsby-remark-prismjs
```

安装了 gatsby-remark-prismjs ，这个插件要和 remark 配合到一起用，来看看怎么写配置，怎么来使用。

```
data/posts/1.md
@@ -1,3 +1,20 @@
 ### 新的部分
 
 给你看看我的**新鲜**代码。
+
+```js
+const path = require(`path`)
+const { createFilePath } = require(`gatsby-source-filesystem`)
+
+exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
+  const { createNodeField } = boundActionCreators
+  if (node.internal.type === `MarkdownRemark`) {
+    const slug = createFilePath({ node, getNode, basePath: `pages` })
+    createNodeField({
+      node,
+      name: `slug`,
+      value: slug,
+    })
+  }
+}
+```
gatsby-config.js
@@ -7,7 +7,14 @@ module.exports = {
         path: `${__dirname}/data/`
       }
     },
-    'gatsby-transformer-remark',
+    {
+      resolve: `gatsby-transformer-remark`,
+      options: {
+        plugins: [
+          `gatsby-remark-prismjs`
+        ]
+      }
+    },
     'gatsby-transformer-json'
   ]
 }
src/assets/global.css
@@ -1,3 +1,5 @@
+@import 'prismjs/themes/prism-solarizedlight.css';
+
 body {
   margin: 0;
 }
```


主要修改了三个文件。

1.md 中添加了一些代码。

gatsby-config.js 中， transformer-remark 插件的配置改写成了一个对象，options 中的 plugins 数组，添加 prismjs 插件。配置好之后别忘了重启 run develop 。

global.css 中，导入 prism 的 css 。


浏览器中，看到高亮生效了。
