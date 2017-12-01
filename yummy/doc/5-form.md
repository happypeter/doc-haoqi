# 复用 Form 组件

欢迎来到新的一节《复用 form 组件》。来开发 Signup 和 Login 两个展示组件。其实主要的一个大技巧是如何复用 form 。

### 添加表单 input 列表

进入《添加表单 input 列表》这部分。把表单上面的内容丰富起来。

先把设计图画好。可以看到注册和登录页面上的表单还是有一些差异的，例如 input 数量不同，一些地方的文本也不同。这些差异信息都要在配置数据中体现出来。

首先修改配置数据。

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

这些内容各种的作用，在使用的时候会一目了然。

现在就来使用配置字段。

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index b4511ee..3b18a2a 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -3,13 +3,22 @@ import styled from 'styled-components'
 
 class Form extends Component {
   render() {
-    const { options } = this.props.config
+    const { options, fields } = this.props.config
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
+        { inputList }
       </Wrap>
     )
   }
```

主要是使用 fields 配置，生成了 input 列表。

下面来使用 options 中的信息。

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index 3b18a2a..c02006f 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -1,5 +1,6 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
+import { Link } from 'react-router-dom'
 
 class Form extends Component {
   render() {
@@ -19,6 +20,12 @@ class Form extends Component {
           {options.title}
         </Title>
         { inputList }
+        <Button>
+          {options.title}
+        </Button>
+        <Option>
+          <Link to={options.link}>{options.text}</Link>
+        </Option>
       </Wrap>
     )
   }
@@ -31,3 +38,7 @@ const Wrap =styled.div``
 const Title =styled.div``
 
 const Input =styled.input``
+
+const Option =styled.div``
+
+const Button =styled.button``

```

这个主要用来生成按钮和一个链接。

来看看本部分的最终效果。页面中，可以看到登录和注册页面都可以正确的读到自己的配置。生成了不同的表单。

至此，《添加表单 Input 列表》这部分就胜利完成。

### 添加 CSS

进入下一部分，《添加 CSS》。来把 Form 的样式加上。

先来添加必要的分组标签，然后配合合适的 CSS 。

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index c02006f..354c98a 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -3,7 +3,7 @@ import styled from 'styled-components'
 import { Link } from 'react-router-dom'
 
 class Form extends Component {
-  render() {
+  render () {
     const { options, fields } = this.props.config
     const inputList = fields.map(
       t => (
@@ -14,12 +14,21 @@ class Form extends Component {
         />
       )
     )
-    return(
+    return (
       <Wrap>
-        <Title>
-          {options.title}
-        </Title>
-        { inputList }
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
@@ -33,12 +42,84 @@ class Form extends Component {
 
 export default Form
 
-const Wrap =styled.div``
+const Wrap = styled.div`
+  display: flex;
+  flex-direction: column;
+  height: 100%;
+  width: 280px;
+  margin: 0 auto;
+`
+
+const Hero = styled.div`
+  height: 140px;
+`
+
+const Title = styled.div`
+  font-size: 36px;
+  color: #FFFFFF;
+  line-height: 42px;
+  text-align: center;
+  margin-top: 54px;
+`
+
+const Slogan = styled.div`
+  text-align: center;
+  margin-top: 10px;
+  font-size: 16px;
+  color: #FFFFFF;
+`
 
-const Title =styled.div``
+const Inputs = styled.div`
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
+const Input = styled.input`
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
+const Option = styled.div`
+  margin-bottom: 35px;
+  margin-top: 15px;
+  text-align: center;
+  a {
+    color: white;
+    line-height: 20px;
+  }
+`
 
-const Button =styled.button``
+const Button = styled.button`
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
index 11c1d1a..921ca20 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -12,15 +12,45 @@ const Layout = () => (
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
+          <Route path='/signup' component={SignupContainer} />
+          <Route path='/login' component={LoginContainer} />
+        </Switch>
+      </MainInner>
+    </Main>
   </Wrap>
 )
 
 export default Layout
 
-const Wrap = styled.div``
+const Wrap = styled.div`
+  height: 100vh;
+  background-image: linear-gradient(-45deg, #F77062 0%, #FE5196 100%);
+  display: flex;
+  flex-direction: column;
+`
 
-const Header = styled.div``
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
+  position: absolute;
+  top: 0;
+  left: 0;
+  bottom: 0;
+  right: 0;
+`
```

代码不少，都是样式而已，可以到视频下方的文稿中直接拷贝使用。

来看看本部分达成的效果。Signup 和 Login 页面现在都比较好看了。

至此，《添加 CSS 》这部分也就胜利完成了。

### 拿到提交数据

进入下一部分《拿到提交数据》。如何拿到各个 input 中用户提交的数据。

把各个 Input 都变成受控组件，首先要给每一个 input 分配一个 state 值。

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index 354c98a..c70c147 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -3,6 +3,12 @@ import styled from 'styled-components'
 import { Link } from 'react-router-dom'
 
 class Form extends Component {
+  state = this.props.config.fields.reduce(
+    (obj, t) => {
+      obj[t.name] = ''
+      return obj
+    }, {}
+  )
   render () {
     const { options, fields } = this.props.config
     const inputList = fields.map(
```

由于 Input 数量不固定，所以需要 reduce 帮我们循环一下，拼出来一个我需要的对象。对象的属性名是 input 对应的字段名，属性值的初始值为空字符串。属性名要用中括号括起来，因为是变量，需要求值后使用。整个这几句就给当前组件设置了几个不同的 state 值，每个 Input 恰好分到手一个。

下面，让每个 state 值对应 input 中的输入内容。

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index c70c147..7df7097 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -17,6 +17,7 @@ class Form extends Component {
           key={t.name}
           type={t.type}
           placeholder={t.name}
+          value={this.state[t.name]}
         />
       )
     )
```

这个是通过设置 value 来实现的。

用户输入内容的时候需要修改 state 值，进而修改 value 值。

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index 7df7097..48f2947 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -9,6 +9,13 @@ class Form extends Component {
       return obj
     }, {}
   )
+
+  handleChange = (e, field) => {
+    this.setState({
+      [field]: e.target.value
+    })
+  }
+  
   render () {
     const { options, fields } = this.props.config
     const inputList = fields.map(
@@ -18,6 +25,7 @@ class Form extends Component {
           type={t.type}
           placeholder={t.name}
           value={this.state[t.name]}
+          onChange={e => this.handleChange(e, t.name)}
         />
       )
     )
```

这个就是通过 handleChange 函数来完成的。

下一步来任务要打印出用户提交的数据，首先需要做的就是触发一个函数。

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index 354c98a..8aff3a0 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -29,7 +44,7 @@ class Form extends Component {
             {inputList}
           </Inner>
         </Inputs>
-        <Button>
+        <Button onClick={this.formSubmit}>
           {options.title}
         </Button>
         <Option>
```

用户点按钮的时候，会触发 formSubmit 函数。

来定义 formSubmit 。


还是要借助 reduce 接口，把所有的 state 值，也就是用户输入的数据，拼接成一个对象，存储到 data 变量中。未来这个变量肯定还会进一步的被发送出去，但是暂时我们先打印一下。

```diff
diff --git a/client/src/components/Form.js b/client/src/components/Form.js
index 8aff3a0..09c6cd2 100644
--- a/client/src/components/Form.js
+++ b/client/src/components/Form.js
@@ -16,6 +16,15 @@ class Form extends Component {
     })
   }
 
+  formSubmit = (e) => {
+    e.preventDefault()
+    let data = this.props.config.fields.reduce((obj, t) => {
+      obj[t.name] = this.state[t.name]
+      return obj
+    }, {})
+    console.log('data', data)
+  }
+
   render () {
     const { options, fields } = this.props.config
     const inputList = fields.map(
```

浏览器中验证一下。到登录和注册页面分别输入一下内容，点提交按钮。可以看到终端中是可以打印出输入内容的。

至此，《拿到提交数据》这部分就胜利完成了。

### 总结

进入最后一部分《总结》。

来复盘一下本节的思路。首先通过给一个相同的表单组件传递不同的配置值，让不同的页面都得到了符合自己要求的表单，之后比较简单的内容是添加了一下样式代码进来美化了页面，稍微有点绕的就是如果把一个 input 数量不确定的表单变成一个数控组件，并且最终拿到用户输入的值。这个过程中主要借助的技巧是 reduce 。

至此，《复用 Form 组件》这个小节就胜利完成了。