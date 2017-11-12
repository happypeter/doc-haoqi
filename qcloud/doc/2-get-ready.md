# 请求腾讯 API 的准备工作

为了跑通腾讯云接口，拿到 bucket 中的读权限（暂时不考虑写），首先需要配置好 bucket ，然后拿到 SecretId 等这些信息，本节全部来搞定。

下面的操作步骤基本上和 [Javascript SDK 文档](https://cloud.tencent.com/document/product/436/11459) 上给出的顺序一致，稍有调整。

### 创建存储桶（ Bucket ）

登录腾讯云，创建一个 Bucket ，专门用来做我们这套课程。

要存储大文件，用到的服务是**对象存储**（Cloud Object Storage，简称：COS） 。 COS 是腾讯云提供的一种存储海量文件的分布式存储服务，所谓 **对象** ，可以粗略的等价为 **文件** ，具体就是视频，图片等静态资源。而存储内容到 COS ，首先就要创建存储桶（ Bucket ），创建了一个 Bucket 相当于拥有了一块儿硬盘，里面就可以去存储文件了。更多信息参考 [官方产品简介](https://cloud.tencent.com/document/product/436/6222) 和 [官方教学视频](https://cloud.tencent.com/course/detail/29?specialId=183) 。

书归正传，注册腾讯云账号，然后购买 cos 之后。到 [COS 产品页面](https://cloud.tencent.com/product/cos) 点立即使用。到侧边栏，点 **Bucket列表**，打开的页面中有一个蓝色的 **创建 Bucket** 按钮 。

打开的对话框中填写：

- **名称** 填 cici 。
- **地域** 填一个离自己近的地方，我选北京
- **访问权限** 公有读私有写
- **CDN加速** 开启

CDN 加速可以让全国各地的人访问我的视频的时候都能享受畅快的速度。

最后点 **确定**，我们的 Bucket 就有了。

这章的核心任务就是来读 Bucket 中的文件列表，现在 Bucket 可是空的呀。虽然存储桶里是可以直接上传文件的，但是假设当前项目的要求是文件一定要放到文件夹内。于是，打开的界面中，点击**创建文件夹**按钮，添加文件夹名为 aa 。点开创建好的 aa 文件夹，里面上传一个文件 aa.png 。同样的方式，创建文件夹 bb （跟 aa 平级），里面上传 bb.png 。

最终得到的是一个 bucket 中有两个文件夹，里面分别有一个文件。

### 设置存储桶跨域设置

跨域设置的目的，是允许其他域名下的网站去访问 Bucket 。这一步必须要做，不然我们的应用中请求文件信息的时候，会报出访问权限相关的错误。

进入前面创建的 cici 这个 bucket 的配置位置： bucket列表 => 点击进入 bucket => 基础配置 => 打开跨域访问设置。

后续操作步骤按照 [Javascript SDK 文档](https://cloud.tencent.com/document/product/436/11459) 的 **开发环境** 小标题的内容来配置即可。具体填写内容如下：

- 来源 Origin ： * ，意思是允许任意其他域名的网站来访问文件
- Methods ： 勾选所有，允许所有方法的请求
- Credentials ：false ，不使用 Cookie 等其他机密信息
- Allow-Headers ： * ，允许返回任意头部
- Expose-Headers ：ETag （注意 T 大写），把 ETag 暴露给客户端，客户端拿到 ETag 后干点啥，后面会看到的
- Max-Age ： 5 ，上面的这几项设置的最大缓存实际是5秒 

不要忘记点保存。配置好之后，我们自己的代码再去读写这个 Bucket ，就不会遇到权限被拒绝的情况了。

### 参数信息准备

读 Bucket 中的文件列表信息，用到的接口是 getBucket，现在来把调用 getBucket 接口所需的参数信息准备好。

在[参考资料页面](https://cloud.tencent.com/document/product/436/8629)的侧边栏上可以看到，有 **Nodejs SDK** 和 **Javscript SDK** 。其实，同样的 **读取 Bucket**（ Get bucket )的接口在 Nodejs SDK 和 Javascript SDK 中都有，也就是 getBucket 这个请求，在我既可以通过安装 Javascript SDK 在客户端发出也可以通过安装 Nodejs SDK 在服务器端发出的。

但是 Javascript SDK 上也有明确说明，要在客户端读写 Bucket ，首先要进行 **鉴权** ，但是文档上注明了：

>项目上线不推荐使用前端计算签名的方法，有暴露秘钥的风险

所以鉴权操作必须要通过服务器端来完成。所以最终我决定：getBucket 操作在服务器端来完成，这样还是比较省事的。

所以暂时我们不需要配置客户端了，只要瞄准服务器端配置即可。那到底都需要哪几个参数的信息呢？现在把目光移到 [Node SDK 文档](https://cloud.tencent.com/document/product/436/8629) ，到在 **快速入门** 部分，要使用 getBucket 接口或者任意的 COS 服务相关接口吧，都要先初始化 cos 对象，这一步必填参数有两个，如下所示：

```js
var COS = require('cos-nodejs-sdk-v5');

var params = {
  SecretId: 'STRING_VALUE',                             /* 必须 */
  SecretKey: 'STRING_VALUE',                            /* 必须 */
...
}
```

说明一下：

- `SecretId` 和 `SecretKey` 可以理解为我们使用 API 时候的用户名和密码，用来鉴权

到[控制台](https://console.cloud.tencent.com/capi)可以获取到 AppId, SecretId, SecretKey 这三项内容，实际测试发现 AppId 在很多情况下也是必须的，所以后续一并填入配置文件。

继续往下看文档，到 [Nodejs SDK](https://cloud.tencent.com/document/product/436/8629) 文档的 **getBucket** 部分，可以看到，使用 getBucket 接口本身有两个必须的参数

```js
var params = {
  Bucket : 'STRING_VALUE',        /* 必须 */
  Region : 'STRING_VALUE',        /* 必须 */
...
}
```

说明一下：

- Bucket 是存储桶的名字，我这里就是 `cici` 。
- Region ，要填地域简称。到[地域信息页面](https://cloud.tencent.com/document/product/436/6224) 可以看到，我们选择的区域是北京，对应的地域简称是 `ap-beijing` 。

有了上面这些信息，实现列出一个 bucket 内所有文件的操作就够用了。

### 添加配置文件到代码中

上面拿到的参数信息，填写到服务器端配置文件中备用。

创建 server/ 文件夹（跟 client 平级)，用来存放服务器端代码：

```
mkdir server
cd server
atom config.js
```

用 atom 编辑器打开 config.js 文件后，里面填写：


```js
const config = {
  AppId: '1253322599',
  SecretId: 'FakeNr9E83Mjx2vc8vb3KQJ0UmsmT0NtWIs',
  SecretKey: 'FakehcVDj2CG7mF4mqnY7TecOyO5Obdj',
  Bucket: 'cici',
  Region: 'ap-beijing'
}

module.exports = config
```

上面的各项内容替换成您自己的信息。

上面 config.js 中包含机密信息，所以要添加到 server/.gitignore 配置文件中，避免不小心上传到 github.com 。然后创建文件的拷贝 server/config.example.js 文件，把里面的机密信息删除掉，然后把这拷贝上传到 github.com 是没有问题的。

### 总结

至此，《请求腾讯云 API 的准备工作》这个小节就胜利完成了。存储桶创建和配置好之后，咱们又把接口需要的各项参数信息都保存到了配置文件中。这样原材料就都有了，下一节就可以动手开工了。
