import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faHome,
  faFileAlt,
  faList,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {isOpen && (
        <nav className={styles.sidebar}>
          <button className={styles.closeSidebarButton} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <img src="/logo.webp" alt="logo" className={styles.logo} />
          <ul>
            <li>
              <Link to="/" className={styles.link}>
                <button className={styles.button}>
                  <FontAwesomeIcon icon={faHome} className="fa-icon" /> Home
                </button>
              </Link>
            </li>
            <li>
              <Link to="article" className={styles.link}>
                <button className={styles.button}>
                  <FontAwesomeIcon icon={faFileAlt} className="fa-icon" />{" "}
                  Article
                </button>
              </Link>
            </li>
            <li>
              <Link to="/list" className={styles.link}>
                <button className={styles.button}>
                  <FontAwesomeIcon icon={faList} className="fa-icon" /> List
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Sidebar;
