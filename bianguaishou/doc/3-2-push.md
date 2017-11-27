# 上传代码到项目仓库

本节演示如何进行本地的版本控制操作，并把本地新版本的文件上传到 github 的对应仓库之中。

### 问题有答案，本节不用看

- git remote add orgin 是什么意思？
- 上传代码到 Github 上的仓库，需要执行什么命令？
- 本地的一个项目，如何变成一个仓库？


### 操作步骤

下面的步骤可以把，一个普通的项目，变成一个仓库，并制作版本

```
git init
git add -A
git commit -m"commit msg"
```

上传

```
git remote add origin xxx
git push -u origin master
```
