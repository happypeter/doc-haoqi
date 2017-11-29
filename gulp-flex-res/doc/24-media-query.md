# 使用 media query

### 导航功能

添加一些 js 代码进来，就可以实现移动版页面的导航功能了，代码如下

[mobile-nav](https://github.com/happypeter/flex/commit/e2fe2749c25c56d6a55ea88a794c3607c8305bbf)

上面这些代码跟咱们的响应式主题关系不大，就不讲了。下面进入 media query 的学习。

### 基本用法

基本代码如下：

```
@media (min-width: 600px) {
  ...
}
```

一个有意思的事实：如果按照移动优先的思路，min-width 会覆盖几乎全部的使用场景。max-width 几乎可以不用。

### 临界点选择

临界点没有固定值可以推荐，因为设备尺寸目前已经太多了。而是根据自己内容展示需要自己“找”出来的。”找“的方法很简单：拿出移动版页面，拉伸宽度，直到页面大布局或者某个元素本身变得很难看了，那么就是给它设置一个临界点的时候了。

参考 [google developers](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/how-to-choose-breakpoints?hl=en#pick-minor-breakpoints-when-necessary)
