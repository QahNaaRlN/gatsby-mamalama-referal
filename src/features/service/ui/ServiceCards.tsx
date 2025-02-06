/**
 * @fileoverview Компонент для отображения сетки сервисов с группировкой по типам
 */

import React from "react";

import { useServices } from '@entities/service/hooks';
import { ServiceCard } from "@entities/service/ui/ServiceCard";
import { groupServicesByType } from '@features/service/lib/selectors';
import { type ServiceCardsProps } from '@features/service/model/types';
import { ErrorMessage } from '@ui/error';
import { Spinner } from '@ui/spinner';

/**
 * Компонент сетки карточек сервисов
 *
 * @description
 * Компонент выполняет:
 * - Загрузку данных сервисов через хук useServices
 * - Группировку сервисов по типам (специальные/стандартные)
 * - Отображение сетки карточек с адаптивной версткой
 * - Обработку состояний загрузки и ошибок
 *
 * @component
 * @param {ServiceCardsProps} props - Пропсы компонента
 * @returns {JSX.Element} Сетка карточек сервисов
 *
 * @example
 * return <ServiceCards />;
 */
export const ServiceCards: React.FC<ServiceCardsProps> = () => {
  const { data, error, loading } = useServices();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error.message}
      />
    );
  }

  const { special, standard } = groupServicesByType(data);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {/* Специальные сервисы с прайс-листом */}
      {special.map((service) => (
        <ServiceCard
          key={service.documentId}
          service={service}
        />
      ))}

      {/* Стандартные сервисы с фиксированной ценой */}
      {standard.map((service) => (
        <ServiceCard
          key={service.documentId}
          service={service}
        />
      ))}
    </div>
  );
};

ServiceCards.whyDidYouRender = true;

ServiceCards.displayName = 'ServiceCards';