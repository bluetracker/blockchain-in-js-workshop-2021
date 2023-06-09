import UTXO from './UTXO.js'
import Transaction from "./Transaction.js";

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos
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
      for (let utxosKey in this.utxos) {
        if (utxo.pubKey === utxosKey){
          this.utxos[utxo.pubKey].amount += utxo.amount
        }
      }
    }
  }

  // 将当前 UXTO 的副本克隆
  clone() {
    return this.utxos['04fc5783257a53bcfcc6e1ea3c5059393df15ef4a286f7ac4c771ab8caa67dd1391822f9f8c3ce74d7f7d2cb2055232c6382ccef5c324c957ef5c052fd57679e86']
  }


  // 处理交易函数
  handleTransaction(trx) {
    if (this.isValidTransaction(trx.from, trx.amount)) {
      //判断发送方是否在utxos中
      if (!this.utxos.hasOwnProperty(trx.to)) {
        this.utxos[trx.to] = new UTXO(trx.to, 0)
      }
      //判断接收方是否在utxos中
      this.utxos[trx.from].amount -= trx.amount
      for (let utxosKey in this.utxos) {
        if (trx.to === utxosKey) {
          this.utxos[trx.to].amount += trx.amount
        }
      }
    }
  }

  // 验证交易合法性
  /**
   * 验证余额
   * 返回 bool
   */
  isValidTransaction(from,amount) {
    //判断发送方是否在utxos中
    if (!this.utxos[from]){
      return false
    }
    //判断发送方余额是否大于等于交易余额
    if (this.utxos[from].amount < amount){
      return false
    }else {
      return true
    }

  }

  removeUTXO(utxo) {
    
  }
}

export default UTXOPool