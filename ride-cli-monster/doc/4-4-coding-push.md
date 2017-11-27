# 上传代码到 coding.net

本节介绍如何把写好的代码上传到 coding.net ，主要涉及到 git push 命令和 ssh key 的添加。


### 步骤

先到 coding.net 上创建项目，项目名称就和本地保持一致。然后本地要进行的操作是

```
cd project/
git init
git add -A
git commit -a -m"hello"
git remote add origin git@git.coding.net:happypeter/project.git
git push -u origin master
```

但是这一步操作会失败，报错是

```
...
permission denied(publickey)
...
```

### 添加 ssh key 到 coding.net 服务器

把本地的 id_rsa.pub 中的内容，粘贴到 coding.net 上的账号设置区域就可以了。

### 总结

这样，我们的项目就上传到 coding.net 了，下一集来介绍如何在服务器上从 coding.net 下载这个项目。