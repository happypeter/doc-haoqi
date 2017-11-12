# 用蚂蚁设计提升 UE

本节来完善上传过程的用户体验，使用 [蚂蚁设计的 Upload](https://ant.design/components/upload/) 组件，实现多文件的选择上传和拖拽上传，以及完成上传成功后自动弹出提示信息，并且列表上能立刻显示文件等这些细节。


### 使用 Upload 组件

使用 Upload 组件，帮助我们实现多文件同时上传，以及拖拽上传。

src/containers/UploadContainer.js 调整一下

```js
+++ import Uploader from '../components/Uploader'

    handleChange = (info) => {
---   const file = e.target.files[0]
+++   const file = info.file.originFileObj
      const params = {
---     Key: `aa/peter.txt`,        
+++     Key: `aa/${file.name}`,
      }
  }
  render () {
    return (
      <div>
---      <input type="file" onChange={ this.handleChange } />
+++      <Uploader onChange={this.handleChange} />
      </div>
    )
  }
}

export default UploaderContainer
```

Key 这次改成了 `aa/${file.name}` 可以在上传后保留原文件名。Body 要的 `File 对象` ， `Dragger` 组件（稍后在 Uploader 组件内会看到）也可以为我们生成，通过 `info.file.originFileObj` 就可以拿到。Dragger 比原来那个 input 强的地方是，第一支持拖拽，第二支持多文件同时上传。

创建 src/components/Uploader.js 内容如下：

```js
import React, { Component } from 'react'
import { Upload, Icon } from 'antd'
const Dragger = Upload.Dragger

class Uploader extends Component {
  myCustormRequest = () => {
    console.log('avoid no action error')
  }

  handleChange = (info) => {
    this.props.onChange(info)
  }

  render () {
    const params = {
      multiple: true,
      showUploadList: false,
      onChange: this.handleChange,
      customRequest: this.myCustormRequest
    }
    return (
      <Dragger {...params}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
      </Dragger>
    )
  }
}

export default Uploader
```

上面参数的意义，在 [Upload 文档](https://ant.design/components/upload-cn/) 上都能找到，这里我补充解释一下：

- multiple 设置为 true ，因为我们需要能同时上传多个文件
- showUploadList 这个作用其实跟进度条类似，后面我们会给每个文件都加进度条，所以这个就多余了，设置为 false ，意思是不需要显示
- onChange 真正调用上传接口（ cos.sliceUploadFile ）是在 `onChange` 的处理函数中。这个函数的特点是，如果我们同时选中多个文件上传，事件就会被触发多次。
- customRequest 蚂蚁设计的 Upload 组件，要求 `action` 一项必须填写，不然终端中就会报错。通过给参数中添加：customRequest 覆盖默认上传行为，可以把报错去掉。

好，Dragger 配置好了，可以点击上传，也可拖拽上传。

### 添加上传成功信息

涉及到 Promise 的使用。


src/containers/UploaderContainer.js 中， 改写为返回一个 Promise ，改写内容：

```js
+++ return new Promise (
+++   (resolve, reject) => {
        cos.sliceUploadFile(params, (err, data) => {
          if(err) {
+++         reject(file.name)
            console.log(err)
          } else {
+++         resolve(file.name)
            console.log(data)
          }
       })
      }
    )
```

这样，到 src/components/Uploader.js 中就可以使用 Promise 了，把 handleChange 函数改为：

```js
handleChange = (info) => {
  this.props.onChange(info).then(
    fileName => message.success(`${fileName} 上传成功`)
  ).catch(
    fileName => message.error(`${fileName} 上传失败`)
  )
}
```

这样，文件上传成功或者失败后，就可以看到提示信息了。

### 上传到当前文件夹

现在来把文件上传到当前文件夹，


src/containers/UploaderContainer.js 需要的调整

```js
+++ import { getCurrentDir } from '../redux/reducers'
+++ import { connect } from 'react-redux'

    handleChange = (info) => {
+++   const { currentDir } = this.props
...
---   Key: `aa/${file.name}`,
+++   Key: `${currentDir}/${file.name}`,
    }

+++ const mapStateToProps = state => ({
+++   currentDir: getCurrentDir(state)
+++ })

--- export default UploaderContainer
--- export default connect(mapStateToProps)(UploaderContainer)
```

测试一下，导航菜单中选中一个文件夹，那这个文件夹就是当前文件夹，上传文件，文件会保存到该文件夹中。

### 自动刷新文件列表

这一步要达成的效果：上传完毕，文件列表能自动刷新看到新文件。

src/containers/UploaderContainer.js 中

```js
+++ import { addFile } from '../redux/actions'
...

+++ const key = `${currentDir}/${file.name}`
    const params = {
---   Key: `${currentDir}/${file.name}`
+++   Key: key,
      ...
    }
    cos.sliceUploadFile(params, (err, data) => {
      if(err) {
        ...
      } else {
        resolve(file.name)
+++     this.props.addFile(key)
        console.log(data)
      }
    })
--- export default connect(mapStateToProps)(UploaderContainer)
+++ export default connect(mapStateToProps, { addFile })(UploaderContainer)

```

redux/actions/index.js 添加一个 action creator ，如下

```js
export const addFile = (filePath) => {
  return dispatch => {
    axios.get(Settings.bucketUrl).then(
      res => {
        const newFile = res.data.Contents.find(
          t => t.Key === filePath
        )
        dispatch({ type: 'ADD_FILE', newFile })
      }
    )
  }
}
```

redux/reducers/index.js 中的 rootReducer 内部添加

```js
case 'ADD_FILE':
  return {
    ...state,
    allFiles: [...state.allFiles, action.newFile]
  }
```

上面代码的流程是这样的：视频上传成功，在 UploaderContainer 组件中执行

```js
this.props.addFile(key)
```

触发对应的 action 的 action creator ，也就是 redux/actions/index.js 中的 addFile 函数。那么既然，我们通过 `key` 变量，可以拿到文件路径，那么在 addFile 函数中为何还要在去服务器端请求一次数据呢？答案就是在真正添加文件到 store 中的 `allFiles` 变量中时，我们不但需要文件路径，还需要其他各种信息，其中最关键的是 Etag 值，没有 Etag ，那么 FileTable 组件就不能正常运行，而 Etag 是必须从服务器端获得的，所以在 addFile() 中我们执行了 axios 请求，然后发出了 action ，携带完整的新添加的这个文件的各项信息，触发了 redux/reducers/index.js 中的 ADD_FILE 对应的 reducer 代码。这样，store 中的状态的变化，直接就会体现到 FileTable 组件上，我们就可以看到文件列表上显示出了新文件了。

### 总结

这样，上传一个或者多个文件，可以看到客户端会依次弹出“上传成功”的提示框。到腾讯云自己的后台，也可看到 bucket 中确实多了我们刚刚上传的这几个文件。

[Github 上查看本节完整 diff](xxx)
