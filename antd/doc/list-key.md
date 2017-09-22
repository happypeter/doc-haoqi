本节介绍 key 这个概念，何时用，为何要用？JSX 中如何用数组的形式显示列表？

### 打怪

先来试图完成一个工作，在一个 React 组件中，列出如下尺码

```
M L XL XXL
```

### key

JSX 中插入数组，不加 key 就会报错

> Each child in an array or iterator should have a unique "key" prop. Check the render method of `App`.

翻译：数组中的每一个子元素都需要有一个独特的 key 。请检查 App 组件的 render 方法。
加 key 的目的就是为了便于区分各个元素，方便后续操作。

### 答案

```js
import React, { Component } from 'react'
import './app.css'

class App extends Component {

  state = {
    sizes: [
      {
        size: 'M'
      },
      {
        size: 'L'
      },
      {
        size: 'XL'
      },
      {
        size: 'XXL'
      }
    ]
  }
  render () {
    // const sizeList = [
    //   <div key='1' className="size">M</div>,
    //   <div key='2' className="size">L</div>,
    //   <div key='3' className="size">XL</div>,
    //   <div key='4' className="size">XXL</div>
    // ]
    const sizeList = this.state.sizes.map((item, i) => (<div key={i}
                  className="size">
                  {item.size}
              </div>)
    )
    return (
      <div className='app'>
        <div className="sizes">
          {sizeList}
        </div>
      </div>
    )
  }
}

export default App
```

### 关于 return 时候的小括号

上面的

```js
this.state.sizes.map((item, i) => (<div key={i}
              className="size">
              {item.size}
          </div>)
)
```

等价于

```js
this.state.sizes.map((item, i) =>{
  return (<div key={i}
              className="size">
              {item.size}
          </div>)  
})
```

那么为何 return 后面如果是 jsx 的话，要加小括号呢？

简单答案：加上更安全，对里面的 JSX 进行了合理包裹。

详细答案：http://jamesknelson.com/javascript-return-parenthesis/
