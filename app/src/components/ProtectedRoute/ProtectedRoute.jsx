import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedUser } from "../../apis/auth.api";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await LoggedUser();
        if (user && (user.user?.id || user.user?.email)) {
          setIsLogged(true);
        } else {
          setIsLogged(false);
          navigate("/Login", { replace: true });
        }
      } catch {
        setIsLogged(false);
        navigate("/Login", { replace: true });
      } finally {
        setChecking(false);
      }
    }
    checkAuth();
  }, [navigate]);

  if (checking) return <LoadingComponent />;
  return isLogged ? children : null;
}