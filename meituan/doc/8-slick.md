### 为何不使用现成的插件？

下面要实现的这个轮播的效果，恰好是学习触屏设计 touch 事件的一个好案例，所以咱们下面的几节就来手写一下。

不过这集先来说说现成的插件。

### 使用 react-slick


官方的例子，在我的 create-react-app 环境下，跑不起来，报错，稍微修改一下，改成下面这样就可以了(就是把 require 改成 import 了)


```js
import React from 'react'
import Slider from 'react-slick'

export default class App extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrow: false
    };
    return (
      <Slider {...settings}>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
      </Slider>
    );
  }
}
```



然后 index.html 中添加 https://github.com/akiran/react-slick 这里的 README 文件中给出的 css 如下

```html
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
```

效果达成。


### 测评 react-bootstrap

参考：https://v4-alpha.getbootstrap.com/getting-started/introduction/

需要导入 jQuery 还有一个大的 CSS 文件，其中有很多全局的变量名，给下一步我自己添加 CSS 增加了困难。还是很重的。不想用。


### 总结

使用插件，就是要引入一个大大的 css 进来，这个我也不太喜欢。
