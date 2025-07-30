import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => (
  <section className={styles.hero}>
    <h1 className={styles.title}>Создавай, находи и развивай игровые проекты вместе</h1>
    <p className={styles.subtitle}>
      Объединяем разработчиков, геймдизайнеров и художников для совместных проектов и обмена опытом
    </p>
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <input className={styles.input} type="email" placeholder="Введите e-mail для старта" />
      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.primary}`} type="submit">Зарегистрироваться</button>
        <button className={`${styles.btn} ${styles.outline}`} type="button">Посмотреть проекты</button>
      </div>
    </form>
  </section>
);

export default HeroSection;
