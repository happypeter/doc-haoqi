# ~/.gitconfig


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


这一集来聊聊，每一项的作用。
