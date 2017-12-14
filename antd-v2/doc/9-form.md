# 添加甜点

后台系统最重要的功能之一，就是要能《添加甜点》。这次又会用到表单的知识了，所以可以先再温习一下前面《提交表单》那集的内容。

### 运行表单组件

还是先要《运行表单组件》。

```diff
diff --git a/admin/src/components/NewDish.js b/admin/src/components/NewDish.js
index 7ba84ac..748d89c 100644
--- a/admin/src/components/NewDish.js
+++ b/admin/src/components/NewDish.js
@@ -1,16 +1,56 @@
 import React, { Component } from 'react'
+import { Form, Input, Button, Icon } from 'antd'
 import styled from 'styled-components'
+const FormItem = Form.Item
 class NewDish extends Component {
+  handleSubmit = (e) => {
+    e.preventDefault()
+    const data = this.props.form.getFieldsValue()
+    console.log(data)
+  }
+
   render () {
+    const { getFieldDecorator } = this.props.form;
     return (
       <Wrap>
-        添加甜点
+        <Form onSubmit={this.handleSubmit}>
+          <FormItem>
+            {getFieldDecorator('name')(
+              <Input prefix={<Icon type='heart' style={{ fontSize: 14 }} />}
+                placeholder='名称'
+                type='text'
+              />
+            )}
+          </FormItem>
+          <FormItem>
+            {getFieldDecorator('desc')(
+              <Input prefix={<Icon type='file-text' style={{ fontSize: 14 }} />}
+                placeholder='描述'
+                type='text'
+              />
+            )}
+          </FormItem>
+          <FormItem>
+            {getFieldDecorator('price')(
+              <Input prefix={<Icon type="pay-circle-o" style={{ fontSize: 14 }} />}
+                placeholder='价格'
+                type='text'
+              />
+            )}
+          </FormItem>
+          <FormItem>
+            <Button type='primary' htmlType='submit'>添加甜点</Button>
+          </FormItem>
+        </Form>
       </Wrap>
     )
   }
 }
-export default NewDish
+export default Form.create()(NewDish)
-const Wrap = styled.div``
+const Wrap = styled.div`
+  max-width: 900px;
+  margin: 20px auto;
+`
```

修改都在 NewDish 文件中。添加了三个 Input 分别填写甜点的名称，描述和价格，用到的 form 属性也好，还是 geFieldDecorator 也好，都是前面已经讲过的了，这里不啰嗦了。

不过目前的写法不够简练，重构一下


```diff
diff --git a/admin/src/components/NewDish.js b/admin/src/components/NewDish.js
index 748d89c..e93f896 100644
--- a/admin/src/components/NewDish.js
+++ b/admin/src/components/NewDish.js
@@ -1,6 +1,7 @@
 import React, { Component } from 'react'
 import { Form, Input, Button, Icon } from 'antd'
 import styled from 'styled-components'
+import { newDishFormInputs } from '../constants/NewDishFormConfig'
 const FormItem = Form.Item
 class NewDish extends Component {
@@ -11,34 +12,24 @@ class NewDish extends Component {
   }
   render () {
-    const { getFieldDecorator } = this.props.form;
+    const { getFieldDecorator } = this.props.form
+
+    const inputs = newDishFormInputs.map(
+      t => (
+        <FormItem key={t.name}>
+          {getFieldDecorator(t.name)(
+            <Input prefix={<Icon type={t.iconType} style={{ fontSize: 14 }} />}
+              placeholder={t.placeholder}
+              type='text'
+            />
+          )}
+        </FormItem>
+      )
+    )
     return (
       <Wrap>
         <Form onSubmit={this.handleSubmit}>
-          <FormItem>
-            {getFieldDecorator('name')(
-              <Input prefix={<Icon type='heart' style={{ fontSize: 14 }} />}
-                placeholder='名称'
-                type='text'
-              />
-            )}
-          </FormItem>
-          <FormItem>
-            {getFieldDecorator('desc')(
-              <Input prefix={<Icon type='file-text' style={{ fontSize: 14 }} />}
-                placeholder='描述'
-                type='text'
-              />
-            )}
-          </FormItem>
-          <FormItem>
-            {getFieldDecorator('price')(
-              <Input prefix={<Icon type="pay-circle-o" style={{ fontSize: 14 }} />}
-                placeholder='价格'
-                type='text'
-              />
-            )}
-          </FormItem>
+          {inputs}
           <FormItem>
             <Button type='primary' htmlType='submit'>添加甜点</Button>
           </FormItem>
diff --git a/admin/src/constants/NewDishFormConfig.js b/admin/src/constants/NewDishFormConfig.js
new file mode 100644
index 0000000..f82b38d
--- /dev/null
+++ b/admin/src/constants/NewDishFormConfig.js
@@ -0,0 +1,17 @@
+export const newDishFormInputs = [
+  {
+    name: 'name',
+    iconType: 'heart',
+    placeholder: '名称'
+  },
+  {
+    name: 'desc',
+    iconType: 'file-text',
+    placeholder: '描述'
+  },
+  {
+    name: 'price',
+    iconType: 'pay-circle-o',
+    placeholder: '价格'
+  }
+]
```

核心信息抽离到了 NewDishFormConfig.js 常量文件中，然后 NewDish.js 中 map 一下，达成的效果跟刚才没区别。页面中，随便写点什么，点提交按钮，终端中可以看到这些信息。

### 进行表单验证

不过这次的有新知识了，就是来《进行表单验证》。

```diff
diff --git a/admin/src/components/NewDish.js b/admin/src/components/NewDish.js
index e93f896..d03b5d3 100644
--- a/admin/src/components/NewDish.js
+++ b/admin/src/components/NewDish.js
@@ -1,14 +1,20 @@
 import React, { Component } from 'react'
 import { Form, Input, Button, Icon } from 'antd'
 import styled from 'styled-components'
-import { newDishFormInputs } from '../constants/NewDishFormConfig'
+import { newDishFormInputs, config } from '../constants/NewDishFormConfig'
 const FormItem = Form.Item
 class NewDish extends Component {
+
   handleSubmit = (e) => {
     e.preventDefault()
-    const data = this.props.form.getFieldsValue()
-    console.log(data)
+    this.props.form.validateFields((err, values) => {
+      if (!err) {
+        console.log(values);
+      } else {
+        return false
+      }
+    })
   }
   render () {
@@ -17,7 +23,7 @@ class NewDish extends Component {
     const inputs = newDishFormInputs.map(
       t => (
         <FormItem key={t.name}>
-          {getFieldDecorator(t.name)(
+          {getFieldDecorator(t.name, config)(
             <Input prefix={<Icon type={t.iconType} style={{ fontSize: 14 }} />}
               placeholder={t.placeholder}
               type='text'
diff --git a/admin/src/constants/NewDishFormConfig.js b/admin/src/constants/NewDishFormConfig.js
index f82b38d..fd4a574 100644
--- a/admin/src/constants/NewDishFormConfig.js
+++ b/admin/src/constants/NewDishFormConfig.js
@@ -15,3 +15,7 @@ export const newDishFormInputs = [
     placeholder: '价格'
   }
 ]
+
+export const config = {
+  rules: [{ type: 'string', required: true, message: '必填项目' }]
+}
```

修改了两个文件。

NewDish.js 中，通过给每一个 getFieldDecorator 传递 config 参数，可以给每一个 input 添加验证规则，那规则填写好之后，何时被触发呢？答案就是在执行 validateFields 接口的时候，我把这个接口放到了 handleSubmit 中，如果验证不通过，就 return false 意思是什么都不要做，等待用户修复问题再次提交。

NewDishFormConfig 文件中可以看到，我们这里的验证规则比较简单，就是要求必填，如果缺少，报错信息就是 message 属性指定的必填项目四个字。

看看达成的效果。用户填写内容有缺失，点提交按钮，那么缺失项的 input 会有报错，提示用户填写内容。

### 添加 API

数据想要提交到服务器，首先要到服务器《添加 API》。

```diff
diff --git a/happy-api-starter-1.0.0/controllers/dish.js b/happy-api-starter-1.0.0/controllers/dish.js
index ea45f96..68974da 100755
--- a/happy-api-starter-1.0.0/controllers/dish.js
+++ b/happy-api-starter-1.0.0/controllers/dish.js
@@ -49,3 +49,11 @@ exports.seed = (req, res) => {
   res.send('填充数据库成功！')
 }
+
+exports.new = (req, res) => {
+  const dish = new Dish(req.body)
+  dish.save((err, dish) => {
+    if (err) return res.status(403).json({ msg: '保存失败，请重试', err })
+    return res.json({ msg: '保存成功', dish })
+  })
+}
diff --git a/happy-api-starter-1.0.0/routes.js b/happy-api-starter-1.0.0/routes.js
index bd33ca7..0d3fceb 100755
--- a/happy-api-starter-1.0.0/routes.js
+++ b/happy-api-starter-1.0.0/routes.js
@@ -19,6 +19,7 @@ module.exports = app => {
   app.get('/dishes', Dish.all)
   app.get('/seed-dishes', Dish.seed)
   app.delete('/dish/:id', Dish.remove)
+  app.post('/dish', Dish.new)
   // comments
   app.post('/comment', Comment.new)
```

修改了两个服务器代码文件。

routes.js 中给出了这个 API 的路由 POST /dish

dish.js 中是这个 API 的实现。

Postman 中测试一下接口。发送 POST /dish 请求，Content-Type: aplication.json ，发送 body 为 raw ，填写

```
{
	"name": "新提拉",
	"desc": "新描述",
	"poster": "暂时没上传",
	"price": 12
}
```

点发送，返回信息中可以看到保存成功了。这样，API 就工作了。

### 调用 API

下面来《调用 API》。

```diff
diff --git a/admin/src/actions/dishActions.js b/admin/src/actions/dishActions.js
index 1e2d2d1..be7ef20 100644
--- a/admin/src/actions/dishActions.js
+++ b/admin/src/actions/dishActions.js
@@ -1,5 +1,5 @@
 import * as types from '../constants/ActionTypes'
-import { DISHES_URL, DELETE_DISH_URL } from '../constants/ApiConstants'
+import { DISHES_URL, DELETE_DISH_URL, NEW_DISH_URL } from '../constants/ApiConstants'
 import axios from 'axios'
 export const fetchDishes = () => dispatch => {
@@ -25,3 +25,19 @@ export const deleteDish = id => dispatch => {
       }
     )
 }
+
+export const submitDish = data => dispatch => {
+  return axios.post(NEW_DISH_URL, data)
+    .then(
+      res => {
+        dispatch({ type: types.ADD_DISH, dish: res.data.dish })
+        return { message: '添加甜点成功' }
+      }
+    ).catch(
+      err => {
+        const serverErr = err && err.response
+        console.log('服务器报错：', serverErr)
+        throw new Error('服务器出错啦')
+      }
+    )
+}
diff --git a/admin/src/components/NewDish.js b/admin/src/components/NewDish.js
index d03b5d3..b6a2ac9 100644
--- a/admin/src/components/NewDish.js
+++ b/admin/src/components/NewDish.js
@@ -1,5 +1,5 @@
 import React, { Component } from 'react'
-import { Form, Input, Button, Icon } from 'antd'
+import { Form, Input, Button, Icon, message } from 'antd'
 import styled from 'styled-components'
 import { newDishFormInputs, config } from '../constants/NewDishFormConfig'
 const FormItem = Form.Item
@@ -10,7 +10,19 @@ class NewDish extends Component {
     e.preventDefault()
     this.props.form.validateFields((err, values) => {
       if (!err) {
-        console.log(values);
+        let data = {
+          ...values,
+          poster: 'todo'
+        }
+        this.props.submitDish(data).then(
+          success => {
+            message.success(success.message)
+          }
+        ).catch(
+          err => {
+            message.error(err.message)
+          }
+        )
       } else {
         return false
       }
diff --git a/admin/src/constants/ActionTypes.js b/admin/src/constants/ActionTypes.js
index cf6d8ab..4fbce04 100644
--- a/admin/src/constants/ActionTypes.js
+++ b/admin/src/constants/ActionTypes.js
@@ -3,3 +3,4 @@ export const UPDATE_SELECTED_INDEX = 'UPDATE_SELECTED_INDEX'
 export const RECEIVE_DISHES = 'RECEIVE_DISHES'
 export const REQUEST_DISHES = 'REQUEST_DISHES'
 export const REMOVE_DISH = 'REMOVE_DISH'
+export const ADD_DISH = 'ADD_DISH'
diff --git a/admin/src/constants/ApiConstants.js b/admin/src/constants/ApiConstants.js
index 971e5c0..0e83652 100644
--- a/admin/src/constants/ApiConstants.js
+++ b/admin/src/constants/ApiConstants.js
@@ -3,3 +3,4 @@ const API_HOSTNAME = '//localhost:3008'
 export const posterUrl = poster => poster && `${API_HOSTNAME}/uploads/posters/${poster}`
 export const DISHES_URL = `${API_HOSTNAME}/dishes`
 export const DELETE_DISH_URL = `${API_HOSTNAME}/dish/:id`
+export const NEW_DISH_URL = `${API_HOSTNAME}/dish`
diff --git a/admin/src/containers/NewDishContainer.js b/admin/src/containers/NewDishContainer.js
index 8846d9b..8674913 100644
--- a/admin/src/containers/NewDishContainer.js
+++ b/admin/src/containers/NewDishContainer.js
@@ -1,9 +1,12 @@
 import React from 'react'
 import NewDish from '../components/NewDish'
 import { connect } from 'react-redux'
+import { submitDish } from '../actions/dishActions'
 const NewDishContainer = props => <NewDish {...props} />
 const mapStateToProps = state => ({ })
-export default connect(mapStateToProps)(NewDishContainer)
+export default connect(mapStateToProps, {
+  submitDish
+})(NewDishContainer)
```

一共修改了五个文件。

dishActions 定义了这次的主角，也就是 submitDish 函数。使用 axios 把数据发送给服务器上 NEW_DISH_URL 对应的 API ，如果服务器端保存成功，就先发出 ADD_DISH 这个 action ，把服务器端返回的甜点数据发送给 reducer ，如果失败就返回报错信息。

ApiConstants 文件中添加了 NEW_DISH_URL 的定义，就是新建甜点的 API 链接。

ActionTypes 文件中定义了 ADD_DISH 这个 Action 类型。

容器组件 NewDishContainer.js 中导入 submitDish 接口。

展示组件 NewDish 执行 submitDish 。注意，传入的数据中不仅仅是用户填写的这几项，还需要有海报 poster ，暂时先发了个占位符，.then 和 .catch 中分别展示成功和报错。

看看达成的效果。新建一个新甜点，填写信息点提交，可以看到提交成功的提示信息，到已有标签下，刷新页面后也可以看到新提交的甜点。

### 上传海报

但是缺少海报，所以现在来《上传海报》。

```diff
diff --git a/admin/src/actions/dishActions.js b/admin/src/actions/dishActions.js
index be7ef20..535ee6b 100644
--- a/admin/src/actions/dishActions.js
+++ b/admin/src/actions/dishActions.js
@@ -41,3 +41,7 @@ export const submitDish = data => dispatch => {
       }
     )
 }
+
+export const setPoster = poster => dispatch => {
+  dispatch({ type: types.SET_POSTER, poster })
+}
diff --git a/admin/src/components/NewDish.js b/admin/src/components/NewDish.js
index b6a2ac9..6fa09ba 100644
--- a/admin/src/components/NewDish.js
+++ b/admin/src/components/NewDish.js
@@ -1,6 +1,7 @@
 import React, { Component } from 'react'
 import { Form, Input, Button, Icon, message } from 'antd'
 import styled from 'styled-components'
+import UploaderContainer from '../containers/UploaderContainer'
 import { newDishFormInputs, config } from '../constants/NewDishFormConfig'
 const FormItem = Form.Item
@@ -10,11 +11,12 @@ class NewDish extends Component {
     e.preventDefault()
     this.props.form.validateFields((err, values) => {
       if (!err) {
-        let data = {
-          ...values,
-          poster: 'todo'
+        const { poster } = this.props
+        if (!poster) {
+          message.error('请上传海报')
+          return false
         }
-        this.props.submitDish(data).then(
+        this.props.submitDish({ ...values, poster }).then(
           success => {
             message.success(success.message)
           }
@@ -46,6 +48,7 @@ class NewDish extends Component {
     )
     return (
       <Wrap>
+        <UploaderContainer />
         <Form onSubmit={this.handleSubmit}>
           {inputs}
           <FormItem>
diff --git a/admin/src/components/Uploader.js b/admin/src/components/Uploader.js
new file mode 100644
index 0000000..79efa9e
--- /dev/null
+++ b/admin/src/components/Uploader.js
@@ -0,0 +1,28 @@
+import { Upload, Icon, Button } from 'antd'
+import React, { Component } from 'react'
+import styled from 'styled-components'
+import { uploadAction, uploadProps } from '../constants/ApiConstants'
+
+class Uploader extends Component {
+  handleSuccess = (result) => {
+    console.log('handleSuccess', result.filename)
+    const poster = result.filename
+    this.props.setPoster(poster)
+  }
+
+  render () {
+    return (
+      <Wrap>
+        <Upload { ...Object.assign(uploadProps(this.handleSuccess), uploadAction) } >
+          <Button>
+            <Icon type="upload" /> 上传海报
+          </Button>
+        </Upload>
+      </Wrap>
+    )
+  }
+}
+
+export default Uploader
+
+const Wrap = styled.div``
diff --git a/admin/src/constants/ActionTypes.js b/admin/src/constants/ActionTypes.js
index 4fbce04..0239bee 100644
--- a/admin/src/constants/ActionTypes.js
+++ b/admin/src/constants/ActionTypes.js
@@ -4,3 +4,4 @@ export const RECEIVE_DISHES = 'RECEIVE_DISHES'
 export const REQUEST_DISHES = 'REQUEST_DISHES'
 export const REMOVE_DISH = 'REMOVE_DISH'
 export const ADD_DISH = 'ADD_DISH'
+export const SET_POSTER = 'SET_POSTER'
diff --git a/admin/src/constants/ApiConstants.js b/admin/src/constants/ApiConstants.js
index 0e83652..5439ec6 100644
--- a/admin/src/constants/ApiConstants.js
+++ b/admin/src/constants/ApiConstants.js
@@ -4,3 +4,13 @@ export const posterUrl = poster => poster && `${API_HOSTNAME}/uploads/posters/${
 export const DISHES_URL = `${API_HOSTNAME}/dishes`
 export const DELETE_DISH_URL = `${API_HOSTNAME}/dish/:id`
 export const NEW_DISH_URL = `${API_HOSTNAME}/dish`
+
+export const uploadAction = {
+  action: `${API_HOSTNAME}/dish/poster`,
+  name: 'poster'
+}
+
+export const uploadProps = (handleSuccess) => ({
+  listType: 'picture',
+  onSuccess: handleSuccess
+})
diff --git a/admin/src/containers/NewDishContainer.js b/admin/src/containers/NewDishContainer.js
index 8674913..de91da5 100644
--- a/admin/src/containers/NewDishContainer.js
+++ b/admin/src/containers/NewDishContainer.js
@@ -5,7 +5,9 @@ import { submitDish } from '../actions/dishActions'
 const NewDishContainer = props => <NewDish {...props} />
-const mapStateToProps = state => ({ })
+const mapStateToProps = state => ({
+  poster: state.dish.poster
+})
 export default connect(mapStateToProps, {
   submitDish
diff --git a/admin/src/containers/UploaderContainer.js b/admin/src/containers/UploaderContainer.js
new file mode 100644
index 0000000..e5e4369
--- /dev/null
+++ b/admin/src/containers/UploaderContainer.js
@@ -0,0 +1,12 @@
+import React from 'react'
+import Uploader from '../components/Uploader'
+import { connect } from 'react-redux'
+import { setPoster } from '../actions/dishActions'
+
+const UploaderContainer = props => <Uploader {...props} />
+
+const mapStateToProps = state => ({ })
+
+export default connect(mapStateToProps, {
+  setPoster
+})(UploaderContainer)
diff --git a/admin/src/reducers/dish.js b/admin/src/reducers/dish.js
index d10ebc2..5d34900 100644
--- a/admin/src/reducers/dish.js
+++ b/admin/src/reducers/dish.js
@@ -23,7 +23,17 @@ const isFetching = (state = false, action) => {
   }
 }
+const poster = (state = '', action) => {
+  switch (action.type) {
+    case types.SET_POSTER:
+      return action.poster
+    default:
+      return state
+  }
+}
+
 export default combineReducers({
   all,
-  isFetching
+  isFetching,
+  poster
 })
diff --git a/happy-api-starter-1.0.0/controllers/dish.js b/happy-api-starter-1.0.0/controllers/dish.js
index 68974da..1e30dde 100755
--- a/happy-api-starter-1.0.0/controllers/dish.js
+++ b/happy-api-starter-1.0.0/controllers/dish.js
@@ -57,3 +57,9 @@ exports.new = (req, res) => {
     return res.json({ msg: '保存成功', dish })
   })
 }
+
+exports.uploadPoster = function (req, res) {
+  res.json({
+    filename: req.file.filename
+  })
+}
diff --git a/happy-api-starter-1.0.0/routes.js b/happy-api-starter-1.0.0/routes.js
index 0d3fceb..8ab4ebc 100755
--- a/happy-api-starter-1.0.0/routes.js
+++ b/happy-api-starter-1.0.0/routes.js
@@ -3,6 +3,7 @@ const Dish = require('./controllers/dish')
 const Comment = require('./controllers/comment')
 const multer = require('multer')
 const uploadAvatar = multer({ dest: './public/uploads/avatars' })
+let uploadPoster = multer({ dest: './public/uploads/posters' })
 module.exports = app => {
   // account
@@ -20,6 +21,7 @@ module.exports = app => {
   app.get('/seed-dishes', Dish.seed)
   app.delete('/dish/:id', Dish.remove)
   app.post('/dish', Dish.new)
+  app.post('/dish/poster', uploadPoster.single('poster'), Dish.uploadPoster)
   // comments
   app.post('/comment', Comment.new)
```

这次一共修改了十个文件。

先把目光投向服务器端 API ，到 routes.js 中可以看到定义了 Multer 的上传位置 public/uploads/posters 。下面一句中可以看到上传海报的 API 路由是 POST /dish/poster ，这个前端马上就会用到，上传图片的 API ，跟保存其他甜点信息的 API 是独立开的，这点要注意。

controllers/dish.js 中，上传的具体接口是很简单的，没有任何数据库操作，只是把上传后的文件名，就是很长的一段哈希数，返回给客户端，你会问，那好容易上传的文件，文件名为啥不保存到数据库中呢？答案是，肯定要保存，单不是现在。文件名会返回给客户端，客户端拿到后会跟其他甜点信息一起提交，一起保存。

下一步就是调用 API 的前端代码了。

Uploader.js 中使用了蚂蚁设计的 Upload 组件来进行上传。Upload 组件一旦选择了文件，就自动开始上传，然后把服务器端返回的文件名传递给 handleSuccess 函数，其中会调用 setPoster Action 创建器，把海报的文件名保存到 redux 中，保存起来干嘛咱们先不管，先记着这个茬。

ApiConstants.js 中新加入的内容都是对 Upload 组件的配置，其中图片上传的 API 就写在这里的 Action 属性这了，name 用来指定上传文件名，方便服务器上接收。下面 listType 用来指定 Upload 组件的样式，这里指定的是 picture ，onSuccess 用来指定执行成功后的回调函数。

UploaderContainer.js 的职责是导入 setPoster 函数。

dishActions.js 中定义了 setPoster 函数，发出 SET_POSTER 这个 action 把海报文件名作为负载数据传递给 reducer 。

actionTypes.js 中定义了 SET_POSTER ，这个不必说。

重要的是看 reducer 拿到了海报文件名后干了什么，到 dish.js 中，其实看看也没干什么特殊的，就是把海报名保存到 dish.poster 状态中备用。

那么备用是给谁用呢？到 NewDishContainer ，通过选择器拿到 poster 数据。

最终是交给展示组件 NewDish 中使用。NewDish 中会检查 poster 此时是否为空，如果是那就提示用户先上传海报，否则就把海报和其他三项用户添加的填写信息一起发送给 submitDish 函数，提交给后端 API。

这样这十个文件的作用就都介绍完毕。

看看达成的效果。用户上传海报，然后填写所有信息，提交，可以看到成功提示。手动切换到已有甜点页面，刷新后可以看到新添加的甜点。

### 自动跳转

显然这里缺少《自动跳转》功能。

```diff
diff --git a/admin/src/actions/dishActions.js b/admin/src/actions/dishActions.js
index 535ee6b..f555991 100644
--- a/admin/src/actions/dishActions.js
+++ b/admin/src/actions/dishActions.js
@@ -1,6 +1,8 @@
 import * as types from '../constants/ActionTypes'
 import { DISHES_URL, DELETE_DISH_URL, NEW_DISH_URL } from '../constants/ApiConstants'
 import axios from 'axios'
+import { history } from '../utils/routerUtils'
+import { updateSelectedIndex } from './navActions'
 export const fetchDishes = () => dispatch => {
   dispatch({ type: types.REQUEST_DISHES })
@@ -31,6 +33,9 @@ export const submitDish = data => dispatch => {
     .then(
       res => {
         dispatch({ type: types.ADD_DISH, dish: res.data.dish })
+        const target = '/dashboard/dishes'
+        history.push(target)
+        dispatch(updateSelectedIndex(target))
         return { message: '添加甜点成功' }
       }
     ).catch(
diff --git a/admin/src/actions/navActions.js b/admin/src/actions/navActions.js
index cc9dbcc..64d7ed2 100644
--- a/admin/src/actions/navActions.js
+++ b/admin/src/actions/navActions.js
@@ -1,7 +1,7 @@
 import { history } from '../utils/routerUtils'
 import * as types from '../constants/ActionTypes'
-const updateSelectedIndex = index => ({
+export const updateSelectedIndex = index => ({
   type: types.UPDATE_SELECTED_INDEX,
   index
 })
```

改动了两个文件。

dishActions.js 导入 histroy 对象用于页面跳转，导入 updateSeletedIndex 用于更新菜单项高亮，跳转的目标位置是 target 变量的值，也就是 /dashboard/dishes 。

NavActions.js 中需要把本来没有到场的 updateSelectedIndex 函数前面加上 export 来导出即可。

同时我们也希望，跳转后新甜点能自动出现在列表中

```diff
diff --git a/admin/src/reducers/dish.js b/admin/src/reducers/dish.js
index 5d34900..493307c 100644
--- a/admin/src/reducers/dish.js
+++ b/admin/src/reducers/dish.js
@@ -7,6 +7,8 @@ const all = (state = [], action) => {
       return action.dishes
     case types.REMOVE_DISH:
       return state.filter(dish => dish._id !== action.id)
+    case types.ADD_DISH:
+      return [ ...state, action.dish ]
     default:
       return state
   }
```

需要做的只是更新一下 redux 中的数据而已。

看看达成的效果。提交新甜点后，能直接跳转并看到新添加的甜点了。


### 清空海报数据

有一个小漏洞需要补一下

```diff
diff --git a/admin/src/reducers/dish.js b/admin/src/reducers/dish.js
index 493307c..ccd8061 100644
--- a/admin/src/reducers/dish.js
+++ b/admin/src/reducers/dish.js
@@ -29,6 +29,8 @@ const poster = (state = '', action) => {
   switch (action.type) {
     case types.SET_POSTER:
       return action.poster
+    case types.ADD_DISH:
+      return ''
     default:
       return state
   }
```

提交甜点后，把海报信息清空，不然下次提交甜点的时候如果忘记了添加海报，那么老数据就会发挥作用了。

### 前台中查看甜点信息

后台提交新甜点后，就可以到《前台中查看甜点信息》。

启动我们在《 React 社交化电商--功能篇》中开发的电商系统。可以看管理员后台提交的任务都可以在前台的猜你喜欢页面上看到。

好了，《蚂蚁设计实战第二版》课程就到这里了，我是 Peter ，下一门课程中咱们再见。


### BUGS

到这里，代码有问题，就是一旦一个 action 创建器文件中的函数被 HomeContainer 导入使用了，那么这个文件中其他的函数就都会失效，比如目前 HomeContainer 中导入了 authActions.js 中的 login ，那么另一个接口 logout 就失灵了。

放弃使用 PrivateRoute 就可以修复这个问题，现在看看这个 PrivateRoute 的确写的太随性了，抱歉抱歉。

```diff
diff --git a/antd-v2/admin/src/containers/App.js b/antd-v2/admin/src/containers/App.js
index 33853fa..f7eb46d 100644
--- a/antd-v2/admin/src/containers/App.js
+++ b/antd-v2/admin/src/containers/App.js
@@ -2,7 +2,7 @@ import React, { Component } from 'react'
 import '../assets/global.css'
 import HomeContainer from './HomeContainer'
 import { connect } from 'react-redux'
-import { history, PrivateRoute } from '../utils/routerUtils'
+import { history } from '../utils/routerUtils'
 import {
   Router,
   Switch,
@@ -10,6 +10,7 @@ import {
 } from 'react-router'
 import { loadSelectedIndex } from '../actions/navActions'
 import { fetchDishes } from '../actions/dishActions'
+import DashboardContainer from '../containers/DashboardContainer'

 class App extends Component {
   componentDidMount () {
@@ -23,7 +24,7 @@ class App extends Component {
       <Router history={history} >
         <Switch>
           <Route exact path='/' component={HomeContainer} />
-          <PrivateRoute isAuthenticated={isAuthenticated} />
+          <Route path='/dashboard' component={DashboardContainer} />
         </Switch>
       </Router>
     )
diff --git a/antd-v2/admin/src/utils/routerUtils.js b/antd-v2/admin/src/utils/routerUtils.js
index 8d8a321..96dc48a 100644
--- a/antd-v2/admin/src/utils/routerUtils.js
+++ b/antd-v2/admin/src/utils/routerUtils.js
@@ -1,14 +1,3 @@
 import createBrowserHistory from 'history/createBrowserHistory'
-import React from 'react'
-import { Route, Redirect } from 'react-router-dom'
-import DashboardContainer from '../containers/DashboardContainer'

 export const history = createBrowserHistory()
-
-export const PrivateRoute = ({ isAuthenticated }) => {
-  if (isAuthenticated) {
-    return <Route path='/dashboard' component={DashboardContainer} />
-  } else {
-    return <Redirect to='/' />
-  }
-}
```
