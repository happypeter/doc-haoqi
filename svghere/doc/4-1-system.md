# 图标系统制作的基本方法

其实像 fontawesome 这样的字体图标自己手动制作还是挺麻烦的，不像 svg 在 AI 里随便拽拽，导出就行了。所以如果遇到 fontawsome 中没有的就傻眼了。另外字体图标确实有很好的兼容性一直到 IE6，而 svg 要从 IE9 开始支持，但是打开 fontawesome 的下载包，可以看到里面有 svg/eot/woff/woff2 等各种格式，而且每个格式里面都包含所有图标，所以或多或少的会影响加载速度的。svg 对比起来就是简单轻便很多了，而且在 https://css-tricks.com/icon-fonts-vs-svg/ 可以看到 svg 在很多角度还有更多好过字体图标的地方。

前面介绍了，直接用 img/background 的形式来使用 svg，但是这样不太好设置鼠标滑过等各种效果。后面介绍了直接把 svg 写到页面中的，页内 SVG ( inline svg ) 这种形式，虽然功能强大，但是会让 html 代码看起来比较乱。所以这章介绍如何制作“图标系统”( icon system ) 。

下面是定义和使用图标系统的基本代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    .andriod {
      fill: red;
      width: 40px;
      height: 40px;
    }
    .andriod:hover {
      fill: green;
    }
    .balance {
      fill: red;
      width: 40px;
      height: 40px;
    }
  </style>
</head>
<body>
  <svg style="display: none">
    <defs>
      <symbol viewBox="0 0 24 24" id="andriod">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
      </symbol>
      <symbol viewBox="0 0 24 24" id="balance">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"/>
        </symbol>
    </defs>
  </svg>

  <svg class="balance">
    <use xlink:href="#balance"></use>
  </svg>
  <svg class="andriod">
    <use xlink:href="#andriod"></use>
  </svg>
</body>
</html>
```
