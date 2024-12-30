"use client";

import SkipListFabric, { SkipListDefaultType } from "@/fabric/SkipListFabric";
import { pureCoin } from "@/skiplist/heightFunctions";
import SkipList from "@/skiplist/SkipList";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useReducer,
  useEffect,
  useLayoutEffect,
} from "react";

type SkipListContextType = {
  skipList: SkipListFabric;
  rerender: () => void;
  renderState: number;
};

const SkipListContext = createContext<SkipListContextType | undefined>(
  undefined
);

interface SkipListProviderProps {
  children: ReactNode;
}

export const SkipListProvider = ({ children }: SkipListProviderProps) => {
  const skipList = useRef<SkipListFabric>(
    new SkipListFabric(pureCoin, { x: 100, y: 100 })
  );

  const [renderState, rerender] = useReducer((x) => x + 1, 0);

  // Function to update the custom object
  return (
    <SkipListContext.Provider
      value={{
        skipList: skipList.current!,
        renderState,
        rerender,
      }}
    >
      {children}
    </SkipListContext.Provider>
  );
};

export const useSkipList = () => {
  if (!SkipListContext) {
    console.error("Illegal access of SkipListContext");
  }
  return useContext(SkipListContext)!;
};
