# curry 柯里化

curry 也就是”柯里化“是函数式编程的一个稍微高阶一些的概念。

### 手写

Curry 的概念很简单：你可以只通过部分的参数呼叫一个 function，这样会返回一个新 function ，新 function 中去传入其他参数来完成最终运算。

```js
const add = x => y => x + y
const addTen = add(10)
const increment = add(1)

const result1 = addTen(4)
const result2 = increment(4)
console.log(result1, result2)
```

创建一个 `add` 函数，它接收一个参数 `x` ，并且返回一个函数。返回的函数会通过闭包的形式来保存 add 传入的参数。这样定义 `addTen` 来实现加 10 操作，定义 `increment` 来实现加一操作。真正使用的时候，`addTen` 和 `increment` 中继续传入参数就可以使用了。

这里的 `add` 是我们手动实现了 curry 。

### Ramda 实现

curry 是如此的常用，以至于很多支持函数式编程的库中都提供了接口支持，来看用 Ramda 实现的一个例子。

```js
const R = require('ramda')

const add = (x, y) => x + y

const curriedAdd = R.curry(add)
const addTen = curriedAdd(10)
const increment = curriedAdd(1)

const result1 = addTen(4)
const result2 = increment(4)
console.log(result1, result2)
```

导入 `ramda` 。写一个简单的 `add` 函数，用 Ramda 的 `curry` 接口把它柯里化。这样就可以先传一个参数，稍后再传第二个参数来获得最终结果了，这个过程中自然是能够实现一些丰富的功能的。

命令行中，运行，可以看到跟之前我们手动定义的柯里化的 add ，运行效果一样。
