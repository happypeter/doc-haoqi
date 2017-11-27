# 使用 material-ui 的 Tabs 组件

这集来使用一下人家写的 React 组件库，[Material UI](http://www.material-ui.com/) ，演示传人属性值和使用 inline style 来自定制样式的过程。

### 全部代码

[material ui tabs](https://github.com/happypeter/react-transform-boilerplate/commit/43eeb6f697619f848b6db2de07ffd3f14f2013ef)

### 使用 Tabs 组件

基本过程就是，先 import 后使用。

import 语句：

```
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
```

调用语句：

```
<Tabs>
  <Tab label='Home'/>
  <Tab label='Account' />
  <Tab label='About' />
</Tabs>
```

### 定制 Tabs 组件

使用组件其实就是要知道传人哪些属性给组件，可以在 [Material UI 文档的 Tabs](http://www.material-ui.com/#/components/tabs) 这部分找到属性列表。



