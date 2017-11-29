# 本地安装 Git

来在本地安装一下 Github for Mac 客户端，演示一下基本的登录和克隆项目的操作。并行的，本节的后半部分就用命令行的形式来完成相同的操作。


### 安装客户端

到 [官网](https://desktop.github.com/) 可以下载得到 Mac 或者是 Windows 的客户端。注意：客户端之中封装了 git ，所以即使系统上没有安装 git ，客户端也是可以运行的。

安装过程没有什么可说的，就是基本的下一步下一步。安装之后，要用我们在 github.com 网站上的用户名密码登录进来，这样未来才能执行修改 github.com 上的项目数据的操作。


![](http://o86bpj665.bkt.clouddn.com/gitbeijing/githubformac.jpg)


客户端中固化了 git 使用的日常工作流，操作简单直观，但是远没有命令行中功能灵活。


### 客户端中 clone

往客户端里面添加项目仓库有三种方式。点击上图箭头所指的 `+` 号，就可以看到了，也就是下面图中的 `Add`，`Create`，`Clone` 这三种形式。

![](http://o86bpj665.bkt.clouddn.com/gitbeijing/mac_create.png)

前两种后面再说，现在先说 clone 这一招。很简单，就是从 github.com 上我们自己的账号下，直接克隆仓库到我本地机器。


### 安装 Git 到命令行

Mac 系统下安装 Git 可以通过 [Homebrew](http://brew.sh/) ，把 homebrew 安装到 Mac 系统之后，执行

```
brew install git
```

然后执行

```
➜  ~  git --version
git version 2.5.1
```

如果能报出版本号，证明 git 安装已经成功了。

注意，这里安装的 git 和前面图形客户端包裹的 git 无关。


### 命令行中 clone 项目


clone 一个项目的关键就是要找到 github.com 上这个项目仓库的地址。地址有两种形式，一种是 SSH 的，一种是 HTTPS 的。使用 SSH 形式的地址需要涉及到 ssh key 的配置，这个咱们的后续视频中会有专门的介绍。所以为了简便，我们先使用 HTTPS 形式的仓库地址

```
git clone https://github.com/happypeter/gitbeijing.git
```

这样就可以了。

注意： HTTPS 形式 clone 下来的项目，如果后续修改了，每次上传都要输入密码，所以还是比较麻烦，实际中 Peter 是很少用的。


### 总结

好，介绍了两种在本地安装和使用 Git 的形式。这一集先到这里。
