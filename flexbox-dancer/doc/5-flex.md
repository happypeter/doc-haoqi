# flex 属性

通过 flex 这一个属性，就可以同时设置 flex-grow ， flex-shrink 和 flex-basis 三项了。

### flex 设置尺寸比例

比如有下面的代码

```
.box {
  flex: 1;
}

.second {
  flex: 2;
}
```

就可以一行上的多个 box 设置的宽度相等，唯独第二个 box 的宽度是其他兄弟的两倍。

当然，这样的解释不能完整的描述清楚 flex 的作用，这个我们放到下一节中去介绍。