import React from "react";
import { SidebarAdmin } from "../components/Sidebar/SidebarAdmin";
import { HeaderAdmin } from "../components/Header/HeaderAdmin";

export const LayoutAdmin = ({children}) => {
  return (
    <div className="flex">
      <SidebarAdmin />

      <div className="ml-[250px] w-full">
        <HeaderAdmin />
        <div className="py-7 px-14">
          {children}
        </div>  
      </div>
    </div>
  );
};
