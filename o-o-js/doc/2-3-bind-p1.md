# bind

this 在不同的执行上下文中指向不同的对象，这样往往会造成 undefined 错误，bind 要解决的就是明确函数在执行的时候 this 的指向。

理解 bind 和 this 是使用 JS 对象的必备基础。

### 代码


不使用 bind ，下面 plzTalk() 执行会报错。

```
var Person = {
  name: 'Peter',
  talk: function() {
    console.log(`My name is ${this.name}`);
  }
}

Person.talk();
let plzTalk = Person.talk;
plzTalk();
```


使用 bind 之后

```
var Person = {
  name: 'Peter'
}

let plzTalk = function() {
    console.log(`My name is ${this.name}`);
  };


plzTalk.bind(Person)();
```

所以总结一下： bind 的作用就是把一个对象（作为 bind 的参数传入），绑定到这个函数中的 this 之上。

### 参考

- [bind and this - Object Creation in JavaScript P1 - FunFunFunction #43](https://www.youtube.com/watch?v=GhbhD1HR5vk)
