import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Recipes } from "./pages/recipes/recipes";
import { List } from "./pages/list/list";
import { Favorite } from "./pages/favorite/favorite";
import { Setting } from "./pages/setting/setting";
import { StoreProvider } from "./context/context";
import { NavBar } from "./components/navbar/Navbar";
import { Background } from "./components/background/background";
import { MainCard } from "./components/mainCard/mainCard";



export const App: React.VFC = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Background>
          <NavBar />
          <MainCard>
            <Routes>
              <Route path="/" element={<Navigate to="/list/add" />} />
              <Route path="/list/add/*" element={<List />} />
              <Route path="/recipes/*" element={<Recipes />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/setting" element={<Setting/>} />
            </Routes>
          </MainCard>
        </Background>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
