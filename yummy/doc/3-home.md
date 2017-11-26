# 实现 Home 页面

进入《实现 Home 页面》这个小节。来把之前的设计图实现成真正的 React 代码。

### 添加背景

进入第一部分，《添加背景》。给 Home 组件添加背景色。

拷贝设计图中的颜色。到 sketch 图的 UI 页面，选中背景矩形，右击，然后 `Copy CSS Attributes` 。这样剪切板中就有了背景代码了。

粘贴到代码中。到 Home.js 

```diff
diff --git a/client/src/components/Home.js b/client/src/components/Home.js
index 33f6522..0769ff7 100644
--- a/client/src/components/Home.js
+++ b/client/src/components/Home.js
@@ -16,5 +16,5 @@ export default Home
 
 const Wrap = styled.div`
   height: 100vh;
-  background: #00bcd4;
+  background-image: linear-gradient(-45deg, #F77062 0%, #FE5196 100%);
 `
```

是一个渐变色。

浏览器中查看一下。切换到项目页面。可以看到背景色已经生效了。

这样，通过 Sketch 的非常贴心的拷贝 css 功能，我们很容易的就给组件添加了背景色。

至此，《添加背景》这部分就胜利完成了。


### 使用 flexbox 进行布局

进入下一部分《使用 flexbox 进行布局》。布局要保证一定的弹性，适应不同尺寸的手机。

添加两个 styled 组件进 Home 组件


```diff
diff --git a/client/src/components/Home.js b/client/src/components/Home.js
index 0769ff7..51b0de8 100644
--- a/client/src/components/Home.js
+++ b/client/src/components/Home.js
@@ -6,7 +6,8 @@ class Home extends Component {
   render () {
     return (
       <Wrap>
-        Home
+        <Hero></Hero>
+        <Action></Action>
       </Wrap>
     )
   }
@@ -17,4 +18,17 @@ export default Home
 const Wrap = styled.div`
   height: 100vh;
   background-image: linear-gradient(-45deg, #F77062 0%, #FE5196 100%);
+  display: flex;
+  flex-direction: column;
+  justify-content: space-between;
+`
+
+const Hero = styled.div`
+  border: 2px solid yellow;
+  height: 300px;
+`
+
+const Action = styled.div`
+  border: 2px solid yellow;
+  height: 200px;
 `
```

Hero 顶天花板，Action 贴地。

浏览器中缩放一下屏幕。打开 chrome 的设备模式，切换成 iphone5 ，再切换到 iphone6 plus 。会发现布局中只是空闲空间有变化，所以内容区域我可以放心填入内容了。

至此，《使用 Flexbox 进行布局》这部分就胜利完成了。


### 填充各组件内容

进入下一部分，《填充各组件内容》。来把文字图片按钮都加进来。

Sketch 图中导出 svg。选中 svg ，右侧边栏底部，点 `Make Exportable` ，文件 `format` 选 `svg` ，最后点 `export Logo` 。

Hero 中添加 Logo 和 Text 两个兄弟。svg 图标放到 src/assets 中，代码修改一下

```diff
diff --git a/client/src/components/Home.js b/client/src/components/Home.js
index 51b0de8..b86d7f9 100644
--- a/client/src/components/Home.js
+++ b/client/src/components/Home.js
@@ -1,12 +1,16 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
+import logo from '../assets/Logo.svg'
 
 
 class Home extends Component {
   render () {
     return (
       <Wrap>
-        <Hero></Hero>
+        <Hero>
+          <Logo src={logo} />
+          <Text></Text>
+        </Hero>
         <Action></Action>
       </Wrap>
     )
@@ -25,7 +29,18 @@ const Wrap = styled.div`
 
 const Hero = styled.div`
   border: 2px solid yellow;
-  height: 300px;
+`
+
+const Logo = styled.img`
+  display: block;
+  width: 120px;
+  margin: 72px auto;
+}
+`
+
+const Text = styled.div`
+  height: 100px;
+  border: 2px solid green;
 `
 
 const Action = styled.div`
```

`Text` 部分依然是空的。

浏览器中查看一下。切换到浏览器。可以看到 Logo 显示已经没有问题了。

添加 Text 部分的内容。到 Sketch 中拷贝 Title 和 Solgan 字体的 CSS ，粘贴到代码中



```diff
diff --git a/client/src/components/Home.js b/client/src/components/Home.js
index b86d7f9..71c58e9 100644
--- a/client/src/components/Home.js
+++ b/client/src/components/Home.js
@@ -9,7 +9,14 @@ class Home extends Component {
       <Wrap>
         <Hero>
           <Logo src={logo} />
-          <Text></Text>
+          <Text>
+            <Title>
+              吮指
+            </Title>
+            <Slogan>
+              享受舌尖艳遇
+            </Slogan>
+          </Text>
         </Hero>
         <Action></Action>
       </Wrap>
@@ -40,7 +47,18 @@ const Logo = styled.img`
 
 const Text = styled.div`
   height: 100px;
-  border: 2px solid green;
+  color: #FFFFFF;
+  text-align: center;
+  line-height: 1.8;
+`
+
+const Title = styled.div`
+  font-size: 40px;
+`
+
+const Slogan = styled.div`
+  opacity: 0.8;
+  font-size: 20px;
 `
 
 const Action = styled.div`
```

文字就添加好了。


再来添加按钮。到 Action 内部来加。


```diff
diff --git a/client/src/components/Home.js b/client/src/components/Home.js
index 71c58e9..276315a 100644
--- a/client/src/components/Home.js
+++ b/client/src/components/Home.js
@@ -2,7 +2,6 @@ import React, { Component } from 'react'
 import styled from 'styled-components'
 import logo from '../assets/Logo.svg'
 
-
 class Home extends Component {
   render () {
     return (
@@ -18,7 +17,14 @@ class Home extends Component {
             </Slogan>
           </Text>
         </Hero>
-        <Action></Action>
+        <Action>
+          <a>
+            注册
+          </a>
+          <a>
+            登录
+          </a>
+        </Action>
       </Wrap>
     )
   }
@@ -34,9 +40,7 @@ const Wrap = styled.div`
   justify-content: space-between;
 `
 
-const Hero = styled.div`
-  border: 2px solid yellow;
-`
+const Hero = styled.div``
 
 const Logo = styled.img`
   display: block;
@@ -62,6 +66,19 @@ const Slogan = styled.div`
 `
 
 const Action = styled.div`
-  border: 2px solid yellow;
-  height: 200px;
+  display: flex;
+  justify-content: space-around;
+  padding: 80px 0;
+  a {
+    display: block;
+    font-size: 14px;
+    color: #F77062;
+    background: #FFFFFF;
+    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.20);
+    border-radius: 2px;
+    text-align: center;
+    width: 150px;
+    line-height: 56px;
+    min-height: 56px;
+  }
 `
```

`a` 标签未来会换成 react-router 的 Link 。

浏览器中开一下把。切换到浏览器。可以看到首页样式已经完成了。

至此，《填充各组件内容》这部分就胜利完成了。

### 结语

进入最后一部分《总结》。

复盘一下本节的思路。核心任务就是完成首页设计图的代码实现，为此我们采用了由粗到细的思路。先添加了背景，然后是大块布局，最后是填充各个大块的内容。css 语句可以从 Sketch 中拷贝，写 JSX 的时候使用 styled-components 也让代码看上去很简练。

最终，浏览器中看到了首页的完整样式。

那么，《实现 Home 页面》这个小节也就胜利完成了。
