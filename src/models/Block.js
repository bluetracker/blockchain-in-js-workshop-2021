"use strict";

import crypto from "webcrypto";

export const DIFFICULTY = 2;

class Block {
  transactions = [];
  constructor(previousHash, height, data, miner) {
    this.previousHash = previousHash;
    this.height = height;
    this.merkleTree = new MerkleTree(data);
    this.hash = this.calculateHash(miner);
    this.coinbaseBeneficiary = miner;
    this.utxoPool = new UTXOPool();

  }

  async calculateHash(miner) {
    // 使用 crypto.subtle.digest 来计算哈希
    const buffer = new TextEncoder().encode(
        this.previousHash +
        this.height +
        this.merkleTree.getRoot() +
        miner
    );
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    return Buffer.from(hashBuffer).toString("hex");
  }
  isValid() {
    // 统计哈希值前缀0的个数
    let num = 0;
    // 使用递增运算符
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
  async setNonce(nonce) {
    // 使用 crypto.subtle.digest 来计算哈希
    const buffer = new TextEncoder().encode(
        nonce +
        this.previousHash +
        this.height +
        this.merkleTree.getRoot()
    );
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    this.hash = Buffer.from(hashBuffer).toString("hex");
  }
  // 根据交易变化更新区块 hash
  async _setHash() {
    this.hash = await this.calculateHash(this.coinbaseBeneficiary);
  }
  // 汇总计算交易的 Hash 值
  /**
   * 默克尔树实现
   */
  combinedTransactionsHash() {
    this.merkleTree.buildTree(this.transactions);
    return this.merkleTree.getRoot();
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
    }
    //更新 hash
    this._setHash();
  }
  async isValidTransaction(transaction) {

    let trxHash = transaction._calculateHash();
    // 使用 crypto.subtle.verify 来验证签名
    const publicKey = await crypto.subtle.importKey(
        "jwk",
        this.from,
        {name: "ECDSA", namedCurve: "P-256"},
        true,
        ["verify"]
    );
    const signatureBuffer = Buffer.from(this.signature, "hex");
    const hashBuffer = Buffer.from(this.hash, "hex");
    return await crypto.subtle.verify(
        {name: "ECDSA", hash: "SHA-256"},
        publicKey,
        signatureBuffer,
        hashBuffer
    );
  }
}
export default Block;
