# 高阶函数 higer-order function

把其他函数作为自己参数或者返回值的函数，就是高阶函数。

### 函数作为参数

```js
const evens = [1, 2, 3].map(t => t * 2)
```

函数式思维下，我们就不用 for loop 了，而是用 map/reduce/filter 这些来进行循环迭代。而这几个也都是高阶函数。作为参数传入的函数，通常叫做回调函数。这个程序中 `map` 是高阶函数，括号里面的箭头函数就是回调函数。

### 函数作为返回值

```js
const add = x => y => x + y
const add3 = add(3)
const result = add3(4)
```

这里 `add` 函数的返回值是一个函数，它也属于高阶函数。这种形式的函数在后面介绍 curry 的时候，会再次看到。

## Ramda 来实现

高阶函数可以用来把小函数组合完成复杂逻辑，除了手写之外，一些实现常见逻辑的高阶函数可以从各种支持函数式编程的库中直接取用。

```
npm i ramda
```

例如，Ramda 就是这样一个库。

index.js

```js
const r = require('ramda')

const hello = thing => `Hello ${thing}`
const sign = thing => `${thing}!`

let greet = r.pipe(hello, sign)
const result = greet('Peter')

console.log(result)
```

定义 `hello` 函数，给传入的内容添加 `hello` ，定义 `sign` 给传入的内容添加叹号。通过 `r.pipe` 这个高阶函数，可以组合二者得到 `greet` 函数。调用 greet ，就能同时完成添加 Hello 和叹号的效果。

命令行中，`node index.js` 可以看到操作成功。
