import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import BetterTheme from "./MuiTheme.style.js";
import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import WhiteboxTestingPage from "./pages/WhiteBoxTesting/WhiteBoxTestingPage";
import AdversarialAttacksPage from "./pages/AdversarialAttacks/AdversarialAttacksPage";
import QueryPage from "./pages/Query/QueryPage";
import {DendrogramProvider} from "./contexts/DendrogramProvider";
import {DatasetProvider} from "./contexts/DatasetProvider.jsx";

function App() {
  return (
    <ThemeProvider theme={BetterTheme}>
      <header>
        <Header />
      </header>
      <div id="mainBody">
        <DatasetProvider>
          <DendrogramProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Query" element={<QueryPage />} />
              <Route
                path="/WhiteboxTesting"
                element={<WhiteboxTestingPage />}
              />
              <Route
                path="AdversarialAttacks"
                element={<AdversarialAttacksPage />}
              />
            </Routes>
          </DendrogramProvider>
        </DatasetProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
