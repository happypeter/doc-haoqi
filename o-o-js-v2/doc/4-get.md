# Getter

如何方便的获得类中已有数据的衍生数据呢？答案就是用 Getter 。

### 使用普通方法

```js
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

var user = new User('Peter', 'Wang')
console.log(user.fullName())
```

有一个 User 类，constructor 中初始化，姓和名，现在我想要一次性的获取全名，当然是可以定义一个 fullName 成员函数来实现的。但是使用的时候就需要添加上括号，看上去不像数据了。

浏览器中，看到运行时没有问题的。

### 使用 Getter

```js
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

var user = new User('Peter', 'Wang')
console.log(user.fullName)
```

如果在一个普通成员函数上加上 get 关键字，那它就变成一个 getter 了，使用的时候就不用加括号了。

浏览器中，看到 getter 工作了。
