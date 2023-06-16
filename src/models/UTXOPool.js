import UTXO from './UTXO.js'
import Transaction from "./Transaction.js";

class UTXOPool {
  constructor() {
    this.miner = ''
    this.utxos = {}
  }

  // 添加交易函数
  /**
   * 将交易的信息更新至 UTXOPool 中
   */
  addUTXO(utxo) {
    //若交易池为空，则存入第一个utxo
    if (Object.keys(this.utxos).length === 0){
      this.utxos[utxo.pubKey]=utxo
    }else {
      //若交易池不为空，则判断是否有相同的utxo，若有则合并
      this.utxos = Object.assign(this.utxos, {[utxo.pubKey]: utxo})
    }
  }

  // 处理交易函数
  handleTransaction(trx) {
    if (this.isValidTransaction(trx)) {
      //判断发送方是否在utxos中
      if (!Object.keys(this.utxos).includes(trx.to)) {
        this.utxos[trx.to] = new UTXO(trx.to, 0)
      }
      this.utxos[trx.from].amount -= (trx.amount+trx.fee)
      if (Object.keys(this.utxos).includes(trx.to)) {
        this.utxos[trx.to].amount += trx.amount
      }
      //将fee加入矿工账户
      this.utxos[this.miner].amount += trx.fee
    }
  }

  // 验证交易合法性
  /**
   * 验证余额
   * 返回 bool
   */
  isValidTransaction(trx) {
    //判断发送方是否在utxos中
    if (!Object.keys(this.utxos).includes(trx.from)) {
      return false
    }
    //判断发送方余额是否足够
    return this.utxos[trx.from].amount >= (trx.amount + trx.fee)
  }

}

export default UTXOPool
