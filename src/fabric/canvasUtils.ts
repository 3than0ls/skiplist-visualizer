import * as fabric from "fabric";
import { BaseFabricObject } from "fabric";

BaseFabricObject.ownDefaults.originX = "center";
BaseFabricObject.ownDefaults.originY = "center";

const CANVAS_BACKGROUND = "#ddd";

export function initializeCanvas(canvasRef: HTMLCanvasElement) {
  const canvas = new fabric.Canvas(canvasRef, {
    width: 800,
    height: 600,
    allowTouchScrolling: true,
    selection: false,
    defaultCursor: "move",
    backgroundColor: CANVAS_BACKGROUND,
  });
  resizeCanvas(canvas);
  attachMouseListenersToCanvas(canvas);

  return canvas;
}

function attachMouseListenersToCanvas(canvas: fabric.Canvas) {
  let isDragging = false;
  let origin: fabric.Point;

  canvas.on("mouse:down", (e) => {
    isDragging = true;
    origin = e.viewportPoint;
  });
  canvas.on("mouse:up", () => {
    isDragging = false;
  });

  canvas.on("mouse:move", (e) => {
    if (isDragging) {
      canvas.relativePan(
        new fabric.Point(
          e.viewportPoint.x - origin.x,
          e.viewportPoint.y - origin.y
        )
      );
      origin = e.viewportPoint;
    }
  });

  let zoomLevel = 1;
  const MIN_ZOOM = 0.25;
  const MAX_ZOOM = 2;
  const ZOOM_OFFSET = 0.1;
  canvas.on("mouse:wheel", (e) => {
    zoomLevel -= Math.sign(e.e.deltaY) * ZOOM_OFFSET;
    zoomLevel = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoomLevel));
    canvas.zoomToPoint(e.viewportPoint, zoomLevel);
  });
}

export function resizeCanvas(canvas: fabric.Canvas) {
  canvas.setDimensions({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  canvas.renderAll();
}
