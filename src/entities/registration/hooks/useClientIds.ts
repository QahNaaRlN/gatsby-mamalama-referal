import { useState, useEffect } from 'react';

export const useClientIds = () => {
  const [yandexClientId, setYandexClientId] = useState<string | null>(null);
  const [roistatClientId, setRoistatClientId] = useState<string | null>(null);
  const [googleClientId, setGoogleClientId] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientIds = async () => {
      // Логика получения clientId
    };

    fetchClientIds();
  }, []);

  return { yandexClientId, roistatClientId, googleClientId };
};
// TODO перенести функционал из проекта vue в текущий проект, написать логику получения clientId