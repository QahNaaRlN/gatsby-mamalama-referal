import React, { useState } from "react";

import { useClientIds } from "@entities/registration/hooks/useClientIds";
import { useUTM } from "@entities/registration/hooks/useUTM";

interface RegistrationFormState {
  phone: string;
  name: string;
  code: string;
  codeSent: boolean;
  isSending: boolean;
  isVerifying: boolean;
  phoneError?: string;
  nameError?: string;
  codeError?: string;
}

interface UseRegistrationFormProps {
  trackId?: string;
  onSuccess: () => void;
  site: {
    domain: string;
    siteName: string;
  };
}

export const useRegistrationForm = ({ trackId, onSuccess, site }: UseRegistrationFormProps) => {
  const [state, setState] = useState<RegistrationFormState>({
    phone: '',
    name: '',
    code: '',
    codeSent: false,
    isSending: false,
    isVerifying: false,
    phoneError: undefined,
    nameError: undefined,
    codeError: undefined
  });

  const { utmParams } = useUTM();
  const { yandexClientId, roistatClientId, googleClientId } = useClientIds();

  const createRegistrationPayload = () => ({
    phoneNumber: state.phone,
    fullName: state.name,
    oferta: {
      acceptedOferta: true,
      ofertaVersion: 1.0,
      ofertaName: `Условия ${site.siteName}`,
      ofertaAcceptanceTime: new Date(),
      websiteAddressRorAcceptingOferta: typeof window !== 'undefined' ? window.location.href : '',
    },
    utm: utmParams,
    clientIds: {
      yandex: yandexClientId,
      roistat: roistatClientId,
      google: googleClientId
    }
  });

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return 'Имя обязательно';
    const regex = /[a-zA-Z0-9!@#$%^&*)(+=._-]/g;
    if (regex.test(name)) return 'Латиница и цифры запрещены';
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (phone.length !== 18) return 'Некорректный номер телефона';
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneError = validatePhone(state.phone);
    const nameError = validateName(state.name);

    if (phoneError || nameError) {
      setState(prev => ({
        ...prev,
        phoneError,
        nameError
      }));
      return;
    }

    setState(prev => ({ ...prev, isSending: true, phoneError: undefined }));

    try {
      const response = await fetch(
        `https://process-service.mamalama.io/referral-program/journal/phone/${trackId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createRegistrationPayload()),
        }
      );

      const result = await response.json();

      if (result.success) {
        setState(prev => ({
          ...prev,
          codeSent: true,
          isSending: false,
          phoneError: undefined
        }));
      } else {
        setState(prev => ({
          ...prev,
          isSending: false,
          phoneError: result.message || 'Произошла ошибка'
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSending: false,
        phoneError: 'Произошла ошибка при отправке формы'
      }));
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (state.code.length !== 4) {
      setState(prev => ({
        ...prev,
        codeError: 'Некорректный код'
      }));
      return;
    }

    setState(prev => ({ ...prev, isVerifying: true, codeError: undefined }));

    try {
      const response = await fetch(
        `https://process-service.mamalama.io/referral-program/journal/sms-code/${trackId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: state.code,
            phoneNumber: state.phone,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        if (typeof window !== 'undefined') {
          window.fbq?.('track', 'Lead');
          window.ym?.(97923708, 'reachGoal', 'regnumber');
          window.ym?.(95776791, 'reachGoal', 'regnumber');
        }
        onSuccess();
      } else {
        setState(prev => ({
          ...prev,
          isVerifying: false,
          codeError: result.message || 'Произошла ошибка'
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isVerifying: false,
        codeError: 'Произошла ошибка при проверке кода'
      }));
    }
  };

  const updateField = (field: keyof Pick<RegistrationFormState, 'phone' | 'name' | 'code'>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(prev => ({
      ...prev,
      [field]: e.target.value,
      [`${field}Error`]: undefined
    }));
  };

  return {
    state,
    handleSubmit,
    handleVerify,
    updateField
  };
};