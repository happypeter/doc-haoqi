# 添加幻灯片

轮播图的每一页我们就叫一个 slide （幻灯片）了。


### 本节代码

```js
import React, { Component } from 'react'
import './App.css'


export default class App extends Component {

  state = {
    index: 0,
    slideWidth: ''
  }
  handleTouchStart = (e) => {
    this.startTime = new Date().getTime()
    let touch = e.targetTouches[0]
    console.log(touch.pageX)
    this.startX = touch.pageX
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
    console.log(endX)
    let startX = this.startX
    let absMove = Math.abs(startX - endX)
    if(this.checkSwipe(absMove, duration)){
      if(startX > endX) {
        this.handleNext()
      }else{
        this.handlePrev()
      }
    }
  }

  handleTouchMove = (e) => {
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
               'transform' : `translate3d(-${this.state.index*this.state.slideWidth}px, 0, 0)`,
               'transition' : 'all .4s ease-out'
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

App.css 如下

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