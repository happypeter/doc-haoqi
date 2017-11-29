# 用 super 代表父类

使用类继承的过程中，理解 super() 的作用是非常必要的，本节来揭晓。

### super 是什么？

可以这样简单的认为： super 代表父类。主要有两个用途：

- 使用 super() 呼叫父类的 constructor()
- 使用 super.functionName() 调用父类中的 static 方法


### super() 的作用

子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类就得不到 this 对象。

ES6的继承机制，实质是先创造父类的实例对象 this（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

```
class Father {
  constructor(familyName){
    this.familyName = familyName;
  }
  static sayHello() {
    console.log('hello');
  }
}



class Son extends Father {
  constructor() {
    super();
    this.height = 170; // 没有上一行的 super() ，这里的 this 就不让用
  }

  static hello() {
    super.sayHello(); // 调用父类的静态方法
  }
}

let tom = new Son('Wang', 160);
console.log(Son.hello());
```

### 参考

- [JavaScript ES6 / ES2015 - [04] Classes and Inheritance](https://youtu.be/RBLIm5LMrmc?t=316)
