# 压缩 css 加快页面加载

gulp 的世界一旦打开，好的工具就都唾手可得。比如我们想把自己的 CSS 在部署到产品服务器上之前，做一下压缩，那应该用什么工具呢？


### minifycss 压缩 CSS 文件

[gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css) 这个包可以用来把 CSS 文件进行压缩（去掉换行空格等没用的字符，提高页面加载速度）。

### purifycss 去除没用的 CSS 代码

[purifycss](https://github.com/purifycss/purifycss) 可以帮我们去除 html/js 页面中根本就没有用到的 CSS 代码（死代码？），想想，如果咱们的项目中用了 bootstrap.css ，肯定会有很多 css 代码是没用的。

不过很奇怪，这个项目几个月没人维护了，而且对应的 [gulp-purifycss](https://github.com/purifycss/gulp-purifycss/commits/master) 处于 "build failing" 状态，所以咱们还是暂时不用了。

### 结语

其他处理 CSS 的包还有吗？如果您知道，微信给我哈！
