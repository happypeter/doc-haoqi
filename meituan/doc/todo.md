


下面是使用了组件事件的版本

```js
import React, { Component } from 'react'
import DinnerIcon from './DinnerIcon'
import FastFootIcon from './FastFoodIcon'
import ShopIcon from './ShopIcon'
import TeaIcon from './TeaIcon'
import DeliverIcon from './DeliverIcon'
import FruitIcon from './FruitIcon'
import BestIcon from './BestIcon'
import AllIcon from './AllIcon'
import '../../css/home-cats.css'

class Cats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideWidth: '',
      index: 0,
      enableAnimation: false,
      touchDelta: ''
    }
  }

  handleNext = () => {
    if(this.state.index === 1) return
    this.setState({index: this.state.index + 1})
  }

  handlePrev = () => {
    if(this.state.index === 0) return
    this.setState({ index: this.state.index - 1})
  }


  handleTouchStart = (event) => {
      console.log('event', event)
      let touch = event.targetTouches[0];
      // https://stackoverflow.com/questions/7056026/variation-of-e-touches-e-targettouches-and-e-changedtouches 解释了 targetTouches/touches/changedTouches 的区别
      this.startX = touch.pageX ;
      this.startTime = new Date().getTime() // record time when finger first makes contact with surface
      this.setState({
        enableAnimation: false
      })
    }

  handleTouchMove = (event) => {
        event.preventDefault(); // 阻止浏览器默认事件，重要
        let touch = event.targetTouches[0];
        // if (this.state.index === 1 && this.startX - touch.pageX < 0) {
          this.setState({
            touchDelta:  this.startX - touch.pageX
          })
        }

  // 播放下一张
  slide(startX, endX, elapsedTime) {
    let allowedTime = 300 //0.3秒
    if (elapsedTime <= allowedTime){ // 如果事件过长，这就不算一个 swipe ，所以不应该换到下一个幻灯片
      if(startX > endX) {
        this.handleNext()
      }else{
        this.handlePrev()
      }
      return
    }
    let absMove = Math.abs(startX - endX)
    if( absMove > this.state.slideWidth/3) {
      //   虽然不是 swipe，但是如果滑动距离够长，也要播放下一张
      if(startX > endX) {
        this.handleNext()
      }else{
        this.handlePrev()
      }
    }
  }

  handleTouchEnd = (event) => {
        event.preventDefault(); // 阻止浏览器默认事件，重要
         this.endX = event.changedTouches[0].pageX
        this.setState({
          touchDelta: 0,
          enableAnimation: true
        })
        let elapsedTime = new Date().getTime() - this.startTime // get time elapsed
        this.slide(this.startX, this.endX, elapsedTime)
    }


  componentDidMount() {
    this.setState({
      slideWidth: window.innerWidth
    })
  }



  render() {
    console.log('render()....this.state.touchDelta', this.state.touchDelta)

    return (
          <div className='slider-wrap'>
            <div id='slider'
              onTouchStart={this.handleTouchStart}
              onTouchMove={this.handleTouchMove}
              onTouchEnd={this.handleTouchEnd}
              style={{
                'transform': `translate3d(-${this.state.index*this.state.slideWidth + this.state.touchDelta}px, 0, 0)`,
                // 导致卡顿的原因只可能是 touchDelta，因为卡顿只发生在平移过程中， 而在平移过程中，enableAnimation 始终不变，不会导致页面重新 render
                'transition' : this.state.enableAnimation ? 'all .4s ease-out' : 'none'
                // 手机上还是比较卡，可能跟 enableAnimation/touchDelta 这几个 state 值的使用有关系
              }}>
              <div  style={{ 'width': window.innerWidth + 'px' }} className='slide' >
                <div className="home-cats">
                  <div className="row">
                    <ShopIcon />
                    <DinnerIcon />
                    <TeaIcon />
                    <DeliverIcon />
                  </div>
                  <div className="row">
                    <FastFootIcon />
                    <BestIcon />
                    <AllIcon />
                    <FruitIcon />
                  </div>
                </div>
              </div>
              <div  style={{ 'width': window.innerWidth + 'px' }} className='slide' >
                <div className="home-cats">
                  <div className="row">
                    <FastFootIcon />
                    <FastFootIcon />
                    <FastFootIcon />
                    <FastFootIcon />
                  </div>
                  <div className="row">
                    <DeliverIcon />
                    <DeliverIcon />
                    <DeliverIcon />
                    <DeliverIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

export default Cats
```



### wilddog


https://docs.wilddog.com/sync/Web/guide/save-data.html


```

import Wilddog from 'wilddog'


const NoMatch = ({ location }) => (
  <div>
    <p>No Match for <code>{location.pathname}</code></p>
    <Link to='/'>go back</Link>
  </div>
)

class App extends Component {
  componentWillMount() {
    let config = {
      syncURL: "https://meituandemo.wilddogio.com" //输入节点 URL
    }
    Wilddog.initializeApp(config)
    let ref = Wilddog.sync().ref()
    var postsRef = ref.child("messageboard");

    postsRef.push({
        "message3":{
            "content" : "Wilddog, {Peter}!",
            "presenter" : "happypeter"
        }
    })
    ref.once("value").then(function(snapshot){
        console.info(snapshot.val());
    }).catch(function(err){
        console.error(err);
    })
  }

```

上面代码可以专门移动到一个 database.js 模块中，参考：




http://sugarball.github.io/sugarball-chat/#/chat
https://meituandemo.wilddogio.com/
