# 响应式导航

屏幕足够宽的时候，让底部导航，也就是 footer ，变成侧边栏。

src/layout/default.html

```html
 <div class="footer">
   <div class="title">Peter's Corner</div>
```

当 footer 变成 sidebar 的时候， header 会被直接隐藏，所以把网站标题也写到 `footer` 这里。

src/css/layout.scss

```
.footer {
  .title {
    display: none;
  }
  ...
}


@media (min-width: 700px) {
  .wrap {
    flex-direction: row;
    .header {
      display: none;
    }
    .footer {
      .title {
        display: block;
        text-align: center;
        font-size: 18px;
        color: white;
        border-bottom: 2px solid $accent-color;
        line-height: 70px;
      }
      order: -1;
      height: auto;
      flex-direction: column;
      flex-basis: 300px;
      a {
        padding: 20px;
        flex-grow: 0;
        font-size: 16px;
        flex-direction: row;
        line-height: 25px;
        svg {
          margin: 4px;
          margin-right: 8px;
          width: 17px;
          height: 19px;
          filter: none;
        }
      }
      a.active {
        border-bottom: 0;
        background-color: $primary-color-dark;
      }
    }
  }
}
```

调整 css ，默认让网站标题处于隐藏状态。只有当屏幕宽度大于 `700px` 的时候才显示出来。同时发生的事情就是 footer 也变成了 sidebar ，所以有不少的 css 样式需要被覆盖。

浏览器中，看到 footer 的确是可以变成侧边栏的。
