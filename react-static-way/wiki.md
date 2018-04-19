https://haoqicat.com/antd-v2

### 为何不用 ant-design-pro ？

* https://github.com/ant-design/ant-design-pro/
  * 使用 DVA 框架，里面用的是 redux-saga/elm 思想等很高端的东西
  * 编译输出代码分割
    * https://pro.ant.design/docs/deploy-cn
    * 官方部署的例子，最大的文件也是 780k ，应该是 gzip 过的，不理想
  * 使用 roadhog 做代码构建，一个 create-react-app 的可定制版
  * 可以逐步学习各种技巧

### 定制主题应该有

### 目标

### 最大的遗留问题

打开页面上有七个导航项目，即使有预加载，但是如果网速慢，而且立即去点，也会有卡顿的。

理想情况下：

应该显示一个 github/youtube 那样的 Progress 表示页面正在加载中。

解决方法：

* https://github.com/nozzle/react-static/issues/295#issuecomment-358093191
* https://github.com/nozzle/react-static/blob/master/docs/methods.md#onloading
* https://timber.io/ 用的就是 react-static ，实现了页面加载转轮

* https://github.com/benjycui/bisheng/blob/master/packages/bisheng/src/routes.nunjucks.jsx#L79
  * 使用 onEnter 和 nprogress

### 搜索

https://github.com/nozzle/react-static/issues/366

其实对于需要 SEO 的页面，有没有 redux 倒不是最重要的。
