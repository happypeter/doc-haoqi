
### 拖拽文件以上传

实现：

* 拖拽
  * antd的`Dragger`组件
* 上传
  * `js-SDK`的分块上传接口，上传文件到 qcloud cos 服务中的一个 Bucket

具体步骤：

先看`js-SDK`的`Slice Upload File`接口文档中，对四个必要参数的说明

>操作参数说明
>
>params (Object) ： 参数列表
>
>Bucket —— (String) ： Bucket 名称
>
>Region —— (String) ： Bucket 所在区域。枚举值请见：Bucket 地域信息
>
>Key —— (String) ： Object名称
>
>Body —— (File || Blob) ： 上传文件的内容，可以为File 对象或者 Blob 对象


前三个都好说，重点是第四个**Body**：可以为**File 对象**或者 Blob 对象

解释一下什么是File对象：

 这是Html5的新特性，参考：https://developer.mozilla.org/en-US/docs/Web/API/File

 File 类型的父类型就是 blob

下一步看如何得到File对象？ 既然要做拖拽上传，就要通过拖拽的方式得到它。

  现在看antd[Upload文档](https://ant.design/components/upload-cn/)的*拖拽上传*部分的实例代码

```
import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: true,
  showUploadList: false,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file);
    }
    if (status === 'done') {

    ...  ...

```

试着上传，在第一个if里，将console.log的内容改为仅打印info.file。在console中可以发现，info.file里，有个属性：originFileObj。它就是我们想要的File对象。
在`props`的参数`action: ''`中，填入无效的上传地址。由此，`status !== 'uploading'`我们能直接进入回调onChange()函数。

在onChange()函数中，我们可以调用JS-SDK的上传接口

```
onChange(info) {
  let file = info.file.originFileObj
  if (status !== 'uploading') {
    //尝试在回调中引入cos-js-sdk 分块上传
    var params = {
      Bucket: `${config.Bucket}`,
      Region: `${config.Region}`,
      Key: `${file.name}`,
      Body: file,  
    };
    cos.sliceUploadFile(params, function(err, data) {
      if(err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
    //cos-js-sdk 分块上传 结束
  }
}
```
就可以实现文件的拖拽上传了。

由于拖拽组件中，"multiple"参数设置为“true”，所以可以一次拖拽上传多个文件。

代码：commit cbd7f678f436c2f2fabc19ca540a62cf9b6fa6c9

 drag file to upload
