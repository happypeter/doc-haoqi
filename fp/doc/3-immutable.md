## immutability 不变性

函数式编程的思路下，变量具有不变性，说法有点搞笑，但是的确遵循这一点可以大大简化程序复杂度。也难怪有人说过，JS 代码中，const 用得越多的人，水平就越高。

### 什么是不变性？

例如，不好的做法如下：

```js
let rooms = [`room1`, `room2`, `room3`]
rooms[2] = `room4`
rooms
```

这样输出为 `['room1','room2','room4']` 最终达成了我们修改房间的目的，但是方式是不好的，因为直接对变量 `rooms` 做了修改。

正确的方式是这样：

```js
const rooms = [`room1`, `room2`, `room3`]
const newRooms = rooms.map(rm => {
  return rm === `room3` ? `room4` : rm
})
```

这样，运算过后，rooms 变量未变，新的变量 newRooms 中有了我们想要的结果，这就是不可变性要求下，正确的做事方式。你可能也留意到我这里把之前的 let 都改成了 const ，既然变量是不需要修改的那么为何不干脆声明生一个常量呢？这样，如果后面有了误操作，试图去修改变量，也可以得到及时的反馈。

## immutable.js

保证不变性之后，如果要进行修改操作，就需要先拷贝它。所以就像之前的这个例子，如果我想改其中一个 room ，就需要重新创建一个新的数组。对于小型数据，这样做也没什么。但是如果数据本身很复杂，每次修改一点点就拷贝整个数据，这样运行效率低，而且代码麻烦。

```
npm i immutable
```

immutable.js 可以保证不用拷贝原始数据，同时又保证不变性。所以可以大大提高程序的执行效率。

index.js

```js
const { List } = require('immutable')

const rooms = [`room1`, `room2`, `room3`]
const roomList = List(rooms)

const newRoomList = roomList.set(2, 'room4')

console.log(roomList.toArray(), newRoomList.toArray())
```

使用 immutable ，数组在 immutable 里面一般都转换为 `List` 来操作。这里把 `roomList` 通过 `set` 接口，把 index 为 2 的元素设置为 `room4`。跟 JS 本来的 array 操作最大的不同，不管是这样直接用 set 修改某个元素值，还是用 push 添加新值进 List ，被操作的 List 都是不会被直接修改的。

命令行中，运行一下，可以看到 roomList 保持原有数据不变，newRoomList 中是更新后的值。 底层的原理是 `set` 不会修改 `roomList` 的，但是同时 `newRoomList` 数据中也会复用 `roomList` 已有的数据，保证了底层的执行和存储效率。
