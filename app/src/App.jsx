import { Route, Routes, useLocation  } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import BetterTheme from "./MuiTheme.style.js";
import { ModelProvider } from "./contexts/ModelProvider.jsx";
import { DendrogramProvider } from "./contexts/DendrogramProvider";
import Header from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import WhiteboxTestingPage from "./pages/WhiteBoxTesting/WhiteBoxTestingPage";
import AdversarialDetectionPage from "./pages/AdversarialDetection/AdversarialDetectionPage.jsx";
import AdversarialAnalysisPage from "./pages/AdversarialAnalysis/AdversarialAnalysisPage.jsx";
import QueryPage from "./pages/Query/QueryPage";
import LoginPage from "./pages/Login/LoginPage.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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
      <div id={hideHeader ? "loginWrapper" : "wrapper"}>
        <ModelProvider>
          <DendrogramProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/Login" element={<LoginPage />} />
              <Route
                path="/Query"
                element={
                  <ProtectedRoute>
                    <QueryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/WhiteboxTesting"
                element={
                  <ProtectedRoute>
                    <WhiteboxTestingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Adversarial/Detection"
                element={
                  <ProtectedRoute>
                    <AdversarialDetectionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Adversarial/Analysis"
                element={
                  <ProtectedRoute>
                    <AdversarialAnalysisPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </DendrogramProvider>
        </ModelProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
