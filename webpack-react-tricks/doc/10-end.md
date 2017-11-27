# 进一步的学习思路

课程就进行到这里，Webpack 的基本使用是讲完了，应该说也是非常简单的。但是后续其实还有一些很重要的知识我们没有讲到。

### bundle.js 减肥

我们的 bundle.js 中因为编译进去了很多辅助开发的代码，所以暂时比较臃肿，习惯的做法是再创建一个 webpack.config.production.js 文件，里面的配置专门用来编译生成一个精简版的 bundle.js 用于产品化部署。

具体的操作方式可以参考下面几个资源：

- https://youtu.be/eWmkBNBTbMM?t=1704

- https://github.com/happypeter/ask/issues/4#issuecomment-167190409

bundle.js 之后，再做一下 gzip ，体积又能小很多。

### Code Splitting 分割 bundle.js

即使用上的前面的减肥技巧之后，有些项目因为比较复杂，bundle.js 就难免会比较大。为了提高首页加载速度，还可以用 Webpack 的强大的 Code Splitting （代码分割）功能，来把 bundle.js 分割成多个文件，按需要加载。


具体操作步骤可以参考：

- https://github.com/ruanyf/webpack-demos/blob/master/README.md#demo10-code-splitting-source

- [Code-splitting your way to better perf with Webpack in Totally Tooling Tips (S3, E15)](https://www.youtube.com/watch?v=QH94CXVv3UE)

- https://youtu.be/eWmkBNBTbMM?t=5365


### 优秀参考资料

- http://zhaoda.net/webpack-handbook/loader.html
- https://github.com/petehunt/webpack-howto
- https://github.com/ruanyf/webpack-demos
