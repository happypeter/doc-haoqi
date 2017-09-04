# 轮播图

使用了 https://github.com/akiran/react-slick 。

### 坑：关于 dish-card 的高度

dish-card 是我自己定义的。

下面在定义 slideStr 的时候，dish-card 之外必须包裹一层 div ，这样 dish-card 自身设置的高度才会生效。

```
let slideStr = [
  <div className='dish-card-wrap' key='1'>
    <div className='dish-card'>
      hh
    </div>
  </div>,
  <div className='dish-card-wrap' key='2'>
    <div className='dish-card'>
    </div>
  </div>
]

let slides = (
  <Slider {...settings}>
    { slideStr}
  </Slider>
)
```

### 坑：关于 dot 的拜访

下面的几个点，我希望用 flexbox 形式让它们始终停留在屏幕最底端，不过由于作者对 dot 的位置设置用了

```
position: absolute;
margin-top: -25px;
```

这样的操作，导致设置 flexbox 遇到了困难。所以，还是干脆给卡片本身设置了：

```
height: 75vh
```

下方给 dot 留出了足够的显示空间。这样效果也并不难看，而且也能适应大部分屏幕尺寸。
