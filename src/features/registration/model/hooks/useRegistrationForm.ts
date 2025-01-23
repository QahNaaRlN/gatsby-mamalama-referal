import { useState, useCallback } from 'react';

import { registrationApi } from '../../../../shared/api/registration';

export const useRegistrationForm = (trackId: string | undefined, onSuccess: () => void) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [nameFormatError, setNameFormatError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState('');
  const [codeMessage, setCodeMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const validateName = useCallback((value: string) => {
    const regex = /[a-zA-Z0-9!@#$%^&*)(+=._-]/g;
    if (regex.test(value)) {
      setNameFormatError(true);
      return value.replace(regex, '');
    }
    setNameFormatError(false);
    return value;
  }, []);

  const validateForm = useCallback(() => {
    setPhoneError(phone.length !== 18);
    setNameError(!name.trim());
    validateName(name);
    return !phoneError && !nameError && !nameFormatError;
  }, [phone, name, phoneError, nameError, nameFormatError, validateName]);

  const sendForm = useCallback(async () => {
    if (!validateForm() || !trackId) {
      console.error('Track ID не найден');
      return;
    }

    setIsSending(true);
    try {
      const response = await registrationApi.sendForm(trackId, {
        phoneNumber: phone,
        fullName: name,
        offer: {
          acceptedOffer: true,
          offerVersion: 1.0,
          offerName: 'Условия mamalama',
          offerAcceptanceTime: new Date(),
          websiteAddressRorAcceptingOffer: window.location.href,
        },
      });

      if (response.success) {
        setCodeSent(true);
        setPhoneMessage(response.message);
      } else {
        setPhoneMessage(response.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSending(false);
    }
  }, [trackId, phone, name, validateForm]);

  const verifyCode = useCallback(async () => {
    if (code.length !== 4 || !trackId) {
      setCodeError(true);
      return;
    }

    setIsVerifying(true);
    try {
      const response = await registrationApi.verifyCode(trackId, {
        code,
        phoneNumber: phone,
      });

      if (response.success) {
        setCodeMessage(response.message);
        onSuccess();
      } else {
        setCodeMessage(response.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsVerifying(false);
    }
  }, [code, trackId, phone, onSuccess]);

  return {
    phone,
    setPhone,
    name,
    setName,
    code,
    setCode,
    phoneError,
    nameError,
    nameFormatError,
    codeError,
    codeSent,
    phoneMessage,
    codeMessage,
    isSending,
    isVerifying,
    validateName,
    sendForm,
    verifyCode,
  };
};
