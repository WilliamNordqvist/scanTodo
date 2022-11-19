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
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'


export const App: React.VFC = () => {
  const queryClient = new QueryClient();
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
        <HashRouter>
          <Background>
            <NavBar />
            <MainCard>
              <Routes>
                <Route path="/" element={<Navigate to="/list/add" />} />
                <Route path="/list/add/*" element={<List />} />
                <Route path="/recipes/*" element={<Recipes />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/setting" element={<Setting />} />
              </Routes>
            </MainCard>
          </Background>
        </HashRouter>
      </QueryClientProvider>
    </StoreProvider>
  );
};

export default App;
