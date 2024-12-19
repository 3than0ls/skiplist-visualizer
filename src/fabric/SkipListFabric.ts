import ListNode from "@/skiplist/ListNode";
import SkipList from "@/skiplist/SkipList";
import * as fabric from "fabric";
import ListNodeFabric from "./ListNodeFabric";

type SkipListFabricOptions = {
  x: number;
  y: number;
};

export type SkipListDefaultType = SkipList<number, string>;

const SKIPLISTFABRIC_NODE_OFFSET = 150;

export default class SkipListFabric {
  #skipList: SkipListDefaultType;
  #group: fabric.Group;
  #options: SkipListFabricOptions;

  constructor(
    underlyingSkipList: SkipListDefaultType | undefined,
    options: SkipListFabricOptions
  ) {
    this.#skipList = underlyingSkipList ?? new SkipList<number, string>();
    this.#group = new fabric.Group(undefined, {
      top: options.x,
      left: options.y,
    });
    this.#options = options;

    this.#initialize();
  }

  #initialize() {
    this.#draw();
  }

  #drawNodeCol(node: ListNode | null, x: number, y: number) {
    if (node == null) {
      return;
    }

    const lnf = new ListNodeFabric(node, { x, y });
    this.#group.add(lnf.group());
    this.#drawNodeCol(node.up, x, y - SKIPLISTFABRIC_NODE_OFFSET);
    this.#drawNodeConnectionLine(x, y);
  }

  #drawNodeConnectionLine(
    x: number,
    y: number,
    orientation: "vertical" | "horizontal" = "horizontal"
  ) {
    const [x2, y2] =
      orientation == "horizontal"
        ? [x + SKIPLISTFABRIC_NODE_OFFSET, y]
        : [x, y + SKIPLISTFABRIC_NODE_OFFSET];

    const line = new fabric.Line([x, y, x2, y2], {
      stroke: "black",
      strokeWidth: 2,
    });

    this.#group.add(line);
  }

  #createMap(width: number, height: number): ListNodeFabric[][] {
    let out = [];
    for (let i = 0; i < height; i++) {
      out.push(new Array(width).fill(null));
    }

    let current = this.#skipList._bottomLeft();
    let row = 0;
    while (current != null) {
      let col = height - 1;
      let temp = current;
      while (temp != null) {
        console.log("col", col);
        out[col][row] = new ListNodeFabric(temp, {
          x: row * SKIPLISTFABRIC_NODE_OFFSET,
          y: col * SKIPLISTFABRIC_NODE_OFFSET,
        });
        col -= 1;
        temp = temp.up!;
      }
      row += 1;
      current = current.right!;
    }

    return out;
  }

  #drawMap(map: ListNodeFabric[][]) {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (!map[i][j]) continue;
        this.#group.add(map[i][j].group());
      }
    }
  }

  #drawConnectingLines(map: ListNodeFabric[][]) {
    // horizontal lines
    let rowNode: ListNodeFabric | undefined = undefined;
    for (let i = 0; i < map.length; i++) {
      rowNode = undefined;
      for (let j = 0; j < map[i].length; j++) {
        if (!rowNode) {
          rowNode = map[i][j];
        } else {
          if (map[i][j] == null) {
            continue;
          }
          this.#group.insertAt(
            0,
            new fabric.Line([rowNode.x, rowNode.y, map[i][j].x, map[i][j].y], {
              stroke: "black",
              strokeWidth: 2,
            })
          );
        }
      }
    }

    // vertical lines
    const base = map.length - 1;
    let baseColNode: ListNodeFabric | undefined = undefined;
    for (let i = 0; i < map[base].length; i++) {
      for (let j = 0; j < map.length; j++) {
        if (map[j][i] != null) {
          this.#group.insertAt(
            0,
            new fabric.Line(
              [map[base][i].x, map[base][i].y, map[j][i].x, map[j][i].y],
              {
                stroke: "black",
                strokeWidth: 2,
              }
            )
          );
          break;
        }
      }
    }
  }

  #draw() {
    /**
     * To represent the SkipList visually, we basically must strip away all advantages of the SkipList
     *
     * Every node must know it's relative position relative to the top-left head node (0, 0)
     * We'll change ListNodeFabric to be less dumb,
     *
     */

    const bottomLeft = this.#skipList._bottomLeft();
    const numNodes = this.#skipList.size() + 2; // add the two bounding nodes
    const height = Math.max(this.#skipList.height() + 1, 2) + 2;
    console.log(this.#skipList.height());

    console.log(numNodes, height);
    const map = this.#createMap(numNodes, height);
    this.#drawMap(map);
    this.#drawConnectingLines(map);
  }

  group() {
    return this.#group;
  }
}
