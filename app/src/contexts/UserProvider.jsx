import { createContext, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { LoggedUser } from '../apis/auth.api';

export const UserContext = createContext({
  user: null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await LoggedUser();
        console.log(userData);
        if (userData && (userData.user.id || userData.user.email)) {
          setUser(userData.user.email);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, [location]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
