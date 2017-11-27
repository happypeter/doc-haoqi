# 利用 Github 上传代码

项目部署的第一步是如何把代码（包含后续不断的更新）上传到服务器，尽管 scp/ftp/rsync 都可以完成这个操作，但是更为流行的做法是把代码上传到 github.com，然后再 clone 到服务器之上。


### 申请 aliyun 服务器


Peter 用的是 aliyun.com ，也可购买腾讯云。选择 产品 -> 弹性计算 -> 云服务器 ECS 。

系统选择 Ubuntu 。一般一个月100块钱左右。购买后会获得一个公网 IP，例如 182.92.203.18


登录服务器

```
ssh root@182.92.203.18
```

然后输入购买的时候，填写的 root 用户密码就可以了。一般上去之后，可以另外创建一个普通用户，例如 peter 。


### 设置域名指向

然后，到自己的域名提供商（ godday.com/万网 )，那里做一个域名指向。例如我把 haoqicat.com 和 182.92.203.18 绑定到一起了。

所以，我就可以这样登录

```
ssh peter@haoqicat.com
```

### 服务器上 clone 代码

注意要先生成 ssh key ，然后上传到 github.com 的 deploy keys 区域。这样才能方便的 clone 代码：

```
cd sites
git clone xxx
```
