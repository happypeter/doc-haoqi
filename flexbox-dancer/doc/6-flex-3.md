# flex 属性对应的三个属性

来具体解释一下 flex-grow ，flex-shrink ，和 flex-basis 的妙用。

### flex-basis 设置基本宽度

例如

```
.box {
  flex-basis: 100px;
}
```

### flex-grow 设置延展

如果其他 item 不设置，而

```
.second {
  flex-grow: 1;
}
```

那么它就会在 container 内占据所有剩余空间。因为 flex-grow 的默认值是 0 。

### flex-shrink 设置压缩

flex-shrink 默认值是 1 。当 container 的宽度装不下所有的 flex item 的时候，flex-shrink 就会发挥作用了。

比如有下面的代码

```
.first {
  flex-shrink: 1;
}
.second {
  flex-shrink: 2;
}
```

这样, first 元素没被压缩1个像素，second 元素就会被压缩2个。

也可以通过设置 `flex-shrink: 0` 来表示“我是一块砖，不能压缩”。