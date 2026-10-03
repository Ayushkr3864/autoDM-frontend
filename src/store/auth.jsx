import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  const fetchCurrentUser = async () => {
    const token = getToken();

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://autodm-latest.onrender.com/api/auth/me/v1",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const data = await response.json();

      setUser(data);
    } catch (error) {
      console.error("Authentication error:", error);

      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

    const logout = () => {
      localStorage.removeItem("token");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        getToken,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
