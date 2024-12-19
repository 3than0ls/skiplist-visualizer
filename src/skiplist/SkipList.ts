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
  #head: ListNode<K, V>; // I could use typescript's # private, but then testing would be harder
  protected bottom_left: ListNode<K, V>;
  #heightFunction: HeightFunction;
  #_size: number;
  #_height: number;

  constructor(heightFunction: HeightFunction = boundedLogMaxCoin()) {
    this.#_size = 0;
    this.#_height = 0;

    this.#heightFunction = heightFunction;

    // head is top left, generate other bounds and connect
    const topLeft = new ListNode<K, V>(null);
    const topRight = new ListNode<K, V>(null);
    const bottomLeft = new ListNode<K, V>(null);
    const bottomRight = new ListNode<K, V>(null);
    horizontalConnect(topLeft, topRight);
    horizontalConnect(bottomLeft, bottomRight);
    verticalConnect(topLeft, bottomLeft);
    verticalConnect(topRight, bottomRight);

    this.#head = topLeft;
    this.bottom_left = bottomLeft;
  }

  /**
   * Finds the node that has the key of param `key`, or the node with the key right before param `key`.
   */
  #findNode(key: K) {
    let current = this.#head;

    while (!isBottomLayer(current)) {
      while (keyGTENextNode(key, current)) {
        current = current.right!;
      }
      current = current.down!;
    }

    return current;
  }

  #createNewLayer() {
    const topLeft = new ListNode<K, V>(null);
    const topRight = new ListNode<K, V>(null);
    horizontalConnect(topLeft, topRight);
    verticalConnect(topLeft, this.#head);
    verticalConnect(topRight, this.#head.right!);
    this.#head = topLeft;

    this.#_height++;
  }

  #insertNodeInLayerAbove(key: K, current: ListNode<K, V>) {
    // first, backtrack (move left) until a node is found going upwards
    while (!isLeftBound(current) && current.up == null) {
      current = current.left!;
    }
    current = current.up!;
    // next, move right until you find the appropriate node to insert after
    while (keyGTENextNode(key, current)) {
      current = current.right!;
    }
    return current;
  }

  get(key: K) {
    const outNode = this.#findNode(key);
    if (outNode.key == key) {
      // key is found! return the value, or if the value is null, return the key itself
      return outNode.value;
    } else {
      // key is not found and doesn't exist
      return undefined;
    }
  }

  set(key: K, value: V) {
    const searchNode = this.#findNode(key);
    // key exists, just set value and stop there
    if (searchNode.key == key) {
      searchNode.value = value;
      return;
    }

    // key does not exist, insert it with value
    const bottomNode = new ListNode<K, V>(key, value);
    horizontalInsert(searchNode, searchNode.right!, bottomNode);

    // begin stacking nodes on top of just inserted node
    let current = bottomNode;
    for (
      let curHeight = 0;
      curHeight < this.#heightFunction({ length, key });
      curHeight++
    ) {
      // if current height is equal to skip list height, create a new top lane
      if (curHeight == this.#_height) {
        this.#createNewLayer();
      }

      const insertAfter = this.#insertNodeInLayerAbove(key, current);
      const newNode = new ListNode<K, V>(key);
      horizontalInsert(insertAfter, insertAfter.right!, newNode);
      verticalConnect(newNode, current);
      current = newNode;
    }

    this.#_size++;
  }

  delete(key: K) {
    const outNode = this.#findNode(key);
    if (outNode.key != key) {
      return;
    }

    let current = outNode;
    while (current != null) {
      horizontalConnect(current.left!, current.right!);
      current = current.up!;
    }

    this.#_size--;
  }

  size() {
    return this.#_size;
  }

  height() {
    return this.#_height;
  }

  _head() {
    return this.#head;
  }
}

export default SkipList;
