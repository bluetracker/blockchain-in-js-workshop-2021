const keccak256 = require('keccak256');

class MPT {
    constructor() {
        this.root = {};
    }
b
    // 添加或更新账户地址和余额信息
    put(address, balance) {
        const hexAddress = address.slice(2); // 去掉0x前缀
        const key = Buffer.from(hexAddress, 'hex');
        const value = Buffer.from(balance.toString(16), 'hex');
        this.root = insert(this.root, key, value);
    }

    // 根据地址验证余额信息
    verify(address, balance) {
        const hexAddress = address.slice(2); // 去掉0x前缀
        const key = Buffer.from(hexAddress, 'hex');
        const value = Buffer.from(balance.toString(16), 'hex');
        return verify(this.root, key, value);
    }
}

// 插入新的地址和余额信息
function insert(node, key, value) {
    const nibbles = keyToNibbles(key);
    if (nibbles.length === 0) {
        return value;
    }
    const [head, ...tail] = nibbles;

    if (node === null) {
        node = {};
    }

    if (typeof(node) === 'object' && !Array.isArray(node)) {
        node[head] = insert(node[head], tail, value);
        return node;
    }

    if (Array.isArray(node)) {
        node[head] = insert(node[head], tail, value);
        return node;
    }

    const newNode = {};
    newNode[head] = insert(null, tail, value);
    newNode[node] = node;
    return newNode;
}

// 验证给定地址的余额信息是否正确
function verify(node, key, value) {
    const nibbles = keyToNibbles(key);
    if (nibbles.length === 0) {
        return node.equals(value);
    }
    const [head, ...tail] = nibbles;

    if (node === null) {
        return false;
    }

    if (typeof(node) === 'object' && !Array.isArray(node)) {
        return verify(node[head], tail, value);
    }

    if (Array.isArray(node)) {
        return verify(node[head], tail, value);
    }

    return false;
}

// 将一个地址转换成nibbles数组
function keyToNibbles(key) {
    const hexKey = key.toString('hex');
    const nibbles = [];
    for (let i = 0; i < hexKey.length; i += 2) {
        nibbles.push(parseInt(hexKey[i] + hexKey[i + 1], 16));
    }
    return nibbles;
}