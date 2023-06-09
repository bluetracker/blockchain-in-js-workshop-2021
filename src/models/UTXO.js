export default class UTXO {
  //pubKey 为公钥 amount 为金额
  constructor(pubKey,amount) {
    this.pubKey = pubKey
    this.amount = amount
  }
}