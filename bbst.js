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
        // replace value and then delete leaf
        parent[`${side}`].data = node[`${tempSide}`].data;
        parent[`${side}`][`${tempSide}`] = null;
        return;
      }
    }

    if (x < node.data) {
      // recursive cases
      this.delete(x, node.left, parent, side);
    } else {
      this.delete(x, node.right, parent, side);
    }
  }
}

draculaArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let draculaTree = new Tree(draculaArray);
prettyPrint(draculaTree.root);
draculaTree.delete(324);
prettyPrint(draculaTree.root);
