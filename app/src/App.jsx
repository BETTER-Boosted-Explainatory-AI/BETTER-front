import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import BetterTheme from "./MuiTheme.style.js";
import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import WhiteboxTestingPage from "./pages/WhiteBoxTesting/WhiteBoxTestingPage";
import AdversarialAttacksPage from "./pages/AdversarialAttacks/AdversarialAttacksPage";
import QueryPage from "./pages/Query/QueryPage";
import { DendrogramProvider } from "./contexts/DendrogramProvider";
import { ModelProvider } from "./contexts/ModelProvider.jsx"; 
import LoginPage from "./pages/Login/LoginPage.jsx";

function App() {

  const location = useLocation();
  const hideHeader = location.pathname === "/Login";

  return (
    <ThemeProvider theme={BetterTheme}>
      {!hideHeader && (
        <header>
          <Header />
        </header>
      )}
      <div id="wrapper">
        <ModelProvider>
          <DendrogramProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Login" element={<LoginPage />} />
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
        </ModelProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
