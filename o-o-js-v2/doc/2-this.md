# 通过 this 在各成员间传递变量

一个类里面可以定义很多方法，那各个方法间的数据如何共享呢？答案就是使用 this 。

### this 代表什么？

类里面的 this ，都是指向类的实例，也就是对象的。

```js
class Person {
  constructor(name) {
    this.name = name
  }
  logThis() {
    console.log(this)
  }
}

let peter = new Person('peter')
let billie = new Person('billie')

peter.logThis()
billie.logThis()
```

定义 Person 类，constructor 里面初始化 name 属性，然后定义 logThis 方法，打印 this 。下面创建两个对象 peter 和 billie 分别执行 logThis 。

浏览器中，可以看到 peter 对象的 this 就是 peter 这个对象，billie 对象的也一样。

### 如何在各个方法间共享数据

```js
class Person {
  methodA(data) {
    this.myData = data
  }
  methodB() {
    console.log(this.myData)
  }
}

let sb = new Person()
sb.methodA('hello')
sb.methodB()
```

如果想要把 methodA 中的数据传递给 methodB ，那么就用一个附着于 this 之上的变量即可。

把这里的 methodA 对应之前的 constructor ， methodB 对应 logThis 。也可以加深对 constructor 的工作方式的理解。

浏览器中，看到调用 methodB 果然打印出了赋值给 methodA 的数据 hello 。
