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

实现这里的这些架构功能，但是不深入各种具体业务功能

关注于：

* 预加载
* 代码分割
* SEO
* antd 按需加载

具体业务部分，依然放到 antd-v3 中去开发。

* 代码是静态编译的，这个首先是 SEO 优化，对于后台系统，这一点不重要
* 但是静态编译的结果，打开页面不需要后端代码运算，所以一定是最佳的打开速度。
* 同时 react-static 模式就与预加载功能。
* 单页面的各种效果依然得到保留，例如路由跳转，不会造成整个页面刷新。
