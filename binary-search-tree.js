class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        // Duplicate values are not allowed
        return undefined;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val, node = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val === node.val) return undefined;
    if (val < node.val) {
      if (!node.left) {
        node.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, node.left);
    } else {
      if (!node.right) {
        node.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, node.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val, node = this.root) {
    if (!node) return undefined;
    if (val === node.val) return node;
    if (val < node.val) return this.findRecursively(val, node.left);
    if (val > node.val) return this.findRecursively(val, node.right);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder() {
    const result = [];
    function traverse(node) {
      result.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    const result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      result.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    const result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  bfs() {
    const queue = [this.root];
    const result = [];
    while (queue.length) {
      const currentNode = queue.shift();
      result.push(currentNode.val);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val) {
    this.root = this._removeNode(this.root, val);
  }

  _removeNode(node, val) {
    if (!node) return null;
    if (val < node.val) {
      node.left = this._removeNode(node.left, val);
      return node;
    } else if (val > node.val) {
      node.right = this._removeNode(node.right, val);
      return node;
    } else {
      // Found the node to remove
      if (!node.left && !node.right) {
        // Case 1: Node has no children
        return null;
      }
      if (!node.left) {
        // Case 2: Node has no left child
        return node.right;
      }
      if (!node.right) {
        // Case 3: Node has no right child
        return node.left;
      }
      // Case 4: Node has two children
      const tempNode = this._findMinNode(node.right);
      node.val = tempNode.val;
      node.right = this._removeNode(node.right, tempNode.val);
      return node;
    }
  }

  _findMinNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    return this._checkHeight(this.root) !== -1;
  }

  _checkHeight(node) {
    if (!node) return 0;

    const leftHeight = this._checkHeight(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = this._checkHeight(node.right);
    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;
    let parentNode = null;
    let currentNode = this.root;
    while (currentNode.right) {
      parentNode = currentNode;
      currentNode = currentNode.right;
    }
    if (!currentNode.left && parentNode) {
      return parentNode.val;
    }
    if (!currentNode.right) {
      return currentNode.left.val;
    }
    return currentNode.val;
  }
}

module.exports = BinarySearchTree;
