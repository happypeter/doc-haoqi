# 类似手机 app 的移动版布局

本节来制作一个类似原生应用的页面布局。header 和 footer 固定，主体内容可以滚动的那种。

### 使用 flexbox

index.html

```html
<body>
  <div class="wrap">
    <div class="header"></div>
    <div class="content">
      <p>
        lorem50
      </p>
      ...
    </div>
    <div class="footer"></div>
  </div>
</body>
```

html 页面中，添加 header content 和 footer 仨兄弟，父元素是 wrap 。content 内部多填充些文字，便于后面演示 scroll 效果。

src/css/common.scss

```
body {
  margin: 0;
}
```

common.scss 中进行样式重置。

src/css/layout.scss

```
.wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .header {
    height: 80px;
    flex-shrink: 0;
    background-color: $primary-color;
    border-bottom: 2px solid $accent-color;
  }

  .content {
    flex-grow: 1;
    overflow: scroll;
  }

  .footer {
    height: 80px;
    flex-shrink: 0;
    background-color: $primary-color;
  }
}
```

设置 wrap 的高度沾满屏幕，同时设置它为一个 flexbox 。这样，header 和 footer 中如果直接设置 height 就会失效，需要添加 flex-shrink 0 防止被压缩。content 设置为 flex-grow 1 ，沾满所有剩余高度。

浏览器中，可以看到布局效果了。
