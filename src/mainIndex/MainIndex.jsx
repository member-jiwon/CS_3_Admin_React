import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CommonHeader from "../common/CommonHeader";
import DashboardIndex from "../admin/dashboard/dashboardIndex";
import Report from "../admin/report/Report";
import Member from "../admin/member/MemberList";
import styles from "./MainIndex.module.css";

const MainIndex = () => {
  const location = useLocation();

  const yellowBackgroundPaths = ["/report"];
  const isYellowBackground = yellowBackgroundPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  const mainLayoutClassName = isYellowBackground
    ? styles.layoutMainYellow
    : styles.layoutMain;

  return (
    <div className={styles.container}>
      <header className={styles.MemberHeader}>
        <CommonHeader />
      </header>

      <div className={mainLayoutClassName}>
        <Routes>
          <Route path="/" element={<DashboardIndex />} />
          <Route path="/report/*" element={<Report />} />
          <Route path="/member/*" element={<Member />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainIndex;
