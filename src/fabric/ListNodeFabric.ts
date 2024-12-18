import ListNode from "@/skiplist/ListNode";
import * as fabric from "fabric";

// fabric.js is poorly documented and just not fun to use... but I'm using it anyway
// I saw some way that you can just extend fabric.Object and then you're able to do
// canvas.add(new FabricNode(...)), but I ain't gonna do allat

type ListNodeFabricOptions = {
  x: number;
  y: number;
};

const LISTNODEFABRIC_SIZE = 100;

export default class ListNodeFabric {
  #node: ListNode;
  #group: fabric.Group;

  left: ListNodeFabric | null = null;
  up: ListNodeFabric | null = null;
  x: number;
  y: number;

  constructor(
    underlyingNode: ListNode | undefined,
    options: ListNodeFabricOptions
  ) {
    this.#node = underlyingNode ?? new ListNode<string, string>("NULL", "NULL");
    this.#group = new fabric.Group(undefined, {});
    this.x = options.x;
    this.y = options.y;

    this.#initialize();
  }

  setLeft(left: ListNodeFabric) {
    this.left = left;
  }

  setUp(up: ListNodeFabric) {
    this.up = up;
  }

  #initialize() {
    const text = new fabric.FabricText(String(this.#node.key), {
      left: this.x,
      top: this.y,
      fontFamily: "Arial",
      fill: "#000",
      fontSize: 20,
    });

    const node = new fabric.Rect({
      left: this.x,
      top: this.y,
      width: LISTNODEFABRIC_SIZE,
      height: LISTNODEFABRIC_SIZE,
      fill: "#fff",
      rx: 10,
      strokeWidth: 4,
      stroke: "gray",
    });

    this.#group.add(node);
    this.#group.add(text);
  }

  underlyingNode() {
    return this.#node;
  }

  group() {
    return this.#group;
  }

  toString() {
    return this.#node.toString();
  }
}
