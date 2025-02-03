import React, { useState } from "react";

import { useRegistrationForm } from "@entities/registration/hooks/useRegistrationForm";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

export interface RegFormProps {
  trackId?: string;
  onSuccess: () => void;
  site: {
    domain: string;
    siteName: string;
    discount: string;
  };
}

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
          <div className="space-y-2">
            <Input
              value={phone}
              onChange={updateField("phone")}
              error={phoneError}
              mask="+7 (999) 999-99-99"
              placeholder="+7 (___) ___-__-__"
              size="md"
              fullWidth
            />
            {phoneError && (
              <span className="text-sm text-red-500">{phoneError}</span>
            )}
          </div>
          <div className="space-y-2">
            <Input
              value={name || ""}
              onChange={handleNameChange}
              placeholder="Имя"
              error={nameError || localNameError}
            />
            {(nameError || localNameError) && !localNameError.includes(nameError || "") && (
              <span className="text-sm text-red-500">{nameError || localNameError}</span>
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
          <div className="space-y-2">
            <Input
              value={code}
              onChange={updateField("code")}
              placeholder="Введите код"
              error={codeError}
              mask="9999"
            />
            {codeError && (
              <span className="text-sm text-red-500">{codeError}</span>
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