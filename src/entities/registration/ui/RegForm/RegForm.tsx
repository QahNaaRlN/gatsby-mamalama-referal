import React, { useState } from "react";

import { useRegistrationForm } from "@entities/registration/hooks/useRegistrationForm";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

/**
 * Интерфейс пропсов компонента формы регистрации
 * @interface RegFormProps
 * @property {string} [trackId] - Идентификатор отслеживания
 * @property {Function} onSuccess - Callback успешной регистрации
 * @property {object} site - Информация о сайте
 * @property {string} site.domain - Домен сайта
 * @property {string} site.siteName - Название сайта
 * @property {string} site.discount - Размер скидки
 */
export interface RegFormProps {
  trackId?: string;
  onSuccess: () => void;
  site: {
    domain: string;
    siteName: string;
    discount: string;
  };
}

/**
 * Компонент формы регистрации
 *
 * @description
 * Компонент отображает форму регистрации с двумя состояниями:
 * 1. Форма ввода телефона и имени
 * 2. Форма ввода кода подтверждения (после успешной отправки данных)
 *
 * Включает:
 * - Валидацию полей в реальном времени
 * - Маску ввода для телефона и кода
 * - Обработку ошибок
 * - Отображение состояния загрузки
 * - Ссылку на пользовательское соглашение
 *
 * @component
 * @param {RegFormProps} props - Пропсы компонента
 * @returns {JSX.Element} Форма регистрации
 *
 * @example
 * <RegForm
 *   trackId="123"
 *   onSuccess={() => console.log('Success')}
 *   site={{ domain: 'example.com', siteName: 'Example', discount: '10%' }}
 * />
 */
export const RegForm: React.FC<RegFormProps> = ({ trackId, onSuccess, site }) => {
  const {
    state: {
      phone,
      name,
      code,
      codeSent,
      isSending,
      isVerifying,
      phoneError,
      nameError,
      codeError
    },
    handleSubmit,
    handleVerify,
    updateField
  } = useRegistrationForm({ trackId, onSuccess, site });

  const [localNameError, setLocalNameError] = useState<string>("");

  /**
   * Обработчик изменения поля имени с валидацией
   * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения
   */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[А-Яа-яЁё\s-]*$/;

    if (regex.test(value)) {
      if (localNameError) setLocalNameError("");
      updateField("name")(e);
    } else if (!localNameError) {
      setLocalNameError("Латиница и цифры запрещены для ввода");
    }
  };

  return (
    <form onSubmit={codeSent ? handleVerify : handleSubmit} className="flex flex-col gap-6">
      {!codeSent ? (
        <>
          <h3 className="hidden md:block mb-8 text-3xl font-semibold leading-snug text-neutral-900">
            Заполните форму
          </h3>
          <div className="relative flex flex-col">
            <Input
              value={phone}
              onChange={updateField("phone")}
              error={phoneError}
              mask="+7 (999) 999-99-99"
              placeholder="+7 (___) ___-__-__"
            />
            {phoneError && (
              <span className="absolute -bottom-5 mt-2 text-sm text-red-500">{phoneError}</span>
            )}
          </div>
          <div className="relative flex flex-col">
            <Input
              value={name || ""}
              onChange={handleNameChange}
              placeholder="Имя"
              error={nameError || localNameError}
            />
            {(nameError || localNameError) && !localNameError.includes(nameError || "") && (
              <span className="absolute -bottom-5 mt-2 text-sm text-red-500">{nameError || localNameError}</span>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSending}
            variant="primary"
            size="lg"
            fullWidth
            className="md:mb-7"
          >
            {isSending ? "Отправка..." : "Зарегистрироваться"}
          </Button>
          <span className="text-center text-base font-normal leading-snug">
            Регистрируясь, вы соглашаетесь <br />
            <a
              href={`https://${site.domain}/legal/user-agreement/`}
              className="font-semibold leading-snug tracking-tight text-teal-700"
            >
              с пользовательским соглашением
            </a>
          </span>
        </>
      ) : (
        <>
          <div className="relative flex flex-col">
            <Input
              value={code}
              onChange={updateField("code")}
              placeholder="Введите код"
              error={codeError}
              mask="9999"
            />
            {codeError && (
              <span className="absolute -bottom-5 mt-2 text-sm text-red-500">{codeError}</span>
            )}
          </div>
          <Button
            type="submit"
            disabled={isVerifying}
            variant="primary"
            size="lg"
            fullWidth
          >
            {isVerifying ? "Проверка..." : "Подтвердить"}
          </Button>
        </>
      )}
    </form>
  );
};