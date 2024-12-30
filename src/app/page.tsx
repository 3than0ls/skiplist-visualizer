import Menu from "@/components/menu/Menu";
import { SkipListProvider } from "@/contexts/SkipListContext";
import FabricCanvas from "@/fabric/FabricCanvas";

export default function Home() {
  return (
    <div className="bg-black h-screen relative">
      <SkipListProvider>
        <FabricCanvas />
        <Menu />
      </SkipListProvider>
    </div>
  );
}
