# exact 修饰符

v4 条件下，同一个 url ，可能会匹配多于一个的 Route ，[exact 修饰符](https://reacttraining.com/react-router/web/api/Route/exact-bool) 针对的就是这个问题。


```js
const App = () => (
  <Router>
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </Router>
)
```

### 参考资料

- [官方也在犹豫要不要把 exact 设置成默认](https://github.com/ReactTraining/react-router/issues/4958)

- 当然，目前官方有这样的默认行为也是有它的用意的，这样的方式可以让制作 sidebar 等效果的时候更便利。https://youtu.be/UVQ0ATR0vpI?t=331
