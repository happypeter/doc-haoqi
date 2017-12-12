# 添加甜点

欢迎来到新的一关《添加甜点》。这次又会用到表单的知识了，所以可以先再温习一下前面《提交表单》那一关的内容。

### 运行表单组件

进入《运行表单组件》这个任务。

添加三个字段的 Input




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


分别是名称描述和价格，用到的 form 属性也好，还是 geFieldDecorator 也好，都是前面已经讲过的了，这里不啰嗦了。

看看达成的效果。随便写点什么，点提交按钮，终端中可以看到这些信息。

### 表单验证

进入《表单验证》这个任务。我们只验证用户是否填写了所有项目。


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


通过给每一个 getFieldDecorator 传递 config 参数，可以给每一个 input 添加验证规则，我们这里的验证规则比较简单，就是要求必填，当然这里也可以写的很复杂啦，可以看看官方文档上的各种写法。那规则填写好之后，何时被触发呢？答案就是在执行 validateFields 接口的时候，我把这个接口放到了 handleSubmit 中，如果验证不通过，就 return false 意思是什么都不要做，等待用户修复问题再次提交。

看看达成的效果。用户填写内容有缺失，点提交按钮，那么缺失项的 input 会有报错，提示用户填写内容。

### 添加 API

进入《添加 API》这个任务。

new-dish-api----

Postman 中测试一下接口

```
{
	"name": "新提拉",
	"desc": "新描述",
	"poster": "暂时没上传",
	"price": 12
}
```

返回信息中可以看到保存成功了。

看看达成的效果。

### 前端调用 API

进入《前端调用 API》这个任务。


submit-dish---

用户填写数据后点提交，会执行 submitDish Action 创建器，因为 poster 也就是海报数据暂时还没有涉及，所以这里先手动添加一个占位符，数据发送到服务器端，如果保存成功，就会返回这条 dish 的信息，我们把它发送给 reducer ，如果返回失败，就会打印出报错信息。

看看达成的效果。

### 上传海报

进入《上传海报》这个任务。


uploader---

上传海报任务其实是独立于 Form 的。Upload 组件一旦选择了文件，就自动开始上传，然后把服务器端返回的文件名传递给 handleSuccess 函数，我这里把这个文件名保存到了状态树的 dish.poster 字段。接下来到新建甜点的表单中，检查一下状态树中 dish.poster 的值，如果为空，就提示用户上传海报，否则，这个文件名会跟随添加其他数据一起被保存到服务器上这个甜点对应的记录中。

看看达成的效果。用户上传海报，然后填写所有信息，提交，可以看到成功提示。手动切换到已有甜点页面，刷新后可以看到新添加的甜点。

### 自动跳转

进入《自动跳转》这个任务。提交甜点成功后，自动跳转到已有甜点页面，并且能直接看到新甜点。

先实现跳转

redirect---

导入 histroy 对象用于页面跳转，导入 updateSeletedIndex 用于更新菜单项高亮。

然后，让新甜点自动出现在列表中

show-dish---

需要做的只是更新一下 redux 中的数据而已。

看看达成的效果。提交新甜点后，能直接跳转并看到新添加的甜点了。

看看达成的效果。

### 前台中查看甜点信息

后台提交新甜点后，就可以到《前台中查看甜点信息》。

启动我们在《 React 社交化电商--功能篇》中开发的电商系统。可以看管理员后台提交的任务都可以在前台的猜你喜欢页面上看到。

好了，《蚂蚁设计实战第二版》课程就到这里了，我是 Peter ，下一门课程中咱们再见。





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


```diff
diff --git a/happy-api-starter-1.0.0/controllers/dish.js b/happy-api-starter-1.0.0/controllers/dish.js
index 1e30dde..2663e0f 100755
--- a/happy-api-starter-1.0.0/controllers/dish.js
+++ b/happy-api-starter-1.0.0/controllers/dish.js
@@ -17,8 +17,8 @@ exports.remove = (req, res) => {
     (err, dish) => {
       if (err) return res.status(500).json({ msg: '查找失败', err })
       if (dish) {
-        dish.remove( err => {
-          if (err) return res.status(500).json({ error: err.message });
+        dish.remove(err => {
+          if (err) return res.status(500).json({ error: err.message })
           return setTimeout(() => res.json({ msg: '删除成功' }), 300)
         })
       }
diff --git a/happy-api-starter-1.0.0/controllers/user.js b/happy-api-starter-1.0.0/controllers/user.js
index 0608940..578416b 100755
--- a/happy-api-starter-1.0.0/controllers/user.js
+++ b/happy-api-starter-1.0.0/controllers/user.js
@@ -91,6 +91,7 @@ exports.all = (req, res) => {
 exports.updateAvatar = (req, res) => {
   User.findOne({ _id: req.body.userId }, (err, user) => {
+    if (err) res.status(500).json({ message: '服务器端错误！' })
     if (user) {
       if (req.file && req.file.filename) {
         user.avatar = req.file.filename
@@ -144,7 +145,7 @@ exports.addFollowing = (req, res) => {
     user => {
       let { followings } = user
       let { userId } = req.body
-      followings.push(req.body.userId)
+      followings.push(userId)
       user.save(() => {
         res.json({
           msg: '添加成功',
```
