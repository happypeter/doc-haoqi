# 安装和启动 Atom 的正确姿势

聊聊安装 atom 的过程，然后介绍 atom 启动，打开项目的几种实用姿势。


### 安装

Deepin Linux 上可以用 apt-get 直接安装：

```
apt-get install atom
```

Mac 上直接到 atom.io 首页下载安装包，用鼠标安装即可。Windows 上应该也是类似的。


### 命令行启动

命令行中启动，还是 Peter 最常用的一种姿势

```
cd project/
atom .
```

可以打开当然的 project 。

注意：如果命令行中找不到 atom 这个命令，可以用 Atom -> install shell commands 这个 menu 项目重新安装一下命令。

### 用 Alfred

安装了 [Alfred](https://www.alfredapp.com/) 的朋友可以跟我一样，用 find myproject 先把需要打开的项目找到，然后拖拽到 atom 中打开这个项目。
