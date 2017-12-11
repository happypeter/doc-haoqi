# Git 不得不用的几点原因

Git ，是超级大师 Linus 的作品，是一个版本控制工具，用来控制代码或者其他任意文字材料的改版历史。即使对新入编程的朋友，Peter 也建议立即就学习 Git ，同时 Peter 从 2007 年到现在每天都会用到 Git 。那为何 Git 如此重要呢？本文中我给出几点最大的理由。

### 第一点：Undo Mistakes 撤销错误修改

是人就会犯错。代码写错了，可不像一篇文档中我们写错字了那样，只要点一下 undo 撤销操作，就可以直接回到修改前的样子。为啥？因为代码调试中实现一个功能我们通常要修改多个文件，那么这个时候，如果我们发现代码不对，想要 undo 就没有那么容易了。好在，有了 Git 进行版本控制之后，每次修改之后我们只要保存一个版本（ commit ），这样，如果我们发现任意的一个 commit 的代码有问题，就可以运行 Git 命令，来删除那个 commit 。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic13-1-commit.png)

这样，commit 中我们修改的所有的地方就会被 undo 了，日常开发中这个功能，Peter 每天都会用上几十次。知道世界上有后悔药吃，历史可以重写，这就是 Git 带给我们的超能力，让我们调试代码的时候更加大胆。

### 第二点：学习使用开源项目

现在已经不是造轮子的时代了，项目开发基于几十个甚至更多的他人的开源项目是再正常不过的事情了。那么哪里是世界上最大的开源项目托管平台呢？ Github.com ，上面的数以百万计的项目我们都可以直接拿到自己的项目中来用，但是前提是需要我们会 Git 的基本操作。另外，开源世界的特点是，每一个小功能，一般都有多于一个的项目可以来实现，那么如何进行类似项目的优选呢？目前很流行的一个做法就是看这个项目在 Github 上的 Star 数量。如果两个项目 Star 数目相差悬殊，那么显然是 Star 数目大的项目更受大家欢迎，同时社区支持也会更好了。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic13-2-star.png)

比如，我们用 Nodejs ，我们要安装的 npm 包，基本上都是开源托管在 Github 之上了，如果我们有 Git 版本控制技巧，就可以很方便的学习和使用这些开源项目了。

### 第三点：备份代码

代码备份是一个开发者的基本素质。但是表面上简单的事情实际执行起来确实不简单，但是现在有了 Git 和 Github ，一切变得从容。第一，增量备份，每次上传到 Github.com 上的只是这次修改的内容，上传快，而且改版历史清晰。第二，离场备份，一份代码在我们自己的笔记本上，一份在人家公司的服务器上，很难想象这两个位置会同时着火或者被盗，导致代码丢失。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic13-3-backup.png)

代码备份到 github.com 这样的平台上，另外一个好处就是方便项目部署。今天很多 JS 项目都是采用 Git 来部署代码的，比传统的 ftp/scp/rsync 等各种方式要专业得多。

### 第四点：协作项目

首先，如果没有版本控制，没有改版历史线，那队友之间连彼此都修改了什么内容都很难找到，还谈什么合作。所以，使用版本控制工具 Git 来管理代码是明智之举。

Git 有非常好的分支模型，可以方便的让多个开发者并行开发一个项目，最后把不同分支上的代码再融合（ merge ）到一起。Github.com 或者 Coding.net 上面还有专门的功能来管理讨论，合并请求，展示最近更新等各种功能，项目协作开发从未如此轻松。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic13-4-merge.png)

Github 就是一个程序员的社交网站。开源软件如果只是把代码放在那里，如果不便于学习，其实也不是真正的开放，。在 Github 上，项目都有详细的文档，有问题还可以通过 Github 向作者提问。

### 国内就用 Coding.net

Github 可以说是全世界开发者的聚集地，是知名项目的宝库，这一点很难被撼动了。但是，在国内使用 Github.com 有时候会比较慢，所以 Peter 有一些项目目前托管到 coding.net 之上了。速度快，而且也很好用。

### 进一步学习

Peter 的 [《Git 北京》](http://haoqicat.com/gitbeijing) ，希望大家喜欢。