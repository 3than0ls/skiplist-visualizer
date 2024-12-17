import ListNode from "./ListNode";

export function horizontalConnect<NodeT extends ListNode<unknown, unknown>>(
  left: NodeT,
  right: NodeT
) {
  //   if (left.right) {
  //     console.warn(
  //       `Attempting to connect ${left} (LEFT) with ${right} (RIGHT), but LEFT node already has a RIGHT neighbor that will be lost.`
  //     );
  //   }
  left.right = right;

  //   if (right.left) {
  //     console.warn(
  //       `Attempting to connect ${right} (RIGHT) with ${left} (LEFT), but RIGHT node already has a LEFT neighbor that will be lost.`
  //     );
  //   }
  right.left = left;
}

export function verticalConnect<NodeT extends ListNode<unknown, unknown>>(
  up: NodeT,
  down: NodeT
) {
  //   if (up.down) {
  //     console.warn(
  //       `Attempting to connect Node ${up} (UP) with Node ${down} (DOWN), but UP node already has a DOWN neighbor that will be lost.`
  //     );
  //   }
  up.down = down;

  //   if (down.up) {
  //     console.warn(
  //       `Attempting to connect Node ${down} (DOWN) with Node ${up} (UP), but DOWN node already has a UP neighbor that will be lost.`
  //     );
  //   }
  down.up = up;
}

export function horizontalInsert<NodeT extends ListNode<unknown, unknown>>(
  left: NodeT,
  right: NodeT,
  middle: NodeT
) {
  left.right = middle;
  middle.left = left;

  right.left = middle;
  middle.right = right;
}

export function isLeftBound<NodeT extends ListNode<unknown, unknown>>(
  node: NodeT
) {
  return node.key == null && node.left == null;
}

export function isRightBound<NodeT extends ListNode<unknown, unknown>>(
  node: NodeT
) {
  return node.key == null && node.right == null;
}

/**
 * Assists in the finding of the node with key equal to or right before the key parameter.
 *
 * A key is GTE a next node if
 *  (1) The node's right is NOT a right bound AND
 *  (2) The key is greater than or equal to the node's right's key.
 *
 * */
export function keyGTENextNode<NodeT extends ListNode<unknown, unknown>>(
  key: unknown,
  node: NodeT
) {
  if (node == null) {
    throw new Error("keyGTENextNode comparing to null node.");
  }
  if (node.right == null) {
    throw new Error("keyGTENextNode comparing to node's right, which is null.");
  }

  // if the next node is the right bond, the key will always be less than
  return !isRightBound(node.right!) && key! >= node.right!.key!;
}
export function isBottomLayer<NodeT extends ListNode<unknown, unknown>>(
  node: NodeT
) {
  return node.down == null;
}
