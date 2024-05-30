import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/sidebar.module.css";


function Sidebar(props) {
  return (
    <>
      {props.isOpen && (
        <nav className={styles.sidebar}>
              <button className={styles.closeSidebarButton} onClick={props.toggleSidebar}>
            X
          </button>
          <img src="logo.webp" alt="logo" className={styles.logo} />
          <ul>
            <li>
              <Link to="article" className={styles.link}>
                <button className={styles.button}>Article</button>
              </Link>
            </li>
            <li>
              <Link to="/" className={styles.link}>
                <button className={styles.button}>Home</button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Sidebar;
