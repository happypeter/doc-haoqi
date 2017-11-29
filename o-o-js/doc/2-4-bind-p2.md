# bind 的例子

再举一个 bind/this 的小例子，加深一下理解。


### 代码

```
function talk() {
  console.log(this.sound);
}

let Person = {
  sound: 'Hi there!',
  speak: talk
}

Person.speak(); // 可以正确输出 sound 的值

```


### 参考

- [Examples of this and bind - Object Creation in JavaScript P2 - FunFunFunction #44](https://www.youtube.com/watch?v=PIkA60I0dKU)
