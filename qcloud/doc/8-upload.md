# 文件上传到 bucket

欢迎进入新的一章《上传》 。这一章瞄准文件上传和删除等功能，如果说上一章是对 bucket 的读操作，那这一章就是写操作了。

进入第一小节《文件上传到 bucket》，实现腾讯云上传接口的调用，涉及到客户端的配置和鉴权。

前面读取文件列表，是通过服务器端完成的，但是上传文件的肯定要在客户端直接完成，因为要上传的都是大文件，如果先上传到我们自己的服务器然后再从那里上传到腾讯云，就绕路了。

### 前端的鉴权

前端不经过鉴权，是不能向腾讯云写数据的。

安装供客户端使用的 [Javascript SDK](https://cloud.tencent.com/document/product/436/11459) 的 npm 包

```
cd client/
npm i cos-js-sdk-v5
```

这个跟之前在服务器端用的 Nodejs SDK 功能上是类似的。

添加 src/lib/qcloud.js 文件，初始化 cos 实例

```js
import axios from 'axios'
import COS from 'cos-js-sdk-v5'
import Settings from '../settings'

const getAuthorization = (options, callback) => {
    axios.post(Settings.authUrl, options)
    .then(
      res => {
        const authorization = res.data
        callback(authorization);
      }
    )
    .catch(err => {
      if (err) {
        console.log(err)
      }
    })
}

const cos = new COS({
  AppId: Settings.AppId,
  getAuthorization: getAuthorization,
})

export default cos
```

`getAuthorization` 就是鉴权函数啦。具体方式是，发 axios 请求到服务器端，通过服务器端来确认前端的权限。服务器端存储了 SecretId 等机密信息，可以跟腾讯那边达成互信，所以有才资格给前端鉴权。但是话又说回来，为何前端自己不能保存 SecretId ，自己直接发送给腾讯云进行鉴权呢？答案就是不安全。就像 [JavaScript SDK 文档](https://cloud.tencent.com/document/product/436/11459) 所说：

>项目上线不推荐使用前端计算签名的方法，有暴露秘钥的风险

`cos` 在进行实例化的时候，参数中传入了 `getAuthorization` 这一项，这样，每次调用 `cos` 里面的各种接口，例如本节会用到的 `cos.sliceUploadFile()` ，程序就会自动发 axios 请求到后台进行鉴权了。

上面的代码是要依赖于 src/settings.js 文件的，内容填写下面几项：

```js
const Settings = {
  authUrl: 'http://localhost:3008/auth',
  bucketUrl: 'http://localhost:3008/bucket',
  AppId: '1253322599',
  Bucket: 'catgo',
  Region: 'ap-beijing'
}

export default Settings
```

说说每一项都是干啥的

- authUrl ：就是鉴权 url ，对应的服务器端 API 暂时还没有实现，稍后去做
- bucketUrl： 就是前面实现的列出 bucket 内文件内容的那个 API 对应的 url
- AppId：应用 Id 
- Bucket： 填写实际要进行读写的 Bucket 的名字
- Region： 区域简称

有了上面的这些参数信息，前端的 cos 接口配置就基本完成。

另外，有了配置文件中的 `bucketUrl` ，redux/actions/index.js 中可以把代码调整一下了

```diff
diff --git a/client/src/redux/actions/index.js b/client/src/redux/actions/index.js
index 88346ff..cd9dccf 100644
--- a/client/src/redux/actions/index.js
+++ b/client/src/redux/actions/index.js
@@ -1,9 +1,10 @@
 import axios from 'axios'
+import Settings from '../../settings'
 
 const getFirstDir = allFiles => allFiles[0].Key.split('/')[0]
 export const loadAllFiles = () => {
   return dispatch => {
-    axios.get('http://localhost:3008/bucket').then(
+    axios.get(Settings.bucketUrl).then(
       res => {
         console.log(res.data)
         const allFiles = res.data.Contents
```

这样把服务器接口链接都放到配置文件中，方便了以后统一做改动。

另外，依然是配置文件的老套路，要把 settings.js 添加到 client/.gitignore 文件中，然后拷贝一份 settings.example.js 跟代码一起上传到 github.com 。

至此，《前端的鉴权》这部分就胜利完成。

### 服务器实现鉴权 API

到服务器端代码中，实现客户端用到的 authUrl 对应的鉴权 API 。

首先解决一个基础设施问题，当客户端通过 POST 方法发送数据到服务器端，服务器端默认是接受不到的，需要先来装个包

```
npm i body-parser
```

这里来插一句，接受客户端 POST 过来的数据为何要用 body-parser ，中文意思就是，主体-解析器，呢？这是因为 POST 请求发送数据时，数据是在 HTTP 请求的 body ，也就是主体中携带到服务器的，这也就是 body-parser 中 body 这个词的由来。

然后，在 server/index.js 添加对 body-parser 的使用

```diff
diff --git a/server/index.js b/server/index.js
index 34fa3e3..8bb1c87 100644
--- a/server/index.js
+++ b/server/index.js
@@ -2,6 +2,10 @@ const express = require('express')
 const cors = require('cors')
 const app = express()
 const apiRouter = require('./routes')
+const bodyParser = require('body-parser')
 
+app.use(bodyParser.json())
+app.use(bodyParser.urlencoded({ extended: false }))
 app.use('/', cors(), apiRouter)
+
 app.listen(3008, () => console.log('running on port 3008...'))
```

这样，body-parser 就生效了。express 代码中，就可以用 req.body.xxx 来拿到 POST 过来的 xxx 数据了，后面马上就会看到这种情形。

接下来，服务器要响应前端发起的鉴权请求。就需要到 server/routes.js ，添加路由

```diff
diff --git a/server/routes.js b/server/routes.js
index b5a5a6f..38e8a53 100644
--- a/server/routes.js
+++ b/server/routes.js
@@ -5,7 +5,7 @@ const qcloud = require('./lib/qcloud')
 router.get('/', (req, res) => {
   res.send('Hello World')
 })
-
+router.post('/auth', qcloud.auth)
 router.get('/bucket', qcloud.getBucket)
 
 module.exports = router
```

请求收到，执行的函数就是 `qcloud.auth` 。

接下来，server/lib/qcloud.js 中添加 `qcloud.auth` 的实现：

```diff
diff --git a/server/lib/qcloud.js b/server/lib/qcloud.js
index 7c8b430..8e90080 100644
--- a/server/lib/qcloud.js
+++ b/server/lib/qcloud.js
@@ -12,3 +12,17 @@ exports.getBucket = (req, res) => {
     }
   })
 }
+
+exports.auth = (req, res) => {
+  const params = {
+    SecretId: `${config.SecretId}`,
+    SecretKey: `${config.SecretKey}`,
+    Method: req.body.method,
+    Key: req.body.Key
+  }
+
+  const cos = new COS(params)
+
+  const Authorization = cos.getAuth(params)
+  res.status(200).json(Authorization)
+}
```

代码的核心是 `cos.getAuth` 接口。各个参数都是啥含义呢？

- Method —— (String) ： 操作方法，如 get, post, delete, head 等 HTTP 方法
- Key —— (String) ： 操作的 object 名称，如果请求操作是对文件的，则为文件名，且为必须参数。如果操作是对于 Bucket，则为空
- SecretId —— (String) ：用户的 SecretId，如果 SecretId 和 COS 实例创建时相同，则可以不填
- SecretKey —— (String) ：用户的 SecretKey，如果 SecretKey 和 COS 实例创建时相同，则可以不填

参数列表中 `SecretId` 和 `SecretKey` 的赋值都是从配置文件中拿到。

而后面两项 `Method` 和 `Key` 的值都是从客户端发过来的 HTTP 请求主体中拿到了，这个就仰仗之前安装的 body-parser 这个包了。 `Method` 这一项的值是客户端发请求所用的 HTTP 方法。 `Key` 的这一项，是客户端发送过来的文件名。可以考虑 console.log 一下 req.body 这个对象，看看具体客户端都发送了哪些内容进来，便于调试。

`Authorization = cos.getAuth(params)` 这句就是调用 getAuth 接口了，发送机密数据到腾讯云，腾讯云验明无误，会返回授权码，存储到 `Authorization` 变量中 ，这个授权码，服务器端自己不用，直接用 `res.status(200).json(Authorization)` 这条语句返回给前端。

至此，《服务器端实现鉴权 API》这一部分就完成了。

### 前端上传

前端上传文件功能通过调用 [Javscript SDK](https://cloud.tencent.com/document/product/436/11459) 分块上传接口 sliceUploadFile 来完成。

先到 src/components/Main.js 中导入一个新组件 UploaderContainer

```diff
diff --git a/client/src/components/Main.js b/client/src/components/Main.js
index 026339e..8013e43 100644
--- a/client/src/components/Main.js
+++ b/client/src/components/Main.js
@@ -2,6 +2,7 @@ import React from 'react'
 import './main.css'
 import FileTableContainer from '../containers/FileTableContainer'
 import DirMenuContainer from '../containers/DirMenuContainer'
+import UploaderContainer from '../containers/UploaderContainer'
 import styled from 'styled-components'
 import { Layout } from 'antd'
 const { Header, Sider, Content } = Layout
@@ -36,6 +37,9 @@ export default () => (
       </Header>
       <Content>
         <Wrap>
+          <UploaderContainer />
+        </Wrap>
+        <Wrap>
           <FileTableContainer />
         </Wrap>
       </Content>
```

UploaderContainer 组件专门负责上传工作。

添加 UploaderContainer.js 文件，内容如下：


```js
import React, { Component } from 'react'

class UploaderContainer extends Component {
  handleChange = (e) => {
    const file = e.target.files[0]
    console.log('UploaderContainer', file)
  }

  render () {
    return (
      <div>
        <input type="file" onChange={ this.handleChange } />
      </div>
    )
  }
}

export default UploaderContainer
```

首先通过 input 标签，拿到上传接口需要的文件对象。到浏览器中，用上传按钮传一个文件试试，终端中应该可以看到


```js
File {name: "aa.png", lastModified: 1510064456000, lastModifiedDate: Tue Nov 07 2017 22:20:56 GMT+0800 (CST), webkitRelativePath: "", size: 94251, …}
```

这个就是文件对象，下面马上用到。

接下来，调用接口进行上传，handleChange 函数中添加参数和接口调用

```diff
diff --git a/client/src/containers/UploaderContainer.js b/client/src/containers/UploaderContainer.js
index ce6d9c9..30f6a28 100644
--- a/client/src/containers/UploaderContainer.js
+++ b/client/src/containers/UploaderContainer.js
@@ -1,9 +1,24 @@
 import React, { Component } from 'react'
+import Settings from '../settings'
+import cos from '../lib/qcloud'
 
 class UploaderContainer extends Component {
   handleChange = (e) => {
     const file = e.target.files[0]
-    console.log('UploaderContainer', file)
+    const params = {
+      Bucket: Settings.Bucket,
+      Region: Settings.Region,
+      Key: '/aa/peter.txt',
+      Body: file
+    }
+
+    cos.sliceUploadFile(params, (err, data) => {
+      if(err) {
+        console.log(err)
+      } else {
+        console.log(data)
+      }
+    })
   }
 
   render () {
```

主要就是使用了 `cos.sliceUploadFile()` 接口， [Javscript SDK](https://cloud.tencent.com/document/product/436/11459) 上相关文档如下：

- Bucket —— (String) ： Bucket 名称
- Region —— (String) ： Bucket 所在区域。枚举值请见：Bucket 地域信息
- Key —— (String) ： 文件名。这是上传后的本文件在腾讯云上的文件名，和文件本名无关，可以相同也可以不同。像这里的填写，文件会保存到 aa 文件夹下，名字就叫 peter.txt。
- Body —— 上传文件的 File 对象

页面中进行上传，Chrome 终端中输出

```js
{Location: "cici-1253322599.ap-beijing.myqcloud.com/aa/peter.txt", Bucket: "catgo", Key: "aa/peter.txt", ETag: ""8f1a42da36ce65010ad06e1282741bc6-1"", statusCode: 200, …}
```

可以看到有上传后的文件链接生成，显然上传成功了。

至此，《前端上传》这部分就胜利完成。

### 总结

这样，《文件上传到 Buckket 》这个小节就胜利完成。可以看出，重点在于鉴权流程。