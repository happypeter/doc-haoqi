# 访问权限控制

欢迎来到新的一节《访问权限控制》。话题很大，这里只是实现一点，用户未登录，不能访问一些受保护页面的，会被直接重定向回到登录页，登录成功，能够自动跳转回被拒绝的那个页面。

下面来把代码回滚到上一节结束时的状态，分多个部分详细拆解一下如何达成最终效果。

### 定义 PrivateRoute

进入第一部分《定义 PrivateRoute》。这是本小节的心脏。

```
private-route
```

拿到传入的 isAuthenticated ，看看如果用户已经登录呢，那就直接显示本路由对应的组件，也就是说对于已经登录的用户 PrivateRoute 跟 Route 没有区别。但是，如果用户未登录呢？就会执行重定向组件，把我们重定向到 /login 页面，但是别忘了登录后，胡汉三还得回来，所以把当前拒绝访问的这个页面链接保存为 state.from 传递给后续操作。

来使用一下 Private Route 。

```
use-private-route
```

把 settings 也就是设置页面作为受保护的页面。


添加 settings 组件。

```diff
settings
```

暂时只添加一个容器组件吧。

还需要传入 isAuthenicated 

```
pass-isauthenticated
```

拿到之后传递到展示组件中提供给 Private Route 使用。

来看看本部分达成的效果吧。页面中访问 /settings ，会被重定向到 /login 页面。

至此，《定义 Private Route 》这部分就胜利完成了。



### 重定向回老页面

进入下一部分《重定向回老页面》，让用户登录成功后还能回到之前被拒绝的页面，这部分的支点和核心我们建立在状态树中的 common.referrer 字段，如果其中保存着老页面的链接，就执行重定向，如果没有就不执行。


添加需要的 action type

```diff
referrer action type
```

一共两个，一个用来设置，一个用来清空。

添加 reducer 

```diff
referrer reducer
```

对应两个操作，一共设置，一共清空。

再来定义读取 referrer 的选择器

```diff
referrer selector
```

选择器名字 getReferrer 。


那么何时来设置 referrer 的值呢？可以选择在重定向发生前，也可以选择在重定向刚刚结束后，我们这里选择在结束后，所以到 Login 组件中添加代码。

```diff
call setreferrerifneeded
```

不是每次打开 login 都需要设置 referrer 的，所以函数名中有 ifneeded 字样。

现在具体来实现一下这个 setReferrerIfNeeded 函数。


```diff
define setReferrerIfNeeded
```

如果上一个页面是受保护页面，那么当 login 页面打开的时候，location.state 中是保存着老页面的链接的，这个时候就发出 SET_REFERRER 这个 action ，否则就不发出。


Login 组件中的 setReferrerIfNeeded 是需要容器组件传入的

```
get in container
```

导入，并作为属性使用。

最后一步要到登录后判断一下如果 common.referrer 设置了值，那就重定向到老页面。

```diff
redirect to referrer
```

referrer 为空则继续重定向到 /dashboard ，否则重定向回之前受保护的页面。

现在的问题是 referrer 不清空，每次登录后都会重定向。

```diff
clear referrer
```

清空一下即可。

用户被重定向到登录页面之后，如果能看到一个请先登录的提示信息，那么用户体验肯定会好很多。

```diff
show alert
```

看看本部分达成的效果。未登录条件下访问 /settings 这两个受保护页面，会被重定向到登录页，登录成功后应用可以把用户带回先前被拒绝访问的 /settings 页面。

### 总结

进入最后一部分《总结》。

来复盘一下本节思路。一个未登录的用户在访问到一个受保护页面的时候，例如个人设置， /settins 页面，会被 Private 中的语法自动重定向到首页，同时路由中会携带 location.state = '/settings' 这样的数据到首页。首页组件挂载后会判断 location.state 是否有数据，如果答案是肯定的，那就把 '/settings' 这个老页面的链接保存到 redux 的 common.referrer 字段。而这个字段也就是本节实现功能的中枢了。登录后页面往哪里跳转，完全由它决定。

至此《访问权限控制》这个小节就胜利完成了。