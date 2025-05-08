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
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});


  const validateForm = () => {
    const newErrors: typeof errors = {};
  
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (/^\d/.test(name)) {
      newErrors.name = "Name should not start with a number";
    }
    
    if (!email.trim()) newErrors.email = "Email is required";
    else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) || 
      /\.\./.test(email)
    ) {
      newErrors.email = "Invalid email format";
    }
    
  
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    <div className="flex h-full w-full flex-col items-center justify-center p-6 md:h-[93vh] md:w-[25rem] md:p-16 lg:h-[90vh] lg:w-[30rem] 2xl:w-[35rem]">
      <p className="text-sm font-semibold text-gray-600 sm:text-sm md:text-sm lg:text-base 2xl:text-base">
        {t("signupMain")}
      </p>
      <p className="mb-6 text-lg font-extrabold md:text-lg lg:text-lg 2xl:text-xl">{t("signupTitle")}</p>
      <section className="w-full space-y-4">
        {/* Email Input */}
        <div className="w-full">
          <label htmlFor="email" className="mb-2 block px-1 text-xs font-medium sm:text-xs md:text-xs lg:text-base">
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
              className="h-7 w-full bg-transparent text-sm outline-none focus:ring-0"
            />
          </section>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}

        </div>
        {/* Full Name Input */}
        <div className="w-full">
          <label htmlFor="name" className="mb-2 block px-1 text-xs font-medium sm:text-xs md:text-xs lg:text-base">
            {t("fullName")}
          </label>
          <section className="flex w-full items-center gap-2 rounded-xl border border-gray-300 bg-gray-100 px-4 py-2.5 text-base sm:text-base md:text-base lg:text-lg 2xl:text-lg">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 10.0001C12.3012 10.0001 14.1667 8.1346 14.1667 5.83341C14.1667 3.53223 12.3012 1.66675 10 1.66675C7.69882 1.66675 5.83334 3.53223 5.83334 5.83341C5.83334 8.1346 7.69882 10.0001 10 10.0001Z"
                stroke="#6E6E70"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.1583 18.3333C17.1583 15.1083 13.95 12.5 10 12.5C6.05001 12.5 2.84167 15.1083 2.84167 18.3333"
                stroke="#6E6E70"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("fullNamePlaceholder")}
              className="h-7 w-full bg-transparent text-sm outline-none focus:ring-0"
            />
          </section>
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Password Input */}
        <div className="w-full">
          <label htmlFor="password" className="mb-2 block px-1 text-xs font-medium sm:text-xs md:text-xs lg:text-base">
            {t("password")}
          </label>
          <section className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-300 bg-gray-100 px-4 py-2.5 text-base sm:text-base md:text-base lg:text-lg 2xl:text-lg">
            <div className="flex w-full items-center gap-2">
              <HiOutlineLockClosed className="text-lg text-gray-500" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                className="h-7 w-full bg-transparent text-sm outline-none focus:ring-0"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2"
              aria-label="Toggle password visibility"
            >
              {/* Your provided SVG */}
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.82089 8.82251C8.50837 9.13513 8.33285 9.5591 8.33293 10.0011C8.33301 10.4432 8.50868 10.8671 8.8213 11.1796C9.13393 11.4921 9.55789 11.6676 9.99993 11.6676C10.442 11.6675 10.8659 11.4918 11.1784 11.1792"
                    stroke="#6E6E70"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.9008 13.8942C12.7319 14.6256 11.3789 15.0091 10 15C7 15 4.5 13.3334 2.5 10C3.56 8.23336 4.76 6.93503 6.1 6.10503M8.48333 5.15002C8.98253 5.04897 9.49068 4.99871 10 5.00003C13 5.00003 15.5 6.66669 17.5 10C16.945 10.925 16.3508 11.7225 15.7183 12.3917"
                    stroke="#6E6E70"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 2.5L17.5 17.5"
                    stroke="#6E6E70"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                // Eye open icon (You can replace with your own or use heroicons/feather as needed)
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6E6E70"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </section>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        <button
          className="gradient w-full cursor-pointer rounded-xl py-2.5 text-xs text-white hover:opacity-90 focus:outline-none disabled:opacity-50 sm:text-xs md:text-xs lg:text-base 2xl:text-base font-bold"
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
            className="flex w-full items-center justify-center gap-4 rounded-xl border border-gray-300 bg-gray-100 py-2.5 pl-4 text-xs hover:opacity-90 sm:text-xs md:text-xs lg:text-base 2xl:text-base text-black"
            onClick={() => handleSocialLogin("google")}
          >
            <FcGoogle className="size-6" />
            <span className="w-60 text-start">{t("google")}</span>
          </button>
          <button
            className="flex w-full items-center justify-center gap-4 rounded-xl border border-gray-300 bg-gray-100 py-2.5 pl-4 text-xs hover:opacity-90 sm:text-xs md:text-xs lg:text-base 2xl:text-base text-black"
            onClick={() => handleSocialLogin("apple")}
          >
            <AiFillApple className="size-7" />
            <span className="w-60 text-start">{t("apple")}</span>
          </button>
          <button
            className="flex w-full items-center justify-center gap-4 rounded-xl border border-gray-300 bg-gray-100 py-2.5 pl-4 text-xs hover:opacity-90 sm:text-xs md:text-xs lg:text-base 2xl:text-base text-black"
            onClick={() => handleSocialLogin("facebook")}
          >
            <FaFacebook className="size-6 text-blue-600" />
            <span className="w-60 text-start">{t("facebook")}</span>
          </button>
        </div>
        {/* Sign-in Link */}
        <p className="pt-2 text-center text-gray-800">
          {t("alreadyHaveAccount")}{" "}
          <Link href="/signin" className="text-[#E94A6C] hover:underline">
            {t("loginButton")}
          </Link>
        </p>
      </section>
    </div>
  );
};

export default SignupPage;
