class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    constructor(array) {
      let sortedArray = [...new Set(array)].sort((a, b) => a - b);
      this.root = this.buildTree(sortedArray);
    }
  
    buildTree(array, start = 0, end = array.length - 1) {
      if (start > end) return null;
  
      let mid = Math.floor((start + end) / 2);
      let root = new Node(array[mid]);
  
      root.left = this.buildTree(array, start, mid - 1);
      root.right = this.buildTree(array, mid + 1, end);
  
      return root;
    }
  
    insert(value) {
      this.root = this.insertNode(this.root, value);
    }
  
    insertNode(root, value) {
      if (root === null) return new Node(value);
  
      if (value < root.data) {
        root.left = this.insertNode(root.left, value);
      } else if (value > root.data) {
        root.right = this.insertNode(root.right, value);
      }
  
      return root;
    }
  
    deleteItem(value) {
      this.root = this.deleteNode(this.root, value);
    }
  
    deleteNode(root, value) {
      if (root === null) return root;
  
      if (value < root.data) {
        root.left = this.deleteNode(root.left, value);
      } else if (value > root.data) {
        root.right = this.deleteNode(root.right, value);
      } else {
        if (root.left === null) return root.right;
        if (root.right === null) return root.left;
  
        let succ = this.getSuccessor(root);
        root.data = succ.data;
        root.right = this.deleteNode(root.right, succ.data);
      }
      return root;
    }
  
    getSuccessor(curr) {
      curr = curr.right;
      while (curr !== null && curr.left !== null) {
        curr = curr.left;
      }
      return curr;
    }
  
    find(value) {
      return this.findNode(this.root, value);
    }
  
    findNode(root, value) {
      if (root === null) return null;
  
      if (root.data === value) return root;
  
      return value < root.data
        ? this.findNode(root.left, value)
        : this.findNode(root.right, value);
    }
  
    levelOrder(callback) {
      if (!callback) throw new Error("Callback function is required");
  
      if (!this.root) return;
  
      let queue = [this.root];
  
      while (queue.length > 0) {
        let node = queue.shift();
        callback(node);
  
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
      }
    }
   
    inOrder(callback) {
      if(!callback) throw new Error("Callback function is required")
      
      const traverse = node => {
        if(node === null) return
        traverse(node.left)
        callback(node)
        traverse(node.right)
      }
      traverse(this.root) 
    }
    
    preOrder(callback) {
      if(!callback) throw new Error("Callback function is required")
      
      const traverse = node => {
        if(node === null) return
        callback(node)
        traverse(node.left)
        traverse(node.right)
      }
      traverse(this.root)
    }
    
    postOrder(callback){
      if(!callback) throw new Error("Callback function is required")
      
      const traverse = node => {
        if(node === null) return
        traverse(node.left)
        traverse(node.right)
        callback(node)
      }
      traverse(this.root)
    }
    
   height(node) {
     
   if(node === null) return -1
    let leftHeight = this.height(node.left)
    let rightHeight = this.height(node.right)
    
    return 1 + Math.max(leftHeight, rightHeight)
   } 
    
    depth(node, root = this.root, level = 0) {
    if (root === null) return -1;
    if (root === node) return level;
  
    let leftDepth = this.depth(node, root.left, level + 1);
    if (leftDepth !== -1) return leftDepth;
  
    return this.depth(node, root.right, level + 1);
  }
  
    
    
  isBalanced(root = this.root) {
    if (root === null) return true;
    
    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);
    
    if (Math.abs(leftHeight - rightHeight) > 1) return false;
    
    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }
  
   
  rebalance() {
    let sortedArray = [];
    this.inOrder(node => sortedArray.push(node.data));
    this.root = this.buildTree(sortedArray);
  }
  
  }
   
    
  function getRandomArray(size) {
    let array = new Set();
    while (array.size < size) {
      array.add(Math.floor(Math.random() * 100)); 
    }
    return Array.from(array);
  }
  
  let randomNumbers = getRandomArray(10);
  let tree = new Tree(randomNumbers);
  console.log("Tree created with these numbers:", randomNumbers);
  
  console.log("Is tree balanced?", tree.isBalanced(tree.root));
  
  console.log("Level Order:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("Pre Order:");
  tree.preOrder(node => console.log(node.data));
  
  tree.insert(120);
  tree.insert(150);
  tree.insert(180);
  tree.insert(200);
  console.log("Inserted numbers > 100 to unbalance the tree.");
  
  console.log("Is tree balanced after inserting large numbers?", tree.isBalanced(tree.root));
  
  tree.rebalance();
  console.log("Tree has been rebalanced.");
  
  console.log("Is tree balanced after rebalancing?", tree.isBalanced(tree.root));  