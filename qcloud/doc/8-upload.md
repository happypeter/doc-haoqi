# 文件上传到 bucket

《上传》这一章瞄准文件上传和删除等功能，如果说上一章是对 bucket 的读操作，这一章就是写操作了。


进入第一小节《文件上传到 bucket》，实现对应的腾讯云上传接口的调用，涉及到客户端的配置和鉴权。

虽然前面我们读取文件列表其实是通过服务器端完成的，但是上传文件的肯定要在客户端直接完成，因为要上传的都是大文件，如果先上传到我们自己的 server 然后再从那里上传到腾讯云就绕远路了。

### 前端的鉴权

前端不经过鉴权，是不能向腾讯云写数据的。

先来安装客户端使用的 [Javascript SDK](https://cloud.tencent.com/document/product/436/11459) 的 npm 包

```
cd client/
npm i cos-js-sdk-v5
```

这个跟之前在服务器端用的 Nodejs SDK 功能上是类似的。

到 src/lib/qcloud.js 文件中，初始化 cos 实例

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
  AppId: Settings.AppId, // 这个还用的上么？
  getAuthorization: getAuthorization,
})

export default cos
```

`getAuthorization` 就是鉴权函数啦。具体方式是，发 axios 请求到服务器端，通过服务器端来确认前端的权限。服务器端存储了 SecretId 等机密信息，可以跟腾讯那边达成互信，所以有这个资格给前端鉴权。但是话又说回来，为何前端自己不能保存 SecretId ，自己直接发送给腾讯云进行鉴权呢？答案就是不安全。就像 [JavaScript SDK 文档](https://cloud.tencent.com/document/product/436/11459) 所说：

>项目上线不推荐使用前端计算签名的方法，有暴露秘钥的风险

`cos` 在进行实例化的时候，参数中传入了 `getAuthorization: getAuthorization` ，这样，每次后面调用 `cos` 里面的各种接口，例如本节会用到的 `cos.sliceUploadFile()` ，程序就会自动发 axios 请求到后台进行鉴权了。

上面的代码是要依赖于 src/settings.js 文件的，内容我们填写下面几项：

```js
const Settings = {
  authUrl: 'http://localhost:3008/auth',
  bucketUrl: 'http://localhost:3008/bucket',
  AppId: '1253322599', // 应该不需要了
  Bucket: 'catgo',
  Region: 'ap-beijing'
}

export default Settings
```

各项作用：

- authUrl ：就是鉴权 url ，对应的服务器端 API 暂时还没有实现，稍后去做
- bucketUrl： 就是前面实现的列出 bucket 内文件内容的那个 API 对应的 url
<!-- - AppId：这个不用说，肯定是需要的 -->
- Bucket： 填写实际要进行读写的 Bucket 的名字
- Region： 区域简称，都跟前我们介绍过的，服务器端用的信息一致

有了上面的这些参数信息，前端的 cos 接口配置就基本完成。

另外，有了上面的 `bucketUrl` ，redux/actions/index.js 中可以把代码调整一下了

```js
+++ import Settings from './settings'
...
      return dispatch => {
---     axios.get('http://localhost:3008/bucket').then
+++     axios.get(Settings.bucketUrl).then
      }
```

这样把服务器接口链接都放到配置文件中，方便了以后统一做改动。

另外，依然是配置文件的老套路，要把 settings.js 添加到 client/.gitignore 文件中，然后拷贝一份 settings.example.js 跟代码一起上传到 github.com 。

至此，《前端的鉴权》这一小节就胜利完成。



### 服务器实现鉴权 API

到服务器端代码中，实现客户端用到的 authUrl 对应的 API 。

首先解决一个基础设施问题，当客户端通过 POST 方法发送数据到服务器端，服务器端默认是接受不到，需要先来装个包

```
npm i body-parser
```

插一句：接受客户端 POST 过来的数据为何要用 body-parser （主体-解析器）呢？这是因为 POST 请求发送数据时，数据是在 HTTP 请求的 body （主体）中携带到服务器的，这也就是 body-parser 中 body 这个词的由来。

然后，在 server/index.js 添加

```js
const bodyParser = require('body-parser')
...
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
```

这样，body-parser 就生效了。express 代码中，就可以用 req.body.xxx 来拿到 Post 过来的 xxx 数据了，后面马上就会看到这种情形。

接下来，服务器要响应前端发起的鉴权请求，也就是要响应 Post 方法的对 authUrl 的请求，就需要到 server/router.js ，添加路由

```js
router.post('/auth', qcloud.auth)
```

请求收到，执行的函数就是 `qcloud.auth` 。

 server/lib/qcloud.js 中添加 `qcloud.auth` 的实现：

```js
exports.auth = (req, res) => {
  const params = {
    AppId: `${config.AppId}`, // ????
    SecretId: `${config.SecretId}`,
    SecretKey: `${config.SecretKey}`,
    Method: req.body.method,
    Key: req.body.Key
  }

  const cos = new COS(params)

  const Authorization = cos.getAuth(params)
  res.status(200).json(Authorization)
}
```

代码的核心是 `cos.getAuth` 接口。[Nodejs SDK](https://cloud.tencent.com/document/product/436/8629) 的 **鉴权操作** 部分，对 `getAuth()` 的各个参数有详细说明，拷贝如下：

- Method —— (String) ： 操作方法，如 get, post, delete, head 等 HTTP 方法
- Key —— (String) ： 操作的 object 名称，如果请求操作是对文件的，则为文件名，且为必须参数。如果操作是对于 Bucket，则为空
- SecretId —— (String) ：用户的 SecretId，如果 SecretId 和 COS 实例创建时相同，则可以不填
- SecretKey —— (String) ：用户的 SecretKey，如果 SecretKey 和 COS 实例创建时相同，则可以不填

参数列表中 `SecretId` 和 `SecretKey` 的赋值都是从配置文件中拿到。

而后面两项 `Method` 和 `Key` 的值都是从客户端发过来的 HTTP 请求主体中拿到了，这个就仰仗之前安装的 body-parser 这个包。 `Method` 也就是 **操作方法** ，后面的值是 `req.body.method`，就是客户端发请求所用的 HTTP 方法。 `Key` 的这一项，赋值为 `req.body.Key` ，也就是客户端发送过来的文件名。可以考虑 console.log 一下 req.body 这个对象，看看具体客户端都发送了哪些内容进来，便于调试。

`Authorization = cos.getAuth(params)` 这句就是调用 getAuth 接口了，发送机密数据到腾讯云，腾讯云验明无误，会返回授权码，存储到 `Authorization` 变量中 ，这个授权码，服务器端自己不用，直接用 `res.status(200).json(Authorization)` 这条语句返回给前端。

一个有意思的现象是，对初始化 cos 对象的 `COS()` 接口，和进行鉴权的 `getAuth()` 接口传递了相同的参数 params 。其实 [Nodejs SDK](https://cloud.tencent.com/document/product/436/8629) 文档上注明的情况是他们二者需要的参数有交集，但是不相同，但是为啥能传递同一个参数呢？params 列表是二者所需参数的集合，同时 params 又是一个对象，传参数的时候，不怕多传，也不用担心顺序。各个接口会各取所需，忽略多余参数的。

至此，《服务器端实现鉴权 API》这一部分就完成了。

### 前端上传代码

上传代码功能通过调用 [Javscript SDK]( https://cloud.tencent.com/document/product/436/11459) 分块上传接口 sliceUploadFile 来完成。





====





先到 src/components/Main.js 中添加

```js
import UploaderContainer from '../containers/UploaderContainer'
...
<Content>
  <Wrap>
    <UploaderContainer />
  </Wrap>
  ...
</Content>
```

没有什么，就是导入 UploaderContainer 组件。

添加 src/containers/UploaderContainer.js 内容如下：

```js
import React, { Component } from 'react'
import Settings from '../settings'
import cos from '../lib/qcloud'

class UploaderContainer extends Component {

  handleChange = (e) => {
    const file = e.target.files[0]
    const params = {
      Bucket: Settings.Bucket,
      Region: Settings.Region,
      Key: '/aa/peter.txt',
      Body: file
    }

    cos.sliceUploadFile(params, (err, data) => {
      if(err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
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

主要就是使用了 `cos.sliceUploadFile()` 接口， [Javscript SDK]( https://cloud.tencent.com/document/product/436/11459) 上相关文档如下：

- Bucket —— (String) ： Bucket 名称
- Region —— (String) ： Bucket 所在区域。枚举值请见：Bucket 地域信息
- Key —— (String) ： Object名称
- Body —— (File || Blob) ： 上传文件的内容，可以为 File 对象或者 Blob 对象


我再补充解释一下：

- Bucket 目标 bucket 的名字
- Region 跟第一个参数一样，就是锁定上传的目的地，没什么说的
- Key  文件名。这是上传后的本文件在腾讯云上的文件名，和文件本名无关，可以相同也可以不同。我们这里的填写，文件会保存到 aa 文件夹下。
- Body  根据接口文档说明，这里要传一个 `File 对象`，可以用 input 来获取，也就是上面的 `const file = e.target.files[0]`

总是，上面一共四项内容，前面三项加到一起，就是文件上传的目的地位置。最后一项是文件数据源。所以有源头，有目标，逻辑上是完备了。

Chrome 终端中的输出

```js
{Location: "catgo-1253322599.ap-beijing.myqcloud.com/aa/peter.txt", Bucket: "catgo", Key: "aa/peter.txt", ETag: ""8f1a42da36ce65010ad06e1282741bc6-1"", statusCode: 200, …}
```

可以看出，上传成功了。

### 总结

这样，文件上传就成功实现了。可以看出，重点在于鉴权流程。
