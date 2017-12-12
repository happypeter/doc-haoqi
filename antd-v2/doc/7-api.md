# 调用 API 和体现加载状态

《调用 API 和体现加载状态》。现在要跟后端 API 打交道了，后端代码来自《React 社交化电商--功能篇》那门课程。

### 读取数据

先来《读取数据》，存入 Redux ，并显示在界面上。前面咱们已经添加了种子数据，所以现在访问读取所有甜点的 API ，也就是 localhost:3008/dishes 是能够拿到所有甜点的数组的。

第一步，页面加载的时候来触发读取甜点的 action 创建器，并把数据保存到 redux 中

read dishes---

首先到 App.js 中添加触发 action 的语句，然后创建 actions/dishActions.js 文件专门来写 action 创建器，fecthDishes 创建器中请求了后端读取所有甜点的 API ，拿到的数据，伴随 RECEIVE_DISHES 这个 action ，一起发送给 reducers 。如何定义常量，如何装扮咱们就不说了，直接进入 reducer ，首先 rootReducer 中要导入 dish.js ，然后打开 dish.js ，可以看到数据保存到了 dish.all 这个数组中。

看看达成的效果。刷新一下页面，终端中可以看到，dish.all 的状态值果然就是服务器上返回的数据。

至此，《读写真实数据》这一关就通过了。

### 显示真实数据

进入《显示真实数据》这个任务。

从 redux 中拿到数据，替换临时数据即可

read-data---

容器组件中先把数据拿到，存放到 dishes 变量中，然后界面中，把临时数据换成 this.props.dishes 数据。

看看达成的效果。页面上没有变化，但是已经是真实的数据了。

### 体现加载状态

进入《体现加载状态》这个任务。添加 dishes.isFetching 状态位，同时使用一下蚂蚁设计的[加载中](https://ant.design/components/spin-cn/)组件。

先来添加状态位。

isFetching---

先到 action 创建器中，在发起 axios 请求之前，先发出一个 `DISHES_REQUEST` action ，它的作用就是专门用来通知 redux ，说我现在开始加载数据啦，你马上把 isFething 状态位设置为 true 吧。那 isFetching 也就是加载中这个状态位何时恢复为 false 呢？那就是数据获取成功之后呗，所以当 `RECEIVE_DISHES` 收到后，isFetching 就会重新设置为 false 。

下一步就是到组件中使用这个状态位，它为 true 这这个阶段显示加载中图标就行了。

spin--

容器组件中读取 isFetching ，展示组件中导入 Spin 组件，并对它加了点样式，最后当 isFetching 为 true 的这段时间，让 Spin 显示到页面上，为了让效果更明显，所以到 API 中添加了3秒的延迟。

看看达成的效果。页面中刷新，可以看到加载中图标先出现，稍后图表会显示出来。
