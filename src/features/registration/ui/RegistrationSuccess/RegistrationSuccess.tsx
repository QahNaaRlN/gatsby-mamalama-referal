import React from 'react';

import styles from './RegistrationSuccess.module.scss';

export const RegistrationSuccess: React.FC = () => {
  return (
    <div className={styles.registrationSuccess}>
      <h1 className={styles.title}>Ура, вы зарегистрированы!</h1>
      <p>Мы выслали СМС о начислении скидки</p>
      <a href="https://mamalama.kz/contacts/" className={styles.link}>
        Адреса наших пунктов
      </a>
    </div>
  );
};