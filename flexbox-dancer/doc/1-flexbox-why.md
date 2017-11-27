# 为何 Flexbox 时代已经到了

Flexbox 已经可以产品化使用了，如果您的客户群体是比较年轻新锐化的。

### Flexbox 让复制布局变得简单

传统上我们用 float 来设置布局，但是会带来恼人的副作用，需要用 clearfix 这样的复杂技巧去弥补。Flexbox 来了，一切变得简单。

[css-tricks 上的 flexbox 指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### 浏览器兼容

比较新的各个移动版浏览器，包括 Chrome 等比较新的浏览器对 flexbox 都有很好的支持。如果不是太老的微信中，flexbox 也没有问题了。到 <http://caniuse.com> 上看一下，唯一有问题的就是 IE ，但是 IE 是一个即将推出历史舞台的东西了，不用担心。

注意：根据 [css-tricks 的文章](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) ，IE10 是支持 flexbox 的，但是用的语法是 `display: flexbox` 而不是主流通用的 `display: flex` ，这个不用我们自己操心，想 autoprefixer 这样的工具会自动帮我们处理的。

### 实际使用

- [可汗学院](https://www.khanacademy.org/)
- [laracasts.com](https://laracasts.com/)