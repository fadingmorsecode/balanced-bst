// function provided by TOP to visualize binary search tree;
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = this.sortData(array);
    this.root = null;
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }

  compareCallback(a, b) {
    return a - b;
  }

  sortData(data) {
    let filtered = data.reduce((acc, current) => {
      if (!acc.includes(current)) {
        acc.push(current);
      }
      return acc;
    }, []);
    return filtered.sort(this.compareCallback);
  }

  buildTree(data, start, end) {
    // base case
    if (start > end) {
      return null;
    }
    // set middle element as root
    let mid = parseInt((start + end) / 2);
    let node = new Node(data[mid]);
    // construct the left subtree and make it left child of root using recursion
    node.left = this.buildTree(data, start, mid - 1);
    // construct the right subtree and make it right child of root using recursion
    node.right = this.buildTree(data, mid + 1, end);
    return node;
  }

  insert(x, node = this.root) {
    // base cases
    if (x < node.data && node.left === null) {
      node.left = new Node(x);
      return;
    } else if (x > node.data && node.right === null) {
      node.right = new Node(x);
      return;
    }

    // recursive cases
    if (x < node.data) {
      this.insert(x, node.left);
    } else {
      this.insert(x, node.right);
    }
  }

  delete(x, node = this.root, parent = null, side = null) {
    // determine parent and side of parent w/ child
    if (node.left) {
      if (node.left.data === x) {
        parent = node;
        side = 'left';
      }
    }
    if (node.right) {
      if (node.right.data === x) {
        parent = node;
        side = 'right';
      }
    }
    // base case
    if (x === node.data) {
      // case one: node has no children
      if (!node.left && !node.right) {
        parent[`${side}`] = null;
        return;
      }
      // case two: node has one child
      if ((!node.left && node.right) || (!node.right && node.left)) {
        let tempSide;
        if (node.left) {
          tempSide = 'left';
        } else if (node.right) {
          tempSide = 'right';
        }
        parent[`${side}`] = node[`${tempSide}`];
        return;
      }
      // case three: node has two children
      // find the value that is next biggest to node
      // look to the right subtree of the node
      // follow paths all the way to the left, until a node left subtree is empty
      let traversalNode = node.right;
      let traversalParent;
      while (traversalNode.left !== null) {
        traversalParent = traversalNode;
        traversalNode = traversalNode.left;
      }
      // replace node with inorder successor (io) and link io child to parent
      node.data = traversalNode.data;
      traversalParent.left = traversalNode.right;
      return;
    }
    // recursive cases
    if (x < node.data) {
      this.delete(x, node.left, parent, side);
    } else {
      this.delete(x, node.right, parent, side);
    }
  }

  find(x, node = this.root) {
    if (x === node.data) {
      return node;
    } else if (node.left === null && node.right === null) {
      return null;
    }

    // recursive cases
    if (x < node.data) {
      return this.find(x, node.left);
    } else {
      return this.find(x, node.right);
    }
  }

  // level order should return an array of values
  // enqueue the parent node, then print, enqueue any children and then dequeue.
  levelOrder(node = this.root, queue = [], result = []) {
    if (node === null) {
      return;
    }
    queue.push(node);
    while (queue.length !== 0) {
      let front = queue[0];
      result.push(front.data);
      if (front.left) {
        queue.push(front.left);
      }
      if (front.right) {
        queue.push(front.right);
      }
      queue.shift();
    }
    return result;
  }

  levelOrderRecursive(node = this.root, queue = [], result = []) {
    // base case
    if (node === null) {
      return result;
    }
    result.push(node.data);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
    if (queue.length !== 0) {
      this.levelOrderRecursive(queue.shift(), queue, result);
    }

    return result;
  }

  inOrder(node = this.root, result = []) {
    if (node === null) {
      return;
    }
    this.inOrder(node.left, result);
    result.push(node.data);
    this.inOrder(node.right, result);
    return result;
  }

  preOrder(node = this.root, result = []) {
    if (node === null) {
      return;
    }
    result.push(node.data);
    this.preOrder(node.left, result);
    this.preOrder(node.right, result);
    return result;
  }

  postOrder(node = this.root, result = []) {
    if (node === null) {
      return;
    }
    this.postOrder(node.left, result);
    this.postOrder(node.right, result);
    result.push(node.data);
    return result;
  }
}

draculaArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let draculaTree = new Tree(draculaArray);
prettyPrint(draculaTree.root);
draculaTree.delete(8);
prettyPrint(draculaTree.root);
console.log(draculaTree.find(10));
console.log(draculaTree.levelOrder());
console.log(draculaTree.levelOrderRecursive());
console.log(draculaTree.inOrder());
console.log(draculaTree.preOrder());
console.log(draculaTree.postOrder());
