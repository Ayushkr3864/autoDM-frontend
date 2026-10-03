import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import LoadingPage from './loader/LoadingPage';

function IsAuthenticated({ children }) {
  const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    

  useEffect(() => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      console.log("token from auth",token);
      

    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuth(true);
    }

    setLoading(false);
  }, []);

    if (loading) {
        return <LoadingPage />
    }

  return auth ? children : <Navigate to="/login" />;
}

export default IsAuthenticated
