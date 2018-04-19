# 动态读取 API

静态的把 API 内容编译进 html 有很多好处，但是有些时候，有些数据就偏偏不能这么做。例如咱们这里，点新建文件按钮后，跳转到所有文章页面，肯定能希望立即看到被提交的文章。好在 react-static 编译出的静态项目中，也一样可以有动态 API 调用的。

### 读取 API

查看 github 上对应的 [commit](https://github.com/haoqicat/react-static-way/commit/02b0cd1a6b1d767f43159ece51cb530935a8ca33)

走一个非常标准的 create-react-app 下的加载数据的流程即可。

浏览器中，可以看到打开 /posts 页面，依然是没有延迟的，数据是在页面加载之后独立去请求的。

### 使用 Table 组件

查看 github 上对应的 [commit](https://github.com/haoqicat/react-static-way/commit/9eaf405fb39757ad97f3c4e50c7cadf493945e86) 。

添加上蚂蚁设计的 Table 组件。

浏览器中，看到样式美观，同时翻页功能也没有问题。

### 体现加载状态

查看 github 上对应的 [commit](https://github.com/haoqicat/react-static-way/commit/329fb807893f6a47b3645eced18f10c9c49f2f19)

使用 `isFetching` 状态位体现加载状态，跟通常的 create-react-app 条件下也没有任何区别。

浏览器中，刷新页面，可以看到数据加载转轮图标。
