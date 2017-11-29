# 删除仓库


本节介绍如何删除一个仓库，包括在 github.com ，也包括命令行中，或者是 Github For Mac 客户端中。


### 客户端中删除

要删除一个仓库，就到下图左侧列表的项目名字上，右击，然后点 `Remove` 就行了。简单说说另外几项，[Atom](https://atom.io/) 是 github 公司开发的开源免费的代码编辑器，`Terminal` 是命令行终端，`Finder` 是文件浏览器。

![](http://o86bpj665.bkt.clouddn.com/gitbeijing/remove_repo.png)


### 命令行中删除

只需要

```
rm -r project
```

就一切干净了，所有因为所有的本仓库的配置，包括改版历史，包括一切一切，都放在了 project/.git 文件夹之中，系统让的任何其他地方都没有被修改，所以删除之后，也不会有任何污染。


### 到 github.com 上删除仓库

到项目主页，例如：https://github.com/happypeter/gitbeijing 。


Settings -> Danger Zone -> Delete This Repository

设置 -> 危险区域 -> 删除这个仓库。


### 总结

知道怎么删除，动手实验起来就不怕留下很多垃圾了。
