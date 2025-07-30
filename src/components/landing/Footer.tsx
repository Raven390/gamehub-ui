import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <span className={styles.logo}>GameHub</span>
      <nav className={styles.links}>
        <a href="https://github.com">GitHub</a>
        <a href="#privacy">Политика конфиденциальности</a>
      </nav>
    </div>
  </footer>
);

export default Footer;
