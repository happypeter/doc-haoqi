# 用 extends 实现继承

通过 extends 关键字来实现类的继承。

### 子类中可以使用父类成员

```js
class Father {
  constructor() {
    this.gender = 'male'
  }
  getFamilyName() {
    console.log(`The family name is Zhang`)
  }
}

class Son extends Father {}

let tom = new Son()
console.log(tom.gender)
tom.getFamilyName()
```

首先子类中可以天然的继承父类的属性和方法。定义一个父类是 Father ，里面有一个 gender 属性，还有一个 getFamilyName 方法，这样，我通过 extends 语法定义子类 Son ，在子类的对象 tom 中，是可以使用 gender 和 getFamilyName 的。

浏览器中，看到果然运行正常。

### 子类中可以扩展自己的属性和方法

```js
class Father {
  constructor() {
    this.gender = 'male'
  }
  getFamilyName() {
    console.log(`The family name is Zhang`)
  }
}

class Son extends Father {
  constructor() {
    super()
    this.height = 160
  }
  getFamilyName() {
    console.log(`Zhang`)
  }
  getSchoolName() {
    console.log('NO.2 Middle School')
  }
}

let tom = new Son()
console.log(tom.height)
tom.getFamilyName()
tom.getSchoolName()
```

子类 Son 中，添加一个自己的属性 height ，super 下一节介绍，重新定义 getFmailyName 方法，添加一个新的方法 getSchoolName ，这些都是没有问题的。

浏览器中，可以看到执行都是成功的。
