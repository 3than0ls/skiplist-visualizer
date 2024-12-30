"use client";

import * as fabric from "fabric";
import React, { useEffect, useRef } from "react";
import { initializeCanvas, resizeCanvas } from "./canvasUtils";
import { useSkipList } from "@/contexts/SkipListContext";

const FabricCanvas = () => {
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { skipList, renderState } = useSkipList();

  // initialization
  useEffect(() => {
    fabricRef.current = initializeCanvas(canvasRef.current!);
    window.addEventListener("resize", () => resizeCanvas(fabricRef.current!));

    // // fabricRef.current?.add(new List().group());
    // const s = new SkipListFabric(pureCoin, { x: 100, y: 100 });
    // s.set(5, "hello");
    // // s.set(6, "hello");
    // s.set(7, "world");
    // // s.set(8, "world");
    // fabricRef.current?.add(s.group());

    fabricRef.current.selection = false;
    fabricRef.current.forEachObject(function (o) {
      o.selectable = false;
      o.evented = false;
    });

    return () => {
      fabricRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricRef.current) {
      return;
    }

    // unsure if this is the best way to do this...
    fabricRef.current.getObjects().forEach((obj) => {
      fabricRef.current!.remove(obj);
    });
    fabricRef.current.add(skipList.group());
    // fabricRef.current.renderAll();
  }, [renderState, skipList]);
  //   useEffect(())

  return <canvas ref={canvasRef} />;
};

export default FabricCanvas;
