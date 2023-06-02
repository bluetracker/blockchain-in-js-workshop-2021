import sha256 from 'crypto-js/sha256.js';
import MerkleTree from "./MerkleTree.js";
import UTXO from "./UTXO.js";
import UTXOPool from "./UTXOPool.js";

export const DIFFICULTY = 2;

class Block {
  // 构造函数
  constructor(blockchain, previousHash, height, data, miner) {
    this.previousHash = previousHash;// 上一个区块的哈希值
    this.blockchain = blockchain; // 区块链对象
    this.height = height;// 区块的高度
    this.merkleTree = new MerkleTree(data);
    this.timestamp = Date.now() // 区块的时间戳
    this.nonce = 0 // 区块的随机数
    this.hash = this.calculateHash(miner);// 区块的哈希值
    this.utxoPool = new UTXOPool();// 区块的随机数
    this.utxoPool=new UTXOPool() // 创建一个新的UTXOPool对象，用于存储未花费的交易输出
    this.coinbaseBeneficiary = miner;//设置挖矿者的收益地址，用于接收区块奖励
  }
  // 根据区块的属性和随机数计算哈希值
  calculateHash(miner) {
    return sha256(
        this.previousHash +
        this.blockchain +
        this.height +
        this.merkleTree.getRoot() +
        miner+
        this.timestamp +
        this.nonce
    ).toString();
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
    this.hash = sha256(
        nonce +
        this.blockchain.name +
        this.previousHash +
        this.height +
        this.merkleTree.getRoot()
    ).toString();
  }
}

export default Block;
