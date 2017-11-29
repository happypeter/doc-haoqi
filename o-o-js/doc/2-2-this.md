# 理解 this 指向

需要一起来重复这句话：

> 在面向对象编程条件下，类的方法内部如果含有 this，它默认指向类的实例。

### 代码

用 class 关键字的情况

```
class Person {
  constructor(name) {
    this.name = name;
    console.log(this);
  }
  changeName(newName) {
    this.name = newName;
  }
  sayName(){
    console.log(this.name);
  }
}


var Peter = new Person('peter');
Peter.changeName('happypeter');
Peter.sayName();
```


使用“对象字面量”的形式来定义对象


```
var Person = {
  name: 'Peter',
  talk: function() {
    console.log(`My name is ${this.name}`);
  }
}

Person.talk();
```

### 参考资料

- [JavaScript对象字面量](http://www.itxueyuan.org/view/6334.html)
- [youtube 频道：funfunfuction](https://www.youtube.com/watch?v=GhbhD1HR5vk)
- [MDN bind](https://developer.mozilla.org/en-US/docs/Talk:JavaScript/Reference/Global_Objects/Function/bind)
- [MDN this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
