export interface SendFormData {
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

export interface VerifyCodeData {
  code: string;
  phoneNumber: string;
}
