# 响应式图片

响应式开发中使用图片有两点比较重要：图片宽度一般设置为 100% 不用绝对像素单位，另外一点，小屏幕和大屏幕设备上可以加载图片的不同版本。


### picture 标签

```
<picture>
  <!--[if IE 9]>  <video style="display: none;">  <![endif]-->
  <source srcset="/assets/content/grid/first-news-case-study-desktop-ef000fca2e476654d5c904a48d8d531b8ec4641845ab1460cb422d7d4702a2dd.jpg" media="(min-width: 1024px)">
  <source srcset="/assets/content/grid/first-news-case-study-tab-80f76e161962b3ca5d7583a73dfaaef3a3a463bf8965ba1ccc5677c7ae3b89ba.jpg" media="(min-width: 768px)">
  <source srcset="/assets/content/grid/first-news-case-study-mob-559de80a3258afb390fb2d1bf1411403e23c5f13f2cf08e9fecf0f73d87fdf26.jpg" media="(min-width: 568px)">
  <source srcset="/assets/content/grid/first-news-case-study-4fc09bdfcdfdca848446432928db9eef484b6aadfad86e80d86f605549dad6f7.jpg" media="(max-width: 568px)">
  <!--[if IE 9]>  </video>  <![endif]-->

  <!--[if IE 9]> <img srcset="/assets/content/grid/first-news-case-study-4fc09bdfcdfdca848446432928db9eef484b6aadfad86e80d86f605549dad6f7.jpg" alt="first-news" class="spacer">  <![endif]-->

  <!--[if !(IE 9)]><!-->  <img alt="first-news" class="spacer">  <!--<![endif]-->
</picture>
```


### 参考

- [demo#ch9-res/04-img](https://happypeter.github.io/bianguaishou-page/demo/ch9-res/04-img/)
