有了 exact 有些情况还是应付不来

```
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
```

所以需要 switch 。

### switch 的作用

一旦上面的 Route 匹配成功，那么之后的 Route 就直接忽略。

### 其他 React-Router 技巧

其他还有一些技巧，例如 redirect 其实也是很重要的，但是这些我们放到其他课程中去讲。
