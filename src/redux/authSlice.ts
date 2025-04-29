import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  street?: string;
}

interface UserState {
  _id: string;
  email: string;
  username?: string;
  name?: string;
  phone?: string;
  password?: string;
  profilephoto?: string;
  coverphoto?: string;
  stripe_customer_id: string;
  last_transaction_id?: string;
  role?: "user" | "artist" | "personalAssistant" | "admin";
  language: string;
  is_verified?: boolean;
  is_two_factor?: boolean;
  token?: string;
  isVerified?: boolean;
  subscriptionType?: string;
  profilePicture?: string;
  blocked?: boolean;
  wishlist?: object;
  show_notification?: object;
  news_Updates?: object;
  BD_gifts_via_mail?: object;
  otp_expiry: number;
  DOB?: string;
  address?: Address;
  billing_address?: Address;
  shipping_address?: Address;
  provider?: string;
  qr_code?: string;
  photo?: string;
  accessToken?: string;
  __v: number;
}

const initialState: UserState = {
  _id: "",
  email: "",
  username: "",
  name: "",
  phone: "",
  password: "",
  profilephoto: "",
  coverphoto: "",
  stripe_customer_id: "",
  last_transaction_id: "",
  role: undefined,
  language: "",
  is_verified: false,
  is_two_factor: false,
  blocked: false,
  wishlist: {},
  show_notification: {},
  news_Updates: {},
  BD_gifts_via_mail: {},
  otp_expiry: 0,
  DOB: "",
  address: {
    city: "",
    state: "",
    country: "",
    zip: "",
    street: ""
  },
  billing_address: {
    city: "",
    state: "",
    country: "",
    zip: "",
    street: ""
  },
  shipping_address: {
    city: "",
    state: "",
    country: "",
    zip: "",
    street: ""
  },
  provider: "",
  qr_code: "",
  photo: "",
  accessToken: "",
  __v: 0
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    updateUser(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    },
    resetUser() {
      return initialState;
    },
    login(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    }
  }
});

export const { updateUser, resetUser, setUser, login } = authSlice.actions;
export default authSlice.reducer;
