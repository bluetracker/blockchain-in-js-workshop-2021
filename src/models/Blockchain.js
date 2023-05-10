// Blockchain
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name, genesisBlock) {
    this.name = name;
    this.blocks = new Map();
    this.blocks.set(genesisBlock.hash, genesisBlock);
  }

  // 2. 定义 longestChain 函数
  /*
    返回当前链中最长的区块信息列表
  */
  longestChain() {
    let maxHeightBlock = this.maxHeightBlock();
    let longestChain = [maxHeightBlock];
    while (maxHeightBlock.previousHash) {
      maxHeightBlock = this.blocks.get(maxHeightBlock.previousHash);
      longestChain.push(maxHeightBlock);
    }
    return longestChain.reverse();
  }

  // 判断当前区块链是否包含
  containsBlock(block) {
    return this.blocks.has(block.hash);
  }

  // 获得区块高度最高的区块
  maxHeightBlock() {
    let maxHeight = -1;
    let maxHeightBlock = null;
    for (const block of this.blocks.values()) {
      if (block.index > maxHeight) {
        maxHeight = block.index;
        maxHeightBlock = block;
      }
    }
    return maxHeightBlock;
  }

  // 添加区块
  _addBlock(block) {
    if (!block.isValid()) return;
    if (this.containsBlock(block)) return;
    this.blocks.set(block.hash, block);
  }
}

export default Blockchain
