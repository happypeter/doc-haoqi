# 安装 nodejs

安装 node 有多种方式的，其中用 nvm 来装效果最好。

### 安装 nvm

参考 [nvm 的 README](https://github.com/creationix/nvm) ，执行下面的命令：

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

这样 nvm 就安装好了，要重启一下 shell 才有 nvm 这个命令。

### 安装 nodejs

```
nvm ls-remote
```

可以看到当前最新 node 版本是 `v9.8.0` ，运行下面的命令来安装：

```
nvm install v9.8.0
```

命令行中，

```
node -v
```

可以看到 `9.8.0` 版的 node 已经安装好了。
