"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSkipList } from "@/contexts/SkipListContext";

type Props = {};

const Menu = (props: Props) => {
  const skipList = useSkipList();

  return (
    <Card className="absolute top-10 right-10">
      <CardHeader>
        <CardTitle>Skip List Visualizer</CardTitle>
      </CardHeader>
      <CardContent
        onClick={() => {
          console.log("hello");
          skipList.set(1, "abc");
        }}
      >
        <p>Insert Element</p>
      </CardContent>
      <CardFooter>
        <p>Created by </p>
      </CardFooter>
    </Card>
  );
};

export default Menu;
