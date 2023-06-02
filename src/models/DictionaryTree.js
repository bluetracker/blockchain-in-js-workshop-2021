class DictionaryTree{
    constructor(){
        this.root = 0
        this.nodes = {
            [this.root]: {}
            // 创建一个字典树对象

        }
    }
    // 插⼊⼀个单词
    insert(word){
        // 从根节点开始
        let currentNode = this.root
        // 遍历单词的每个字符
        for(let i = 0; i < word.length; i++){
            let currentChar = word[i]
            // 如果当前节点没有这个字符，就添加⼀个节点
            if(!this.nodes[currentNode][currentChar]){
                this.nodes[currentNode][currentChar] = Object.keys(this.nodes).length
                this.nodes[this.nodes[currentNode][currentChar]] = {}
            }
            // 继续遍历下⼀个节点
            currentNode = this.nodes[currentNode][currentChar]
        }
        // 在最后⼀个节点添加结束标记
        this.nodes[currentNode]['-1'] = true
    }
    // 查找⼀个单词
    search(word){
        let currentNode = this.root
        // 遍历单词的每个字符
        for(let i = 0; i < word.length; i++){
            let currentChar = word[i]
            // 如果当前节点没有这个字符，就返回false
            if(!this.nodes[currentNode][currentChar]){
                return false
            }
            // 继续遍历下⼀个节点
            currentNode = this.nodes[currentNode][currentChar]
        }
        return this.nodes[currentNode]['-1']
    }
    // 查找前缀
    startsWith(prefix){
        let currentNode = this.root
        // 遍历前缀的每个字符
        for(let i = 0; i < prefix.length; i++){
            // 如果当前节点没有这个字符，就返回false
            let currentChar = prefix[i]
            if(!this.nodes[currentNode][currentChar]){
                return false
            }
            // 继续遍历下⼀个节点
            currentNode = this.nodes[currentNode][currentChar]
        }
        return true
    }


}
let dict = new DictionaryTree();
// 插入一些单词
dict.insert("apple");
dict.insert("app");
dict.insert("banana");
dict.insert("cat");
// 测试查找单词的方法
console.log(dict.search("apple")); // true
console.log(dict.search("app")); // true
console.log(dict.search("ape")); // false
console.log(dict.search("cat")); // true
console.log(dict.search("dog")); // false
// 测试查找前缀的方法
console.log(dict.startsWith("a")); // true
console.log(dict.startsWith("ap")); // true
console.log(dict.startsWith("b")); // true
console.log(dict.startsWith("c")); // true
console.log(dict.startsWith("d")); // false