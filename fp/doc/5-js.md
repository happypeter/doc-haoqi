# JS 对于函数式编程的支持

JS 不是一门纯粹的函数式编程语言，但是对于函数式编程也是有着良好的支持的。

### 函数式第一等公民

首先在 JS 中，函数是第一等公民。就跟 boolean ，number ，string 这些其他类型的变量一样，可以赋值给变量，任意的传递，作为数组元素值，作为函数参数等。这个特点让 JS 非常适合进行函数式编程。

index.js

```js
const multiply = (x, y) => x * y
const add = (x, y) => x + y
const addAlias = add
const evens = [1, 2, 3].map(t => t * 2)
```

JS 中可以把无名函数赋值给一个变量，例如这里的 `mutiply` 。也可以给函数起别名，例如给 `add` 起个别名叫 `addAlias` ，也可以把函数作为参数传递给其他函数。

### 闭包

再来聊聊闭包，闭包也可以很好的用于函数式编程。什么是闭包呢？简单来说闭包就是一个封装了特定状态的函数。

```js
const createAdder = x => {
  return y => x + y
}
const add3 = createAdder(3)
console.log(add3(2))
```

这里 createAdder 是一个高阶函数，因为它的返回值是一个函数。这样，相当于对被返回的函数进行了延迟执行。通过执行 `createAdder(3)` ，`x` 就被赋值为 `3` 了。接下来，当调用 `add3` 函数的时候，我使用之前引入的 x 的值。所以 `add3` 就是一个闭包，因为函数里面我们把 x 的值封装了进来。严格来讲，闭包就是函数，这里也就是 add3 和它所在的环境，二者的结合。这里 `add3` 就是一个闭包，而 `createAdder` 就是闭包形成的环境。

### 丰富的生态

虽然 JS 本身是一种多范式语言。单纯对函数式编程这一种范式的支持，没有其他一些的比较纯粹的函数式编程语言那么好。例如 [Clojure](https://clojure.org/) 原生提供的很多功能，JS 可能并没有。但是也不要小看了 JS ，因为可以通过很多第三方的函数式编程库来实现，例如 [Ramda](http://ramda.cn/), [immutablejs](https://facebook.github.io/immutable-js/) 等。另外，ES6 中也引入了一些新的适合函数式编程的语法特性，下一节中会看到。
