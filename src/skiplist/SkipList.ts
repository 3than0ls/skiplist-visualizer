import { HeightFunction, boundedLogMaxCoin } from "./heightFunctions";
import ListNode from "./ListNode";
import {
  horizontalConnect,
  horizontalInsert,
  isBottomLayer,
  isLeftBound,
  keyGTENextNode,
  verticalConnect,
} from "./utils";

class SkipList<K, V = unknown> {
  // "top-left" of the skip list, where search and insertion begins
  _head: ListNode<K, V>; // I could use typescript's # private, but then testing would be harder
  _heightFunction: HeightFunction;

  length: number;
  height: number;

  constructor(heightFunction: HeightFunction = boundedLogMaxCoin()) {
    this.length = 0;
    this.height = 0;

    this._heightFunction = heightFunction;

    // head is top left, generate other bounds and connect
    const topLeft = new ListNode<K, V>(null);
    const topRight = new ListNode<K, V>(null);
    const bottomLeft = new ListNode<K, V>(null);
    const bottomRight = new ListNode<K, V>(null);
    horizontalConnect(topLeft, topRight);
    horizontalConnect(bottomLeft, bottomRight);
    verticalConnect(topLeft, bottomLeft);
    verticalConnect(topRight, bottomRight);

    this._head = topLeft;
  }

  /**
   * Finds the node that has the key of param `key`, or the node with the key right before param `key`.
   */
  _findNode(key: K) {
    let current = this._head;

    while (!isBottomLayer(current)) {
      while (keyGTENextNode(key, current)) {
        current = current.right!;
      }
      current = current.down!;
    }

    return current;
  }

  get(key: K) {
    const outNode = this._findNode(key);
    if (outNode.key == key) {
      // key is found! return the value, or if the value is null, return the key itself
      return outNode.value;
    } else {
      // key is not found and doesn't exist
      return undefined;
    }
  }

  set(key: K, value: V) {
    const searchNode = this._findNode(key);
    // key exists, just set value and stop there
    if (searchNode.key == key) {
      searchNode.value = value;
      return;
    }

    // key does not exist, insert it with value
    const insertNode = new ListNode<K, V>(key, value);
    horizontalInsert(searchNode, searchNode.right!, insertNode);

    // begin stacking nodes on top of just inserted node
    let current = insertNode;
    let prevNode = insertNode;
    for (
      let curHeight = 0;
      curHeight < this._heightFunction({ length, key });
      curHeight++
    ) {
      // if current height is equal to skip list height, create a new top lane
      if (curHeight == this.height) {
        const topLeft = new ListNode<K, V>(null);
        const topRight = new ListNode<K, V>(null);
        horizontalConnect(topLeft, topRight);
        verticalConnect(topLeft, this._head);
        verticalConnect(topRight, this._head.right!);
        this._head = topLeft;

        this.height++;
      }
      // search for node in layer above
      // first, backtrack (move left) until a node is found going upwards
      while (!isLeftBound(current) && current.up == null) {
        current = current.left!;
      }
      current = current.up!;
      // next, move right until you find the appropriate node to insert after
      while (keyGTENextNode(key, current)) {
        current = current.right!;
      }

      // finally, current is the node we want to insert after
      const heightNode = new ListNode<K, V>(key);
      horizontalInsert(current, current.right!, heightNode);
      verticalConnect(heightNode, prevNode);
      prevNode = heightNode;
    }

    this.length++;
  }

  delete(key: K) {
    const outNode = this._findNode(key);
    if (outNode.key != key) {
      return undefined;
    }

    let current = outNode;
    while (current != null) {
      horizontalConnect(current.left!, current.right!);
      current = current.up!;
    }

    this.length--;
    return outNode.value;
  }
}

export default SkipList;
