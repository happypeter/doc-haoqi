# 制作走马灯样式的猜你喜欢页面

欢迎进入第一章《制作非电商和社交但是很实用的各项功能》。本章中会开发猜你喜欢页面，上面有走马灯效果，会制作甜点详情页面，上面有发评论和数据可视化的功能，这些比较通用的功能先做出来，这样也让后面开发社交和电商的具体功能时候显得更内容具体生动。

进入本章第一小节《制作走马灯样式的猜你喜欢页面》。页面上会显示多种甜点，手指左滑会滚动到下一个甜点。本节来把设计图上的内容开发出来。

### 添加页面

进入第一部分《添加页面》。来添加路由，展示组件和容器组件进来。

sidebar 里面已经有指向猜你喜欢页面的链接了，/dishes 。下面到 Layout 组件中添加对应的路由规则

```diff
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index 484520f..72a7128 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -3,6 +3,7 @@ import LoginContainer from '../containers/LoginContainer'
 import SignupContainer from '../containers/SignupContainer'
 import AlertBoxContainer from '../containers/AlertBoxContainer'
 import SidebarContainer from '../containers/SidebarContainer'
+import DishesContainer from '../containers/DishesContainer'
 import SettingsContainer from '../containers/SettingsContainer'
 import { PrivateRoute } from '../utils/routerUtils'
 import {
@@ -23,6 +24,7 @@ const Layout = ({ title, showAlert, isAuthenticated }) => (
         <Switch>
           <Route path='/signup' component={SignupContainer} />
           <Route path='/login' component={LoginContainer} />
+          <Route path='/dishes' component={DishesContainer} />
           <PrivateRoute isAuthenticated={isAuthenticated} path='/settings' component={SettingsContainer} />
         </Switch>
       </MainInner>
```

先导入 dishesContainer ，然后写一条 route 。

然后添加容器组件

```diff
diff --git a/client/src/containers/DishesContainer.js b/client/src/containers/DishesContainer.js
new file mode 100644
index 0000000..a56ae31
--- /dev/null
+++ b/client/src/containers/DishesContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import Dishes from '../components/Dishes'
+
+const DishesContainer = props => <Dishes {...props} />
+
+export default DishesContainer
\ No newline at end of file
```

一些基本的内容。

最后加展示组件

```diff
diff --git a/client/src/components/Dishes.js b/client/src/components/Dishes.js
new file mode 100644
index 0000000..3371553
--- /dev/null
+++ b/client/src/components/Dishes.js
@@ -0,0 +1,13 @@
+import React, { Component } from 'react'
+
+class Dishes extends Component {
+  render() {
+    return (
+      <div>
+        Dishes
+      </div>
+    )
+  }
+}
+
+export default Dishes
\ No newline at end of file
```

只写个个占位符 dishes 。

看看本部分达成的效果。侧边栏点猜你喜欢链接，可以打开 /dishes 路由，而且可以显示占位符。

至此，《添加页面》这部分就胜利完成了。

### 使用 react-slick 实现走马灯效果

进入下一部分《使用 react-slick 实现走马灯效果》。先不考虑具体要展示的内容，先把走马灯效果写出来。

首先安装 [react-slick](https://github.com/akiran/react-slick)

```
npm i react-slick
```

slick 是如丝般顺滑的意思，react-slick 就是专门用来做走马灯效果的。

添加 css 进来。

```diff
diff --git a/client/src/assets/global.css b/client/src/assets/global.css
index 9a81f06..96268d9 100644
--- a/client/src/assets/global.css
+++ b/client/src/assets/global.css
@@ -1,4 +1,6 @@
 @import '~react-spinner/react-spinner.css';
+@import "~slick-carousel/slick/slick.css";
+@import "~slick-carousel/slick/slick-theme.css";
 body {
   margin: 0;
```

上面的这个 slick-carousel 是跟 react-slick 配合的一个包，已经作为依赖安装进来了。

展示组件中来运行 react-slick

```diff
diff --git a/client/src/components/Dishes.js b/client/src/components/Dishes.js
index 3371553..148ff23 100644
--- a/client/src/components/Dishes.js
+++ b/client/src/components/Dishes.js
@@ -1,10 +1,26 @@
 import React, { Component } from 'react'
+import Slider from 'react-slick'
 class Dishes extends Component {
   render() {
+    const settings = {
+      dots: true,
+      infinite: false,
+      speed: 500,
+      slidesToShow: 1,
+      slidesToScroll: 1,
+      arrows: false
+    }
     return (
       <div>
-        Dishes
+        <Slider {...settings}>
+          {
+            [
+              <div key="1">page1</div>,
+              <div key="2">page2</div>
+            ]
+          }
+        </Slider>
       </div>
     )
   }
```

配置项中，dots 为 true ，意思要显示下面的点。infinite 为 false ，意思是不要无限循环翻页，speed 500 是翻页切换时间，slidesToShow 意思是一次显示几个页面，slidesToScroll 滑动一次翻几页，arrows false 就是不要左右两侧的箭头。接下来真正使用就是以数组形式传入多个页面即可。

看看本部分达成的效果。到 /dishes 页面，手指左滑，可以看到走马灯效果了。

至此，《使用 react-slick 实现走马灯效果》这部分就胜利完成了。


### 添加走马灯样式

进入下一部分《添加走马灯样式》。让页面美观起来。

修改代码

```diff
diff --git a/client/src/components/Dishes.js b/client/src/components/Dishes.js
index 148ff23..0778fbe 100644
--- a/client/src/components/Dishes.js
+++ b/client/src/components/Dishes.js
@@ -1,5 +1,6 @@
 import React, { Component } from 'react'
 import Slider from 'react-slick'
+import styled from 'styled-components'
 class Dishes extends Component {
   render() {
@@ -12,18 +13,50 @@ class Dishes extends Component {
       arrows: false
     }
     return (
-      <div>
+      <Wrap>
         <Slider {...settings}>
           {
             [
-              <div key="1">page1</div>,
-              <div key="2">page2</div>
+              <Card key="1">
+                <DishesCard />
+              </Card>,
+              <Card key="2">
+                <DishesCard />
+              </Card>
             ]
           }
         </Slider>
-      </div>
+      </Wrap>
     )
   }
 }
-export default Dishes
\ No newline at end of file
+export default Dishes
+
+const Wrap = styled.div`
+  height: 100%;
+  padding-bottom: 90px;
+  .slick-dots {
+    bottom: -40px;
+    li.slick-active button:before {
+      opacity: .9;
+      color: white;
+    }
+    li button:before {
+      opacity: .4;
+      color: white;
+    }
+  }
+`
+
+const Card = styled.div`
+  padding: 35px;
+  padding-top: 5px;
+  padding-bottom: 0;
+  height: 100%;
+`
+
+const DishesCard = styled.div`
+  height: 70vh;
+  background: white;
+`
\ No newline at end of file
```

首先导入 styled-components 来添加样式。接下来把每一页要显示的主体内容都放到 DishesCard 组件中 ，暂时给它一个简单的样式就是纯白背景。另外，就是在 Wrap 组件里面通过嵌套 css 的形式，把走马灯下面的点修改了样式。

看看本部分达成的效果。页面上看到下面的点点，以及卡片样式都和设计图一致了。

至此，《添加走马灯样式》这部分就胜利完成了。

### 走马灯每页详情样式

进入下一部分《走马灯每页详情样式》。把上一步设置成白板的 DishesCard 的内容填充起来。

首先把它作为一个独立的组件抽离出来。


```diff
diff --git a/client/src/components/Dishes.js b/client/src/components/Dishes.js
index 0778fbe..add7cce 100644
--- a/client/src/components/Dishes.js
+++ b/client/src/components/Dishes.js
@@ -1,6 +1,7 @@
 import React, { Component } from 'react'
 import Slider from 'react-slick'
 import styled from 'styled-components'
+import DishesCard from '../components/DishesCard'
 class Dishes extends Component {
   render() {
@@ -55,8 +56,3 @@ const Card = styled.div`
   padding-bottom: 0;
   height: 100%;
 `
-
-const DishesCard = styled.div`
-  height: 70vh;
-  background: white;
-`
\ No newline at end of file
```

因为里面未来内容会很多。

然后先不传递实际数据，先把基本样式跑起来。

```diff
diff --git a/client/src/components/DishesCard.js b/client/src/components/DishesCard.js
new file mode 100644
index 0000000..572fe4e
--- /dev/null
+++ b/client/src/components/DishesCard.js
@@ -0,0 +1,83 @@
+import React, { Component } from 'react'
+import { Link } from 'react-router-dom'
+import styled from 'styled-components'
+
+class DishesCard extends Component {
+  render() {
+    return (
+      <Wrap to={`/dish/id`} >
+        <Poster />
+        <Details>
+          <Name>
+            黑森林
+          </Name>
+          <Price>
+            23元
+          </Price>
+          <Desc>
+            非常好吃
+            <Mask />
+          </Desc>
+        </Details>
+      </Wrap>
+    )
+  }
+}
+
+export default DishesCard
+
+const Wrap = styled(Link) `
+  display: block;
+  min-height: 75vh;
+  width: 100%;
+  background: #FFFFFF;
+  box-shadow: 0 10px 20px 0 rgba(0,0,0,0.20);
+  display: flex;
+  flex-direction: column;
+`
+
+const Poster = styled.div`
+  width: 100%;
+  height: 210px;
+  background: lightseagreen;
+`
+
+const Details = styled.div`
+  padding: 0 10px;
+  display: flex;
+  flex-direction: column;
+  flex-grow: 1;
+`
+
+
+const Name = styled.div`
+  text-align: center;
+  font-size: 26px;
+  color: #F77062;
+  line-height: 32px;
+  margin-top: 45px;
+`
+
+const Price = styled.div`
+  color: #878787;
+  text-align: center;
+  margin-top: 20px;
+`
+
+const Desc = styled.div`
+  font-size: 14px;
+  color: #878787;
+  margin-top: 20px;
+  text-align: center;
+  line-height: 24px;
+  position: relative;
+`
+
+const Mask = styled.div`
+  position: absolute;
+  top: 0;
+  left: 0;
+  right: 0;
+  bottom: 0;
+  background-image: linear-gradient(-180deg, rgba(255,255,255,0.00) 0%, #FFFFFF 100%);
+`
\ No newline at end of file
```

按照设计图写 CSS 而已，没有需要讲解的内容。

看看本部分达成的效果。页面上可以看到除了顶部的甜点海报，其他的设计图上的内容都体现出来了。

至此，《走马灯每页详情样式》这部分就胜利完成了。

### 添加海报

进入下一部分《添加海报》。把海报放到服务器上，然后写前端代码把海报显示出来。

服务器端代码文件夹下，手动创建 public/uploads/posters 文件夹，然后放两张甜点图片进来，分别叫 hsl.png 和 tlms.png 。

常量文件中加入一个生成海报链接的函数

```diff
diff --git a/client/src/constants/ApiConstants.js b/client/src/constants/ApiConstants.js
index c8fd9a0..225b540 100644
--- a/client/src/constants/ApiConstants.js
+++ b/client/src/constants/ApiConstants.js
@@ -4,3 +4,4 @@ export const SIGNUP_URL = `${API_HOSTNAME}/user/signup`
 export const LOGIN_URL = `${API_HOSTNAME}/user/login`
 export const USERS_URL = `${API_HOSTNAME}/users`
 export const USER_BY_ID_URL = `${API_HOSTNAME}/user/:id`
+export const posterUrl = poster => `${API_HOSTNAME}/uploads/posters/${poster}`
```

传入不同的海报文件名，可以得到这张海报在服务器上的链接。

添加一些甜点的临时数据

```diff
diff --git a/client/src/components/Dishes.js b/client/src/components/Dishes.js
index add7cce..4a36ac7 100644
--- a/client/src/components/Dishes.js
+++ b/client/src/components/Dishes.js
@@ -13,18 +13,33 @@ class Dishes extends Component {
       slidesToScroll: 1,
       arrows: false
     }
+
+    const dishes = [
+      {
+        _id: '1',
+        poster: 'tlms.png',
+        name: '提拉米苏',
+        price: 20,
+        desc: '好吃好吃'
+      },
+      {
+        _id: '2',
+        poster: 'hsl.png',
+        name: '黑森林',
+        price: 20,
+        desc: '好吃好吃'
+      }
+    ]
+
     return (
       <Wrap>
         <Slider {...settings}>
           {
-            [
-              <Card key="1">
-                <DishesCard />
-              </Card>,
-              <Card key="2">
-                <DishesCard />
+            dishes.map(dish => (
+              <Card key={dish._id} >
+                <DishesCard dish={dish} />
               </Card>
-            ]
+            ))
           }
         </Slider>
       </Wrap>
```

添加了一个对象数组，然后把数据传递给 DishesCard 去使用。


DishesCard 来展示数据


```diff
diff --git a/client/src/components/DishesCard.js b/client/src/components/DishesCard.js
index 572fe4e..02aead4 100644
--- a/client/src/components/DishesCard.js
+++ b/client/src/components/DishesCard.js
@@ -1,21 +1,23 @@
 import React, { Component } from 'react'
 import { Link } from 'react-router-dom'
 import styled from 'styled-components'
+import { posterUrl } from '../constants/ApiConstants'
 class DishesCard extends Component {
   render() {
+    const { dish } = this.props
     return (
-      <Wrap to={`/dish/id`} >
-        <Poster />
+      <Wrap to={`/dish/${dish._id}`} >
+        <Poster poster={dish.poster} />
         <Details>
           <Name>
-            黑森林
+            {dish.name}
           </Name>
           <Price>
-            23元
+            {dish.price}元
           </Price>
           <Desc>
-            非常好吃
+            {dish.desc}
             <Mask />
           </Desc>
         </Details>
@@ -39,7 +41,10 @@ const Wrap = styled(Link) `
 const Poster = styled.div`
   width: 100%;
   height: 210px;
-  background: lightseagreen;
+  background: url(${props => posterUrl(props.poster)});
+  background-repeat: no-repeat;
+  background-position: center center;
+  background-size: 370px;
 `
 const Details = styled.div`
```

首先用实际数据覆盖原来的展位符。其中关键的是海报一项，作为 background 添加进来。

看看本部分达成的效果。页面中显示比较完美了。

至此，《添加海报》这部分就胜利完成了。

### 结语

进入最后一部分《结语》。

复盘一下本节思路。首先通过使用插件来实现走马灯效果，然后用一下占位符数据先把界面调通，最后添加实际数据进来再调通，任务拆解成小步骤，做起来才能轻松愉悦无压力。

至此，《制作走马灯样式的猜你喜欢页面》这个小节就胜利结束了。
