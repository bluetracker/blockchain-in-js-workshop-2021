"use strict";

import crypto from "webcrypto";

class Transaction {
  constructor(from, to, amount, signature) {
    this.from = from // 发送方
    this.to = to // 接收方
    this.amount = amount // 金额
    this.signature = signature // 签名
    this.hash = this._calculateHash() // 交易哈希
  }


  // 计算交易哈希的摘要函数
  async _calculateHash() {
    // 使用 crypto.subtle.digest 来计算哈希
    const buffer = new TextEncoder().encode(this.from + this.to + this.amount);
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    return Buffer.from(hashBuffer).toString("hex");
  }

  // 更新交易哈希
  async _setHash() {
    this.hash = await this._calculateHash()
  }
  async hasValidSignature() {

    // 交易没有签名的情况
    if (!this.signature) {
      return false
    }
    // 交易有签名的情况
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

export default Transaction


