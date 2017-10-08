# 进度条

目标：现在已经有上传功能了，本节我们要让每个文件显示自己的上传进度条。

参考：[前端 js SDK v5版本](https://cloud.tencent.com/document/product/436/11459#.E5.88.86.E5.9D.97.E4.B8.8A.E4.BC.A0.E4.BB.BB.E5.8A.A1.E6.93.8D.E4.BD.9C) 的**分块上传任务操作** (不是分块上传操作)

在操作参数说明中，我们可以看到，对于非必须的 onProgress 参数的说明：

>onProgress —— (Function) ： 上传文件的进度回调函数，回调参数为进度对象 progressData

将下面内容添加到代码中（具体位置参见 commit）：

```
... ...
      onProgress: function (progressData) {           /* 非必须 */
            console.log(JSON.stringify(progressData))
          }
    }
... ...
```

通过console可以看到打印出来的内容。
经测试，发现在文件上传的过程中，不断有结构相同的对象打印出来，截取其中一条：

```
{"loaded":5947392,"total":11074706,"speed":5198769.23,"percent":0.53}
```

显然，`percent`就是我们想要的上传进度数据。

由此，我们有了做进度条的思路：

* 在 state 中创建一个表示文件上传进度的变量
* 在进度回调函数中，修改 state 中的值，可以使得相关组件重新渲染，反映文件最新的上传进度


### 使用 antd 的 Progress 组件

先来看看使用 antd 的 Progress 组件都需要哪些数据。组件中定义一个 state 值叫做 progressBars ，数组的每一项对应一个文件的进度条。

```
state = {
  progressBars: [
    {
      percent: 0,
      name: 'aa.mp4',
      status: 'normal',
      uid: 234
    },
    {
      percent: 10,
      name: 'bb.mp4',
      status: 'active',
      uid: 463
    },
    {
      percent: 70,
      name: 'dd.mp4',
      status: 'exception',
      uid: 459
    }
  ]
}
```

参考：[antd 的进度条文档](https://ant.design/components/progress-cn/) ，就可以知道上面 percent 和 status 属性的作用。另外，name 是正在上传的文件名。而 uid 用来唯一的指定这个文件，后续会看到它的作用。

这样，如果组件 jsx 中添加如下的代码

```js
{/* 进度条 */}
{
  this.state.progressBars.map(
    t => {
      return (
        <div key={t.uid}>
          {t.name}
          <Progress percent={t.percent} status={t.status} />
        </div>
      )
    }
  )
}
```

页面上就可以显示出美观的进度条了。

### React 组件读取 percent 值

当然，真正的进度条数据是当有一个（或者多个）文件被拖拽，onChange 函数被触发后才会生成的，所以，最初的 state 值先清空，如下

```
... ...
state = {
  progressBars: []
}


... ...

```

下一步到 onChange 函数的 `if (status !== 'uploading') { ` 之内，添加

```
let progressBar = {
           percent: 0,
           name: file.name,
           status: 'normal',
           uid: file.uid
         }
this.setState({
  progressBars: [ ...progressBars, progressBar]
  })
```

注：
* 查阅 antd 的文档 https://ant.design/components/upload-cn/ **onChange** 部分，会知道，uid 是文件唯一标识。

此时，拖拽几个文件，可以看到页面上的确能够看到对应的进度条。只不过，进度条是不动的，解决这个问题就到 onProgress 函数内部添加代码

```js
onProgress: progressData => {
  this.setState({
    progressBars: this.state.progressBars.map(t => {
      if (t.uid === file.uid) {
        return { ...t, percent: progressData.percent*100}
      }
      return t
    })
  })
}
```

注：同时上传多个文件时，不同的文件进度有更新都会触发 onProgress 函数，所以需要通过 file.uid 来确认要更新那个文件的上传进度。

至此，文件上传进度条已经可以正常工作了。

### 文件上传状态

可以通过更新 antd 的文件上传状态，也就是 https://ant.design/components/progress-cn/ 这里的 status 来获得更加完美的进度条效果。






插入判断文件上传状态的代码：

```
  const status = percent < 100 ? 'active' : 'success'
```

具体代码插入位置，参考最终的 commit 。

这样，可以看到，代码上传过程中，进度条有波纹（ active 的效果），上传接触后，进度条变为（绿色，success 的效果）。


我们还需考虑上传失败时的情况。
由于可能部分文件上传失败，我们用同样的方法，筛选出失败的文件，修改其上传状态。

```js
cos.sliceUploadFile(params, (err, data) => {
      if (err) {
        this.setState({
          progressBars: this.state.progressBars.map(t => {
            if (t.uid === file.uid) {
              const status =  'exception'
              return { ...t, status}
            }
            return t
          })
        })
        message.info(`${file.name} 上传失败`)
      } else {
        message.success(`${file.name} 成功上传`)
      }
    })
```

至此，进度条完工。

commit: progress bar
