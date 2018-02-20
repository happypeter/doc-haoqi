# 创建 gitbook 项目

学会了 markdown 语法，再保证系统上已经安装了 git ，就可以来上手 gitbook 了。

### 安装 Gitbook

根据[官网说明](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md) 。

```
npm i -g gitbook-cli
```

首先全局安装 gitbook-cli 这个包。

```
mkdir gitbook-demo
cd gitbook-demo
gitbook init
```

重启一个命令行窗口，然后，创建一个项目文件夹，进入文件夹，执行初始化操作。

这样，可以生成两个文件

* 一个是 README.md ，写到其中的内容会显示在书皮上
* 另一个 SUMMARY.md ，里面写目录

```
gitbook serve
```

启动一个服务器，然后到 localhost:4000 端口，就可以看到这本书了。
