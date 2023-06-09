import sha256 from 'crypto-js/sha256.js'
import EC from 'elliptic'

// 创建一个椭圆曲线对象，用于生成公钥和私钥
const ec = new EC.ec('secp256k1')

class Transaction {
  constructor(from, to, amount, timestamp) {
    this.from = from
    this.to = to
    this.amount = amount
    this.timestamp = timestamp || Date.now() // 如果没有传入时间戳，就使用当前时间
    this.hash = this._calculateHash()
    this.signature = null // 初始化签名为空
  }

  // 对交易进行签名，需要传入发送者的私钥
  sign(privateKey) {
    // 检查私钥是否匹配发送者的公钥
    const key = ec.keyFromPrivate(privateKey)
    if (key.getPublic('hex') !== this.from) {
      throw new Error('You cannot sign transactions for other wallets')
    }
    // 计算交易的签名，并保存为16进制字符串
    const signature = key.sign(this.hash, 'base64')
    this.signature = signature.toDER('hex')
  }

  // 验证交易是否有效，需要传入发送者的公钥
  isValid() {
    // 如果是奖励交易或者创世交易，就不需要验证，直接返回true
    if (this.from === null || this.amount === 0) return true
    // 如果没有签名，就返回false
    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction')
    }
    // 使用椭圆曲线对象来验证签名是否匹配交易的hash和发送者的公钥
    const publicKey = ec.keyFromPublic(this.from, 'hex')
    return publicKey.verify(this.hash, this.signature)
  }

  // 计算交易 hash 的摘要函数
  _calculateHash() {
    return sha256(
        this.from + this.to + this.amount + this.timestamp
    ).toString()
  }
}

export default Transaction

