import React from 'react';
import styles from './ProjectExplorerHeader.module.css';
import { useAuth } from '../../auth/AuthContext';

export const ProjectExplorerHeader: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <a href="/" className={styles.logo}>DevHub</a>
                <nav className={styles.nav}>
                    <a href="/projects" className={`${styles.link} ${styles.active}`}>Проекты</a>
                    <a href="/news" className={styles.link}>Новости</a>
                    <a href="/profile" className={styles.link}>Профиль</a>
                </nav>
            </div>
            <div className={styles.right}>
                <button className={styles.createBtn} title="Создать новый проект">
                    + Создать проект
                </button>
                <div className={styles.avatarMenu}>
                    <div className={styles.avatar}>
                        {user?.username?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                    {/* В будущем — дропдаун с меню */}
                </div>
            </div>
        </header>
    );
};

export default ProjectExplorerHeader;
