/**
 * @fileoverview Компонент для отображения сетки сервисов с группировкой по типам
 */

import React from "react";

import { useServices } from '@entities/service/hooks';
import { ServiceCard } from "@entities/service/ui/ServiceCard";
import { ErrorMessage } from '@shared/ui/error';
import { Spinner } from '@shared/ui/spinner';

import { groupServicesByType } from '../lib/selectors';
import { type ServiceCardsProps } from '../model/types';

/**
 * Компонент отображает сетку карточек сервисов, сгруппированных по типу.
 * Специальные сервисы отображаются первыми, за ними следуют стандартные сервисы.
 * В процессе загрузки показывает спиннер, при ошибке - сообщение об ошибке.
 */
export const ServiceCards: React.FC<ServiceCardsProps> = () => {
  const { services, error, loading } = useServices();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Произошла ошибка при загрузке сервисов. Пожалуйста, попробуйте позже."
      />
    );
  }

  const { special, standard } = groupServicesByType(services);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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

ServiceCards.displayName = 'ServiceCards';