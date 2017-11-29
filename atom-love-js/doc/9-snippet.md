# 创建自己的 snippets

切换文件类型到 js ，看到更多的 snippet ，如果安装了一些插件，例如 [react](https://github.com/orktes/atom-react) ，这些插件中还会有自带的很多 snippet 也会列出。


### 创建自己的 snippet

命令面板 -> open your snippet ，创建一个文件叫 snippets.cson 。

敲 snip<tab> 可以补齐成一个 snippet 的骨架。

后续可以在 settings 页面打开 config folder 找到这个文件，很多 Unix 开发者喜欢比较原始的感觉，可以直接来修改这个文件。

如果文件类型一项填写 `*` 那么创建的这个 snippet 就会在所有类型的文件中找到。


### 找到各种后缀的文件类型

alt-cmd-p 报告当前文件的文件类型的写法。例如当前是 .md 文件，敲这个快捷键可以得到 source.gfm 。
