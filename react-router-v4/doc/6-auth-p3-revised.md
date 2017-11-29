# 跳转到登录前的页面（第三部分）


首先想办法传递老页面（ referrer ）的路径到 Login 组件中：

```js
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
      fakeAuth.isAuthenticated ? (
        <Component />
      ) : (
        <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
          }} />
      )
    )} />
)
```


然后 Login 组件的 render 函数改成下面这样：

```js

const { from } = this.props.location.state
if (redirectToReferrer) {
  return (
    <Redirect to={from} />
  )
}
```
