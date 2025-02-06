/**
 * Компонент для отображения сетки условий
 * @module ConditionsCards
 */

import React from "react";

import { useConditions } from "@entities/conditions";
import { ConditionsCard } from "@entities/conditions/ui/ConditionsCard";
import { ConditionsCardsProps } from '@features/conditions/model/types';
import { ErrorMessage } from '@ui/error';
import { Spinner } from '@ui/spinner';

/**
 * Компонент сетки карточек условий
 * @component
 * @param {ConditionsCardsProps} props - Пропсы компонента
 * @returns {JSX.Element} Сетка карточек, спиннер загрузки или сообщение об ошибке
 *
 * @example
 * return (
 *   <ConditionsCards />
 * );
 */
export const ConditionsCards: React.FC<ConditionsCardsProps> = () => {
  const { data, error, loading } = useConditions();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Произошла ошибка при загрузке условий. Пожалуйста, попробуйте позже."
      />
    );
  }

  return (
    <div className="mb-10 flex flex-col md:flex-row gap-y-3 gap-x-5">
      {data.map((conditions) => (
        <ConditionsCard
          key={conditions.documentId}
          conditions={conditions}
        />
      ))}
    </div>
  );
};

ConditionsCards.whyDidYouRender = true;

ConditionsCards.displayName = 'ConditionsCards';