import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.logo}>GameHub</div>
    <nav className={styles.nav}>
      <a href="#about">О платформе</a>
      <a href="#faq">FAQ</a>
      <a href="#contacts">Контакты</a>
      <button className={`${styles.btn} ${styles.outline}`}>Войти</button>
      <button className={`${styles.btn} ${styles.primary}`}>Зарегистрироваться</button>
    </nav>
  </header>
);

export default Header;
