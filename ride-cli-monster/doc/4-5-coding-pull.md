# 下载项目到服务器

演示如何把 coding.net 上的项目下载到 ubuntu 服务器之上。设计到 git 软件的安装， git clone/pull 两个命令，也设计到 ssh key 的添加问题。

### clone 项目到服务器

```
sudo apt-get update
sudo apt-get -y git
git clone git@git.coding.net:happypeter/project.git
```

每次项目有更新

```
cd project/
git pull
```

### 总结

现在，我们的 project/ 的项目代码已经可以上传到服务器了，下一步就是来设置 nginx 来让网站上线了。