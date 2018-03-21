# flexbox 制作流体网格

流体网格是响应式布局的一大技巧，这集来用 flexbox 制作网格。

src/layout/default.html

```html
      <a href="work.html">
```

这次要添加的页面是 work ，先到布局文件中把链接加上。

src/pages/work.html

```html
<div class="course">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>
```

然后添加页面详情，暂时就是一个父元素 `course` ，里面包含多个 `card` 。

src/css/main.scss

```
@import 'common';
@import 'layout';
@import 'work';
```

最重要的部分是添加对应的 css 。

src/css/work.scss

```
.course {
  margin: 0 auto;
  padding: 16px;
  .card {
    height: 140px;
    background-color: $accent-color;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
    margin: 20px;
  }
}

@media (min-width: 1000px) {
  .course {
    display: flex;
    flex-wrap: wrap;
    .card {
      width: calc(50% - 40px);
    }
  }
}

@media (min-width: 1200px) {
  .course {
    .card {
      width: calc(33.33333% - 40px);
    }
  }
}
```

首先设置手机上的默认样式，`course` 居中，设置一下 padding 。里面的各个 `card` 都设置一下高度，因为暂时没有内容么。flexbox 有个好处就是，未来各个 card 中填充了内容，同一行上的各个 card 即使内容多少不一，但是各个 card 都会按照高度最大的那个 card 为基准来设置高度。现在给 card 添加一些背景阴影和边距，这样展示美观一些。

下面，当屏幕宽度大于 `1000` 的时候，我们希望同一行上显示两个 card 。同时网格能自动换行。所以添加了 `flex-wrap: wrap` ，下面的卡片宽度设置为父元素宽度的一半，减去 card 自身左右 margin 之和。

再下面，当屏幕宽度大于 `1200` ，同一行上显示三个 card 。这时候宽度就是父元素宽度的三分之一减去左右 margin 之和。

浏览器中，拖拽视窗，可以看到流体网格工作良好。
