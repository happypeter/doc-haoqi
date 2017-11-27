# 触摸点数据剖析


各个 event 对象中都可以拿到触点的数据。这集对这些数据进行一下梳理，主要区分一下下面几个概念：

- targetTouches  当前 target 上发生的所有触点的列表，单指操作就用 targetTouches[0]
- changedTouches 常用在 touchend 的处理函数里，用来拿到触摸结束的那个时刻的触点的数据
- pageX/pageY 以整个页面(<html> 标签)为参照系的坐标值，单位是 CSS 像素
- clientX/clientY 以浏览器视窗（ viewport ）为参照系的坐标值，单位是 CSS 像素
- screenX/ScreenY 以物理屏幕为参照系的坐标值，单位是设备像素


### 关于各种坐标的详细解释


我们先只用 touchstart 事件来演示：


```js
  handleTouchStart = (e) => {
    let touch = e.targetTouches[0];
    console.log(touch)
  }
```

把页面的宽和高调整的都大于浏览器视窗，然后 scroll 一下页面再测试，就会看出 pageX 和 clientX 的区别了。一般用 pageX 就可以了，记住，坐标原点在 `<html>` 标签所占据区域的左上角。


更为详细的解释，参考 [这个带图的讨论](https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y)


### targetTouches VS changedTouches

target 是绑定了 touchstart 等各种事件的那个元素，所以可以在 touchstart/touchmove 的时候，可以用 targetTouches 来拿到触点数据，但是当 touchend 发生后，触点实际上已经是过去了，所以用 changedTouches 来取得手指即将离开屏幕的那一刻的触点信息。

例如，下面的代码可以获得手指初触屏幕的时刻以及触摸结束的时刻的触点的 X 坐标值

```js
  handleTouchStart = (e) => {
    console.log(e.targetTouches[0].pageX)
  }

  handleTouchEnd = (e) => {
    console.log('touchend--targetTouches', e.targetTouches[0])
    console.log('touchend--changedTouches', e.changedTouches[0].pageX)
  }
```

### touchmove 随时报告新的坐标

运行下面代码，console 中看一下就一目了然：

```js
  handleTouchMove = (e) => {
    let touch = e.targetTouches[0];
    console.log(touch.pageX)
  }
```


### 总结

有了各个触点的各种数据，要来判断各种手势，例如 swipe（滑动），pan （平移)，rotate（旋转）就都不是难事了。


