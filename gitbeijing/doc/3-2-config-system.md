# 配置系统

今天来聊聊 ~/.gitconfig 里面的秘密，以及除了这个位置，其他还有那些地方可以配置 git 。

### 全局配置

我的 ~/.gitconfig 文件内容如下：


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

就是这些了。

### 项目内配置


到 .git/config 之中也可以进行配置


### 命令行中设置更为简单的别名

我的 .zshrc 文件中有

```
alias ga="git add -A"
```
