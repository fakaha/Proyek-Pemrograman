import React from "react";
import { HeaderUser } from "../components/Header/HeaderUser";
import { FooterUser } from "../components/Footer/FooterUser";

export const LayoutUser = ({ children }) => {
  return (
    <div className="flex flex-col bg-slate-50 min-h-screen">
      <HeaderUser className="flex-1" />
      <div className="desktop:px-28 desktopfull:px-36 py-0 md:py-8 text-sm flex-1">
        {children}
      </div>
      <FooterUser />
    </div>
  );
};
