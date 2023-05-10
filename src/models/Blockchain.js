// Blockchain
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