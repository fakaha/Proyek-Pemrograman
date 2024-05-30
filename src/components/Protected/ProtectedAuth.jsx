import React, { useEffect } from "react";
import { CookieStorage, CookiesKeys } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";

export const ProtectedAuth = ({ children }) => {
  const navigate = useNavigate();
  const token = CookieStorage.get(CookiesKeys.AuthToken) ? CookieStorage.get(CookiesKeys.AuthToken) : null;

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [navigate, token]);

  return children;
};
