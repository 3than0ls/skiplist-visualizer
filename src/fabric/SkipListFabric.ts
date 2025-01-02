import SkipList from "@/skiplist/SkipList";
import * as fabric from "fabric";
import {
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

  #draw() {
    this.#group.removeAll();

    /**
     * To represent the SkipList visually, we basically must strip away all advantages of the SkipList
     *
     * Every node must know it's relative position relative to the top-left head node (0, 0)
     * We'll change ListNodeFabric to be less dumb,
     *
     *
     * Needs to be completely reworked
     *
     * Most effective way to do this is to simply iterate through each row, drawing a line from one edge node to the end
     * Then iterate through the bottom row, finding the number of nodes above it, then drawing a line from bottom row to top node
     *
     */

    const numNodes = this.size() + 2; // add the two bounding nodes
    const height = Math.max(this.height() + 2, 2);

    // draw row lines
    for (let i = 0; i < height; i++) {
      this.#group.insertAt(
        0,
        new fabric.Line(
          [
            0,
            i * SKIPLISTFABRIC_NODE_OFFSET,
            (numNodes - 1) * SKIPLISTFABRIC_NODE_OFFSET,
            i * SKIPLISTFABRIC_NODE_OFFSET,
          ],
          {
            stroke: "black",
            strokeWidth: 2,
          }
        )
      );
    }

    // draw column lines
    let current = this.bottom_left;
    let offsetX = 0;
    while (current != null) {
      let offsetY = 0;
      let temp = current;
      while (temp.up != null) {
        offsetY += SKIPLISTFABRIC_NODE_OFFSET;
        temp = temp.up!;
      }

      this.#group.insertAt(
        0,
        new fabric.Line(
          [
            offsetX,
            (height - 1) * SKIPLISTFABRIC_NODE_OFFSET - offsetY,
            offsetX,
            (height - 1) * SKIPLISTFABRIC_NODE_OFFSET,
          ],
          {
            stroke: "black",
            strokeWidth: 2,
          }
        )
      );
      offsetX += SKIPLISTFABRIC_NODE_OFFSET;
      current = current.right!;
    }

    // draw nodes
    current = this.bottom_left;
    const bottomY = (height - 1) * SKIPLISTFABRIC_NODE_OFFSET;
    offsetX = 0;
    while (current != null) {
      let offsetY = 0;
      let temp = current;
      while (temp != null) {
        this.#group.add(
          createFabricFromListNode(temp, {
            x: offsetX,
            y: bottomY - offsetY,
          }).group()
        );
        offsetY += SKIPLISTFABRIC_NODE_OFFSET;
        temp = temp.up!;
      }
      offsetX += SKIPLISTFABRIC_NODE_OFFSET;
      current = current.right!;
    }
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
