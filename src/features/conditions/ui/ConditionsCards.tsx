/**
 * @fileoverview Компонент для отображения сетки условий
 */

import React from "react";

import { useConditions } from "@entities/conditions";
import { ConditionsCard } from "@entities/conditions/ui/ConditionsCard";
import { ConditionsCardsProps } from '@features/conditions/model/types';
import { ErrorMessage } from '@ui/error';
import { Spinner } from '@ui/spinner';


/**
 * Компонент отображает сетку карточек условий.
 * В процессе загрузки показывает спиннер, при ошибке - сообщение об ошибке.
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
    <div className="mb-10 flex gap-x-5">
      {data.map((conditions) => (
        <ConditionsCard
          key={conditions.documentId}
          conditions={conditions}
        />
      ))}
    </div>
  );
};

ConditionsCards.displayName = 'ConditionsCards';