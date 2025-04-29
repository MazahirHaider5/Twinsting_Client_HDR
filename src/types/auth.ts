export interface BackendAuthResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    subscriptionType: string;
    profilePicture?: string;
    token: string;
  };
  message?: string;
}
