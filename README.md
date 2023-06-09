# 实验报告模板

## 小组成员

- 2021131029-毛思铖 （组长）
- 2021121017-白杰明
- 2021131019-梁家悦
- 2021131030-关泓历
- 2021131031-李金蒿
- 2021131032-刘宇阳
- 2021131036-刘严
## 代码仓库链接
https://github.com/bluetracker/blockchain-in-js-workshop-2021.git



## 第一课代码
import sha256 from 'crypto-js/sha256.js'

// Block 类，表示一个区块
class Block {
// 构造函数，接收区块链对象，上一个区块的哈希值，区块的高度，区块的数据
constructor(blockchain, prevHash, height, data) {
this.blockchain = blockchain // 区块链对象
this.prevHash = prevHash // 上一个区块的哈希值
this.height = height // 区块的高度
this.data = data // 区块的数据
this.timestamp = Date.now() // 区块的时间戳
this.nonce = 0 // 区块的随机数
this.hash = this._setHash() // 区块的哈希值
}

// 根据区块的属性和随机数计算哈希值
_setHash() {
return sha256(
this.blockchain.name +
this.prevHash +
this.height +
this.data +
this.timestamp +
this.nonce
).toString()
}

// 根据区块链的难度系数调整随机数的值，直到找到一个满足要求的哈希值，并更新区块的哈希值和随机数属性
setNonce() {
while (!this.hash.startsWith('0'.repeat(this.blockchain.difficulty))) {
this.nonce++
this.hash = this._setHash()
}
}
}
export default Block



/ Blockchain
// Blockchain 类，表示一个区块链
class Blockchain {
// 构造函数，接收区块链的名字和难度系数
constructor(name, difficulty) {
this.name = name // 区块链的名字
this.difficulty = difficulty // 区块链的难度系数
this.blocks = {} // 存储区块的对象，键是区块的哈希值，值是区块对象
this.genesis = null // 创世区块，初始为 null
}

// 返回当前链中最长的区块信息列表
longestChain() {
let longest = [] // 存储最长的区块信息列表
let current = this.genesis // 当前区块，从创世区块开始
let max = 0 // 存储最大的区块高度
for (let hash in this.blocks) { // 遍历所有的区块
let block = this.blocks[hash] // 获取当前区块对象
if (block.height > max) { // 如果当前区块的高度大于最大高度
max = block.height // 更新最大高度
current = block // 更新当前区块为最高的区块
}
}
while (current) { // 当当前区块不为空时，循环执行
longest.unshift(current) // 将当前区块插入到最长列表的开头
current = this.blocks[current.prevHash] // 根据当前区块的上一个区块的哈希值，从对象中获取上一个区块对象，赋值给当前区块
}
return longest // 返回最长的区块信息列表
}
}
export default Blockchain
### 代码 commint 地址
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Block.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Blockchain.js


### 代码截图
链接：https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/%E5%9B%BE%E7%89%871.png  (运行结果)

链接：https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/block.png (block)

链接：https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/blockchain.png (blockchain)

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容

---



## 第一课代码
import sha256 from 'crypto-js/sha256.js'

// Block 类，表示一个区块
class Block {
// 构造函数，接收区块链对象，上一个区块的哈希值，区块的高度，区块的数据
constructor(blockchain, prevHash, height, data) {
this.blockchain = blockchain // 区块链对象
this.prevHash = prevHash // 上一个区块的哈希值
this.height = height // 区块的高度
this.data = data // 区块的数据
this.timestamp = Date.now() // 区块的时间戳
this.nonce = 0 // 区块的随机数
this.hash = this._setHash() // 区块的哈希值
}

// 根据区块的属性和随机数计算哈希值
_setHash() {
return sha256(
this.blockchain.name +
this.prevHash +
this.height +
this.data +
this.timestamp +
this.nonce
).toString()
}

// 根据区块链的难度系数调整随机数的值，直到找到一个满足要求的哈希值，并更新区块的哈希值和随机数属性
setNonce() {
while (!this.hash.startsWith('0'.repeat(this.blockchain.difficulty))) {
this.nonce++
this.hash = this._setHash()
}
}
}
export default Block



/ Blockchain
// Blockchain 类，表示一个区块链
class Blockchain {
// 构造函数，接收区块链的名字和难度系数
constructor(name, difficulty) {
this.name = name // 区块链的名字
this.difficulty = difficulty // 区块链的难度系数
this.blocks = {} // 存储区块的对象，键是区块的哈希值，值是区块对象
this.genesis = null // 创世区块，初始为 null
}

// 返回当前链中最长的区块信息列表
longestChain() {
let longest = [] // 存储最长的区块信息列表
let current = this.genesis // 当前区块，从创世区块开始
let max = 0 // 存储最大的区块高度
for (let hash in this.blocks) { // 遍历所有的区块
let block = this.blocks[hash] // 获取当前区块对象
if (block.height > max) { // 如果当前区块的高度大于最大高度
max = block.height // 更新最大高度
current = block // 更新当前区块为最高的区块
}
}
while (current) { // 当当前区块不为空时，循环执行
longest.unshift(current) // 将当前区块插入到最长列表的开头
current = this.blocks[current.prevHash] // 根据当前区块的上一个区块的哈希值，从对象中获取上一个区块对象，赋值给当前区块
}
return longest // 返回最长的区块信息列表
}
}
export default Blockchain

### 代码 commint 地址

https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Block.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Blockchain.js



### 代码截图
链接：https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/%E5%9B%BE%E7%89%871.png  (运行结果)

链接：https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/block.png (block)

链接：https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/blockchain.png (blockchain)
> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容


---



## 第二课代码
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/.gitignore

### 代码 commint 地址
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Block.js  (block)


### 代码截图
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/block2%EF%BC%88lesson2%EF%BC%89.png
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/block%EF%BC%88lesson2%EF%BC%89.png
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/lesson2.png  (lesson2运行结果)
> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容
根据搜索结果，pow挖矿的优缺点是指以下几个方面：

pow挖矿的优点是：
完全去中心化，节点自由进出，不需要任何许可
安全性高，破坏系统需要投入极大的成本，因为获得正确哈希值的概率和算力成正比；
算法简单，实现容易，依托安全可靠的加密算法如SHA256，巧妙地形成了一种简单粗暴的工作量机制；
节点之间无需交换额外的信息即可达成共识，只需要接受和验证区块。

pow挖矿的缺点是：
浪费能源，大量的矿机和电力的投入，就只用在计算一个哈希值上，挖矿失败，投入的能源就是付之一炬；
区块交易效率低，由于系统设计限制和网络延迟，全网都在进行算力竞赛，争相记账，同时全网节点又要进行验证区块以及确认达成一致的公链，
可想而知系统运行的速度短时间内不会有特别快的提升；
存在弱去中心化，随着矿机设备的产生和算力集中化程度高，中心化趋势加强，可能存在51%的系统攻击。

重装系统，安装纯净的win10系统，避免系统问题影响挖矿；
找到显卡对应的最佳驱动，不一定是最新的驱动，而是适合挖矿的驱动；
挖矿软件参数设置，选择合适的内核，填入提升算力的参数，调高虚拟内存，打开计算模式和测试模式；
显卡超频参数设置，根据显卡的型号、品牌、颗粒、时序等因素，调整核心频率、显存频率、电压等参数，提高算力，降低功耗和温度¹；
选择合适的矿池，避免高额的手续费和提币限制，选择直接结算到钱包的矿池；
提升WinningPoSt成功率，保证链同步速度和稳定性，优化数据抽取和计算速度，监控出块情况和报警系统；
了解挖矿算法和难度调整机制，根据不同的币种选择不同的挖矿策略。
---


## 第三课代码
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/.gitignore

### 代码 commint 地址
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/UTXO.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/UTXOPool.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Block.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Blockchain.js
### 代码截图

> 将截图上传至网盘，放入链接即可
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/lesson3.png
![](链接)


### 主观与讨论题内容



---




## 第四课代码


### 代码 commint 地址

https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Block.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Blockchain.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Transaction.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/UTXO.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/UTXOPool.js
### 代码截图
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/lesson4.png
> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---




## 第五课代码


### 代码 commint 地址
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Block.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Blockchain.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Transaction.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/UTXO.js
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/UTXOPool.js



### 代码截图
https://github.com/bluetracker/blockchain-in-js-workshop-2021/tree/lesson5/pic
> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容
比特币交易的处理极限是指比特币网络每秒可以处理的交易数量，这个数量主要受区块产生速度和 区块规模限制
这两个参数共同影响着比特币网络每秒可以处理的交易数量。目前的块大小不足以管理在比特币网络上发生的交易数量。
比特币每秒可处理的交易量约为7笔，远低于其他支付系统如Visa或PayPal。这也导致了交易延迟和费用增加的问题，影响了比特币的可扩展性和可用性。


挖矿难度越大，挖出区块就越困难。区块大小影响了交易的处理速度和费用，进而影响了矿工的收益和激励。如果区块大小增加，那么每个区块可以容纳更多的交易，
交易速度和费用会降低，这对用户来说是有利的，但对矿工来说可能会降低他们的收入。如果区块大小减小，那么每个区块可以容纳更少的交易，交易速度和费用会增加
这对用户来说是不利的，但对矿工来说可能会增加他们的收入,比特币区块大小和挖矿难度之间需要平衡用户和矿工之间的利益，同时保证网络的安全性和可扩展性。²

源: 与必应的对话， 2023/6/9
(1) 一文读懂BTC挖矿难度调整 - 知乎. https://zhuanlan.zhihu.com/p/342992912.
(2) 比特币挖矿难度与算力解释！ - 知乎专栏. https://zhuanlan.zhihu.com/p/344237325.
(3) 比特币挖矿难度变化与其价格的关系研究 | CoinVoice. https://www.coinvoice.cn/articles/3245.
(4) 影响比特币挖矿的因素有哪些？. http://www.lianmenhu.com/blockchain-9840-1.
(5) 比特币挖矿难度是什么意思? 突破20T是否影响矿工收益?_技术_区块链_脚本之家. https://www.jb51.net/blockchain/765891.html.

---




## 第六课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](图片链接放这里)


### 主观与讨论题内容
合理的交易费用应该是取决于用户对交易确认速度和成本效率的偏好，以及不同区块链网络中的供需关系的。
用户应该根据当前和历史的平均交易费用来设置合理的交易费用，以避免过高或过低。

如果没有交易费用，矿工可能会失去确认交易的动力，因为他们只能依靠区块奖励来获得收入。而区块奖励是随着时间的推移而逐渐减少的
，预计在2140年左右将达到零。这可能导致网络的算力下降，安全性降低，甚至出现51%攻击的风险。 另一方面，如果没有交易费用
，用户可能会无节制地发送大量的交易，导致网络拥堵，延迟增加，资源浪费。这可能影响网络的可扩展性和可用性，降低用户的体验和信任。

因此，比特币交易费用是一种必要的机制，既能平衡矿工和用户之间的利益，又能保障网络的运行质量。
---


## 结课报告





