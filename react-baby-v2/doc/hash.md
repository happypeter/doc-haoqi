BrowserRouter 虽好，但是需要有后端服务器的支持才能运行，所以当我们需要把项目编译成静态页面，部署到 github pages 这样的静态托管服务平台的时候，就需要使用 HashRouter 了（也就是哈希历史）。

### 改用 HashRouter

原有的 BrowserRouter 的代码，改用 HashRouter 基本上就是把导入语句改一下

```
import {
  HashRouter as Router
} from 'react-router-dom'
```

运行之后，区别在于，url 中多个哈希符（#） 。
