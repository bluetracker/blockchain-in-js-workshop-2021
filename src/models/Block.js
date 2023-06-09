import sha256 from 'crypto-js/sha256.js';
import MerkleTree from "./MerkleTree.js";
import UTXOPool from "./UTXOPool.js";
export const DIFFICULTY = 2;

class Block {
  // 构造函数
  constructor(blockchain, previousHash, height, data, miner) {
    this.previousHash = previousHash;// 上一个区块的哈希值
    this.blockchain = blockchain; // 区块链对象
    this.height = height;// 区块的高度
    this.merkleTree = new MerkleTree(data); // 创建一个默克尔树对象
    this.timestamp = Date.now() // 区块的时间戳
    this.nonce = 0 // 区块的随机数
    this.hash = this.calculateHash(miner);// 区块的哈希值
    this.utxoPool = new UTXOPool();// 区块的随机数
    this.utxoPool=new UTXOPool() // 创建一个新的UTXOPool对象，用于存储未花费的交易输出
    this.coinbaseBeneficiary = miner;//设置挖矿者的收益地址，用于接收区块奖励
    this.transactions = []; // 创建一个空的交易列表，用于存储和验证区块中的交易
  }
  // 根据区块的属性和随机数计算哈希值
  calculateHash(miner) {
    return sha256(
        this.previousHash +
        this.blockchain +
        this.height +
        this.merkleTree.getRoot() + // 使用默克尔树的根哈希来计算区块的哈希值
        miner+
        this.timestamp +
        this.nonce // 使用随机数来计算区块的哈希值
    ).toString();
  }

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
    // 比较前缀0的个数与难度值，如果小于难度值，就返回false
    if (num < DIFFICULTY) return false;

    // 遍历区块中的每个交易，检查它们是否有效，如果无效，就返回false
    for (let transaction of this.transactions) {
      if (!transaction.isValid()) return false;
    }

    // 如果以上条件都满足，就返回true
    return true;
  }

// setNonce(nonce) 是用来设置区块的 nonce 的函数
  setNonce(nonce) {
    this.nonce = nonce; // 更新随机数的值
    this.hash = this.calculateHash(this.coinbaseBeneficiary); // 重新计算区块的哈希值
  }
  _setHash() {
    this.hash = this.calculateHash(this.coinbaseBeneficiary);
  }
  combinedTransactionsHash() {
    this.merkleTree.buildTree(this.transactions); // 更新默克尔树
    return this.merkleTree.getRoot(); // 返回默克尔树的根哈希
  }

  // 添加交易到区块
  /**
   *
   * 需包含 UTXOPool 的更新与 hash 的更新
   */
  addTransaction(transaction) {
    //验证交易合法性
    if (this.utxoPool.isValidTransaction(transaction)) {
      //添加交易
      this.transactions.push(transaction);
      //更新 UTXOPool
      this.utxoPool.handleTransaction(transaction);
      //更新 默克尔树 和 hash
      this._setHash();
      this.combinedTransactionsHash();
    }
  }

}export default Block;
