# 处理加载状态

欢迎进入新的一节《处理加载状态》。用户执行操作后往往需要去请求网络数据，这时候就有一个数据加载时间，需要显示一个旋转加载图标，这样用户体验才足够好。

下面来把代码回滚到上一节结束时的状态，分多个部分详细拆解一下如何达成最终效果。

### 设置加载状态字段

进入《设置加载状态字段》这部分。redux 中添加 auth.isFetching 来记录当前是否处于认证数据加载中的状态。

首先要到 api 项目中把登录注册接口的响应故意延时一下，设置为4秒后返回。

先添加 Action 类型定义

```diff
action type
```

LOGIN_REQUEST 和 SIGNUP_REQUEST 用来记录异步请求发起之前的那一瞬间，也就是加载过程的开始时间点，下划线 FAILURE 和之前我们定义过的下划线 SUCCESS 对应的这些 action 都是加载过程的结束时间点，各自表征因为请求成功而停止或者请求失败而停止。


再来添加 isFetching 对应的 reducer

```
isFetching reducer
```

其实这个思路在上一步就都梳理清楚了。


再来看这些类型的 action 都在何时发出。

```diff
call action
```

注册请求发起前，发出 LOGIN_REQUEST ，请求成功，发出 LOGIN_SUCCESS ，请求失败，发出 LOGIN_FAILURE 。

看看这部分达成的效果。登录或者注册过程开始，终端中可以看到 isFetching 会被设置为 true ，随后不管操作成功或者是失败 isFetching 都会变为 false 。这正是我们需要的效果。

至此，《设置加载状态字段》这部分就胜利完成。


### 添加 Spinner

进入《添加 Spinner》这个部分。只要处于加载状态，也就是 isFetching 为 true 的这段时间，我们就让页面上显示一个 Spinner ，也就是旋转加载图标 。

先来装包。

```
npm i react-spinner
```

react 的风火轮效果。


首先要加载 css 。

```
global css
```

导入一些全局的内容进来，总觉得脏兮兮的。


要拿到 isFetching 数据，首先来定义 selector

```
get is auth fetching
```

因为其他资源也有可能设置 isFetching 状态，所以这里名字叫  getAuthIsFetching  。


容器组件中读取 isFetching

```
get in container
```

传递给展示组件。

展示组件中去使用。

```
use isFetching
```


看看本部分达成的效果。登录的时候，不管输入信息是否正确，都能显示加载图标。

至此，《添加 Spinner》这部分就胜利完成了。


### 结语

进入最后一部分《结语》。

复盘一下本节思路。首先先从数据底层用 isFetching 来体现价值持续时间，界面层面上使用了一个加载风火轮来体现加载过程。

至此《处理加载状态》这个小节就胜利完成了。