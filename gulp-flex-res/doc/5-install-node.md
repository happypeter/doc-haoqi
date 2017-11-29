# 安装 nodejs

安装 node 有多种方式的，但是都用了一下，发现还是用 nvm 来装效果最好，后续可以避免很多麻烦。

### 安装

参考 [nvm 的 README](https://github.com/creationix/nvm) ，执行下面的命令，我用的是 Mac 但是 ubuntu 系统上应该也是一样的操作：

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
```

这样 nvm 就安装好了，可能要重启一下 shell 才有 nvm 这个命令。

查看都有哪些版本可以安装：

```
nvm ls-remote
```

可以看到当前最新版本是 v5.10.1 ，运行下面的命令来安装：

```
nvm install v5.10.1
```

现在再来安装一个包，看看会被安装到什么位置：

```
$ npm i -g gulp
/Users/peter/.nvm/versions/node/v5.10.1/bin/gulp 
```

可以看到 gulp 这个包安装到了 `/Users/peter` 之下。并且可执行文件也自动导出为系统命令了，可以通过运行下面的命令来确认：

```
$ which gulp
/Users/peter/.nvm/versions/node/v5.10.1/bin/gulp
```

### 设置默认版本

一个小问题，每次启动新 shell ，Node 还是老版本。如何写死成最新安装的 NVM 版本：

```
$ nvm alias default 5.10.1
default -> 5.10.1 (-> v5.10.1)
```

### 让 npm 使用淘宝镜像

nodejs 安装好之后，npm 这个装包命令也就装好了。npm 命令因为要从国外的服务器下载包，有时候速度不给力，所以这里给一个备选方案：自制一个 cnpm 命令，其实就是一个连接国内淘宝镜像的 npm 命令啦。

到 [taobao 相关页面](http://npm.taobao.org/)，找到下面的命令：

```
$ echo 'alias cnpm="npm --registry=https://registry.npm.taobao.org \
  --cache=$HOME/.npm/.cache/cnpm \
  --disturl=https://npm.taobao.org/dist \
  --userconfig=$HOME/.cnpmrc"' >> ~/.zshrc && source ~/.zshrc
```

打开自己的命令行，来执行一下。注意：如果您使用的是 bash （ Mac 和 ubuntu 系统的默认 shell ）请把上面的 .zshrc 替换为 .bashrc 。

cnpm 跟 npm 用起来没有任何区别，可以放心使用。
