import React, { useState } from 'react';
import styles from './HeroSection.module.css';
import InputGroup from './InputGroup';

const HeroSection: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Зарегистрирован email: ${email}`);
  };

  return (
      <section className={styles.hero}>
        <div className={styles.inner}>
          <h1 className={styles.title}>
            Платформа для командной разработки
          </h1>
          <p className={styles.subtitle}>
            🚀 Находи проекты, объединяйся в команды, развивай свои навыки вместе с комьюнити
          </p>
          <InputGroup
              value={email}
              onChange={handleChange}
              onSubmit={handleSubmit}
              placeholder="Введите e-mail"
              buttonLabel="SignUp"
          />
        </div>
      </section>
  );
};

export default HeroSection;
