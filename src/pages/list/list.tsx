import React from "react";
import { Routes, Route } from "react-router-dom";
import { AddListItem } from "./addListItem";
import { CreateList } from "./createList";

export const List: React.VFC = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateList />} />
      <Route path={`/:id`} element={<AddListItem />} />
    </Routes>
  );
};
