# <a name="guntlm"></a>上传图片

这集来添加上传图片功能。

### <a name="y0f4ph"></a>添加上传组件

components/PosterUpload.js

```js
import React, { Component } from 'react'
import styled from 'styled-components'
import Add from './Add'

class PosterUpload extends Component {
  render () {
    return (
      <Wrap>
        <Label htmlFor="imageUploadBtn">
          <Add />
        </Label>
          <Input type="file" id="imageUploadBtn" />
      </Wrap>
    )
  }
}

export default PosterUpload

const Wrap = styled.div`
  margin-top: 20px;
  width: 180px;
  border: 1px solid #ddd;
  height: 180px;
  background-color: #f8f8f8;
`

const Label = styled.label`
  display: block;
  padding: 80px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
`

const Input = styled.input`
  display: none;
`
```

添加 PosterUpload 组件，这一步只是添加了样式。但是样式中也是有学问的。上传图片也是上传文件，所以用 `input type='file'` 是必要的，但是 `input` 本身样式不太好自定制，所以直接让它 `display: none` 。通过 id 跟 input 配合起来的 `label` 点一下，也一样可以上传文件，同时一个 `label` 其实就可以作为一个 div 来任意设置样式了。这里暂时添加一个 svg ，是个加号。

对应的还要添加这个组件的展示组件和图标文件等，代码都在这个 [commit](https://github.com/haoqicat/img-upload/commit/17b4d2629c5e7bb9b5481887a44fc536eac5326b)  。

浏览器中，看到样式出来了。点加号，可以打开文件浏览器。

### <a name="51o5vk"></a>选中图片作为背景图

但是选中图片后，界面上没有任何反应。我希望达成的效果是让图片变成 label ，也就是大方块的背景图。

PosterUpload.js

```js
import Add from './Add'

class PosterUpload extends Component {
  state = {
    image: '',
  }

  handleChange = e => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = evt => {
      console.log('onload', evt.target.result)
      this.setState({
        image: evt.target.result,
      })
    }
  }
  render () {
    const { image } = this.state

    return (
      <Wrap image={image}>
        <Label image={image} htmlFor="imageUploadBtn">
          <Add />
        </Label>
          <Input onChange={this.handleChange} type="file" id="imageUploadBtn" />
      </Wrap>
    )
  }
const Wrap = styled.div`  
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`

const Label = styled.label`
  display: ${props => (props.image ? 'none' : 'block')};
 
```

用一个状态值 `image` 来保存图片数据，`handleChange` 函数中，读取图片数据，设置 `image` 值，这个值是 base64 编码的图片本身，所以可以直接在 css 中做背景图用的。下面把 `image` 状态值分别传递给 `Wrap`  和 `Label` 做属性。

`Wrap` 中用 `image` 来做背景。 `Label` 中如果发现 `image` 不为空了，就把自己隐藏。

浏览器中，选中一个图片，可以看到背景图出现，加号消失。

`Label` 被隐藏后，就不能更改图片了。所以再来添加一个小个的 label ，放到大方块的左上角即可。代码在这个 [commit](https://github.com/haoqicat/img-upload/commit/6a4a81238c2ccfe261b6de8ef654915cfbf8df76)  中

### <a name="sp41xg"></a>代码整理到 utils 中

handleChange 中有不少内容，我们的原则是，展示组件要尽量保证没啥界面以外的逻辑。所以函数中最多也就是控制一下纯粹属于组件内部的 state 值，其他代码都移动出去。

[commit](https://github.com/haoqicat/img-upload/commit/0fb91dd4d9df902ff82e8f91edd36097b6b9afd6) 

浏览器中，会发现图片依然可以正确显示为背景图，同时如果上传了非图片文件，也可以看到报错信息。

### <a name="v47kmi"></a>image 放到 store 中

至此，组件内部样式控制完美了。下一步就是要把图片交给 Form 去一并发送给服务器。把图片文件从当前组件传递到父组件的父组件，也就是 PostNew 组件中，还是略显啰嗦。所以这里来添加一个 store 中的状态值，专门存储图片文件对象。

[commit](https://github.com/haoqicat/img-upload/commit/66b0bbdd00cdf83c107095694d2dd44294bf409f) 

代码中，首先把图片文件对象保存到 store 的 post.imageFile 状态中，然后在 Form 提交的 action 创建函数中就可以拿到这个数据了。

浏览器中，上传文件看一下，可以打印出文件对象。

### <a name="ovgutw"></a>上传图片的前端代码

图片文件要上传，就不能按照原来的普通 json 格式发送了，而要改为 form 数据的格式，对应的前端和后端代码都要做出一些调整。

utils/upload.js

```js
export const initFormData = data => {
  const { title, desc, imageFile } = data
  const formData = new FormData()
  formData.append('title', title)
  formData.append('desc', desc)
  formData.append('imageFile', imageFile)

  return formData
}

```

utils 文件中添加 `initFormData` ，把各项数据都挂到一个 `FormData` 对象之上。

actions/index.js

```js
const newPost = async (data, dispatch) => {
  const formData = initFormData(data)
  try {
    const res = await axios.post(POST_URL, formData)
  } 
}

export const submitForm = data => (dispatch, getState) => {
  const { imageFile } = getState().post
  newPost({ ...data, imageFile }, dispatch)
}
```

`submitForm` 中把图片文件传递给 `newPost` ，newPost 中初始化 `formData` 然后用 axios 发送。axios 检查到发送的数据格式后，会自动调整报头设置的，所以这里无需传递 axios 选项。

调试代码的时候要主要 chrome 开发者工具 Network 标签下的请求详情。`ContentType` 应该是 `multipart/form-data` 。同时 `Payload` 一项下要能看到各项数据。前端请求没有问题了，再调后端代码。

### <a name="uugtpn"></a>上传图片的后端代码

```
cd api
npm i multer
```

后端要接收 formData 这个格式的数据，就要安装 multer 。

api/routes.js

```js
const multer = require('multer')
const upload = multer({ dest: './public/uploads/posts' })

module.exports = app => {
  app.post('/post', upload.single('imageFile'), Post.new)
}
```

导入 `multer` ，指定上传位置。

因为只是上传一张图片，所以用到了 multer 的 [single](https://github.com/expressjs/multer#singlefieldname) 接口, 其参数 `imageFile` 字符串对应客户端表单对象 `formData` 中包含的 `imageFile` 字段，这两个名字必须一样。当客户端请求接口的时候，上传的文件会保存到 `req.file` 中，这个后面会用到。

避免一个误区，就是认为只有上传文件的时候才需要 multer ，其实，只要请求格式是 form-data ，即使不上传文件，也需要用 multer 的。最后在创建 post 的路由中，添加中间件。

实际操作一下，发现是可以上传成功的。
