<!-- 注：qcpwZourCVREiVp9xZQLjbzysmxsYsBxNg 我给 howard 的地址 -->

发币我们会了，但是币不能只发到自己的机器上。代币之所以有公信力，是因为它是所有人确认过的东西，换句话说，我们的代币必须要发布到量子链的主网上，让所有的节点确认一下，类比现实世界，就是让所有节点给做一下公证人之后，代币才具备了流通的基本条件。大家的公正，确保了我们，作为发行方，不能任意增发，不能随意违反代币合约中的各项条款。所谓主网，就是真正的产品化的网。但是，真正向量子链主网上部署内容是要收费的，为了便于大家开发，量子链也有测试网，我们后续的操作都是在测试网上完成，但是跟主网上操作步骤是一样的。

### 连接到测试网络

首先要让我们的本地环境连上测试网。第一步，来把原来的启动本地节点的脚本用 ctrl-c 终止。


start_test.sh 

```
docker run -it --rm \
  --name myapp \
  -e "QTUM_NETWORK=testnet" \
  -v `pwd`:/dapp \
  -p 9899:9899 \
  -p 9888:9888 \
  -p 3889:3889 \
  -p 13888:13888 \
  hayeah/qtumportal
```

新建一个脚本文件 start_test.sh，可以看到跟越来的 start.sh 比较类似，只不过可以明显看出连接的是 `testnet` 也就是测试网。

```
sh start_test.sh
```

运行 start_test.sh 这个脚本。启动测试网环境后，会自动开始同步测试网数据，十几万个区块，一共五六百兆的数据，所以都下载下来是需要点时间的。命令行中打印的信息中有 height 一项，是不断递增的整数。到 https://testnet.qtum.info/ 可以看到目前全测试链总高度是 192284 ，所以当命令行中的 height 等于或者稍微大于这个值的时候，同步也就结束了。

这样，docker 容器，就变成了测试网的一个节点，里面的是完整的一条测试网区块链。

## 申请测试网量子币

```
docker exec -it myapp sh
```

进入 docker 环境，生成一个新的支付地址。

```
/dapp # qcli getnewaddress
qcpwZourCVREiVp9xZQLjbzysmxsYsBxNg
```

然后到 http://testnet-faucet.qtum.info 网站免费申请一些测试网的量子币，把刚生成的支付地址粘贴到输入框中并提交之后，需要等待一会儿。


```
/dapp # qcli getbalance
43.00000000
```

然后就可以查看到你钱包中的余额不再为零，而是你获取到的免费量子币的数量。

现在钱包中有钱了，就可以部署智能合约到量子链的测试网上了。

### 部署合约

首先配置合约 owner

```
export QTUM_SENDER=qcpwZourCVREiVp9xZQLjbzysmxsYsBxNg
```

然后部署之前那个能够铸造 token 的智能合约 `CappedToken.sol`

```
/dapp/mytoken # solar deploy openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol '[21000000]'
```

需要等待几分钟，命令行中出现这样的打印信息，说明智能合约已经部署成功

```
/mytoken # solar deploy openzeppelin-solidity/contracts/token/ERC20/CappedT
oken.sol '[21000000]'
exec: solc [openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol --combined-json bin,metadata --optimize --allow-paths /dapp/mytoken]
◰ (0/1) Confirming contracts
🚀  All contracts confirmed
   deployed openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol => eed0622264f3b7c420a769a45547634034161f0f
```

上述命令输出结果中，给出了合约部署到测试链上的地址。

```
eed0622264f3b7c420a769a45547634034161f0f
```

查看当前目录下的文件，新出现了一个 `solar.development.json` 文件，后续跟合约进行交互的时候 solar.json 就要使用这一个了。因为这个才是对应测试网上的发币合约。

往测试链上部署合约是要花钱（Gas）的，看一下钱包余额吧：

```
/dapp/mytoken # qcli getbalance
62.78770800
```

到测试链上查看部署的合约信息

https://testnet.qtum.org/address/eed0622264f3b7c420a769a45547634034161f0f


## 铸币

使用 APIPlayer 加载最新的 solar.json 文件。

```
/dapp/mytoken # solar status
✅  openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol
        txid: 89e35a98f5b736f8cdf96404ddbfb0cc049f10488b762e38dda3df36f8628039
     address: a2d86e21f10d837efcbf465bb6a45b53d76a23b5
   confirmed: true
       owner: qcpwZourCVREiVp9xZQLjbzysmxsYsBxNg

/dapp/mytoken # qcli  gethexaddress qcpwZourCVREiVp9xZQLjbzysmxsYsBxNg
d35baf0d847ab8030a785160377d3a2b07b46589
```

拿到 owner 地址的 hex 版本。到 ABIPlayer 中点 mint 接口，mint 就是铸币的意思。

```
to: d35baf0d847ab8030a785160377d3a2b07b46589
sum: 10000000
```

填写 to 和 sum 两项内容，分别是拥有者的地址，铸币数量。点按钮，开始铸币。

几分钟确认后，可以在 https://testnet.qtum.info/contract/a2d86e21f10d837efcbf465bb6a45b53d76a23b5 看到发行的代币数量。这里有一个可以进一步改进的地方，就是我们发布的代币是没有明确的名字的，比如这里页面上显示的是”发行总量是 10000000 token", 我们可能希望的是给代币取一个具体的名字，例如 "10000000 HTT" 。那么 HTT 这个名字如何设置呢，可以在合约中添加一下 [Symbol](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#symbol) ，具体过程我们就不操作了。

ABIPlayer 中（ http://localhost:9899/abiplay/ ） 也能通过查看 totalSupply 看到 1000 万这个数量。

总之，发币成功。咱们有钱了。

## 转账

这些代币发行之后，可以用来进行 ICO ，当然现在国内 ICO 还是不允许的。但是我们可以用这些代币做功能币。

使用的前提肯定是要能进行转账才行。下面我们来演示一下转账操作。

现在假设你在自己的钱包中生成了一个地址，发给我：

```
/dapp/mytoken # qcli gethexaddress qVECuWzgiMdHRSqz4nmhaBJ8euuy858KVM
80010cb72f58d19248d15a249e644b5e3984c71b
```

我把地址转换成了16进制。

到 ABIPlayer 中点击 transfer 按钮向你地址发送5000个 token 。到 localhost:9899 页面点击 approve 确认这次操作，大概几秒钟后，就能 https://testnet.qtum.info/address/qVECuWzgiMdHRSqz4nmhaBJ8euuy858KVM/ 看到你的地址中有了5000 token 的余额了。转账成功。

### 总结

本节实现了在测试网上铸币，然后用 ABIPlayer 的方式进行了代币的转账操作。
