# 小程序服务器端生成支付参数

上节课程中我们已经生成了购买课程的订单，算是完成了小程序支付功能实现的准备工作，参照小程序支付[业务流程时序图](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_4&index=2)可知，我们目前正站在【业务流程时序图】的【生成商户订单】这个点上。显然，我们接下来要做的事情就是[调用支付统一下单 API](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1)，不过，这个操作以及它后面的【将组合数据再次签名】两个操作，我们都不会自己写代码实现，而是直接调用 npm 包 [weixin-pay](https://github.com/tvrcgo/weixin-pay) 专门为 Node.js 封装的微信支付接口，帮助我们轻松完成任务，最终在小程序服务器端生成小程序调起支付需要的支付参数。

### 安装 weixin-pay 包

小程序服务器端安装 [weixin-pay](https://github.com/tvrcgo/weixin-pay) 包，安装命令如下：

```
npm install --save weixin-pay
```

weixin-pay 提供了[公众号支付(JS API)](https://github.com/tvrcgo/weixin-pay#公众号支付-js-api)，这个模式也可以用于小程序支付（不要问为啥，反正就是能用，官方文档上的蛛丝马迹我就不讲了，越讲越不清楚，最后看支付能成功就行呗）。

### 使用 weixin-pay

在小程序服务器端修改 `index.js` 文件，首先导入 `weixin-pay` 提供的功能模块 `WXPay`：

```
let WXPay = require('weixin-pay');
```

然后，初始化一个 `WXPay` 实例 `wxpay`, 如下：

```
let wxpay = WXPay({
  appid: config.appId,
  mch_id: config.mchId,
  partner_key: config.partnerKey,
  pfx: fs.readFileSync(config.wxpayCert)
});
```

其中，`appid` 指的是小程序的 AppID, `mch_id` 是微信支付商户号，`partner_key` 是微信商户平台 API 密钥，`pfx` 是微信商户平台 API 证书。因为这些参数信息都非常重要，所以把它们都保存在了项目中的 `config.js` 文件里面了。

因为上传代码中需要读取证书文件的内容，所以在 `index.js` 文件的开头导入 Node.js 文件系统 `fs` 功能模块，添加一条代码：

```
let fs = require('fs');
```

### 获取商户 ID 和商户秘钥

登录[微信商户平台](https://pay.weixin.qq.com/index.php/core/home/login)之后，打开【账号中心】管理页面，进入左侧导航栏中【账户设置】下方的【商户信息】页面，可以找到微信支付商户号(mch_id)。在【API安全】页面中可以获取商户 API 密钥和 API 证书，不过在进入【API安全】页面之前，需要在电脑上安装操作证书。操作证书安装好了之后，才能显示【API安全】页面中的内容。

另外，商户 API 证书要下载下来，解压之后是一个文件夹，包含了四种格式的证书文件，不同的开发语言使用不同格式的证书。我们使用的是 `pkcs12` 格式，也就是 `apiclient_cert.p12` 证书文件。在小程序项目根目录下，新建一个 `cert` 目录，目录中存放 `apiclient_cert.p12` 证书文件。

在小程序支付[安全规范](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_3) 页面中，有关于【商户证书】的详细介绍。

### 生成支付参数

要是我们自己写代码生成支付参数，首先要请求小程序的[统一下单接口](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1)。整个请求过程比较麻烦，需要按照[签名规则](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_3)生成签名，然后把请求参数构建成的 XML 格式的数据发送给微信服务器端。

当【统一下单接口】请求成功之后，还需要把从微信服务器返回的两个参数随机字符串 `nonce_str` 和预支付交易会话标识 `prepay_id` 参与到[再次签名](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7)的操作中，最终才能构建传送给小程序客户端的支付参数。

不过，我们调用 weixin-pay 提供的 `getBrandWCPayRequestParams()` 接口，就可以帮助我们完成上面两步操作，接口执行完毕之后，直接返回支付参数。修改 `index.js` 文件中定义的 `/orders` 应用接口，当购买课程订单保存成功之后，添加一些代码：

```
order.save((err) => {
  if(err){ return console.log(err)}
  wxpay.getBrandWCPayRequestParams({
    openid: req.openid,
    body: req.body.course,
    out_trade_no: orderNo,
    total_fee: 1,
    spbill_create_ip: config.spbillCreateIP,
    notify_url: config.notifyURL
  }, function(err, result){
    console.log(result)
    res.json({
      message: 'success',
      data: result
    })
  });
});
```

`getBrandWCPayRequestParams()` 接口接受一个对象参数，这个对象参数实际上就是用于请求【统一下单接口】所需要的请求参数，解释一下上述代码中用到的请求参数，这几个参数都是必传的参数：

* openid：小程序微信用户唯一标识
* body：购买商品的名称
* out_trade_no：商品订单号，这里我们就用已经保存的课程订单号
* total_fee：购买商品的总金额，数据是整数类型，单位是分，为了测试，所以就简单的把金额设置为1分
* spbill_create_ip：这里使用的是本地小程序服务器端的 IP 地址，若部署到阿里云服务器上则使用阿里云服务器的公网可访问的 IP 地址
* notify_url：支付通知地址，这个地址应该能够让公网访问，不过本节课程暂且不需要，虚构了一个假地址

除了上面六个必要的请求参数之外，还有一个必要参数 `trade_type`，小程序支付的交易类型是 `JSAPI`，这个参数已经在 `getBrandWCPayRequestParams()` 接口内部设置好了。

至此，本节课程要添加的功能已经实现了，回到小程序客户端，点击某门课程的购买按钮，在小程序服务器端将打印如下日志信息：

```
{ appId: 'xxx',
  timeStamp: '1487668744',
  nonceStr: 'lLRaFz0F17ufGz1H',
  package: 'prepay_id=xxx',
  signType: 'MD5',
  paySign: 'xxx' }
```

上面六个参数就是小程序支付[业务流程时序图](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_4&index=2)中提到的【支付参数(5个参数和sign)】，其中 `paySign` 代表签名。

顺便说一下，您若有时间，可以对照小程序支付的文档，深入研究一下 `getBrandWCPayRequestParams()` 接口的源码，能更加理解支付的流程。下节课程，我们将利用这些支付参数，在小程序客户端调起微信支付接口。
