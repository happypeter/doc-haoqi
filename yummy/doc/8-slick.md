### 完成展示组件

本节就把本章结束了，那么我们写傻组件（也就是展示组件）的任务就完成了。后续代码基本上不会写多少 CSS 了。

### 使用插件

- Dish.js 中的数据可视化部分，采用的是：http://recharts.org/
- Profile.js 中用到了 https://github.com/aaronshaf/react-toggle

### 坑： Momentjs 使用

根据 [Create-React-App 官方的说明](https://github.com/facebookincubator/create-react-app/pull/2187/commits/97226a0670063b579215e7b44987f3957842c5df) 。使用 momentjs 要自己明文导入 locale ，例如我们的代码中的

```
import 'moment/locale/zh-cn'
```

### 结语

下一章开始写容器组件（聪明组件）。
