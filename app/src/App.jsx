import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import BetterTheme from "./MuiTheme.style.js";
import { UserProvider } from "./contexts/UserProvider.jsx";
import { ModelProvider } from "./contexts/ModelProvider.jsx";
import { DendrogramProvider } from "./contexts/DendrogramProvider";
import { WhiteBoxTestingProvider } from "./contexts/WhiteBoxTestingProvider";
import { DetectorProvider } from "./contexts/DetectorProvider";
import { ROUTES } from "./consts/routes";
import Header from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import WhiteboxTestingPage from "./pages/WhiteBoxTesting/WhiteBoxTestingPage";
import AdversarialDetectionPage from "./pages/AdversarialDetection/AdversarialDetectionPage.jsx";
import AdversarialAnalysisPage from "./pages/AdversarialAnalysis/AdversarialAnalysisPage.jsx";
import ModelStatusPage from "./pages/ModelStatus/ModelStatusPage.jsx";
import QueryPage from "./pages/Query/QueryPage";
import LoginPage from "./pages/Login/LoginPage.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import NewModel from "./pages/NewModel/NewModel.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === ROUTES.LOGIN;

  return (
    <ThemeProvider theme={BetterTheme}>
      <UserProvider>
        <ModelProvider>
          {!hideHeader && (
            <header>
              <Header />
            </header>
          )}
          <div id={hideHeader ? "loginWrapper" : "wrapper"}>
            <DendrogramProvider>
              <WhiteBoxTestingProvider>
                <DetectorProvider>
                <Routes>
                  <Route
                    path={ROUTES.HOME}
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.LOGIN}
                    caseSensitive
                    element={
                      <PublicRoute>
                        <LoginPage />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path={ROUTES.QUERY}
                    element={
                      <ProtectedRoute>
                        <QueryPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.MODELS_STATUS}
                    element={
                      <ProtectedRoute>
                        <ModelStatusPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.WHITEBOX_TESTING}
                    element={
                      <ProtectedRoute>
                        <WhiteboxTestingPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.ADVERSARIAL_DETECTION}
                    element={
                      <ProtectedRoute>
                        <AdversarialDetectionPage/>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.ADVERSARIAL_ANALYSIS}
                    element={
                      <ProtectedRoute>
                        <AdversarialAnalysisPage/>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.NEW_MODEL}
                    element={
                      <ProtectedRoute>
                        <NewModel />
                      </ProtectedRoute>
                    }
                  />
                  <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
                </Routes>
                </DetectorProvider>
              </WhiteBoxTestingProvider>
            </DendrogramProvider>
          </div>
        </ModelProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
