# 部署代码到网络服务器

本节来介绍如何申请阿里云 ECS 服务器，如何在 ubuntu 系统下添加 peter 这个用户，以及基本的 Nginx 配置。达成的效果，就是让咱们拥有第一台自己的服务器，并且跑一个基本的网站起来。

### 阿里 ECS + Ubuntu 操作系统

要买服务器，也不是只有阿里一家。原来我用国外的 Linode 和 DigitalOcean ，用国外服务器的好处就是域名不用备案，但是后来发现速度确实不是太理想，就全面转 aliyun.com 了。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic20-1-aliyun.png)

Aliyun 这边咱们需要的是购买他的 ECS 服务，最低配的也就几十块钱一个月，但是如果要跑 Rails/Meteor 这样的大一点的框架，推荐还是把内存升到 4G 比较好，也没有多少钱。

买的时候，会让我们选择操作系统类型。Peter 这里没二话，直接上 Ubuntu Linux ，这个我从 2008 年一直用到现在，不仅仅我自己最熟悉，而且在创业这个圈子内也是各款 Linux 中最流行的一款，网站的文档好找。 另外，虽然已经是 2016 年了，Ubuntu 最新的一个长期支持版 16.04 ，也就是今年四月的 LTS 版，出来了。但是 Peter 推荐最好还是用上一个 LTS 版，14.04 ，原因就是大家用得久了，各种问题都磨合得很好了。16.04 等明年高手踩踩坑，积累一些文档再说。一个长期支持版的支持期是五年，所以14.04的支持器是到2019年呢。

### 创建普通用户

首先在服务器上创建一个和自己开发机上一样的同名用户，比如在开发机上 whoami 的输出是 peter ，那就到服务器上也创建一个同名的用户。具体创建方法是

```
adduser peter --ingroup sudo
```

`--ingroup sudo` 的意思是，新用户 `peter` 属于一个名为 `sudo` 的组，这样可以保证 peter 这个用户可以拥有超级用户权限。把服务器上的当前用户由默认的 root （也就是超级用户，一般不建议直接用超级用户身份进行所有操作），切换为 peter ，具体做法是：

```
su peter
```

注意：后续所有的操作都以 peter 用户的身份来做。

执行命令

```
cd
```

注意 `cd` 后面没有任何参数，这样就可以到达 `peter` 这个用户的用户目录 ，在 ubuntu 系统上这个位置是 /home/peter ，可以用 pwd 命令打印当前位置来确认一下

好，ubuntu 服务器的后续管理工作，就在这个点上继续。

### 免密码登录

现在还是比较烦人的一个问题是，每次从开发机登录服务器的时候，都要输入密码。下面给出解决方法。

首先来到开发机上，执行

```
ssh-keygen
```

注意：这里是 ubuntu 系统，但是其他 Linux 系统，或者 Mac 系统上操作也是一样的。

这样，会在 `~/.ssh/` 文件夹之下生成__一对__ ssh key ，包括一个 public key 和一个 private key 。现在我们需要做的就是把 public key 拷贝到服务器上的约定位置，这样就可以实现免密码登录了。具体操作步骤是：

首先，用编辑器（ vim 或者 sublime ） 打开 id_rsa.pub 文件，这里看到的一串数也就是所谓的 public key 了。然后，小心拷贝整个字符串（注意末尾不要多拷贝一个回车）到剪切板。

接下来，登录到服务器，到达自己的用户目录（在我的情况下就是 `/home/peter`），如果这里还没有 .ssh 文件夹（文件夹在 Unix 环境下就是指目录），那就自己创建一下：

```
mkdir .ssh
```

然后跳转到这个文件夹之内：

```
cd .ssh
```

使用 vim 编辑器来创建一个文件

```
vim authorized_keys
```

注意上面的文件名千万不能拼错。然后，在打开的问题中，输入 `i` ，进入 vim 的__插入模式__，然后敲鼠标中键（滚轮键），把剪切板中的 public key 粘贴到该文件中。然后，敲 `ESC` 退出 vim 的插入模式，再敲 `ZZ` 保存退出。

好，这样，我们开发机器的一个“信物”就在服务器上保存好了，这样就可以实现免密码登录了。来试试吧。

__Ctrl-d__ 退出服务器，回到开发机的 bash 命令行，输入


```
ssh haoduoshipin.com  # 或者也可以是 IP 地址
```

这样，如果前面操作没有问题，就会自动登录到服务器了。


### 代码上传到 coding.net

开发机之上，我们的代码都放在一个 git 仓库之内。比如，仓库的名字叫做 `happy-js-monkey` 。那么如何把这些代码上传到 coding.net 之上呢？

首先，要在自己的开发机上生成 ssh key ，参考前面。然后把 public key 添加到 [ssh key 设置页面](https://coding.net/user/account/setting/keys) 把这个 key 添加上。这样后续的代码就可以通过 ssh 协议，进行上传（ git push ）和下载（ git pull 或者 git clone ）了，过程中需要要密码了。

代码放到了 coding.net ，后续每次部署，直接从 coding 上 `git pull` 代码到服务器上就可以了。默认 Ubuntu 上没有 git ，安装参考下一部分。

### 安装软件

ubuntu 系统上安装软件很简单，用下面的命令即可安装 `git` 和 `curl` 两个软件：

```
sudo apt-get -y install git curl
```

### 设置 nignx 服务器

我们的 ubuntu 服务器上，默认应该已经安装好了 nginx 服务器（注意，两个服务器的概念是不同的，前者是一台硬件，后者是一个软件）。现在比如我有一个文件夹叫做 mysite ，里面有一个 index.html （还可以有其他的文件，但是 index.html 必须有）。那么如何把这个文件夹中的内容作为一个网站项目呈现出来呢？需要涉及到 nignx 服务器的设置问题。

- 首先，把项目放到自己想要的位置，推荐的位置是用户目录下，例如我这里放到 `/home/peter` 下。
- 然后就要设置 nginx 让它知道这个位置。
- 进行 nginx 配置的修改需要超级用户权限，所以先让 peter 化身为超级用户，执行下面命令，然后输入 peter 的密码即可。这样我们当前用户就是 root 了，可以用 `whoami` 命令确认。

```
sudo su
```
  
- 然后就可以到 nignx 的配置文件所在的文件夹

```
root@iZ2558q33soZ:/home/peter# cd /etc/nginx/sites-enabled/
```

- 然后来创建一个配置文件

```
vim mysite.conf
```

- 在这个文件中，粘贴如下内容

```
server {
  listen 80 default;
  server_name example.com;
  server_name localhost;
  gzip on;

  root /home/peter/mysite;
}
```

注意：上面有 `default` 字样，这个在一台服务器上只能出现一次，也就是只能有一个 `server` 是__默认__ 的，不然重启 nginx 的时候就会报错。

- 保存之后，需要重启一下 nginx 

```
service nginx reload
```

这样，到 example.com （或者直接输入 IP ）就可以看到 mysite/index.html 中的内容了。当然，前提是 DNS 设置已经做好了。DNS 配置的知识前面的章节中我们介绍了。


![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic20-2-nginx.png)

### 总结

这样，我们自己的一个真正的网站就有了。本部分的内容的实际演示大家可以在 [《驾驭命令行怪兽》](http://haoqicat.com/ride-cli-monster)课程中看到。