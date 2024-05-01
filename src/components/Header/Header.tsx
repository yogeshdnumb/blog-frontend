import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { Code, Terminal, Menu, X, Home, Phone, BookOpen } from "react-feather";
import { useState } from "react";

export default function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  return (
    <header className={styles.Header}>
      <div className={styles.logo}>
        {/* <Code></Code>
         */}
        <Terminal></Terminal>
        <span> Yogi.dev</span>
      </div>

      {isNavVisible ? (
        <X
          className={styles.menuIcons}
          onClick={() => {
            setIsNavVisible(false);
          }}
        ></X>
      ) : (
        <Menu
          className={styles.menuIcons}
          onClick={() => {
            setIsNavVisible(true);
          }}
        ></Menu>
      )}
      <nav
        className={
          isNavVisible
            ? styles.visible + " " + styles.navbar
            : styles.hidden + " " + styles.navbar
        }
      >
        <ul>
          <li>
            <Home></Home>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <BookOpen></BookOpen>
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              Articles
            </NavLink>
          </li>
          <li>
            <Phone></Phone>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              Contact
            </NavLink>
          </li>
          {/* <X
            className={isNavVisible ? styles.hidden : styles.visible}
            onClick={() => {
              setIsNavVisible(false);
            }}
          ></X>
        </ul>
        <Menu
          className={isNavVisible ? styles.visible : styles.hidden}
          onClick={() => {
            setIsNavVisible(true);
          }}
        ></Menu> */}
        </ul>
      </nav>
    </header>
  );
}
