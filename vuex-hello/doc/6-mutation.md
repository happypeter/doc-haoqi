### 修改 Store 中的数据

来实现修改数据的操作。主要通过 mutation 。mutation 的中文意思就是“改”。


官方：https://vuex.vuejs.org/zh-cn/mutations.html

>更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。



### 使用 mutations

代码： [mutations]()

注：跟 redux 的一个很大的不同，mutation 函数中，state 是可以直接修改的，这个大大简化了代码。

例如这样的原始状态：

```
state = {
  all: [
    { ... },
    { ... }
  ]
}
```

redux 那边 reducers 中要写成

```
return { ...state. all: state.all.slice().push({ content: action.content })}
```

而 vuex 的 mutation 就简单了

```
state.all.push({ content: 'xxx' })
```

喔噢，难度差别太大。

### 订阅 store 中的 State

State 移动到了 store 中，那么在其他组件中当然就也可以使用了。

到 PostBody.js 中，要拿到评论总数就并非难事。

代码：[read from store]
