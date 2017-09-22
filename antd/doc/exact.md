
如果路由写成下面这样：

```
<Router>
  <div>
    <Route path='/' component={Home} />
    <Route path='/about' component={About} />
  </div>
</Router>
```

那么当我们访问 `/about` 当然，About 组件会显示，但是 router 在进行匹配的时候，由于 `/about` 中也包含 `/` 所以，Home 也会被显示出来。

但是很多情况下，我们不希望有这种默认行为，所以我们就可以添加 `exact` 来解决。


如果写成

```
<Router>
  <div>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
  </div>
</Router>
```

那么文件就解决了。`exact` 的意思就是：精确匹配。
