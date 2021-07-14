function Node(data, left, right) {
  this.data = data
  this.left = left
  this.right = right
  this.show = show
}

function show() {
  return this.data
}

function BST() {
  this.root = null
  this.insert = insert
  this.preOrder = preOrder
  this.inOrder = inOrder
  this.postOrder = postOrder
  this.find = find
  this.deleteNode = deleteNode
  this.BFS = BFS
  this.BFS_MaxWidth_withMap = BFS_MaxWidth_withMap
  this.BFS_MaxWidth = BFS_MaxWidth
}

// 插入节点
function insert(data) {
  var n = new Node(data, null, null)
  if(this.root == null) {
    this.root = n
    return
  }

  var node = this.root
  while(node) {
    if(data > node.data) {
      if(node.right == null) {
        node.right = n
        return
      }
      node = node.right
    }else{
      if(data < node.data) {
        if(node.left == null) {
          node.left = n
          return
        }
        node = node.left
      }
    } 
  }
}


// 先序遍历
function preOrder(node) {
  if(node) {
    console.log(node.data)
    preOrder(node.left)
    preOrder(node.right)
  }
}

// 中序遍历
function inOrder(node) {
  if(node) {
    inOrder(node.left)
    console.log(node.data)
    inOrder(node.right)
  }
}

// 后序遍历
function postOrder(node) {
  if(node) {
    postOrder(node.left)
    postOrder(node.right)
    console.log(node.data)
  }
}

var tree = new BST()
tree.insert(23)
tree.insert(45)
tree.insert(16)
tree.insert(37)
tree.insert(3)
tree.insert(99)
tree.insert(22)
tree.insert(1)
tree.insert(77)
// console.log(tree);

// 查找给定值
function find(data) {
  var n = this.root
  while(data !== n.data) {
    if(data > n.data) {
      n = n.right
    }else{
      n = n.left
    }
  }
  return n
}

var findNode = tree.find(99)
// console.log(findNode)

// 未完成 二叉树删除节点
function deleteNode (data) {
  var node = this.root
  var parentNode
  while(node !== null && node.data !== data) {
    parentNode = node
    if(data > node.data) {
      node = node.right
    }else{
      node = node.left
    }
  }
  console.log('@@@',node);
  // 我们采用非递归的方式，先处理要删除的节点有两个子节点的情况
  if (node.left !== null && node.right !== null) {
    // 查找右子树中最小节点
    let minNodeParent = node;
    let minNode = minNodeParent.right;
    while (minNodeParent.left !== null) {
      minNodeParent = minNode;
      minNode = minNode.left;
    }
    node.data = minNode.data;
    node = minNode; // 下面就变成删除 minNode 了
    parentNode = minNodeParent;
  }

  // 删除节点是叶子节点或者只有一个子节点
  let childNode = null;
  if (node.left !== null) {
    childNode = node.left;
  } else if (node.right !== null) {
    childNode = node.right;
  }

  if (parentNode === null) { // 父节点是 null，说明删除的是根节点
    this.tree = childNode;
  // 第二种情况，把父节点的指向删除节点的指针指向删除节点的子节点
  // 删除的是 node，把 parentNode 指向 node 的指针，指向 childNode
  } else if (parentNode.left === node) {
    parentNode.left = childNode;
  } else {
    parentNode.right = childNode;
  }
}

// BFS 层序遍历
function BFS() {
  let ROOT = this.root
  let queue = [ROOT]
  let res = []
  while(queue.length) {
    let node = queue.shift()
    res.push(node.data)
    if(node.left) queue.push(node.left)
    if(node.right) queue.push(node.right)
  }
  return res
}

// console.log(tree.BFS());

// BFS1 最大宽度
function BFS_MaxWidth_withMap() {
  let ROOT = this.root
  let queue = [ROOT]
  let curLevel = 1
  let curLevelNodes = 0
  let max = 0
  let map = new Map()
  map.set(ROOT, 1)
  while(queue.length) {
    let curNode = queue.shift()
    let curNodeLevel = map.get(curNode)

    if(curNode.left) {
      map.set(curNode.left, curNodeLevel+1)
      queue.push(curNode.left)
    }
    if(curNode.right) {
      map.set(curNode.right, curNodeLevel+1)
      queue.push(curNode.right)
    }

    if(curNodeLevel === curLevel) {
      curLevelNodes++
    }else{
      max = Math.max(max, curLevelNodes)
      curLevel++
      curLevelNodes = 1
    }
  }
  max = Math.max(max, curLevelNodes)
  console.log(map);
  return max
}
// console.log(tree.BFS_MaxWidth_withMap())

function BFS_MaxWidth() {
  let ROOT = this.root
  let queue = [ROOT]
  let curEnd = ROOT //当前层最右节点
  let nextEnd = null // 下一层最右节点
  let curLevelNodes = 0 // 当前层节点数
  let max = 0
  while(queue.length) {
    let curNode = queue.shift()
    if(curNode.left) {
      queue.push(curNode.left)
      nextEnd = curNode.left
    }
    if(curNode.right) {
      queue.push(curNode.right)
      nextEnd = curNode.right
    }

    curLevelNodes++
    if(curNode === curEnd) {
      max = Math.max(max, curLevelNodes)
      // 当前层结束 开始初始化下一层
      // 下一层即将变成当前层 初始化参数
      curLevelNodes = 0
      curEnd = nextEnd
    }
  }
  return max
}
// console.log(tree.BFS_MaxWidth())
/*
【重点 ： 求二叉树的最大宽度】
1.使用一个map辅助
2.求每层的最后一个节点
3.参考剑指offer-32
*/


// 二叉树的序列化与反序列化
var tree1 = new BST()
tree1.insert(23)
tree1.insert(45)
tree1.insert(16)
tree1.insert(37)
tree1.insert(22)
console.log(tree1.root);

// 先序方式
function pre_Serialization(){
  var Root = tree1.root
  var queue = []
  pres(Root, queue)
  return queue
}

function pres(head, queue) {
  if(head == null) {
    queue.push(null)
  }else{
    queue.push(head.data)
    pres(head.left, queue)
    pres(head.right, queue)
  }
}
var preRes = pre_Serialization()
console.log(preRes)

// 先序反序列化

function build_tree() {
  var psRes = preRes
  if(psRes.length === 0) {
    return null
  }
  return preb(psRes)
}

function preb(psRes) {
  let data = psRes.shift()
  if(data == null) {
    return null
  }
  let head = new Node(data, null, null)
  head.left = preb(psRes)
  head.right = preb(psRes)
  return head
}

const prebRes = build_tree()
console.log(prebRes)
