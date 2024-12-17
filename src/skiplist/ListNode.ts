class ListNode<K = unknown, V = unknown> {
  key: K | null;
  value: V | null;

  right: ListNode<K, V> | null;
  down: ListNode<K, V> | null;
  up: ListNode<K, V> | null;
  left: ListNode<K, V> | null;

  // need to clarify the difference between undefined and null, or just use one
  constructor(key: K | null, value: V | null = null) {
    this.key = key;
    this.value = value;

    // for standard search and insertion purposes, required
    this.right = null;
    this.down = null;

    // for optimize insertion purposes, not necessary
    this.left = null;
    this.up = null;
  }

  toString() {
    return `Node ${this.key}: ${this.value}`;
  }
}

export default ListNode;
