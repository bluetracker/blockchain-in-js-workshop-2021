import UTXO from "./UTXO.js";
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name) {
    this.name = name;
    this.genesis = null;
    this.blocks = {};
  }

  // 2. 定义 longestChain 函数
  /*
    返回当前链中最长的区块信息列表
  */
  longestChain() {
    let high = null;
    // 找出高度最高的区块
    // 使用Object.values方法代替for循环，提高效率
    for (let block of Object.values(this.blocks)) {
      if (!high || high.height < block.height) {
        high = block;
      }
    }
    let longest = [];
    //由最高的区块反推到创世区块
    longest.push(high);
    //找到创世区块就停止循环
    while (high.previousHash !== this.genesis.hash) {
      //循环blocks找到前一个区块
      //使用Object.values方法代替for循环，提高效率
      for (let block of Object.values(this.blocks)) {
        if (high.previousHash === block.hash) {
          //找到的区块放入最长链表中
          longest.push(block);
          high = block;
        }
      }
    }
    //逆转数组元素
    return longest.reverse();
  }
  // 判断当前区块链是否包含
  containsBlock(block) {
    // 添加判断方法
    // 使用hasOwnProperty方法代替for循环，提高效率
    return this.blocks.hasOwnProperty(block.hash);
  }
  // 获得区块高度最高的区块
  maxHeightBlock() {
    let high = null;
    // 找出高度最高的区块
    // 使用Object.values方法代替for循环，提高效率
    for (let block of Object.values(this.blocks)) {
      if (!high || high.height < block.height) {
        high = block;
      }
    }
    return high;
  }
  // 添加区块
  /*
  */
  _addBlock(block) {
    if (!block.isValid()) return;
    if (this.containsBlock(block)) return;
    // 添加 UTXO 快照与更新的相关逻辑
    this.blocks[block.hash] = block;
    //获取父区块的UTXO结果
    if (block.previousHash !== this.genesis.hash) {
      block.utxoPool.utxos[block.coinbaseBeneficiary] = this.blocks[block.previousHash].utxoPool.clone();
    }
    //设置utxoPool的miner
    block.utxoPool.miner = block.coinbaseBeneficiary;
    //更新UTXO结果
    let utxo = new UTXO(block.coinbaseBeneficiary, 12.5);
    block.utxoPool.addUTXO(utxo);
  }
}
export default Blockchain;
