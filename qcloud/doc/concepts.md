
### cos 和 bucket

[官方产品简介](https://cloud.tencent.com/document/product/436/6222)

* 腾讯云 cos 服务
  - 好奇猫存储视频采用的服务，Cloud Object Storage（云对象存储） 是腾讯云提供的一种存储海量文件的分布式存储服。所谓“对象”，就是视频，图片等静态资源。

* 储存桶 bucket
  - 一个用户可以拥有多个 bucket ，里面可以存储 object
  - 对应我们的本地存储，一个 bucket 相当于一块硬盘，一个 object 相当于一个文件


更多信息可以参考官方视频：https://cloud.tencent.com/course/detail/29?specialId=183


### AppId 及其他

AppId 相当于一个命名空间，不同的 AppId 下面的 bucket 可以同名。

### AppId, SecretId, SecretKey

* 注册腾讯云

我注册过了，可以每次用微信扫码登录了。

* [控制台](https://console.cloud.tencent.com/capi)获取 AppId, SecretId, SecretKey

* 针对要操作的bucket进行跨域（CORS）设置
    * 位置：[控制台](https://console.cloud.tencent.com/cos4/index) => bucket列表 => 点击进入 bucket => 基础配置 => 打开跨域访问设置
    * 可以参照 [前端 js SDK v5版本](https://cloud.tencent.com/document/product/436/11459#.E5.88.86.E5.9D.97.E4.B8.8A.E4.BC.A0.E4.BB.BB.E5.8A.A1.E6.93.8D.E4.BD.9C)默认配置进行操作，其中的**开发环境**小节。
     - 视频：cors-settings
     - 不要忘记点保存
