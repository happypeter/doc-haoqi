# 更多相关技巧

使用了图标系统之后，也是是一样可以用 css 来控制局部颜色的。 比如在 http://useiconic.com 上就可以看到彩色的成套图标。

独立 defs 文件的 IE 兼容问题。如果你想把图标定义部分单独放到一个文件中也是可以的。这样这个文件可以进行缓存，可以提高加载速度。但是问题是不仅仅是 IE9 以下的浏览器，即使是 IE11 也不支持这种用法。好在，已经有好心人写了 js 来解决这个问题了

https://github.com/jonathantneal/svg4everybody 。

另外一个问题是，手动构建 defs 内容略微有点麻烦，没关系有自动化的工具在。例如： https://github.com/FWeinb/grunt-svgstore 。
