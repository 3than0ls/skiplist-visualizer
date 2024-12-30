import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useSkipList } from "@/contexts/SkipListContext";

type Props = {};

const Form = (props: Props) => {
  const [key, setKey] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<string | undefined>(undefined);

  const [error, setError] = useState<string | null>(null);

  const { rerender, skipList } = useSkipList();

  const onAddClick = () => {
    setError(null);
    const numKey = Number(key);
    if (!key || isNaN(numKey)) {
      setError("Invalid key.");
      return;
    }

    skipList.set(numKey, value ?? "null value");
    rerender();
  };

  const onDeleteClick = () => {
    setError(null);
    const numKey = Number(key);
    if (!key || isNaN(numKey)) {
      setError("Invalid key.");
      return;
    }

    skipList.delete(numKey);
    rerender();
  };

  return (
    <div className="flex flex-col gap-y-2 justify-center">
      <span>Add an entry</span>
      <span>
        <Label className="text-sm" htmlFor="key">
          Key
        </Label>
        <Input
          placeholder="Number"
          id="key"
          onChange={(e) => {
            setError(null);
            setKey(e.target.value);
          }}
        />
      </span>
      <span>
        <Label className="text-sm" htmlFor="value">
          Value
        </Label>
        <Input
          placeholder="String"
          id="value"
          onChange={(e) => {
            setError(null);
            setValue(e.target.value);
          }}
        />
      </span>
      <div className="flex justify-center w-full gap-x-2 mt-1">
        <Button className="w-full" onClick={onAddClick}>
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
        <Button
          className="w-full bg-red-600 hover:bg-red-500"
          onClick={onDeleteClick}
        >
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>
      </div>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default Form;
