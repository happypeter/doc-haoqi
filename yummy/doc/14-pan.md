# 识别平移


平移 pan ，跟 swipe 最大的区别就是滑动速度比较慢。但是轮播图对 pan 动作也应该做出反应：

- 手指滑动，slide 应该随之移动
- 滑动距离小于 slide 宽度的50%，touchend 时复原
- 大于50%，切换 slide


### 基本移动效果

首先要得到触点滑动的距离，保存到一个 state 值中：

```js
state = {
    ...
    touchDelta: 0
  }
```

在触点移动的时候去设置具体值：

```js
  handleTouchMove = (e) => {
    let touch = e.targetTouches[0]
    this.setState({
      touchDelta:  this.startX - touch.pageX
    })
  }
```

在 handleTouchEnd 中去重新清零


```js
this.setState({
          touchDelta: 0
        })
```

这个值真正要发挥的作用就是移动 slide ，所以要修改一下：

```diff
--- <div id="slider" style={{ 'transform' : `translate3d(-${this.state.index*this.state.slideWidth}px, 0, 0)`}}
+++ <div id="slider" style={{ 'transform' : `translate3d(-${this.state.index*this.state.slideWidth + this.state.touchDelta}px, 0, 0)`}}
```

这样，测试一下，发现基本效果就有了。

### 解决反应慢的问题

直接删除掉页面中的 transition 设置，反应就快了。但是毕竟我们还是有些条件下需要过度效果的。所以可以通过添加一个 state 值来控制一下。

思路就是，默认情况下，让 this.state.enableAnimation 是 false ，但是让手指离开屏幕的那一瞬间，使能动画，也就是在 handleTouchEnd 中添加：

```
     this.setState({
-      touchDelta: 0
+      touchDelta: 0,
+      enableAnimation: true
     })
```


### 处理边缘情况

首页和尾页。

```js
handleTouchMove = (e) => {
    let touch = e.targetTouches[0]
    if(this.state.index === 0 && this.startX < touch.pageX) return
    if(this.state.index === 3 && this.startX > touch.pageX) return
    this.setState({
      touchDelta: this.startX - touch.pageX
    })
  }
```


### 滑动距离大就翻页

这个简单， handleTouchEnd 函数中修改一下：

```diff
--- if(this.checkSwipe(absMove, duration) ){
+++ if(this.checkSwipe(absMove, duration) || absMove > this.state.slideWidth/2 ){
```


### 结语

这样，pan 这种情况我们也比较完美的处理了。


### 附录：全部代码

App.css

```css
body{
  margin: 0;
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.slider-wrap {
  overflow: hidden;
  position: relative;
  height: 100px;
}

#slider {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
}

#slider .slide {
  flex-shrink: 0;
  height: 100px;
  background-color: lightseagreen;
  line-height: 80px;
  text-align: center;
  color: white;
  font-size: 30px;
  border: 10px solid white;
}
```

App.js


```js
import React, { Component } from 'react'
import './App.css'


export default class App extends Component {

  state = {
    index: 0,
    slideWidth: '',
    touchDelta: 0,
    enableAnimation: false
  }
  handleTouchStart = (e) => {
    this.startTime = new Date().getTime()
    let touch = e.targetTouches[0]
    this.startX = touch.pageX
    this.setState({
      enableAnimation: false
    })
  }

  handleNext() {
    if(this.state.index === 3) return
    this.setState({
      index: this.state.index + 1
    })
  }

  handlePrev() {
    if(this.state.index === 0) return
    this.setState({
      index: this.state.index - 1
    })
  }

  checkSwipe(absMove, duration) {
    const threshold = 10
    const allowedTime = 300
    let isSwipe =   absMove > threshold
                 && duration < allowedTime
                 ? true : false
    return isSwipe
  }

  handleTouchEnd = (e) => {
    let endTime = new Date().getTime()
    let startTime = this.startTime
    let duration = endTime - startTime
    let touch = e.changedTouches[0]
    let endX = touch.pageX
    let startX = this.startX
    let absMove = Math.abs(startX - endX)
    if(this.checkSwipe(absMove, duration) ||
       absMove > this.state.slideWidth/2 ){
      if(startX > endX) {
        this.handleNext()
      }else{
        this.handlePrev()
      }
    }
    this.setState({
      touchDelta: 0,
      enableAnimation: true
    })
  }

  handleTouchMove = (e) => {
    let touch = e.targetTouches[0]
    if(this.state.index === 0 && this.startX < touch.pageX) return
    if(this.state.index === 3 && this.startX > touch.pageX) return
    this.setState({
      touchDelta: this.startX - touch.pageX
    })
  }

  componentDidMount() {
    this.setState({
      slideWidth: window.innerWidth
    })
  }

  render() {
    return(
      <div className="slider-wrap">
        <div id="slider"
             onTouchStart={this.handleTouchStart}
             onTouchEnd={this.handleTouchEnd}
             onTouchMove={this.handleTouchMove}
             style={{
               'transform' : `translate3d(-${this.state.index*this.state.slideWidth + this.state.touchDelta}px, 0, 0)`,
               'transition' : this.state.enableAnimation ? 'all .4s ease-out' : 'none'
             }}
          >
          <div className="slide"
               style={{ 'width': this.state.slideWidth}}
            >1</div>
          <div className="slide"
               style={{ 'width': this.state.slideWidth}}
            >2</div>
          <div className="slide"
               style={{ 'width': this.state.slideWidth}}
            >3</div>
          <div className="slide"
               style={{ 'width': this.state.slideWidth}}
            >4</div>
        </div>
      </div>
    )
  }
}
```
