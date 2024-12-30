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

export type NODE_KEY_T = number;
export type NODE_VALUE_T = string;

export default class ListNodeFabric extends ListNode {
  #group: fabric.Group;

  x: number;
  y: number;

  constructor(
    key: NODE_KEY_T | null,
    value: NODE_VALUE_T | null = null,
    options: ListNodeFabricOptions
  ) {
    super(key, value);

    this.#group = new fabric.Group(undefined, {});
    this.x = options.x;
    this.y = options.y;

    this.#initialize();
  }

  #initialize() {
    const keyText = new fabric.FabricText(
      String(this.key == null ? "EDGE" : this.key),
      {
        left: this.x,
        top: this.y,
        fontFamily: "Arial",
        fill: this.key == null ? "#999" : "#000",
        fontSize: 20,
      }
    );

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

    if (this.value != null) {
      keyText.set("top", this.y - 5);
      const valueText = new fabric.FabricText(String(this.value), {
        left: this.x,
        top: this.y + 15,
        fontFamily: "Arial",
        fill: "#999",
        fontSize: 16,
      });
      this.#group.add(valueText);
    }

    this.#group.add(keyText);
  }

  group() {
    return this.#group;
  }
}

export function createFabricFromListNode(
  node: ListNode<NODE_KEY_T, NODE_VALUE_T>,
  options: ListNodeFabricOptions
) {
  const fabricNode = new ListNodeFabric(node.key, node.value, options);
  Object.assign(fabricNode, node);
  return fabricNode;
}
