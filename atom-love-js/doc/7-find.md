# 快速查找

快速找到自己想要的文件或者字符串是开发者的一个很常用的能力。


### 打开文件

Ctrl-P 启动 fuzzyfinder ，这样就可以使用模糊查找功能了。

跟 sublime 一样，默认 .git .svn 的东西就是不会被列入打开文件的范围的，如果想自己添加 node_modules 或者其他文件夹，
可以到 settings -> Ignored Names 里面手动设置。


### 查找字符串

查找当前文件中的字符串，就用 cmd-f ， 就跟在浏览器中一样。

cmd-d 也算字符串查找技巧。

全项目中查找替换字符串，就是用 shift-cmd-f 。

https://github.com/atom/find-and-replace 是默认就安装的包，查找字符串的相关功能都是这个包提供的。
可以到 Settings -> Packages -> find-and-replace 查看更多快捷键或者修改默认配置。例如：

- 在右侧窗格中打开搜索结果
- 自动滚动到搜索结果处

勾选上还是都挺好用的。
