import { domains } from '@shared/config/domains';

/**
 * Функция для получения текущего домена на основе `window.location.hostname`.
 * Сравнивает текущий хост с ключами из объекта `domains` и возвращает соответствующий домен, если он найден.
 * Если код выполняется на сервере (например, в SSR), возвращает `null`.
 *
 * @returns {string | null} Ключ домена из объекта `domains`, если найден, иначе `null`.
 */
export const getCurrentDomain = (): string | null => {
    // Проверяем, выполняется ли код на клиенте (в браузере)
    if (typeof window === 'undefined') return null;

    // Получаем текущий хост из URL
    const hostname = window.location.hostname;

    // Ищем домен в объекте `domains`, который соответствует текущему хосту
    return Object.keys(domains).find((domain) => hostname.includes(domain)) || null;
};