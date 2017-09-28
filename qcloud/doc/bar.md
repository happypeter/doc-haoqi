# 进度条


目标：现在已经有上传功能了，本节我们要让每个文件显示自己的上传进度条。



参考：[前端 js SDK v5版本](https://cloud.tencent.com/document/product/436/11459#.E5.88.86.E5.9D.97.E4.B8.8A.E4.BC.A0.E4.BB.BB.E5.8A.A1.E6.93.8D.E4.BD.9C) 的**分块上传任务操作** (不是分块上传操作)

在操作参数说明中，我们可以看到，对于非必须的onProgress参数的说明：

>onProgress —— (Function) ： 上传文件的进度回调函数，回调参数为进度对象 progressData

将其添加到代码中：

```
... ...

//尝试在回调中引入cos-js-sdk 分块上传
    var params = {
      Bucket: 'hq123',
      Region: 'ap-chengdu',
      Key: `${file.name}`,
      Body: file,
      onProgress: function (progressData) {           /* 非必须 */
            console.log(JSON.stringify(progressData))
          }
    };
... ...
```

通过console可以看到打印出来的内容。
经测试，发现在文件上传的过程中，不断有结构相同的对象打印出来，截取其中一条：

```
{"loaded":5947392,"total":11074706,"speed":5198769.23,"percent":0.53}
```

显然，`percent`就是我们想要的上传进度数据。

由此，我们有了做进度条的思路：

* 在state中创建一个表示文件上传进度的变量；
* 在进度回调函数中，修改state中的值，可以使得相关组件重新渲染，反映文件最新的上传进度；
* 考虑到一次拖拽上传多个文件的情况，需要想办法把文件各自的进度信息一一对应


首先，创建state。考虑到一次上传多个文件，这里采用数组的结构。

```
... ...

class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      progress: []
    }
  }

... ...

```

在开始上传文件前，为它初始化进度数据对象。

```
... ...
onChange(info) {
  const status = info.file.status
  if (status !== 'uploading') {
    let file = info.file.originFileObj

    // 为要上传的文件file生成一个空的进度条
          let uploadObj = {
            percent: 0,
            name: file.name,
            status: 'normal',
            uid: file.uid
          }

          let [ ...clonedProgress ] = this.state.progress

          clonedProgress.push(uploadObj)

          this.setState({
            progress: clonedProgress
          })

    //尝试在回调中引入cos-js-sdk 分块上传
    var params = {
      Bucket: 'hq123',
      Region: 'ap-chengdu',
      Key: `${file.name}`,
      Body: file,
    };
    ... ...

```

注：
* 查阅antd的文档https://ant.design/components/upload-cn/ **onChange**部分，会知道，uid是文件唯一标识。
* state中的值只能用setState()方法修改，所以此处先复制this.state.progress的副本，修改副本后，再将其赋值到state中。使用了ES6的新方法。


当多个文件同时上传，由于上传是并发的，所以我们接收到的onProgress()函数每次返回的进度信息是乱序的。
必须做一个筛选，让每一条进度信息“各找各妈”。

这里，我们使用了ES6为数组添加的新方法 find() 和 findIndex(）,通过唯一的uid属性来进行筛选。
  介绍： blablabla 《深入理解ES6》


```
... ...

  let [ ...clonedTempProgress ] = that.state.progress

  //筛选出本次上传进度信息的"主人" 以及它在数组中的index
  let newUploadFileInfo = clonedTempProgress.find(
    item => item.uid === file.uid
  )
  let thisFilesIndex = clonedTempProgress.findIndex(
    item => item.uid === file.uid
  )

  //更新进度数据
  let percent = progressData.percent*100
  newUploadFileInfo.percent = percent

  // 进度信息各回各家
  clonedTempProgress[thisFilesIndex] = newUploadFileInfo

  that.setState({
    progress: clonedTempProgress
  })

  ... ...

```

至此，我们就有了实时的进度数据。
下一步，将其展示出来。这里用到了 antd 的进度条组件
参考文档： https://ant.design/components/progress-cn/
用map方法，为每一个文件的进度数据生成一个进度条。

code:

```
... ...

{/* 进度条 */}
        {
          this.state.progress.map(
            (item, index) => {
              return (
                <div key={index}>
                  <text>{item.name}</text>
                  <Progress percent={item.percent} status={item.status} />
                </div>
              )
            }
          )
        }
... ...

```

此时，试着上传一下，可以看到，随着文件成功上传，进度条已经能从0走到100了。但是样式不好看。
下面，丰富一下进度条的样式：

在上面的代码中，更新进度数据后，插入判断文件上传状态的代码
```
... ...

// 精确更新进度
  newUploadFileInfo.percent = percent

  if (percent < 100) {
    newUploadFileInfo.status = 'active'
  } else if (percent === 100) {
    newUploadFileInfo.status = 'success'
  }

  clonedTempProgress[thisFilesIndex] = newUploadFileInfo

... ...

```

再试一次，发现文件上传成功后，进度条的样式发生了改变。

我们还需考虑上传失败时的情况。
由于可能部分文件上传失败，我们用同样的方法，筛选出失败的文件，修改其上传状态。

```
... ...

cos.sliceUploadFile(params, function(err, data) {
  if(err) {
  console.log(err);

  // 进度条报错样式
  let [ ...clonedTempProgress ] = that.state.progress
  // es6: 筛选出本次上传进度信息的主人 以及它在数组中的index
  let newUploadFileInfo = clonedTempProgress.find(
    item => item.uid === file.uid
  )
  let thisFilesIndex = clonedTempProgress.findIndex(
    item => item.uid === file.uid
  )

  //更新进度
  newUploadFileInfo.status = 'exception'

  clonedTempProgress[thisFilesIndex] = newUploadFileInfo

  that.setState({
    progress: clonedTempProgress
  })
  // 进度条报错结束

}  else {
    console.log(data);
    message.success(`${file.name} 成功上传`)
  }
});
//cos-js-sdk 分块上传 结束

... ...
```

至此，进度条完工

commit: progress bar
