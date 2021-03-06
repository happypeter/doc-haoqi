这节咱们继续来聊密码学，而且要聊的是当代密码学的核心，也就是是“公开密钥加密”。公开密钥加密，就是前面咱们介绍过的非对称加密，两个词一个意思。这节我们先来聊聊公开密钥加密的定义，然后介绍一下它的两大应用，最后简要介绍一下两个公开密钥加密的算法，也就是是 RSA 还有 ECC。

## 定义
 
先来聊公开密钥加密的定义。公开密钥加密也称为”非对称加密“，加密和解密的时候使用不同的密钥，其中一个是公钥，是可以公开出去的，那么能公开输出的能不能叫密钥呢，这个我们不纠结，还是叫密钥吧，另外一个是私钥，这个是真的要严格保密的。

但是公开密钥加密的应用其实不局限于加密。公开密钥加密要实现的功能有两个：一个是加密通信，发送者用接收者的公钥去加密信息，接收者就用自己的私钥去解密信息。另外一个功能就是数字签名，发出信息的人用自己的私钥去进行数字签名来签署信息，这样任何人拿到公钥之后都可以去确认信息是不是由私钥持有人发出的，可以说数字签名有认证签署人身份的功能。

公开密钥加密的安全性基于基本的数学原理。公钥和私钥首先应该是有数学联系的，不然所谓的解密和签名操作也就不可能实现了，但是同时不能由公钥去算出私钥，如果可以算出来，那么安全性就丧失了。所以加密算法都是基于一些目前无解的数学问题，或者叫单向函数，例如整数分解或者离散对数。具体的算法有 RSA 和 ECC 等。什么叫单向函数呢？8616460799 是两个数相乘得到的，给这两个数，可以很容易算出结果，但是如果给出结果，要分解出两个乘数，就是一个数学上还没有解决的问题，叫做”整数分解“问题。换句话说，如果有一天整数分解问题解决了，攻击者就可以把公钥分解，那么私钥就很容易被算出来了，基于整数分解的加密算法也就失效了。具体单向函数是如何参与加密和解密的，这个函数跟公钥和私钥的关系又是怎样的呢？后面小节中我们介绍 RSA 算法原理的时候会详细介绍到。

稍微总结一下，公开密钥加密的应用方向有两个，一个是加密通信，另外一个是数字签名。公开密钥加密的安全是由底层的数学规律保证的。

## 应用

接下来，我们聊聊加密通信和数字签名的基本原理。

先说加密通信。Bob 需要先在自己的机器上生成公钥和私钥，然后把自己的公钥发送给 Alice 。这样，Alice 就可以给 Bob 发信息了。Alice 会用 Bob 的公钥把信息加密得到密文，密文传输过程中如果被截获是不用担心的，因为只有 Bob ，或者说只有私钥才能解密密文。这就是加密通信的基本过程。使用一个形象的比喻，Alice 要给 Bob 写信，首先让 Bob 寄过来一个带锁的箱子，Bob 的公钥就相当于这个箱子，这样 Alice 把信放到箱子中锁好，然后发送给 Bob。Bob 收到之后，就可以用钥匙打开箱子，拿到信了，显然这里私钥就是开箱子的钥匙。

再说数字签名。Alice 要在网上签署一份合同，所以她就把私钥和合同都传递给签名算法，这样能生成一段数据，这个数据就是数字签名了。然后 Alice 把公钥公布给所有人，这样任何人都可以用公钥去解密数字签名，解密成功，也就证明了这份合同的确是 Alice 签署的。同时，如果有人篡改了这份合同，那么解密过程也会失败，所以说数字签名还有防止篡改的功能。要注意，数字签名过程中，合同本身并没有被加密。可以认为，数字签名是私钥对合同的哈希加密得到的。我们也来做一个形象的比喻。Alice 写一封信给家里人，写好之后，用自己的印章给信封加上蜡封。家人收到信之后，根据蜡封上的图案就能判断信是 Alice 写的，同时蜡封没有损坏，表示信没有被拆开篡改过。数字签名就相当于这个蜡封。

上面的两大应用体现出了公钥和私钥各自作用，二者形成了非常对称的关系。公钥加密过的内容，可以用私钥解密，解密成功，就可以拿到信息。而私钥加密过的内容，也可以用公钥去解密，解密成功，证明数字签名的确是有效的。

这就是公开密钥加密的两大应用了，加密通信和数字签名。

## 主要算法

最后我们来聊聊公开密钥加密的具体算法的诞生，最知名的算法有两个，一个是 RSA 算法，一个是 ECC 算法。

RSA 算法是开山鼻祖。1970 年，一位英国密码学家预见了“无秘密加密”的可能性，公钥加密思想产生了。公钥加密的比对称加密有明显优势，因为通信之前，双方不用传递需要严格保密的密码，只需要传递公钥即可，而公钥不是秘密，被截获也不会影响通信安全。之后几年，人们开发了 RSA 算法，第一次真正实现了这个想法。RSA 算法标志着公开密钥加密真正诞生了。RSA 算法的安全性基于整数分解问题，具体来说就是根据大素数相乘的结果，不可能被反向分解的数学原理。RSA 的详细内容，后续章节中会有介绍。

后来，人们发明了另外一种加密算法叫做 ECC ，也就是椭圆曲线算法。世界上不可解的数学问题并不是只有整数分解一个，ECC 就是基于另外一个问题：离散对数。一个加密算法的安全性取决于，由公钥去运算私钥的难度。毕竟私钥的位数是有限的，所以即使用暴力搜索的方式，也肯定是能够算出来的，所以不同的算法其实安全性还是有差别的。而 ECC 用离散对数原理，同样的私钥长度，安全性比 RSA 更高。比特币就是用 ECC 来生成地址和私钥。这里你可能会有疑问，为何不能把私钥位数尽量弄长一些呢？的确，越长就越安全，但是同时执行效率也低，所以实际使用中还是要保证一种平衡的。

这里我们要记住的是，公开密钥加密算法很多，但是最重要的就是 RSA 和 ECC 两个。

## 总结

公开密钥加密的简单介绍就是这些了。要记住的是：首先公开密钥加密是基于单向函数的数学原理开发出来的，主要由两个应用，一个是加密通信，一个是数字签名。最著名的公开密钥加密的算法有两个，一个是 RSA 一个是 ECC 。

参考：

- https://en.wikipedia.org/wiki/Public-key_cryptography
