import React from "react";

import { isSpecialService, Service } from "@entities/service/model";

import { SpecialCard } from "../SpecialCard";
import { StandardCard } from "../StandardCard";

/**
 * Компонент-маршрутизатор для карточек сервисов
 */
export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  if (isSpecialService(service)) {
    return <SpecialCard service={service} />
  }

  return <StandardCard service={service} />
}

StandardCard.displayName = 'StandardCard'
SpecialCard.displayName = 'SpecialCard'
ServiceCard.displayName = 'ServiceCard'