### 章节划分

不要先前台讲完，再讲后台。要按照迭代开发的思路，先做基础功能，让后一个功能一个功能的加。以功能为单位来讲。没讲一章，先画 sketch 图。


第一章 认证系统
- sketch 图
  - 组件化设计，没写代码之前，现在 sketch 里面就能把组件划分好
- 首页
- 登录注册
- 侧边栏


第二章 社交化
- 发评论
- 修改头像

第三章 购物车

第四章 后台管理系统

第五章 结语



### 代码风格
https://standardjs.com/

### css 规范

[好奇猫 CSS 使用规范](https://github.com/happypeter/onestep/wiki)

- 全局 css 放到 src/assets/global.css 中，在 App 中导入，挺干净利落的。
- CSS 的写法有学问：也是低耦合。也就是，
  - 父组件中把大块儿布局（尤其是高度值）都确定好，子组件一般高度设置为 100%；
  - 个别情况，子组件高度不确定，那么父组件大块布局可以用 flex-direction: culumn ，同时其中一个元素 flex-grow: 1 的形式
    - 这样子组件中如果高度有改动，父组件中的代码也是完全不用改的。
- styled-components 也不怕 class 名的
  - 例如组件内使用了一些插件，所以有些 class 名是去不掉的
  - 这样没关系，直接在顶级的 Wrap 的样式内部嵌套这些 class 名的样式即可，跟写到 css 文件里面没啥区别
- 有些组件中直接把 css 拷贝进了 Wrap ，这个可以保留，让大家看看迁移到 styled-components 其实非常容易，因为其实 styled-components 就是直接把内容拷贝成独立的 css 文件然后再运行。

### 布局文件

路由和布局文件要协同，达成以下目标

- 首页除外，其他页面都有相同的 Header
- Header 高度固定就是 80px ，页面主体内容要沾满页面剩余高度
  - 使用 flexbox 达成即可
  - 在 components/Layout 组件内把 Header 和 页面主体所占据的区域划分好。

- 各个页面的高度控制思路
  - 父组件中把 header 和 Main 的高度配置好
  - 以后 Main 中的所有组件，高度只要设置为 100% 就可以完美显示了
  - 而不用像以前那样傻乎乎的设置 window.innerHeight - 80

### 认证和授权

这个是一大块，判断用户是否登录，要看 isAuthenticated 是 true 还是 false ，
页面刷新的时候，需要等待 isFetching 变为 false 的时候再判断

- 登录过程 isFetching 改版逻辑
  - 用户点登录按钮，发起 LOGIN_REQUEST 这时有 isFetching 设置为 true
    - 接下来的 LOGIN_SUCCESS 或者 LOGIN_FAILURE 两种情况都把 isFetching 设置为 false

- currentUser
  - 不要把所有的当前用户数据都保持到 auth.currentUser 中，只存 id 即可
  - 必要时候去 user.byId 中去取，定义一个 getCurrentUser 方法，在 mapStateToProps 中使用


### Action 中使用 getState 以及 selectors

这样 Action 中就能拿到所有的 store 数据以及派生数据了，于是这些数据就不必从组建中传递给 action 了。
Cool

### fetch 各种资源的时机

UPDATE: 看了 sound-redux 的源码，是在 componentWillMount 中请求的。
用户没有登录前，就只能看到个首页，很多资源根本就不需要去 fetch .

用户的登录态完全由 store 中的 isAuthenticated 去控制。

isAuthenticated 的初始值由本地是否存储 userId 信息为准

参考 https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/

写成下面这样

```
isAuthenticated: localStorage.getItem('userId') ? true : false
```

注：即使本地存储信息过期，那么初始状态也是登录的，这时候去 fetchCurrentUser 如果返回为空，那么再把 isAuthenticated 设置为 false 即可。

这样一个实际流程是：

- 用户先登录进网站操作，然后关掉网页去干其他事
- 用户重新打开网站首页，直接就能看到操作盘
- 程序底层拿到 localStorage 中的 userId 去 server 上判断用户登录是否已经过期
- 大部分情况是，还未过期，所以用户直接可以看到操作盘上的各类数据都加载完毕
- 如果过期，用户在操作盘界面的两三秒，也看不到任何数据，然后就被重定向到登录页了

用户体验是完美的。但是如果反之，把 isAuthenticated 默认设置为 false ，页面刷新（或者重新打开页面）用户先看到首页，然后再重定向到操作盘，用户体验就很糟糕了。

再聊其他数据的加载时机。如果用户没有登录一些信息就不必加载，如果用户没有打开特定页面，一些信息就没有必要加载。所以还是按照特定需求，到各个页面的 containers 的 componentDidMount 中去判断一下（要考虑好页面刷新的情况）根据需要加载自己所需要的数据吧。如果一个数据只在一个页面才用到，那就到这个页面的 containers 中去加载，如果很多页面都用到，那就放到 App 的 componentDidMount 中。



### 每个 container 都要能处理初始化数据为空的情况

UPDATE: 好方法找到了，container 不跟着瞎掺和，一切都会简单起来。
  - 参照 sound-redux 的思路
  - container 中不对数据进行任何的演算变形，直接进行传递
  - 创建 selectors 文件夹，进行数据的*读*
  - 所有跟**写**相关的数据整理逻辑，container 中也一概不要出现，全部放到 action 创建器，和 reducer 中。
  - 这样，容器组件基本就空了。只是起一个 controller 的作用了。
  - 如果有 react-router 那么也一样可以清空 controller （container）的，可以把例如可以使用 commentsByDishId 这样的写法，来写 selectors ，然后把 this.props.match.params.dishId 中的 match 直接传递给 展示组件。展示组件中，只要 commentsByDishId[match.params.dishId] 就可以拿到数据了。
  - container 中核心语句就一行，同时也意味着 container 中不对 markup 页面布局做任何约束，哪怕就是先后顺序
    - 这个也给人很干净的感觉，cool

学习 sound-redux 的收获：

- container 已经很复杂了，所以提高代码可维护性的方式就是简化 container
- container 的复杂在于他是多种要素融合交叉的一个地方，类似的一个就是 MVC 中的 controller ，所以 rails 下有 skinny controller 的思路。model，或者 react 条件下的 selectors/action/reducer ，都是内容比较单一，内容单一的文件倒是可以写的大一些。
- 读 store 的操作，全部放在 selectors 中，写 store 的操作，全部都放到 action creator 中
- container 中没有任何的数据处理，完全是传递
- 展示组件中完全没有对外的接口，它只是跟自己的 container 交互，或者说看 container 一眼就能明确展示组件的接口结构


而不能出现一旦出现空数据，就报错退出的情况。数据未加载完，不应该整个 block 组件上其他部分的 render 。

这个是一个铁定原则吗？暂时我还不确定。

展示组件应该允许传入空数据，但是容器组件要保证传入的 props 不是  undefined 。

对象本身为空不要紧，但是如果是再取出 obj.xxx 来传递给展示组件，那初始值就是 undefined 了。

https://github.com/gothinkster/realworld 中有这样的代码：

```
const show = props.currentUser &&
  props.currentUser.username === comment.author.username;
```

也就是通过 && 来防止取值的时候报错。


### 展示组件层级明晰

- 有了一句话 container ，页面上所有的布局都会交给展示组件。
- 展示组件要层级分明，较高层级的展示组件中只包含大块布局，每个大块布局中包裹一个 container 即可，不要有任何的页面细节
- 总之，每一级组件就干那个级别应该干的事情。

### 一个重要的问题，

一个 selector 能不能接收 state 之外的参数？

看了一下 sound-redux 项目，答案是否定的，毕竟 selector 是在 mapStateToProps 中使用，除了 state 也没有什么变量可以用的。


### 解决初始值为空造成的报错

参考了 sound-redux 现在思路比较清楚了：

- 首先，展示组件内写 PropTypes 检查，不介意传递的初始值为空数组对象，但是不能我要一个数组，你外界给我传递一个 undefined 这个是不允许的
- 外界的数据，全权由 selectors/ 决定，container 完全不插手，container 只是组织一下结构
- 这样，如果出现了初始值为空造成的 undefined 报错，基本上就可以去 selector 这一个地方去解决了。
- 有 react-router 的 container 组件要稍微例外一下，因为动态路由参数不是由 redux 管理的，所以相关的数据筛选工作就不要放到 selectors 中去做了，而要在 container 中直接操作一下。

### Action

封装到 action 创建器中。 包括同步的。有些简单的例如 CHECKOUT_REQUEST/CHECKOUT_SUCCESS 就不用了。

拆分，参考 https://github.com/andrewngu/sound-redux/blob/master/client/src/actions/UserActions.js

### actions/index.js 中也可以拿到整个状态树的

可以根据状态数的一些信息，决定要不要发出一个 action

https://github.com/reactjs/redux/blob/master/examples/shopping-cart/src/actions/index.js#L20


### 展示组件和容器组件规范

https://redux.js.org/docs/basics/UsageWithReact.html

展示组件是不能用 connect 的，也不发出 action
展示组件是受控组件的，也一样不保留内部 state 采用

```
<select onChange={e => onChange(e.target.value)} value={value}>
```

父组件传入的形式。

### isFetching

isFetching 是可以同时出现在多个 reducer 中的。
https://redux.js.org/docs/advanced/AsyncActions.html


https://github.com/reactjs/redux/tree/master/examples/async/src

```js
export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
})

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit
})

const fetchPosts = reddit => dispatch => {
  dispatch(requestPosts(reddit))
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)))
}
```


还有一种失败状态 XXX_FAILURE ，例如 CHECKOUT_FAILURE

Dan 的习惯用 REQUEST_XXX （而不用其他人喜欢的 XXX_START），用 DOXXX_FAILURE 而不用其他人喜欢的 DOXXX_ERROR

所以上面这种，如果配合失败状态就是 `REQUEST_POSTS_FAILURE`

所以在 fetchPosts 这个 actionCreator 中，过程如下

- 首先是请求文章：REQUEST_POSTS
- 接下来就是接收文章：RECEIVE_POSTS
- 请求要是失败：REQUEST_POSTS_FAILURE


在 checkout 这个 actionCreator 中，参考：https://github.com/reactjs/redux/blob/master/docs/advanced/AsyncActions.md

- 首先是 CHECKOUT_REQUEST ，因为这里 CHECKOUT 本身是动词了，所以 `REQUEST` 放到了后面
- 成功 CHECKOUT_SUCCESS ，因为没有什么资源要接收，所以就不用 `RECEIVE_XXX` 了
- 失败当然就是 CHECKOUT_FAILURE 了

上面的六条都是 DAN 的 redux 官方 examples 中的命名方式。相关的一个包是 redux-promise-middleware 可以简化上述过程。

### 高复用度组件

类似 Avatar 这种，一定要抽离，避免重复定义


### 组件规范

- src 下分 containers/ 和 componnets/ 两个文件夹存放
- containers/ 中文件都放在顶级位置
- components 中文件也都放到顶级位置
  - 除非没有，不然展示组件一定要和他自己的容器组件名字对应
- 顶级展示组件，基本就是一个页面组件，页面组件拆分出来的不会复用的组件，命名的时候要用页面组件名做一下 namespace 处理，例如 Home.js 组件内，拆出一个 HomeSignup.js 和 Form.js 。Form.js 不做 namespace 是因为它是共用（shared)组件。
- 按角色划分的思想，会更负责，把 reducer/action 代码都按功能拆到不同功能文件夹中真的可行么？很多组件不是都共用 store 中的数据么，也就意味着 reducer/action 肯定也是共用的。所以在发现上面的*按角色组织**的思路出现明显短板之前，暂时不考虑按角色组织

### PropType 要加上

- 的确被咬过几次了


### history for redux

现在我的特别明确的一个需求就是要在 action 中使用路由跳转，也就是说使用 history.push 。


### axios Chain


action/index.js

```js
export const submitDish = (data) => dispatch => {
  return axios.post(`${Settings.host}/dish`, data)
    .then( res => {
      dispatch({ type: types.ADD_DISH, dish: res.data.dish })
      history.push('/dashboard/dishes')
      // return '添加菜品成功'
      throw 'oh no'
    }).catch(
        err => ''
    )
}
```

then 中如果有代码错误，那么后面的 catch 会触发，catch 中如果有代码错误，submitDish.catch() 就会被触发，没有代码错误，自己 throw msg 也可以触发 catch 。

axios 的 catch 被触发有两种可能

- 服务器端返回非200
- catch 前面的 then 自己内部代码出错，或者 `throw err`，catch 中如果直接 return err ，那么 submitDish.then() 会被触发，而非 catch 。

最佳的 axios 请求工作流

- 服务器端给出报错时候的，把报错完整的返回给客户端，通过 res.status(500).json({ msg: '保存失败', err })
- 到客户端，终端中打印出详细报错，界面上只是给出简单报错。

### 图片上传

multer 要求客户端发过来的请求必须是 mutipart 的，所以，再进行服务器端调试之前，先要保证，客户端的 network 标签下，输出如下：

```
Content-Type:multipart/form-data; boundary=----WebKitFormBoundary2sCUKPuI2gClzzTf
Host:localhost:3008
Origin:http://localhost:3000
Pragma:no-cache
Referer:http://localhost:3000/profile
User-Agent:Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1
Request Payload
------WebKitFormBoundary2sCUKPuI2gClzzTf
Content-Disposition: form-data; name="avatar"; filename="b.png"
Content-Type: image/png


------WebKitFormBoundary2sCUKPuI2gClzzTf
Content-Disposition: form-data; name="userId"

5a17c130d1b60aaec58a9cfd
------WebKitFormBoundary2sCUKPuI2gClzzTf--
Name
avatar
data:image/png;base…
150a376f1692f6283753be1ecc7127af
```

具体需要做的就是用 formData 来组织数据，然后把 formData 直接传递给 axios 即可，不需要给 axios 设置 config { header: xxx}
axios 可以自动识别 formData 对象，改变 Content-Type。

我自己的浪费时间的地方在于，本来应该

```
this.props.updateAvatar(formData)
```

结果我写成了

```
this.props.updateAvatar({formData})
```

导致，传递给 axios 的实际数据是一个空对象，所以请求的 Content-Type 一直就都是 application/json 。
