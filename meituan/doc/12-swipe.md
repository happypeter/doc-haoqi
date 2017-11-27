# 识别 swipe

判断条件有两个：

- 滑动距离不小于10px
- 滑动时长不超过0.3秒


### 本节代码

```js
import React, { Component } from 'react'
import './App.css'


export default class App extends Component {
  style= {
    'width': '200px',
    'height': '200px',
    'background': '#bada55'
  }

  handleTouchStart = (e) => {
    let touch = e.targetTouches[0]
    this.startX = touch.pageX
    console.log(this.startX)
    this.startTime = new Date().getTime()
  }

  handleNext() {
    console.log('播放下一张')
  }

  handlePrev() {
    console.log('播放上一张')
  }

  checkSwipe(absMove, elapsedTime) {
    const allowedTime = 300 //0.3秒
    const threshold = 10

    let isSwipe =    elapsedTime <= allowedTime
                  && absMove     >  threshold
                  ? true : false
    return isSwipe
  }

  handleTouchEnd = (e) => {
    let currentTime =  new Date().getTime()
    let elapsedTime = currentTime - this.startTime
    let touch = e.changedTouches[0]
    let endX = touch.pageX
    console.log(endX)
    let startX = this.startX
    let absMove = Math.abs(startX - endX)
    if (this.checkSwipe(absMove, elapsedTime)) {
      if(startX > endX) {
        this.handleNext()
      }else{
        this.handlePrev()
      }
      return
    }
  }

  handleTouchMove = (e) => {
  }

  render() {
    return(
      <div style={this.style}
           onTouchStart={this.handleTouchStart}
           onTouchEnd={this.handleTouchEnd}
           onTouchMove={this.handleTouchMove}
        >

      </div>
    )
  }
}
```

