import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => (
    <header className={styles.header}>
        <div className={styles.inner}>
            <div className={styles.left}>
                <a href="/" className={styles.logo}>DevHub</a>
                <nav className={styles.nav} aria-label="Главная навигация">
                    <a href="#about" className={styles.link}>О платформе</a>
                    <a href="#faq" className={styles.link}>FAQ</a>
                    <a href="#contacts" className={styles.link}>Контакты</a>
                </nav>
            </div>
            <div className={styles.actions}>
                <button className={styles.loginBtn}>Войти</button>
                <button className={styles.signupBtn}>Присоединится</button>
            </div>

        </div>
    </header>
);

export default Header;
