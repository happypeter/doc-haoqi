这一节主要是前端工作了，要实现的是文件上传到 bucket 中。

### 参考

- https://cloud.tencent.com/document/product/436/11459#.E5.88.86.E5.9D.97.E4.B8.8A.E4.BC.A0.E4.BB.BB.E5.8A.A1.E6.93.8D.E4.BD.9C 上的 `js-SDK`的分块上传接口

- antd 相关参数介绍：https://ant.design/components/upload/

### 具体步骤

装包

```
cd client
npm i antd cos-js-sdk-v5 axios
```

### 代码


在 qcloud-cos 仓库中：

 commit: drag to upload

更新：把 UploadContainer.js 中的文件调整一下位置，onChange 放到组件内部，COS 相关的放到 lib/qcloud.js 中。
