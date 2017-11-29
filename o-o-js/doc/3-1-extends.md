# 父类和子类

面向对象编程中所谓”继承”，指的就是子类会继承父类的属性和方法。ES6 语法中，继承通过 extends 关键字来实现。

这集中我们来演示下面几个效果：

- 子类中可以使用父类中的属性
- 子类中可以调用父类中的方法
- 子类中可以扩展自己的属性和方法

### 代码


```
class Father {
  constructor() {
    this.gender = 'male';
  }
  getFamilyName() {
    console.log(`The family name is Zhang`);
  }
}

class Son extends Father {
  constructor() {
    super();
    this.height = 160;
  }
  getSchoolName() {
    console.log('NO.2 Middle School');
  }
}

let tom = new Son;
console.log(tom.gender);
console.log(tom.height);
tom.getFamilyName();
tom.getSchoolName();
```

### 参考

- [阮一峰 ES6 教程](http://es6.ruanyifeng.com/#docs/class#Class的继承)
