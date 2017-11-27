# 为何离开 Sublime Text ？

前面几年我一直在推广 sublime text 编辑器，现在我已经正式的切换到了 atom ，所以我欠大家一个解释，所以今天就来说说 atom 优于 sublime 的地方。

### sublime 没有的硬性功能

首先，atom 在 ubuntu 下面可以输入中文的，而 sublime 则不行。 其次，同样都是有包仓库，但是 atom 支持 apm 命令行装包，方便高效。最后，atom 由 github 公司开发，对 git 的支持自然很棒，例如，没有保存到 git 历史的内容会高亮显示。

### 为 JS 开发者而生

atom 自身用 nodejs 写成。底层的运行环境是 [electron](electron.atom.io) ，其实就是个浏览器。atom 的各种功能其实都是用 HTML/CSS/JS 这些技术来写的。[Electron 之上甚至可以做 React 开发](https://github.com/chentsulin/electron-react-boilerplate)。Atom 的作者都是 nodejs 开发者，当然 atom 的很多默认功能都是以最适合 JS 开发为出发点的。


补充一句：虽然暂时 sublime 启动更快，但是由于 atom 架构合理，用 js ，所以写插件容易，无门槛，生态活跃。看看 electron 在 github 上的 star 数量增长，就知道 electron 跟 react native 一样都是未来。

### 细节更贴心

第一，打开每个包的配置页面，会感觉非常的舒服。其次，创建一个 snippet 的过程，以及 snippet 的保存位置，都非常的优雅。 最后，对 JS 开发者的日常的工作流的支持，例如 markdown 里面输入 i ，可以自动补齐成 img ，不用配置。


### 结论

Atom 在功能方面明显优于 Sublime ，目前 Sublime 唯一的优势是运行速度。但是如果你的机器配置够好的话...


### 参考链接

- http://t.imooc.com/learn/333
