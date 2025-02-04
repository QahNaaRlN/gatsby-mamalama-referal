import React, { useState } from "react";

import { RegForm } from "@entities/registration";
import { useRegistration } from "@entities/registration/hooks/useRegistration";
import { renderRichText } from "@shared/lib/renderRichText/renderRichText";
import { ErrorMessage } from "@shared/ui/error";
import { Spinner } from "@shared/ui/spinner";

interface RegistrationPromoProps {
  onSuccess: () => void;
}

export const RegistrationFormPromo: React.FC<RegistrationPromoProps> = ({
                                                                      onSuccess
                                                                    }) => {
  const { data, error, loading } = useRegistration();
  const [isRegistered, setIsRegistered] = useState(false);

  // Если данные еще загружаются, показываем спиннер
  if (loading) {
    return <Spinner />;
  }

  // Если произошла ошибка, показываем сообщение об ошибке
  if (error || !data || data.length === 0) {
    return (
      <ErrorMessage
        message="Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже."
      />
    );
  }

  const promoContent = data[0];

  if (!promoContent) {
    return (
      <ErrorMessage
        message="Данные акции не найдены. Пожалуйста, попробуйте позже."
      />
    );
  }

  const { title, subtitle, description, site } = promoContent;

  const handleSuccess = () => {
    setIsRegistered(true);
    onSuccess();
  };

  // Рендер финального состояния после регистрации
  if (isRegistered) {
    return (
      <div className="container relative z-10">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-medium leading-normal text-blue-700">
              Спасибо за регистрацию!
            </h2>
            <p className="text-lg font-normal leading-relaxed text-neutral-900">
              Ваша скидка {site.discount} уже доступна для использования
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between mt-12 lg:mt-0 gap-y-16 lg:gap-y-0">
        <div className="max-w-[43.75rem] basis-auto text-center md:text-justify">
          <h2 className="mb-6 text-xl md:text-3xl font-medium leading-normal text-blue-700">
            {title}
          </h2>
          <div className="mb-7 text-3xl md:text-5xl font-semibold leading-snug text-neutral-900">
            {renderRichText(description, {
              discount: {
                value: site.discount,
                render: (value) => (
                  <div className="inline-flex items-center justify-start gap-1.5 rounded-[2rem] border-b border-r border-purple-450 bg-purple-300 px-4 py-1">
                    <span className="text-3xl md:text-4xl font-semibold text-neutral-900">
                      {value} ₸
                    </span>
                  </div>
                ),
              },
            })}
          </div>
          <div className="text-lg font-normal leading-relaxed text-neutral-900">
            {subtitle}
          </div>
        </div>
        <div className="inline-flex flex-col items-center justify-center overflow-hidden md:rounded-3xl md:bg-white p-0 md:p-16">
          <RegForm
            onSuccess={handleSuccess}
            site={site}
          />
        </div>
      </div>
    </div>
  );
};