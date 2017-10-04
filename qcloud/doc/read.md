本节的任务是列出我的 bucket 中的所有文件。

注意：项目要有 client 和 server 同时配合。

先来创建项目：

```
mkdir qcloud-demo
cd qcloud-demo
mkdir server
```

server 中存放服务器端代码。

### 参考资料

参照 [前端 js SDK v5版本](https://cloud.tencent.com/document/product/436/11459#.E5.88.86.E5.9D.97.E4.B8.8A.E4.BC.A0.E4.BB.BB.E5.8A.A1.E6.93.8D.E4.BD.9C) 的 **Get Bucket** 小节。

### 服务器端代码

我们的目标是：

尝试调用 nodejs-sdk 的 getBucket 接口，读取 bucket 中的对象（文件）。
先登录腾讯云，去 bucket 中，随便上传两个文件。


实现步骤：

只需要修改服务器端代码即可。 服务器端代码是一个 expressjs 项目。

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
