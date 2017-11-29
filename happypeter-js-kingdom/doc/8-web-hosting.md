# 网站托管

我们写好自己的网站之后，需要找一个服务器托管的地方。我自己当年写完第一个网站，花了一万块钱买了一个刀片机，托管到了北京的一个机房里面，每年还要另交钱，调试一点东西有时候还得自己过去机房，贵而且不方便，所以真是犯二了。今天给出这篇讲解，然后给出适合您自己的建议。

### 什么是网站托管

老外叫 Web Hosting ，简单一句话来讲：网站托管就是把我自己写的网站，私人的或者是公司的，放到一个托管服务提供商的服务器上，最终实现敲个域名就能打开的效果。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic8-1-hosting.png)

网站托管服务器的类型现在已经很多了，独立专用服务器，VPS ，大型弹性云服务等等。对于初学者，最适合的是 VPS 。下面我们会详细一些聊。

除了找到合适的托管服务器，网站托管还涉及到域名申请和配置 DNS 的过程，我们本篇不做详细介绍，后面有专门的章节。

###  Virtual Private Server (VPS)

个人网站，包括小型创业项目最佳解决方案就是直接买 VPS ，一个字：便宜好用。

VPS，虚拟私有服务器，就是人家把一台真正的硬件服务器上的资源分成多个虚拟的，从用户使用角度来看是独立的几个服务器，然后把其中一个虚拟服务器（也就是一个 VPS ）卖给你。这样的好处是：第一，便宜，因为是分割出来的；第二，软件角度是独立的，我可以直接往 VPS 上安装操作系统和任意自己的软件，所以自定制性是无限的。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic8-2-ecs.png)

VPS 这个概念随着云计算的发展慢慢字面意思变得不是那么严谨了，但是很多人一般把这一类的服务还继续叫 VPS 。比如 [阿里云的 ECS](https://www.aliyun.com/product/ecs/?spm=5176.383338.201.13.NzjoJD) 我也叫 VPS 。目前阿里的 ECS 是我自己创业的主力网站托管平台。

另，[ECS 的帮助文档](https://help.aliyun.com/product/8314827_25365.html?spm=5176.750001.2.1.1cE7hC) 。

### 还是使用国内的 VPS

国外类似的 VPS 服务提供商自然也有很多，基本上价格都是几美元到几十美元一个月，我自己用得最多的是 [linode](https://www.linode.com/) 和 [digitalocean](http://digitalocean.com/)。使用国外 VPS 的好处就是域名不用备案，省去好多麻烦，但是不足就是速度不理想。

我的 haoqicat.com 原来托管在 DigitalOcean 的 VPS 之上（最近也迁移到了阿里云），而 haoduoshipin.com 目前是 aliyun ，对比一下访问速度，差别还是很明显的。

```
➜  ~  ping haoqicat.com
PING haoqicat.com (104.236.84.251): 56 data bytes
Request timeout for icmp_seq 0
64 bytes from 104.236.84.251: icmp_seq=1 ttl=50 time=320.588 ms
64 bytes from 104.236.84.251: icmp_seq=2 ttl=50 time=376.968 ms
64 bytes from 104.236.84.251: icmp_seq=3 ttl=50 time=401.550 ms
^C
--- haoqicat.com ping statistics ---
5 packets transmitted, 3 packets received, 40.0% packet loss
round-trip min/avg/max/stddev = 320.588/366.369/401.550/33.892 ms
➜  ~  ping haoduoshipin.com
PING haoduoshipin.com (123.57.61.54): 56 data bytes
64 bytes from 123.57.61.54: icmp_seq=0 ttl=50 time=24.596 ms
64 bytes from 123.57.61.54: icmp_seq=1 ttl=50 time=23.736 ms
64 bytes from 123.57.61.54: icmp_seq=2 ttl=50 time=23.882 ms
^C
--- haoduoshipin.com ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 23.736/24.071/24.596/0.376 ms
➜  ~
```

如上，haoqicat 这边延时是三四百毫秒，而 haoduoshipin 只有二十多毫秒，同时丢包率，前者为 40% ，后者为0。

### 更为细致的服务

其实真正大一点的网站，对于托管服务就不是一个简单的 VPS 可以胜任的了，还会涉及到 CDN ，负载均衡等任务。我们不细聊，只是把国际国内最著名的类似服务提供商列举到下面，大家去他们网站上可以扫一扫概念。

- [亚马逊的 EC2 和 S3](https://aws.amazon.com/cn/) 这两个服务很著名的
- [七牛云存储](http://www.qiniu.com/) Peter 自己目前用来做视频的 CDN
- [阿里云的其他服务](https://www.aliyun.com/) 一般使用我还是首推阿里的

### 为何要使用 CDN ？

有朋友现在肯定要问，Peter 你现在已经有阿里云的服务器了，那你为啥不把你的视频和图片也放到这台服务器上，而确要专门去购买七牛的 CDN 服务来托管呢？这是个很好的问题，下面来回答一下。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic8-3-cdn.png)

先来介绍一下 CDN 的概念，英文全写 Content Distribution Network ，内容分发系统。国内的各个骨干网之间是割裂的，也就是如果你在南网访问北网速度就会很慢。CDN 就是提供这样的服务，我上传一份视频到七牛，七牛会把这个视频做多个拷贝，每个骨干网上都放一份。这样我的用户在访问视频的时候，不管他是在哪个骨干之上就都会速度很快了。

另外，其实我自己的阿里云 ECS 上硬盘，带宽和运算能力都是有限的，从这个角度而言，把一些大文件，例如图片和视频放到 CDN 服务商也是很合理的。

### 参考

- <http://www.webhostingsecretrevealed.net/web-hosting-beginner-guide/>