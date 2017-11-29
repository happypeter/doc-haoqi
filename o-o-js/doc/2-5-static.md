# 静态方法

静态方法（ static method ）可以让我们不用实例化 class ，直接呼叫，很适合用来组织很多小功能到一个 Class 之上。

### 代码

```
class Person {
  constructor() {

  }
  static sayHello() {
    console.log("Hello");
  }
}


Person.sayHello();
```

计算器

```
class Calculator {
  constructor() {

  }
  static add(num1, num2) {
    return num1 + num2;
  }
  static subtract(num1, num2) {
    return num1 - num2;
  }
}


console.log(Calculator.subtract(1, 3));
```


### 参考

- [Let's Learn ES6 - Classes](https://www.youtube.com/watch?v=EUtZRwA7Fqc&feature=youtu.be&t=833)
