import React from "react";

import { isSpecialService, Service } from "@entities/service/model";

import { SpecialCard } from "../SpecialCard";
import { StandardCard } from "../StandardCard";

/**
 * Пропсы компонента ServiceCard
 * @interface ServiceCardProps
 * @property {Service} service - Данные сервиса
 */
interface ServiceCardProps {
  service: Service;
}

/**
 * Компонент-маршрутизатор для карточек сервисов
 * @component
 * @param {ServiceCardProps} props - Пропсы компонента
 * @param {Service} props.service - Объект с данными сервиса
 * @returns {JSX.Element} Компонент SpecialCard или StandardCard в зависимости от типа сервиса
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  if (isSpecialService(service)) {
    return <SpecialCard service={service} />;
  }

  return <StandardCard service={service} />;
};

StandardCard.displayName = 'StandardCard';
SpecialCard.displayName = 'SpecialCard';
ServiceCard.displayName = 'ServiceCard';