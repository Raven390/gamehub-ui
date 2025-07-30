import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <p>
      <a href="https://github.com">GitHub</a> | <a href="#privacy">Политика конфиденциальности</a>
    </p>
  </footer>
);

export default Footer;
