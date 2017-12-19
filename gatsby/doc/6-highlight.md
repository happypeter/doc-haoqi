# 实现代码高亮

用 prism 来《实现代码高亮》。

先来装包。

```
npm install --save  gatsby-remark-prismjs
```

安装了 gatsby-remark-prismjs ，这个插件要和 remark 配合到一起用，来看看怎么写配置，怎么来使用。

prism---

主要修改了三个文件。

1.md 中添加了一些代码。

gatsby-config.js 中， transformer-remark 插件的配置改写成了一个对象，options 中的 plugins 数组，添加 prismjs 插件。配置好之后别忘了重启 run develop 。

global.css 中，导入 prism 的 css 。


浏览器中，看到高亮生效了。
