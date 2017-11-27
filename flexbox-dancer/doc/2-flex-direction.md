# Flex Direction

flex direction 应该是 flexbox 所有知识点中最基础的一个了。咱们就从这里入手开开始 flexbox 技术细节的探讨。

### 作用概述

flex-direction 的作用总结起来就是一句话

> 对 flex item 的排列方向做控制。


### 实际代码演示

视频中用真实的代码去演示 flex-direction 这个属性的作用。

核心代码

```
.parent {
  display: flex;
  flex-direction: column;
}
```

### 厂商前缀

flexbox 使用是需要加厂商前缀才能实现多中浏览器的兼容性的，但是咱们的小课程中就省略了。在各个框架环境下，都有自己各自的处理厂商前缀的方案了，例如 autoprefixer 等。

### 参考资料

- [What Flexbox](flexbox.io)