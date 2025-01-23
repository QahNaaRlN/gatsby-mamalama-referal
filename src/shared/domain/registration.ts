export interface RegistrationFormProps {
    trackId?: string;
    onSuccess: () => void;
  }
  
  export interface RegistrationResponse {
    success: boolean;
    message: string;
  }