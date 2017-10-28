本节的任务是调通腾讯云接口，拿到一个的 bucket 中的所有文件。不做样式，就在浏览器 console 中能看到数据即可。

注：主要参考资料是 [Javascript SDK](https://cloud.tencent.com/document/product/436/11459)。


在参考资料页面的侧边栏上可以看到，同样的**读取 Bucket**（ Get bucket )的接口在 **Nodejs SDK** 和 **Javascript SDK** 中都有，所以这个请求操作在客户端和服务器端都可以完成的。本节采用客户端的直接发请求的方式来完成，但是要配合服务器端代码进行**鉴权**.


下面的操作步骤基本上和参考资料上给出的顺序一致，稍有调整。

### 创建存储桶（ Bucket ）

登录腾讯云，创建一个 Bucket 名为 catgo ，专门用来做我们这套课程。

注：我们要存储静态视频文件，用到的服务是**对象存储**（Cloud Object Storage，简称：COS） 。 COS 是腾讯云提供的一种存储海量文件的分布式存储服务，所谓“对象”，就是视频，图片等静态资源。而存储内容到 COS ，首先就要创建存储桶（ Bucket ），创建了一个 Bucket 相当于我拥有了一块儿硬盘，里面就可以去存储文件了。更多信息参考 [官方产品简介](https://cloud.tencent.com/document/product/436/6222) 和 [官方教学视频](https://cloud.tencent.com/course/detail/29?specialId=183) 。


书归正传，注册腾讯云账号，然后购买 cos 之后。到 [COS 产品页面](https://cloud.tencent.com/product/cos) 点立即使用。到侧边栏，点**Bucket列表**，打开的页面中有一个蓝色的**创建 Bucket** 按钮 。对话框中，


- **名称** 填 catgo 。
- **地域** 填一个离自己近的地方，我选北京
- **访问权限** 公有读私有写
- **CDN加速** 开启

注意：CDN 加速可以让全国各地的人访问我的视频的时候都能享受畅快的速度。

最后点确定，我们的 Bucket 就有了。此时打开的界面中，点击**创建文件夹**按钮，添加文件夹名为 aa 。点开创建好的 aa 文件夹，里面上传一个文件 aa.png 。同样的方式，创建文件夹 bb （跟 aa 平级），里面上传 bb.png 。

最终，我得到的是一个 bucket 中有两个文件夹，里面分别有一个文件。

### 设置存储桶跨域设置

实际上就是允许不同域名的网站去访问 Bucket 。

这一步必须要做，不然会报出 `Access-Control` 也就是访问权限相关的错误。

进入前面创建的 catgo 这个 bucket 的配置位置： bucket列表 => 点击进入 bucket => 基础配置 => 打开跨域访问设置。

后续操作步骤按照 [Javascript SDK 文档](https://cloud.tencent.com/document/product/436/11459) 的**开发环境**小标题的内容来配置即可。具体填写内容如下：

- 来源 Origin ： *
- Methods ： 勾选所有
- Credentials ：false
- Allow-Headers ： *
- Expose-Headers ：ETag
- Max-Age ： 3600

不要忘记点保存。配置好之后，我们自己的代码再去读写这个 Bucket ，就不会遇到权限被拒绝的情况了。

### 参数信息准备

先来把调用 get bucket 接口所需的参数信息准备好。



[Javascript SDK 的 get-bucket](https://cloud.tencent.com/document/product/436/11459#get-bucket) 中可以看到，接口参数的必填项目有两个

```js
var params = {
  Bucket : 'STRING_VALUE',        /* 必须 */
  Region : 'STRING_VALUE',        /* 必须 */
  ...
}
```

一个是 Bucket 也就是存储桶的名字，是 catgo 。另外一个 Region ，要填地域简称。到[地域信息页面](https://cloud.tencent.com/document/product/436/6224) 可以看到，我们选择的区域是北京，对应的地域简称是 `ap-beijing` 。


但是，文档往上翻，看到 **SDK配置** 这一小部分，可以看到，还有两项是必须的

```js
var params = {
  AppId: 'STRING_VALUE',                                /* 必须 */
  getAuthorization: getAuthorization,                   /* 必须 */
  ...
}
```

AppId 相当于一个命名空间，不同的 AppId 下面的 bucket 可以同名。同时必须填的还有 getAuthorization ，也就是**鉴权**。文档上有说明

>项目上线不推荐使用前端计算签名的方法，有暴露秘钥的风险

所以鉴权接口要到服务器端 nodejs 代码中去实现。查看 [Nodejs SDK 文档](https://cloud.tencent.com/document/product/436/8629) 的 **鉴权操作** 部分。可以看到鉴权接口本身的必填参数有三个

```js
var params = {
  Method: 'STRING_VALUE',                          /* 必须 */
  SecretId: 'STRING_VALUE',                        /* 非必须 */
  SecretKey: 'STRING_VALUE',                       /* 非必须 */
};
```

Method 我们写代码的时候再说。 到[控制台](https://console.cloud.tencent.com/capi)可以获取到 AppId, SecretId, SecretKey 。


### 写服务器代码

主要就是实现鉴权接口。


先来创建项目：

```
cd qcloud-cos
mkdir server
```

server 中存放服务器端代码。



### 客户端代码

写客户端 React 代码，实现读取 Bucket 的操作。


先把需要的 javascript sdk 的包装上

```
cd qcloud-cos/client
npm i cos-js-sdk-v5
```

再次强调 js-sdk 是用于客户端浏览器的，nodejs-sdk 是用于服务器 nodejs 环境下的。




---- 下面内容未整理 ----


### 服务器端代码

服务器端代码是一个 expressjs 项目。

到 qcloud-cos/server 项目：

npm 引入

```
npm init -y
npm i cos-nodejs-sdk-v5 express body-parser cors morgan
```

创建 index.js 文件：

```js
const express = require('express')
const app = express()
const logger = require('morgan')

const cors = require('cors')
const bodyParser = require('body-parser')
const apiRouter = require('./routes')

const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
  app.use(logger('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', cors(), apiRouter)

// 处理开发环境报错
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack)

    res.status(err.status || 500)
    res.json({ success: false, errorMsg: err.message })
  })
}

// 处理生产环境报错
app.use(function (err, req, res, next) {
  console.log(err.stack)
  res.status(err.status || 500)
  res.json({ success: false, errorMsg: err.message })
})

app.listen(3000, () => console.log('running on port 3000...'))
```

routes.js 内容如下：

```js
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('hello')
})

module.exports = router
```

这样：npm start 就可以看到 api 显示出的 hello 了。

添加 bucket.js ，

更新：考虑到跟 client 里面命名统一，bucket.js 文件名可以改为 lib/qcloud.js


```js
const COS = require('cos-nodejs-sdk-v5')
const config = require('./config')

const cos = new COS(config)

exports.getBucket = (req, res) => {
  cos.getBucket(config, (err, data) => {
    if(err) {
      res.json(err)
    } else {
      res.status(200).json(data)
    }
  })
}
```

config.js 内容如下：

```js
const config = {
  AppId: '1273321599',
  SecretId: 'AKIDiNr0E83Mjx2vc8vb3KQJ0UmsmT0NtUIs',
  SecretKey: 'WqNahcVDj2DG7mF4mqnY7TecOyO51bdj',
  Bucket: 'hq123',
  Region: 'ap-chengdu'
}

module.exports = config
```

config 中各项目的内容参考上一小节。

### 启动项目并测试

server/package.json 中添加一个脚本

```json
"start": "nodemon index.js"
```

运行

```
npm start
```

然后浏览器中访问 http://localhost:3008/bucket 就可以看到，类似下面的输出内容了：


```
{
Name: "hq123-1253322599",
Prefix: "",
Marker: "",
MaxKeys: "1000",
IsTruncated: "false",
Contents: [
{
Key: "shower-dashboard-gauge-agazade.sketch",
LastModified: "2017-09-28T03:39:52.000Z",
ETag: ""8bce0bc8d82996b6a84c6b9e8654203ae945bdc0"",
Size: "313351",
Owner: {
ID: "1253322599"
},
StorageClass: "STANDARD"
},
{
Key: "www/ant-25-redux-reducer.mp4",
LastModified: "2017-09-28T08:21:09.000Z",
ETag: ""a2258fd31c76d25fbfa6d6e4517973a0-88"",
Size: "92243892",
Owner: {
ID: "1253322599"
},
StorageClass: "STANDARD"
},
{
Key: "是是是",
LastModified: "2017-09-28T10:06:39.000Z",
ETag: ""929018031d5dd60f041006dd6a5616f6"",
Size: "71379389",
Owner: {
ID: "1253322599"
},
StorageClass: "STANDARD"
}
],
CommonPrefixes: [ ],
statusCode: 200,
headers: {
content-type: "application/xml",
content-length: "1064",
connection: "close",
date: "Wed, 04 Oct 2017 02:34:00 GMT",
server: "tencent-cos",
x-cos-request-id: "NTlkNDQ4OThfMjNiMjU4NjRfNWFjOF83OTFmZA=="
}
}
```

至此，读取 bucket 的操作成功了。
