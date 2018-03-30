# 不要迭代要递归

函数式编程条件下，一般不用迭代，而是用递归来完成任务。这个思路也是纯函数不变性的自然延伸。

### 对比

index.js

```js
let sum = numbers => {
  let total = 0
  for (i = 0; i < numbers.length; i++) {
    total += numbers[i]
  }
  return total
}

console.log(sum([0, 1, 2, 3, 4]))
```

先来看不好的做法，使用迭代来完成一个数据累加。这里，`i` 是个不断变化的变量，在函数式编程中是不鼓励的。

index.js

```js
const sum = numbers => {
  if (numbers.length === 1) {
    return numbers[0]
  }
  return numbers[0] + sum(numbers.slice(1))
}

console.log(sum([0, 1, 2, 3, 4]))
```

好的方式是用递归。递归的原理不是我们这里关心的重点。我们关注的是，这里没有了会不断变化的变量，而纯粹使用了函数套函数，完成了相同的效果。

同时提一句，对于数组操作，从此咱们也不用 for 循环了 ，而是推荐使用 map/reduce/filter 。
