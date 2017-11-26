# 复用 Form 组件

欢迎来到新的一节《复用 form 组件》。来开发 Signup 和 Login 两个展示组件。其实主要的一个大技巧是如何复用 form 。


### 添加表单样式


- 通过往 From 组件中传递 fileds 数据，生成不同的 inputList

添加配置字段。

```diff
diff --git a/client/src/constants/FormConfig.js b/client/src/constants/FormConfig.js
index a211e95..fff3697 100644
--- a/client/src/constants/FormConfig.js
+++ b/client/src/constants/FormConfig.js
@@ -1,11 +1,39 @@
 export const signupConfig = {
+  fields: [
+    {
+      name: 'username',
+      type: 'text'
+    },
+    {
+      name: 'password',
+      type: 'password'
+    },
+    {
+      name: 'passwordConfirm',
+      type: 'password'
+    }
+  ],
   options: {
+    text: '已有账号，直接登录',
+    link: '/login',
     title: '注册'
   }
 }
 
 export const loginConfig = {
+  fields: [
+    {
+      name: 'username',
+      type: 'text'
+    },
+    {
+      name: 'password',
+      type: 'password'
+    }
+  ],
   options: {
+    text: '没有账号，请先注册',
+    link: '/signup',
     title: '登录'
   }
 }
```

使用配置字段。


```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index 12bbcc4..3988cce 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -1,15 +1,31 @@
 import React, { Component } from 'react'
+import { Link } from 'react-router-dom'
 import styled from 'styled-components'
 
 class Form extends Component {
   render() {
-    const { options } = this.props.config
+    const { fields, options } = this.props.config
+    console.log('config', fields)
+    const inputList = fields.map(
+      t => (
+        <Input
+          key={t.name}
+          type={t.type}
+          placeholder={t.name}
+        />
+      )
+    )
     return(
       <Wrap>
         <Title>
           {options.title}
         </Title>
-        <Input />
+        {inputList}
+        <Button>
+          {options.title}
+        </Button>
+        <Option>
+          <Link to={options.link}>{options.text}</Link>
+        </Option>
       </Wrap>
     )
   }
@@ -23,3 +39,7 @@ const Wrap =styled.div``
 const Title =styled.div``
 
 const Input =styled.input``
+
+const Option =styled.div``
+
+const Button =styled.button``
```



### 添加 CSS

进入下一部分，《添加 CSS》。来把登录和注册页的样式加上。

画高保真图。到 Sketch 中，我这里已经都画好了。写代码的时候可以参考。

书写 CSS 。

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index 2ddf3af..dd54732 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -5,7 +5,6 @@ import styled from 'styled-components'
 class Form extends Component {
   render() {
     const { fields, options } = this.props.config
-    console.log('config..', fields)
     const inputList = fields.map(
       t => (
         <Input
@@ -14,13 +13,21 @@ class Form extends Component {
         />
       )
     )
-    console.log('inputList....', inputList)
     return(
       <Wrap>
-        <Title>
-          {options.title}
-        </Title>
-        {inputList}
+        <Hero>
+          <Title>
+            {options.title}
+          </Title>
+          <Slogan>
+            连接小而确定的幸福
+          </Slogan>
+        </Hero>
+        <Inputs>
+          <Inner>
+            {inputList}
+          </Inner>
+        </Inputs>
         <Button>
           {options.title}
         </Button>
@@ -34,13 +41,84 @@ class Form extends Component {
 
 export default Form
 
+const Wrap =styled.div`
+  display: flex;
+  flex-direction: column;
+  height: 100%;
+  width: 280px;
+  margin: 0 auto;
+`
+
+const Hero =styled.div`
+  height: 140px;
+`
+
+const Title =styled.div`
+  font-size: 36px;
+  color: #FFFFFF;
+  line-height: 42px;
+  text-align: center;
+  margin-top: 54px;
+`
 
-const Wrap =styled.div``
+const Slogan =styled.div`
+  text-align: center;
+  margin-top: 10px;
+  font-size: 16px;
+  color: #FFFFFF;
+`
 
-const Title =styled.div``
+const Inputs =styled.div`
+  display: flex;
+  flex-direction: column;
+  flex-grow: 1;
+  justify-content: space-around;
+`
 
-const Input =styled.input``
+const Inner = styled.div`
+  display: flex;
+  flex-direction: column;
+`
 
-const Option =styled.div``
+const Input =styled.input`
+  line-height: 16px;
+  padding: 20px 8px;
+  font-size: 14px;
+  border: 0;
+  outline: 0;
+  border-bottom: 1px solid #E3E9EC;
+  text-indent: 20px;
+  color: #878787;
+  &::placeholder {
+    color: #CECECE;
+  }
+`
+
+const Option =styled.div`
+  margin-bottom: 35px;
+  margin-top: 15px;
+  text-align: center;
+  a {
+    color: white;
+    line-height: 20px;
+  }
+`
 
-const Button =styled.button``
+const Button =styled.button`
+  display: block;
+  border: 0;
+  line-height: 56px;
+  outline: 0;
+  width: 280px;
+  margin: 0 auto;
+  text-align: center;
+  background: #FFFFFF;
+  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.20);
+  border-radius: 2px;
+  font-size: 14px;
+  color: #F77062;
+  user-select: none;
+  touch-action: manipulation;
+  position: relative;
+  /* andriod 手机上，入户输入表单时候，按钮会自动变位置，参考 ant-design 的登录表单代码*/
+`
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index 11c1d1a..bd96eea 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -12,15 +12,47 @@ const Layout = () => (
     <Header>
       页面标题
     </Header>
-    <Switch>
-      <Route path="/signup" component={SignupContainer} />
-      <Route path="/login" component={LoginContainer} />
-    </Switch>
+    <Main>
+      <MainInner>
+        <Switch>
+          <Route path="/signup" component={SignupContainer} />
+          <Route path="/login" component={LoginContainer} />
+        </Switch>
+      </MainInner>
+    </Main>
   </Wrap>
 )
 
 export default Layout
 
-const Wrap = styled.div``
 
-const Header = styled.div``
+const Wrap = styled.div`
+  height: 100vh;
+  background-image: linear-gradient(-45deg, #F77062 0%, #FE5196 100%);
+  display: flex;
+  flex-direction: column;
+`
+
+const Header = styled.div`
+  height: 80px;
+  padding-top: 45px;
+  line-height: 14px;
+  padding-bottom: 21px;
+  box-sizing: border-box;
+  text-align: center;
+  color: #fff;
+`
+
+const Main = styled.div`
+  flex-grow: 1;
+  position: relative;
+`
+
+const MainInner = styled.div`
+  ${'' /* 不加这个 Inner ，子元素设置 height: 100% 就不灵 */}
+  position: absolute;
+  top: 0;
+  left: 0;
+  bottom: 0;
+  right: 0;
+`
```

代码不少，都是样式而已，关键的地方我稍微加了些注释，可以到视频下方的文稿中直接拷贝使用。


### 拿到提交数据

如何拿到各个 form input 中用户提交的数据。


把各个 Input 都变成受控组件

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index 2d32e92..7553772 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -3,6 +3,19 @@ import { Link } from 'react-router-dom'
 import styled from 'styled-components'
 
 class Form extends Component {
+  state = this.props.config.fields.reduce(
+    (obj, t) => {
+      obj[t.name] = ''
+      return obj
+    }, {}
+  )
+
+  handleChange = (e, field) => {
+    this.setState({
+      [field]: e.target.value
+    })
+  }
+
   render() {
     const { fields, options } = this.props.config
     const inputList = fields.map(
@@ -11,6 +24,8 @@ class Form extends Component {
           key={t.name}
           type={t.type}
           placeholder={t.name}
+          value={this.state[t.name]}
+          onChange={e => this.handleChange(e, t.name)}
         />
       )
     )
```

这样，用户输入的内容就都会保存到 state 中了。

打印出用户提交的数据。


```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index 7553772..76cfa04 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -16,6 +16,16 @@ class Form extends Component {
     })
   }
 
+
+  formSubmit = (e) => {
+    e.preventDefault()
+    let data = this.props.config.fields.reduce((obj, t) => {
+      obj[t.name] = this.state[t.name]
+      return obj
+    }, {})
+    console.log('data', data)
+  }
+
   render() {
     const { fields, options } = this.props.config
     const inputList = fields.map(
@@ -44,7 +54,7 @@ class Form extends Component {
             {inputList}
           </Inner>
         </Inputs>
-        <Button>
+        <Button onClick={this.formSubmit}>
           {options.title}
         </Button>
         <Option>
```

道理很简单，就是把各个 state 值中存放的用户输入都拿到，拼成一个对象。只不过由于 state 的数量不太确定，所以必须用 reduce 循环一下。

浏览器中验证一下。到登录和注册页面分别输入一下内容，点提交按钮。可以看到终端中是可以打印出输入内容的。

至此，《拿到提交数据》这部分就胜利完成了。


### 总结

进入最后一部分《总结》。

先来复盘一下本节的思路。

再来看看本节的最终劳动成果。

至此，《复用 Form 组件》这个小节就胜利完成了。