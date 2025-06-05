import React from "react";
import style from './Footer.module.css'
const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer_content}>
        <p>&copy; 2025 SeuSite. Todos os direitos reservados.</p>
        <div className={style.social_links}>
          <a href="#" className={style.social_icon}>
            Facebook
          </a>
          <a href="#" className={style.social_icon}>
            Twitter
          </a>
          <a href="#" className={style.social_icon}>
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
