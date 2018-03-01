# 静态方法

静态方法（ static method ）可以让我们不用实例化直接呼叫。

### 普通方法是不能再类上直接呼叫的

例如

```js
class Person {
  sayHello() {
    console.log('Hello')
  }
}

Person.sayHello()
```

浏览器中执行，就会看到报错，说 sayHello 不是一个 function 。

### 改为静态即可

```js
class Person {
  static sayHello() {
    console.log('Hello')
  }
}

Person.sayHello()
```

加上 static 。

浏览器中执行，就会看运行成功了。

## 实用一些的例子

计算器

```js
class Calculator {
  static add(num1, num2) {
    return num1 + num2
  }
  static subtract(num1, num2) {
    return num1 - num2
  }
}

console.log(Calculator.subtract(3, 1))
```

静态方法很适合用来组织很多小功能到一个 Class 之上。比如这里的加减功能，如果是实例化再用，就会显得很古怪。

浏览器中，看到运算正确。
