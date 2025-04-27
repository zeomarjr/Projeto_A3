import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import {
  FaPlusCircle,
  FaCalendarAlt,
  FaHome ,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";

import LoginModal from "../../pages/login/Login";
import { Context } from "../../context/context";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { authenticated } = useContext(Context);
  const { sair } = useContext(Context);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    sair()
  };
  
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Agro Eventos</span>
        </div>
        {authenticated ? (
          <div className={styles.menu}>
             <div className={styles.menuItem}>
              <FaHome   /> <Link to= '/'>Home</Link>
            </div>
            <div className={styles.menuItem}>
              <FaPlusCircle /> <Link to= '/CriarEventos'>Criar evento</Link>
            </div>
            <div className={styles.menuItem}>
              <FaCalendarAlt /> <Link to= '/MyEventos' >Meus eventos</Link>
            </div>
            <div className={styles.menuItem}>
              <FaUserCircle /> <Link to= '/Perfil'>Perfil</Link>
            </div>
            <div className={styles.menuItem} onClick={handleLogout}>
              <FaBars /> <span>Sair</span>
            </div>
          </div>
        ) : (
          <div className={styles.icons}>
            <FaUserCircle
              className={styles.icon}
              onClick={() => setShowLogin(true)} 
            />
          </div>
        )}
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Navbar;
