# 使用服务器端的数据

欢迎来到新的一节《使用服务器端数据》。让前端猜你喜欢部分的数据真正来自数据库中。

### 临时数据移动到 redux

进入下一部分《临时数据移动到 redux》。目的是把 reducer/selector 这一条线先跑通。

添加 dish reducer 文件。

```
reducer-dish
```

把数据移动到了 reducer 。而且没错，combineReducers 中只传入一项内容也是没有问题的。

rootReducer 中来导入一下。

```
root import
```

然后把 selector 添加好，就可以到容器组件中去拿数据了。

看看本部分达成的效果。页面显示依旧，但是这次的数据是来自 redux 了。

至此，《临时数据移动到 redux》这部分就胜利完成了。

### 添加后端数据

进入下一部分《添加后端数据》。先把 mongodb 里放一些种子数据。

首先添加数据模式，

dish-model---

删除原有的 post.js 添加了 user.js ，描述了一下数据的字段名和数据类型。


再来添加 controller

dish-controller---


.all 接口会列出所有甜点数据。.seed 的作用就是添加种子数据。


最后添加对应的路由

dish router---

路由添加完毕。

看看本部分达成的效果。浏览器中，首先访问 /seed-dishes ，可以看到种子数据可以成功添加进 mongodb 数据库，然后访问 /dishes 就可以看到这些数据了。
至此，《添加后端数据》这部分就胜利完成了。

###  请求后端 API

进入下一部分《请求后端 API》。从 API 拿到数据，并填充到 redux 中。

定义 action 类型。

action-type---

名字就叫 RECEIVE_DISHES ，接收甜点数据。

定义 action 创建器。

action-creator---

请求后端 API 中的数据。

添加必要的常量

action-constants

添加了请求所有甜点的 API 链接。

定义 reducer 。

add-dish-reducer---

接收数据并修改 dish.all 状态值。

App.js 中呼叫 action 创建器。

call-action---

应用加载的时候就会发出请求。

最后运行一下 `standard --fix` 来处理一下格式问题。

standard----

看看本部分达成的效果。页面上显示依然正常，chrome console 中可以看到 redux 中数据的变化。

至此，《请求后端 API》这部分就胜利完成了。

### 结语

进入最后一个部分《结语》。

复盘一下本节思路。首先到服务器端插入了种子数据，并开放了请求所有甜点的接口。前端在页面加载时，会执行 fetchDishes 这个 action ，从后端取到数据后，发送给 reducer ，reducer 接收数据并修改状态树之后，界面上也就能直接显示出来了，因为咱们上一节已经把 redux 读取数据的这条线跑通了。

至此，《使用服务器端的数据》就胜利完成了。
