# 连接 Github

一般情况下，我的每一个项目都是两份，一份是本地仓库（ local repository ），另一份放到 github.com 上，通常叫远端仓库（ remote repository ）。这不仅仅能让我感觉到有备份，晚上可以睡好觉了，同时这两个备份也是可以互相同步的，要同步的内容最重要的当然是版本了。git 功能虽然多，但是说白了就是来回折腾 commit ，要不怎么叫版本控制工具呢。

对于从 github 上 clone 下来的我自己的项目，默认的同步通道是通的，因为本地仓库中已经存放了远端仓库的地址。但是，对于自己在本地新建的项目，需要先把它放到 github.com 上。 在客户端界面的右上角，对于从 github.com 上 clone 下来的项目这里是 `sync`，但是对于 github.com 上没有对应远端仓库的本地仓库，这里就是一个 `Publish` 按钮。点一下，填写项目名，是的，项目名可以跟本地项目不一样，然后添加项目描述，猛戳 `Push Repository` 按钮，项目就发布到 github.com 上了。如果我的用户名是 happypeter，项目名叫 `coco` 。那在 github.com 上链接也很优美，就是 github.com/happypeter/coco ，现在我可以把链接分享给朋友，邀请他们一起参加项目开发。

![](http://o86bpj665.bkt.clouddn.com/gitbeijing/publish_repo.png)

注意在标号2的框里面，我可以把项目发布为私有项目，这个功能只对付费用户开放。

### 同步版本历史

在本地机器上做成一个或者是多个版本，这时候如何把这几个新版本推送（ push ）到远端仓库上面呢？在客户端中，很简单，就是点一下右上角的 `sync` 按钮就好了。

也有的时候，我在 github.com 上浏览我项目的内容，突然发现一个拼写错误，也就顺手在 github.com 上点 `edit` 按钮，直接修改做成版本了，这样就等于 github.com 上的远端仓库比我本地多了新版本，这时候我也需要把这个版本拽（ pull ）到我本地机器上，也是在客户端点一下 `sync` （ 同步 ） 按钮就好了。

稍微梳理一下，本地和远端，也就是我自己的笔记本跟 github 服务器上两个对应仓库的沟通方式就是下面这张图

![](http://o86bpj665.bkt.clouddn.com/gitbeijing/sync.png)

同步代码的时候，有时候会有代码冲突（ conflicts ），需要手动来解决。这个涉及到分支的概念，后面再聊。


### 命令行中完成

如果是从 github.com 上 clone 项目

```
git clone git@github.com:happypeter/coco.git
```

那么这样的项目内修改，然后做成版本，是可以通过 git push 命令直接上传的。

但是，如果我本地有一个新项目，就需要执行

```
git remote add origin git@github.com:happypeter/project.git
```

也就是添加远端仓库地址到本地配置中，然后才能执行

```
git push
```

上传修改内容。

### 总结

更多客户端使用技巧请参考[官方帮助](https://mac.github.com/help.html) 。
