本文来解释一下比特币为何叫加密货币。加密当然是计算机密码学的一个术语了，但是在这里 Peter 想用通俗的方式给大家解释一下基本原理：什么是加密通信，什么是数字签名，以及比特币是如何利用这些技术进行转账操作的。本文希望达成的效果是让那些没有计算机科学背景的朋友也一样可以看懂。

## 公钥和私钥

我们先从比特币聊起。大家知道，想要持有比特币，我们需要有一个比特币地址，地址就可以理解为银行账号。类似于银行账号需要一个密码，一个比特币地址也需要自己的密钥。只有持有了地址所对应的密钥，我们才能对地址中的比特币进行转账操作。地址和密钥的作用还是很好理解的。

那么，地址和密钥是在哪生成的呢？很多地方都可以生成，例如可以到 bitaddress.org 上去生成。生成之后，我们就可以得到一对数字，这可真是天生的一对，给定一个地址，只有一个密钥可以跟它配对，反之也一样。对于不熟悉计算机科学的朋友，会感觉到这长长的两串数字跟普通的银行账号密码看起来非常不同，所以大家会猜测这一对数字可能会对应着密码学的某个概念。恭喜，还真是这样。**比特币地址就是密码学中所说的公钥**，公就是公开的公，钥，就是钥的钥。**而跟地址配对的密钥**，就是私钥，私就是私密的私。**基本使用哲学就是公钥是可以公开给任何人看的，就像比特币地址可以展示给任何人，但是私钥必须严格保密。**

好，这样我们就把比特币跟密码学联系起来了，知道了公钥和私钥分别对应比特币的地址和密钥。

## 加密通信

接下来我们稍微离开比特币一会儿，聊聊如何通过公钥和私钥实现加密通信。

互联网就是一个大广场，任何你说的话都可以被陌生人听到，所以要想传送一些机密信息，就需要先对信息进行加密。**最简单的思路就是所谓的对称式加密，也就是发送者和接收者使用同一个密码**。发送者发消息的时候，把消息内容和密码传递给加密函数做运算，运算结果就是密文，接收者收到密文后，用同一个密码和解密函数，就能对密文进行解密。对称式加密思路的确简单，但是在互联网上往往不能用。假若双方没有相同的密码，就不能建立加密通道，那么密码本身想要传递给对方，就只能通过明文传送了，这样显然就没有了安全性。

所以**对称加密不适合来做互联网上的加密通信，于是非对称加密应运而生**。故名思议，**非对称加密就是加密用的密码跟解密用的密码是不同的**。具体过程是这样，接收方首先生成一对公钥和私钥，然后把公钥发送给发送方。公钥是不怕被泄露的，所以明文传输也没有问题。然后，发送方就用自己手中的公钥对信息进行加密，把加密过后的密文发送给接收方。接收方收到密文后，用私钥进行解密，就可以获得原文。这样加密通信的通道就建立起来了。加密通信使用的范围当然不局限于比特币了，互联网上大部分场合都是通过这种非对称加密方式来实现的机密信息的传递的。

稍微总结一下就是，**加密通信过程中，人们用公钥加密信息，用私钥去解密信息。**

## 数字签名

但是比特币叫加密货币，最重要的不是使用了上面所说加密通信，毕竟区块链是要让全世界都可以读取的，而是用到了它的反面，叫做数字签名。加密通信过程中，公钥用来加密信息，私钥用来解密信息。但是有时候人们恰好要做相反的事情，**私钥持有者会用私钥去加密，让持有公钥的人去进行解密，这个过程就是数字签名。**

现在我们回到比特币的实际情形。小明要向小红转账一个比特币，他要做的就是向全网广播这条交易，交易上面有他和小红的比特币地址已及转账金额。但是关键问题来了，网络上的记账人如何去确认这个交易就是小明发起的呢？小明需要向全网证明，他拥有自己地址对应的私钥。但是同时私钥又是不能暴露给任何人的，这个矛盾如何解决呢？数字签名就可以登场了。小明广播交易的时候，要先**把私钥和交易传递给加密函数，输出的结果就是一串数字，也就是所谓的数字签名**。数字签名伴随交易广播到全网后，记账人可以用公钥——也就是交易中包含的小明的地址，对数字签名进行解密，如果解密成功，就可以证明交易的确是由私钥持有者发出的。

在这个过程中，小明没有暴露自己的私钥，但是证明了自己持有私钥这个事实，这都是数字签名的功劳。所以说，数字签名跟我们日常的纸笔形式的签名一样，都可以达成确认签署人身份的目的。另外不要忘记，数字签名生成过程中，交易本身也是输入的参数之一，这样带来了一个纸笔签名不能达成的效果，那就是**网络上的记账人在解密签名的过程中，不但能验证私钥，同时还能验证交易的内容有没有被篡改过**。这个特性又给交易安全添加了另外一层保护。

## 总结

最后来总结一下，比特币之所以叫加密货币，就是因为它用到了很多密码学的知识。例如我们这里的介绍的公钥私钥的概念、加密通信的过程、数字签名的原理。当然，比特币也不单单是用到了数字签名这一个技巧，比特币创世论文中，大家会看到哈希、Merkle Tree 等各种概念，这些其实都是来自于密码学。所以想要深入了解比特币的同学，可以以本文为入口，进行下一步的学习。