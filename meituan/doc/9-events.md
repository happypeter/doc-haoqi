# 三个触屏滑动事件

想要自己手写轮播图效果的话，难点在于理解各种触屏事件。Webkit 内核的浏览器可以支持 touchstart/touchend/touchmove 这三个事件，我们可以从它们三个中拿到各个触摸点的静态和动态的数据，从而判断各种触屏手势。


注意：这三个事件在 Webkit 类的浏览器内可以用，这个意味着手机 chrome/safari/微信中都可以用的，所以是够用的，如果你非要支持 IE，参考[这篇文章](https://css-tricks.com/the-javascript-behind-touch-friendly-sliders/)。

### React 组件是支持这些事件的

https://facebook.github.io/react/docs/events.html#touch-events


```js
import React, { Component } from 'react'


export default class App extends Component {
  style= {
    'width': '200px',
    'height': '200px',
    'background': '#bada55'
  }

  handleTouchStart = () => {
    console.log('touchstart')
  }

  handTouchMove = () => {
    console.log('touchmove')
  }

  handleTouchEnd = () => {
    console.log('handleTouchEnd')
  }

  render() {
    return(
      <div style={this.style}
           onTouchStart={this.handleTouchStart}
           onTouchEnd={this.handleTouchEnd}
           onTouchMove={this.handTouchMove}
        >

      </div>
    )
  }
}

```



### 用原生 JS 写


```js
import React, { Component } from 'react'


export default class App extends Component {
  style= {
    'width': '200px',
    'height': '200px',
    'background': '#bada55'
  }

  componentDidMount() {
    let obj = document.getElementById('stage')
    obj.addEventListener('touchstart', () => {
      console.log('touchstart')
      obj.addEventListener('touchmove', () => {
        console.log('touchmove')
      })
    })
    obj.addEventListener('touchend', () => {
      console.log('touchend')
    })
  }

  render() {
    return(
      <div style={this.style}
           id="stage"
        >

      </div>
    )
  }
}

```