import React from "react";

import { useRegistrationSuccess } from "@entities/registration/hooks/useRegistrationSuccess";
import { renderRichText } from "@lib/renderRichText/renderRichText";
import { ErrorMessage } from "@shared/ui/error";
import { Spinner } from "@shared/ui/spinner";

export const RegistrationFormSuccess: React.FC = () => {
  const { data, error, loading } = useRegistrationSuccess();

  if (loading) {
    return <Spinner />;
  }

  if (error || !data || data.length === 0) {
    return (
      <ErrorMessage
        message="Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже."
      />
    );
  }

  const successContent = data[0];

  const { title, subtitle, description, link, site } = successContent

  if (!successContent) {
    return (
      <ErrorMessage
        message="Данные акции не найдены. Пожалуйста, попробуйте позже."
      />
    );
  }

  return (
    <div className="container relative z-10">
      <div className="flex flex-col items-start justify-center">
        <div className="text-neutral-900 text-3xl font-medium leading-snug mb-6">
          {renderRichText(description, {
            discount: {
              value: site.discount,
              render: (value) => (
                <div
                  className="inline-flex items-center justify-start gap-1.5 rounded-[2rem] border-b border-r border-purple-450 bg-purple-300 px-4 py-1">
                    <span className="text-2xl md:text-4xl font-semibold text-neutral-900">
                      {value} ₸
                    </span>
                </div>
              ),
            },
          })}
        </div>
        <h2 className="mb-8 text-3xl md:text-5xl font-semibold leading-tight text-neutral-900">
          {title}
        </h2>
        <p className="text-neutral-900 text-lg md:text-xl mb-9 font-normal leading-relaxed">{subtitle}</p>
        <a
          href={link}
          className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-blue-800"
        >
          Адреса наших пунктов
        </a>
      </div>
    </div>
  );
};