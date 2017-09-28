# 创建文件夹

这一步，我们要实现如下功能：
* 可以将文件上传至bucket中指定的文件夹
* 如果该文件夹还不存在，上传时自动创建之

仔细阅读[js-SDK的文档](https://cloud.tencent.com/document/product/436/11459#put-object)，会注意到**Put Object**小节里，有这么一句：

> 注意，Key(文件名) 不能以 / 结尾，否则会被识别为文件夹

那么，反其道而行之，我们就有了指定文件夹的方法。

老办法，还是先在state中添加一条folder

```
... ...
class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      progress: [],
      folder: ''
    }
  }
... ...
```


然后使用antd的 Input组件，来修改this.state.folder

```
... ...
        {/*上传目标文件夹*/}
        <div className={"has-success"} style={{ marginTop: 16, height: 80 }}>
          <text>目标文件夹：{this.state.folder ? this.state.folder : 'bucket顶层'}</text>
          <Input placeholder="要传入的文件夹名称" onPressEnter={this.onPressEnter.bind(this)} />
          <div className="ant-form-explain">可用数字、中英文、下划线组合，最多20个字符</div>
        </div>

... ...
```

腾讯cos对文件夹的名称做了限制：
* 可用数字、中英文、下划线组合
* 最多20个字符

我们可以在Input组件的onPressEnter函数中加以限制。
使用了正则表达式。

```
... ...
/指定的文件夹名
  onPressEnter (e) {
    console.log(e.target.value)
    let folderName = e.target.value.trim()
    let parseName = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/

    //分开判断，便于精确提示用户
    if (folderName === '') {
      message.success('文件将上传至bucket顶层')
      this.setState({
        folder: ``
      })
    } else if (folderName.length > 20) {
      message.error('最多支持 20 个字符')
      this.setState({
        inputClass: 'has-feedback has-error'
      })
    } else if (!parseName.test(folderName)) {
      message.error('仅支持数字、中英文、下划线')
      this.setState({
        inputClass: 'has-feedback has-error'
      })
    } else {
      this.setState({
        folder: `${folderName}/`,
        inputClass: 'has-feedback has-success'
      })
      e.target.value = ''
      message.success(`文件将上传至${folderName}/`)
    }
  }


... ...
```

最后，也是最关键的一步：将修改后的路径填入上传的接口参数中
```
... ...
//尝试在回调中引入cos-js-sdk 分块上传
      var params = {
        Bucket: 'hq123',
        Region: 'ap-chengdu',
        Key: `${that.state.folder}${file.name}`,
        Body: file,

        ... ...
```

至此，试着在上传时，填入一个文件夹名称，进行上传。上传成功后，发现云端文件夹已经被创建，里面是刚刚上传的文件。

commit: dir
