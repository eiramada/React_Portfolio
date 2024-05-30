import React from "react";
import styles from "../css/header.module.css";

function Header(props) {
  return (
    <header className={styles.header}>
      <button
        aria-label="Toggle Menu"
        className={styles.toggleMenuButton}
        onClick={props.toggleSidebar}
      >
        <img
          src="/toggle-menu-icon.png"
          alt="Toggle Menu"
          className={styles.toggleMenuIcon}
        />
      </button>
      <img src="logo.webp" alt="logo" className={styles.logo} />
    </header>
  );
}

export default Header;
