class Block {
  constructor(index, timestamp, transactions, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return sha256(
        this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  isValid() {
    return (
        this.hash.substring(0, DIFFICULTY) === '0'.repeat(DIFFICULTY) &&
        this.transactions.every((transaction) => this.isValidTransaction(transaction))
    );
  }

  setNonce(nonce) {
    this.nonce = nonce;
    this._setHash();
  }

  _setHash() {
    this.hash = this.calculateHash();
  }

  combinedTransactionsHash() {
    return sha256(JSON.stringify(this.transactions)).toString();
  }

  addTransaction(transaction) {
    if (this.isValidTransaction(transaction)) {
      this.transactions.push(transaction);
      this._setHash();
      return true;
    }
    return false;
  }

  isValidTransaction(transaction) {
    // 添加签名校验逻辑
    // 这里需要根据您的具体实现来添加逻辑
    return true;
  }
}

export default Block
