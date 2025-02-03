export interface RegFormPromo {
  documentId: string;
  title: string;
  subtitle?: string;
  description?: object;
  registrationFormPromo: {
    documentId: string;
  };
  site: {
    domain: string;
    siteName: string;
    discount: string;
  };
}

export interface RegFormSuccess {
  documentId: string;
  title: string;
  subtitle?: string;
  description?: object;
  link?: string;
  registrationFormSuccess: {
    documentId: string;
  };
  site: {
    domain: string;
    siteName: string;
    discount: string;
  };
}

export interface RegistrationFormData {
  phoneNumber: string;
  fullName: string;
  offer: {
    acceptedOffer: boolean;
    offerVersion: number;
    offerName: string;
    offerAcceptanceTime: Date;
    websiteAddressRorAcceptingOffer: string;
  };
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  data?: {
    trackId: string;
    referralProgramProviderName: string;
  };
}

export interface VerificationData {
  code: string;
  phoneNumber: string;
}