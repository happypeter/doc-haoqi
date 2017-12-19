# 生成博客目录

这集来《生成博客目录》。

### 解析 JSON

目录信息我把它存到一个 json 中，所以先要学会《解析 JSON》。

来安装另一个 transformer 。


```
npm i gatsby-transformer-json
```

它的作用就是解析 json 。现在写代码来使用插件解析 json 数据。


allIndexJson----


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

show-index---

只需要修改 pages/index.js 即可，导入 Link 和 styled-components ，拿到 data 数据，并且结构赋值把 data.allIndexJson.edges 赋值给 posts 常量。下面 map 一下，拿到每一篇 post ，post 的 id 做 key ，同时利用 post 的 id ，通过字符串拼接获得各个链接指向，每个链接显示文章标题。用 styled-components 对 Link 添加了一下样式，所以就有了这里的 styledLink。

浏览器中，可以看到博客目录可以工作了。如果再有一个下一篇的功能，就更爽了。

### 实现下一篇功能

现在来《实现下一篇功能》。

prev-next---

主要工作都在 gatsby-node.js 中完成，首先拿到所有文章数组，map 一下，从当前博客的页面链接中获得博客 id 存放到 pid 常量中，生成 next ，也就下一篇的链接，主要看的这是不是最后一篇博客，如果是就赋值为 null ，否则就是下一篇博客的链接。对于 prev ，如果当前博客是第一篇了，就赋值为 null ，否则就赋值为上一篇博客的链接。

到模板文件 blog-post.js 中，结构 pathContext 拿到 prev 和 next ，下面判断如果 prev 不是 null ，那就显示 Prev 链接，指向的就是上一篇页面路径。下一篇的处理方式完全一样。

其他几个地方的修改都是对样式的处理。重启一下 run develop 。

到浏览器中，点开任意一篇博客试试，上一篇和下一篇的功能都实现了。
