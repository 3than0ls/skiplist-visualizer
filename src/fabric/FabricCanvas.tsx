"use client";

import * as fabric from "fabric";
import React, { useEffect, useRef } from "react";
import { initializeCanvas, resizeCanvas } from "./canvasUtils";

const FabricCanvas = () => {
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const addRect = () => {
    if (fabricRef.current == null) {
      console.error("Fabric canvas reference not yet initialized.");
      return;
    }
    fabricRef.current.add(
      new fabric.Rect({
        top: 120,
        left: 120,
        width: 50,
        height: 50,
        fill: "red",
        selectable: false,
        evented: false,
        hasBorders: false,
        hasControls: false,
      })
    );
  };

  useEffect(() => {
    fabricRef.current = initializeCanvas(canvasRef.current!);
    window.addEventListener("resize", () => resizeCanvas(fabricRef.current!));

    fabricRef.current?.add(
      new fabric.Rect({
        top: 50,
        left: 50,
        width: 50,
        height: 50,
        fill: "red",
      })
    );

    // fabricRef.current.renderAll();
    fabricRef.current.selection = false;
    fabricRef.current.forEachObject(function (o) {
      o.selectable = false;
      o.evented = false;
    });

    return () => {
      fabricRef.current?.dispose();
    };
  });
  return (
    <>
      <canvas ref={canvasRef} />
      <button className="bg-black text-black" onClick={addRect}>
        Add a rectanlge
      </button>
    </>
  );
};

export default FabricCanvas;
