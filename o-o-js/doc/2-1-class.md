# 第一个 class

这里写书写我们的第一个 class ，主要介绍用 ES6 语法如何写，但是也演示了 ES5 下的老写法。


### 新老语法对比

ES5 语法

```
function Person(name) {
  this.name = name;
}

Person.prototype.changeName = function(newName) {
  this.name = newName;
};
```

ES6 语法

```
class Person {
  constructor(name) {
    this.name = name;
  }
  changeName(newName) {
    this.name = newName;
  }
}
```

使用的时候都是一样的，都用 new 关键字

```
var Peter = new Person('peter');
console.log(Peter.name);
Peter.changeName('happypeter');
console.log(Peter.name);
```


### 参考资料

- http://es6.ruanyifeng.com/#docs/class
