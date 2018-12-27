权益证明机制，英文简称 POS，也有人翻译为股权证明机制，是跟 POW 竞争的区块链项目中的共识机制。多年来，二者都有很多大牛在背后支持。所以今天本文来聊聊 POS ，虽然比特币并没有使用 POS 的打算，但是我们也需要不断的放开视野，关心一下不同看法。

## POS 是什么？

还是先说拜占庭将军问题，这个问题的本质就是在网络上如果不可信的节点比较多，那么共识是不能达成的。

比特币解决这个问题采用的是 POW 的思路，使用经济激励的思路，让大家用算力投票来达成共识。也可以说共识是在对抗和博弈中达成的。但是 POS 的思路就非常不同了。我们假设网络上有一群人，他们都是可信的，他们记账的结果就作为共识，那么拜占庭将军问题可以说就不存在了。那么 POS 机制是如何选择这些可信的人的呢？从它的名字中就可以得到答案，也就是通过权益证明。如果我持有某个区块链项目的币，其实也就相当于持有这个项目的股权了。常识告诉我们，持有币越多，我就越不可能主动去破坏系统，因为这样造成的是我自己的巨大损失。所以，**POS 就是通过持有股权的数量来选择出这样一群可信的记账人的**。当然，更多的人把 POS 翻译成权益证明，而不是股权证明，因为通常选择的标准，或者叫权益值的大小，不仅仅取决于我持币的数量，而是还要乘以我对这些币的持有时间。这个时间包括，已经持有的时间，这个可以轻松的通过交易记录查询到，还可能包括未来承诺的持有时间，这个通过把币提交到一个系统锁定的账户中来强制实现。

好，这批人选出来之后，系统会让这些人轮流记账。既然是可信的人去记账，那就没有必要去进行投票竞争了，所以整个过程是没有能耗的。**记账过程不叫挖矿，通常就叫做记账或者叫生产区块**。另外，不同项目实现 POS 的思路也会有差异，例如有的项目是随机选择记账人，但是也有类似比特股或者 EOS 这样的项目，采用的是 DPOS ，也就是“委托权益证明”。首先让大家投票选出一定数量的委托节点或者超级节点出来。这个很类似于代议制民主体系下，大家选议员，然后让这些超级节点去轮流记账。

总体来讲，**POW 的思路是，你花费越多的能量，就能赚到更多的币，从系统外有能量输入。POS 是如果你欺诈就会丢掉自己的币，用平台的币做抵押，没有来自系统外的输入。**

## 优势

对比 POW，POS 有非常多的优势。

**首先一大优势就是不耗电**。POS 是没有算力竞争过程的，也不用花大量的电力去解题，所以记账过程可以说是没有能耗的。而 POW 就不同，能耗巨大。

**第二个优势是超强的性能**。因为可信的人是事先选好的，所以记账的时候就是他自己记账，然后广播出去即可。这个过程非常快捷。比如比特币产生一个区块需要十分种，而 EOS 出块时间已经缩小到一秒内了，完全不在一个数量级上，另外单块容量在 POS 下也有大幅优化的空间，因此比特币扩容问题在使用 POS 的项目中可能根本就不是问题。这样的容量也保证了，用户往 POS 区块链上写交易通常是不需要手续费的。

**第三个优势是避免集中化**。POW 本身是没有准入门槛的，但是随着挖矿硬件越来越专业化，普通用户用 CPU 基本挖不到比特币了，所以专业化的大型矿池成了挖矿的主力军。目前，70% 的算力都集中在中国人手里，而且就是少数几个矿池持有。如果可以串通起来谋到利益，这几个矿池的老板是很容易串通的，只不过比特币的游戏规则决定了，串通就只会损失，不会获利的，所以51%攻击才没有发生过。但是从这个角度，很多人选择支持 POS ，因为 POS 条件下，每个持币的人都是可以投票的。

总结上面三点，看到 POS 优势的确明显。著名的以太坊项目使用了多年的 POW 了，但是目前也正在考虑向 POS 迁移。

## 安全担忧？

但是，对于 POS 的争议也从来没有停止过。

**首先一点就是公平性**。POS 系统上，持币越多的人，越能得到更多的奖励，那么富人就会越来越富。

**再有一点，就是 POS 中心化程度肯定比 POW 高一些**。性能的提升不是没有代价的，例如 EOS 项目选择了21个超级节点来完成记账工作，所以才能达成那么高的效率。但是如果21个叫做去中心化，那么10个算不算去中心化呢，2个算不算呢？

**最后一点就是，Nothing At Stake 问题**。Nothing At Stake 意思就是“没有什么实际损失”。具体问题描述比较复杂，网上可以很容易搜到。但是根本原因就是因为，POW 的每次投票都是算力投票，或者就是说每投一票出去都会有真金白银的成本，而 POS 下就没有这个成本。所以很多时候持币人为了利益最大化，会和稀泥，造成共识达成很困难。

那上面这些问题是不是不可解呢？也不一定，各个项目其实也都在试图去避免这些问题。

## 总结

最后来总结一下。POS 一定会取代 POW 吗？目前看没有这个趋势，显然加密货币的老大比特币是没有考虑换到 POS，因为 POW 显然更安全。而且也有以太坊 POS 共识算法的核心开发者，自己出来开发新项目的时候采用的却是 POW 算法。所以争议还将继续。Peter 个人观察角度得出的暂时的结论是：**安全性要求高的场合，例如发币的时候，首选 POW，而对性能要求高的场合，例如一些智能合约平台，首选 POS**。同时，POS 的区块链最好作为 POW 区块链的第二层来使用，这样可以兼顾安全和性能。