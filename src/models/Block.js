import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2
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
  isValid() {
// 统计哈希值前缀0的个数
    let num = 0;
    for (let i = 0; i < this.hash.length; i++) {
      if (this.hash[i] === '0') {
        num++;
      } else {
        break;
      }
    }
    // 比较前缀0的个数与难度值
    return num >= DIFFICULTY;
  }

// setNonce(nonce) 是用来设置区块的 nonce 的函数
  setNonce(nonce) {
    this.hash=sha256(nonce+this.blockchain.name +
        this.prevHash +
        this.height +
        JSON.stringify(this.data)
    ).toString();
  }

}

export default Block