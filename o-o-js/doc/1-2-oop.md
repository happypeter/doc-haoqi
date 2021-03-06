# 什么是面向对象编程？

概念性的了解一下面向对象编程。


### 什么是面向对象编程？

wikipedia 这段很明了

> Object-oriented programming (OOP) is a programming paradigm based on the concept of "objects", which may contain data, in the form of fields, often known as attributes; and code, in the form of procedures, often known as methods.

翻译一下：面向对象编程是一套基于“对象”这个概念的编程方法论。一个对象中会包含数据，通常叫“属性”，也会包含一些函数，通常叫方法。

### class 和 object

object 就是对象的英文，class 中文翻译为”类”，这两个概念是面向对象编程的最重要的概念。对象是类的实例化，例如人是一个类，人有名字这个属性，但是没有具体值。
把人这个类实例化成一个具体的人，给这个人具体赋值，这个具体的人，就是一个对象，对象中就有了实际的数据值了。

### 为何要面向对象编程？

面向过程其实最为实际的一种思考方式，因为我们总是一贯一步一步的解决问题。可以说面向过程是一种基础的方法，它考虑的是实际的实现。
所以面向过程编程其实是更对新手直观的，但是面向对象编程因为对数据和方法进行了封装，造成类是有极强的可复用性的，所以在大型项目中面向对象
几乎是标配了。想我们作为全栈 JS 开发者，后面用 React 写前端，用 Nodejs 写后台，都是离不了对象的。


还是有一个有意思的小点要提一下，面向对象编程跟最直观的面向过程的编程有很大的区别。当然任何的编程都要考虑两个要素，一个是数据，另外一个是方法。面向对象先考虑
的是数据，后考虑方法，而面向过程编程是相反的。

### 参考

- http://shiroyasha.io/oop-in-the-age-of-es6.html
