import SkipList from "@/skiplist/SkipList";
import * as fabric from "fabric";
import ListNodeFabric, {
  createFabricFromListNode,
  NODE_KEY_T,
  NODE_VALUE_T,
} from "./ListNodeFabric";
import { HeightFunction } from "@/skiplist/heightFunctions";

type SkipListFabricOptions = {
  x: number;
  y: number;
};

export type SkipListDefaultType = SkipList<number, string>;

const SKIPLISTFABRIC_NODE_OFFSET = 150;

export default class SkipListFabric extends SkipList<NODE_KEY_T, NODE_VALUE_T> {
  #group: fabric.Group;
  #options: SkipListFabricOptions;

  constructor(heightFunction: HeightFunction, options: SkipListFabricOptions) {
    super(heightFunction);

    this.#group = new fabric.Group(undefined, {
      top: options.x,
      left: options.y,
      selectable: false,
      evented: false,
    });
    this.#options = options;

    this.#initialize();
  }

  #initialize() {
    this.#draw();
  }

  #createMap(width: number, height: number): ListNodeFabric[][] {
    const out: ListNodeFabric[][] = [];
    for (let i = 0; i < height; i++) {
      out.push(new Array(width).fill(null));
    }

    let current = this.bottom_left;
    let row = 0;
    while (current != null) {
      let col = height - 1;
      let temp = current;
      while (temp != null) {
        out[col][row] = createFabricFromListNode(temp, {
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
    this.#group.removeAll();

    /**
     * To represent the SkipList visually, we basically must strip away all advantages of the SkipList
     *
     * Every node must know it's relative position relative to the top-left head node (0, 0)
     * We'll change ListNodeFabric to be less dumb,
     *
     */

    const numNodes = this.size() + 2; // add the two bounding nodes
    const height = Math.max(this.height() + 1, 2) + 1;

    const map = this.#createMap(numNodes, height);
    this.#drawMap(map);
    this.#drawConnectingLines(map);
  }

  set(key: NODE_KEY_T, value: NODE_VALUE_T) {
    super.set(key, value);
    this.#draw();
  }

  delete(key: NODE_KEY_T) {
    super.delete(key);
    this.#draw();
  }

  group() {
    return this.#group;
  }
}
