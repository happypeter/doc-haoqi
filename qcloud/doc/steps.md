###  基本介绍

id: intro

[官方产品简介](https://cloud.tencent.com/document/product/436/6222)
* 腾讯云cos服务
* 储存桶bucket
* ...

主要要实现的功能： 拖拽文件以上传至cos的bucket中指定的文件夹里。

功能拆分：
* 拖拽文件
* 上传文件至bucket
* 指定/创建 bucket中的目标文件夹
* 上传进度条显示
* 删除bucket中的文件
* 重命名bucket中的文件


项目技术架构：

cos中，bucket 的权限一般是公有读私有写。对于写操作，必须经过鉴权才能进行。

* 前端
    * create-react-app + antd
    * [前端 js SDK v5版本](https://cloud.tencent.com/document/product/436/11459#.E5.88.86.E5.9D.97.E4.B8.8A.E4.BC.A0.E4.BB.BB.E5.8A.A1.E6.93.8D.E4.BD.9C)
* 后端
    * node.js
    * Node.js SDK v5版


### 申请 ID 和跨域设置

* 注册腾讯云

我注册过了，可以每次用微信扫码登录了。

* [控制台](https://console.cloud.tencent.com/capi)获取 AppId, SecretId, SecretKey

* 针对要操作的bucket进行跨域（CORS）设置
    * 位置：[控制台](https://console.cloud.tencent.com/cos4/index) => bucket列表 => 点击进入 bucket => 基础配置 => 打开跨域访问设置
    * 可以参照 [前端 js SDK v5版本](https://cloud.tencent.com/document/product/436/11459#.E5.88.86.E5.9D.97.E4.B8.8A.E4.BC.A0.E4.BB.BB.E5.8A.A1.E6.93.8D.E4.BD.9C)默认配置进行操作，其中的**开发环境**小节。
     - 视频：cors-settings
     - 不要忘记点保存


### 前端SDK配置：

注意：项目要有 client 和 server 同时配合

创建项目


```
mkdir qcloud-demo
cd qcloud-demo
create-react-app client
```


到 qcloud-demo/client 文件夹

App.js

```js
componentDidMount () {
  axios.get('http://localhost:3000/bucket')
  .then(
    res => {
      console.log(res)
    }
  )
  .catch(
    err => {
      console.log(err)
    }
  )
}
```

这样，后端如果搭建好之后就可以在 console 中看到

```
:
CommonPrefixes
:
[]
Contents
:
Array(2)
0
:
{Key: "cors-settings.mp4", LastModified: "2017-09-28T03:37:11.000Z", ETag: ""f71956530b1b16cbde43f7e1d6d0dec36eb4fcc7"", Size: "8528236", Owner: {…}, …}
1
:
{Key: "shower-dashboard-gauge-agazade.sketch", LastModified: "2017-09-28T03:39:52.000Z", ETag: ""8bce0bc8d82996b6a84c6b9e8654203ae945bdc0"", Size: "313351", Owner: {…}, …}
length
:
```

上面进行的是一个**读取 bucket** 内文件对象的操作，可以看到的是返回值中列出了两个文件名。


### 后端基本搭建

我们的目标是：

尝试调用nodejs-sdk的getBucket接口，读取bucket中的对象（文件）。
先去bucket中，随便上传两个文件。

然后，在server目录下，新建getBucket.js文件。
在文件中，引入'cos-nodejs-sdk-v5'和配置文件

接着为const cos = new COS(params)引入必要的参数对象
就可以调用接口了，在回调函数中，将得到的结果/错误返回前端。

后端是一个 expressjs 项目。

到 qcloud-demo/server 项目：


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


routes.js

```
const express = require('express')

const router = express.Router()

// 测试
router.get('/', (req, res) => {
  res.send('hello')
})


module.exports = router
```

这样：npm start 就可以看到 api 显示出的 hello 了。


添加 getBucket.js ，

git commit: get file object
git commit: rm auth.js


上面的 commit 是最终实现的代码。
