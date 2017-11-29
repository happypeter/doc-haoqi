# 识别各种手势

日常我们操作触屏设备，会用到哪几种手势呢？


### 常用手势分类


从 http://hammerjs.github.io/getting-started/ 可以看到，有以下六种：

- Pan 平移
- Pinch 捏
- Press 按
- Rotate 旋转
- Swipe 滑
- Tap 点


要精确描述上面每个动作，正好可以用前面我们得到的触点数据来进行，基本就是问这些问题：

- 触点有几个？
- 移动距离是多少？
- 移动速度？
- 持续时间？

例如，区分平移（ panning ）和左滑，右滑（ swipe ）的条件：

- http://hammerjs.github.io/recognizer-swipe/
- https://zingchart.github.io/zingtouch/



### 着重聊 swipe

什么是一个 swipe ？

  - https://zingchart.github.io/zingtouch/

      A swipe is detected when the user touches the screen and moves in a relatively increasing velocity, leaving the screen at some point before it drops below a certain velocity.

使用原始触点数据来识别 swipe ：

  - https://codepen.io/ganmahmud/pen/RaoKZa

#### hammerjs 参考链接

- https://github.com/JedWatson/react-hammerjs
- http://hammerjs.github.io/


### 总结

后续，我们会自己动手去实现一下 swipe 和 pan 的效果。