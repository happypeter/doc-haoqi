# nodejs 为何学？如何学？

<!-- 注：校正过了  -->

最近我见人就鼓吹：不管前端后端开发，先切换到 nodejs 再说，下面给点详细理由。

### 为何要学 nodejs ？

首先如果我想要使用前端框架 react ，全栈框架 meteorjs ，那这些都是要基于 nodejs 才能用起来的。注意，会用到的其实不是 nodejs 底层的知识，而是基于 nodejs 的各种工具。但是本课程中我想鼓吹的是两个东西：npm 和 gulp 。

首先说 npm 。根据 [nodejs 官网](https://nodejs.org/en/) 上的说法：npm 是世界上最大的开源库生态系统。那你可能会说，nodejs 不是主要是服务器端的功能吗？那 npm 装得那些库是不是主要用于后台功能呢？错！npm 目前已经成了前端开发的必备利器了，功能远远超越 bower 。忘掉 bower 吧，她已经是过去了。有了 npm ，前端的那些 js 包，想装哪个就装哪个，而且 npm 是有真正完整的依赖关系管理策略，保证你的那些包都会安排的井井有条。

再说 gulp 。gulp 是要比 grunt 更好的前端”构建系统“（ build system ）。有哪些功能？后面会有详细的演示，这里 Peter 只是想说，不用构建工具的前端开发者，还是生活在石器时代的。

npm 和 gulp.js 也都是基于 nodejs ，所以，嗯，前端开发，也必须得先装上 node 再说。

### 如何学？

如果到网上搜一下 nodejs 的学习，会看到很多资料是关于 nodejs 基础知识的，包括：本地文件系统操作，非阻塞 IO 等这些基础知识，都是很革命性的理念呀。但是，对于新手 Peter 不建议从基础开始学 nodejs 的，因为底层的这些知识其实都偏服务器端，不常用。我推荐的思路巧合相反，从最简单表面化的应用开始学。当然，咱们课程中，就是按照这套思路来的。先学学用 npm 怎么装包，再写点简单的 gulp 脚本，在实际的前端开发中逐渐体会 node 带来的好处，培养一下感情。即使深入到了后端，我觉得也可以先从 meteorjs 这样的基于 nodejs 的框架开始入手学，会比较简单，容易见成效。

### 结语

好，就聊这些。