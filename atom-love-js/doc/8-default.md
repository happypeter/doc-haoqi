# 默认补齐行为

敲一个的触发词，让编辑器去帮我们自动补齐成一个长字符串，甚至是很长的一段代码。这个是日常开发必备技能，开发者不是打字员。

### 当前 buffer 已有字符串

比如当前文件前面已经敲过一遍 mystring 了，后面只有敲 my<tab> 或者  mys<tab> 就可以补齐成 mystring 了。

### 预装的 snippet

例如 markdown ，后续课程中会演示如何自建 snippet 。注：snippet 就是“小片段”的意思。

打开一个 .md 文件，注意此时编辑器右下方显示 Github Markdown ，这个代表当前文件类型，如果文件类型不是这个那么 markdown 相关的补齐就不工作了。

- 输入 i ，补齐成 **
- 输入 img ，补齐成 ![]()

可以到 命令面板->snippet avaiable 查看当前文件类型下都有哪些 snippet 可以用。

可以到 settings -> packages -> language-javascript 这个包的配置页面去查看所有的 snippet 。

在打开一个 .js 文件

- 输入 i ，可以补齐成 if 语句格式
- 输入 s ，可以补齐成 switch 语句格式

可以到 settings -> packages -> language-javascript 这个包的配置页面去查看所有的 snippet 。

### 新插件中的 snippet

跟前面的 atom 自带插件的 snippet 一样，很多后续我们自己安装的第三方包也会自带 snippet ，例如 emmet/react ，后续视频中会演示。
