# 如何在 Coding.net 上操作多个分支？

来介绍如何在一个 coding.net 的仓库中，创建多个分支。

### 创建仓库

参考视频中的操作。

### 创建本地项目

具体步骤，在创建的这个空的 coding.net 仓库的页面上都有介绍的。

```
mkdir coco
cd coco
echo "coco" > README.md
git add README.md
git commit -m“first commit"
git remote add origin git@git.coding.net:happypeter/coco.git
git push -u origin master
```

把上面的命直接都拷贝下来，然后到命令行中一粘贴，就会全部执行一遍了。这样本地项目就有了。

### 推送多个分支

思路是这样：

- 首先在本地创建一个新的分支，例如 dev
- 然后执行 `git push -u origin dev` 就可以在远端仓库也创建一个 dev 分支了

`-u` 是 `--upstream` 的缩写，意思是”上游“。

### Peter 自己的 ~/.gitconfig 文件

```
[user]
  email = happypeter1983@gmail.com
  name = Peter Wang
[core]
  editor = vim
[alias]
  ci = commit -a -v
  st = status
  br = branch
  throw = reset --hard HEAD
  throwh = reset --hard HEAD~
[push]
  default = simple
```

### 补充一下

视频中没有介绍到的一个技巧。如果 coding.net 上的一个有多个分支的项目，我 clone 到我本地，这时候我执行

```
git branch
```

默认只能看到 master 分支，那么如何在本地切换到 dev 分支呢？

```
git checkout dev
```

就可以了。
这样就可以了。