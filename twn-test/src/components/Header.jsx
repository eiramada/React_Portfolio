import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../css/header.module.css";

function Header({ toggleSidebar }) {
  return (
    <header className={styles.header}>
      <button
        aria-label="Toggle Menu"
        className={styles.toggleMenuButton}
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} className={styles.toggleMenuIcon} />
      </button>
      <img src="logo.webp" alt="logo" className={styles.logo} />
    </header>
  );
}

export default Header;
