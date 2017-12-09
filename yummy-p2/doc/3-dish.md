# 制作甜点详情页

欢迎来到新的一节《制作甜点详情页》。显示甜点的海报，价格和购买按钮等信息，涉及到使用嵌套方式复用样式以及 svg 图表进行数据可视化的内容。

### 添加页面

进入第一部分《添加页面》。先把甜点详情页，也就是 /dish/xxid 链接页面的样式写好。

首先添加页面和路由

```diff
diff --git a/client/src/components/Dish.js b/client/src/components/Dish.js
new file mode 100644
index 0000000..2f56b01
--- /dev/null
+++ b/client/src/components/Dish.js
@@ -0,0 +1,13 @@
+import React, { Component } from 'react'
+
+class Dish extends Component {
+  render() {
+    return (
+      <div>
+        Dish
+      </div>
+    )
+  }
+}
+
+export default Dish
diff --git a/client/src/components/Layout.js b/client/src/components/Layout.js
index cdedb9f..d0f40e4 100644
--- a/client/src/components/Layout.js
+++ b/client/src/components/Layout.js
@@ -11,6 +11,7 @@ import {
   Route
 } from 'react-router-dom'
 import styled from 'styled-components'
+import DishContainer from '../containers/DishContainer'
 const Layout = ({ title, showAlert, isAuthenticated }) => (
   <Wrap>
@@ -25,6 +26,7 @@ const Layout = ({ title, showAlert, isAuthenticated }) => (
           <Route path='/signup' component={SignupContainer} />
           <Route path='/login' component={LoginContainer} />
           <Route path='/dishes' component={DishesContainer} />
+          <Route path="/dish/:id" component={DishContainer} />
           <PrivateRoute isAuthenticated={isAuthenticated} path='/settings' component={SettingsContainer} />
         </Switch>
       </MainInner>
diff --git a/client/src/containers/DishContainer.js b/client/src/containers/DishContainer.js
new file mode 100644
index 0000000..6475cf4
--- /dev/null
+++ b/client/src/containers/DishContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import Dish from '../components/Dish'
+
+const DishContainer = props => <Dish {...props} />
+
+export default DishContainer
```

甜点的展示组件定义到 Dish.js 中，然后来添加容器组件，以及路由。

页面样式比较多，按照由粗到细的原则，先来添加大块布局的样式。

```diff
diff --git a/client/src/components/Dish.js b/client/src/components/Dish.js
index 2f56b01..47b92a1 100644
--- a/client/src/components/Dish.js
+++ b/client/src/components/Dish.js
@@ -1,13 +1,49 @@
 import React, { Component } from 'react'
+import styled from 'styled-components'
 class Dish extends Component {
   render() {
     return (
-      <div>
-        Dish
-      </div>
+      <Wrap>
+        <ImgWrap>
+          <Img />
+        </ImgWrap>
+        <Card>
+        </Card>
+      </Wrap>
     )
   }
 }
 export default Dish
+
+const Wrap = styled.div`
+  background-color: #F9FAFB;
+  padding: 10px;
+  margin-top: 80px;
+`
+
+const Card = styled.div`
+  min-height: 300px;
+  width: 100%;
+  margin-top: 10px;
+  background: #FFFFFF;
+  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
+  padding: 10px;
+`
+
+const ImgWrap = styled.div`
+  background-color: #fff;
+  margin: 0 auto;
+  margin-top: -80px;
+  height: 200px;
+  width: 230px;
+  padding: 5px;
+  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
+`
+
+const Img = styled.div`
+  background: lightseagreen;
+  width: 100%;
+  height: 100%;
+`
```

添加了海报区的 ImgWrap ，和下面的详情区的 Card 。

详情区里面再来添加新内容。

```diff
diff --git a/client/src/components/Dish.js b/client/src/components/Dish.js
index 47b92a1..82d5f96 100644
--- a/client/src/components/Dish.js
+++ b/client/src/components/Dish.js
@@ -1,5 +1,6 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
+import DishBuyAreaContainer from '../containers/DishBuyAreaContainer'
 class Dish extends Component {
   render() {
@@ -9,6 +10,7 @@ class Dish extends Component {
           <Img />
         </ImgWrap>
         <Card>
+          <DishBuyAreaContainer />
         </Card>
       </Wrap>
     )
diff --git a/client/src/components/DishBuyArea.js b/client/src/components/DishBuyArea.js
new file mode 100644
index 0000000..a6c0041
--- /dev/null
+++ b/client/src/components/DishBuyArea.js
@@ -0,0 +1,61 @@
+import React, { Component } from 'react'
+import DishBuyIcon from './DishBuyIcon'
+import { GRAY } from '../constants/Colors'
+import styled from 'styled-components'
+
+class DishBuyArea extends Component {
+  render() {
+    return (
+      <Wrap>
+        <Name>
+          黑森林
+        </Name>
+        <Price>
+          23元
+        </Price>
+        <Icon>
+          <DishBuyIcon color={GRAY} />
+        </Icon>
+        <Desc>
+          好吃好吃
+        </Desc>
+      </Wrap>
+    )
+  }
+}
+
+export default DishBuyArea
+
+
+const Wrap = styled.div`
+`
+
+const Name = styled.div`
+  text-align: center;
+  font-weight: 400;
+  margin-bottom: 10px;
+  font-size: 26px;
+  color: #F77062;
+  line-height: 32px;
+  margin-top: 20px;
+`
+
+const Price = styled.div`
+  color: #878787;
+  text-align: center;
+  margin-top: 20px;
+`
+
+const Icon = styled.div`
+  text-align: center;
+  width: 30px;
+  margin: 20px auto;
+`
+
+const Desc = styled.div`
+  font-size: 14px;
+  margin-top: 20px;
+  color: #878787;
+  text-align: center;
+  line-height: 24px;
+`
diff --git a/client/src/components/DishBuyIcon.js b/client/src/components/DishBuyIcon.js
new file mode 100644
index 0000000..60f91a8
--- /dev/null
+++ b/client/src/components/DishBuyIcon.js
@@ -0,0 +1,21 @@
+import React, { Component } from 'react'
+
+class DishBuyIcon extends Component {
+  render() {
+    return (
+      <svg width="20px" height="19px" viewBox="0 0 20 19" >
+        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
+          <g transform="translate(-170.000000, -448.000000)" fillRule="nonzero" fill={this.props.color}>
+            <g id="shopping-cart" transform="translate(170.000000, 448.000000)">
+              <path d="M19.006,2.97 C18.815,2.751 18.54,2.625 18.25,2.625 L4.431,2.625 L4.236,1.461 C4.156,0.979 3.739,0.625 3.25,0.625 L1,0.625 C0.447,0.625 0,1.072 0,1.625 C0,2.178 0.447,2.625 1,2.625 L2.403,2.625 L4.263,13.789 C4.271,13.834 4.294,13.871 4.308,13.913 C4.324,13.966 4.337,14.016 4.362,14.064 C4.394,14.13 4.437,14.186 4.482,14.243 C4.513,14.282 4.541,14.321 4.577,14.355 C4.635,14.409 4.702,14.447 4.77,14.485 C4.808,14.506 4.841,14.534 4.882,14.55 C4.998,14.597 5.12,14.625 5.249,14.625 C5.25,14.625 16.25,14.625 16.25,14.625 C16.803,14.625 17.25,14.178 17.25,13.625 C17.25,13.072 16.803,12.625 16.25,12.625 L6.097,12.625 L5.931,11.625 L17.25,11.625 C17.748,11.625 18.17,11.259 18.24,10.767 L19.24,3.767 C19.281,3.479 19.195,3.188 19.006,2.97 Z M17.097,4.625 L16.812,6.625 L13.25,6.625 L13.25,4.625 L17.097,4.625 Z M12.25,4.625 L12.25,6.625 L9.25,6.625 L9.25,4.625 L12.25,4.625 Z M12.25,7.625 L12.25,9.625 L9.25,9.625 L9.25,7.625 L12.25,7.625 Z M8.25,4.625 L8.25,6.625 L5.25,6.625 C5.197,6.625 5.149,6.64 5.102,6.655 L4.764,4.625 L8.25,4.625 Z M5.264,7.625 L8.25,7.625 L8.25,9.625 L5.597,9.625 L5.264,7.625 Z M13.25,9.625 L13.25,7.625 L16.668,7.625 L16.383,9.625 L13.25,9.625 Z" id="Shape"></path>
+              <circle id="Oval" cx="6.75" cy="17.125" r="1.5"></circle>
+              <circle id="Oval" cx="15.75" cy="17.125" r="1.5"></circle>
+            </g>
+          </g>
+        </g>
+      </svg>
+    )
+  }
+}
+
+export default DishBuyIcon
diff --git a/client/src/constants/Colors.js b/client/src/constants/Colors.js
new file mode 100644
index 0000000..b25d4e0
--- /dev/null
+++ b/client/src/constants/Colors.js
@@ -0,0 +1,2 @@
+export const BRAND_PINK = '#FE5196'
+export const GRAY = '#D0D0D0'
diff --git a/client/src/containers/DishBuyAreaContainer.js b/client/src/containers/DishBuyAreaContainer.js
new file mode 100644
index 0000000..0395dc7
--- /dev/null
+++ b/client/src/containers/DishBuyAreaContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import DishBuyArea from '../components/DishBuyArea'
+
+const DishBuyAreaContainer = props => <DishBuyArea {...props} />
+
+export default DishBuyAreaContainer
```

添加了 DishBuyArea 组件进来，购买按钮就在这个区域。

看看本部分达成的效果。这样，页面上的效果跟设计图一致了。

至此，《添加页面》这部分就胜利完成了。

### 准备数据

进入下一部分《准备数据》。总体思路是这样，所有的甜点数据都已经加载到 redux 中了，所以只需要添加选择器就能拿到一个甜点的数据了。

依然是一个熟悉的套路。

```diff
diff --git a/client/src/components/Dish.js b/client/src/components/Dish.js
index 82d5f96..a847d5f 100644
--- a/client/src/components/Dish.js
+++ b/client/src/components/Dish.js
@@ -1,13 +1,17 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
 import DishBuyAreaContainer from '../containers/DishBuyAreaContainer'
+import { posterUrl } from '../constants/ApiConstants'
 class Dish extends Component {
   render() {
+    const { dishesById, match } = this.props
+    const { id } = match.params
+    const dish = dishesById[id] || {}
     return (
       <Wrap>
         <ImgWrap>
-          <Img />
+          <Img poster={dish.poster} />
         </ImgWrap>
         <Card>
           <DishBuyAreaContainer />
@@ -45,7 +49,10 @@ const ImgWrap = styled.div`
 `
 const Img = styled.div`
-  background: lightseagreen;
+  background: url(${props => posterUrl(props.poster)});
+  background-repeat: no-repeat;
+  background-position: center center;
+  background-size: 370px;
   width: 100%;
   height: 100%;
 `
diff --git a/client/src/containers/DishContainer.js b/client/src/containers/DishContainer.js
index 6475cf4..06856cc 100644
--- a/client/src/containers/DishContainer.js
+++ b/client/src/containers/DishContainer.js
@@ -1,6 +1,12 @@
 import React from 'react'
 import Dish from '../components/Dish'
+import { connect } from 'react-redux'
+import { getDishesById } from '../selectors/dishSelectors'
 const DishContainer = props => <Dish {...props} />
-export default DishContainer
+const mapStateToProps = state => ({
+  dishesById: getDishesById(state)
+})
+
+export default connect(mapStateToProps)(DishContainer)
diff --git a/client/src/selectors/dishSelectors.js b/client/src/selectors/dishSelectors.js
index b3b832e..6220340 100644
--- a/client/src/selectors/dishSelectors.js
+++ b/client/src/selectors/dishSelectors.js
@@ -1 +1,11 @@
+import { createSelector } from 'reselect'
+
 export const getDishes = state => state.dish.all
+
+export const getDishesById = createSelector(
+  getDishes,
+  dishes => dishes.reduce((obj, dish) => {
+    obj[dish._id] = dish
+    return obj
+  }, {})
+)
```

添加选择器 ，然后容器组件中使用选择器拿到数据，最后传递给展示组件使用，这样海报数据就有了。

到 DishBuyArea 自己的容器组件中再次取一次数据。

```diff
diff --git a/client/src/components/DishBuyArea.js b/client/src/components/DishBuyArea.js
index a6c0041..3b01209 100644
--- a/client/src/components/DishBuyArea.js
+++ b/client/src/components/DishBuyArea.js
@@ -5,19 +5,22 @@ import styled from 'styled-components'
 class DishBuyArea extends Component {
   render() {
+    const { dishesById, match } = this.props
+    const { id } = match.params
+    const dish = dishesById[id] || {}
     return (
       <Wrap>
         <Name>
-          黑森林
+          {dish.name}
         </Name>
         <Price>
-          23元
+          {dish.price}元
         </Price>
         <Icon>
           <DishBuyIcon color={GRAY} />
         </Icon>
         <Desc>
-          好吃好吃
+          {dish.desc}
         </Desc>
       </Wrap>
     )
diff --git a/client/src/containers/DishBuyAreaContainer.js b/client/src/containers/DishBuyAreaContainer.js
index 0395dc7..f64e30a 100644
--- a/client/src/containers/DishBuyAreaContainer.js
+++ b/client/src/containers/DishBuyAreaContainer.js
@@ -1,6 +1,13 @@
 import React from 'react'
 import DishBuyArea from '../components/DishBuyArea'
+import { connect } from 'react-redux'
+import { withRouter } from 'react-router-dom'
+import { getDishesById } from '../selectors/dishSelectors';
 const DishBuyAreaContainer = props => <DishBuyArea {...props} />
-export default DishBuyAreaContainer
+const mapStateToProps = (state) => ({
+  dishesById: getDishesById(state)
+})
+
+export default connect(mapStateToProps)(withRouter(DishBuyAreaContainer))
```

说明一下，因为 DishBuyArea 自己还会用到很多其他的 Dish 组件用不到的接口，所以单纯创建了一个自己的容器组件来跟外界沟通。另外本着良好封装的原则，DishBuyArea 自己的数据完全由自己的 container 来组织，尽量不从 Dish 组件传入，withRouter 的作用是让我们可以在 DishBuyArea 展示组件内拿到路由信息，从而拿到 dishId 。

看看本部分达成的效果。页面上海报以及各项信息现在都是服务器上的实际数据了。

至此，《准备数据》这部分就胜利完成了。

### 复用 section 标题

进入下一部分《复用 section 标题》。下面要添加多个部分，每个部分的标题和副标题的样式都是一样的，想要复用 css 和 html 其实有多种方式，我这里采用了一种比较好玩的。

Dish 详情页，还要添加 DishInfo 和 DishComments 两部分进来。

```diff
diff --git a/client/src/components/Dish.js b/client/src/components/Dish.js
index a847d5f..ddfbfc8 100644
--- a/client/src/components/Dish.js
+++ b/client/src/components/Dish.js
@@ -1,7 +1,10 @@
 import React, { Component } from 'react'
 import styled from 'styled-components'
 import DishBuyAreaContainer from '../containers/DishBuyAreaContainer'
+import Section from './DishSection'
 import { posterUrl } from '../constants/ApiConstants'
+import DishInfoContainer from '../containers/DishInfoContainer'
+import DishCommentsContainer from '../containers/DishCommentsContainer'
 class Dish extends Component {
   render() {
@@ -15,6 +18,12 @@ class Dish extends Component {
         </ImgWrap>
         <Card>
           <DishBuyAreaContainer />
+          <Section>
+            <DishInfoContainer />
+          </Section>
+          <Section>
+            <DishCommentsContainer />
+          </Section>
         </Card>
       </Wrap>
     )
diff --git a/client/src/components/DishComments.js b/client/src/components/DishComments.js
new file mode 100644
index 0000000..18526a1
--- /dev/null
+++ b/client/src/components/DishComments.js
@@ -0,0 +1,22 @@
+import React, { Component } from 'react'
+
+class DishComments extends Component {
+
+  componentDidMount = () => {
+    this.props.setSubTitle({
+      title: '评论',
+      details: `评论数: 0`
+    })
+  }
+
+  render() {
+    return (
+      <div>
+        Comments
+      </div>
+    )
+  }
+}
+
+
+export default DishComments
diff --git a/client/src/components/DishInfo.js b/client/src/components/DishInfo.js
new file mode 100644
index 0000000..3e553a8
--- /dev/null
+++ b/client/src/components/DishInfo.js
@@ -0,0 +1,21 @@
+import React, { Component } from 'react'
+
+class DishInfo extends Component {
+  componentDidMount() {
+    this.props.setSubTitle({
+      title: '营养配比',
+      details: '点圆弧查看细节'
+    })
+  }
+
+  render() {
+    return (
+      <div>
+        DishInfo
+      </div>
+    )
+  }
+}
+
+
+export default DishInfo
diff --git a/client/src/components/DishSection.js b/client/src/components/DishSection.js
new file mode 100644
index 0000000..ca41187
--- /dev/null
+++ b/client/src/components/DishSection.js
@@ -0,0 +1,49 @@
+import React, { Component } from 'react'
+import styled from 'styled-components'
+
+// Note: 创建这个组件就是为了复用下面这两个 styled-components 组件。
+class DishSection extends Component {
+  state = {
+    title: 'defaultTitle'
+  }
+
+  setSubTitle = subTitle => {
+    this.setState(subTitle)
+  }
+
+  render() {
+    const { children } = this.props
+    let childrenWithProps = React.Children.map(children, child =>
+      React.cloneElement(child, { setSubTitle: this.setSubTitle }))
+
+    return (
+      <Wrap>
+        <SubTitle>{this.state.title}</SubTitle>
+        <SubDetails>
+          {this.state.details}
+        </SubDetails>
+        {childrenWithProps}
+      </Wrap>
+    )
+  }
+}
+
+export default DishSection
+
+const Wrap = styled.div``
+
+const SubTitle = styled.div`
+  color: #414141;
+  font-size: 20px;
+  margin-top: 50px;
+  margin-bottom: 10px;
+  font-weight: 200;
+  text-align: center;
+`
+
+const SubDetails = styled.div`
+  text-align: center;
+  color: #818181;
+  opacity: .8;
+  margin-bottom: 20px;
+`
diff --git a/client/src/containers/DishCommentsContainer.js b/client/src/containers/DishCommentsContainer.js
new file mode 100644
index 0000000..4a79086
--- /dev/null
+++ b/client/src/containers/DishCommentsContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import DishComments from '../components/DishComments'
+
+const DishCommentsContainer = props => <DishComments {...props} />
+
+export default DishCommentsContainer
diff --git a/client/src/containers/DishInfoContainer.js b/client/src/containers/DishInfoContainer.js
new file mode 100644
index 0000000..8fa1d5c
--- /dev/null
+++ b/client/src/containers/DishInfoContainer.js
@@ -0,0 +1,6 @@
+import React from 'react'
+import DishInfo from '../components/DishInfo'
+
+const DishInfoContainer = props => <DishInfo {...props} />
+
+export default DishInfoContainer
```

两个部分内容的标题部分都被移动到了 DishSection 组件内，同时，通过 React.children.map 和 CloneElement 的综合使用，DishSection 把自己的一个成员函数，setSubTitle 传递给了各个子组件，到两个子组件中，都可以通过 setSubTitle 函数把自己的标题文本传递给父组件了，这样，在 Dish.js 中最终写成的 JSX 代码也是很优雅的，两个 Section ，里面各自嵌套一个组件。

看看本部分达成的效果。页面上两个部分的标题都显示出来了，而且 Html 标签和 CSS 都是复用的。

至此，《复用 section 标题》这部分就胜利完成了。

### 添加数据可视化内容

进入下一部分《添加数据可视化内容》。项目中添加 svg 图表进来，让页面生动起来。

先装包

```
npm i  recharts
```

recharts 是基于 react 和 D3 技术的图表库。

写到 DishInfo 组件内

```diff
diff --git a/client/src/components/DishInfo.js b/client/src/components/DishInfo.js
index 3e553a8..a19789d 100644
--- a/client/src/components/DishInfo.js
+++ b/client/src/components/DishInfo.js
@@ -1,4 +1,5 @@
 import React, { Component } from 'react'
+import DishPieChart  from "./DishPieChart"
 class DishInfo extends Component {
   componentDidMount() {
@@ -11,7 +12,7 @@ class DishInfo extends Component {
   render() {
     return (
       <div>
-        DishInfo
+        <DishPieChart />
       </div>
     )
   }
diff --git a/client/src/components/DishPieChart.js b/client/src/components/DishPieChart.js
new file mode 100644
index 0000000..f13b44b
--- /dev/null
+++ b/client/src/components/DishPieChart.js
@@ -0,0 +1,102 @@
+import React, { Component } from 'react'
+import { PieChart, Pie, Cell } from 'recharts'
+import styled from 'styled-components'
+
+const data = [
+  { name: '水分', value: 200 }, { name: '糖分', value: 100 },
+  { name: '蛋白质', value: 100 }, { name: '脂肪', value: 130 }
+]
+const COLORS = ['#f4baba', '#e0cd84', '#91e1dd', '#a48ad4']
+
+class DishPieChart extends Component {
+  constructor(props) {
+    super(props);
+    this.state = {
+      items: []
+    }
+  }
+
+  clickCell = (entry, index) => {
+    let newItem = {
+      name: entry.name,
+      value: entry.value,
+      color: COLORS[index % COLORS.length]
+    }
+    this.setState({
+      items: [
+        ...this.state.items,
+        newItem
+      ]
+    })
+  }
+
+  render() {
+    let width = window.innerWidth - 40
+    return (
+      <Wrap>
+        <PieChart width={width} height={220} onMouseEnter={this.onPieEnter}>
+          <Pie
+            data={data}
+            cx={width / 2}
+            cy={110}
+            dataKey={'value'}
+            labelLine={false}
+            outerRadius={80}
+            innerRadius={40}
+            fill="#8884d8"
+          >
+            {
+              data.map((entry, index) => {
+                return (<Cell
+                  key={index}
+                  onClick={() => this.clickCell(entry, index)}
+                  fill={COLORS[index % COLORS.length]} />)
+              })
+            }
+          </Pie>
+        </PieChart>
+        <div>
+          {
+            this.state.items.map(item => (
+              <div key={item.name} className='legend'>
+                <div className="legend-name" style={{ 'background': item.color }}>
+                  {item.name}
+                </div>
+                <div className="legend-value" style={{ 'border': `3px solid ${item.color}` }}>
+                  {item.value} mg
+                </div>
+              </div>
+            ))
+          }
+        </div>
+      </Wrap>
+    )
+  }
+}
+
+export default DishPieChart
+
+const Wrap = styled.div`
+  .legend {
+    display: flex;
+    margin: 10px;
+  }
+
+  .legend-name {
+    line-height: 40px;
+    width: 120px;
+    text-align: center;
+    color: white;
+    border-radius: 7px 0 0 7px;
+  }
+
+  .legend-value {
+    color: #212121;
+    height: 40px;
+    border: 3px solid red;
+    flex-grow: 1;
+    border-radius: 0 7px 7px 0;
+    line-height: 36px;
+    text-indent: 15px;
+  }
+`
```

这部分跟课程主线关系不大，所以就不详细讲了。但是想要明确一下，所谓数据可视化，不仅仅要能展示数据，而且要能跟数据进行互动，所以才有了这里的这些函数。

看看本部分达成的效果。点饼状图的每一部分，下面能显示出这部分的详情。

至此，《添加数据可视化内容》这部分就胜利完成了。

### 结语

进入最后一部分《结语》

复盘一下本节思路。本节的展示性内容比较多，主要技巧有如何复用 html/css ，我们这里采用了嵌套组件的形式，另外一个技巧就是数据可视化，可以构建生动的互动型数据展示效果。

至此，《制作甜点详情页》就胜利完成了。
