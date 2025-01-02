"use client";

import Menu from "@/components/menu/Menu";
import { SkipListProvider } from "@/contexts/SkipListContext";
import FabricCanvas from "@/fabric/FabricCanvas";
import dynamic from "next/dynamic";

const DynamicSLProvider = dynamic(() => Promise.resolve(SkipListProvider), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="bg-black h-screen relative">
      <DynamicSLProvider>
        <FabricCanvas />
        <Menu />
      </DynamicSLProvider>
    </div>
  );
}
