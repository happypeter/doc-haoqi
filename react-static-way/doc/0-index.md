### 使用到的技术

* react-static: 摩登静态化，或者叫 JAM 技术栈，最近最流行的框架有两个一个叫 gatsby ，好奇猫之前的课程中有介绍了。React-Static 是另外一个，它跟 gatsby 最大的区别是工作流更加类似于 create-react-app 。所以上手更容易。
* 静态编译 API ：所谓静态化，不仅仅是把 react 组件编译成静态 html ，实现 SEO ，也意味着把 API 数据也编译进 HTML ，这样网站就不依赖于数据库和 API 而运行了，加载速度更快，网站也更不容易被攻击，因为实在没有什么可以被攻击的。
* 动态加载 API ：当然有些数据必须是动态加载的，这个也是可以通过一种所谓混合组件的形式来做到的。
* 代码分割：静态编译的内容，天然的以页面为单元进行了代码分割。
* 预加载：同时 react-static 也可以通过预加载的形式，来提升次级页面的访问速度。
* webpack: react-static 中可以灵活的修改 webpack 配置，课程中通过对蚂蚁设计组件库的使用，演示了 react-static 条件下，实现组件按需加载和覆盖主题文件，加载 less 各种功能。
* redux：即使是编译成纯静态页面后 redux 也依然是可以使用的。
* 部署：最后展示了一个基于 阿里云和 nginx 的部署过程，搭建静态服务，配置 gzip 压缩。

### DEMO

* 因为是静态编译，所以首页打开速度自然可以达到最快。 仔细看一下 Network 标签下，尽管使用了蚂蚁设计组件库，每个页面实际下载的数据量也都是很小，基本都是几十 K
* 关于页面，同时已经被预加载了，所以打开的时候，是没有任何延迟的。
* 关于页面中的文本内容，其实是来自于 API 的，但是这里已经编译成了静态 html 内容，实现了 SEO 。
* 由于 redux 和 react-router 的这些库依然可以正常工作，所以认证和页面导航跟 create-react-app 条件下的项目没有太多区别。
* 页面导航是没有任何问题的，整个导航过程中，页面也一样是没有刷新的。
* 到“所有文章”页面，看到这里的数据是动态加载的，能够实时的显示 API 的当前数据。
