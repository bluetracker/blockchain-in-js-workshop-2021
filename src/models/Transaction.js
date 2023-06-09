import sha256 from 'crypto-js/sha256.js'
import verifySignature from 'crypto-js'
class Transaction {
    constructor(from, to, amount) {
        this.from = from
        this.to = to
        this.amount = amount
        this.hash = this._calculateHash()
    }



    // 更新交易 hash
    _setHash() {
        this.hash = this._calculateHash()

    }

    // 计算交易 hash 的摘要函数
    _calculateHash() {
        return sha256(this.from + this.to + this.amount).toString()
    }
    hasValidSignature() {
        // 交易没有签名的情况
        if (!this.signature) {
            return false
        }
        // 交易有签名的情况
        return verifySignature(this.hash, this.signature, this.from)
    }
}

export default Transaction