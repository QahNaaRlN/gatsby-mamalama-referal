import { RegistrationResponse } from '@shared/domain/registration';

import { SendFormData, VerifyCodeData } from './types/registration';

const BASE_URL = 'https://process-service.stage-kz.millennium-falcon.team/referral-program/journal';

export const registrationApi = {
  sendForm: async (trackId: string, data: SendFormData): Promise<RegistrationResponse> => {
    const response = await fetch(`${BASE_URL}/phone/${trackId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  verifyCode: async (trackId: string, data: VerifyCodeData): Promise<RegistrationResponse> => {
    const response = await fetch(`${BASE_URL}/sms-code/${trackId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
