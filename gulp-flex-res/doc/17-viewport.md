# viewport 设置

### 问题是什么？

任何设备都按照 960 的宽度来显示，造成很多设备上字体变成了原来的 1/3 。

### 解决方案

http://facebook.github.io/react/ 采用的解决方案是：

```
<meta name="viewport" content="width=device-width">
```

viewport 就是浏览器窗口。这个设置翻译成大白话就是：浏览器呀，你就按照你的自然宽度来来给我显示网站就行了，不要自作聪明。

这样就解决了上面所说的问题了。意思是把我的视窗 viewport 的宽度，设置为设备的实际宽度，比如说前面提到的 iphone5 ，本来默认视窗宽度是 960px ，那么有了这一行设置之后，视窗宽度就变成了设备实际宽度了 320px 。这样后面再来显示页面元素，当然就不会缩小了。

但是更为常见的设置是：

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

很多知名的网站都是用了上面的设置，例如 http://alistapart.com/ ，

### 这个就够用了？

Yes ，够用了。根据 css-tricks 的这篇文章 ie10 的 snap mode 上，还有 window phone 8 上这样是不行的，但是有多少人是在移动设备上用 ie 的呢？
