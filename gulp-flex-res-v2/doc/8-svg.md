# 添加 svg 图标

来给 header 和 footer 中添加图标。

### 使用 svgo 优化 svg

下载 svg 就到 iconfont.cn

```
npm i -g svgo
cd svgs
svgo *
```

安装 svg 优化工具 svgo ，进入存放 svg 的文件夹，执行优化操作，去除不必要的代码。

### 添加 css

使用 svg 最佳的策略是内联使用，这样的方式，颜色大小甚至阴影都可以自如的用 css 来设置。所以这里把 svg 代码直接粘贴到 html 中的合适位置即可。

具体的 css 代码我们这里就不演示了。可以访问[课程代码仓库](https://github.com/haoqicat/gulp-flex-res-v2)获得源码。

浏览器中，看到显示出了最终效果。
