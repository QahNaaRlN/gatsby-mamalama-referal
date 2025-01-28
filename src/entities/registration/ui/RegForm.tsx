import React, { useState, useEffect } from 'react';

import { Button } from '@/shared/ui/Button';

import { useClientIds } from '@/features/intro/lib/useClientIds';
import { useUTM } from '@/features/intro/lib/useUTM';
import { BaseInput } from '@/shared/ui/BaseInput';

export const RegForm: React.FC<{ trackId?: string; onSuccess: () => void }> = ({ trackId, onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const { utmParams } = useUTM();
  const { yandexClientId, roistatClientId, googleClientId } = useClientIds();

  const handleSubmit = async () => {
    // Логика отправки формы
  };

  const handleVerify = async () => {
    // Логика проверки кода
  };

  return (
    <form onSubmit={codeSent ? handleVerify : handleSubmit}>
      {!codeSent ? (
        <>
          <BaseInput value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (000) 000-00-00" />
          <BaseInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" />
          <Button type="submit" disabled={isSending}>
            {isSending ? 'Отправка...' : 'Зарегистрироваться'}
          </Button>
        </>
      ) : (
        <>
          <BaseInput value={code} onChange={(e) => setCode(e.target.value)} placeholder="Введите код" />
          <Button type="submit" disabled={isVerifying}>
            {isVerifying ? 'Проверка...' : 'Подтвердить'}
          </Button>
        </>
      )}
    </form>
  );
};