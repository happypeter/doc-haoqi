# 解释一下 clearfix


前面介绍的 Micro Clearfix Hack 的方案其实不太容易看懂，这里来解释一下，主要涉及[伪元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements)的技巧。


### 问题有答案，本节不用看

- :after 和 :before 是什么意思？
- :after 中如何设置内容？
- 默认 :after 是 inline 还是 block 元素？


注意：::after 表示法是在 CSS 3 中引入的,:: 符号是用来区分伪类和伪元素的.支持 CSS3 的浏览器同时也都支持 CSS2 中引入的表示法 :after 。

### 参考资料

- [::after](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)
