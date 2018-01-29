# 安装

[官网首页](https://code.visualstudio.com/)点 download for Mac 。 解压，拖拽到 ~/Applications 文件夹。这样如果系统上安装了 Alfred 的话，就可以通过 code 命令去呼出了。

### 添加 docker 图标

```
cd ~/Applications
open .
```

这样文件浏览器中可以看到 code 的图标。拖拽到 dock 上。

以后就可以通过点 dock 图标来打开 code 了。另外一种比较方便的方式就是用 Alfred 中执行 `open Desktop` 打开系统上的某个位置，文件浏览器中看到项目文件夹，用鼠标拖拽到 dock 上的 code 图标上，也能打开项目，这个方式也挺实用的。

### 添加系统命令

```
~ cd ~/bin
ln -s ~/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code
```

默认命令行找不着 code 命令，所以到用户主目录下的 bin 中，创建一下符号链接。

重启命令行，就可以用 code 命令打开项目了。
