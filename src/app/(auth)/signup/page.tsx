"use client";
import { useState } from "react";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/interceptor";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login, updateUser } from "@/redux/authSlice";
import { signIn } from "next-auth/react";

const SignupPage = () => {
  const dispatch = useDispatch();
  const t = useTranslations("AuthPage");
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/signup", { email, password, name });
      toast.success(response?.data?.message || "Signup successful");
      const userData = response?.data?.data?.user;

      dispatch(
        updateUser({
          token: userData?.token
        })
      );
      router.push("/signup-successful");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook" | "apple") => {
    try {
      const response = await signIn(provider, { redirect: false });

      if (!response?.error) {
        const { data } = await apiClient.post("/auth/social-login", {
          provider
        });

        if (data.success && data.user) {
          dispatch(
            login({
              _id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              token: data.token ?? data.user.token,
              isVerified: data.user.isVerified,
              subscriptionType: data.user.subscriptionType,
              profilePicture: data.user.profilePicture
            })
          );
          toast.success("Logged in successfully!");
          router.push("/");
        }
      } else {
        toast.error("Social login failed.");
      }
    } catch (error) {
      console.error("Error during social login:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex h-[90vh] w-[20rem] flex-col items-center justify-center p-8 sm:w-[20rem] md:w-[25rem] lg:w-[30rem] 2xl:w-[35rem]">
      <p className="mb-2 text-sm font-semibold text-gray-600 sm:text-sm md:text-sm lg:text-base 2xl:text-base">
        {t("signupMain")}
      </p>
      <p className="mb-8 text-lg font-semibold md:text-lg lg:text-lg 2xl:text-xl">{t("signupTitle")}</p>
      <section className="w-full space-y-4">
        {/* Full Name Input */}
        <div className="w-full">
          <label htmlFor="name" className="block px-1 text-xs font-medium sm:text-xs md:text-xs lg:text-base">
            {t("fullName")}
          </label>
          <section className="flex w-full items-center gap-2 rounded-xl border border-gray-300 bg-gray-100 px-4 py-2.5 text-base sm:text-base md:text-base lg:text-lg 2xl:text-lg">
            <HiOutlineMail className="text-sm text-gray-500 sm:text-sm md:text-sm lg:text-lg 2xl:text-lg" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("fullName")}
              className="bg-transparent text-sm outline-none focus:ring-0 sm:text-sm md:text-base lg:text-lg 2xl:text-lg"
            />
          </section>
        </div>
        {/* Email Input */}
        <div className="w-full">
          <label htmlFor="email" className="block px-1 text-xs font-medium sm:text-xs md:text-xs lg:text-base">
            {t("email")}
          </label>
          <section className="flex w-full items-center gap-2 rounded-xl border border-gray-300 bg-gray-100 px-4 py-2.5 text-base sm:text-base md:text-base lg:text-lg 2xl:text-lg">
            <HiOutlineMail className="text-sm text-gray-500 sm:text-sm md:text-sm lg:text-lg 2xl:text-lg" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="bg-transparent text-sm outline-none focus:ring-0 sm:text-sm md:text-base lg:text-lg 2xl:text-lg"
            />
          </section>
        </div>
        {/* Password Input */}
        <div className="w-full">
          <label htmlFor="password" className="block px-1 text-xs font-medium sm:text-xs md:text-xs lg:text-base">
            {t("password")}
          </label>
          <section className="flex w-full items-center gap-2 rounded-xl border border-gray-300 bg-gray-100 px-4 py-2.5 text-base sm:text-base md:text-base lg:text-lg 2xl:text-lg">
            <HiOutlineLockClosed className="text-lg text-gray-500" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("passwordPlaceholder")}
              className="bg-transparent text-sm outline-none focus:ring-0 sm:text-sm md:text-base lg:text-lg 2xl:text-lg"
            />
          </section>
        </div>

        <button
          className="gradient w-full cursor-pointer rounded-xl py-2.5 text-xs text-white hover:opacity-90 focus:outline-none disabled:opacity-50 sm:text-xs md:text-xs lg:text-base 2xl:text-base"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Registering...
            </span>
          ) : (
            t("registerButton")
          )}
        </button>

        {/* Social Login Buttons */}
        <p className="mb-4 text-center text-xs text-gray-600 sm:text-xs md:text-xs lg:text-base 2xl:text-base">
          {t("loginWith")}
        </p>
        <div className="space-y-2">
          <button
            className="flex w-full items-center justify-center gap-4 rounded-xl border border-gray-300 bg-gray-100 py-2.5 pl-4 text-xs hover:opacity-90 sm:text-xs md:text-xs lg:text-base 2xl:text-base"
            onClick={() => handleSocialLogin("google")}
          >
            <FcGoogle className="size-6" />
            <span className="w-60 text-start">{t("google")}</span>
          </button>
          <button
            className="flex w-full items-center justify-center gap-4 rounded-xl border border-gray-300 bg-gray-100 py-2.5 pl-4 text-xs hover:opacity-90 sm:text-xs md:text-xs lg:text-base 2xl:text-base"
            onClick={() => handleSocialLogin("apple")}
          >
            <AiFillApple className="size-7" />
            <span className="w-60 text-start">{t("apple")}</span>
          </button>
          <button
            className="flex w-full items-center justify-center gap-4 rounded-xl border border-gray-300 bg-gray-100 py-2.5 pl-4 text-xs hover:opacity-90 sm:text-xs md:text-xs lg:text-base 2xl:text-base"
            onClick={() => handleSocialLogin("facebook")}
          >
            <FaFacebook className="size-6 text-blue-600" />
            <span className="w-60 text-start">{t("facebook")}</span>
          </button>
        </div>
        {/* Sign-in Link */}
        <p className="pt-2 text-center text-gray-600">
          {t("alreadyHaveAccount")}{" "}
          <Link href="/signin" className="text-orange-500 hover:underline">
            {t("loginButton")}
          </Link>
        </p>
      </section>
    </div>
  );
};

export default SignupPage;
