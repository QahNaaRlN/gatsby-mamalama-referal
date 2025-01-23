import React from "react";

interface ErrorMessageProps {
  message: string; // Сообщение об ошибке
  className?: string; // Дополнительные классы для кастомизации
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  return (
    <div className={`p-3 bg-red-50 border border-red-400 text-red-700 rounded-md ${className}`}>
      {message}
    </div>
  );
};