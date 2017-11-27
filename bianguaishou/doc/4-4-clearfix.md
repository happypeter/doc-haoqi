# clearfix 方案

clearfix 方案，代码如下

```
.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}

.clearfix:after {
    clear: both;
}
```

的根本目标就是

> 让父元素能够包裹自己的子元素

### 问题有答案，本节不用看

- 你知道父元素的第一个子元素的 margin-top 会溢出父元素吗？
- 子元素浮动，那么父元素会高度变为0吗？
- 工程上解决上面两个问题的最佳方案是什么呢？

### 参考

- [从两个恼人问题的解决来看 clearfix](http://haoduoshipin.com/v/166)
