import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { useSkipList } from "@/contexts/SkipListContext";
import { Button } from "../ui/button";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const RandomizeForm = () => {
  const [num, setNum] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { rerender, skipList } = useSkipList();

  const onClick = () => {
    const actualNumber = Number(num);
    if (isNaN(actualNumber) || actualNumber > 10000) {
      setError("Invalid number.");
      return;
    }

    for (let i = 0; i < actualNumber; i++) {
      skipList.set(
        getRandomInt(actualNumber * -10, actualNumber * 10),
        "Value: " + i
      );
    }
    rerender();
  };

  return (
    <div className="flex flex-col gap-y-2 justify-center">
      <Label className="text-sm" htmlFor="number">
        Number of entries to add
      </Label>
      <Input
        onChange={(e) => {
          setNum(e.target.value);
        }}
        type="number"
      />
      <Button className="w-full" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Button>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default RandomizeForm;
