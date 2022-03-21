import React from "react";
import { Routes, Route } from "react-router-dom";
import { Search } from "./search";
import { RecipeList } from "./recipeList";
import { RecipeInstructions } from "./recipeInstructions";

export const Recipes: React.VFC = () => {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/:id" element={<RecipeList />} />
      <Route path="/instructions/:id" element={ <RecipeInstructions/>} />
    </Routes>
  );
};
