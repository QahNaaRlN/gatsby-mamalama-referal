import React from 'react';

import { RegForm } from '@entities/registration';


interface RegistrationPromoProps {
  name: string;
  onSuccess: () => void;
}

export const RegistrationPromo: React.FC<RegistrationPromoProps> = ({ name, onSuccess }) => {
  return (
    <div className={styles.registrationPromo}>
      <h1 className={styles.title}>
        Зарегистрируйся, {name}, <br />
        и получи <span>1500 ₸</span> <br />
        на любые услуги
      </h1>
      <p>Скидка автоматически применится к первому заказу в любом пункте</p>
      <RegForm onSuccess={onSuccess} />
    </div>
  );
};