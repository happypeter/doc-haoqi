# 跳转到登录前的页面（第二部分）


这集涉及到的代码不多如下。但是理解起来有点费劲，所以咱们慢慢拆开讲解。

```js
const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={() => (
      fakeAuth.isAuthenticated ? (
        <Component />
      ) : (
        <Redirect to="/login" />  
      )
    )
    }/>
)
```
