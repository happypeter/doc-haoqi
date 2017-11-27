# React Router 实现导航


本节使用了 Router/withRouter/location 等 React Router 的接口，来实现了导航栏效果。


### ios 链接去高亮

ios 设备上，链接按下的时候会出现灰色高亮，不太好看，去掉可以用下面的技巧：

```
a {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
```

### 代码：

- [第五集：导航](https://github.com/happypeter/meituan-demo/commit/d952c8c478d2a7be5587b2991b1db8451cd13483)
