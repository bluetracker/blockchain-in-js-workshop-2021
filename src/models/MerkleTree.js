// 导入crypto模块
import crypto from 'crypto';
// 定义一个hash函数，用于计算sha256摘要
const hash = data => crypto.createHash('sha256').update(data).digest('hex');

// 定义一个MerkleTree类，用于构建和操作Merkle树
class MerkleTree {
    // 构造函数，接受一个叶子节点数组作为参数
    constructor(leaves) {
        this.leaves = leaves; // 存储叶子节点
        this.tree = [leaves]; // 存储整棵树的所有节点
        this.root = null; // 存储根节点
        this.buildTree(); // 调用buildTree方法构建树
    }

    // buildTree方法，用于从叶子节点开始逐层构建树
    buildTree() {
        let level = this.leaves; // 定义当前层为叶子节点层
        while (level.length > 1) { // 当当前层的节点数大于1时，继续循环
            let nextLevel = []; // 定义下一层的节点数组
            for (let i = 0; i < level.length; i += 2) { // 遍历当前层的每两个节点
                let left = level[i]; // 获取左节点
                let right = level[i + 1] || left; // 获取右节点，如果不存在则使用左节点
                let hashValue = hash(left + right); // 计算两个节点拼接后的hash值
                nextLevel.push(hashValue); // 将hash值作为下一层的一个节点推入数组
            }
            this.tree.push(nextLevel); // 将下一层的节点数组推入树中
            level = nextLevel; // 将当前层更新为下一层
        }
        this.root = level[0]; // 将最后一层的唯一节点作为根节点
    }
}

// 定义一个叶子节点数组，每个元素是一个字母的hash值
let leaves = ['a', 'b', 'c', 'd'].map(x => hash(x));
// 创建一个MerkleTree实例，传入叶子节点数组作为参数
let tree = new MerkleTree(leaves);
// 打印根节点的值
console.log(tree.root);
