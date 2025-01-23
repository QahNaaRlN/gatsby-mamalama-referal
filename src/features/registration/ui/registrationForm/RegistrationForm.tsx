import React from 'react';

import InputMask from 'react-input-mask';

import {Button} from '@/shared/ui/button';
import {Input} from '@/shared/ui/input';

import {useRegistrationForm} from '@/features/registration/model/hooks/useRegistrationForm';
import {RegistrationFormProps} from '@/features/registration/model/types';


export const RegistrationForm: React.FC<RegistrationFormProps> = ({trackId, onSuccess}) => {
  const {
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
  } = useRegistrationForm(trackId, onSuccess);

  if (!codeSent) {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        sendForm();
      }} className='form'>
        <div className='form__title label'>Заполните форму</div>
        <div className='form__content'>
          <div className='form__item'>
            <InputMask
              mask='+7 (999) 999-99-99'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            >
              {(inputProps: any) => (
                <Input
                  {...inputProps}
                  placeholder='+7 (000) 000-00-00'
                  className={phoneError ? 'is-invalid' : ''}
                />
              )}
            </InputMask>
            {phoneError && <span className='error-message'>Некорректный номер телефона</span>}
            {phoneMessage && <span className='error-message'>{phoneMessage}</span>}
          </div>

          <div className='form__item'>
            <Input
              value={name}
              onChange={(e) => setName(validateName(e.target.value))}
              placeholder='Имя'
              className={nameError || nameFormatError ? 'is-invalid' : ''}
            />
            {nameError && <span className='error-message'>Имя обязательно</span>}
            {nameFormatError && <span className='error-message'>Латиница и цифры запрещены</span>}
          </div>

          <div className='form__item form__item_button'>
            <Button type='submit' disabled={isSending}>
              {isSending ? <span className='loader'/> : 'Зарегистрироваться'}
            </Button>
          </div>

          <div className='form__text'>
            Регистрируясь, вы соглашаетесь <br/>
            <a href='https://mamalama.kz/legal/user-agreement/'>
              с пользовательским соглашением
            </a>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      verifyCode();
    }} className='form'>
      <div className='form__content'>
        <div className='form__label'>Мы выслали СМС с кодом</div>
        <div className='form__item'>
          <InputMask
            mask='9999'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          >
            {(inputProps: any) => (
              <Input
                {...inputProps}
                placeholder='Введите код'
                className={codeError ? 'is-invalid' : ''}
              />
            )}
          </InputMask>
          {codeError && <span className='error-message'>Некорректный код</span>}
          {codeMessage && <span className='error-message'>{codeMessage}</span>}
        </div>

        <div className='form__item form__item_button'>
          <Button type='submit' disabled={isVerifying}>
            {isVerifying ? <span className='loader'/> : 'Подтвердить'}
          </Button>
        </div>
      </div>
    </form>
  );
};
