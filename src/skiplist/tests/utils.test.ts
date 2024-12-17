import ListNode from "../ListNode";
import SkipList from "../SkipList";
import {
  horizontalConnect,
  horizontalInsert,
  isLeftBound,
  isRightBound,
  keyGTENextNode,
  verticalConnect,
} from "../utils";

test("horizontalConnect", () => {
  const left = new ListNode<number, number>(0, 0);
  const right = new ListNode<number, number>(1, 1);
  horizontalConnect(left, right);

  expect(left.right).toBe(right);
  expect(right.left).toBe(left);
});

test("verticalConnect", () => {
  const up = new ListNode<number, number>(0, 0);
  const down = new ListNode<number, number>(1, 1);
  verticalConnect(up, down);

  expect(up.down).toBe(down);
  expect(down.up).toBe(up);
});

test("horizontalInsert", () => {
  const left = new ListNode<number, number>(0, 0);
  const right = new ListNode<number, number>(2, 2);
  horizontalConnect(left, right);

  const middle = new ListNode<number, number>(2, 2);
  horizontalInsert(left, right, middle);

  expect(left.right).toBe(middle);
  expect(right.left).toBe(middle);
  expect(middle.left).toBe(left);
  expect(middle.right).toBe(right);
});

test("bounds", () => {
  const skipList = new SkipList();
  expect(isLeftBound(skipList._head));
  expect(isLeftBound(skipList._head.down!));
  expect(isRightBound(skipList._head.right!));
  expect(isRightBound(skipList._head.right!.down!));
});

test("keyGTENextNode", () => {
  const a = new ListNode<number, number>(0, 0);
  const b = new ListNode<number, number>(1, 1);
  const c = new ListNode<number, number>(2, 2);
  const d = new ListNode<number, number>(null, null);
  horizontalConnect(a, b);
  horizontalConnect(b, c);
  horizontalConnect(c, d);

  expect(keyGTENextNode(1, a));
  expect(keyGTENextNode(1, b)).toBeFalsy();
  expect(keyGTENextNode(1, c)).toBeFalsy();

  // should never happen, since next node of d is null
  //   expect(keyGTENextNode(1, d)).toBeFalsy();
});
