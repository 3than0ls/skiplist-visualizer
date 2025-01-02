"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddForm from "./AddForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import RandomizeForm from "./RandomizeForm";

const Menu = () => {
  return (
    <Card className="absolute top-10 right-10 p-2">
      <CardHeader className="p-4">
        <CardTitle>Skip List Visualizer</CardTitle>
      </CardHeader>
      <hr className="border" />
      <CardContent className="p-4">
        <Tabs defaultValue="Add" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="Add">Add Element</TabsTrigger>
            <TabsTrigger value="Randomize">Randomize</TabsTrigger>
          </TabsList>
          <TabsContent value="Add">
            <AddForm />
          </TabsContent>
          <TabsContent value="Randomize">
            <RandomizeForm />
          </TabsContent>
        </Tabs>
      </CardContent>
      <hr className="border" />
      <CardFooter className="p-4">
        <a
          className="text-sm text-gray-400 hover:underline"
          href="https://en.wikipedia.org/wiki/Skip_list"
        >
          Wikipedia: Skip list
        </a>
      </CardFooter>
    </Card>
  );
};

export default Menu;
