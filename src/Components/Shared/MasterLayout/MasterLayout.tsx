/** @format */

import { Outlet } from "react-router-dom";
import "./MasterLayout.module.scss";

import NavBar from "../NavBar/NavBar";
import { useTranslation } from "react-i18next";
import { SideBar } from "@/Components";

const MasterLayout = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="flex gap-4" dir={i18n.language == "ar" ? "rtl" : "ltr"}>
        <div className="sidebar-container ">
          <SideBar />
        </div>
        <div className="w-[100%] p-5">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
