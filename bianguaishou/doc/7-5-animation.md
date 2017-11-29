# 动画 animation

animation 动画是用来定义 CSS 从一个状态到另外一个状态的变化过程，可以让页面变得生动。


### 例子

html

```
<h1>
 text
</h1>
```

CSS

```
h1 {
  animation-duration: 3s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
  }
  to {
    margin-left: 0%;
  }
}
```


### 参考

- [animate.css](https://github.com/daneden/animate.css)
- [demo#ch7-demo/05-animation](https://happypeter.github.io/bianguaishou-page/demo/ch7-demo/05-animation/)
