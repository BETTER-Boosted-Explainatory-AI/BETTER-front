import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedUser } from "../../apis/auth.api";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { ROUTES } from "../../consts/routes";

export default function PublicRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await LoggedUser();
        if (user && (user.user?.id || user.user?.email)) {
          setIsLogged(true);
          navigate(ROUTES.HOME, { replace: true });
        } else {
          setIsLogged(false);
        }
      } catch {
        setIsLogged(false);
      } finally {
        setChecking(false);
      }
    }
    checkAuth();
  }, [navigate]);

  if (checking) return <LoadingComponent />;
  return !isLogged ? children : null;
}