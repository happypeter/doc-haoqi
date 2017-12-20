# 通过修改 html.js 添加 favicon

这里参考 reactjs.org 的源码中的方法来《通过修改 html.js 添加 favicon》

首先把 html.js 从缓存区拷贝出来。

```
cp .cache/default-html.js src/html.js
```

以后 gatsby 就会实用 src/html.js 中的内容了，下面来添加 favicon 进来。

9db1cf9--favicon

先把图片放到 src/assets/favicon.png 位置，然后到 html.js 中导入图片并在 link 标签中使用。

到浏览器中，看到 favicon 就出现了。
