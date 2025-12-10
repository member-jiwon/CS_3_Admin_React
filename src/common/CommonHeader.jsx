import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import styles from "./CommonHeader.module.css";
import log from "./img/log.svg";
import useAuthStore from "../store/useAuthStore";

const CommonHeader = () => {
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);

  return (
    <div className={styles.topbar}>
      <div className={styles.headerContentWrapper}>

        <div className={styles.leftSection}>
          <img src={log} className={styles.logoIcon} alt="로고 이미지" />

          <div className={styles.menuItems}>

            <div className={`${styles.menuItemBox} ${location.pathname === "/" ? styles.menuActive : ""}`}>
              <Link to="/" className={styles.menuItem}>대시보드</Link>
            </div>

            <div className={`${styles.menuItemBox} ${location.pathname === "/report" ? styles.menuActive : ""}`}>
              <Link to="/report" className={styles.menuItem}>신고관리</Link>
            </div>

            <div className={`${styles.menuItemBox} ${location.pathname === "/member" ? styles.menuActive : ""}`}>
              <Link to="/member" className={styles.menuItem}>멤버관리</Link>
            </div>

          </div>
        </div>

        <div className={styles.logoutBox} onClick={() => logout()}>
          <span className={styles.menuItem}>로그아웃</span>
          <LogOut className={styles.logoutIcon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;
