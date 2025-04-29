import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import axios from "axios";
import store from "@/redux/store";
import { updateUser } from "@/redux/authSlice";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!
    })
  ],
  debug: true,
  callbacks: {
    async signIn({ user, account }) {
      console.log("=== Starting Social Sign In Process ===");
      console.log("SignIn callback - User:", user);
      console.log("SignIn callback - Account:", account);
      
      try {
        const requestBody = {
          email: user.email,
          name: user.name,
          image: user.image,
          provider: account?.provider ?? "google"
        };
        
        console.log("Request body:", JSON.stringify(requestBody, null, 2));
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/social-login`,
          requestBody
        );
        
        console.log("Social login response:", response.data);

        console.log("Social login response: data", response.data?.data);

        console.log("Social login response: user", response.data?.data?.user);
        
        console.log("Access token", response.data?.data?.accessToken);
        
        if (response.data?.data?.user) {
          const updatedUserData = {
            _id: response.data.data.user._id,
            email: response.data.data.user.email,
            name: response.data.data.user.name,
            profilephoto: response.data.data.user.profilePicture || response.data.data.user.profilephoto,
            stripe_customer_id: response.data.data.user.stripeCustomerId || response.data.data.user.stripe_customer_id || "",
            role: response.data.data.user.role,
            is_verified: response.data.data.user.isVerified || response.data.data.user.is_verified,
            language: response.data.data.user.language,
            otp_expiry: response.data.data.user.otpExpiry || response.data.data.user.otp_expiry,
            qr_code: response.data.data.user.qr_code,
            accessToken: response.data.data.accessToken
          };
          
          console.log("Updated user for redux", updatedUserData);
          store.dispatch(updateUser(updatedUserData));
        }
        
        return true;
      } catch (error) {
        console.error("Social login error:", error);
        return false;
      }
    },
    async redirect({ baseUrl }) {
      console.log("Redirecting to homepage...");
      return `${baseUrl}/`;
    }
  }
});

export { handler as GET, handler as POST };
