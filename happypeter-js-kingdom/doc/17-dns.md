### DNS 设置

全栈开发者其实也有人称之为 Everything Developer ，意思是什么你都得会一点。Peter 自己的思路也是，学编程应该像学习日常技能一样，由粗到细。最基本最常用的技能一定还是要会的。今天要聊的 DNS 设置其实就属于一个非常简单，非常有用的小技巧。目的就是让我申请的域名和我在阿里云上申请的主机的 IP 绑定起来。

### 网站上线的步骤

代码有了，那么从 github.com 上的一个仓库，到可以访问的一个网站还差几步呢？

- 第一步，去 godaddy.com 上购买一个域名（我也有域名是在 domain.com 上买的，国内的有阿里的万网也是买域名的），例如 haoduoshipin.com
- 第二步，去阿里云上买一个 ECS 服务器（通常也被俗称 VPS ，虚拟主机），这样会获得一个有公网 IP 的 ubuntu 服务器。每个月就几十块钱。例如我的 ECS 的 IP 是 123.57.61.54
- 第三步，把 github.com 上的仓库 clone 到 ubuntu 服务器上
- 第四步，配置 nginx ，安装 JS/PHP/Ruby/数据库 等各种基础环境，最终在浏览器地址栏敲 123.57.61.54 ，可以访问到这个网站了。这个就是所谓的__项目部署__过程。
- 第五步，这就涉及到 DNS 设置了，其实就是看怎么把 haoduoshipin.com 和 123.57.61.54 绑到一起。


![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic17-1-dns.png)

注： DNS 的全称是 Domain Name Service ，也就是域名服务，这个服务是通过遍布全球的 DNS 服务器去完成的。发挥的作用就是，每次用户输入一个域名，那么这个请求先要到 DNS 服务器上找出域名对应的 IP ，然后有了 IP 地址，才能真正去访问网站。

### 一个真实的操作过程


首先到 godaddy.com 上，找到 haoduoshipin.com 这个域名，点”设置“，找到 DNS 设置的界面。注意，这里我们使用 godaddy.com 的 DNS 服务器，所以 NameServer （也就是域名服务器）这一项就保留默认。这样，可以点开 DNS 标签，进行真正的 DNS 设置了


![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic17-2-a-record.png)

全部的操作其实就是在“DNS 区域文件”中，添加两个 A 主机记录，分别是 `@` 和 `*` 。 其中 `@` 就代表 haoduoshipin.com 这个域名，而 `*` 代表 *.haoduoshipin.com ，也就是后续 qd.haoduoshipin.com www.haoduoshipin.com 等等这样的子域名都会指向这个 IP 了。 当然，也可以添加其他的子域名进来，同时不同的子域名可以指向不同的 IP 。

### 生效时间

那么设置之后多久会生效呢？答案是不一定，要看用户所在区域。因为 DNS 全球都很多台形成层级关系的服务器，同时在国外设置过的 DNS 同步到国内的 DNS 服务器也需要时间（出现过 godaddy.com 设置之后，国内的朋友发现必须翻墙才能访问网站）。所以 Peter 自己测试的结果是，有时候设置几分钟就生效，有的要一两天。还有一次我设置域名之后，发现三天后，在我自己的家里 ping 一下，还是没成功。然后我 ssh 到我的 aliyun 服务器上再去 ping ，发现很早就绑定好了。这个可能跟各种 ISP 的 DNS 缓存机制有关。但是又过了一天，还是成功了。 所以简单来讲就是不要太着急就好了。


### 总结

会设置 DNS 是让自己网站上线的多个步骤中的其中一步，其他的想 ubuntu Linux 基本上传操作，nginx 服务器配置，本文中暂时不涉及。