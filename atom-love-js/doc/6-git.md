# git

git 操作我一般都是在命令行里直接操作的，因为非常熟练了。


### 配置 vim 做默认编辑器

我的 .gitconfig 如下

```
➜  ~  cat .gitconfig
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
```

如果 vim 用得不熟，可以直接把上面的 vim 改为 atom 。


### 编辑器内的 git diff 高亮

未保存到 git 版本中的内容会高亮显示，查看默认安装的 gitdiff 这个 package 。

### 忽略文件

写入 .gitignore 中的文件，会在文件树形图以及文件 fuzzyfinder 中会被忽略的。

另外 .git 中的内容也会被 fuzzyfinder 忽略的。

这两项设置都是 Atom 初装默认，可以去 命令面板 -> Settings View 中去查看。
