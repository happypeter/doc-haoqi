# 概述

课程分成了七章，每章分几个小节，每个视频都做到简短实用，分别介绍 Chrome Devtools （ Chrome 开发者工具）的某一个特性。

### 什么是 Chrome Devtools

Chrome 开发者工具是 Chrome 浏览器内置的一系列 Web 创作和调试工具的集合。下面分别介绍一下几个大标签下的面板的作用：



### 各个面板的作用

- Elements ，元素，这里可以任意的操作页面 DOM 和 CSS ，方便改进页面的设计。
- Console，终端，这里可以打印开发过程中的报错信息，例如 console.log 的输出等，也可以作为命令行，输入命令来和页面中的 JS 代码交互。
- Sources，源码，通过设置断点来进行代码调试。
- Network，网络，了解页面请求和下载各个资源所耗费的时间，方面优化页面加载速度。
- Timeline，时间线，帮我们优化页面的运行性能，展示网站整个生命周期之上发生的各种事件。
- Profile，摘要，如果 Timeline 提供的信息不够，可以在这里获取性能相关的各项指标，例如检查内存泄漏。
- Application，应用，我们的 Web 应用可能会用到的一些浏览器功能，例如查看 local storage ，缓存信息。
- Securiy，安全，报告给我们该网站是否安全。
- Audits，审查，给我们一些优化建议。


上面内容参考了： https://developers.google.com/web/tools/chrome-devtools/ 。


### 可以进一步扩展

Devtools 还可以通过安装扩展来丰富功能，例如 React Devtools / Redux Devtools 。


### 参考资料

- [官方文档](https://developers.google.com/web/tools/chrome-devtools/)
- [中文文档](https://github.com/CN-Chrome-DevTools/CN-Chrome-DevTools)
