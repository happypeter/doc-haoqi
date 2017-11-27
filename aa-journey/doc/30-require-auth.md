# 授权检测

如果用户未登录，我们是不希望他能看到 /profile 页面的，也不希望他有权限进行创建新课程和新分类的操作，那么如何进行一下授权检测呢？方式并不唯一，我们这里采用 react-router 中间件的形式来实现。

具体的代码如下：

```js
function requireAuth(nextState, replace) {
  if (!localStorage.getItem('userId')) {
    replace({
      pathname: '/signin'
    })
  }
}
```

```js
<Router history={browserHistory}>
    ...
    <Route path='profile' onEnter={requireAuth} component={Profile} />
    ...
</Router>
```


### github 上的 commit

- [requireAuth](https://github.com/happypeter/aa-journey-demo/commit/631ffa77e08b66d66ae878784df55fce977c8fb5)
