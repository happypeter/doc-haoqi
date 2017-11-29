# 创建购买课程订单

本节课程主要完成的任务是在课程详情页添加购买课程按钮，当微信用户点击课程购买按钮之后，小程序服务器端创建并保存课程订单到数据库。

### 添加课程购买按钮

启动小程序开发者工具，编辑 `course.wxml` 文件，在文件底部添加一个课程购买按钮，按钮上面显示课程的价格：

```
<button class="payBtn" bindtap="createOrder">购买课程(1分)</button>
```

上面一行代码中，使用了微信小程序的 [button](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) 按钮组件，并且引入了一个新的小程序知识点 [事件](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/event.html)，这里我们用到的是 `tap` 事件，通过 `bindtap` 方式绑定页面逻辑层 `course.js` 文件中 `submitOrder` 事件处理函数。也就是说，当用户点击页面中的购买课程按钮的时候，会执行 `course.js` 文件中的 `createOrder` 创建订单函数。

### 美化按钮样式

修改 `course.wxss` 文件，在文件末尾添加按钮的样式代码：

```
.payBtn {
  width: 170px;
  background-color: #ff4081;
  color: #fff;
  padding: 0;
}
```

### 页面事件处理函数之 event 参数

打开 `course.js` 文件，定义 `createOrder` 函数，在 `onLoad` 生命周期函数下方，代码如下：

```
createOrder: () => {
  console.log(this.data)
}
```

当点击购买课程按钮之后，我们想知道用户购买的课程名称，本以为可以通过在 `createOrder` 函数中读取页面初始化数据 `this.data` 中的 `detail` 数组获取课程名称，但这是不可行的办法，因为打印 `this` 的值是 `undefined`。

小程序官方文档在介绍[事件](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/event.html)这个概念的时候指出，页面中的事件处理函数都自带一个 `event` 参数，这个参数包含了组件传递给事件处理函数的一些数据。组件需要借助 `data-*` 属性传递数据给事件处理函数。因此，修改 `button` 组件如下：

```
<button ... data-course="{{detail.name}}">购买课程(1分)</button>
```

然后，再修改 `createOrder` 函数，代码如下：

```
createOrder: (event)) => {
  console.log(event.target.dataset.course)
}
```

上面的代码就可以把课程名打印出来了。但是，我们的目的是在小程序服务器端创建一个订单并保存起来，所以接下来在服务器端定义创建订单的接口。

### 小程序服务器端构建 Order 模型

在本地启动小程序后端应用，在定义创建订单的接口之前，我们需要先创建一个 Order 模型，因为要把订单数据保存到数据库，新创建一个文件 `/models/order.js`，添加代码：

```
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let OrderSchema = new Schema(
  {
    course: String,
    price: String,
    orderNo: Number,
    status: String,
    openId: String
  },
  {timestamps: true}
);

module.exports = mongoose.model('Order', OrderSchema);
```

`Order` 模型将对应 MongoDB 数据库中的 `orders` 集合，每条订单包含五个字段，从上到下分别代表课程名称、价格、订单号、订单状态、用户标识。

### 服务器端定义创建课程订单接口

修改 `index.js` 文件，首先导入 Order 模型：

```
let Order = require('./models/order');
```

然后编写 `/orders` 接口的代码：

```
app.post('/orders', requireAuth, (req, res) => {
  let orderNo = '20170214' + Math.random().toString().substr(2, 10);
  const order = new Order();
  order.course = req.body.course;
  order.price = req.body.price;
  order.openId = req.openid;
  order.orderNo = orderNo;
  order.save((err) => {
    if(err){ return console.log(err)}
    return res.json({
      message: 'success'
    })
  });
})
```

当小程序客户端请求 `/orders` 接口的时候，就会创建一条新的订单，订单号 `orderNo` 是随机生成的。订单保存成功之后，返回客户端 JSON 数据。

### 小程序客户端请求创建课程订单接口

回到小程序客户端，打开 `course.js` 文件，修改 `createOrder` 事件处理函数，最终代码如下所示：

```
createOrder: (event) => {
  let course = event.target.dataset.course;
  wx.request({
    url: 'http://localhost:3000/orders',
    data: {course: course, price: 1},
    method: 'POST',
    header: {
      'Authorization': wx.getStorageSync('token')
    },
    success: function(res){
      wx.showToast({
        title: res.data.message,
        icon: 'success',
        duration: 2000
      })
    },
    fail: function(res) {
      console.log(res)
    }
  })
}
```

上述代码完成的功能是，请求小程序后端创建课程订单接口 `/orders`，发送的数据是课程名称和课程的价格。因为 `/orders` 属于受保护资源，微信用户登录之后才可以访问，所以要把存储在小程序本地缓存中的 `token` 传送给服务器端，用于用户身份认证。

当请求成功之后，调用小程序的页面交互反馈接口 [wx.showToast](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html#wxshowtoastobject)，显示 `success`消息提示框。

最后，再把项目基本信息改一下，勾选上 `开发环境不校验请求域名以及 TLS 版本` 选项，重启小程序，点击课程详情页面的购买按钮，操作成功之后，页面中会出现一个消息提示框。另外，查看 MongoDB 数据库，`weapp-server` 数据库中新增加了一个 `orders` 集合，集合中保存了刚才提交的购买课程订单。
