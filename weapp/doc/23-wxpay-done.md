# 客户端调起支付和服务器端处理微信支付通知

本节课程我们将在小程序客户端调用[微信支付接口](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html#wxrequestpaymentobject)，实现小程序支付功能。另外，小程序客户端支付完成之后，还会在咱们自己的小程序服务器端处理[支付接口通知](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_7)。

### 客户端调用微信支付接口

在小程序开发者工具中，修改 `course.js` 文件中的 `createOrder` 事件处理函数，当 `/orders` 接口请求成功之后，调用微信支付接口[wx.requestPayment](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html#wxrequestpaymentobject)，切记这个接口的五个参数值都不要自己设置，一定要使用从小程序服务器端返回的支付参数值，要不然不能支付。

```
success: (res) => {
  console.log(res.data.data)
  const data = res.data.data
  wx.requestPayment({
    timeStamp: data.timeStamp,
    nonceStr: data.nonceStr,
    package: data.package,
    signType: data.signType,
    paySign: data.paySign,
    success: (res) => {
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000
      })
    },
    fail: (res) => {
      console.log(res)
    }
  })
},
```

保存文件之后，点击购买课程按钮，页面中会出现一个【微信支付测试】对话框，用手机微信扫描上面的二维码，就会在微信中输入密码进行支付。支付完成之后，小程序客户端会显示【支付成功】消息提示框。

### 处理支付异步通知结果

在小程序服务器端，修改 `index.js`，调用 [weixin-pay](https://github.com/tvrcgo/weixin-pay) 的 `useWXCallback` 函数接口处理支付结果异步通知结果。添加代码：

```
app.use('/payment/notify', wxpay.useWXCallback(function(msg, req, res, next){
  console.log(msg)
  if(msg.return_code === 'SUCCESS') {
    Order.findOne({orderNo: msg.out_trade_no}, function(err, order) {
      if(err) {return console.log(err)};
      order.status = 'finished';
      order.save(function(err) {
        if(err) {return console.log(err)};
        res.success(); //向微信返回处理成功信息
      });
    });
  } else {
    res.fail(); //向微信返回处理失败信息
  }
}));
```

上述代码新添加了一个路由 `/payment/notify`，也就是微信服务器通知支付结果要访问的地址，参数 `msg` 就包含了通知参数，

然后修改一下配置文件，在调用支付[统一下单 API](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1) 的时候，传递给微信服务器的请求参数 `notify_url` 要求是外网可以访问的地址，那现在 `notify_url` 的值为 `https://api.haoqicat.com/payment/notify`。另外，一个参数 `spbill_create_ip` 也修改为阿里云服务器的地址。

### 部署代码测试

把代码部署到阿里云服务器，然后重新应用，执行下面的命令：

```
pm2 restart index
```

然后把小程序客户端的代码中域名 `http://localhost:3000` 都改成 `https://api.haoqicat.com`。修改完成之后，点击购买课程按钮测试。当支付完成之后，可以到服务器端数据库中查看新创建的课程订单，并且课程订单的状态也标注为 `finished`。

到此为止，小程序支付功能也就开发完成了。
