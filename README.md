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


### 代码 commint 地址
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/src/models/Block.js  (block)


### 代码截图
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/block2%EF%BC%88lesson2%EF%BC%89.png
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/block%EF%BC%88lesson2%EF%BC%89.png
https://github.com/bluetracker/blockchain-in-js-workshop-2021/blob/lesson1/pic/lesson2.png  (lesson2运行结果)
> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---


## 第三课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---




## 第四课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---




## 第五课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---




## 第六课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](图片链接放这里)


### 主观与讨论题内容



---


## 结课报告





