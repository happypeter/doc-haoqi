# Chrome 开发者工具

Web 开发者工具是网站开发者用来调试自己的代码的一套工具。它跟 IDE 不同，不是用来创造网站的，而是主要用来调试。Chrome ，火狐，Safari 等多种浏览器都有自己的开发工具，其中火狐的 firebug 还曾经是这个领域的霸主，但是时至今日，Peter 唯一推荐的就是 Chrome 浏览器自带的开发者工具，简称 Chrome Devtools 。

### Devtools 的主要功能点

Chrome 的 Devtools 就是用来调前端页面的，可以用来操控 HTML ，CSS ，DOM 和 JS 。目前 Devtools 正变得越来越强大，拥有移动设备模拟等各项功能。

打开 Chrome ，页面中右击->检查，就可以打开 Devtools 了，如下

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic11-1-devtools.png)

主要有以下几个功能标签：

- Elements 元素，用来查看页面 HTML 标签元素
- Console 终端，执行命令 API ，或者直接执行 JS 代码
- Sources 源码，查看网页代码
- Network 网络，记录联网活动
- Timeline 时间线，性能调试
- 另外还有 Profiles Resources Security Audit 几个标签，不是太常用

### Elements 和 Console 两个最常用

Elements 标签下，可以操作 HTML 和 CSS ，可以检查各种 CSS 的错误，或者直接修改 HTML/CSS 实时看到页面显示效果。Console ，中文意思是终端，终端有很多种，在这里的是 Javascript 终端，里面可以直接运行 JS 代码，例如我们脚本中的代码出了问题，可以拿出特定的语句，敲进终端来直接执行看效果。

Peter 点评：灵活使用这两个标签，是一个 JS 摩登开发者的最低要求。会使用 Elements 标签来查看人家高手写的页面，就能直接看到人家的 html/css 的局部代码了，这个也是学习写网页的一个重要手段。

### 命令行接口

Devtools 的命令行接口包括一系列的函数方法用来实现一些日常任务：例如选择和检查 DOM 元素，格式化输出数据，监控 DOM event 等。 要注意的是，这些接口只能在 Console 中用，写到页面脚本中是不管用的。 参考[google 官方文档 Commandline API](https://developers.google.com/web/tools/chrome-devtools/debug/command-line/command-line-reference?hl=en) 。

Peter 点评：这部分功能随用随学就行，我自己日常用到的也不多。

### 远程调试

远程调试，英文叫 Remote Debugging 。很多时候，Devtools 的”设备模式“模拟出来的移动设备（例如 iphone6 ），跟实际的设备还是有一些差异的。所以响应式页面有的时候还是要连到真实的设备上去调试。好在，Devtools 是有远程调试功能的，让我们可以在笔记本上调试运行在手机上的页面，如下图

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic11-2-remote.png)

详细内容参考 [google 官方文档 Remote Debugging Devices](https://developers.google.com/web/tools/chrome-devtools/debug/remote-debugging/remote-debugging?hl=en) 。这部分功能对应 Andriod 手机设备是比较容易设置的，毕竟 chrome 和 andriod 都是一家公司的。但是苹果手机连接笔记本进行这种远程调试，目前还比较不成熟（相关的一个[项目](https://github.com/google/ios-webkit-debug-proxy)）。Peter 自己也没有真正跑起来过，但是会不断跟进的。如果您那边已经实现了这个操作，请微信通知 Peter ，我会及时更新本文档的。

### 参考

- <http://www.frontendhandbook.com/learning/browser-dev-tools.html>
- <http://discover-devtools.codeschool.com/>