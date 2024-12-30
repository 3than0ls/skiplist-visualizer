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
import Form from "./Form";

type Props = {};

const Menu = (props: Props) => {
  const { skipList, rerender } = useSkipList();

  return (
    <Card className="absolute top-10 right-10 p-2">
      <CardHeader className="p-4">
        <CardTitle>Skip List Visualizer</CardTitle>
      </CardHeader>
      <hr className="border" />
      <CardContent className="p-4">
        <Form />
      </CardContent>
      <hr className="border" />
      <CardFooter className="p-4">
        <p>Created by </p>
      </CardFooter>
    </Card>
  );
};

export default Menu;
