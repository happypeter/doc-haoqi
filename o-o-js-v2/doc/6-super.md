# 用 super 代表父类

使用类继承的过程中，super 代表父类，来看看它的具体作用。

### 子类 constructor 中使用 this

index.js

```js
class Father {}

class Son extends Father {
  constructor() {
    this.height = 170
  }
}

let tom = new Son()
```

有父类 Father ，它的子类 Son 的 constructor 中，如果直接使用 this ，就会有问题。

浏览器中，可以看到报错：必须呼叫 super constructor ，也就是父类的构造函数，才能在子类中使用 this ，这个的底层原理是，子类的 this 是基于父类的，如果父类都没有被 construct 也就是没创建，那子类的 this 就创建不了。

添加 super() 。

浏览器中，错误消失了。

## 调用父类方法

index.js

```js
class Father {
  sayHello() {
    console.log('Hello')
  }
}

class Son extends Father {
  sayHello() {
    super.sayHello()
    super.sayHello()
  }
}

let tom = new Son()
tom.sayHello()
```

父类中有一个 sayHello 方法。到子类中，如果想要调用，就直接 super.sayHello() 即可。

浏览器中，可以看到，果然执行了两次父组件的 sayHello 方法。
