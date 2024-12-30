"use client";

import * as fabric from "fabric";
import React, { useEffect, useRef } from "react";
import { initializeCanvas, resizeCanvas } from "./canvasUtils";
import SkipListFabric from "./SkipListFabric";
import { pureCoin } from "@/skiplist/heightFunctions";
import { useSkipList } from "@/contexts/SkipListContext";

const FabricCanvas = () => {
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const skipList = useSkipList();

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

    fabricRef.current.add(skipList.group());

    fabricRef.current.selection = false;
    fabricRef.current.forEachObject(function (o) {
      o.selectable = false;
      o.evented = false;
    });

    return () => {
      fabricRef.current?.dispose();
    };
  });

  //   useEffect(())

  return <canvas ref={canvasRef} />;
};

export default FabricCanvas;
